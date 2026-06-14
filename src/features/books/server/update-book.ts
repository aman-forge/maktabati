import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAuthMiddleware } from "@/features/auth/server/session";

import { READING_STATUSES } from "../types";

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .nullable();

const TrackingData = z.object({
  status: z.enum(READING_STATUSES),
  pageProgress: z.number().int().min(0).nullable(),
  notes: z.string().trim().nullable(),
  startedAt: dateStringSchema,
  finishedAt: dateStringSchema,
});

export type TrackingDataType = z.infer<typeof TrackingData>;

const updateBookTrackingSchema = z.object({
  bookId: z.uuid(),
  data: TrackingData,
});

export type UpdateBookTrackingData = z.infer<typeof updateBookTrackingSchema>;
export type UpdateBookTrackingInput = UpdateBookTrackingData & { userId: string };

export const updateBookTracking = createServerFn({ method: "POST" })
  .middleware([requireAuthMiddleware])
  .inputValidator(updateBookTrackingSchema)
  .handler(async ({ data, context }) => {
    const { updateBookTrackingImpl } = await import("./update-book.impl");
    return await updateBookTrackingImpl({ ...data, userId: context.user.id });
  });
