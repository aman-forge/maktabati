import { BookCard } from "@features/books/components/book-card";
import { BookCardDetailed } from "@features/books/components/book-card-detailed";
import { BookListItem } from "@features/books/components/book-list-item";
import { GenreCombobox } from "@features/books/components/genre-combobox";
import { ViewToggle } from "@features/books/components/view-toggle";
import {
  FileMagnifyingGlassIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  SortAscendingIcon,
  UserIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@shadcn/select";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { z } from "zod";
import { BOOK_GENRES, BOOK_TOPICS, type BookGenre } from "@/db/constants/books";
import type { BookWithAuthor } from "@/db/tables";
import { FilterDialog, type FilterState } from "@/features/books/components/filters-dialog";
import { searchBooks } from "@/features/books/server/get-books";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
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

export const Route = createFileRoute("/_main/discover/books")({
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

function getTagLabel(value: string) {
  return BOOK_TOPICS.find((topic) => topic.value === value)?.label ?? value;
}

function getStatusLabel(value: string) {
  return (
    {
      Unread: "غير مقروء",
      Reading: "يُقرأ الآن",
      Completed: "مكتمل",
      "On Hold": "متوقف",
      Dropped: "متروك",
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

  const [books, setBooks] = React.useState<BookWithAuthor[]>(loaderData.books);

  const newItemsRef = React.useRef<HTMLDivElement | null>(null);
  const [lastAddedIndex, setLastAddedIndex] = React.useState<number | null>(null);

  // Keep local books list in sync with server results
  React.useEffect(() => {
    if (search.page === 1 || search.page === undefined) {
      setBooks(loaderData.books);
      setLastAddedIndex(null);
      return;
    }

    setBooks((prev) => {
      const existingIds = new Set(prev.map((book) => book.id));
      const newBooks = loaderData.books.filter((book) => !existingIds.has(book.id));

      if (newBooks.length > 0) {
        setLastAddedIndex(prev.length);
      }

      return [...prev, ...newBooks];
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
      search: (prev) => ({
        ...prev,
        page: (prev.page ?? 1) + 1,
      }),
      replace: true,
    });
  }, [navigate]);

  const [qInput, setQInput] = React.useState(search.q ?? "");
  const [authorInput, setAuthorInput] = React.useState(search.author ?? "");

  const debouncedQ = useDebounce(qInput, 300);
  const debouncedAuthor = useDebounce(authorInput, 300);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setParams is stable
  React.useEffect(() => {
    setParams(() => ({ q: debouncedQ || undefined }));
  }, [debouncedQ]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: setParams is stable
  React.useEffect(() => {
    setParams(() => ({ author: debouncedAuthor || undefined }));
  }, [debouncedAuthor]);

  const selectedGenres = React.useMemo(
    () => BOOK_GENRES.filter((genre) => search.genres?.includes(genre.value)),
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

    if (search.q) {
      tags.push({
        key: "q",
        label: `العنوان: "${search.q}"`,
        onRemove: () => setParams(() => ({ q: undefined })),
      });
    }

    if (search.author) {
      tags.push({
        key: "author",
        label: `المؤلف: "${search.author}"`,
        onRemove: () => setParams(() => ({ author: undefined })),
      });
    }

    if (search.minYear !== undefined || search.maxYear !== undefined) {
      tags.push({
        key: "year",
        label: `السنة: ${search.minYear ?? "؟"} - ${search.maxYear ?? "؟"}`,
        onRemove: () => setParams(() => ({ minYear: undefined, maxYear: undefined })),
      });
    }

    if (search.minPages !== undefined || search.maxPages !== undefined) {
      tags.push({
        key: "pages",
        label: `الصفحات: ${search.minPages ?? "؟"} - ${search.maxPages ?? "؟"}`,
        onRemove: () => setParams(() => ({ minPages: undefined, maxPages: undefined })),
      });
    }

    if ((search.ratingMin ?? 0) > 0) {
      tags.push({
        key: "rating",
        label: `التقييم: ${search.ratingMin}+`,
        onRemove: () => setParams(() => ({ ratingMin: undefined })),
      });
    }

    search.genres?.forEach((value) => {
      const genre = BOOK_GENRES.find((item) => item.value === value);
      if (!genre) return;

      tags.push({
        key: `genre-${genre.value}`,
        label: genre.label,
        onRemove: () =>
          setParams((prev) => ({
            genres: prev.genres?.filter((item) => item !== genre.value),
          })),
      });
    });

    search.publishers?.forEach((value) => {
      tags.push({
        key: `publisher-${value}`,
        label: value,
        onRemove: () =>
          setParams((prev) => ({
            publishers: prev.publishers?.filter((item) => item !== value),
          })),
      });
    });

    search.topics?.forEach((value) => {
      tags.push({
        key: `tag-${value}`,
        label: getTagLabel(value),
        onRemove: () =>
          setParams((prev) => ({
            topics: prev.topics?.filter((item) => item !== value),
          })),
      });
    });

    search.readingStatus?.forEach((value) => {
      tags.push({
        key: `status-${value}`,
        label: getStatusLabel(value),
        onRemove: () =>
          setParams((prev) => ({
            readingStatus: prev.readingStatus?.filter((item) => item !== value),
          })),
      });
    });

    return tags;
  }, [search, setParams]);

  const hasActiveFilters = activeFilterTags.length > 0;
  const clearAllFilters = React.useCallback(() => navigate({ search: {} }), [navigate]);

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

  const currentView = viewConfig[search.view];
  const Component = currentView.Component;

  return (
    <div className="min-h-screen bg-background my-6 gap-6 flex flex-col">
      <header className="z-40 container mx-auto w-full">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-20 max-w-xs">
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن كتاب..."
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              className="pr-9"
            />
            {qInput && (
              <button
                type="button"
                onClick={() => {
                  setQInput("");
                  setParams(() => ({ q: undefined }));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative flex-1 min-w-20 max-w-xs">
            <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن مؤلف..."
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              className="pr-9"
            />
            {authorInput && (
              <button
                type="button"
                onClick={() => {
                  setAuthorInput("");
                  setParams(() => ({ author: undefined }));
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <GenreCombobox
            selected={selectedGenres}
            onSelectionChange={(newGenres: BookGenre[]) => {
              setParams(() => ({ genres: newGenres.map((genre) => genre.value) }));
            }}
          />

          <FilterDialog
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />

          <div className="flex-1 hidden lg:block" />

          <div className="flex items-center gap-2">
            <SortAscendingIcon className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <Select
              value={search.sort}
              onValueChange={(v) => setParams(() => ({ sort: v as BookSortOption }))}
            >
              <SelectTrigger className="h-10 w-37.5 bg-muted/50 border-transparent">
                {SORT_OPTIONS.find((o) => o.value === search.sort)?.label}
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ViewToggle value={search.view} onValueChange={(v) => setParams(() => ({ view: v }))} />
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs text-muted-foreground font-medium">
              <FunnelIcon className="size-4" weight="fill" />
            </span>

            {activeFilterTags.map((tag) => (
              <Badge
                key={tag.key}
                variant="secondary"
                className="gap-1 pl-px bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                onClick={tag.onRemove}
              >
                {tag.label}
                <span className="hover:text-destructive transition-colors rounded-full hover:bg-destructive/10 p-0.5">
                  <XIcon className="h-3 w-3" />
                </span>
              </Badge>
            ))}

            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="h-6 text-xs text-muted-foreground hover:text-foreground mr-auto"
            >
              مسح الكل
            </Button>
          </div>
        )}
      </header>

      <main className="container mx-auto">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{books.length}</span>{" "}
            {books.length === 1 ? "كتاب واحد" : "كتاب"}
          </p>
        </div>

        {books.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-5">
              <MagnifyingGlassIcon className="w-10 h-10 text-muted-foreground/50" />
            </div>
            <h3 className="text-lg font-semibold mb-2">لا توجد كتب</h3>
            <p className="text-sm text-muted-foreground max-w-sm mb-6">
              حاول تعديل بحثك أو عوامل التصفية للعثور على ما تبحث عنه.
            </p>
            <Button variant="outline" onClick={clearAllFilters}>
              مسح جميع التصفيات
            </Button>
          </div>
        ) : search.view === "list" ? (
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b bg-muted/30">
              <div className="w-10" />
              <div className="flex-1">العنوان</div>
              <div className="hidden md:block w-36">التصنيفات</div>
              <div className="hidden sm:block w-12 text-center">السنة</div>
              <div className="w-14 text-center">التقييم</div>
              <div className="w-8" />
            </div>

            <div className={currentView.wrapper}>
              {books.map((book, index) => {
                const isFirstNew = index === lastAddedIndex;

                return (
                  <div key={book.id} ref={isFirstNew ? newItemsRef : null}>
                    <Component book={book} />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={currentView.wrapper}>
            {books.map((book, index) => {
              const isFirstNew = index === lastAddedIndex;

              return (
                <div key={book.id} ref={isFirstNew ? newItemsRef : null}>
                  <Component book={book} />
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6 w-full flex items-center justify-center">
          {loaderData.hasMore ? (
            <Button variant="outline" className="w-full max-w-54 mx-auto" onClick={loadMore}>
              <FileMagnifyingGlassIcon />
              المزيد من النتائج
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">لا توجد نتائج إضافية</p>
          )}
        </div>
      </main>
    </div>
  );
}
