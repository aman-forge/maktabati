import type {
  AuthorRow,
  BookRow,
  PublisherRow,
  SeriesRow,
  UserBookRow,
} from "@/features/books/schema-types";
import type {
  AuthorSummary,
  BibliographicEdition,
  BookCardType,
  BookContributor,
  BookRatingSummary,
  BookReviewItem,
  DetailedBookType,
  PublisherSummary,
} from "@/features/books/types";

export interface ContributorRow {
  bookId: string;
  role: BookContributor["role"];
  order: number;
  author: AuthorSummary;
}

export interface RatingSourceRow {
  bookId: string;
  rating: number | null;
  body?: string | null;
}

export interface RatingSummaryRow {
  bookId: string;
  average: string | number | null;
  totalRatings: string | number;
  totalReviews: string | number;
  star1: string | number;
  star2: string | number;
  star3: string | number;
  star4: string | number;
  star5: string | number;
}

export interface ReviewSourceRow {
  id: string;
  rating: number | null;
  body: string | null;
  spoiler: boolean;
  createdAt: Date;
  user: {
    id: string | null;
    username: string | null;
    displayName: string | null;
    avatarUrl: string | null;
  } | null;
}

export function toAuthorSummary(author: AuthorRow): AuthorSummary {
  return {
    id: author.id,
    slug: author.slug,
    name: author.name,
    nameEn: author.nameEn,
    profileImage: author.profileImage,
    bio: author.bio,
    birthYear: author.birthYear,
    deathYear: author.deathYear,
    nationality: author.nationality,
  };
}

export function toPublisherSummary(publisher: PublisherRow): PublisherSummary {
  return {
    id: publisher.id,
    slug: publisher.slug,
    name: publisher.name,
    logoUrl: publisher.logoUrl,
    website: publisher.website,
    country: publisher.country,
  };
}

export function sortContributors(contributors: BookContributor[]): BookContributor[] {
  return [...contributors].sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    if (a.role !== b.role) return a.role.localeCompare(b.role);
    return a.author.name.localeCompare(b.author.name, "ar");
  });
}

export function groupContributorsByBookId(rows: ContributorRow[]): Map<string, BookContributor[]> {
  const grouped = new Map<string, BookContributor[]>();

  for (const row of rows) {
    const current = grouped.get(row.bookId) ?? [];
    current.push({
      role: row.role,
      order: row.order,
      author: row.author,
    });
    grouped.set(row.bookId, current);
  }

  for (const [bookId, contributors] of grouped) {
    grouped.set(bookId, sortContributors(contributors));
  }

  return grouped;
}

export function selectPrimaryAuthor(contributors: BookContributor[]): AuthorSummary | null {
  return (
    contributors.find((contributor) => contributor.role === "author")?.author ??
    contributors.find((contributor) => contributor.role === "co_author")?.author ??
    contributors[0]?.author ??
    null
  );
}

export function authorsByRole(
  contributors: BookContributor[],
  role: BookContributor["role"],
): AuthorSummary[] {
  return contributors.filter((contributor) => contributor.role === role).map((item) => item.author);
}

export function calculateRatingSummary(
  rows: Pick<RatingSourceRow, "rating" | "body">[],
): BookRatingSummary {
  const ratings = rows
    .map((row) => row.rating)
    .filter((rating): rating is number => typeof rating === "number");
  const totalRatings = ratings.length;
  const totalReviews = rows.filter((row) => row.body?.trim()).length;
  const average =
    totalRatings > 0 ? ratings.reduce((sum, rating) => sum + rating, 0) / totalRatings : 0;

  return {
    average,
    totalRatings,
    totalReviews,
    distribution: ([5, 4, 3, 2, 1] as const).map((stars) => {
      const count = ratings.filter((rating) => rating === stars).length;
      return {
        stars,
        percent: totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0,
      };
    }),
  };
}

export function groupRatingSummariesByBookId(
  rows: RatingSourceRow[],
): Map<string, BookRatingSummary> {
  const grouped = new Map<string, RatingSourceRow[]>();

  for (const row of rows) {
    grouped.set(row.bookId, [...(grouped.get(row.bookId) ?? []), row]);
  }

  return new Map(
    Array.from(grouped.entries()).map(([bookId, bookRows]) => [
      bookId,
      calculateRatingSummary(bookRows),
    ]),
  );
}

export function mapRatingSummaryRow(row: RatingSummaryRow): BookRatingSummary {
  const totalRatings = Number(row.totalRatings);
  const totalReviews = Number(row.totalReviews);
  const counts = {
    1: Number(row.star1),
    2: Number(row.star2),
    3: Number(row.star3),
    4: Number(row.star4),
    5: Number(row.star5),
  } satisfies Record<1 | 2 | 3 | 4 | 5, number>;

  return {
    average: Number(row.average ?? 0),
    totalRatings,
    totalReviews,
    distribution: ([5, 4, 3, 2, 1] as const).map((stars) => ({
      stars,
      percent: totalRatings > 0 ? Math.round((counts[stars] / totalRatings) * 100) : 0,
    })),
  };
}

export function emptyRatingSummary(): BookRatingSummary {
  return calculateRatingSummary([]);
}

export function mapBookReview(row: ReviewSourceRow): BookReviewItem {
  const displayName = row.user?.displayName ?? row.user?.username ?? "قارئ مجهول";

  return {
    id: row.id,
    name: displayName,
    avatar: row.user?.avatarUrl ?? "/books/book.jpg",
    rating: row.rating ?? 0,
    date: row.createdAt.toISOString().slice(0, 10),
    shelf: row.spoiler ? "تتضمن حرقًا" : "مراجعة",
    title: row.rating ? `تقييم ${row.rating} من 5` : "مراجعة نصية",
    body: row.body ?? "",
    likes: 0,
  };
}

export function mapBookCard({
  book,
  contributors,
  tracking,
  ratingSummary,
}: {
  book: BookRow;
  contributors: BookContributor[];
  tracking?: Pick<
    UserBookRow,
    "status" | "pageProgress" | "notes" | "startedAt" | "finishedAt"
  > | null;
  ratingSummary?: BookRatingSummary;
}): BookCardType {
  return {
    id: book.id,
    slug: book.slug,
    title: book.title,
    subtitle: book.subtitle,
    description: book.description,
    coverImageUrl: book.coverImageUrl,
    pageCount: book.pageCount,
    publicationYear: book.publicationYear,
    publicationDate: book.publicationDate,
    originalLanguage: book.originalLanguage,
    originalTitle: book.originalTitle,
    genres: book.genres,
    topics: book.topics,
    createdAt: book.createdAt,
    updatedAt: book.updatedAt,
    status: tracking?.status ?? null,
    pageProgress: tracking?.pageProgress ?? null,
    notes: tracking?.notes ?? null,
    startedAt: tracking?.startedAt ?? null,
    finishedAt: tracking?.finishedAt ?? null,
    primaryAuthor: selectPrimaryAuthor(contributors),
    contributors,
    averageRating: ratingSummary?.average ?? null,
    totalRatings: ratingSummary?.totalRatings ?? 0,
  };
}

export function buildBibliographicEditions({
  book,
  publisher,
  translators,
}: {
  book: BookRow;
  publisher: PublisherSummary | null;
  translators: AuthorSummary[];
}): BibliographicEdition[] {
  return [
    {
      id: `${book.id}-current`,
      format: book.edition ?? "طبعة متاحة",
      edition: book.edition ?? "الطبعة الحالية",
      publisher: publisher?.name ?? "غير مذكور",
      publication: book.publicationYear ? `سنة ${book.publicationYear}` : "غير مذكور",
      isbn: book.isbn ?? undefined,
      isbn13: book.isbn13 ?? undefined,
      language: "العربية",
      translator: translators.length
        ? translators.map((translator) => translator.name).join("، ")
        : undefined,
      pageCount: book.pageCount ?? undefined,
    },
  ];
}

export function mapDetailedBook({
  book,
  contributors,
  series,
  publisher,
  ratingSummary,
  reviews,
  relatedBooks,
}: {
  book: BookRow;
  contributors: BookContributor[];
  series: Pick<SeriesRow, "id" | "name" | "slug"> | null;
  publisher: PublisherSummary | null;
  ratingSummary: BookRatingSummary;
  reviews: BookReviewItem[];
  relatedBooks: BookCardType[];
}): DetailedBookType {
  const authors = authorsByRole(contributors, "author");
  const coAuthors = authorsByRole(contributors, "co_author");
  const translators = authorsByRole(contributors, "translator");
  const editors = authorsByRole(contributors, "editor");

  return {
    ...book,
    primaryAuthor: selectPrimaryAuthor(contributors),
    contributors,
    authors: [...authors, ...coAuthors],
    translators,
    editors,
    series,
    publisher,
    ratingSummary,
    reviews,
    editions: buildBibliographicEditions({ book, publisher, translators }),
    relatedBooks,
  };
}
