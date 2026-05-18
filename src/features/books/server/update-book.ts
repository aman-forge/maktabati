import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { readingStatusEnum, userBooks } from "@/db/tables";

const TrackingData = z.object({
  status: z.enum(readingStatusEnum.enumValues),
  score: z.number().int().min(0).max(10).nullable(),
  pagesProgress: z.number().int().min(0).nullable(),
  startDate: z.date().nullable(),
  finishDate: z.date().nullable(),
  notes: z.string().nullable(),
  isFavorite: z.boolean().default(false),
  rereadCount: z.number().int().min(0).default(0),
});
export type TrackingDataType = z.infer<typeof TrackingData>;
const updateBookTrackingSchema = z.object({
  bookId: z.uuid(),
  userId: z.uuid(),
  data: TrackingData,
});

export const updateBookTracking = createServerFn({ method: "POST" })
  .inputValidator(updateBookTrackingSchema)
  .handler(async ({ data: { bookId, userId, data } }) => {
    if (!userId) {
      throw new Error("Unauthorized");
    }
    const existingProgress = await db.query.userBooks.findFirst({
      where: {
        userId,
        bookId,
      },
    });
    if (!existingProgress) {
      return await db
        .insert(userBooks)
        .values({
          userId: userId,
          bookId: bookId,
          status: data.status,
          startedAt: data.startDate,
          finishedAt: data.finishDate,
          // score: data.score,
          // pagesProgress: data.pagesProgress,
          // notes: data.notes,
          // isFavorite: data.isFavorite,
          // rereadCount: data.rereadCount,
        })
        .returning();
    }
    return await db
      .update(userBooks)
      .set({
        status: data.status,
        startedAt: data.startDate,
        finishedAt: data.finishDate,
        // score: data.score,
        // pagesProgress: data.pagesProgress,
        // notes: data.notes,
        // isFavorite: data.isFavorite,
        // rereadCount: data.rereadCount,
      })
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)))
      .returning();
  });
