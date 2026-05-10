import { useState } from "react";
import { StarIcon, BookIcon } from "@phosphor-icons/react";
import type { Author } from "@/features/author/types";

type ReviewFilter = "all" | "five" | "four" | "friends";

const FILTER_LABELS: Record<ReviewFilter, string> = {
  all: "الكل",
  five: "٥ نجوم",
  four: "٤ نجوم",
  friends: "الأصدقاء",
};

const MOCK_REVIEWS = [
  {
    id: "1",
    reviewer: { name: "عمر خالد", initials: "عخ", bg: "bg-violet-100 dark:bg-violet-900", text: "text-violet-800 dark:text-violet-200" },
    date: "مارس ٢٠٢٥",
    stars: 5,
    body: "الثلاثية تحفة أدبية خالدة. محفوظ يرسم مصر بريشة سحرية لا تُضاهى، وكل صفحة فيها كنز لا يُقدَّر.",
    book: "الثلاثية",
    isFriend: true,
    filter: "five",
  },
  {
    id: "2",
    reviewer: { name: "سارة محمود", initials: "سم", bg: "bg-emerald-100 dark:bg-emerald-900", text: "text-emerald-800 dark:text-emerald-200" },
    date: "فبراير ٢٠٢٥",
    stars: 5,
    body: "قرأت زقاق المدق للمرة الثالثة وكأنني أقرؤها لأول مرة. هذا هو سحر محفوظ الذي لا يخبو.",
    book: "زقاق المدق",
    isFriend: true,
    filter: "five",
  },
  {
    id: "3",
    reviewer: { name: "محمد ناصر", initials: "من", bg: "bg-amber-100 dark:bg-amber-900", text: "text-amber-800 dark:text-amber-200" },
    date: "يناير ٢٠٢٥",
    stars: 4,
    body: "اللص والكلاب رواية وجودية بامتياز. أسلوب محفوظ في هذه المرحلة يختلف جذرياً عن الثلاثية ومبهر بشكل مختلف.",
    book: "اللص والكلاب",
    isFriend: false,
    filter: "four",
  },
];

export function AuthorReviews({ author: _author }: { author: Author }) {
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
      <div className="flex gap-2 flex-wrap mb-6">
        {(Object.keys(FILTER_LABELS) as ReviewFilter[]).map((f) => (
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

      <div className="flex flex-col gap-4">
        {filtered.map((review) => (
          <div key={review.id} className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${review.reviewer.bg} ${review.reviewer.text}`}
              >
                {review.reviewer.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground leading-none">{review.reviewer.name}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{review.date}</p>
              </div>
              {review.isFriend && (
                <span className="mr-auto text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                  صديق
                </span>
              )}
            </div>
            <div className="flex gap-0.5 mb-2.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <StarIcon
                  key={s}
                  weight={s <= review.stars ? "fill" : "regular"}
                  className="size-3.5 text-amber-500"
                />
              ))}
            </div>
            <p className="font-serif text-sm leading-7 text-foreground/85">{review.body}</p>
            <div className="flex items-center gap-1 mt-2.5 text-[11px] text-primary">
              <BookIcon className="size-3" />
              {review.book}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
