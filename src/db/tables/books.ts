import { sql } from "drizzle-orm";
import {
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import {
  anonymousRole,
  authenticatedRole,
  authUid,
  crudPolicy,
} from "../roles";
import { authors, publishers } from "./authors";

// ─────────────────────────────────────────────────────────────
// BOOKS
// ─────────────────────────────────────────────────────────────
export const books = pgTable.withRLS(
  "books",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: text("slug").notNull().unique(),

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

    originalLanguage: text("original_language").default("ar"),
    originalTitle: text("original_title"),
    translator: text("translator"),

    genres: text("genres")
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
    index("books_author_idx").on(t.authorId), // ✅ heavily queried
    index("books_series_idx").on(t.seriesId),
    index("books_publisher_idx").on(t.publisherId),
  ],
);

// ─────────────────────────────────────────────────────────────
// SERIES
// ─────────────────────────────────────────────────────────────
export const series = pgTable.withRLS(
  "series",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    description: text("description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
    uniqueIndex("series_slug_idx").on(t.slug),
  ],
);

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

export const readingStatusEnum = pgEnum("reading_status", [
  "want_to_read",
  "currently_reading",
  "read",
  "did_not_finish",
]);

// ─────────────────────────────────────────────────────────────
// USER_BOOKS  (shelves: want to read / reading / read)
// ─────────────────────────────────────────────────────────────
export const userBooks = pgTable.withRLS(
  "user_books",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id").notNull(),
    // .references(() => usersSync.id, { onDelete: "cascade" }),

    bookId: uuid("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),

    status: readingStatusEnum("status").notNull(),

    startedAt: date("started_at"),
    finishedAt: date("finished_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    // ✅ anyone can read shelves; only the owner can touch their own rows
    crudPolicy({
      role: authenticatedRole,
      read: true,
      modify: authUid(t.userId),
    }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    uniqueIndex("user_books_unique_idx").on(t.userId, t.bookId), // one shelf entry per user/book
    index("user_books_user_idx").on(t.userId),
    index("user_books_book_idx").on(t.bookId),
  ],
);

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type Series = typeof series.$inferSelect;
export type NewSeries = typeof series.$inferInsert;

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

export type UserBook = typeof userBooks.$inferSelect;
export type NewUserBook = typeof userBooks.$inferInsert;
