export * from "./authors";
export * from "./books";
export * from "./users";

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

import type { Author, Publisher } from "./authors";
import type { Book, Series } from "./books";
import type { Review, User } from "./users";

export type BookWithAuthor = Book & { author: Author | null };
export type BookWithRelations = Book & {
  author: Author | null;
  publisher: Publisher | null;
  series: Series | null;
};
export type ReviewWithUser = Review & { user: User };
