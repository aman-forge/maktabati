import { BookCard } from "@components/book/book-card";
import { Button } from "@components/ui/button";
import { ArrowLeftIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BookCardBook } from "@/features/books/server/get-books";
import { Skeleton } from "@/ui/components/ui/skeleton";
import { cn } from "@/ui/lib/utils";

interface BookCarouselProps {
  title: string;
  subtitle?: string;
  books: BookCardBook[];
  accentColor?: string;
  viewAllHref?: string;
}

export function BookCarousel({
  title,
  subtitle,
  books,
  accentColor,
  viewAllHref,
}: BookCarouselProps) {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = Math.abs(el.scrollLeft);
    setCanScrollLeft(scrollLeft > 8);
    // Include a 1px buffer to prevent rounding errors on high DPI screens
    setCanScrollRight(scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  // Initialize scroll states safely after hydration
  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  const scroll = (dir: "prev" | "next") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({
      left: dir === "next" ? -amount : amount,
      behavior: "smooth",
    });
    // Fallback timeout in case 'scroll' event doesn't fire nicely
    setTimeout(checkScroll, 350);
  };

  if (!books?.length) {
    return null; // Better to return null than a broken UI if data is empty
  }

  return (
    <section dir="rtl" className="flex flex-col gap-6 relative group/carousel">
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
          {subtitle && <p className="text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-2">
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

          {/* Conditionally render Link to prevent Hydration crashes with '#' */}
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="hidden sm:flex items-center gap-1 text-sm font-medium me-2 transition-colors hover:opacity-80"
              style={{ color: accentColor ?? "hsl(var(--primary))" }}
            >
              عرض الكل
              <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover/carousel:-translate-x-0.5" />
            </Link>
          )}
        </div>
      </div>

      <div className="relative">
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 transition-opacity duration-300",
            canScrollLeft ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: "linear-gradient(to left, hsl(var(--background)) 0%, transparent 100%)",
          }}
        />

        <div
          className={cn(
            "pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 transition-opacity duration-300",
            canScrollRight ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: "linear-gradient(to right, hsl(var(--background)) 0%, transparent 100%)",
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

// Skeleton Component
export function BookCarouselSkeleton() {
  return (
    <section dir="rtl" className="flex flex-col gap-6">
      <div className="flex items-end justify-between px-6 lg:px-12 container mx-auto">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="flex gap-5 overflow-visible px-6 lg:px-12 container mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={`i-${_}-${i++}`} className="shrink-0 w-40 sm:w-50 h-60 sm:h-75" />
        ))}
      </div>
    </section>
  );
}
