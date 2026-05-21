import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { userBooks } from "@/db/tables";

import type { BookCardType } from "../types";
import { getBookRowsByIds, hydrateBookCards } from "./get-books.impl";
import type { UserBookTrackingInput } from "./library";

// ==== Library Page Books ==== //
export async function getUserBooksImpl(userId: string): Promise<BookCardType[]> {
  const rows = await db
    .select({
      bookId: userBooks.bookId,
    })
    .from(userBooks)
    .where(eq(userBooks.userId, userId))
    .orderBy(desc(userBooks.updatedAt));

  const bookRows = await getBookRowsByIds(rows.map((row) => row.bookId));
  const cards = await hydrateBookCards(bookRows, userId);
  const cardsById = new Map(cards.map((book) => [book.id, book]));

  return rows
    .map((row) => cardsById.get(row.bookId))
    .filter((book): book is BookCardType => !!book);
}

export async function getUserBookTrackingImpl(data: UserBookTrackingInput) {
  const [row] = await db
    .select({
      status: userBooks.status,
      pageProgress: userBooks.pageProgress,
      notes: userBooks.notes,
      startedAt: userBooks.startedAt,
      finishedAt: userBooks.finishedAt,
    })
    .from(userBooks)
    .where(and(eq(userBooks.userId, data.userId), eq(userBooks.bookId, data.bookId)))
    .limit(1);

  return row ?? null;
}
