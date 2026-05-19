import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { db } from "@/db";
import { readingStatusEnum, userBooks } from "@/db/tables";

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .nullable();

const TrackingData = z.object({
  status: z.enum(readingStatusEnum.enumValues),
  pageProgress: z.number().int().min(0).nullable(),
  notes: z.string().trim().nullable(),
  startedAt: dateStringSchema,
  finishedAt: dateStringSchema,
});
export type TrackingDataType = z.infer<typeof TrackingData>;
const updateBookTrackingSchema = z.object({
  bookId: z.uuid(),
  // Temporary auth boundary: client session id is passed until Neon Auth exposes
  // the server-session support we need for TanStack Start.
  userId: z.string().min(1),
  data: TrackingData,
});

export const updateBookTracking = createServerFn({ method: "POST" })
  .inputValidator(updateBookTrackingSchema)
  .handler(async ({ data: { bookId, userId, data } }) => {
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
  });
