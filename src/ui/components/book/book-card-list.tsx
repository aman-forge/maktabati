import { useBookTracking } from "@features/books/context/book-tracking-context";
import { Badge } from "@shadcn/badge";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { BookCardType, ReadingStatus } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

import {
  BookCover,
  RatingPill,
  ReadingProgress,
  StatusBadge,
  TrackButton,
} from "./book-card-parts";

interface BookListItemProps {
  book: BookCardType;
  rank?: number;
  trackingStatus?: ReadingStatus;
  readingProgress?: number | null;
}

/** Top-3 rank gets a highlighted color; rest are muted. */
function RankNumber({ rank }: { rank: number }) {
  const colors = ["text-amber-400", "text-slate-400", "text-amber-600/80"];
  const color = rank <= 3 ? colors[rank - 1] : "text-muted-foreground/30";
  return (
    <span
      className={cn(
        "shrink-0 w-7 text-center text-xs font-bold tabular-nums select-none",
        color,
        // subtle glow for podium spots
        rank <= 3 && "drop-shadow-[0_0_4px_currentColor]",
      )}
    >
      {rank}
    </span>
  );
}

export function BookListItem({ book, rank, trackingStatus, readingProgress }: BookListItemProps) {
  const { openTrackModal } = useBookTracking();
  const rating = 4.6; // TODO: add book.rating
  const isReading = trackingStatus === "currently_reading";

  return (
    <article className="group">
      <Link to="/book/$id" params={{ id: book.id }} className="block">
        <div
          className={cn(
            "relative flex items-center gap-3 px-3 py-2.5 rounded-xl",
            "transition-all duration-150 ease-out",
            "hover:bg-accent/60 hover:shadow-sm",
            // subtle left-shift on hover for a "sliding" feel
            "hover:-translate-x-0.5",
          )}
        >
          {/* Status stripe — right edge (RTL) */}
          {trackingStatus && (
            <div className="absolute right-0 inset-y-2 z-10">
              <StatusBadge status={trackingStatus} variant="stripe-dot" />
            </div>
          )}

          {/* Rank */}
          {rank != null && <RankNumber rank={rank} />}

          {/* Cover */}
          <BookCover
            src={book.coverImageUrl}
            alt={`غلاف ${book.title}`}
            className="h-14 w-9 shrink-0 rounded-md shadow-sm"
          />

          {/* Title, author, and progress (stacked) */}
          <div className="min-w-0 flex-1 flex flex-col gap-0.5">
            <h3 className="text-foreground group-hover:text-primary truncate text-sm leading-tight font-semibold transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground/70 truncate text-xs">{book.author?.name}</p>

            {/* Progress bar — always inline below author when reading */}
            {isReading && readingProgress != null && (
              <ReadingProgress
                progress={readingProgress}
                showLabel={false}
                className="mt-1.5 space-y-0"
              />
            )}
          </div>

          {/* Reading % label — desktop, only when reading */}
          {isReading && readingProgress != null && (
            <span className="hidden md:block shrink-0 text-[11px] font-semibold tabular-nums text-blue-400 w-8 text-center">
              {readingProgress}%
            </span>
          )}

          {/* Genres — desktop only */}
          {book.genres && book.genres.length > 0 && (
            <div className="hidden md:flex shrink-0 items-center gap-1 w-36">
              {book.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre}
                  variant="secondary"
                  className="bg-secondary/40 h-5 rounded-full px-1.5 py-0 text-[10px] font-normal"
                >
                  {BOOK_GENRES.find((g) => g.value === genre)?.label ?? genre}
                </Badge>
              ))}
              {book.genres.length > 2 && (
                <span className="text-muted-foreground/40 text-[10px]">
                  +{book.genres.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Year — desktop */}
          {book.publicationYear && (
            <div className="text-muted-foreground/50 hidden sm:block shrink-0 w-12 text-center text-[11px] tabular-nums">
              {book.publicationYear}
            </div>
          )}

          {/* Rating */}
          <div className="shrink-0 w-14 flex justify-center">
            <RatingPill rating={rating} variant="overlay" />
          </div>

          {/* Track button — dim at rest, bright on hover */}
          <TrackButton
            trackingStatus={trackingStatus}
            onClick={() => openTrackModal(book)}
            size="sm"
            className={cn(
              "shrink-0 transition-all duration-150",
              "opacity-20 scale-90",
              "group-hover:opacity-100 group-hover:scale-100",
            )}
          />
        </div>
      </Link>
    </article>
  );
}
