import { useBookTracking } from "@features/books/context/book-tracking-context";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { BookCardType, ReadingStatus } from "@/features/books/types";
import { Badge } from "@/ui/components/ui/badge";
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

  return (
    <article className={cn("flex flex-col gap-2.5 shrink-0 group mt-0 mb-auto", dim.card)}>
      {/* Cover */}
      <div
        className={cn(
          "relative rounded-xl cursor-pointer",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:-translate-y-1",
          dim.image,
        )}
      >
        <Link to="/book/$id" params={{ id: book.id }}>
          <BookCover
            src={book.coverImageUrl}
            alt={`غلاف ${book.title}`}
            className="rounded-xl h-full w-full"
          >
            {/* Hover gradient */}
            <div className="from-background/80 via-background/10 absolute inset-0 bg-linear-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Hover genre chip */}
            {book.genres?.[0] && (
              <div className="absolute inset-x-0 bottom-0 flex translate-y-1 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <Badge variant="secondary" className="text-[10px]">
                  {BOOK_GENRES.find((g) => g.value === book.genres?.[0])?.label}
                </Badge>
              </div>
            )}
          </BookCover>
        </Link>

        {/* Rating — top right */}
        {rating != null && (
          <div className="absolute top-2 right-2 z-20">
            <RatingPill rating={rating} variant="overlay" />
          </div>
        )}

        {/* Status — top left */}
        {trackingStatus && (
          <div className="absolute top-2 left-2 z-20">
            <StatusBadge status={trackingStatus} variant="icon-only" />
          </div>
        )}

        {/* Track button — fades in on hover */}
        <div
          className={cn(
            "absolute bottom-2.5 left-2.5 z-20",
            "opacity-0 translate-y-2 scale-90",
            "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
            "transition-all duration-200 ease-out",
          )}
        >
          <TrackButton trackingStatus={trackingStatus} onClick={() => openTrackModal(book)} />
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <Link to="/book/$id" params={{ id: book.id }}>
          <h3 className="text-foreground hover:underline line-clamp-2 text-sm leading-snug font-semibold transition-colors duration-200">
            {book.title}
          </h3>
        </Link>
        {book.author && (
          <Link
            to="/author/$id"
            params={{ id: book.author?.id }}
            className="text-muted-foreground truncate hover:underline text-xs"
          >
            {book.author?.name}
          </Link>
        )}
        {/*{book.pageCount && (
          <p className="text-muted-foreground/50 mt-0.5 text-[10px] tabular-nums">
            {book.pageCount} صفحة
          </p>
        )}*/}
      </div>
    </article>
  );
}
