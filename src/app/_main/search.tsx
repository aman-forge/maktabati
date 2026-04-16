import { BookCard } from "@features/books/components/book-card";
import { BookCardDetailed } from "@features/books/components/book-card-detailed";
import { BookListItem } from "@features/books/components/book-list-item";
import { FilterDialog, type FilterState } from "@features/books/components/filters-dialog";
import { GenreCombobox } from "@features/books/components/genre-combobox";
import { type ViewMode, ViewToggle } from "@features/books/components/view-toggle";
import { MagnifyingGlassIcon, SortAscendingIcon, UserIcon, XIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/select";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import { getBooks } from "@/features/books/server/get-books";
import type { BookGenre } from "@/features/books/types";

export const Route = createFileRoute("/_main/search")({
  loader: () => getBooks(),
  component: BooksSearchPage,
});

const SORT_OPTIONS = [
  { value: "trending", label: "رائج" },
  { value: "popular", label: "الأكثر شعبية" },
  { value: "top-rated", label: "الأعلى تقييماً" },
  { value: "newest", label: "الأحدث" },
  { value: "oldest", label: "الأقدم" },
  { value: "title-asc", label: "العنوان أ-ي" },
  { value: "title-desc", label: "العنوان ي-أ" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

const DEFAULT_FILTERS: FilterState = {
  yearRange: [700, 2026],
  pageRange: [0, 5000],
  ratingMin: 0,
  formats: [],
  publishers: [],
  tags: [],
  readingStatus: [],
  hasDigitalVersion: null,
  sortBy: "trending",
};

function BooksSearchPage() {
  const books = Route.useLoaderData();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [authorQuery, setAuthorQuery] = React.useState("");
  const [selectedGenres, setSelectedGenres] = React.useState<BookGenre[]>([]);
  const [sortBy, setSortBy] = React.useState<SortValue>("trending");
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid");
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_FILTERS);

  const activeFilterTags = React.useMemo(() => {
    const tags: { key: string; label: string; onRemove: () => void }[] = [];

    if (searchQuery) {
      tags.push({
        key: "search",
        label: `العنوان: "${searchQuery}"`,
        onRemove: () => setSearchQuery(""),
      });
    }

    if (authorQuery) {
      tags.push({
        key: "author",
        label: `المؤلف: "${authorQuery}"`,
        onRemove: () => setAuthorQuery(""),
      });
    }

    for (const genre of selectedGenres) {
      tags.push({
        key: `genre-${genre}`,
        label: `النوع: ${genre}`,
        onRemove: () => setSelectedGenres((g) => g.filter((x) => x !== genre)),
      });
    }

    if (filters.yearRange[0] !== 700 || filters.yearRange[1] !== 2026) {
      tags.push({
        key: "year",
        label: `السنة: ${filters.yearRange[0]}-${filters.yearRange[1]}`,
        onRemove: () => setFilters((f) => ({ ...f, yearRange: [700, 2026] })),
      });
    }

    if (filters.pageRange[0] !== 0 || filters.pageRange[1] !== 5000) {
      tags.push({
        key: "pages",
        label: `الصفحات: ${filters.pageRange[0]}-${filters.pageRange[1]}`,
        onRemove: () => setFilters((f) => ({ ...f, pageRange: [0, 5000] })),
      });
    }

    if (filters.ratingMin > 0) {
      tags.push({
        key: "rating",
        label: `التقييم: ${filters.ratingMin}+`,
        onRemove: () => setFilters((f) => ({ ...f, ratingMin: 0 })),
      });
    }

    for (const format of filters.formats) {
      tags.push({
        key: `format-${format}`,
        label: `التنسيق: ${format}`,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            formats: f.formats.filter((x) => x !== format),
          })),
      });
    }

    for (const publisher of filters.publishers) {
      tags.push({
        key: `publisher-${publisher}`,
        label: `الناشر: ${publisher}`,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            publishers: f.publishers.filter((x) => x !== publisher),
          })),
      });
    }

    for (const tag of filters.tags) {
      tags.push({
        key: `tag-${tag}`,
        label: `الوسم: ${tag}`,
        onRemove: () => setFilters((f) => ({ ...f, tags: f.tags.filter((x) => x !== tag) })),
      });
    }

    for (const status of filters.readingStatus) {
      tags.push({
        key: `status-${status}`,
        label: `الحالة: ${status}`,
        onRemove: () =>
          setFilters((f) => ({
            ...f,
            readingStatus: f.readingStatus.filter((x) => x !== status),
          })),
      });
    }

    if (filters.hasDigitalVersion !== null) {
      tags.push({
        key: "digital",
        label: filters.hasDigitalVersion ? "نسخة رقمية" : "ورقي فقط",
        onRemove: () => setFilters((f) => ({ ...f, hasDigitalVersion: null })),
      });
    }

    return tags;
  }, [searchQuery, authorQuery, selectedGenres, filters]);

  const clearAllFilters = React.useCallback(() => {
    setSearchQuery("");
    setAuthorQuery("");
    setSelectedGenres([]);
    setSortBy("trending");
    setFilters(DEFAULT_FILTERS);
  }, []);

  const filteredBooks = React.useMemo(() => {
    let result = books.filter((book) => {
      if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (authorQuery && !book.author?.name.toLowerCase().includes(authorQuery.toLowerCase())) {
        return false;
      }
      if (selectedGenres.length > 0) {
        const bookGenres = book.genres ?? [];
        if (!selectedGenres.every((g: BookGenre) => bookGenres.includes(g.value))) return false;
      }
      if (
        book.publicationYear != null &&
        (book.publicationYear < filters.yearRange[0] || book.publicationYear > filters.yearRange[1])
      ) {
        return false;
      }
      if (
        book.pageCount != null &&
        (book.pageCount < filters.pageRange[0] || book.pageCount > filters.pageRange[1])
      ) {
        return false;
      }
      return true;
    });

    switch (sortBy) {
      case "newest":
        result = [...result].sort((a, b) => (b.publicationYear ?? 0) - (a.publicationYear ?? 0));
        break;
      case "oldest":
        result = [...result].sort((a, b) => (a.publicationYear ?? 0) - (b.publicationYear ?? 0));
        break;
      case "title-asc":
        result = [...result].sort((a, b) => a.title.localeCompare(b.title, "ar"));
        break;
      case "title-desc":
        result = [...result].sort((a, b) => b.title.localeCompare(a.title, "ar"));
        break;
    }

    return result;
  }, [books, searchQuery, authorQuery, selectedGenres, filters, sortBy]);

  const hasActiveFilters = activeFilterTags.length > 0;

  return (
    <div className="min-h-screen bg-background my-4">
      <header className="z-40 container mx-auto w-full rounded-4xl">
        <div className="flex flex-wrap items-center gap-3">
          {/* Book search */}
          <div className="relative flex-1 min-w-[160px] max-w-xs">
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن كتاب..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-9 h-10 bg-muted/50 border-transparent focus:border-primary/50 focus:bg-background transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Author search */}
          <div className="relative flex-1 min-w-40 max-w-xs">
            <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="ابحث عن مؤلف..."
              value={authorQuery}
              onChange={(e) => setAuthorQuery(e.target.value)}
              className="pr-9 h-10 bg-muted/50 border-transparent focus:border-primary/50 focus:bg-background transition-colors"
            />
            {authorQuery && (
              <button
                type="button"
                onClick={() => setAuthorQuery("")}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <GenreCombobox selected={selectedGenres} onSelectionChange={setSelectedGenres} />

          <FilterDialog
            filters={filters}
            onFiltersChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
          />

          <div className="flex-1 hidden lg:block" />

          <div className="flex items-center gap-2">
            <SortAscendingIcon className="w-4 h-4 text-muted-foreground hidden sm:block" />
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortValue)}>
              <SelectTrigger className="h-10 w-37.5 bg-muted/50 border-transparent">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ViewToggle value={viewMode} onValueChange={setViewMode} />
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-border/40">
            <span className="text-xs text-muted-foreground font-medium ml-1">التصفية:</span>
            {activeFilterTags.map((tag) => (
              <Badge
                key={tag.key}
                variant="secondary"
                className="gap-1 pl-1 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                onClick={tag.onRemove}
              >
                {tag.label}
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

      <main className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{filteredBooks.length}</span>{" "}
            {filteredBooks.length === 1 ? "كتاب واحد" : "كتاب"}
          </p>
        </div>

        {viewMode === "grid" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}

        {viewMode === "detailed" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredBooks.map((book) => (
              <BookCardDetailed key={book.id} book={book} />
            ))}
          </div>
        )}

        {viewMode === "list" && (
          <div className="bg-card rounded-xl border overflow-hidden">
            <div className="flex items-center gap-4 px-4 py-3 text-xs font-medium text-muted-foreground border-b bg-muted/30">
              <div className="w-10" />
              <div className="flex-1">العنوان</div>
              <div className="hidden md:block w-36">الأنواع</div>
              <div className="hidden sm:block w-12 text-center">السنة</div>
              <div className="w-14 text-center">التقييم</div>
              <div className="w-8" />
            </div>
            <div className="divide-y divide-border/50">
              {filteredBooks.map((book) => (
                <BookListItem key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {filteredBooks.length === 0 && (
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
