import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { defineRelations } from "drizzle-orm"; // ← new v2 relations API (recommended in v1)

// ====================== TABLES ======================

export const authors = pgTable("authors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const books = pgTable("books", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => authors.id, { onDelete: "cascade" }),
  description: text("description").notNull(),
  coverImageUrl: text("cover_image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// ====================== TYPES ======================
// https://orm.drizzle.team/docs/column-types/pg

export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;

export type Book = typeof books.$inferSelect;
export type NewBook = typeof books.$inferInsert;

// ====================== RELATIONS ======================
// https://orm.drizzle.team/docs/relations-v2

export const relations = defineRelations({ authors, books }, (r) => ({
  books: {
    author: r.one.authors({
      from: r.books.authorId,
      to: r.authors.id,
    }),
  },
}));
