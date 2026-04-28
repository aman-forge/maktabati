import { createServerFn } from "@tanstack/react-start";
import {
  and,
  arrayOverlaps,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  lte,
  or,
  type SQL,
} from "drizzle-orm";
import { bookSearchSchema } from "@/app/_main/search";
import { db } from "@/db";
import type { BookWithAuthor } from "@/db/tables";
import { authors, books } from "@/db/tables";

// ==== Home/Browse Page ==== //
export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
  return db.query.books.findMany({
    limit: 10,
    with: {
      author: true,
    },
    orderBy: {
      publicationDate: "desc",
    },
  });
});

// ==== Search Page ==== //

const PAGE_SIZE = 10 as const;

export const searchBooks = createServerFn({ method: "GET" })
  .inputValidator(bookSearchSchema)
  .handler(
    async ({ data }): Promise<{ books: BookWithAuthor[]; total: number; hasMore: boolean }> => {
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

      const booksRows = await db
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
          createdAt: books.createdAt,
          updatedAt: books.updatedAt,
          author: {
            id: authors.id,
            name: authors.name,
            slug: authors.slug,
          },
        })
        .from(books)
        .leftJoin(authors, eq(books.authorId, authors.id))
        .where(where)
        .orderBy(orderBy, desc(books.id))
        .limit(PAGE_SIZE)
        .offset((page - 1) * PAGE_SIZE);

      const [{ total }] = await db
        .select({ total: count() })
        .from(books)
        .leftJoin(authors, eq(books.authorId, authors.id))
        .where(where);

      return {
        books: booksRows as BookWithAuthor[],
        total: Number(total),
        hasMore: page * PAGE_SIZE < Number(total),
      };
    },
  );
