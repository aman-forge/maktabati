import { useBookTracking } from "@features/books/context/book-tracking-context";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { BookCardType, ReadingStatus, getStatusConfig } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

import {
  BookCover,
  RatingPill,
  ReadingProgress,
  StatusBadge,
  TrackButton,
} from "./book-card-parts";

interface BookCardDetailedProps {
  book: BookCardType;
  trackingStatus?: ReadingStatus;
  readingProgress?: number | null;
}

export function BookCardDetailed({ book, trackingStatus, readingProgress }: BookCardDetailedProps) {
  const { openTrackModal } = useBookTracking();
  const rating = 4.2; // TODO: add book.rating
  const isReading = trackingStatus === "currently_reading";
  const statusConfig = trackingStatus ? getStatusConfig(trackingStatus) : null;

  return (
    <article className="group relative h-full">
      <div
        className={cn(
          "relative flex rounded-2xl border border-border/50 bg-card overflow-visible h-full",
          "transition-all duration-200 hover:border-transparent! hover:shadow-lg hover:shadow-primary/5",
        )}
      >
        <div
          className={cn(
            "w-full h-full scale-x-101 scale-y-102 absolute -z-5 p-4 rounded-2xl opacity-0 group-hover:opacity-100!",
            "duration-200 transition-all",
            statusConfig && statusConfig.badgeClass,
          )}
        ></div>
        {/* Cover */}
        <Link to="/book/$id" params={{ id: book.id }} className="shrink-0 self-stretch">
          <BookCover
            src={book.coverImageUrl}
            alt={`غلاف ${book.title}`}
            className="h-full w-auto rounded-r-2xl aspect-2/3 min-w-20 max-w-40"
          >
            {/* Inner shadow separating cover from content */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-linear-to-r from-background/20 to-transparent" />
          </BookCover>
        </Link>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-4 pl-4 pr-5">
          {/* Title + rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link
                to="/book/$id"
                params={{ id: book.id }}
                className="text-base font-semibold leading-snug line-clamp-2 text-foreground hover:underline transition-colors"
              >
                {book.title}
              </Link>
              {book.author ? (
                <Link
                  to="/author/$id"
                  params={{ id: book.author.id }}
                  className="text-muted-foreground mt-1 truncate text-sm hover:underline w-fit"
                >
                  {book.author.name}
                </Link>
              ) : (
                <p className="text-muted-foreground mt-0.5 truncate text-sm">مجهول</p>
              )}
            </div>

            {rating && <RatingPill rating={rating} variant="inline" className="shrink-0" />}
          </div>

          {/* Description */}
          {book.description && (
            <p className="text-muted-foreground line-clamp-3 text-justify text-sm leading-relaxed">
              {book.description}
            </p>
          )}

          {/* Reading progress */}
          {isReading && readingProgress != null && <ReadingProgress progress={readingProgress} />}

          {/* Footer: meta + status + genres */}
          <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5">
            {/* Meta */}
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

            {/* Status pill */}
            {trackingStatus && (
              <StatusBadge
                status={trackingStatus}
                variant="pill"
                className="mr-auto group-hover:pl-7 duration-200 transition-all"
              />
            )}

            {/* Genre chips — pushed to end */}
            {book.genres && book.genres.length > 0 && (
              <div className="flex flex-wrap gap-1 mr-auto">
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

      {/* Track button — floats over bottom-left of card */}
      <div className="absolute bottom-3 left-3 z-10">
        <TrackButton
          trackingStatus={trackingStatus}
          onClick={() => openTrackModal(book)}
          size="sm"
          className={cn(
            "transition-all duration-200",
            "opacity-0 scale-90 translate-y-1 backdrop-blur-sm!",
            "group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0",
            statusConfig && statusConfig.bgColor,
            statusConfig && statusConfig.bgHoverColor,
          )}
        />
      </div>
    </article>
  );
}
