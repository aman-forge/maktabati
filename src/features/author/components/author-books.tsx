/**
 * author-books.tsx
 * Filterable grid of all books by this author.
 */

import type { AuthorType } from "@features/author/server/get-author";

import { BookCard } from "@/features/books/components/book-card";

// type Filter = "all" | "novel" | "story" | "series";

// const FILTER_LABELS: Record<Filter, string> = {
//   all: "الكل",
//   novel: "روايات",
//   story: "قصص قصيرة",
//   series: "سلاسل",
// };

// Mock — replace with real author.books
// const MOCK_ALL_BOOKS = [
//   {
//     id: "1",
//     title: "الثلاثية",
//     year: "1956",
//     rating: "4٫8",
//     type: "series",
//     coverColor: "#EDE9FE",
//     barColor: "#7C3AED",
//   },
//   {
//     id: "2",
//     title: "أولاد حارتنا",
//     year: "1959",
//     rating: "4٫5",
//     type: "novel",
//     coverColor: "#D1FAE5",
//     barColor: "#059669",
//   },
//   {
//     id: "3",
//     title: "زقاق المدق",
//     year: "1947",
//     rating: "4٫6",
//     type: "novel",
//     coverColor: "#FEF3C7",
//     barColor: "#D97706",
//   },
//   {
//     id: "4",
//     title: "الحرافيش",
//     year: "1977",
//     rating: "4٫7",
//     type: "novel",
//     coverColor: "#FFE4E6",
//     barColor: "#E11D48",
//   },
//   {
//     id: "5",
//     title: "خان الخليلي",
//     year: "1945",
//     rating: "4٫3",
//     type: "novel",
//     coverColor: "#EFF6FF",
//     barColor: "#2563EB",
//   },
//   {
//     id: "6",
//     title: "اللص والكلاب",
//     year: "1961",
//     rating: "4٫4",
//     type: "novel",
//     coverColor: "#F0FDF4",
//     barColor: "#16A34A",
//   },
//   {
//     id: "7",
//     title: "دنيا الله",
//     year: "1963",
//     rating: "4٫1",
//     type: "story",
//     coverColor: "#FFF7ED",
//     barColor: "#EA580C",
//   },
//   {
//     id: "8",
//     title: "ميرامار",
//     year: "1967",
//     rating: "4٫2",
//     type: "novel",
//     coverColor: "#F5F3FF",
//     barColor: "#8B5CF6",
//   },
// ];

export function AuthorBooks({ author: _author }: { author: AuthorType }) {
  // const [filter, setFilter] = useState<Filter>("all");
  // const filtered =
  //   filter === "all" ? MOCK_ALL_BOOKS : MOCK_ALL_BOOKS.filter((b) => b.type === filter);
  return (
    <div dir="rtl">
      {/*TODO: we should add it to the page .*/}
      {/*<div className="flex items-center justify-between flex-wrap gap-3 mb-6">
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
        {/*<select className="text-xs px-3 py-1.5 rounded-lg border border-border bg-background text-foreground">
          <option>الأكثر تقييماً</option>
          <option>الأحدث</option>
          <option>الأقدم</option>
        </select>*/}
      {/*</div>*/}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-4 ">
        {_author.books.map((book) => (
          <div key={book.id} className="flex flex-wrap shrink-0 pt-1">
            <BookCard book={book ?? undefined} size="md" />
          </div>
        ))}
      </div>
    </div>
  );
}
