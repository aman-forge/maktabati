import { BookCard } from "@features/books/components/book-card";
import { BookCardDetailed } from "@features/books/components/book-card-detailed";
import { BookListItem } from "@features/books/components/book-list-item";
// import { FilterDialog, type FilterState } from "@features/books/components/filters-dialog";
import { GenreCombobox } from "@features/books/components/genre-combobox";
import { ViewToggle } from "@features/books/components/view-toggle";
import { MagnifyingGlassIcon, SortAscendingIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@shadcn/select";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import z from "zod";
import { BOOK_GENRES, type BookGenre } from "@/db/constants/books";
import { getBooks } from "@/features/books/server/get-books";

const SORT_OPTIONS = [
  { value: "trending", label: "رائج" },
  { value: "popular", label: "الأكثر شعبية" },
  { value: "top-rated", label: "الأعلى تقييماً" },
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "title-asc", label: "العنوان أ-ي" },
  { value: "title-desc", label: "العنوان ي-أ" },
] as const;

type BookSortOptions = (typeof SORT_OPTIONS)[number]["value"];

const bookSearchSchema = z.object({
  q: z.string().optional(),
  author: z.string().optional(),
  genres: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  sort: z
    .enum(["trending", "popular", "top-rated", "newest", "oldest", "title-asc", "title-desc"])
    .default("trending"),
  view: z.enum(["grid", "detailed", "list"]).default("grid"),
  // readingStatus: z.enum([""]).default(""),
  // Flattened Filters
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  minPages: z.number().optional(),
  maxPages: z.number().optional(),
  minRating: z.number().optional(),
});
type BookSearch = z.infer<typeof bookSearchSchema>;

export const Route = createFileRoute("/_main/search")({
  loader: () => getBooks(),
  validateSearch: bookSearchSchema,
  component: BooksSearchPage,
});

function BooksSearchPage() {
  const books = Route.useLoaderData();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const setParams = React.useCallback(
    (updater: (prev: BookSearch) => Partial<BookSearch>) => {
      navigate({
        search: (prev) => ({ ...prev, ...updater(prev as BookSearch) }),
        replace: true,
      });
    },
    [navigate],
  );

  const selectedGenres = React.useMemo(() => {
    return BOOK_GENRES.filter((g) => search?.genres?.includes(g.value));
  }, [search.genres]);

  const activeFilterTags = React.useMemo(() => {
    const tags: { key: string; label: string; onRemove: () => void }[] = [];

    if (search.q) {
      tags.push({
        key: "search",
        label: `العنوان: "${search.q}"`,
        onRemove: () => setParams(() => ({ q: undefined })),
      });
    }

    if (search.author) {
      tags.push({
        key: "search",
        label: `المؤلف: "${search.author}"`,
        onRemove: () => setParams(() => ({ author: undefined })),
      });
    }

    if (search.minYear || search.maxYear) {
      tags.push({
        key: "year",
        label: `السنة: ${search.minYear}-${search.maxYear}`,
        onRemove: () => setParams(() => ({ minYear: undefined, maxYear: undefined })),
      });
    }

    if (search.genres) {
      tags.push({
        key: "genres",
        label: `التصنيف: ${BOOK_GENRES.filter((genre) => search.genres?.includes(genre.value)).map((genre) => `"${genre.label}" `)}`,
        onRemove: () => setParams(() => ({ genres: undefined })),
      });
    }
    // ... repeat for other tags using search.paramName

    return tags;
  }, [search, setParams]);

  const clearAllFilters = () => {
    navigate({ search: {} }); // Resets to defaults defined in Zod
  };

  const hasActiveFilters = activeFilterTags.length > 0;

  return (
    <div className="min-h-screen bg-background my-6 gap-6 flex flex-col">
      <header className="z-40 container mx-auto w-full">
        <div className="flex flex-wrap items-center gap-3">
          {/* Book search */}
          <div className="relative flex-1 min-w-20 max-w-xs">
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن كتاب..."
              value={search.q}
              onChange={(e) => setParams(() => ({ q: e.target.value }))}
              className="pr-9"
            />
            {search.q && (
              <button
                type="button"
                onChange={() => setParams(() => ({ q: undefined }))}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Author search */}
          <div className="relative flex-1 min-w-20 max-w-xs">
            <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن مؤلف..."
              value={search.author}
              onChange={(e) => setParams(() => ({ author: e.target.value }))}
              className="pr-9"
            />
            {search.author && (
              <button
                type="button"
                onChange={() => setParams(() => ({ author: undefined }))}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <GenreCombobox
            selected={selectedGenres}
            onSelectionChange={(newGenres: BookGenre[]) => {
              navigate({
                search: (prev) => ({
                  ...prev,
                  genres: newGenres.map((g) => g.value),
                }),
                replace: true,
              });
            }}
          />
          {/*
          <FilterDialog
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />*/}

          <div className="flex-1 hidden lg:block" />

          <div className="flex items-center gap-2">
            <SortAscendingIcon className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <Select
              value={search.sort}
              onValueChange={(v) => {
                setParams(() => ({ sort: v as BookSortOptions }));
              }}
            >
              <SelectTrigger className="h-10 w-37.5 bg-muted/50 border-transparent">
                {SORT_OPTIONS.filter((option) => option.value === search.sort)[0].label}
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

          <ViewToggle value={search.view} onValueChange={(e) => setParams(() => ({ view: e }))} />
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/40">
            <span className="text-xs text-muted-foreground font-medium ml-1">
              التصفية:
            </span>
            {activeFilterTags.map((tag) => (
              <Badge
                key={tag.key}
                variant="secondary"
                className="gap-1 pl-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                onClick={tag.onRemove}
              >
                {tag.label.toString()}
                <span className="hover:text-destructive transition-colors mr-0.5 rounded-full hover:bg-destructive/10 p-0.5">
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

        {search.view === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {search.view === "detailed" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {books.map((book) => (
              <BookCardDetailed key={book.id} book={book} />
            ))}
          </div>
        )}

        {search.view === "list" && (
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b bg-muted/30">
              <div className="w-10" />
              <div className="flex-1">العنوان</div>
              <div className="hidden md:block w-36">التصنيفات</div>
              <div className="hidden sm:block w-12 text-center">السنة</div>
              <div className="w-14 text-center">التقييم</div>
              <div className="w-8" />
            </div>
            <div className="divide-y divide-border/50">
              {books.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {books.length === 0 && (
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
        )}
      </main>
    </div>
  );
}
