import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import type { BookWithAuthor } from "@/db/tables";

export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  const books: BookWithAuthor[] = await db.query.books.findMany({
    with: {
      author: true,
    },
    limit: 15,
  });
  return books;
});
