"use client";

import { useBookTracking } from "@features/books/context/book-tracking-context";
import { PlusIcon, StarIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button, buttonVariants } from "@shadcn/button";
import { Link } from "@tanstack/react-router";
import type { BookWithAuthor } from "@/db/tables";
import { cn } from "@/ui/lib/utils";

interface BookCardProps {
  book: BookWithAuthor;
  size?: "sm" | "md" | "lg";
}

const DIMENSIONS = {
  sm: { card: "w-36", image: "h-52" },
  md: { card: "w-44", image: "h-64" },
  lg: { card: "w-52", image: "h-76" },
} as const;

export function BookCard({ book, size = "md" }: BookCardProps) {
  const { openTrackModal } = useBookTracking();
  const dim = DIMENSIONS[size];
  const rating = 4.5; // replace with book.rating when available

  return (
    <article className={cn("flex flex-col gap-2.5 shrink-0 group ", dim.card)}>
      <div
        className={cn(
          "relative rounded-xl overflow-hidden bg-muted cursor-pointer",
          "transition-all duration-300 ease-out",
          // "group-hover:-translate-y-0.5 group-hover:shadow-xl group-hover:shadow-black/20",
          dim.image,
        )}
      >
        <Link to="/profile">
          <img
            src={book.coverImageUrl ?? "/books/book.jpg"}
            alt={`Cover of ${book.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-101"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
        </Link>

        {rating != null && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <Badge className="text-[11px] px-2 py-0.5 font-semibold bg-black/60 backdrop-blur-md text-white border-0 gap-1 shadow-lg">
              <StarIcon weight="fill" className="w-3 h-3 text-amber-400" />
              {rating.toFixed(1)}
            </Badge>
          </div>
        )}

        <Button
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            openTrackModal(book);
          }}
          className={cn(
            buttonVariants({ variant: "default", size: "icon-lg" }),
            "absolute bottom-2 right-2 rounded-full w-10 h-10 shadow-none z-10 birder-0",
            "transition-all duration-200 ease-in-out",
            "opacity-0 translate-y-2 scale-90",
            "group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 backdrop-blur-2xl",
          )}
          aria-label="Add to reading list"
        >
          <PlusIcon weight="bold" className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex flex-col gap-1 px-0.5">
        <h3 className="text-sm font-medium leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors duration-200 cursor-pointer">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground truncate">
          {book.author?.name}
        </p>
      </div>
    </article>
  );
}
