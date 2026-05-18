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
    <section className="relative border-b overflow-hidden" dir="rtl">
      {/* ── Atmospheric background layers ── */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/10 via-muted/25 to-muted/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_80%_0%,color-mix(in srgb, var(--primary) 22%, transparent),transparent)] pointer-events-none" />

      {/* Mobile-only: strong radial behind avatar area */}
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,color-mix(in srgb,var(--primary)_18%,transparent),transparent)] pointer-events-none sm:hidden" />

      {/* Subtle top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-14 items-center">
          {/* ── Avatar column ── */}
          <div className="flex flex-col items-center gap-4 shrink-0">
            {/* Mobile-only eyebrow label — sits above avatar for editorial feel */}
            <div className="flex items-center gap-2 sm:hidden">
              <div className="h-px w-8 bg-primary/40" />
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-primary/60">
                مؤلف
              </span>
              <div className="h-px w-8 bg-primary/40" />
            </div>

            <div className="relative">
              {/* Outer atmospheric glow — more pronounced on mobile */}
              <div className="absolute -inset-3 rounded-full bg-linear-to-br from-primary via-primary/10 to-transparent blur-lg sm:-inset-2 sm:blur-md" />

              <div className="absolute -inset-1.5 rounded-full border border-dashed border-primary/50 animate-[spin_20s_linear_infinite]" />
              {/* Inner border ring */}
              <div className="absolute -inset-0.5 rounded-full bg-linear-to-br from-primary/30 to-border/20" />
              <div className="relative">
                {author.profileImage ? (
                  <img
                    src={author.profileImage}
                    alt={author.name ?? ""}
                    className="w-40 h-40 rounded-full object-cover border-2 border-background shadow-2xl sm:w-55 sm:h-55"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-violet-50 dark:bg-violet-950 border-2 border-background flex items-center justify-center shadow-2xl sm:w-44 sm:h-44">
                    <span className="font-serif text-5xl font-light text-violet-700 dark:text-violet-300 tracking-tight sm:text-5xl">
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
          <div className="flex flex-col gap-5 flex-1 min-w-0">
            {/* Eyebrow label — desktop/tablet only (mobile has it above avatar) */}
            <div className="hidden sm:flex items-center gap-2.5">
              <div className="h-px w-10 bg-primary/50" />
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-primary/70">
                مؤلف
              </span>
            </div>

            {/* Name + location */}
            <div className="space-y-2 text-center sm:text-start">
              <h1 className="text-4xl font-serif font-light leading-[1.1] tracking-tight text-foreground sm:text-5xl">
                {author.name}
              </h1>
              {author.nationality && (
                <p className="flex items-center justify-center gap-1.5 text-xs sm:justify-start">
                  <MapPinIcon className="size-3.5 shrink-0 text-primary/60" />
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
              <div className="flex items-center justify-center gap-2 w-fit rounded-full border border-amber-500/20 bg-amber-50/80 dark:bg-amber-950/40 px-3.5 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 shadow-sm mx-auto sm:mx-0 sm:justify-start">
                <TrophyIcon weight="duotone" className="size-3.5 text-amber-500" />
                {notableAward}
              </div>
            )}

            {/* Stats row */}
            {/* Mobile: full-width with more padding; tablet+: unchanged compact pill */}
            <div className="flex items-stretch gap-0 w-full rounded-xl border border-border/50 bg-background/40 backdrop-blur-sm overflow-hidden shadow-sm sm:w-fit">
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
            <div className="h-px bg-linear-to-l from-transparent via-border/60 to-transparent -mx-1" />

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
                  className="size-8 p-0 shrink-0"
                  aria-label="مشاركة"
                >
                  <ShareNetworkIcon weight="bold" className="size-3.5" />
                </Button>
              </div>
            </div>

            {/* ── Mobile-only: Featured quote strip ── */}
            <div className="sm:hidden mt-1">
              <div className="relative rounded-xl border border-primary/15 bg-background/30 backdrop-blur-sm px-4 py-3.5 overflow-hidden">
                {/* Decorative quote mark */}
                <QuotesIcon
                  weight="fill"
                  className="absolute top-2 left-3 size-8 text-primary/8 rotate-180"
                />
                {/* Accent bar */}
                <div className="absolute inset-y-0 right-0 w-[3px] rounded-full bg-linear-to-b from-primary/50 via-primary/30 to-transparent" />
                <p className="text-[15px] leading-[1.75] text-foreground/80 font-light relative z-10 text-right">
                  {HERO_QUOTES[0].text}
                </p>
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border/30">
                  <span className="text-[10px] text-muted-foreground/50">
                    — {HERO_QUOTES[0].source}
                  </span>
                  <span className="text-[9px] tracking-[0.15em] uppercase text-primary/50 font-medium">
                    اقتباس
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Vertical divider — desktop only ── */}
          <div className="hidden lg:block w-px self-stretch bg-linear-to-b from-transparent via-border/50 to-transparent mx-1" />

          {/* ── Quotes sidebar — desktop only ── */}
          <div className="hidden lg:flex flex-col gap-3 w-90 shrink-0 self-stretch justify-center py-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[15px] font-semibold tracking-[0.15em] uppercase text-muted-foreground/60">
                اقتباسات
              </span>
              <div className="h-px flex-1 bg-border/30" />
            </div>

            {HERO_QUOTES.map((quote) => (
              <div
                key={quote.id}
                className="group relative rounded-lg border border-border/40 bg-background/30 backdrop-blur-sm px-3 py-2 hover:border-border/70 hover:bg-background/50 transition-all duration-200"
              >
                <div className="absolute top-3 bottom-3 inset-e-0 w-[3px] rounded-full bg-primary/30 group-hover:bg-primary/60 transition-colors" />
                <p className="text-[18px] leading-[1.65] text-foreground/80 line-clamp-3">
                  {quote.text}
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[10px] text-muted-foreground/50">— {quote.source}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-border/60 to-transparent" />
    </section>
  );
}

// ─── Stat cell ────────────────────────────────────────────────────────────────
function StatCell({ label, value, mobile }: { label: string; value: string; mobile?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 py-3 ${mobile ? "flex-1 px-3 sm:px-5 sm:flex-none" : "px-5"}`}
    >
      <span className="text-base font-semibold text-foreground tabular-nums leading-none">
        {value}
      </span>
      <span className="text-[10px] tracking-wide text-muted-foreground/70 mt-1">{label}</span>
    </div>
  );
}
