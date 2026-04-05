import {
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { anonymousRole, authenticatedRole, crudPolicy } from "../roles";

// ─────────────────────────────────────────────────────────────
// AUTHORS
// ─────────────────────────────────────────────────────────────
export const authors = pgTable.withRLS(
  "authors",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    nameEn: text("name_en"),
    aliases: text("aliases").array(),

    bio: text("bio"),
    birthYear: integer("birth_year"),
    deathYear: integer("death_year"),
    placeOfBirth: text("place_of_birth"),
    placeOfDeath: text("place_of_death"),

    nationality: text("nationality"),

    profileImage: text("profile_image"),
    wikipediaUrl: text("wikipedia_url"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
    uniqueIndex("authors_slug_idx").on(t.slug),
  ],
);

// ─────────────────────────────────────────────────────────────
// PUBLISHERS
// ─────────────────────────────────────────────────────────────
export const publishers = pgTable.withRLS(
  "publishers",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    logoUrl: text("logo_url"),
    website: text("website"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (t) => [
    crudPolicy({ role: authenticatedRole, read: true, modify: false }),
    crudPolicy({ role: anonymousRole, read: true, modify: false }),
    uniqueIndex("publishers_slug_idx").on(t.slug),
  ],
);

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

export type Author = typeof authors.$inferSelect;
export type NewAuthor = typeof authors.$inferInsert;

export type Publisher = typeof publishers.$inferSelect;
export type NewPublisher = typeof publishers.$inferInsert;
