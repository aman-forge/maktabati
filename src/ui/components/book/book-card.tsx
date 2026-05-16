import { useBookTracking } from "@features/books/context/book-tracking-context";
import type { BookCardBook } from "@features/books/server/get-books";
import { BookmarkSimpleIcon, CheckCircleIcon, PlusIcon, StarIcon } from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";
import { BOOK_GENRES } from "@/db/constants/books";
import { cn } from "@/ui/lib/utils";
import { Badge } from "../ui/badge";

interface BookCardProps {
  book: BookCardBook;
  size?: "sm" | "md" | "lg";
  trackingStatus?: "plan-to-read" | "reading" | "completed" | "on-hold" | "dropped" | null;
}

const DIMENSIONS = {
  sm: { card: "w-32", image: "h-48" },
  md: { card: "w-40", image: "h-60" },
  lg: { card: "w-48", image: "h-72" },
} as const;

const STATUS_COLORS: Record<string, string> = {
  "plan-to-read": "bg-slate-500",
  reading: "bg-sky-500",
  completed: "bg-emerald-500",
  "on-hold": "bg-amber-500",
  dropped: "bg-rose-500",
};

const STATUS_ICONS: Record<string, React.ElementType> = {
  "plan-to-read": BookmarkSimpleIcon,
  reading: StarIcon,
  completed: CheckCircleIcon,
};

export function BookCard({ book, size = "lg", trackingStatus }: BookCardProps) {
  const { openTrackModal } = useBookTracking();
  const dim = DIMENSIONS[size];
  const rating = 4.5; // TODO: add rating
  const StatusIcon = trackingStatus ? STATUS_ICONS[trackingStatus] : null;

  return (
    <article className={cn("flex flex-col gap-2.5 shrink-0 group mt-0 mb-auto", dim.card)}>
      {/* Cover wrapper */}
      <div
        className={cn(
          "relative rounded-xl overflow-hidden bg-muted cursor-pointer",
          "transition-all duration-300 ease-out",
          "group-hover:shadow-2xl group-hover:shadow-black/30 group-hover:-translate-y-0.5",
          dim.image,
        )}
      >
        {/* Book spine — gives 3-D depth */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-3 rounded-r-xl bg-linear-to-l from-black/40 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1 rounded-l-xl bg-linear-to-r from-white/10 to-transparent" />

        <Link to="/book/$id" params={{ id: book.id }}>
          <img
            src={book.coverImageUrl ?? "/books/book.jpg"}
            alt={`غلاف ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-background/80 via-background/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Hover info: genre + readers */}
          <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-1.5 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            {book.genres?.[0] && (
              <Badge variant="secondary">
                {BOOK_GENRES.find((g) => g.value === book.genres?.[0])?.label}
              </Badge>
            )}
          </div>
        </Link>

        {/* Rating badge — top right */}
        {rating != null && (
          <div className="absolute top-2 right-2 z-20">
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-foreground/60 dark:bg-background/60 backdrop-blur-md border-border shadow-lg">
              <StarIcon weight="fill" className="w-2.5 h-2.5 text-amber-400" />
              <span className="text-[11px] font-semibold text-background dark:text-foreground tabular-nums">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        )}

        {/* Tracking status dot — top left */}
        {trackingStatus && (
          <div
            className={cn(
              "absolute top-2 left-2 z-20 flex items-center gap-1 px-1.5 py-0.5 rounded-full border border-border backdrop-blur-md shadow-sm",
              STATUS_COLORS[trackingStatus],
            )}
            title={trackingStatus}
          >
            {StatusIcon && <StatusIcon weight="fill" className="w-2.5 h-2.5 text-white" />}
          </div>
        )}

        <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            openTrackModal(book);
          }}
          variant="default"
          size="icon"
          className={cn(
            "absolute bottom-2.5 left-2.5 z-20 rounded-full w-9 h-9 border-primary!",
            "opacity-0 translate-y-1.5 scale-90",
            "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100",
            "transition-all duration-200 ease-out",
          )}
          aria-label="إضافة إلى قائمة القراءة"
        >
          <PlusIcon weight="bold" className="w-4 h-4" />
        </Button>
      </div>

      {/* Text info */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <Link to="/book/$id" params={{ id: book.id }}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground truncate">{book.author?.name}</p>
        {book.pageCount && (
          <p className="text-[10px] text-muted-foreground/60 tabular-nums mt-0.5">
            {book.pageCount} صفحة
          </p>
        )}
      </div>
    </article>
  );
}
