
import { BookCard } from "@/features/books/components/book-card";
import type { AuthorType } from "@features/author/server/get-author";
import { Separator } from "@shadcn/separator";

// ─── Mock books — replace with real query ────────────────────────────────────
const MOCK_BOOKS = [
  {
    id: "1",
    title: "الثلاثية",
    year: "1956",
    rating: "4٫8",
    coverColor: "#EDE9FE",
    barColor: "#7C3AED",
  },
  {
    id: "2",
    title: "أولاد حارتنا",
    year: "1959",
    rating: "4٫5",
    coverColor: "#D1FAE5",
    barColor: "#059669",
  },
  {
    id: "3",
    title: "زقاق المدق",
    year: "1947",
    rating: "4٫6",
    coverColor: "#FEF3C7",
    barColor: "#D97706",
  },
  {
    id: "4",
    title: "الحرافيش",
    year: "1977",
    rating: "4٫7",
    coverColor: "#FFE4E6",
    barColor: "#E11D48",
  },
  {
    id: "5",
    title: "خان الخليلي",
    year: "1945",
    rating: "4٫3",
    coverColor: "#EFF6FF",
    barColor: "#2563EB",
  },
];



export function AuthorAbout({ author }: { author: AuthorType }) {

  return (
    <div className="flex flex-col gap-8" dir="rtl">
      {/* ── Biography ── */}
      {author.bio && (
        <div>
          <SectionTitle>السيرة الأدبية</SectionTitle>
          <div
            className={
              "text-base leading-8 text-foreground/90 transition-all "

            }
          >
            {author.bio}
          </div>

        </div>
      )}

      {/* ── Featured books ── */}
      <div>
        <SectionTitle>أشهر أعماله</SectionTitle>
        <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
          {MOCK_BOOKS.map((book) => (
            <div
              key={book.id} className="flex shrink-0 pt-1">
              <BookCard book={book} size="md" />
            </div>
          ))}

        </div>
      </div>
      <div className="py-8 border-t border-border flex flex-col gap-8">

      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-serif text-lg font-normal text-foreground whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
