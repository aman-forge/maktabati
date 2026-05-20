import { describe, expect, it } from "vitest";

import type { BookRow } from "@/features/books/schema-types";
import type { AuthorSummary } from "@/features/books/types";

import {
  authorsByRole,
  calculateRatingSummary,
  groupContributorsByBookId,
  mapBookCard,
  selectPrimaryAuthor,
} from "./mappers";

function author(id: string, name: string): AuthorSummary {
  return {
    id,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    name,
  };
}

const book = {
  id: "11111111-1111-4111-8111-111111111111",
  slug: "test-book",
  publisherId: null,
  seriesId: null,
  seriesPosition: null,
  title: "كتاب للاختبار",
  subtitle: null,
  description: "وصف",
  coverImageUrl: null,
  pageCount: 240,
  publicationYear: 2026,
  publicationDate: null,
  originalLanguage: "ar",
  originalTitle: null,
  genres: ["fiction"],
  topics: [],
  isbn: null,
  isbn13: null,
  edition: null,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-02T00:00:00.000Z"),
} satisfies BookRow;

describe("book mappers", () => {
  it("groups contributors and selects the primary author by role", () => {
    const grouped = groupContributorsByBookId([
      {
        bookId: book.id,
        role: "translator",
        order: 0,
        author: author("translator-1", "مترجم"),
      },
      {
        bookId: book.id,
        role: "author",
        order: 1,
        author: author("author-1", "مؤلف"),
      },
    ]);
    const contributors = grouped.get(book.id) ?? [];

    expect(selectPrimaryAuthor(contributors)?.id).toBe("author-1");
    expect(authorsByRole(contributors, "translator")).toHaveLength(1);
  });

  it("calculates rating summaries with review counts and distribution", () => {
    const summary = calculateRatingSummary([
      { rating: 5, body: "ممتاز" },
      { rating: 4, body: null },
      { rating: 5, body: "جميل" },
      { rating: null, body: "مراجعة بلا تقييم" },
    ]);

    expect(summary.average).toBeCloseTo(14 / 3);
    expect(summary.totalRatings).toBe(3);
    expect(summary.totalReviews).toBe(3);
    expect(summary.distribution.find((item) => item.stars === 5)?.percent).toBe(67);
  });

  it("maps book cards with tracking and contributor data", () => {
    const primaryAuthor = author("author-1", "مؤلف");
    const card = mapBookCard({
      book,
      contributors: [{ role: "author", order: 0, author: primaryAuthor }],
      tracking: {
        status: "currently_reading",
        pageProgress: 40,
        notes: "ملاحظة خاصة",
        startedAt: "2026-01-03",
        finishedAt: null,
      },
      ratingSummary: calculateRatingSummary([{ rating: 4, body: null }]),
    });

    expect(card.primaryAuthor?.id).toBe(primaryAuthor.id);
    expect(card.status).toBe("currently_reading");
    expect(card.pageProgress).toBe(40);
    expect(card.averageRating).toBe(4);
  });
});
