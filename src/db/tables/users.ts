import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { anonymousRole, authenticatedRole, authUid, crudPolicy } from "../roles";
import { books } from "./books";

// ─────────────────────────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────────────────────────

export const profileVisibilityEnum = pgEnum("profile_visibility", ["public", "private", "friends"]);

// ─────────────────────────────────────────────────────────────
// PROFILES
// One row per Neon Auth user. id mirrors the provider user id.
// ─────────────────────────────────────────────────────────────
export const profiles = pgTable.withRLS(
  "profiles",
  {
    id: text("id").primaryKey(), // same as Neon Auth user id

    // username: used in profile URLs (/u/ahmed), must be unique
    username: text("username").notNull().unique(),
    displayName: text("display_name").notNull(),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),

    birthday: date("birthday"),
    website: text("website"),

    // Validated at app layer — store only the handle/username, not full URL
    socialLinks: jsonb("social_links").$type<{
      x?: string;
      instagram?: string;
      tiktok?: string;
      youtube?: string;
      goodreads?: string;
      facebook?: string;
      linkedin?: string;
    }>(),

    location: text("location"),
    preferredLanguage: text("preferred_language").default("ar"),
    profileVisibility: profileVisibilityEnum("profile_visibility").default("public").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: authUid(t.id) }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    uniqueIndex("profiles_username_idx").on(t.username),
  ],
);

// ─────────────────────────────────────────────────────────────
// REVIEWS
// Rating lives here — not in user_books — so a star and its
// associated text always travel together.
//
// A user can:
//   - Rate without writing  (rating set, body null)
//   - Write without rating  (body set, rating null)
//   - Do both
// At least one must be present (checked below).
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

    // 1–5 stars, nullable (text-only review is valid)
    rating: integer("rating"),

    // Nullable — a rating with no text is a valid review
    body: text("body"),

    spoiler: boolean("spoiler").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: authUid(t.userId) }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),

    // One review per user per book
    uniqueIndex("reviews_unique_idx").on(t.userId, t.bookId),

    index("reviews_book_idx").on(t.bookId),
    index("reviews_user_idx").on(t.userId),
    // Supports "top rated" and "average rating" aggregations
    index("reviews_book_rating_idx").on(t.bookId, t.rating),
    // Supports user's rating history sorted/filtered
    index("reviews_user_rating_idx").on(t.userId, t.rating),

    check("rating_range", sql`${t.rating} IS NULL OR (${t.rating} >= 1 AND ${t.rating} <= 5)`),
    // Must have at least a rating OR review text — an empty row is useless
    check(
      "review_has_content",
      sql`${t.rating} IS NOT NULL OR (${t.body} IS NOT NULL AND trim(${t.body}) <> '')`,
    ),
  ],
);
