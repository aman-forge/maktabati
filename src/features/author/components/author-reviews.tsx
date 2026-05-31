import type { AuthorType } from "@features/author/server/get-author";
import { StarIcon, BookIcon } from "@phosphor-icons/react";
import { useState } from "react";

type ReviewFilter = "all" | "five" | "four" | "friends";

const FILTER_LABELS: Record<ReviewFilter, string> = {
  all: "الكل",
  five: "5 نجوم",
  four: "4 نجوم",
  friends: "الأصدقاء",
};

const MOCK_REVIEWS = [
  {
    id: "1",
    reviewer: {
      name: "عمر خالد",
      initials: "عخ",
      bg: "bg-violet-100 dark:bg-violet-900",
      text: "text-violet-800 dark:text-violet-200",
    },
    date: "مارس 2025",
    stars: 5,
    body: "الثلاثية تحفة أدبية خالدة. محفوظ يرسم مصر بريشة سحرية لا تُضاهى، وكل صفحة فيها كنز لا يُقدَّر.",
    book: "الثلاثية",
    isFriend: true,
    filter: "five",
  },
  {
    id: "2",
    reviewer: {
      name: "سارة محمود",
      initials: "سم",
      bg: "bg-emerald-100 dark:bg-emerald-900",
      text: "text-emerald-800 dark:text-emerald-200",
    },
    date: "فبراير 2025",
    stars: 5,
    body: "قرأت زقاق المدق للمرة الثالثة وكأنني أقرؤها لأول مرة. هذا هو سحر محفوظ الذي لا يخبو.",
    book: "زقاق المدق",
    isFriend: true,
    filter: "five",
  },
  {
    id: "3",
    reviewer: {
      name: "محمد ناصر",
      initials: "من",
      bg: "bg-amber-100 dark:bg-amber-900",
      text: "text-amber-800 dark:text-amber-200",
    },
    date: "يناير 2025",
    stars: 4,
    body: "اللص والكلاب رواية وجودية بامتياز. أسلوب محفوظ في هذه المرحلة يختلف جذرياً عن الثلاثية ومبهر بشكل مختلف.",
    book: "اللص والكلاب",
    isFriend: false,
    filter: "four",
  },
];

export function AuthorReviews({ author: _author }: { author: AuthorType }) {
  const [filter, setFilter] = useState<ReviewFilter>("all");

  const filtered = MOCK_REVIEWS.filter((r) => {
    if (filter === "all") return true;
    if (filter === "friends") return r.isFriend;
    if (filter === "five") return r.stars === 5;
    if (filter === "four") return r.stars === 4;
    return true;
  });

  return (
    <div dir="rtl">
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(FILTER_LABELS) as ReviewFilter[]).map((f) => (
          <button
            type="button"
            key={f}
            onClick={() => setFilter(f)}
            className={
              "rounded-full border px-3 py-1.5 text-xs transition-colors " +
              (filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground bg-background")
            }
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((review) => (
          <div key={review.id} className="border-border bg-card rounded-xl border p-4">
            <div className="mb-3 flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium ${review.reviewer.bg} ${review.reviewer.text}`}
              >
                {review.reviewer.initials}
              </div>
              <div>
                <p className="text-foreground text-sm leading-none font-medium">
                  {review.reviewer.name}
                </p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">{review.date}</p>
              </div>
              {review.isFriend && (
                <span className="bg-primary/10 text-primary mr-auto rounded-full px-2 py-0.5 text-[10px]">
                  صديق
                </span>
              )}
            </div>
            <div className="mb-2.5 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon
                  key={s}
                  weight={s <= review.stars ? "fill" : "regular"}
                  className="h-4 w-4 text-amber-500"
                />
              ))}
            </div>
            <p className="text-foreground/85 font-serif text-sm leading-7">{review.body}</p>
            <div className="text-primary mt-2.5 flex items-center gap-1 text-[11px]">
              <BookIcon className="size-3" />
              {review.book}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
