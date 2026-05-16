import { useBookTracking } from "@features/books/context/book-tracking-context";
import type { BookCardBook } from "@features/books/server/get-books";
import { CheckCircleIcon, PlusIcon, StarIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { cn } from "@/ui/lib/utils";

interface BookListItemProps {
  book: BookCardBook;
  rank?: number;
  trackingStatus?: "plan-to-read" | "reading" | "completed" | "on-hold" | "dropped" | null;
  readingProgress?: number | null;
}

const STATUS_DOT: Record<string, string> = {
  "plan-to-read": "bg-slate-400",
  reading: "bg-sky-400",
  completed: "bg-emerald-400",
  "on-hold": "bg-amber-400",
  dropped: "bg-rose-400",
};

export function BookListItem({ book, rank, trackingStatus, readingProgress }: BookListItemProps) {
  const { openTrackModal } = useBookTracking();
  const rating = 4.6; // TODO: add book.rating
  const isReading = trackingStatus === "reading";
  const isCompleted = trackingStatus === "completed";

  return (
    <article className="group">
      <Link to="/book/$id" params={{ id: book.id }} className="block">
        <div
          className={cn(
            "relative flex items-center gap-3 px-3 py-2.5 rounded-xl",
            "transition-all duration-150 ease-out",
            "hover:bg-accent/60 hover:shadow-sm",
          )}
        >
          {/* Status stripe on right edge (RTL) */}
          {trackingStatus && (
            <div
              className={cn(
                "absolute right-0 inset-y-2 w-0.5 rounded-full",
                STATUS_DOT[trackingStatus],
              )}
            />
          )}

          {/* Rank number */}
          {rank != null && (
            <span
              className={cn(
                "shrink-0 w-7 text-center text-xs font-bold tabular-nums",
                rank <= 3 ? "text-amber-400" : "text-muted-foreground/40",
              )}
            >
              {rank}
            </span>
          )}

          {/* Cover */}
          <div className="bg-muted relative h-14 w-9 shrink-0 overflow-hidden rounded-md shadow-sm">
            <div className="from-background/25 pointer-events-none absolute inset-y-0 left-0 z-10 w-1 bg-linear-to-r to-transparent" />
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`غلاف ${book.title}`}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title & Author */}
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground group-hover:text-primary truncate text-sm leading-tight font-semibold transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground/70 mt-0.5 truncate text-xs">{book.author?.name}</p>

            {/* Progress bar — mobile only for reading books */}
            {isReading && readingProgress != null && (
              <div className="mt-1.5 flex items-center gap-2 md:hidden">
                <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-sky-400 tabular-nums">
                  {readingProgress}%
                </span>
              </div>
            )}
          </div>

          {/* Progress — desktop */}
          {isReading && readingProgress != null && (
            <div className="hidden w-28 shrink-0 items-center gap-2 md:flex">
              <div className="bg-muted h-1 flex-1 overflow-hidden rounded-full">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-sky-400 tabular-nums">
                {readingProgress}%
              </span>
            </div>
          )}

          {/* Genres — desktop only */}
          <div className="hidden w-36 shrink-0 items-center gap-1.5 md:flex">
            {book.genres?.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-secondary/40 h-5 rounded-full px-1.5 py-0 text-[10px] font-normal"
              >
                {BOOK_GENRES.find((g) => g.value === genre)?.label ?? genre}
              </Badge>
            ))}
          </div>

          {/* Year */}
          {book.publicationYear && (
            <div className="text-muted-foreground/60 hidden w-12 shrink-0 text-center text-[11px] tabular-nums sm:block">
              {book.publicationYear}
            </div>
          )}

          {/* Rating */}
          <div className="flex w-14 shrink-0 items-center justify-center gap-1">
            {isCompleted ? (
              <CheckCircleIcon weight="fill" className="h-4 w-4 text-emerald-400" />
            ) : rating ? (
              <>
                <StarIcon weight="fill" className="h-3 w-3 text-amber-400" />
                <span className="text-xs font-semibold tabular-nums">{rating.toFixed(1)}</span>
              </>
            ) : null}
          </div>

          {/* Add button — appears on hover */}
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              openTrackModal(book);
            }}
            className={cn(
              "shrink-0 w-8 h-8 rounded-full transition-all duration-150",
              "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100",
              "hover:bg-primary hover:text-primary-foreground",
            )}
            aria-label="إضافة إلى قائمة القراءة"
          >
            <PlusIcon weight="bold" className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Link>
    </article>
  );
}
