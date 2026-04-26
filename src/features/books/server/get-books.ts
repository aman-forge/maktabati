import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";
import type { BookWithAuthor } from "@/db/tables";
import type { BookSearch } from "@/app/_main/search";

// This is a type for the input to check if its valid and we use the input values to filter the data to fetch the books that we need according to the user's search. 
type GetBooksInput = Pick<BookSearch, "q" | "author" | "genres" | "sort" | "minYear" | "maxYear">;

export const getBooks = createServerFn({ method: "GET" }).inputValidator((data: GetBooksInput) => data).handler(async ({data}) => {
    const books: BookWithAuthor[] = await db.query.books.findMany({
      where: {
        ...(data.q && { OR: [{ title: { ilike: `%${data.q}%` } }, { originalTitle: { ilike: `%${data.q}%` } }] }),
        ...(data.author && { author: { name: { ilike: `%${data.author}%` } } }),
        ...((data.minYear ||  data.maxYear) && { publicationYear: {...(data.minYear &&{ gte: data.minYear }), ...(data.maxYear &&{ lte: data.maxYear })} }),
        ...(data.genres && data.genres.length > 0 && { genres: { arrayOverlaps: data.genres } }),
      },
      with: {
        author: true,
      },
      limit: 15,
    });
    return books;
  });
