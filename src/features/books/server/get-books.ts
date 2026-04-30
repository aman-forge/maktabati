import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import type { BookWithAuthor, BookWithAuthorWithReviews } from "@/db/tables";


export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  const books: BookWithAuthor[] = await db.query.books.findMany({
    with: {
      author: true,
    },
    limit: 15,
  });
  return books;
});

//----------GetBookById----------//
export const getBookById = createServerFn({ method: "GET" }).inputValidator((data:string) => data).handler(async ({data: id}) => {
  const book: BookWithAuthorWithReviews = (await db.query.books.findFirst({
    where: {
      id: id,
    },
    with: {
      author: true,
      reviews: true,
    },
  }))!;
  return book;
});
