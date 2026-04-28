"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { useState } from "react";
import type { BookWithAuthor } from "@/db/tables";
import { cn } from "@/ui/lib/utils";
import { TrackBookModal } from "./track-book-modal";

interface BookCardDetailedProps {
  book: BookWithAuthor;
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
          <div className="relative w-40 rounded-lg overflow-hidden shrink-0 bg-muted">
            <img
              src={book.coverImageUrl ?? "/books/book.jpg"}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-contain rounded-lg overflow-hidden"
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
            <PlusIcon weight="bold" className="w-3.5 h-3.5" />
          </Button>
          {/* Content */}
          <div className="flex-1 flex flex-col min-w-0 pt-4 pl-4 pr-0!">
            {/* Title and Rating */}
            <div className="flex items-start justify-between gap-3 mb-1.5">
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                  {book.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5">{book.author?.name}</p>
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
              <p className="text-xs text-muted-foreground text-justify line-clamp-2 leading-relaxed flex-1">
                {book.description}
              </p>
            )}

            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-auto py-2">
              {/* Genres */}
              {book.genres && book.genres.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {book.genres.slice(0, 3).map((genre) => (
                    <Badge
                      key={genre}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 font-medium bg-secondary/50"
                    >
                      {genre}
                    </Badge>
                  ))}
                  {book.genres.length > 3 && (
                    <Badge
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 font-normal border-dashed"
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
