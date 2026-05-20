import type { authors, books, publishers, reviews, series, userBooks } from "@/db/tables";

export type BookRow = typeof books.$inferSelect;
export type AuthorRow = typeof authors.$inferSelect;
export type PublisherRow = typeof publishers.$inferSelect;
export type SeriesRow = typeof series.$inferSelect;
export type ReviewRow = typeof reviews.$inferSelect;
export type UserBookRow = typeof userBooks.$inferSelect;
