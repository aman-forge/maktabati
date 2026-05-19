import { sql } from "drizzle-orm";
import {
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { anonymousRole, authenticatedRole, authUid, crudPolicy } from "../roles";
import { authors, publishers, series } from "./authors";
import { profiles } from "./users";

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

export const bookAuthorRoleEnum = pgEnum("book_author_role", [
  "author",
  "co_author", // underscore convention — hyphens cause issues in some ORMs
  "editor",
  "translator", // critical for Arabic translated books
]);

export const readingStatusEnum = pgEnum("reading_status", [
  "want_to_read",
  "currently_reading",
  "completed",
  "on_hold",
  "dropped",
]);

// ─────────────────────────────────────────────────────────────
// BOOKS
// ─────────────────────────────────────────────────────────────
export const books = pgTable.withRLS(
  "books",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: text("slug").notNull().unique(),

    // Denormalised primary author — avoids joining book_authors for the common
    // "books by author" query. Must stay in sync with book_authors (app layer).
    authorId: uuid("author_id")
      .notNull()
      .references(() => authors.id, { onDelete: "cascade" }),

    publisherId: uuid("publisher_id").references(() => publishers.id, {
      onDelete: "set null",
    }),

    seriesId: uuid("series_id").references(() => series.id, {
      onDelete: "set null",
    }),
    seriesPosition: integer("series_position"),

    title: text("title").notNull(),
    subtitle: text("subtitle"),
    description: text("description"),

    coverImageUrl: text("cover_image_url"),
    pageCount: integer("page_count"),

    publicationYear: integer("publication_year"),
    publicationDate: date("publication_date"),

    // "ar" = originally Arabic; anything else = translated into Arabic
    originalLanguage: text("original_language").default("ar").notNull(),
    originalTitle: text("original_title"), // title in original language

    genres: text("genres")
      .array()
      .default(sql`'{}'::text[]`),
    topics: text("topics")
      .array()
      .default(sql`'{}'::text[]`),

    isbn: text("isbn"),
    isbn13: text("isbn_13"),
    edition: text("edition"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    uniqueIndex("books_slug_idx").on(t.slug),
    index("books_author_idx").on(t.authorId),
    index("books_series_idx").on(t.seriesId),
    index("books_publisher_idx").on(t.publisherId),
    index("books_publication_year_idx").on(t.publicationYear),
    index("books_original_language_idx").on(t.originalLanguage),

    // Array containment queries: WHERE 'رواية' = ANY(genres)
    index("books_genres_gin_idx").using("gin", t.genres),
    index("books_topics_gin_idx").using("gin", t.topics),

    // POST-MVP: add a tsvector generated column + GIN index here for Arabic FTS
    // Run this raw SQL migration after table creation:
    //
    //   ALTER TABLE books
    //     ADD COLUMN search_vector tsvector
    //     GENERATED ALWAYS AS (
    //       to_tsvector('arabic',
    //         coalesce(title, '') || ' ' ||
    //         coalesce(original_title, '') || ' ' ||
    //         coalesce(description, '')
    //       )
    //     ) STORED;
    //
    //   CREATE INDEX books_fts_idx ON books USING gin(search_vector);
  ],
);

// ─────────────────────────────────────────────────────────────
// BOOK AUTHORS
// Many-to-many: a book can have multiple authors, editors,
// translators. Defined after `books` to avoid forward-reference issues.
// ─────────────────────────────────────────────────────────────
export const bookAuthors = pgTable.withRLS(
  "book_authors",
  {
    bookId: uuid("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),
    authorId: uuid("author_id")
      .notNull()
      .references(() => authors.id, { onDelete: "cascade" }),
    role: bookAuthorRoleEnum("role").notNull().default("author"),
    // Controls display order on book page (0 = listed first)
    order: integer("order").notNull().default(0),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    primaryKey({ columns: [t.bookId, t.authorId] }),
    index("book_authors_book_idx").on(t.bookId),
    index("book_authors_author_idx").on(t.authorId),

    // Lets you query all books translated by a given person efficiently
    index("book_authors_author_role_idx").on(t.authorId, t.role),
  ],
);

// ─────────────────────────────────────────────────────────────
// USER_BOOKS  (reading shelf)
// ─────────────────────────────────────────────────────────────
export const userBooks = pgTable.withRLS(
  "user_books",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),

    bookId: uuid("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),

    status: readingStatusEnum("status").notNull(),

    pageProgress: integer("page_progress"),

    // Private notes — never shown publicly
    notes: text("notes"),

    startedAt: date("started_at"),
    finishedAt: date("finished_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(), // = "date added to shelf"
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: authUid(t.userId) }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    uniqueIndex("user_books_unique_idx").on(t.userId, t.bookId),

    index("user_books_user_status_idx").on(t.userId, t.status),
    index("user_books_user_created_idx").on(t.userId, t.createdAt),
    index("user_books_user_updated_idx").on(t.userId, t.updatedAt),
    index("user_books_book_idx").on(t.bookId),

    check("page_progress_positive", sql`${t.pageProgress} IS NULL OR ${t.pageProgress} >= 0`),
  ],
);
