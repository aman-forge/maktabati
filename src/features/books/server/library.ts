import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { authors, books, userBooks } from "@/db/tables";

import { BookCardType } from "../types";

// ==== Library Page Books ==== //
export const getUserBooks = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(({ data: userId }) => {
    const rows = db
      .select({
        id: books.id,
        title: books.title,
        description: books.description,
        coverImageUrl: books.coverImageUrl,
        publicationYear: books.publicationYear,
        pageCount: books.pageCount,
        status: userBooks.status,
        author: { id: authors.id, name: authors.name },
      })
      .from(userBooks)
      .innerJoin(books, eq(userBooks.bookId, books.id))
      .leftJoin(authors, eq(books.authorId, authors.id))
      .where(eq(userBooks.userId, userId));

    return rows as Promise<BookCardType[]>;
  });
