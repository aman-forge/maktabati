/**
 * author-books.tsx
 * Filterable grid of all books by this author.
 */

import type { AuthorType } from "@features/author/server/get-author";
import { StarIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

// import type { Author } from "@/features/author/types";

type Filter = "all" | "novel" | "story" | "series";

const FILTER_LABELS: Record<Filter, string> = {
  all: "الكل",
  novel: "روايات",
  story: "قصص قصيرة",
  series: "سلاسل",
};

// Mock — replace with real author.books
const MOCK_ALL_BOOKS = [
  {
    id: "1",
    title: "الثلاثية",
    year: "١٩٥٦",
    rating: "٤٫٨",
    type: "series",
    coverColor: "#EDE9FE",
    barColor: "#7C3AED",
  },
  {
    id: "2",
    title: "أولاد حارتنا",
    year: "١٩٥٩",
    rating: "٤٫٥",
    type: "novel",
    coverColor: "#D1FAE5",
    barColor: "#059669",
  },
  {
    id: "3",
    title: "زقاق المدق",
    year: "١٩٤٧",
    rating: "٤٫٦",
    type: "novel",
    coverColor: "#FEF3C7",
    barColor: "#D97706",
  },
  {
    id: "4",
    title: "الحرافيش",
    year: "١٩٧٧",
    rating: "٤٫٧",
    type: "novel",
    coverColor: "#FFE4E6",
    barColor: "#E11D48",
  },
  {
    id: "5",
    title: "خان الخليلي",
    year: "١٩٤٥",
    rating: "٤٫٣",
    type: "novel",
    coverColor: "#EFF6FF",
    barColor: "#2563EB",
  },
  {
    id: "6",
    title: "اللص والكلاب",
    year: "١٩٦١",
    rating: "٤٫٤",
    type: "novel",
    coverColor: "#F0FDF4",
    barColor: "#16A34A",
  },
  {
    id: "7",
    title: "دنيا الله",
    year: "١٩٦٣",
    rating: "٤٫١",
    type: "story",
    coverColor: "#FFF7ED",
    barColor: "#EA580C",
  },
  {
    id: "8",
    title: "ميرامار",
    year: "١٩٦٧",
    rating: "٤٫٢",
    type: "novel",
    coverColor: "#F5F3FF",
    barColor: "#8B5CF6",
  },
];

export function AuthorBooks({ author: _author }: { author: AuthorType }) {
  const [filter, setFilter] = useState<Filter>("all");
  const filtered =
    filter === "all" ? MOCK_ALL_BOOKS : MOCK_ALL_BOOKS.filter((b) => b.type === filter);

  return (
    <div dir="rtl">
      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
            <button
              type="button"
              key={f}
              onClick={() => setFilter(f)}
              className={
                "text-xs px-3 py-1.5 rounded-full border transition-colors " +
                (filter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground bg-background")
              }
            >
              {FILTER_LABELS[f]}
            </button>
          ))}
        </div>
        <select className="text-xs px-3 py-1.5 rounded-lg border border-border bg-background text-foreground">
          <option>الأكثر تقييماً</option>
          <option>الأحدث</option>
          <option>الأقدم</option>
        </select>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-4">
        {filtered.map((book) => (
          <Link
            key={book.id}
            to="/book/$id"
            params={{ id: book.id }}
            className="group flex flex-col gap-1.5"
          >
            <div
              className="w-full rounded-lg border border-border/50 overflow-hidden relative transition-transform group-hover:-translate-y-0.5 group-hover:shadow-md"
              style={{ aspectRatio: "2/3", background: book.coverColor }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-2">
                <span className="font-serif text-xs font-semibold text-center leading-snug text-foreground/80">
                  {book.title}
                </span>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: book.barColor }}
              />
            </div>
            <span className="text-xs font-medium text-foreground leading-snug line-clamp-2">
              {book.title}
            </span>
            <span className="text-[11px] text-muted-foreground">
              <StarIcon weight="fill" className="inline size-2.5 text-amber-500 mb-px" />{" "}
              {book.rating} · {book.year}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
