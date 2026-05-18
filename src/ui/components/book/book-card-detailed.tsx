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
  const effectiveStatus = trackingStatus ?? book.status ?? undefined;
  const isReading = effectiveStatus === "currently_reading";
  const statusConfig = effectiveStatus ? getStatusConfig(effectiveStatus) : null;

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
            className="aspect-2/3 h-full w-auto max-w-40 min-w-20 rounded-r-2xl"
          >
            {/* Inner shadow separating cover from content */}
            <div className="from-background/20 pointer-events-none absolute inset-y-0 left-0 z-20 w-3 bg-linear-to-r to-transparent" />
          </BookCover>
        </Link>

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-2 py-4 pr-5 pl-4">
          {/* Title + rating */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link
                to="/book/$id"
                params={{ id: book.id }}
                className="text-foreground line-clamp-2 text-base leading-snug font-semibold transition-colors hover:underline"
              >
                {book.title}
              </Link>
              {book.author ? (
                <Link
                  to="/author/$id"
                  params={{ id: book.author.id }}
                  className="text-muted-foreground mt-1 w-fit truncate text-sm hover:underline"
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

          {/* Footer: status + metadata + genres */}
          <div className="mt-auto flex min-w-0 flex-col gap-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                {book.publicationYear && (
                  <span className="bg-muted/60 text-muted-foreground flex h-6 items-center gap-1 rounded-md px-2 text-[11px] tabular-nums">
                    <CalendarBlankIcon className="h-3 w-3" />
                    {book.publicationYear}
                  </span>
                )}
                {book.pageCount && (
                  <span className="bg-muted/60 text-muted-foreground h-6 rounded-md px-2 text-[11px] leading-6 tabular-nums">
                    {book.pageCount} ص
                  </span>
                )}
              </div>
              {effectiveStatus ? (
                <StatusBadge
                  status={effectiveStatus}
                  variant="pill"
                  className="relative top-0.5 h-6 shrink-0 px-2 text-[11px] transition-all duration-200 group-hover:pl-8"
                />
              ) : (
                book.genres &&
                book.genres.length > 0 && (
                  <div className="flex min-w-0 flex-wrap gap-1.5 transition-all duration-200 group-hover:pl-8.5">
                    {book.genres.slice(0, 2).map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-secondary/45 max-w-28 truncate rounded-md px-2 py-0.5 text-[10px] font-medium sm:max-w-none"
                      >
                        {BOOK_GENRES.find((g) => g.value === genre)?.label ?? genre}
                      </Badge>
                    ))}
                    {book.genres.length > 2 && (
                      <Badge
                        variant="outline"
                        className="rounded-md border-dashed px-2 py-0.5 text-[10px] font-normal"
                      >
                        +{book.genres.length - 2}
                      </Badge>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Track button — floats over bottom-left of card */}
      <div className="absolute bottom-3 left-3 z-10">
        <TrackButton
          trackingStatus={effectiveStatus}
          onClick={() => openTrackModal(book)}
          size="sm"
          className={cn(
            "transition-all duration-200 shadow-none! border-0!",
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
