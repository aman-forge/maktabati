import { createServerFn } from "@tanstack/react-start";

import { bookSearchInputSchema } from "@/features/books/lib/validators";

import type { BookCardType, DetailedBookType } from "../types";

export const getBooks = createServerFn({ method: "GET" }).handler(
  async (): Promise<BookCardType[]> => {
    const { getBooksImpl } = await import("./get-books.impl");
    return await getBooksImpl();
  },
);

export const searchBooks = createServerFn({ method: "GET" })
  .inputValidator(bookSearchInputSchema)
  .handler(async ({ data }) => {
    const { searchBooksImpl } = await import("./get-books.impl");
    return await searchBooksImpl(data);
  });

export const getBookById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: bookId }): Promise<DetailedBookType | null> => {
    const { getBookByIdImpl } = await import("./get-books.impl");
    return await getBookByIdImpl(bookId);
  });
