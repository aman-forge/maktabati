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
import { bookSearchSchema } from "@/app/_main/discover/books";
import { db } from "@/db";
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

// ==== Discovery Page ==== //

const PAGE_SIZE = 24 as const;

export const searchBooks = createServerFn({ method: "GET" })
  .inputValidator(bookSearchSchema)
  .handler(async ({ data }) => {
    const conditions: SQL[] = [];

    // Unified search — q searches title, original title, AND author name
    if (data.q) {
      const pattern = `%${data.q}%`;
      conditions.push(
        or(
          ilike(books.title, pattern),
          ilike(books.originalTitle, pattern),
          ilike(authors.name, pattern),
        )!,
      );
    }

    // Explicit author filter (from FilterDialog or future author chip)
    // if (data.author) {
    //   conditions.push(ilike(authors.name, `%${data.author}%`));
    // }

    // Year range
    if (data.minYear) conditions.push(gte(books.publicationYear, data.minYear));
    if (data.maxYear) conditions.push(lte(books.publicationYear, data.maxYear));

    // Page count range
    if (data.minPages) conditions.push(gte(books.pageCount, data.minPages));
    if (data.maxPages) conditions.push(lte(books.pageCount, data.maxPages));

    // Genres
    if (data.genres?.length) {
      conditions.push(arrayOverlaps(books.genres, data.genres));
    }

    // Topics
    if (data.topics?.length) {
      conditions.push(arrayOverlaps(books.topics, data.topics));
    }

    // Rating
    // if (data.ratingMin && data.ratingMin > 0) {
    //   conditions.push(gte(books.averageRating, data.ratingMin));
    // }

    // Publishers
    if (data.publishers?.length) {
      conditions.push(inArray(books.publisherId, data.publishers));
    }

    const orderBy =
      {
        newest: desc(books.publicationYear),
        oldest: asc(books.publicationYear),
        "title-asc": asc(books.title),
        "title-desc": desc(books.title),
        // rating: desc(books.averageRating),
      }[data.sort] ?? desc(books.publicationYear);

    const where = conditions.length ? and(...conditions) : undefined;
    const page = data.page ?? 1;
    const offset = (page - 1) * PAGE_SIZE;

    const rows = await db
      .select({
        id: books.id,
        slug: books.slug,
        title: books.title,
        subtitle: books.subtitle,
        description: books.description,
        coverImageUrl: books.coverImageUrl ?? "/books/book.jpg",
        pageCount: books.pageCount,
        publicationYear: books.publicationYear,
        publicationDate: books.publicationDate,
        originalLanguage: books.originalLanguage,
        originalTitle: books.originalTitle,
        genres: books.genres,
        // averageRating: books.averageRating,
        createdAt: books.createdAt,
        updatedAt: books.updatedAt,
        author: {
          id: authors.id,
          name: authors.name,
          slug: authors.slug,
        },
        total: sql<number>`count(*) over()`, // ← one query instead of two
      })
      .from(books)
      .leftJoin(authors, eq(books.authorId, authors.id))
      .where(where)
      .orderBy(orderBy, desc(books.id))
      .limit(PAGE_SIZE)
      .offset(offset);

    const total = rows[0]?.total ?? 0;

    return {
      books: rows,
      total: Number(total),
      hasMore: page * PAGE_SIZE < Number(total),
    };
  });

type SearchBooksResult = Awaited<ReturnType<typeof searchBooks>>;
export type BookCardBook = SearchBooksResult["books"][number];

export const getBookById = createServerFn({ method: "GET" })
  .inputValidator((data: string) => data)
  .handler(async ({ data: requestedBookId }) => {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(requestedBookId)) return null;

    const book = await db.query.books.findFirst({
      where: {
        id: requestedBookId,
      },
      with: {
        author: {
          extras: {
            totalBooks: (author) =>
              db.$count(books, eq(books.authorId, author.id)),
          },

          with: {
            books: {
              limit: 3,
              columns: {
                id: true,
                title: true,
                coverImageUrl: true,
              },
              where: {
                NOT: {
                  id: requestedBookId,
                },
              },
            },
          },
        },
        series: true,
      },
    });

    if (!book) return null;

    return book;
  });
export type BookType = NonNullable<Awaited<ReturnType<typeof getBookById>>>;
