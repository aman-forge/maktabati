"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { useState } from "react";

import { cn } from "@/ui/lib/utils";

import type { BookCardBook } from "../server/get-books";
import { TrackBookModal } from "./track-book-modal";

interface BookCardDetailedProps {
  book: BookCardBook;
}

export function BookCardDetailed({ book }: BookCardDetailedProps) {
  const [hovered, setHovered] = useState(false);
  const [isTracking, setIsTracking] = useState(false);

  return (
    <>
      <article
        className="group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "relative flex gap-4 p-0 rounded-xl h-full bg-card border border-border/50 transition-all duration-200",
            hovered && "border-primary/30 shadow-lg shadow-primary/5",
          )}
        >
          {/* Cover */}
          <div className="bg-muted relative w-40 shrink-0 overflow-hidden rounded-lg">
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`Cover of ${book.title}`}
              className="h-full w-full overflow-hidden rounded-lg object-contain"
            />
          </div>

          <Button
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsTracking(true);
            }}
            className={cn(
              "absolute bottom-2 left-2 rounded-full w-8 h-8 shadow-lg",
              "bg-primary hover:bg-primary/90 text-primary-foreground",
              "transition-all duration-200",
            )}
            aria-label="Add to reading list"
          >
            <PlusIcon weight="bold" className="h-3.5 w-3.5" />
          </Button>
          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col pt-4 pr-0! pl-4">
            {/* Title and Rating */}
            <div className="mb-1.5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-foreground group-hover:text-primary line-clamp-2 text-base leading-tight font-semibold transition-colors">
                  {book.title}
                </h3>
                <p className="text-muted-foreground mt-0.5 text-sm">{book.author?.name}</p>
              </div>
              {/*{book.rating && (
              <div className="flex items-center gap-1 shrink-0 px-2 py-1 rounded-md bg-primary/10">
                <Star weight="fill" className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-sm font-semibold text-foreground">
                  {book.rating.toFixed(1)}
                </span>
              </div>
            )}*/}
            </div>

            {/* Description */}
            {book.description && (
              <p className="text-muted-foreground line-clamp-2 flex-1 text-justify text-xs leading-relaxed">
                {book.description}
              </p>
            )}

            {/* Meta info */}
            <div className="text-muted-foreground mt-auto flex items-center gap-4 py-2 text-xs">
              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {book.genres.slice(0, 3).map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="bg-secondary/50 px-2 py-0.5 text-[10px] font-medium"
                    >
                      {genre}
                    </Badge>
                  ))}
                  {book.genres.length > 3 && (
                    <Badge
                      variant="outline"
                      className="border-dashed px-2 py-0.5 text-[10px] font-normal"
                    >
                      +{book.genres.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
      <TrackBookModal book={book} open={isTracking} onOpenChange={setIsTracking} />
    </>
  );
}
