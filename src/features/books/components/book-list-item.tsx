"use client";

import { PlusIcon, StarIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { useState } from "react";
import { BOOK_GENRES } from "@/db/constants/books";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/ui/lib/utils";
import type { BookCardBook } from "../server/get-books";
import { TrackBookModal } from "./track-book-modal";

interface BookListItemProps {
  book: BookCardBook;
}

export function BookListItem({ book }: BookListItemProps) {
  const [hovered, setHovered] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const rating = 4.6;

  return (
    <>
      <article
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-150",
            hovered && "bg-primary/5",
          )}
        >
          {/* Cover */}
          <div className="w-10 h-14 rounded overflow-hidden shrink-0 bg-muted shadow-sm">
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title & Author */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium leading-tight truncate text-foreground group-hover:text-primary transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {book.author?.name}
            </p>
          </div>

          {/* Genres - hidden on mobile */}
          <div className="hidden md:flex items-center gap-1.5 shrink-0 w-36">
            {book.genres?.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="text-[10px] px-2 py-0.5 font-normal bg-secondary/50"
              >
                {BOOK_GENRES.filter((g) => g.value === genre).at(0)?.label}
              </Badge>
            ))}
          </div>

          {/* Year */}
          <div className="hidden sm:block w-12 text-center text-xs text-muted-foreground shrink-0">
            {book.publicationYear}
          </div>

          {/* Rating */}
          <div className="w-14 flex items-center justify-center gap-1 shrink-0">
            {rating && (
              <>
                <StarIcon weight="fill" className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-medium">{rating.toFixed(1)}</span>
              </>
            )}
          </div>

          {/* Add button */}
          <Button
            size="icon-sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsTracking(true);
            }}
            className={cn(
              "rounded-full shrink-0 transition-all",
              "hover:bg-primary hover:text-primary-foreground",
              !hovered && "opacity-0",
            )}
            aria-label="Add to reading list"
          >
            <PlusIcon weight="bold" className="w-3.5 h-3.5" />
          </Button>
        </div>
      </article>
      <TrackBookModal
        book={book}
        open={isTracking}
        onOpenChange={setIsTracking}
      />
    </>
  );
}
