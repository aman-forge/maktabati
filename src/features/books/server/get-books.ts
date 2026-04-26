import { createServerFn } from "@tanstack/react-start";
import { and, arrayOverlaps, asc, desc, eq, gte, ilike, lte, or, type SQL } from "drizzle-orm";
import { bookSearchSchema } from "@/app/_main/search";
import { db } from "@/db";
import type { BookWithAuthor } from "@/db/tables";
import { authors, books } from "@/db/tables";

// ==== Home/Browse Page ==== //
export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  return db.query.books.findMany({
    limit: 10,
    orderBy: {
      publicationDate: "desc",
    },
  });
});

// ==== Search Page ==== //

const PAGE_SIZE = 20;
export const searchBooks = createServerFn({ method: "GET" })
  .inputValidator(bookSearchSchema)
  .handler(async ({ data }): Promise<{ books: BookWithAuthor[]; total: number }> => {
    const conditions: SQL[] = [];

    if (data.q) {
      conditions.push(
        or(ilike(books.title, `%${data.q}%`), ilike(books.originalTitle, `%${data.q}%`))!,
      );
    }
    if (data.author) {
      conditions.push(ilike(authors.name, `%${data.author}%`));
    }
    if (data.minYear) conditions.push(gte(books.publicationYear, data.minYear));
    if (data.maxYear) conditions.push(lte(books.publicationYear, data.maxYear));
    if (data.minPages) conditions.push(gte(books.pageCount, data.minPages));
    if (data.maxPages) conditions.push(lte(books.pageCount, data.maxPages));
    if (data.genres?.length) conditions.push(arrayOverlaps(books.genres, data.genres));

    const orderBy = {
      newest: desc(books.publicationYear),
      oldest: asc(books.publicationYear),
      "title-asc": asc(books.title),
      "title-desc": desc(books.title),
    }[data.sort];

    const where = conditions.length ? and(...conditions) : undefined;
    const page = data.page ?? 1;

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
        // translator: books.translator,
        genres: books.genres,
        // isbn: books.isbn,
        // isbn13: books.isbn13,
        // edition: books.edition,
        // authorId: books.authorId,
        // publisherId: books.publisherId,
        // seriesId: books.seriesId,
        // seriesPosition: books.seriesPosition,
        createdAt: books.createdAt,
        updatedAt: books.updatedAt,
        author: {
          id: authors.id,
          name: authors.name,
          slug: authors.slug,
          // profileImage: authors.profileImage,
        },
      })
      .from(books)
      .leftJoin(authors, eq(books.authorId, authors.id))
      .where(where)
      .orderBy(orderBy)
      .limit(PAGE_SIZE)
      .offset((page - 1) * PAGE_SIZE);

    return {
      books: rows as BookWithAuthor[],
      total: rows.length, // TODO: replace with COUNT(*) query when you add proper pagination UI
    };
  });
