// ====================== Roles ======================
// https://orm.drizzle.team/docs/rls#using-with-neon

import { sql } from "drizzle-orm";
import { type AnyPgColumn, pgRole } from "drizzle-orm/pg-core";

export const admin = pgRole("admin").existing();
export const authenticatedRole = pgRole("authenticated").existing();
export const anonymousRole = pgRole("anonymous").existing();

// This helper checks if the person logged in matches the ID in your table
export const isOwner = (userIdColumn: AnyPgColumn) =>
	sql`(select auth.user_id() = ${userIdColumn})`;

// Example usage in a table:
// (t) => [
//    crudPolicy({
//      role: authenticatedRole,
//      read: isOwner(t.authorId),
//      modify: isOwner(t.authorId)
//    })
// ]
