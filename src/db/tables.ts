// ====================== TABLES ======================

import { crudPolicy } from "drizzle-orm/neon";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { anonymousRole, authenticatedRole } from "./roles";

export const authors = pgTable.withRLS(
  "authors",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    bio: text("bio"),
    profileImage: text("profile_image").notNull(),
    country: text("country").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t: any) => [
    // Policy for Logged-in users
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    // Policy for Public (logged-out) users
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
  ],
);

export const books = pgTable.withRLS(
  "books",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    authorId: integer("author_id")
      .notNull()
      .references(() => authors.id, { onDelete: "cascade" }),
    description: text("description").notNull(),
    coverImageUrl: text("cover_image_url").notNull(),
    pageCount: integer("page_count").notNull().default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t: any) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
  ],
);

// ====================== TYPES ======================
// https://orm.drizzle.team/docs/column-types/pg

export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

export type BookWithAuthor = Book & { author: Author | null };
