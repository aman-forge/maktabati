import { sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

// ─────────────────────────────────────────────────────────────
// USERS
// mirrors your auth provider's user (Supabase / Neon Auth)
// ─────────────────────────────────────────────────────────────
import { anonymousRole, authenticatedRole, authUid, crudPolicy } from "../roles"; // the neon_auth.users_sync table
import { books } from "./books";

export const profiles = pgTable.withRLS(
  "profiles",
  {
    // id mirrors neon_auth.users_sync.id — text type, not uuid
    id: text("id").primaryKey(), // .references(() => usersSync.id, { onDelete: "cascade" }),
    displayName: text("display_name"),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: authUid(t.id) }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
  ],
);

// ─────────────────────────────────────────────────────────────
// REVIEWS  (rating + optional text)
// ─────────────────────────────────────────────────────────────
export const reviews = pgTable.withRLS(
  "reviews",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => profiles.id, { onDelete: "cascade" }),

    bookId: uuid("book_id")
      .notNull()
      .references(() => books.id, { onDelete: "cascade" }),

    // nullable — user can shelve a book without rating it
    rating: integer("rating"),
    body: text("body"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    // ✅ reviews are public; only the author can edit/delete their own
    crudPolicy({
      role: authenticatedRole,
      read: true,
      modify: authUid(t.userId),
    }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    uniqueIndex("reviews_unique_idx").on(t.userId, t.bookId), // one review per user/book
    index("reviews_book_idx").on(t.bookId),
    index("reviews_user_idx").on(t.userId),

    // ✅ DB-level guard
    check("rating_range", sql`${t.rating} IS NULL OR (${t.rating} >= 1 AND ${t.rating} <= 5)`),
    check("review_needs_rating_or_body", sql`${t.rating} IS NOT NULL OR ${t.body} IS NOT NULL`),
  ],
);

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type User = typeof profiles.$inferSelect;
export type NewUser = typeof profiles.$inferInsert;

export type Review = typeof reviews.$inferSelect;
export type NewReview = typeof reviews.$inferInsert;
