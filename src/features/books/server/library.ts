import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { BookCardType } from "../types";

const userBookTrackingSchema = z.object({
  bookId: z.uuid(),
  userId: z.string().min(1),
});

export type UserBookTrackingInput = z.infer<typeof userBookTrackingSchema>;

export const getUserBooks = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data: userId }): Promise<BookCardType[]> => {
    const { getUserBooksImpl } = await import("./library.impl");
    return await getUserBooksImpl(userId);
  });

export const getUserBookTracking = createServerFn({ method: "GET" })
  .inputValidator(userBookTrackingSchema)
  .handler(async ({ data }) => {
    const { getUserBookTrackingImpl } = await import("./library.impl");
    return await getUserBookTrackingImpl(data);
  });
