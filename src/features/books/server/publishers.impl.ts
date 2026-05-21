import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { books, publishers } from "@/db/tables";

import type { PublisherListItem, PublisherOption } from "../types";
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
