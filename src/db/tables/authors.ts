import { index, integer, pgTable, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";

import { anonymousRole, authenticatedRole, crudPolicy } from "../roles";

// ─────────────────────────────────────────────────────────────
// AUTHORS
// ─────────────────────────────────────────────────────────────
export const authors = pgTable.withRLS(
  "authors",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    slug: text("slug").notNull().unique(),
    name: text("name").notNull(), // Arabic name (primary)
    nameEn: text("name_en"), // Latin transliteration for search/SEO
    aliases: text("aliases").array(),

    bio: text("bio"),
    birthYear: integer("birth_year"),
    deathYear: integer("death_year"),
    placeOfBirth: text("place_of_birth"),
    placeOfDeath: text("place_of_death"),

    nationality: text("nationality"), // ISO 3166-1 alpha-2: "EG", "LB", "SA", "MA" …

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
    index("authors_nationality_idx").on(t.nationality),
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
    country: text("country"), // ISO 3166-1 alpha-2: "EG", "LB", "SA", "MA" …

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
    index("publishers_country_idx").on(t.country),
  ],
);

// ─────────────────────────────────────────────────────────────
// SERIES
// Defined here (above books.ts) to avoid forward-reference issues.
// ─────────────────────────────────────────────────────────────
export const series = pgTable.withRLS(
  "series",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    authorId: uuid("author_id").references(() => authors.id, {
      onDelete: "set null",
    }),

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
    index("series_author_idx").on(t.authorId),
  ],
);
