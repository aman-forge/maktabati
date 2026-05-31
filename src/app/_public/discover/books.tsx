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
import { Skeleton } from "@shadcn/skeleton";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useRouterState } from "@tanstack/react-router";
import * as React from "react";

import { useUser } from "@/features/auth/use-user";
import { FilterDialog, type FilterState } from "@/features/books/components/filters-dialog";
import { BOOK_GENRES, BOOK_TOPICS, type BookGenre } from "@/features/books/constants";
import { bookSearchSchema, type BookSearch } from "@/features/books/lib/validators";
import { searchBooks } from "@/features/books/server/get-books";
import { getPublisherOptions } from "@/features/books/server/publishers";
import { BookListItem } from "@/ui/components/book/book-card-list";
import { cn } from "@/ui/lib/utils";

const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "title-asc", label: "العنوان أ-ي" },
  { value: "title-desc", label: "العنوان ي-أ" },
] as const;

const YEAR_MIN = 700;
const YEAR_MAX = 2026;
const PAGE_MIN = 0;
const PAGE_MAX = 1000;

const DEFAULT_FILTERS: FilterState = {
  yearRange: [YEAR_MIN, YEAR_MAX],
  pageRange: [PAGE_MIN, PAGE_MAX],
  ratingMin: 0,
  publishers: [],
  topics: [],
  readingStatus: [],
};

const DISCOVER_BOOKS_STALE_TIME = 60_000;

type BookSortOption = (typeof SORT_OPTIONS)[number]["value"];

export const Route = createFileRoute("/_public/discover/books")({
  validateSearch: bookSearchSchema,
  component: BooksSearchPage,
  pendingComponent: BooksSearchPageSkeleton,
  pendingMs: 300,
  pendingMinMs: 0,
  staleTime: DISCOVER_BOOKS_STALE_TIME,
  loaderDeps: ({ search: { view: _view, ...rest } }) => rest,
  loader: async ({ deps }) => {
    const [result, publisherOptions] = await Promise.all([
      searchBooks({ data: deps }),
      getPublisherOptions(),
    ]);

    return { result, publisherOptions };
  },
});

function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

function getStatusLabel(value: string) {
  return (
    {
      want_to_read: "أخطط لقراءته",
      currently_reading: "قيد القراءة",
      completed: "مكتمل",
      on_hold: "متوقف",
      dropped: "متروك",
    }[value] ?? value
  );
}

type BooksView = NonNullable<BookSearch["view"]>;

function FilterBarSkeleton() {
  return (
    <div className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky! top-0 z-30 border-b backdrop-blur md:relative">
      <div className="mx-auto max-w-7xl space-y-2.5 py-3 md:px-4">
        <div className="px-4 md:px-0">
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
        <div className="flex items-center gap-2 overflow-hidden px-4 md:px-0">
          <Skeleton className="h-8 w-28 shrink-0 rounded-xl" />
          <Skeleton className="h-8 w-24 shrink-0 rounded-xl" />
          <Skeleton className="h-5 w-px shrink-0 rounded-none" />
          <Skeleton className="h-8 w-24 shrink-0 rounded-xl" />
          <div className="flex-1" />
          <Skeleton className="h-8 w-20 shrink-0 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function BookGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 justify-items-center gap-x-3 gap-y-6 min-[520px]:grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] 2lg:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]",
        "[&>div]:w-full [&>div]:max-w-40 lg:[&>div]:max-w-44 2lg:[&>div]:max-w-48",
      )}
    >
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-2.5">
          <Skeleton className="aspect-2/3 w-full rounded-xl" />
          <Skeleton className="h-4 w-4/5 rounded-md" />
          <Skeleton className="h-3.5 w-3/5 rounded-md" />
        </div>
      ))}
    </div>
  );
}

function BookDetailedSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="bg-card flex min-h-48 rounded-2xl border">
          <Skeleton className="aspect-2/3 h-auto w-28 shrink-0 rounded-r-2xl" />
          <div className="flex flex-1 flex-col gap-3 p-4">
            <Skeleton className="h-5 w-4/5 rounded-md" />
            <Skeleton className="h-4 w-2/5 rounded-md" />
            <Skeleton className="h-16 w-full rounded-lg" />
            <div className="mt-auto flex gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function BookListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="bg-card overflow-visible rounded-xl border">
      <div className="bg-muted/40 hidden items-center gap-4 border-b px-4 py-2.5 sm:flex">
        <Skeleton className="h-4 w-10 rounded-md" />
        <Skeleton className="h-4 flex-1 rounded-md" />
        <Skeleton className="hidden h-4 w-36 rounded-md md:block" />
        <Skeleton className="hidden h-4 w-12 rounded-md sm:block" />
        <Skeleton className="h-4 w-14 rounded-md" />
      </div>
      <div className="flex flex-col gap-2 p-2">
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="bg-card/45 flex items-center gap-3 rounded-xl px-3 py-3">
            <Skeleton className="h-16 w-10 shrink-0 rounded-md" />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-2/3 rounded-md" />
              <Skeleton className="h-3.5 w-1/3 rounded-md" />
              <div className="flex gap-1.5">
                <Skeleton className="h-5 w-12 rounded-md" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
            </div>
            <Skeleton className="hidden h-7 w-14 rounded-full sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}

function BookResultsSkeleton({ view = "grid" }: { view?: BooksView }) {
  if (view === "list") return <BookListSkeleton />;
  if (view === "detailed") return <BookDetailedSkeleton />;
  return <BookGridSkeleton />;
}

function BooksSearchPageSkeleton() {
  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <FilterBarSkeleton />
      <main className="mx-auto max-w-360 px-4 py-5">
        <Skeleton className="mb-4 h-5 w-36 rounded-md" />
        <BookResultsSkeleton />
      </main>
    </div>
  );
}

function BooksSearchPage() {
  const { result: loaderData, publisherOptions } = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const isNavigating = useRouterState({ select: (s) => s.isLoading });
  const { user } = useUser();

  const userScopedSearch = React.useMemo(() => {
    const { view: _view, ...rest } = search;
    return rest;
  }, [search]);
  const searchSignature = React.useMemo(() => JSON.stringify(userScopedSearch), [userScopedSearch]);

  const userResultsQuery = useQuery({
    queryKey: ["discover-books", user?.id, userScopedSearch],
    queryFn: () => searchBooks({ data: userScopedSearch }),
    enabled: !!user?.id,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: DISCOVER_BOOKS_STALE_TIME,
  });

  const resultData = user?.id ? (userResultsQuery.data ?? loaderData) : loaderData;

  const [books, setBooks] = React.useState(resultData.books);
  const [loadedSearchSignature, setLoadedSearchSignature] = React.useState(searchSignature);
  const newItemsRef = React.useRef<HTMLDivElement | null>(null);
  const [lastAddedIndex, setLastAddedIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (search.page === 1 || search.page === undefined) {
      setBooks(resultData.books);
      setLastAddedIndex(null);
      return;
    }
    setBooks((prev) => {
      const seen = new Set(prev.map((b) => b.id));
      const incoming = resultData.books.filter((b) => !seen.has(b.id));
      if (incoming.length > 0) setLastAddedIndex(prev.length);
      return [...prev, ...incoming];
    });
  }, [resultData.books, search.page]);

  React.useEffect(() => {
    if (!isNavigating && !userResultsQuery.isFetching) {
      setLoadedSearchSignature(searchSignature);
    }
  }, [isNavigating, searchSignature, userResultsQuery.isFetching]);

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

  const setView = React.useCallback(
    (view: BooksView) => {
      navigate({
        search: (prev) => ({ ...prev, view }),
        replace: true,
      });
    },
    [navigate],
  );

  const [qInput, setQInput] = React.useState(search.q ?? "");
  const debouncedQ = useDebounce(qInput, 350);

  React.useEffect(() => {
    if ((search.q ?? "") === debouncedQ) return;

    setParams(() => ({ q: debouncedQ || undefined }));
  }, [debouncedQ, search.q, setParams]);

  React.useEffect(() => {
    setQInput(search.q ?? "");
  }, [search.q]);

  const selectedGenres = React.useMemo(
    () => BOOK_GENRES.filter((g) => search.genres?.includes(g.value)),
    [search.genres],
  );
  const publisherLabels = React.useMemo(
    () => new Map(publisherOptions.map((publisher) => [publisher.id, publisher.name])),
    [publisherOptions],
  );

  const filters: FilterState = React.useMemo(
    () => ({
      ...DEFAULT_FILTERS,
      yearRange: [search.minYear ?? YEAR_MIN, search.maxYear ?? YEAR_MAX],
      pageRange: [search.minPages ?? PAGE_MIN, search.maxPages ?? PAGE_MAX],
      ratingMin: search.ratingMin ?? 0,
      publishers: search.publishers ?? [],
      topics: search.topics ?? [],
      readingStatus: user?.id ? (search.readingStatus ?? []) : [],
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
      user?.id,
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
        readingStatus: user?.id && next.readingStatus.length > 0 ? next.readingStatus : undefined,
      }));
    },
    [setParams, user?.id],
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
        label: `${search.minYear ?? YEAR_MIN} — ${search.maxYear ?? YEAR_MAX}`,
        onRemove: () => setParams(() => ({ minYear: undefined, maxYear: undefined })),
      });

    if (search.minPages !== undefined || search.maxPages !== undefined)
      tags.push({
        key: "pages",
        label: `${search.minPages ?? PAGE_MIN} — ${search.maxPages ?? PAGE_MAX} صفحة`,
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

    search.publishers?.forEach((value) =>
      tags.push({
        key: `pub-${value}`,
        label: publisherLabels.get(value) ?? value,
        onRemove: () =>
          setParams((prev) => ({ publishers: prev.publishers?.filter((p) => p !== value) })),
      }),
    );

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

    if (user?.id) {
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
    }

    return tags;
  }, [publisherLabels, search, setParams, user?.id]);

  const hasActiveFilters = activeFilterTags.length > 0;

  const clearAllFilters = React.useCallback(
    () => navigate({ search: (prev) => ({ view: prev.view, sort: prev.sort }) }),
    [navigate],
  );

  const viewConfig = {
    grid: {
      wrapper: cn(
        "grid grid-cols-2 justify-items-center gap-x-3 gap-y-6 min-[520px]:grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] 2lg:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]",
        "[&>article]:w-full! [&>article]:max-w-40 lg:[&>article]:max-w-44 2lg:[&>article]:max-w-48",
        "[&>article>div:first-child]:h-auto! [&>article>div:first-child]:aspect-2/3",
      ),
      Component: BookCard,
    },
    detailed: {
      wrapper: "grid grid-cols-1 lg:grid-cols-2 gap-4",
      Component: BookCardDetailed,
    },
    list: {
      wrapper: "p-2 flex flex-col gap-2",
      Component: BookListItem,
    },
  } as const;

  const currentView = viewConfig[search.view] ?? viewConfig.grid;
  const Component = currentView.Component;
  const hasPendingSearchChange = searchSignature !== loadedSearchSignature;
  const isSearching = isNavigating && hasPendingSearchChange && search.page === 1;
  const isLoadingMore = isNavigating && hasPendingSearchChange && search.page > 1;

  return (
    <div className="bg-background min-h-screen overflow-x-hidden">
      <div className="bg-background/95 supports-backdrop-filter:bg-background/80 sticky! top-0 z-30 border-b backdrop-blur md:relative">
        <div className="mx-auto max-w-7xl space-y-2.5 py-3 md:px-4">
          <div className="relative px-4 md:px-0">
            <MagnifyingGlassIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 mr-4 size-4 -translate-y-1/2 md:mr-0" />
            <Input
              type="search"
              placeholder="ابحث عن كتاب أو مؤلف..."
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              className="h-10 pr-10 text-sm"
              autoComplete="off"
              autoCorrect="off"
            />
            {isSearching ? (
              <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <div className="border-muted-foreground/30 border-t-muted-foreground ml-4 size-4 animate-spin rounded-full border-2 md:ml-0" />
              </div>
            ) : qInput ? (
              <button
                type="button"
                onClick={() => {
                  setQInput("");
                  setParams(() => ({ q: undefined }));
                }}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 left-3 ml-4 -translate-y-1/2 transition-colors md:ml-0"
              >
                <XIcon className="size-4" />
              </button>
            ) : null}
          </div>

          <div
            className={cn("flex scrollbar-none items-center overflow-x-scroll gap-2 px-4 md:px-0")}
          >
            <GenreCombobox
              selected={selectedGenres}
              onSelectionChange={(newGenres: BookGenre[]) =>
                setParams(() => ({ genres: newGenres.map((g) => g.value) }))
              }
            />

            <div className="relative shrink-0">
              <FilterDialog
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
                publisherOptions={publisherOptions}
                showReadingStatus={!!user?.id}
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

            <ViewToggle value={search.view} onValueChange={setView} />
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5 px-4 md:px-0">
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

      <main className="mx-auto max-w-360 px-4 py-5">
        {isSearching ? (
          <>
            <Skeleton className="mb-4 h-5 w-36 rounded-md" />
            <BookResultsSkeleton view={search.view} />
          </>
        ) : books.length > 0 ? (
          <p className="text-muted-foreground mb-4 text-sm">
            <span className="text-foreground font-medium">{resultData.total}</span>
            {" كتاب"}
            {hasActiveFilters && <span className="text-muted-foreground/60"> · بتصفية نشطة</span>}
          </p>
        ) : null}

        {!isSearching && books.length === 0 ? (
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
        ) : !isSearching && search.view === "list" ? (
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
        ) : !isSearching ? (
          <div className={currentView.wrapper}>
            {books.map((book) => (
              <Component key={book.id} book={book} />
            ))}
          </div>
        ) : null}

        {!isSearching && (
          <div className="mt-10 flex flex-col items-center gap-2">
            {resultData.hasMore ? (
              <>
                <Button
                  variant="outline"
                  className="w-full max-w-xs"
                  onClick={loadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <div className="border-muted-foreground/30 border-t-muted-foreground size-4 animate-spin rounded-full border-2" />
                  ) : (
                    <FileMagnifyingGlassIcon className="size-4" />
                  )}
                  تحميل المزيد
                </Button>
                <p className="text-muted-foreground text-xs">
                  {books.length} من {resultData.total} كتاب
                </p>
              </>
            ) : books.length > 0 ? (
              <p className="text-muted-foreground py-2 text-sm">
                وصلت لنهاية النتائج · {resultData.total} كتاب
              </p>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
