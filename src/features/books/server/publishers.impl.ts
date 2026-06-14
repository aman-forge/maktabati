import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { books, publishers } from "@/db/tables";

import type { PublisherDetail, PublisherListItem, PublisherOption } from "../types";
import { getBookRowsByIds, hydrateBookCards } from "./get-books.impl";
import { mapPublisherDetail } from "./publisher-detail-utils";
import type { PublisherSearchInput } from "./publishers";

export async function searchPublishersImpl(
  data: PublisherSearchInput,
): Promise<PublisherListItem[]> {
  const pattern = data.q ? `%${data.q}%` : undefined;
  const where = pattern
    ? or(ilike(publishers.name, pattern), ilike(publishers.country, pattern))
    : undefined;
  const bookCount = sql<string>`count(distinct ${books.id})`;
  const orderBy =
    data.sort === "books"
      ? desc(bookCount)
      : data.sort === "name-desc"
        ? desc(publishers.name)
        : asc(publishers.name);

  const rows = await db
    .select({
      id: publishers.id,
      slug: publishers.slug,
      name: publishers.name,
      logoUrl: publishers.logoUrl,
      website: publishers.website,
      country: publishers.country,
      bookCount,
    })
    .from(publishers)
    .leftJoin(books, eq(books.publisherId, publishers.id))
    .where(where)
    .groupBy(
      publishers.id,
      publishers.slug,
      publishers.name,
      publishers.logoUrl,
      publishers.website,
      publishers.country,
    )
    .orderBy(orderBy, asc(publishers.name))
    .limit(80);

  return rows.map((row) => ({
    ...row,
    bookCount: Number(row.bookCount),
  }));
}

export async function getPublisherOptionsImpl(): Promise<PublisherOption[]> {
  return await db
    .select({
      id: publishers.id,
      name: publishers.name,
      slug: publishers.slug,
    })
    .from(publishers)
    .orderBy(asc(publishers.name))
    .limit(200);
}

export async function getPublisherByIdImpl(publisherId: string): Promise<PublisherDetail | null> {
  const bookCount = sql<string>`count(distinct ${books.id})`;
  const [publisher] = await db
    .select({
      id: publishers.id,
      slug: publishers.slug,
      name: publishers.name,
      logoUrl: publishers.logoUrl,
      website: publishers.website,
      country: publishers.country,
      bookCount,
    })
    .from(publishers)
    .leftJoin(books, eq(books.publisherId, publishers.id))
    .where(eq(publishers.id, publisherId))
    .groupBy(
      publishers.id,
      publishers.slug,
      publishers.name,
      publishers.logoUrl,
      publishers.website,
      publishers.country,
    )
    .limit(1);

  if (!publisher) return null;

  const bookIdRows = await db
    .select({ id: books.id })
    .from(books)
    .where(eq(books.publisherId, publisher.id))
    .orderBy(desc(books.publicationDate), desc(books.publicationYear), desc(books.id))
    .limit(24);
  const bookRows = await getBookRowsByIds(bookIdRows.map((book) => book.id));
  const cards = await hydrateBookCards(bookRows);
  const cardsById = new Map(cards.map((book) => [book.id, book]));

  return mapPublisherDetail(
    publisher,
    bookIdRows
      .map((book) => cardsById.get(book.id))
      .filter((book): book is PublisherDetail["books"][number] => !!book),
  );
}
