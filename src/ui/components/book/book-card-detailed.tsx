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
          <div className="relative w-auto shrink-0 rounded-r-2xl h-52 overflow-hidden bg-muted self-stretch">
            {/* Spine highlight */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-2 bg-linear-to-r from-black/30 to-transparent" />
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`غلاف ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />

            {/* Status badge overlaid on cover bottom */}
            {status && (
              <div className="absolute bottom-2 inset-x-1 flex justify-center">
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
        <div className="flex-1 flex flex-col min-w-0 py-4 pl-4 gap-2">
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
                  <p className="text-sm text-muted-foreground mt-1 truncate hover:underline">
                    {book.author?.name}
                  </p>
                </Link>
              ) : (
                <p className="text-sm text-muted-foreground mt-0.5 truncate">مجهول</p>
              )}
            </div>

            {rating && (
              <div className="flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <StarIcon weight="fill" className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-sm font-semibold text-amber-400 tabular-nums">
                  {rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {book.description && (
            <p className="text-sm text-muted-foreground text-justify line-clamp-2 leading-relaxed">
              {book.description}
            </p>
          )}

          {/* Reading progress bar */}
          {isReading && readingProgress != null && (
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <BookOpenIcon className="w-3 h-3" />
                  التقدم
                </span>
                <span className="text-[10px] font-semibold text-sky-400 tabular-nums">
                  {readingProgress}%
                </span>
              </div>
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all duration-500"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Footer: meta + genres */}
          <div className="flex items-center gap-3 mt-auto flex-wrap">
            {book.publicationYear && (
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground/70">
                <CalendarBlankIcon className="w-3 h-3" />
                {book.publicationYear}
              </span>
            )}
            {book.pageCount && (
              <span className="text-[11px] text-muted-foreground/70 tabular-nums">
                {book.pageCount} ص
              </span>
            )}

            {/* Genres */}
            {book.genres && book.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mr-auto pl-8">
                {book.genres.slice(0, 3).map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="text-[10px] px-2 py-0.5 font-medium bg-secondary/40 rounded-full"
                  >
                    {BOOK_GENRES.find((g) => g.value === genre)?.label}
                  </Badge>
                ))}
                {book.genres.length > 3 && (
                  <Badge
                    variant="outline"
                    className="text-[10px] px-2 py-0.5 font-normal border-dashed rounded-full"
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
          <CheckCircleIcon weight="fill" className="w-3.5 h-3.5" />
        ) : (
          <PlusIcon weight="bold" className="w-3.5 h-3.5" />
        )}
      </Button>
    </article>
  );
}
