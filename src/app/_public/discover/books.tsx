import { BookCard } from "@components/book/book-card";
import { BookCardDetailed } from "@components/book/book-card-detailed";
import { GenreCombobox } from "@features/books/components/genre-combobox";
import { ViewToggle } from "@features/books/components/view-toggle";
import {
  FileMagnifyingGlassIcon,
  MagnifyingGlassIcon,
  SortAscendingIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@shadcn/select";
import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";

import { BOOK_GENRES, BOOK_TOPICS, type BookGenre } from "@/db/constants/books";
import { FilterDialog, type FilterState } from "@/features/books/components/filters-dialog";
import { searchBooks } from "@/features/books/server/get-books";
import { BookListItem } from "@/ui/components/book/book-card-list";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  // { value: "rating", label: "الأعلى تقييماً" },
  { value: "title-asc", label: "العنوان أ-ي" },
  { value: "title-desc", label: "العنوان ي-أ" },
] as const;

const YEAR_MIN = 700;
const YEAR_MAX = 2026;
const PAGE_MIN = 0;
const PAGE_MAX = 5000;

const DEFAULT_FILTERS: FilterState = {
  yearRange: [YEAR_MIN, YEAR_MAX],
  pageRange: [PAGE_MIN, PAGE_MAX],
  ratingMin: 0,
  publishers: [],
  topics: [],
  readingStatus: [],
};

type BookSortOption = (typeof SORT_OPTIONS)[number]["value"];

// ---------------------------------------------------------------------------
// Schema
// ---------------------------------------------------------------------------

export const bookSearchSchema = z.object({
  q: z.string().max(100).optional(),
  author: z.string().max(100).optional(),
  genres: z.array(z.string()).optional().catch(undefined),
  sort: z.enum(["newest", "oldest", "title-asc", "title-desc"]).default("newest"),
  view: z.enum(["grid", "detailed", "list"]).default("grid"),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  minPages: z.number().optional(),
  maxPages: z.number().optional(),
  ratingMin: z.number().optional(),
  publishers: z.array(z.string()).optional().catch(undefined),
  topics: z.array(z.string()).optional().catch(undefined),
  readingStatus: z.array(z.string()).optional().catch(undefined),
  page: z.number().int().min(1).default(1),
});

export type BookSearch = z.infer<typeof bookSearchSchema>;

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/_public/discover/books")({
  validateSearch: bookSearchSchema,
  component: BooksSearchPage,
  loaderDeps: ({ search: { view: _view, ...rest } }) => rest,
  loader: ({ deps }) => searchBooks({ data: deps }),
});

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

// function getTagLabel(value: string) {
//   return BOOK_TOPICS.find((topic) => topic.value === value)?.label ?? value;
// }

function getStatusLabel(value: string) {
  return (
    {
      Unread: "غير مقروء",
      Reading: "يُقرأ الآن",
      Completed: "مكتمل",
      "On Hold": "متوقف",
      did_not_finish: "متروك",
    }[value] ?? value
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

function BooksSearchPage() {
  const loaderData = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const isNavigating = useRouterState({ select: (s) => s.isLoading });

  const [books, setBooks] = React.useState(loaderData.books);
  const newItemsRef = React.useRef<HTMLDivElement | null>(null);
  const [lastAddedIndex, setLastAddedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (search.page === 1 || search.page === undefined) {
      setBooks(loaderData.books);
      setLastAddedIndex(null);
      return;
    }
    setBooks((prev) => {
      const seen = new Set(prev.map((b) => b.id));
      const incoming = loaderData.books.filter((b) => !seen.has(b.id));
      if (incoming.length > 0) setLastAddedIndex(prev.length);
      return [...prev, ...incoming];
    });
  }, [loaderData.books, search.page]);

  React.useEffect(() => {
    if (lastAddedIndex !== null && newItemsRef.current) {
      newItemsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [lastAddedIndex]);

  const setParams = React.useCallback(
    (updater: (prev: BookSearch) => Partial<BookSearch>) => {
      navigate({
        search: (prev) => ({
          ...prev,
          ...updater(prev as BookSearch),
          page: 1,
        }),
        replace: true,
      });
    },
    [navigate],
  );

  const loadMore = React.useCallback(() => {
    navigate({
      search: (prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }),
      replace: true,
    });
  }, [navigate]);

  // Local input state with debounce
  const [qInput, setQInput] = React.useState(search.q ?? "");
  const debouncedQ = useDebounce(qInput, 350);

  React.useEffect(() => {
    setParams(() => ({ q: debouncedQ || undefined }));
  }, [debouncedQ]);

  // Sync input if URL changes externally (e.g. back button)
  React.useEffect(() => {
    setQInput(search.q ?? "");
  }, [search.q]);

  const selectedGenres = React.useMemo(
    () => BOOK_GENRES.filter((g) => search.genres?.includes(g.value)),
    [search.genres],
  );

  const filters: FilterState = React.useMemo(
    () => ({
      ...DEFAULT_FILTERS,
      yearRange: [search.minYear ?? YEAR_MIN, search.maxYear ?? YEAR_MAX],
      pageRange: [search.minPages ?? PAGE_MIN, search.maxPages ?? PAGE_MAX],
      ratingMin: search.ratingMin ?? 0,
      publishers: search.publishers ?? [],
      topics: search.topics ?? [],
      readingStatus: search.readingStatus ?? [],
    }),
    [
      search.maxPages,
      search.maxYear,
      search.minPages,
      search.minYear,
      search.publishers,
      search.ratingMin,
      search.readingStatus,
      search.topics,
    ],
  );

  const handleFiltersChange = React.useCallback(
    (next: FilterState) => {
      setParams(() => ({
        minYear: next.yearRange[0] !== YEAR_MIN ? next.yearRange[0] : undefined,
        maxYear: next.yearRange[1] !== YEAR_MAX ? next.yearRange[1] : undefined,
        minPages: next.pageRange[0] !== PAGE_MIN ? next.pageRange[0] : undefined,
        maxPages: next.pageRange[1] !== PAGE_MAX ? next.pageRange[1] : undefined,
        ratingMin: next.ratingMin > 0 ? next.ratingMin : undefined,
        publishers: next.publishers.length > 0 ? next.publishers : undefined,
        topics: next.topics.length > 0 ? next.topics : undefined,
        readingStatus: next.readingStatus.length > 0 ? next.readingStatus : undefined,
      }));
    },
    [setParams],
  );

  const handleResetFilters = React.useCallback(() => {
    setParams(() => ({
      minYear: undefined,
      maxYear: undefined,
      minPages: undefined,
      maxPages: undefined,
      ratingMin: undefined,
      publishers: undefined,
      topics: undefined,
      readingStatus: undefined,
    }));
  }, [setParams]);

  const activeFilterTags = React.useMemo(() => {
    const tags: { key: string; label: string; onRemove: () => void }[] = [];

    if (search.minYear !== undefined || search.maxYear !== undefined)
      tags.push({
        key: "year",
        label: `${search.minYear ?? "؟"} — ${search.maxYear ?? "؟"}`,
        onRemove: () => setParams(() => ({ minYear: undefined, maxYear: undefined })),
      });

    if (search.minPages !== undefined || search.maxPages !== undefined)
      tags.push({
        key: "pages",
        label: `${search.minPages ?? "؟"} — ${search.maxPages ?? "؟"} صفحة`,
        onRemove: () => setParams(() => ({ minPages: undefined, maxPages: undefined })),
      });

    if ((search.ratingMin ?? 0) > 0)
      tags.push({
        key: "rating",
        label: `${search.ratingMin}+ نجوم`,
        onRemove: () => setParams(() => ({ ratingMin: undefined })),
      });

    search.genres?.forEach((value) => {
      const genre = BOOK_GENRES.find((g) => g.value === value);
      if (!genre) return;
      tags.push({
        key: `genre-${value}`,
        label: genre.label,
        onRemove: () =>
          setParams((prev) => ({
            genres: prev.genres?.filter((g) => g !== value),
          })),
      });
    });

    // search.publishers?.forEach((value) =>
    //   tags.push({
    //     key: `pub-${value}`,
    //     label: value,
    //     onRemove: () =>
    //       setParams((prev) => ({ publishers: prev.publishers?.filter((p) => p !== value) })),
    //   }),
    // );

    search.topics?.forEach((value) => {
      const topic = BOOK_TOPICS.find((t) => t.value === value);
      tags.push({
        key: `topic-${value}`,
        label: topic?.label ?? value,
        onRemove: () =>
          setParams((prev) => ({
            topics: prev.topics?.filter((t) => t !== value),
          })),
      });
    });

    search.readingStatus?.map((value) =>
      tags.push({
        key: `status-${value}`,
        label: getStatusLabel(value),
        onRemove: () =>
          setParams((prev) => ({
            readingStatus: prev.readingStatus?.filter((s) => s !== value),
          })),
      }),
    );

    return tags;
  }, [search, setParams]);

  const hasActiveFilters = activeFilterTags.length > 0;

  const clearAllFilters = React.useCallback(
    () => navigate({ search: (prev) => ({ view: prev.view, sort: prev.sort }) }),
    [navigate],
  );

  const viewConfig = {
    grid: {
      wrapper:
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6",
      Component: BookCard,
    },
    detailed: {
      wrapper: "grid grid-cols-1 lg:grid-cols-2 gap-4",
      Component: BookCardDetailed,
    },
    list: {
      wrapper: "divide-y divide-border/50",
      Component: BookListItem,
    },
  } as const;

  const currentView = viewConfig[search.view] ?? viewConfig.grid;
  const Component = currentView.Component;
  const isSearching = isNavigating && search.page === 1;

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      {/* ── Sticky filter bar ──────────────────────────────── */}
      <div className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky! top-0 z-30 border-b backdrop-blur md:relative">
        <div className="container mx-auto space-y-2.5 px-0 py-3">
          {/* Search input */}
          <div className="relative px-4">
            <MagnifyingGlassIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 mr-4 size-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="ابحث عن كتاب أو مؤلف..."
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              className="h-10 pr-9 text-sm"
              autoComplete="off"
              autoCorrect="off"
            />
            {/* Loading spinner while debouncing */}
            {isSearching ? (
              <div className="absolute top-1/2 left-3 ml-4 -translate-y-1/2">
                <div className="border-muted-foreground/30 border-t-muted-foreground size-4 animate-spin rounded-full border-2" />
              </div>
            ) : qInput ? (
              <button
                type="button"
                onClick={() => {
                  setQInput("");
                  setParams(() => ({ q: undefined }));
                }}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 left-3 ml-4 -translate-y-1/2 transition-colors"
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </div>

          {/* Filter row */}
          <div className="scrollbar-none flex items-center gap-2 overflow-visible! overflow-x-auto px-4">
            <GenreCombobox
              selected={selectedGenres}
              onSelectionChange={(newGenres: BookGenre[]) =>
                setParams(() => ({ genres: newGenres.map((g) => g.value) }))
              }
            />

            {/* FilterDialog with badge count */}
            <div className="relative shrink-0">
              <FilterDialog
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </div>

            <div className="bg-border h-5 w-px shrink-0" />

            <Select
              value={search.sort}
              onValueChange={(v) => setParams(() => ({ sort: v as BookSortOption }))}
            >
              <SelectTrigger className="text-muted-foreground h-8 w-auto shrink-0 gap-1.5 border-dashed text-xs">
                <SortAscendingIcon className="size-3.5 shrink-0" />
                <span className="hidden sm:inline">
                  {SORT_OPTIONS.find((o) => o.value === search.sort)?.label}
                </span>
                <span className="sm:hidden">ترتيب</span>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <ViewToggle value={search.view} onValueChange={(v) => setParams(() => ({ view: v }))} />
          </div>

          {/* Active filter tags */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5">
              {activeFilterTags.map((tag) => (
                <Badge
                  key={tag.key}
                  variant="secondary"
                  onClick={tag.onRemove}
                  className="bg-primary/10 text-primary hover:bg-destructive/10 hover:text-destructive h-6 cursor-pointer gap-1 pl-1 text-xs font-normal transition-colors"
                >
                  {tag.label}
                  <XIcon className="size-3 opacity-60" />
                </Badge>
              ))}
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-destructive text-xs transition-colors"
              >
                مسح الكل
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Results ──────────────────────────────────────────── */}
      <main className="container mx-auto px-4 py-5">
        {/* Count */}
        {books.length > 0 && (
          <p className="text-muted-foreground mb-4 text-sm">
            <span className="text-foreground font-medium">{loaderData.total}</span>
            {" كتاب"}
            {hasActiveFilters && <span className="text-muted-foreground/60"> · بتصفية نشطة</span>}
          </p>
        )}

        {/* Empty state */}
        {books.length === 0 && !isSearching ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-muted mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
              <MagnifyingGlassIcon className="text-muted-foreground/40 size-7" />
            </div>
            <h3 className="mb-1.5 text-base font-semibold">
              {qInput ? `لا نتائج لـ "${qInput}"` : "لا توجد كتب"}
            </h3>
            <p className="text-muted-foreground mb-5 max-w-xs text-sm leading-relaxed">
              {qInput
                ? "جرّب كلمات مختلفة، أو قلّل من التصفيات"
                : "جرّب تعديل التصفيات للعثور على ما تبحث عنه"}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearAllFilters}>
                مسح التصفيات
              </Button>
            )}
          </div>
        ) : search.view === "list" ? (
          <div className="bg-card overflow-visible rounded-xl border">
            <div className="text-muted-foreground bg-muted/40 hidden items-center gap-4 border-b px-4 py-2.5 text-xs font-medium sm:flex">
              <div className="w-10 shrink-0" />
              <div className="flex-1">العنوان</div>
              <div className="hidden w-36 md:block">التصنيفات</div>
              <div className="hidden w-12 text-center sm:block">السنة</div>
              <div className="w-14 text-center">التقييم</div>
              <div className="w-8 shrink-0" />
            </div>
            <div className={currentView.wrapper}>
              {books.map((book, i) => (
                <div key={book.id} ref={i === lastAddedIndex ? newItemsRef : null}>
                  <Component book={book} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={currentView.wrapper}>
            {books.map((book, i) => (
              <div key={book.id} ref={i === lastAddedIndex ? newItemsRef : null}>
                <Component book={book} />
              </div>
            ))}
          </div>
        )}

        {/* Load more */}
        <div className="mt-10 flex flex-col items-center gap-2">
          {loaderData.hasMore ? (
            <>
              <Button
                variant="outline"
                className="w-full max-w-xs"
                onClick={loadMore}
                disabled={isNavigating}
              >
                {isNavigating && search.page > 1 ? (
                  <div className="border-muted-foreground/30 border-t-muted-foreground size-4 animate-spin rounded-full border-2" />
                ) : (
                  <FileMagnifyingGlassIcon className="size-4" />
                )}
                تحميل المزيد
              </Button>
              <p className="text-muted-foreground text-xs">
                {books.length} من {loaderData.total} كتاب
              </p>
            </>
          ) : books.length > 0 ? (
            <p className="text-muted-foreground py-2 text-sm">
              وصلت لنهاية النتائج · {loaderData.total} كتاب
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
