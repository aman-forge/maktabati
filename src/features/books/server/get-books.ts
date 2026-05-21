import { createServerFn } from "@tanstack/react-start";
import {
  and,
  arrayOverlaps,
  asc,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
  or,
  type SQL,
  sql,
} from "drizzle-orm";

import { db } from "@/db";
import { authors, books, userBooks } from "@/db/tables";
import { bookSearchInputSchema } from "@/features/books/lib/validators";

import type { BookCardType, DetailedBookType } from "../types";

// ==== Home/Browse Page ==== //
export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  return (await db.query.books.findMany({
    limit: 10,
    with: { author: true },
    orderBy: { publicationDate: "desc" },
  })) as BookCardType[];
});

// ==== Discovery Page ==== //
const PAGE_SIZE = 24 as const;
const ORDER_MAP = {
  newest: desc(books.publicationYear),
  oldest: asc(books.publicationYear),
  "title-asc": asc(books.title),
  "title-desc": desc(books.title),
} satisfies Record<string, SQL>;

const ORDER_MAP = {
  newest: desc(books.publicationYear),
  oldest: asc(books.publicationYear),
  "title-asc": asc(books.title),
  "title-desc": desc(books.title),
} satisfies Record<string, SQL>;

export const searchBooks = createServerFn({ method: "GET" })
  .inputValidator(bookSearchInputSchema)
  .handler(async ({ data }) => {
    const conditions: SQL[] = [];

    if (data.q) {
      const pattern = `%${data.q}%`;
      const orCondition = or(
        ilike(books.title, pattern),
        ilike(books.originalTitle, pattern),
        ilike(authors.name, pattern),
      );
      if (orCondition) conditions.push(orCondition);
    }

    if (data.minYear) conditions.push(gte(books.publicationYear, data.minYear));
    if (data.maxYear) conditions.push(lte(books.publicationYear, data.maxYear));
    if (data.minPages) conditions.push(gte(books.pageCount, data.minPages));
    if (data.maxPages) conditions.push(lte(books.pageCount, data.maxPages));
    if (data.genres?.length) conditions.push(arrayOverlaps(books.genres, data.genres));
    if (data.topics?.length) conditions.push(arrayOverlaps(books.topics, data.topics));
    if (data.publishers?.length) conditions.push(inArray(books.publisherId, data.publishers));
    if (data.userId && data.readingStatus?.length) {
      conditions.push(inArray(userBooks.status, data.readingStatus));
    }

    const page = data.page ?? 1;
    const offset = (page - 1) * PAGE_SIZE;
    const orderBy = ORDER_MAP[data.sort] ?? ORDER_MAP.newest;
    const where = conditions.length ? and(...conditions) : undefined;
    const trackingJoin = data.userId
      ? and(eq(userBooks.bookId, books.id), eq(userBooks.userId, data.userId))
      : sql`false`;

    const rows = await db
      .select({
        id: books.id,
        slug: books.slug,
        title: books.title,
        subtitle: books.subtitle,
        description: books.description,
        coverImageUrl: books.coverImageUrl, // fallback in the component
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
        pageProgress: userBooks.pageProgress,
        notes: userBooks.notes,
        startedAt: userBooks.startedAt,
        finishedAt: userBooks.finishedAt,
        author: {
          id: authors.id,
          name: authors.name,
          slug: authors.slug,
        },
        total: sql<string>`count(*) over()`,
      })
      .from(books)
      .innerJoin(authors, eq(books.authorId, authors.id))
      .leftJoin(userBooks, trackingJoin)
      .where(where)
      .orderBy(orderBy, desc(books.id))
      .limit(PAGE_SIZE)
      .offset(offset);

    const total = Number(rows[0]?.total ?? 0);
    const resultBooks: BookCardType[] = rows.map(({ total: _total, ...book }) => book);

    return {
      books: resultBooks,
      total,
      hasMore: page * PAGE_SIZE < total,
    };
  });

export const getBookById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: bookId }) => {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(bookId)) return null;

    const book = await db.query.books.findFirst({
      where: { id: bookId },
      with: {
        author: {
          extras: {
            // Note: fires a separate COUNT query — fine for single-book pages only
            totalBooks: (author) => db.$count(books, eq(books.authorId, author.id)),
          },
          with: {
            books: {
              limit: 3,
              columns: { id: true, title: true, coverImageUrl: true },
              where: { NOT: { id: bookId } },
            },
          },
        },
        series: true,
        publisher: true,
      },
    });

    return (book as DetailedBookType) ?? null;
  });
