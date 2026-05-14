import { TrackBookModal } from "@components/book/track-book-modal";
import { Button } from "@components/ui/button";
import type { BookType } from "@features/books/server/get-books";
import {
  BookmarkSimpleIcon,
  BooksIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CheckIcon,
  HeartIcon,
  ShareNetworkIcon,
  StarIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BOOK_GENRES } from "@/db/constants/books";
import type { RatingSummary } from "@/features/book/book-page-mock";
import { ButtonGroup } from "@/ui/components/ui/button-group";
import { cn } from "@/ui/lib/utils";

// ─── Fake friends data — replace with real query ──────────────────────────────
const FAKE_FRIENDS = [
  {
    id: "1",
    name: "عمر خالد",
    initials: "ع",
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    id: "2",
    name: "سارة محمد",
    initials: "س",
    color: "bg-violet-100 text-violet-800",
  },
  {
    id: "3",
    name: "محمد علي",
    initials: "م",
    color: "bg-amber-100 text-amber-800",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const LANGUAGE_MAP: Record<string, string> = {
  ar: "العربية",
  eng: "الإنجليزية",
  fr: "الفرنسية",
  de: "الألمانية",
  es: "الإسبانية",
};

function formatNumber(n?: number) {
  if (!n) return "—";
  return n.toLocaleString("ar-US");
}

// ─── Main component ───────────────────────────────────────────────────────────

export function BookHero({
  book,
  ratingSummary,
}: {
  book: BookType;
  ratingSummary: RatingSummary;
}) {
  const [wishList, setWishList] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trackOpen, setTrackOpen] = useState(false);

  const languageLabel = useMemo(
    () => LANGUAGE_MAP[book.originalLanguage ?? ""] ?? book.originalLanguage ?? "غير معروفة",
    [book.originalLanguage],
  );

  const genreLabels = useMemo(
    () =>
      (book.genres ?? []).slice(0, 5).map((g) => ({
        value: g,
        label: BOOK_GENRES.find((bg) => bg.value === g)?.label ?? g,
      })),
    [book.genres],
  );

  const meta = useMemo(
    () =>
      [
        { label: "الناشر", value: book.publisher?.name },
        { label: "سنة النشر", value: book.publicationYear?.toString() },
        {
          label: "عدد الصفحات",
          value: book.pageCount ? `${book.pageCount} صفحة` : undefined,
        },
        { label: "اللغة الأصلية", value: languageLabel },
        { label: "المترجم", value: book.translator },
        {
          label: "السلسلة",
          value: book.series
            ? book.seriesPosition
              ? `${book.series.name} – #${book.seriesPosition}`
              : book.series.name
            : undefined,
        },
      ].filter((item) => item.value) as { label: string; value: string }[],
    [book, languageLabel],
  );

  return (
    <section className="border-b" dir="rtl">
      {/* ── Top: cover + info ── */}
      <div className="bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:gap-12">
            {/* Cover column */}
            <div className="flex flex-col items-center gap-4 lg:sticky lg:top-20 lg:self-start">
              <div className="relative">
                <img
                  src={book.coverImageUrl || "/books/placeholder.png"}
                  alt={`غلاف ${book.title}`}
                  className="w-44 rounded-xl object-cover shadow-xl ring-1 ring-border/50 sm:w-52 lg:w-56"
                  style={{ aspectRatio: "2/3" }}
                />
                {/* Edition badge */}
                {book.originalLanguage && book.originalLanguage !== "ar" && (
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
                    مترجم
                  </span>
                )}
              </div>

              {/* Primary CTA */}
              <div className="w-full max-w-56 space-y-2">
                <ButtonGroup className="flex w-full">
                  <Button className="flex-1 gap-2" onClick={() => setWishList((w) => !w)}>
                    {wishList ? (
                      <>
                        <CheckIcon weight="bold" className="size-4" />
                        أريد قراءته
                      </>
                    ) : (
                      <>
                        <BookmarkSimpleIcon weight="bold" className="size-4" />
                        أضف إلى الرف
                      </>
                    )}
                  </Button>
                  <Button aria-label="خيارات الرف" onClick={() => setTrackOpen(true)}>
                    <CaretDownIcon className="size-4" />
                  </Button>
                </ButtonGroup>

                {/* Secondary actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-1.5"
                    onClick={() => setLiked((l) => !l)}
                  >
                    <HeartIcon
                      weight={liked ? "fill" : "regular"}
                      className={cn("size-4 transition-colors", liked && "text-destructive")}
                    />
                    <span className="text-xs">{liked ? "أعجبني" : "إعجاب"}</span>
                  </Button>
                  <Button variant="outline" size="icon" aria-label="مشاركة">
                    <ShareNetworkIcon weight="bold" className="size-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Info column */}
            <div className="flex flex-col gap-6">
              {/* Award pill — show if any */}
              {/* Replace with real awards data */}
              <div className="flex items-center gap-1.5 w-fit rounded-full bg-amber-50 dark:bg-amber-950 px-3 py-1 text-xs font-medium text-amber-800 dark:text-amber-200">
                <TrophyIcon weight="duotone" className="size-3.5 text-amber-500" />
                أفضل ترجمة عربية 2023
              </div>

              {/* Title + author */}
              <div className="flex items-end justify-between">
                <div className="space-y-2 w-full">
                  <h1 className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    {book.title}
                  </h1>
                  {book.subtitle && (
                    <p className="text-base text-muted-foreground">{book.subtitle}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                    <span className="text-muted-foreground">بقلم</span>
                    <Link
                      to="/author/$id" // TODO: CHANGE TO SLUG?
                      params={{ id: book.author?.slug ?? "" }}
                      className="font-semibold text-primary hover:underline"
                    >
                      {book.author?.name ?? "غير معروف"}
                    </Link>
                    {book.series && (
                      <>
                        <span className="text-muted-foreground/50">·</span>
                        <span className="inline-flex items-center gap-1 rounded-full border bg-background px-2.5 py-0.5 text-xs text-muted-foreground">
                          <BooksIcon className="size-3" />
                          {book.seriesPosition
                            ? `ج${book.seriesPosition} — ${book.series.name}`
                            : book.series.name}
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <FriendsWhoRead friends={FAKE_FRIENDS} />
              </div>

              {/* Rating */}
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="text-4xl font-black tabular-nums text-foreground">
                      {ratingSummary?.average?.toFixed(1)}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <StarIcon
                            key={star}
                            weight={
                              star <= Math.round(ratingSummary?.average ?? 0) ? "fill" : "regular"
                            }
                            className="w-4 h-4 text-primary"
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(ratingSummary?.totalRatings)} تقييم
                        <span className="px-2">·</span>
                        {formatNumber(ratingSummary?.totalReviews)} مراجعة
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {ratingSummary?.distribution?.map(({ stars, percent }) => (
                      <div key={stars} className="flex items-center gap-2.5">
                        <span className="w-4 text-xs text-muted-foreground tabular-nums">
                          {stars}
                        </span>
                        <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-10 text-xs text-muted-foreground tabular-nums text-left">
                          %{percent}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Meta grid */}
              {meta.length > 0 && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                  {meta.map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-[11px] text-muted-foreground">{label}</span>
                      <span className="text-sm font-medium">{value}</span>
                    </div>
                  ))}
                  {/* Genre chips */}
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] text-muted-foreground">التصنيفات</span>
                    <span className="text-sm font-medium">
                      {genreLabels.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {genreLabels.map(({ value, label }) => (
                            <Link
                              key={value}
                              to="/discover/books"
                              search={{ genres: [value] }}
                              className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                            >
                              {label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <TrackBookModal book={book} open={trackOpen} onOpenChange={setTrackOpen} />
    </section>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FriendsWhoRead({ friends }: { friends: typeof FAKE_FRIENDS }) {
  if (!friends.length) return null;
  const shown = friends.slice(0, 3);
  const display = shown.map((f) => f.name.split(" ")[0]).join("، ");

  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 rounded-xl border bg-muted/30 px-4 py-3 text-right transition-colors hover:bg-muted/60"
    >
      {/* Stacked avatars */}
      <div className="flex items-center">
        {shown.map((f, i) => (
          <div
            key={f.id}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full border-2 border-background text-xs font-medium",
              f.color,
              i > 0 && "-mr-2",
            )}
          >
            {f.initials}
          </div>
        ))}
      </div>
      <span className="flex-1 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">{display}</span>
        {friends.length > 3 && ` و${friends.length - 3} آخرون`}
        {" قرأوا هذا الكتاب"}
      </span>
      <CaretLeftIcon className="size-4 text-muted-foreground" />
    </button>
  );
}
