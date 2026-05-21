import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

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
  // Temporary auth boundary: client session id is passed until Neon Auth exposes
  // the server-session support we need for TanStack Start.
  userId: z.string().min(1),
  data: TrackingData,
});

export type UpdateBookTrackingInput = z.infer<typeof updateBookTrackingSchema>;

export const updateBookTracking = createServerFn({ method: "POST" })
  .inputValidator(updateBookTrackingSchema)
  .handler(async ({ data }) => {
    const { updateBookTrackingImpl } = await import("./update-book.impl");
    return await updateBookTrackingImpl(data);
  });
