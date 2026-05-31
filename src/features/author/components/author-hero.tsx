import type { AuthorType } from "@features/author/server/get-author";
import {
  BookmarkSimpleIcon,
  BookOpenIcon,
  CheckIcon,
  MapPinIcon,
  QuotesIcon,
  ShareNetworkIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

// Mock — replace with real counts from the schema when available
// const MOCK_FOLLOWER_COUNTS: Record<string, number> = {
//   "naguib-mahfouz": 84200,
//   "taha-hussein": 61500,
// };

// const MOCK_REVIEW_COUNTS: Record<string, number> = {
//   "naguib-mahfouz": 12400,
//   "taha-hussein": 8750,
// };

//TO Do FollowerCount

// function getFollowerCount(author: AuthorType): number {
//   return author.followerCount ?? MOCK_FOLLOWER_COUNTS[author.slug] ?? 3200;
// }

// function getReviewCount(author: AuthorType): number {
//   return author.reviewCount ?? MOCK_REVIEW_COUNTS[author.slug] ?? 940;
// }

// function formatNumber(n?: number | null) {
//   if (!n) return "—";
//   if (n >= 1000) return `${(n / 1000).toFixed(1)} ألف`;
//   return n.toLocaleString("ar-US");
// }

// ─── Quotes shown in the desktop sidebar ─────────────────────────────────────
const HERO_QUOTES = [
  { id: "1", text: "الإنسان لا يخشى الموت وإنما يخشى النسيان.", source: "زقاق المدق", likes: 241 },
  {
    id: "2",
    text: "الحب لا يعني أن تجد شخصاً مثالياً بل أن تجد شخصاً تقبل عيوبه.",
    source: "الثلاثية",
    likes: 185,
  },
  { id: "3", text: "لا تعيش لتأكل بل كُل لتعيش وتفهم وتُحب.", source: "أولاد حارتنا", likes: 152 },
];

// Mock — replace with real awards when available in the schema
const MOCK_NOTABLE_AWARDS: Record<string, string> = {
  "naguib-mahfouz": "جائزة نوبل في الأدب · 1988",
  "taha-hussein": "جائزة الدولة التقديرية · 1972",
};

function getNotableAward(author: AuthorType): string | null {
  return MOCK_NOTABLE_AWARDS[author.slug] ?? "جائزة الدولة للتفوق في الآداب";
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AuthorHero({ author }: { author: AuthorType }) {
  const [following, setFollowing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const notableAward = getNotableAward(author);

  const initials = useMemo(
    () =>
      (author.name ?? "")
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join(""),
    [author.name],
  );

  return (
    <section className="relative overflow-hidden border-b" dir="rtl">
      {/* ── Atmospheric background layers ── */}
      <div className="from-muted/10 via-muted/25 to-muted/40 pointer-events-none absolute inset-0 bg-linear-to-b" />
      <div className="bg-[radial-gradient(ellipse_80%_60%_at_80%_0%,color-mix(in srgb, var(--primary) 22%, transparent),transparent)] pointer-events-none absolute inset-0" />

      {/* Mobile-only: strong radial behind avatar area */}
      <div className="bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,color-mix(in srgb,var(--primary)_18%,transparent),transparent)] pointer-events-none absolute inset-x-0 top-0 h-72 sm:hidden" />

      {/* Subtle top accent line */}
      <div className="via-primary/40 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-14">
          {/* ── Avatar column ── */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            {/* Mobile-only eyebrow label — sits above avatar for editorial feel */}
            <div className="flex items-center gap-2 sm:hidden">
              <div className="bg-primary/40 h-px w-8" />
              <span className="text-primary/60 text-[9px] font-bold tracking-[0.25em] uppercase">
                مؤلف
              </span>
              <div className="bg-primary/40 h-px w-8" />
            </div>

            <div className="relative">
              {/* Outer atmospheric glow — more pronounced on mobile */}
              <div className="from-primary via-primary/10 absolute -inset-3 rounded-full bg-linear-to-br to-transparent blur-lg sm:-inset-2 sm:blur-md" />

              <div className="border-primary/50 absolute -inset-1.5 animate-[spin_20s_linear_infinite] rounded-full border border-dashed" />
              {/* Inner border ring */}
              <div className="from-primary/30 to-border/20 absolute -inset-0.5 rounded-full bg-linear-to-br" />
              <div className="relative">
                {author.profileImage ? (
                  <img
                    src={author.profileImage}
                    alt={author.name ?? ""}
                    className="border-background h-40 w-40 rounded-full border-2 object-cover shadow-2xl sm:h-55 sm:w-55"
                  />
                ) : (
                  <div className="border-background flex h-40 w-40 items-center justify-center rounded-full border-2 bg-violet-50 shadow-2xl sm:h-44 sm:w-44 dark:bg-violet-950">
                    <span className="font-serif text-5xl font-light tracking-tight text-violet-700 sm:text-5xl dark:text-violet-300">
                      {initials}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Follow button */}
            <Button
              size="sm"
              variant={following ? "outline" : "default"}
              className="w-full max-w-45 gap-1.5 text-xs"
              onClick={() => setFollowing((f) => !f)}
            >
              {following ? (
                <>
                  <CheckIcon weight="bold" className="size-3.5" />
                  تتابعه
                </>
              ) : (
                <>
                  <UserPlusIcon weight="bold" className="size-3.5" />
                  متابعة
                </>
              )}
            </Button>
          </div>

          {/* ── Info column ── */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* Eyebrow label — desktop/tablet only (mobile has it above avatar) */}
            <div className="hidden items-center gap-2.5 sm:flex">
              <div className="bg-primary/50 h-px w-10" />
              <span className="text-primary/70 text-[10px] font-semibold tracking-[0.2em] uppercase">
                مؤلف
              </span>
            </div>

            {/* Name + location */}
            <div className="space-y-2 text-center sm:text-start">
              <h1 className="text-foreground font-serif text-4xl leading-[1.1] font-light tracking-tight sm:text-5xl">
                {author.name}
              </h1>
              {author.nationality && (
                <p className="flex items-center justify-center gap-1.5 text-xs sm:justify-start">
                  <MapPinIcon className="text-primary/60 size-3.5 shrink-0" />
                  <span className="text-muted-foreground">{author.nationality}</span>
                  {author.birthYear && (
                    <span className="text-muted-foreground/70">
                      · {author.birthYear}
                      {author.deathYear ? ` – ${author.deathYear}` : ""}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Award pill */}
            {notableAward && (
              <div className="mx-auto flex w-fit items-center justify-center gap-2 rounded-full border border-amber-500/20 bg-amber-50/80 px-3.5 py-1.5 text-xs font-medium text-amber-700 shadow-sm sm:mx-0 sm:justify-start dark:bg-amber-950/40 dark:text-amber-300">
                <TrophyIcon weight="duotone" className="size-3.5 text-amber-500" />
                {notableAward}
              </div>
            )}

            {/* Stats row */}
            {/* Mobile: full-width with more padding; tablet+: unchanged compact pill */}
            <div className="border-border/50 bg-background/40 flex w-full items-stretch gap-0 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm sm:w-fit">
              <StatCell
                label="كتاباً"
                value={author.books.length > 0 ? author.books.length.toString() : "—"}
                mobile
              />
              {/* <div className="w-px bg-border/50 my-3" />
              <StatCell label="قارئ" value={formatNumber(getFollowerCount(author))} mobile />
              <div className="w-px bg-border/50 my-3" />
              <StatCell label="مراجعة" value={formatNumber(getReviewCount(author))} mobile /> */}
            </div>

            {/* Thin decorative rule */}
            <div className="via-border/60 -mx-1 h-px bg-linear-to-l from-transparent to-transparent" />

            {/* Actions row */}
            {/* Mobile: primary button full-width; secondary row below */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                size="sm"
                className="w-full gap-2 text-xs sm:w-auto"
                render={
                  <Link to="/discover/books" search={{ author: author.slug }}>
                    <BookOpenIcon weight="bold" className="size-3.5" />
                    استكشف الكتب
                  </Link>
                }
              />
              <div className="flex gap-2 sm:contents">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 gap-2 text-xs sm:flex-none"
                  onClick={() => setBookmarked((b) => !b)}
                >
                  {bookmarked ? (
                    <CheckIcon weight="bold" className="size-3.5" />
                  ) : (
                    <BookmarkSimpleIcon weight="bold" className="size-3.5" />
                  )}
                  {bookmarked ? "محفوظ" : "احفظ المؤلف"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="size-8 shrink-0 p-0"
                  aria-label="مشاركة"
                >
                  <ShareNetworkIcon weight="bold" className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* ── Mobile-only: Featured quote strip ── */}
            <div className="mt-1 sm:hidden">
              <div className="border-primary/15 bg-background/30 relative overflow-hidden rounded-xl border px-4 py-3.5 backdrop-blur-sm">
                {/* Decorative quote mark */}
                <QuotesIcon
                  weight="fill"
                  className="text-primary/8 absolute top-2 left-3 size-8 rotate-180"
                />
                {/* Accent bar */}
                <div className="from-primary/50 via-primary/30 absolute inset-y-0 right-0 w-[3px] rounded-full bg-linear-to-b to-transparent" />
                <p className="text-foreground/80 relative z-10 text-right text-[15px] leading-[1.75] font-light">
                  {HERO_QUOTES[0].text}
                </p>
                <div className="border-border/30 mt-3 flex items-center justify-between border-t pt-2.5">
                  <span className="text-muted-foreground/50 text-[10px]">
                    — {HERO_QUOTES[0].source}
                  </span>
                  <span className="text-primary/50 text-[9px] font-medium tracking-[0.15em] uppercase">
                    اقتباس
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Vertical divider — desktop only ── */}
          <div className="via-border/50 mx-1 hidden w-px self-stretch bg-linear-to-b from-transparent to-transparent lg:block" />

          {/* ── Quotes sidebar — desktop only ── */}
          <div className="hidden w-90 shrink-0 flex-col justify-center gap-3 self-stretch py-2 lg:flex">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-muted-foreground/60 text-[15px] font-semibold tracking-[0.15em] uppercase">
                اقتباسات
              </span>
              <div className="bg-border/30 h-px flex-1" />
            </div>

            {HERO_QUOTES.map((quote) => (
              <div
                key={quote.id}
                className="group border-border/40 bg-background/30 hover:border-border/70 hover:bg-background/50 relative rounded-lg border px-3 py-2 backdrop-blur-sm transition-all duration-200"
              >
                <div className="bg-primary/30 group-hover:bg-primary/60 absolute inset-e-0 top-3 bottom-3 w-[3px] rounded-full transition-colors" />
                <p className="text-foreground/80 line-clamp-3 text-[18px] leading-[1.65]">
                  {quote.text}
                </p>
                <div className="mt-2.5 flex items-center justify-between">
                  <span className="text-muted-foreground/50 text-[10px]">— {quote.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="via-border/60 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </section>
  );
}

// ─── Stat cell ────────────────────────────────────────────────────────────────
function StatCell({ label, value, mobile }: { label: string; value: string; mobile?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 py-3 ${mobile ? "flex-1 px-3 sm:flex-none sm:px-5" : "px-5"}`}
    >
      <span className="text-foreground text-base leading-none font-semibold tabular-nums">
        {value}
      </span>
      <span className="text-muted-foreground/70 mt-1 text-[10px] tracking-wide">{label}</span>
    </div>
  );
}
