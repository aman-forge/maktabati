import { useBookTracking } from "@features/books/context/book-tracking-context";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { BookCardType, ReadingStatus, getStatusConfig } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

import { BookCover, RatingPill, StatusBadge, TrackButton } from "./book-card-parts";

interface BookCardProps {
  book: BookCardType;
  size?: "sm" | "md" | "lg";
  trackingStatus?: ReadingStatus;
}

const DIMENSIONS = {
  sm: { card: "w-32", image: "h-48" },
  md: { card: "w-40", image: "h-60" },
  lg: { card: "w-48", image: "h-72" },
} as const;

export function BookCard({ book, size = "lg", trackingStatus }: BookCardProps) {
  const { openTrackModal } = useBookTracking();
  const dim = DIMENSIONS[size];
  const rating = 4.5; // TODO: add book.rating
  const effectiveStatus = trackingStatus ?? book.status ?? undefined;
  const statusConfig = effectiveStatus ? getStatusConfig(effectiveStatus) : null;

  return (
    <article className={cn("relative flex flex-col gap-2.5 shrink-0 group mt-0 mb-auto", dim.card)}>
      {/* Cover */}
      <div
        className={cn(
          "relative rounded-xl cursor-pointer",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:-translate-y-1",
          dim.image,
        )}
      >
        <div
          className={cn(
            "w-[102%] h-[101.5%] top-[-0.75%] left-[-1%] absolute z-0 p-4 rounded-[calc(var(--radius)+6px)] opacity-100",
            "duration-200 transition-all",
            statusConfig && statusConfig.badgeClass,
          )}
        ></div>
        <Link to="/book/$id" params={{ id: book.id }}>
          <BookCover
            src={book.coverImageUrl}
            alt={`غلاف ${book.title}`}
            className="h-full w-full rounded-xl"
          >
            {/* Hover gradient overlay */}
            <div className="from-background/80 via-background/10 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </BookCover>
        </Link>

        {/* Rating — top right */}
        {rating != null && (
          <div className="absolute top-1.5 right-1.5 z-20">
            <RatingPill rating={rating} variant="overlay" />
          </div>
        )}

        {effectiveStatus && (
          <StatusBadge
            status={effectiveStatus}
            variant="pill"
            className="absolute -bottom-2 left-1/2 h-5 -translate-x-1/2 px-1.5 text-[10px] transition-all duration-300 group-hover:bottom-1 group-hover:opacity-0"
          />
        )}
        {/* Track button — fades in on hover, bottom-left */}
        <div
          className={cn(
            "absolute bottom-2.5 left-2.5 z-20",
            "opacity-0 translate-y-2 scale-90",
            "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
            "transition-all duration-200 ease-out",
            "flex flex-row justify-between w-[calc(100%-20px)]",
          )}
        >
          {/* Footer: status pill OR genres, always with year/pages */}
          <div className="mt-1 flex flex-wrap items-center gap-1">
            {/* Year + pages — always shown */}
            {book.publicationYear && (
              <span className="bg-muted/60 text-muted-foreground flex h-5 items-center gap-1 rounded-md px-1.5 text-[10px] tabular-nums">
                <CalendarBlankIcon className="h-2.5 w-2.5" />
                {book.publicationYear}
              </span>
            )}
            {book.pageCount && (
              <span className="bg-muted/60 text-muted-foreground h-5 rounded-md px-1.5 text-[10px] leading-5 tabular-nums">
                {book.pageCount} ص
              </span>
            )}

            {/* Status pill — shown only when tracked */}
            {!effectiveStatus &&
              /* Genres — only when no status */
              book.genres?.[0] && (
                <Badge
                  variant="secondary"
                  className="bg-secondary/45 h-5 rounded-md px-1.5 py-0 text-[10px] font-medium"
                >
                  {BOOK_GENRES.find((g) => g.value === book.genres?.[0])?.label ?? book.genres[0]}
                </Badge>
              )}
          </div>
          <TrackButton
            trackingStatus={effectiveStatus}
            onClick={() => openTrackModal(book)}
            className={cn(
              "shadow-none! border-0! backdrop-blur-sm!",
              statusConfig && statusConfig.bgColor,
              statusConfig && statusConfig.bgHoverColor,
            )}
          />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 px-0.5 pt-1">
        {/* Title */}
        <Link to="/book/$id" params={{ id: book.id }}>
          <h3 className="text-foreground line-clamp-2 text-sm leading-snug font-semibold transition-colors duration-200 hover:underline">
            {book.title}
          </h3>
        </Link>

        {/* Author */}
        {book.author ? (
          <Link
            to="/author/$id"
            params={{ id: book.author.id }}
            className="text-muted-foreground truncate text-xs hover:underline"
          >
            {book.author.name}
          </Link>
        ) : (
          <p className="text-muted-foreground truncate text-xs">مجهول</p>
        )}
      </div>
    </article>
  );
}
