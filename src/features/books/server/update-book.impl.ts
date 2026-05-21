import { db } from "@/db";
import { userBooks } from "@/db/tables";

import type { UpdateBookTrackingInput } from "./update-book";

export async function updateBookTrackingImpl({ bookId, userId, data }: UpdateBookTrackingInput) {
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return await db
    .insert(userBooks)
    .values({
      userId,
      bookId,
      status: data.status,
      pageProgress: data.pageProgress,
      notes: data.notes,
      startedAt: data.startedAt,
      finishedAt: data.finishedAt,
    })
    .onConflictDoUpdate({
      target: [userBooks.userId, userBooks.bookId],
      set: {
        status: data.status,
        pageProgress: data.pageProgress,
        notes: data.notes,
        startedAt: data.startedAt,
        finishedAt: data.finishedAt,
        updatedAt: new Date(),
      },
    })
    .returning();
}
