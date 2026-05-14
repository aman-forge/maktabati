import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import { uuidSchema } from "@/ui/lib/validators";

export const getAuthorById = createServerFn({ method: "GET" })
  .inputValidator(uuidSchema)
  .handler(async ({ data: authorId }) => {
    const author = await db.query.authors.findFirst({
      where: {
        id: authorId,
      },
      with: {
        books: true,
      },
    });

    return author ?? null;
  });
export type AuthorType = NonNullable<Awaited<ReturnType<typeof getAuthorById>>>;
