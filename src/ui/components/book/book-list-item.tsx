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
          <div className="relative w-9 h-14 rounded-md overflow-hidden shrink-0 bg-muted shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1 bg-linear-to-r from-background/25 to-transparent" />
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`غلاف ${book.title}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title & Author */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold leading-tight truncate text-foreground group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground/70 truncate mt-0.5">{book.author?.name}</p>

            {/* Progress bar — mobile only for reading books */}
            {isReading && readingProgress != null && (
              <div className="flex items-center gap-2 mt-1.5 md:hidden">
                <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-sky-500"
                    style={{ width: `${readingProgress}%` }}
                  />
                </div>
                <span className="text-[10px] text-sky-400 tabular-nums font-medium">
                  {readingProgress}%
                </span>
              </div>
            )}
          </div>

          {/* Progress — desktop */}
          {isReading && readingProgress != null && (
            <div className="hidden md:flex items-center gap-2 shrink-0 w-28">
              <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-sky-500 transition-all"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>
              <span className="text-[10px] text-sky-400 tabular-nums font-semibold">
                {readingProgress}%
              </span>
            </div>
          )}

          {/* Genres — desktop only */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0 w-36">
            {book.genres?.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="text-[10px] px-1.5 py-0 h-5 font-normal bg-secondary/40 rounded-full"
              >
                {BOOK_GENRES.find((g) => g.value === genre)?.label ?? genre}
              </Badge>
            ))}
          </div>

          {/* Year */}
          {book.publicationYear && (
            <div className="hidden sm:block w-12 text-center text-[11px] text-muted-foreground/60 tabular-nums shrink-0">
              {book.publicationYear}
            </div>
          )}

          {/* Rating */}
          <div className="w-14 flex items-center justify-center gap-1 shrink-0">
            {isCompleted ? (
              <CheckCircleIcon weight="fill" className="w-4 h-4 text-emerald-400" />
            ) : rating ? (
              <>
                <StarIcon weight="fill" className="w-3 h-3 text-amber-400" />
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
            <PlusIcon weight="bold" className="w-3.5 h-3.5" />
          </Button>
        </div>
      </Link>
    </article>
  );
}
