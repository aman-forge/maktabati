import { useState } from "react";
import { StarIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { AuthorType } from "@/features/auth/server/get-auther";


// ─── Mock rating distribution — replace with real data ───────────────────────
const MOCK_DISTRIBUTION = [
  { stars: 5, percent: 62 },
  { stars: 4, percent: 25 },
  { stars: 3, percent: 9 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 1 },
];

// ─── Mock books — replace with real query ────────────────────────────────────
const MOCK_BOOKS = [
  { id: "1", title: "الثلاثية", year: "١٩٥٦", rating: "٤٫٨", coverColor: "#EDE9FE", barColor: "#7C3AED" },
  { id: "2", title: "أولاد حارتنا", year: "١٩٥٩", rating: "٤٫٥", coverColor: "#D1FAE5", barColor: "#059669" },
  { id: "3", title: "زقاق المدق", year: "١٩٤٧", rating: "٤٫٦", coverColor: "#FEF3C7", barColor: "#D97706" },
  { id: "4", title: "الحرافيش", year: "١٩٧٧", rating: "٤٫٧", coverColor: "#FFE4E6", barColor: "#E11D48" },
  { id: "5", title: "خان الخليلي", year: "١٩٤٥", rating: "٤٫٣", coverColor: "#EFF6FF", barColor: "#2563EB" },
  { id: "6", title: "اللص والكلاب", year: "١٩٦١", rating: "٤٫٤", coverColor: "#F0FDF4", barColor: "#16A34A" },
];

export function AuthorAbout({ author }: { author: AuthorType }) {
  const [bioExpanded, setBioExpanded] = useState(false);
  const avgRating = author.rating ?? 4.6;
  const totalRatings = author.ratingCount ?? 34200;

  return (
    <div className="flex flex-col gap-8" dir="rtl">

      {/* ── Biography ── */}
      {author.bio && (
        <div>
          <SectionTitle>السيرة الأدبية</SectionTitle>
          <div
            className={
              "font-serif text-base leading-8 text-foreground/90 transition-all " +
              (!bioExpanded ? "line-clamp-4" : "")
            }
          >
            {author.bio}
          </div>
          <button
            type="button"
            className="mt-2 text-xs text-primary hover:underline"
            onClick={() => setBioExpanded((e) => !e)}
          >
            {bioExpanded ? "عرض أقل" : "عرض المزيد"}
          </button>
        </div>
      )}

      {/* ── Rating distribution ── */}
      <div>
        <SectionTitle>التقييمات</SectionTitle>
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-center gap-1 ">
            <span className=" text-5xl  tabular-nums text-foreground">{avgRating.toFixed(1)}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon
                  key={s}
                  weight={s <= Math.round(avgRating) ? "fill" : "regular"}
                  className="size-3.5 text-amber-500"
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">
              {totalRatings.toLocaleString("ar-EG")} تقييم
            </span>
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            {MOCK_DISTRIBUTION.map(({ stars, percent }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3 text-center tabular-nums">{stars}</span>
                <div className="h-1.5 flex-1 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-7 text-left tabular-nums">%{percent}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured books ── */}
      <div>
        <SectionTitle>أشهر أعماله</SectionTitle>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {MOCK_BOOKS.map((book) => (
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
              <span className="text-xs font-medium text-foreground leading-snug line-clamp-2">{book.title}</span>
              <span className="text-[11px] text-muted-foreground">
                <StarIcon weight="fill" className="inline size-2.5 text-amber-500 mb-px" /> {book.rating} · {book.year}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-serif text-lg font-normal text-foreground whitespace-nowrap">{children}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
