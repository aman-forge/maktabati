import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { readingStatusEnum } from "@/db/tables";

const updateBookTrackingSchema = z.object({
  bookId: z.string(),
  status: z.enum(readingStatusEnum.enumValues),
  score: z.number().int().min(0).max(10),
  pagesProgress: z.number().int().min(0),
  startDate: z.date(),
  finishDate: z.date(),
  notes: z.string(),
  isFavorite: z.boolean(),
  rereadCount: z.number().int().min(0),
});

export const updateBookTracking = createServerFn({ method: "POST" })
  .inputValidator(updateBookTrackingSchema)
  .handler(async ({ data }) => {
    // if (!session) {
    //   throw new Error("Unauthorized");
    // }
    // const existingBook = await prisma.userBook.findFirst({
    //   where: {
    //     userId: session.user.id,
    //     bookId,
    //   },
    // });
    //   if (!existingBook) {
    //     throw new Error("Book not found");
    //   }
    //   const updatedBook = await prisma.userBook.update({
    //     where: {
    //       id: existingBook.id,
    //     },
    //     data: {
    //       status,
    //       score,
    //       pagesProgress,
    //       startDate,
    //       finishDate,
    //       notes,
    //       isFavorite,
    //       rereadCount,
    //     },
    //   });
    //   return updatedBook;
    // },
  });
