import type { AuthorType } from "@features/author/server/get-author";
import {
  BellIcon,
  BookmarkSimpleIcon,
  BookOpenIcon,
  CheckIcon,
  HeartIcon,
  MapPinIcon,
  ShareNetworkIcon,
  StarIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { cn } from "@/ui/lib/utils";

// ─── Fake friends — replace with real query ──────────────────────────────────
const FAKE_FRIENDS = [
  {
    id: "1",
    name: "عمر خالد",
    initials: "عخ",
    bg: "bg-violet-100 dark:bg-violet-900",
    text: "text-violet-800 dark:text-violet-200",
  },
  {
    id: "2",
    name: "سارة محمد",
    initials: "سم",
    bg: "bg-emerald-100 dark:bg-emerald-900",
    text: "text-emerald-800 dark:text-emerald-200",
  },
  {
    id: "3",
    name: "محمد علي",
    initials: "من",
    bg: "bg-amber-100 dark:bg-amber-900",
    text: "text-amber-800 dark:text-amber-200",
  },
];

function formatNumber(n?: number | null) {
  if (!n) return "—";
  if (n >= 1000) return `${(n / 1000).toFixed(1)} ألف`;
  return n.toLocaleString("ar-US");
}

// ─── Main component ───────────────────────────────────────────────────────────

export function AuthorHero({ author }: { author: AuthorType }) {
  const [following, setFollowing] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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
    <section className="border-b bg-muted/30 sm:flex flex-col items-center" dir="rtl">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center">
          {/* ── Avatar column ── */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <div className="relative">
              {author.profileImage ? (
                <img
                  src={author.profileImage}
                  alt={author.name ?? ""}
                  className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover ring-4 ring-background border border-border/50 shadow-md"
                />
              ) : (
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-violet-50 dark:bg-violet-950 border border-border flex items-center justify-center shadow-md ring-4 ring-background">
                  <span className="font-serif text-4xl sm:text-5xl font-light text-violet-700 dark:text-violet-300 tracking-tight">
                    {initials}
                  </span>
                </div>
              )}
            </div>

            {/* Follow button under avatar */}
            <Button
              size="sm"
              variant={following ? "outline" : "default"}
              className="w-full max-w-40 gap-1.5 text-xs"
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
          <div className="flex flex-col gap-4 flex-1 min-w-0">
            {/* Genre pills */}
            {/* {author.genres && author.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {author.genres.slice(0, 4).map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs font-normal">
                    {g}
                  </Badge>
                ))}
              </div>
            )} */}

            {/* Name */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-light leading-tight tracking-tight text-foreground">
                {author.name}
              </h1>
              {author.nationality && (
                <p className="flex items-center gap-1.5 mt-1.5 text-xs text-muted-foreground">
                  <MapPinIcon className="size-3.5 shrink-0" />
                  {author.nationality}
                  {author.birthYear && (
                    <span className="text-muted-foreground/50">
                      · {author.birthYear}
                      {author.deathYear ? ` – ${author.deathYear}` : ""}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Award pill */}
            {author.notableAward && (
              <div className="flex items-center gap-1.5 w-fit rounded-full bg-amber-50 dark:bg-amber-950 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-200">
                <TrophyIcon weight="duotone" className="size-3.5 text-amber-500" />
                {author.notableAward}
              </div>
            )}

            {/* Stats row */}
            <div className="flex flex-wrap gap-5 sm:gap-8">
              <Stat label="كتاباً" value={author.bookCount?.toString() ?? "—"} />
              <Stat label="قارئ" value={formatNumber(author.followerCount)} />
              <Stat
                label="متوسط التقييم"
                value={author.averageRating?.toFixed(1) ?? "—"}
                icon={<StarIcon weight="fill" className="size-3.5 text-amber-500" />}
              />
              <Stat label="مراجعة" value={formatNumber(author.reviewCount)} />
            </div>

            {/* Actions row */}
            <div className="flex flex-wrap gap-2 items-center">
              <Button
                type="button"
                size="sm"
                className="gap-2 text-xs"
                render={
                  <Link to="/discover/books" search={{ author: author.slug }}>
                    <BookOpenIcon weight="bold" className="size-3.5" />
                    استكشف الكتب
                  </Link>
                }
              />

              <Button
                size="sm"
                variant="outline"
                className="gap-2 text-xs"
                onClick={() => setBookmarked((b) => !b)}
              >
                {bookmarked ? (
                  <CheckIcon weight="bold" className="size-3.5" />
                ) : (
                  <BookmarkSimpleIcon weight="bold" className="size-3.5" />
                )}
                {bookmarked ? "محفوظ" : "احفظ المؤلف"}
              </Button>

              <Button size="sm" variant="outline" className="size-8 p-0" aria-label="مشاركة">
                <ShareNetworkIcon weight="bold" className="size-3.5" />
              </Button>

              {/* Friends who read */}
              <FriendsWhoRead friends={FAKE_FRIENDS} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stat cell ────────────────────────────────────────────────────────────────

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="flex items-center gap-1 text-base font-semibold text-foreground tabular-nums">
        {icon}
        {value}
      </span>
      <span className="text-[11px] text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Friends who read ─────────────────────────────────────────────────────────

function FriendsWhoRead({ friends }: { friends: typeof FAKE_FRIENDS }) {
  if (!friends.length) return null;
  const shown = friends.slice(0, 3);
  const display = shown.map((f) => f.name.split(" ")[0]).join("، ");

  return (
    <button
      type="button"
      className="flex items-center gap-2.5 rounded-xl border bg-muted/30 px-3 py-2 text-right transition-colors hover:bg-muted/60 text-sm mr-1"
    >
      <div className="flex items-center">
        {shown.map((f, i) => (
          <div
            key={f.id}
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-[10px] font-medium shrink-0",
              f.bg,
              f.text,
              i > 0 && "-mr-1.5",
            )}
          >
            {f.initials}
          </div>
        ))}
      </div>
      <span className="text-xs text-muted-foreground leading-tight">
        <span className="font-medium text-foreground">{display}</span>
        {friends.length > 3 && ` و${friends.length - 3} آخرون`}
        {" قرأوا له"}
      </span>
    </button>
  );
}
