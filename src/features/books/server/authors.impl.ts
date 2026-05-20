import { asc, desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "@/db";
import { authors, bookAuthors } from "@/db/tables";

import type { AuthorListItem } from "../types";
import type { AuthorSearchInput } from "./authors";

export async function searchAuthorsImpl(data: AuthorSearchInput): Promise<AuthorListItem[]> {
  const pattern = data.q ? `%${data.q}%` : undefined;
  const where = pattern
    ? or(ilike(authors.name, pattern), ilike(authors.nameEn, pattern))
    : undefined;
  const bookCount = sql<string>`count(distinct ${bookAuthors.bookId})`;
  const orderBy =
    data.sort === "books"
      ? desc(bookCount)
      : data.sort === "name-desc"
        ? desc(authors.name)
        : asc(authors.name);

  const rows = await db
    .select({
      id: authors.id,
      slug: authors.slug,
      name: authors.name,
      nameEn: authors.nameEn,
      profileImage: authors.profileImage,
      bio: authors.bio,
      birthYear: authors.birthYear,
      deathYear: authors.deathYear,
      nationality: authors.nationality,
      bookCount,
    })
    .from(authors)
    .leftJoin(bookAuthors, eq(bookAuthors.authorId, authors.id))
    .where(where)
    .groupBy(
      authors.id,
      authors.slug,
      authors.name,
      authors.nameEn,
      authors.profileImage,
      authors.bio,
      authors.birthYear,
      authors.deathYear,
      authors.nationality,
    )
    .orderBy(orderBy, asc(authors.name))
    .limit(80);

  return rows.map((row) => ({
    ...row,
    bookCount: Number(row.bookCount),
  }));
}
