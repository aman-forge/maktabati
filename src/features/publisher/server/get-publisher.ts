import { createServerFn } from "@tanstack/react-start";

import { db } from "@/db";
import { uuidSchema } from "@/ui/lib/validators";

export const getPublisherById = createServerFn({ method: "GET" })
  .inputValidator(uuidSchema)
  .handler(async ({ data: publisherId }) => {
    const publisher = await db.query.publishers.findFirst({
      where: {
        id: publisherId,
      },
      with: {
        books: {
          with: {
            bookAuthors: {
              with: {
                author: true,
              },
            },
            series: true,
          },
        },
      },
    });

    return publisher ?? null;
  });

export type PublisherType = NonNullable<
  Awaited<ReturnType<typeof getPublisherById>>
>;