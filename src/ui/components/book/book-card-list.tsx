import { useBookTracking } from "@features/books/context/book-tracking-context";
import { CalendarBlankIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Link } from "@tanstack/react-router";

import { BOOK_GENRES } from "@/db/constants/books";
import { BookCardType, ReadingStatus, getStatusConfig } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

import { BookCover, RatingPill, ReadingProgress, TrackButton } from "./book-card-parts";

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
  const effectiveStatus = trackingStatus ?? book.status ?? undefined;
  const isReading = effectiveStatus === "currently_reading";
  const statusConfig = effectiveStatus ? getStatusConfig(effectiveStatus) : null;
  const StatusIcon = statusConfig?.icon;

  return (
    <article className="group">
      <div
        className={cn(
          "relative flex items-center gap-3 rounded-xl border border-transparent px-3 py-3",
          "bg-card/45 transition-all duration-150 ease-out",
          "hover:border-border hover:bg-card hover:shadow-sm",
        )}
      >
        {statusConfig && (
          <div
            className={cn(
              "absolute inset-y-3 right-0 w-1 rounded-l-full opacity-80",
              statusConfig.bgColor,
            )}
          />
        )}

        {rank != null && <RankNumber rank={rank} />}

        <Link to="/book/$id" params={{ id: book.id }} className="shrink-0">
          <BookCover
            src={book.coverImageUrl}
            alt={`غلاف ${book.title}`}
            className="ring-border/50 h-16 w-10 rounded-md shadow-sm ring-1 transition-transform duration-150 group-hover:-translate-y-0.5"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex min-w-0 items-start gap-3">
            <div className="min-w-0 flex-1">
              <Link
                to="/book/$id"
                params={{ id: book.id }}
                className="text-foreground hover:text-primary block truncate text-sm leading-tight font-semibold transition-colors"
              >
                {book.title}
              </Link>
              <p className="text-muted-foreground/75 mt-0.5 truncate text-xs">
                {book.author?.name ?? "مؤلف غير معروف"}
              </p>
            </div>

            {statusConfig && (
              <span
                className={cn(
                  "hidden h-6 shrink-0 items-center gap-1 rounded-md px-2 text-[11px] font-medium sm:inline-flex",
                  statusConfig.badgeClass,
                )}
              >
                {StatusIcon && <StatusIcon weight="fill" className="size-3" />}
                {statusConfig.label}
              </span>
            )}
          </div>

          {isReading && readingProgress != null && (
            <ReadingProgress
              progress={readingProgress}
              showLabel={false}
              className="max-w-sm [&>div]:h-1"
            />
          )}

          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            {book.publicationYear && (
              <span className="text-muted-foreground/65 bg-muted/50 inline-flex h-5 items-center gap-1 rounded px-1.5 text-[10px] tabular-nums">
                <CalendarBlankIcon className="size-3" />
                {book.publicationYear}
              </span>
            )}

            {book.genres?.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-secondary/45 h-5 max-w-24 truncate rounded px-1.5 py-0 text-[10px] font-normal"
              >
                {BOOK_GENRES.find((g) => g.value === genre)?.label ?? genre}
              </Badge>
            ))}

            {book.genres && book.genres.length > 2 && (
              <span className="text-muted-foreground/45 text-[10px]">
                +{book.genres.length - 2}
              </span>
            )}

            {statusConfig && (
              <span
                className={cn(
                  "inline-flex h-5 items-center gap-1 rounded px-1.5 text-[10px] font-medium sm:hidden",
                  statusConfig.badgeClass,
                )}
              >
                {StatusIcon && <StatusIcon weight="fill" className="size-3" />}
                {statusConfig.label}
              </span>
            )}
          </div>
        </div>

        <div className="hidden w-14 shrink-0 justify-center sm:flex">
          <RatingPill rating={rating} variant="overlay" />
        </div>

        <TrackButton
          trackingStatus={effectiveStatus}
          onClick={() => openTrackModal(book)}
          size="sm"
          className={cn(
            "shrink-0 transition-all duration-150",
            statusConfig
              ? cn(statusConfig.bgColor, statusConfig.bgHoverColor)
              : "bg-primary hover:bg-primary/90",
            "opacity-75 group-hover:opacity-100",
          )}
        />
      </div>
    </article>
  );
}
