import { useBookTracking } from "@features/books/context/book-tracking-context";
import type { BookCardBook } from "@features/books/server/get-books";
import {
  BookOpenIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  PlusIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { cn } from "@/ui/lib/utils";

interface BookCardDetailedProps {
  book: BookCardBook;
  /** Current user tracking status if available */
  trackingStatus?: "plan-to-read" | "reading" | "completed" | "on-hold" | "dropped" | null;
  /** Progress 0-100 if currently reading */
  readingProgress?: number | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  "plan-to-read": {
    label: "أخطط للقراءة",
    color: "text-slate-400",
    bgColor: "bg-slate-500/10 border-slate-500/20",
  },
  reading: {
    label: "أقرأ حالياً",
    color: "text-sky-400",
    bgColor: "bg-sky-500/10 border-sky-500/20",
  },
  completed: {
    label: "مكتمل",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10 border-emerald-500/20",
  },
  "on-hold": {
    label: "مؤجل",
    color: "text-amber-400",
    bgColor: "bg-amber-500/10 border-amber-500/20",
  },
  dropped: { label: "متروك", color: "text-rose-400", bgColor: "bg-rose-500/10 border-rose-500/20" },
};

export function BookCardDetailed({ book, trackingStatus, readingProgress }: BookCardDetailedProps) {
  const { openTrackModal } = useBookTracking();
  const rating = 4.2; // TODO: add book.rating
  const status = trackingStatus ? STATUS_CONFIG[trackingStatus] : null;
  const isReading = trackingStatus === "reading";

  return (
    <article className="group relative h-full">
      <div
        className={cn(
          "relative flex gap-4 rounded-2xl border border-border/50 bg-card overflow-hidden",
          "transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5",
          "hover:bg-card/90 h-full",
        )}
      >
        {/* Left accent stripe — color-coded by status */}
        {trackingStatus && (
          <div
            className={cn(
              "absolute right-34 inset-y-0 size-3! top-5.5 rounded-full ",
              trackingStatus === "reading" && "bg-sky-500",
              trackingStatus === "completed" && "bg-emerald-500",
              trackingStatus === "plan-to-read" && "bg-slate-500",
              trackingStatus === "on-hold" && "bg-amber-500",
              trackingStatus === "dropped" && "bg-rose-500",
            )}
          />
        )}

        {/* Cover */}
        <Link to="/book/$id" params={{ id: book.id }}>
          <div className="bg-muted relative h-52 w-auto shrink-0 self-stretch overflow-hidden rounded-r-2xl">
            {/* Spine highlight */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2 bg-linear-to-r from-black/30 to-transparent" />
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`غلاف ${book.title}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Status badge overlaid on cover bottom */}
            {status && (
              <div className="absolute inset-x-1 bottom-2 flex justify-center">
                <span
                  className={cn(
                    "text-[10px] font-medium px-2 py-0.5 rounded-full border backdrop-blur-md",
                    status.bgColor,
                    status.color,
                  )}
                >
                  {status.label}
                </span>
              </div>
            )}
          </div>
        </Link>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-4 pl-4">
          {/* Header row: title + rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link
                to="/book/$id"
                params={{ id: book.id }}
                className={cn(
                  "text-base font-semibold leading-snug line-clamp-2 text-foreground hover:text-primary transition-colors",
                  trackingStatus && "pr-2",
                )}
              >
                {book.title}
              </Link>
              {book.author ? (
                <Link to="/author/$id" params={{ id: book.author.id }} className="inline w-fit">
                  <p className="text-muted-foreground mt-1 truncate text-sm hover:underline">
                    {book.author?.name}
                  </p>
                </Link>
              ) : (
                <p className="text-muted-foreground mt-0.5 truncate text-sm">مجهول</p>
              )}
            </div>

            {rating && (
              <div className="flex shrink-0 items-center gap-1 rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-1">
                <StarIcon weight="fill" className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400 tabular-nums">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {book.description && (
            <p className="text-muted-foreground line-clamp-2 text-justify text-sm leading-relaxed">
              {book.description}
            </p>
          )}

          {/* Reading progress bar */}
          {isReading && readingProgress != null && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
                  <BookOpenIcon className="h-3 w-3" />
                  التقدم
                </span>
                <span className="text-[10px] font-semibold text-sky-400 tabular-nums">
                  {readingProgress}%
                </span>
              </div>
              <div className="bg-muted h-1 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer: meta + genres */}
          <div className="mt-auto flex flex-wrap items-center gap-3">
            {book.publicationYear && (
              <span className="text-muted-foreground/70 flex items-center gap-1 text-[11px]">
                <CalendarBlankIcon className="h-3 w-3" />
                {book.publicationYear}
              </span>
            )}
            {book.pageCount && (
              <span className="text-muted-foreground/70 text-[11px] tabular-nums">
                {book.pageCount} ص
              </span>
            )}

            {/* Genres */}
            {book.genres && book.genres.length > 0 && (
              <div className="mr-auto flex flex-wrap gap-1 pl-8">
                {book.genres.slice(0, 3).map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="bg-secondary/40 rounded-full px-2 py-0.5 text-[10px] font-medium"
                  >
                    {BOOK_GENRES.find((g) => g.value === genre)?.label}
                  </Badge>
                ))}
                {book.genres.length > 3 && (
                  <Badge
                    variant="outline"
                    className="rounded-full border-dashed px-2 py-0.5 text-[10px] font-normal"
                  >
                    +{book.genres.length - 3}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Track button — floats over card */}
      <Button
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          openTrackModal(book);
        }}
        className={cn(
          "absolute bottom-3 left-3 rounded-full w-8 h-8 shadow-lg z-10",
          trackingStatus === "completed"
            ? "bg-primary hover:bg-primary text-primary-foreground"
            : "bg-primary hover:bg-primary/90 text-primary-foreground",
          "transition-all duration-200 group-hover:opacity-100 scale-110 group-hover:scale-100 hover:scale-110",
        )}
        aria-label={trackingStatus ? "تحديث حالة القراءة" : "إضافة إلى قائمة القراءة"}
      >
        {trackingStatus === "completed" ? (
          <CheckCircleIcon weight="fill" className="h-3.5 w-3.5" />
        ) : (
          <PlusIcon weight="bold" className="h-3.5 w-3.5" />
        )}
      </Button>
    </article>
  );
}
