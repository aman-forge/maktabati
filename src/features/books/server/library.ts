import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { authors, books, userBooks } from "@/db/tables";

import type { BookCardType } from "../types";

// ==== Library Page Books ==== //
export const getUserBooks = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    const rows = await db
      .select({
        id: books.id,
        slug: books.slug,
        title: books.title,
        subtitle: books.subtitle,
        description: books.description,
        coverImageUrl: books.coverImageUrl,
        pageCount: books.pageCount,
        publicationYear: books.publicationYear,
        publicationDate: books.publicationDate,
        originalLanguage: books.originalLanguage,
        originalTitle: books.originalTitle,
        genres: books.genres,
        topics: books.topics,
        createdAt: books.createdAt,
        updatedAt: books.updatedAt,
        status: userBooks.status,
        startedAt: userBooks.startedAt,
        finishedAt: userBooks.finishedAt,
        author: {
          id: authors.id,
          name: authors.name,
          slug: authors.slug,
        },
      })
      .from(userBooks)
      .innerJoin(books, eq(userBooks.bookId, books.id))
      .innerJoin(authors, eq(books.authorId, authors.id))
      .where(eq(userBooks.userId, userId))
      .orderBy(desc(userBooks.updatedAt));

    return rows satisfies BookCardType[];
  });

export const getUserBookTracking = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      bookId: z.uuid(),
      userId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const [row] = await db
      .select({
        status: userBooks.status,
        startedAt: userBooks.startedAt,
        finishedAt: userBooks.finishedAt,
      })
      .from(userBooks)
      .where(and(eq(userBooks.userId, data.userId), eq(userBooks.bookId, data.bookId)))
      .limit(1);

    return row ?? null;
  });
