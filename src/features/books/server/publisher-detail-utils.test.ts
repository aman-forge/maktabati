import { describe, expect, it } from "vitest";

import type { BookCardType } from "../types";
import { mapPublisherDetail } from "./publisher-detail-utils";

const book = {
  id: "book-1",
  slug: "book-1",
  title: "كتاب",
  coverImageUrl: null,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
  updatedAt: new Date("2026-01-02T00:00:00.000Z"),
} satisfies BookCardType;

describe("publisher detail mapper", () => {
  it("normalizes aggregate book counts and preserves hydrated books", () => {
    const detail = mapPublisherDetail(
      {
        id: "publisher-1",
        slug: "publisher",
        name: "دار نشر",
        logoUrl: null,
        website: "https://example.com",
        country: "مصر",
        bookCount: "12",
      },
      [book],
    );

    expect(detail.bookCount).toBe(12);
    expect(detail.books).toEqual([book]);
    expect(detail.website).toBe("https://example.com");
  });
});
