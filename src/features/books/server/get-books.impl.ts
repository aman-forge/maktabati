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
  ne,
  or,
  type SQL,
  sql,
} from "drizzle-orm";

import { db } from "@/db";
import {
  authors,
  bookAuthors,
  books,
  profiles,
  publishers,
  reviews,
  series,
  userBooks,
} from "@/db/tables";
import {
  emptyRatingSummary,
  groupContributorsByBookId,
  mapRatingSummaryRow,
  mapBookCard,
  mapBookReview,
  mapDetailedBook,
  selectPrimaryAuthor,
  toPublisherSummary,
  type ContributorRow,
} from "@/features/books/lib/mappers";

import type { BookSearchInput } from "../lib/validators";
import type { BookRow, UserBookRow } from "../schema-types";
import type { BookCardType, BookContributor, BookRatingSummary, DetailedBookType } from "../types";

// ==== Shared projections ==== //
const bookSelect = {
  id: books.id,
  slug: books.slug,
  publisherId: books.publisherId,
  seriesId: books.seriesId,
  seriesPosition: books.seriesPosition,
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
  isbn: books.isbn,
  isbn13: books.isbn13,
  edition: books.edition,
  createdAt: books.createdAt,
  updatedAt: books.updatedAt,
};

type TrackingProjection = Pick<
  UserBookRow,
  "status" | "pageProgress" | "notes" | "startedAt" | "finishedAt"
>;

const PAGE_SIZE = 24 as const;

const ORDER_MAP = {
  newest: desc(books.publicationYear),
  oldest: asc(books.publicationYear),
  "title-asc": asc(books.title),
  "title-desc": desc(books.title),
} satisfies Record<string, SQL>;

function uniqueBookIds(bookRows: Pick<BookRow, "id">[]) {
  return Array.from(new Set(bookRows.map((book) => book.id)));
}

function contributorSearchCondition(pattern: string): SQL {
  return sql`exists (
    select 1
    from ${bookAuthors}
    inner join ${authors} on ${bookAuthors.authorId} = ${authors.id}
    where ${bookAuthors.bookId} = ${books.id}
      and (${authors.name} ilike ${pattern} or ${authors.nameEn} ilike ${pattern})
  )`;
}

function readingStatusCondition(userId: string, statuses: readonly string[]): SQL {
  const statusList = sql.join(
    statuses.map((status) => sql`${status}`),
    sql`, `,
  );

  return sql`exists (
    select 1
    from ${userBooks}
    where ${userBooks.bookId} = ${books.id}
      and ${userBooks.userId} = ${userId}
      and ${userBooks.status} in (${statusList})
  )`;
}

export async function getBookRowsByIds(bookIds: string[]): Promise<BookRow[]> {
  if (bookIds.length === 0) return [];

  return await db.select(bookSelect).from(books).where(inArray(books.id, bookIds));
}

export async function getContributorsForBookIds(
  bookIds: string[],
): Promise<Map<string, BookContributor[]>> {
  if (bookIds.length === 0) return new Map();

  const rows: ContributorRow[] = await db
    .select({
      bookId: bookAuthors.bookId,
      role: bookAuthors.role,
      order: bookAuthors.order,
      author: {
        id: authors.id,
        slug: authors.slug,
        name: authors.name,
        nameEn: authors.nameEn,
        profileImage: authors.profileImage,
        bio: authors.bio,
        birthYear: authors.birthYear,
        deathYear: authors.deathYear,
        nationality: authors.nationality,
      },
    })
    .from(bookAuthors)
    .innerJoin(authors, eq(bookAuthors.authorId, authors.id))
    .where(inArray(bookAuthors.bookId, bookIds))
    .orderBy(bookAuthors.bookId, bookAuthors.order, bookAuthors.role, authors.name);

  return groupContributorsByBookId(rows);
}

export async function getRatingSummariesForBookIds(
  bookIds: string[],
): Promise<Map<string, BookRatingSummary>> {
  if (bookIds.length === 0) return new Map();

  const rows = await db
    .select({
      bookId: reviews.bookId,
      average: sql<string>`coalesce(avg(${reviews.rating}), 0)`,
      totalRatings: sql<string>`count(${reviews.rating})`,
      totalReviews: sql<string>`count(*) filter (
        where ${reviews.body} is not null and trim(${reviews.body}) <> ''
      )`,
      star1: sql<string>`count(*) filter (where ${reviews.rating} = 1)`,
      star2: sql<string>`count(*) filter (where ${reviews.rating} = 2)`,
      star3: sql<string>`count(*) filter (where ${reviews.rating} = 3)`,
      star4: sql<string>`count(*) filter (where ${reviews.rating} = 4)`,
      star5: sql<string>`count(*) filter (where ${reviews.rating} = 5)`,
    })
    .from(reviews)
    .where(inArray(reviews.bookId, bookIds))
    .groupBy(reviews.bookId);

  return new Map(rows.map((row) => [row.bookId, mapRatingSummaryRow(row)]));
}

async function getTrackingByBookIds(userId: string | undefined, bookIds: string[]) {
  if (!userId || bookIds.length === 0) return new Map<string, TrackingProjection>();

  const rows = await db
    .select({
      bookId: userBooks.bookId,
      status: userBooks.status,
      pageProgress: userBooks.pageProgress,
      notes: userBooks.notes,
      startedAt: userBooks.startedAt,
      finishedAt: userBooks.finishedAt,
    })
    .from(userBooks)
    .where(and(eq(userBooks.userId, userId), inArray(userBooks.bookId, bookIds)));

  return new Map(rows.map((row) => [row.bookId, row]));
}

export async function hydrateBookCards(
  bookRows: BookRow[],
  userId?: string,
): Promise<BookCardType[]> {
  const bookIds = uniqueBookIds(bookRows);
  const [contributorsByBookId, ratingByBookId, trackingByBookId] = await Promise.all([
    getContributorsForBookIds(bookIds),
    getRatingSummariesForBookIds(bookIds),
    getTrackingByBookIds(userId, bookIds),
  ]);

  return bookRows.map((book) =>
    mapBookCard({
      book,
      contributors: contributorsByBookId.get(book.id) ?? [],
      tracking: trackingByBookId.get(book.id),
      ratingSummary: ratingByBookId.get(book.id),
    }),
  );
}

// ==== Home/Browse Page ==== //
export async function getBooksImpl(): Promise<BookCardType[]> {
  const bookRows = await db
    .select(bookSelect)
    .from(books)
    .orderBy(desc(books.publicationDate))
    .limit(10);
  return await hydrateBookCards(bookRows);
}

// ==== Discovery Page ==== //
export async function searchBooksImpl(
  data: BookSearchInput,
  userId?: string,
): Promise<{
  books: BookCardType[];
  total: number;
  hasMore: boolean;
}> {
  const conditions: SQL[] = [];

  if (data.q) {
    const pattern = `%${data.q}%`;
    const orCondition = or(
      ilike(books.title, pattern),
      ilike(books.originalTitle, pattern),
      ilike(books.isbn, pattern),
      ilike(books.isbn13, pattern),
      contributorSearchCondition(pattern),
    );
    if (orCondition) conditions.push(orCondition);
  }

  if (data.author) {
    conditions.push(contributorSearchCondition(`%${data.author}%`));
  }

  if (data.minYear) conditions.push(gte(books.publicationYear, data.minYear));
  if (data.maxYear) conditions.push(lte(books.publicationYear, data.maxYear));
  if (data.minPages) conditions.push(gte(books.pageCount, data.minPages));
  if (data.maxPages) conditions.push(lte(books.pageCount, data.maxPages));
  if (data.genres?.length) conditions.push(arrayOverlaps(books.genres, data.genres));
  if (data.topics?.length) conditions.push(arrayOverlaps(books.topics, data.topics));
  if (data.publishers?.length) conditions.push(inArray(books.publisherId, data.publishers));
  if (data.ratingMin && data.ratingMin > 0) {
    conditions.push(sql`coalesce((
        select avg(${reviews.rating})
        from ${reviews}
        where ${reviews.bookId} = ${books.id}
          and ${reviews.rating} is not null
      ), 0) >= ${data.ratingMin}`);
  }
  if (userId && data.readingStatus?.length) {
    conditions.push(readingStatusCondition(userId, data.readingStatus));
  }

  const page = data.page ?? 1;
  const offset = (page - 1) * PAGE_SIZE;
  const orderBy = ORDER_MAP[data.sort] ?? ORDER_MAP.newest;
  const where = conditions.length ? and(...conditions) : undefined;

  const rows = await db
    .select({
      ...bookSelect,
      total: sql<string>`count(*) over()`,
    })
    .from(books)
    .where(where)
    .orderBy(orderBy, desc(books.id))
    .limit(PAGE_SIZE)
    .offset(offset);

  const total = Number(rows[0]?.total ?? 0);
  const bookRows = rows.map(({ total: _total, ...book }) => book);

  return {
    books: await hydrateBookCards(bookRows, userId),
    total,
    hasMore: page * PAGE_SIZE < total,
  };
}

async function getAuthorBookStats(authorId: string, currentBookId: string) {
  const [countRow] = await db
    .select({
      totalBooks: sql<string>`count(distinct ${bookAuthors.bookId})`,
    })
    .from(bookAuthors)
    .where(eq(bookAuthors.authorId, authorId));

  const relatedIdRows = await db
    .selectDistinct({ id: bookAuthors.bookId })
    .from(bookAuthors)
    .where(and(eq(bookAuthors.authorId, authorId), ne(bookAuthors.bookId, currentBookId)))
    .limit(8);

  const relatedRows = await getBookRowsByIds(relatedIdRows.map((row) => row.id));
  const relatedBooks = await hydrateBookCards(relatedRows);

  return {
    totalBooks: Number(countRow?.totalBooks ?? 0),
    relatedBooks,
  };
}

async function getFallbackRelatedBooks(book: BookRow) {
  if (!book.genres?.length) return [];

  const rows = await db
    .select(bookSelect)
    .from(books)
    .where(and(ne(books.id, book.id), arrayOverlaps(books.genres, book.genres)))
    .orderBy(desc(books.publicationYear), desc(books.id))
    .limit(8);

  return await hydrateBookCards(rows);
}

export async function getBookByIdImpl(bookId: string): Promise<DetailedBookType | null> {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(bookId)) return null;

  const [book] = await db.select(bookSelect).from(books).where(eq(books.id, bookId)).limit(1);
  if (!book) return null;

  const contributors = (await getContributorsForBookIds([book.id])).get(book.id) ?? [];
  const primaryAuthor = selectPrimaryAuthor(contributors);
  const [ratingSummaries, reviewRows, publisherRows, seriesRows] = await Promise.all([
    getRatingSummariesForBookIds([book.id]),
    db
      .select({
        id: reviews.id,
        rating: reviews.rating,
        body: reviews.body,
        spoiler: reviews.spoiler,
        createdAt: reviews.createdAt,
        user: {
          id: profiles.id,
          username: profiles.username,
          displayName: profiles.displayName,
          avatarUrl: profiles.avatarUrl,
        },
      })
      .from(reviews)
      .leftJoin(profiles, eq(reviews.userId, profiles.id))
      .where(eq(reviews.bookId, book.id))
      .orderBy(desc(reviews.createdAt))
      .limit(20),
    book.publisherId
      ? db.select().from(publishers).where(eq(publishers.id, book.publisherId)).limit(1)
      : Promise.resolve([]),
    book.seriesId
      ? db.select().from(series).where(eq(series.id, book.seriesId)).limit(1)
      : Promise.resolve([]),
  ]);

  const authorStats = primaryAuthor
    ? await getAuthorBookStats(primaryAuthor.id, book.id)
    : {
        totalBooks: 0,
        relatedBooks: await getFallbackRelatedBooks(book),
      };
  const relatedBooks =
    authorStats.relatedBooks.length > 0
      ? authorStats.relatedBooks
      : await getFallbackRelatedBooks(book);
  const enrichedContributors = contributors.map((contributor) =>
    contributor.author.id === primaryAuthor?.id
      ? {
          ...contributor,
          author: {
            ...contributor.author,
            totalBooks: authorStats.totalBooks,
            books: relatedBooks.slice(0, 3).map((relatedBook) => ({
              id: relatedBook.id,
              title: relatedBook.title,
              coverImageUrl: relatedBook.coverImageUrl ?? null,
            })),
          },
        }
      : contributor,
  );
  const publisher = publisherRows[0] ? toPublisherSummary(publisherRows[0]) : null;
  const currentSeries = seriesRows[0]
    ? {
        id: seriesRows[0].id,
        name: seriesRows[0].name,
        slug: seriesRows[0].slug,
      }
    : null;

  return mapDetailedBook({
    book,
    contributors: enrichedContributors,
    series: currentSeries,
    publisher,
    ratingSummary: ratingSummaries.get(book.id) ?? emptyRatingSummary(),
    reviews: reviewRows.map(mapBookReview),
    relatedBooks,
  });
}
