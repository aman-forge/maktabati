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

    if (!publisher) {
      return null;
    }

    return {
      ...publisher,
      website:
        publisher.website ??
        (import.meta.env.DEV ? "https://example.com" : null),
    };
  });

export type PublisherType = NonNullable<
  Awaited<ReturnType<typeof getPublisherById>>
>;