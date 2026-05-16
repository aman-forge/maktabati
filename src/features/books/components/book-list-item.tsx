"use client";

import { PlusIcon, StarIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { useState } from "react";

import { BOOK_GENRES } from "@/db/constants/books";
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
          <div className="bg-muted h-14 w-10 shrink-0 overflow-hidden rounded shadow-sm">
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`Cover of ${book.title}`}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Title & Author */}
          <div className="min-w-0 flex-1">
            <h3 className="text-foreground group-hover:text-primary truncate text-sm leading-tight font-medium transition-colors">
              {book.title}
            </h3>
            <p className="text-muted-foreground mt-0.5 truncate text-xs">{book.author?.name}</p>
          </div>

          {/* Genres - hidden on mobile */}
          <div className="hidden w-36 shrink-0 items-center gap-1.5 md:flex">
            {book.genres?.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="bg-secondary/50 px-2 py-0.5 text-[10px] font-normal"
              >
                {BOOK_GENRES.filter((g) => g.value === genre).at(0)?.label}
              </Badge>
            ))}
          </div>

          {/* Year */}
          <div className="text-muted-foreground hidden w-12 shrink-0 text-center text-xs sm:block">
            {book.publicationYear}
          </div>

          {/* Rating */}
          <div className="flex w-14 shrink-0 items-center justify-center gap-1">
            {rating && (
              <>
                <StarIcon weight="fill" className="h-3 w-3 text-amber-400" />
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
            <PlusIcon weight="bold" className="h-3.5 w-3.5" />
          </Button>
        </div>
      </article>
      <TrackBookModal book={book} open={isTracking} onOpenChange={setIsTracking} />
    </>
  );
}
