"use client";

import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import type { BookDetail } from "@features/books/types";
import {
  BookmarkSimpleIcon,
  BookOpenIcon,
  CheckIcon,
  HeartIcon,
  ShareNetworkIcon,
  StarIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { useState } from "react";

const SHELF_OPTIONS = [
  { label: "أريد القراءة", icon: BookmarkSimpleIcon },
  { label: "أقرأ الآن", icon: BookOpenIcon },
  { label: "قرأتُه", icon: CheckIcon },
] as const;

export function BookHero({ book }: { book: BookDetail }) {
  const [shelf, setShelf] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [shelfOpen, setShelfOpen] = useState(false);

  return (
    <section className="relative overflow-hidden">
      {/* Subtle ash/mist background glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 20% 80%, hsl(200 40% 20% / 0.4) 0%, transparent 60%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid lg:grid-cols-[minmax(0,auto)_1fr] gap-10 lg:gap-16 items-start">
          {/* Cover + Actions */}
          <div className="flex flex-col items-center gap-6 lg:sticky lg:top-8">
            <div
              className="relative w-56 sm:w-64 lg:w-72 shrink-0 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50"
              style={{ aspectRatio: "2/3" }}
            >
              <Image
                src={book.cover}
                alt={`غلاف كتاب ${book.title}`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Shelf & Actions */}
            <div className="w-full max-w-[280px] flex flex-col gap-3">
              <div className="relative">
                <Button
                  className="w-full gap-2.5 rounded-xl font-semibold bg-linear-to-r from-primary to-primary/90 text-primary-foreground hover:brightness-110 shadow-md"
                  onClick={() => setShelfOpen((o) => !o)}
                >
                  {shelf ? (
                    <>
                      <CheckIcon weight="bold" className="w-5 h-5" />
                      {shelf}
                    </>
                  ) : (
                    <>
                      <BookmarkSimpleIcon weight="bold" className="w-5 h-5" />
                      أضف إلى الرف
                    </>
                  )}
                </Button>

                {shelfOpen && (
                  <div className="absolute top-full left-0 right-0 mt-2 z-30 rounded-xl overflow-hidden shadow-2xl border border-border bg-popover/95 backdrop-blur-sm">
                    {SHELF_OPTIONS.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                        className="w-full flex items-center gap-3 px-5 py-3.5 text-sm text-right transition-colors hover:bg-accent/70"
                        style={{
                          color:
                            shelf === label ? "hsl(var(--primary))" : undefined,
                        }}
                        onClick={() => {
                          setShelf(label);
                          setShelfOpen(false);
                        }}
                      >
                        <Icon weight="bold" className="w-5 h-5 shrink-0" />
                        {label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2.5">
                <Button
                  variant="outline"
                  className="flex-1 gap-2 rounded-xl text-sm font-medium"
                  onClick={() => setLiked((l) => !l)}
                  aria-label={liked ? "إلغاء الإعجاب" : "إعجاب"}
                >
                  <HeartIcon
                    weight={liked ? "fill" : "regular"}
                    className="w-5 h-5 transition-all"
                    style={{
                      color: liked ? "hsl(var(--destructive))" : undefined,
                    }}
                  />
                  {liked ? "أعجبني" : "أعجبني"}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-xl shrink-0"
                  aria-label="مشاركة الكتاب"
                >
                  <ShareNetworkIcon weight="bold" className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-8">
            {/* Badges */}
            {book.badges && book.badges.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {book.badges.map((b, i) => (
                  <Badge
                    key={b}
                    variant={i === 0 ? "default" : "secondary"}
                    className={`text-xs px-4 py-1.5 font-semibold ${
                      i === 0
                        ? "bg-primary text-primary-foreground border-0 shadow-sm"
                        : ""
                    }`}
                  >
                    {b}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title & Author */}
            <div className="flex flex-col gap-3">
              <h1
                className="text-xxl lg:text-3xl font-extrabold leading-[1.05] text-balance tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {book.title}
              </h1>
              <p className="text-xl text-primary font-medium">{book.author}</p>
            </div>

            {/* Series info */}
            {book.series && (
              <p className="text-base text-muted-foreground font-medium">
                {book.series}
              </p>
            )}

            {/* Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-8">
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-baseline gap-3">
                  <span
                    className="text-6xl lg:text-7xl font-black text-foreground"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {book.rating}
                  </span>
                  <span className="text-xl text-muted-foreground">/5</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      weight="fill"
                      className={`w-6 h-6 ${
                        star <= Math.round(book.rating)
                          ? "text-yellow-400"
                          : "text-muted/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {book.ratingTotal?.toLocaleString("ar-EG")} تقييم ·{" "}
                  {book.reviewCountTotal?.toLocaleString("ar-EG")} مراجعة
                </p>
              </div>

              <Separator
                orientation="vertical"
                className="hidden sm:block h-20 opacity-30"
              />

              <div className="flex flex-col gap-2 flex-1 max-w-md">
                {book.ratingCounts?.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-sm w-5 text-right shrink-0 text-muted-foreground tabular-nums">
                      {stars}
                    </span>
                    <StarIcon
                      weight="fill"
                      className="w-4 h-4 shrink-0 text-yellow-400/80"
                    />
                    <div className="flex-1 h-2 rounded-full overflow-hidden bg-muted/60">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-primary to-primary/80 transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm w-10 shrink-0 text-muted-foreground tabular-nums">
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-2 bg-border/50" />

            {/* Meta */}
            {book.meta && book.meta.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {book.meta.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-1.5">
                    <span className="text-xs uppercase tracking-widest font-medium text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade for clean section end */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--background)) 70%)",
        }}
      />
    </section>
  );
}
