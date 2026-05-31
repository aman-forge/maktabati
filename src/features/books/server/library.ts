import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAuthMiddleware } from "@/features/auth/server/session";

import type { BookCardType } from "../types";

const userBookTrackingSchema = z.object({
  bookId: z.uuid(),
});

export type UserBookTrackingInput = z.infer<typeof userBookTrackingSchema>;

export const getUserBooks = createServerFn({ method: "GET" })
  .middleware([requireAuthMiddleware])
  .handler(async ({ context }): Promise<BookCardType[]> => {
    const { getUserBooksImpl } = await import("./library.impl");
    return await getUserBooksImpl(context.user.id);
  });

export const getUserBookTracking = createServerFn({ method: "GET" })
  .middleware([requireAuthMiddleware])
  .inputValidator(userBookTrackingSchema)
  .handler(async ({ data, context }) => {
    const { getUserBookTrackingImpl } = await import("./library.impl");
    return await getUserBookTrackingImpl({ ...data, userId: context.user.id });
  });
