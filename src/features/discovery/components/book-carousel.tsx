import { Button } from "@components/ui/button";
import { BookCard } from "@features/books/components/book-card";
import {
  ArrowLeftIcon,
  CaretLeftIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import { BookWithAuthor } from "@db/tables";

interface BookCarouselProps {
  title: string;
  subtitle?: string;
  books?: BookWithAuthor[];
  accentColor?: string;
  viewAllHref?: string;
}

export function BookCarousel({
  title,
  subtitle,
  books,
  accentColor,
  viewAllHref = "#",
}: BookCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    // In RTL, scrollLeft is negative in some browsers; use Math.abs for safety
    const scrollLeft = Math.abs(el.scrollLeft);
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  // In RTL layout, "next" items are to the left in the DOM
  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({
      left: dir === "next" ? -amount : amount,
      behavior: "smooth",
    });
    setTimeout(checkScroll, 350);
  };

  // TODO: Make this
  if (!books) {
    return <div>TEHRE IS NO BOOKS FOUND</div>;
  }

  return (
    <section dir="rtl" className="flex flex-col gap-6">
      {/* Header row */}
      <div className="flex items-end justify-between px-6 lg:px-12 container mx-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {accentColor && (
              <span
                className="w-1 h-5 rounded-full shrink-0"
                style={{ backgroundColor: accentColor }}
                aria-hidden="true"
              />
            )}
            <h2
              className="text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Prev (→ in RTL = right arrow visually) */}
          <Button
            size="icon"
            variant="outline"
            className={cn(
              "h-8 w-8 rounded-full transition-opacity",
              !canScrollLeft && "opacity-30 cursor-not-allowed",
            )}
            onClick={() => scroll("prev")}
            disabled={!canScrollLeft}
            aria-label="السابق"
          >
            <CaretRightIcon className="w-4 h-4" />
          </Button>

          {/* Next (← in RTL = left arrow visually) */}
          <Button
            size="icon"
            variant="outline"
            className={cn(
              "h-8 w-8 rounded-full transition-opacity",
              !canScrollRight && "opacity-30 cursor-not-allowed",
            )}
            onClick={() => scroll("next")}
            disabled={!canScrollRight}
            aria-label="التالي"
          >
            <CaretLeftIcon className="w-4 h-4" />
          </Button>

          <Link
            to={viewAllHref}
            className="group hidden sm:flex items-center gap-1 text-sm font-medium me-2 transition-colors hover:opacity-80"
            style={{ color: accentColor ?? "hsl(var(--primary))" }}
          >
            عرض الكل
            {/* Arrow points left (back) in RTL = "forward" */}
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Scrollable track */}
      <div className="relative">
        {/* Right fade (start of list in RTL) */}
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-10 transition-opacity duration-200",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        {/* Left fade (end of list in RTL) */}
        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-10 transition-opacity duration-200",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
          style={{
            background:
              "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        <ul
          ref={scrollRef}
          onScroll={checkScroll}
          className="list-none m-0 p-0 flex gap-5 overflow-x-auto pb-4 px-6 lg:px-12 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
          aria-label={`قائمة كتب ${title}`}
        >
          {books.map((book) => (
            <li key={book.id} className="shrink-0 pt-1">
              <BookCard book={book} size="md" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
