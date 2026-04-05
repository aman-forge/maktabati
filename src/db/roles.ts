// ====================== Roles ======================
// https://orm.drizzle.team/docs/rls#using-with-neon

// drizzle-orm/neon already provides everything you need
export {
  anonymousRole,
  authenticatedRole,
  authUid,
  crudPolicy,
  // usersSync,
} from "drizzle-orm/neon";

// Example usage in a table:
// (t) => [
//    crudPolicy({
//      role: authenticatedRole,
//      read: isOwner(t.authorId),
//      modify: isOwner(t.authorId)
//    })
// ]
