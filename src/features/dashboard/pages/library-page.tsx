import {
  ArticleIcon,
  BookmarkIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PauseCircleIcon,
  SlidersHorizontalIcon,
  SquaresFourIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";

import type { BookCardType, ReadingStatus } from "@/features/books/types";
import { BookCard } from "@/ui/components/book/book-card";
import { BookCardDetailed } from "@/ui/components/book/book-card-detailed";
import { BookListItem } from "@/ui/components/book/book-card-list";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/components/ui/select";
import { Separator } from "@/ui/components/ui/separator";
import { cn } from "@/ui/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list" | "detailed";
type SortOption = "added_desc" | "added_asc" | "title";

interface StatusConfig {
  value: ReadingStatus | "all";
  label: string;
  icon: React.ElementType;
  color: string;
  badgeClass: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STATUS_CONFIG: StatusConfig[] = [
  {
    value: "all",
    label: "المكتبة كلها",
    icon: SquaresFourIcon,
    color: "text-foreground",
    badgeClass: "bg-foreground/10 text-foreground",
  },
  {
    value: "currently_reading",
    label: "قيد القراءة",
    icon: BookOpenIcon,
    color: "text-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-500",
  },
  {
    value: "want_to_read",
    label: "أخطط لقراءته",
    icon: BookmarkIcon,
    color: "text-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-500",
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    color: "text-emerald-500",
    badgeClass: "bg-emerald-500/10 text-emerald-500",
  },
  {
    value: "on_hold",
    label: "متوقف",
    icon: PauseCircleIcon,
    color: "text-orange-500",
    badgeClass: "bg-orange-500/10 text-orange-500",
  },
  {
    value: "dropped",
    label: "متروك",
    icon: TrashIcon,
    color: "text-rose-500",
    badgeClass: "bg-rose-500/10 text-rose-500",
  },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "added_desc", label: "الأحدث إضافةً" },
  { value: "added_asc", label: "الأقدم إضافةً" },
  { value: "title", label: "العنوان" },
];

const VIEW_OPTIONS = [
  { value: "grid", icon: SquaresFourIcon, label: "شبكة" },
  { value: "detailed", icon: ArticleIcon, label: "مفصل" },
  { value: "list", icon: ListIcon, label: "قائمة" },
] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatusSectionProps {
  status: StatusConfig;
  books: BookCardType[];
  viewMode: ViewMode;
}

function StatusSection({ status, books, viewMode }: StatusSectionProps) {
  const Icon = status.icon;

  if (books.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex w-full items-center gap-2.5 px-1 py-1 text-right">
        <div className={cn("p-1.5 rounded-lg bg-muted/60", status.color)}>
          <Icon className="size-4" weight="duotone" />
        </div>
        <h2 className="flex-1 text-right text-base font-semibold">{status.label}</h2>
        <Badge
          variant="secondary"
          className={cn("text-xs font-medium px-2 h-5", status.badgeClass)}
        >
          {books.length}
        </Badge>
      </div>

      {/* Books grid/detailed/list */}
      <div
        className={cn(
          viewMode === "grid"
            ? [
                "grid grid-cols-2 justify-items-center gap-x-3 gap-y-6 min-[520px]:grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] 2lg:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]",
                "[&>article]:w-full! [&>article]:max-w-40 lg:[&>article]:max-w-44 2lg:[&>article]:max-w-48",
                "[&>article>div:first-child]:h-auto! [&>article>div:first-child]:aspect-2/3",
              ]
            : viewMode === "detailed"
              ? "grid grid-cols-1 gap-3 md:gap-4 lg:grid-cols-2"
              : "flex flex-col gap-2",
        )}
      >
        {viewMode === "grid"
          ? books.map((book) => (
              <BookCard
                trackingStatus={book.status ?? undefined}
                key={book.id}
                book={book}
                size="lg"
              />
            ))
          : viewMode === "detailed"
            ? books.map((book) => (
                <BookCardDetailed
                  trackingStatus={book.status ?? undefined}
                  key={book.id}
                  book={book}
                />
              ))
            : books.map((book) => (
                <BookListItem trackingStatus={book.status ?? undefined} key={book.id} book={book} />
              ))}
      </div>
    </section>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeStatus: ReadingStatus | "all";
  onStatusChange: (s: ReadingStatus | "all") => void;
  counts: Record<ReadingStatus | "all", number>;
  sort: SortOption;
  onSortChange: (s: SortOption) => void;
  viewMode: ViewMode;
  onViewModeChange: (v: ViewMode) => void;
}

function LibrarySidebar({
  query,
  onQueryChange,
  activeStatus,
  onStatusChange,
  counts,
  sort,
  onSortChange,
  viewMode,
  onViewModeChange,
}: SidebarProps) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      {/*Desktop SidebarProps*/}
      <aside className="hidden w-full shrink-0 flex-col gap-4 self-start lg:sticky lg:top-20 lg:flex lg:h-[calc(100vh-6rem)] lg:w-64 lg:gap-6 lg:overflow-y-visible lg:pb-6">
        {/* Search */}
        <div className="relative">
          <MagnifyingGlassIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
          <Input
            type="search"
            placeholder="ابحث في مكتبتك..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pr-9 text-sm"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 left-[13.4px] -translate-y-1/2 transition-colors"
            >
              <XIcon className="size-3.5" weight="bold" />
            </button>
          )}
        </div>

        {/* Status filter */}
        <div className="flex flex-col space-y-1 lg:block">
          <p className="text-muted-foreground mb-2 px-1 text-xs font-medium tracking-wider uppercase">
            حالة القراءة
          </p>
          <nav className="-mx-1 flex scrollbar-none gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
            {STATUS_CONFIG.map((s) => {
              const Icon = s.icon;
              const isActive = activeStatus === s.value;
              const count = counts[s.value];
              return (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => onStatusChange(s.value)}
                  className={cn(
                    "flex min-w-max items-center gap-2.5 rounded-2xl cursor-pointer px-3 py-2 text-right text-sm transition-all duration-150 lg:w-full lg:min-w-0 group/button",
                    isActive
                      ? "bg-primary/10 border border-primary text-primary font-medium hover:bg-primary/20"
                      : "border border-transparent! text-muted-foreground hover:bg-accent/50 hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn("size-4 shrink-0", isActive ? "text-primary " : s.color)}
                    weight={isActive ? "duotone" : "regular"}
                  />
                  <span className="flex-1 text-right">{s.label}</span>
                  {count > 0 && (
                    <span
                      className={cn(
                        "text-xs tabular-nums min-w-5 text-center",
                        isActive ? "text-primary font-semibold " : "text-muted-foreground",
                      )}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <Separator className="hidden lg:block" />

        {/* View & Sort */}
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(10rem,14rem)] lg:flex lg:flex-col">
          {/* View toggle */}
          <div>
            <p className="text-muted-foreground mb-2 px-1 text-xs font-medium tracking-wider uppercase">
              طريقة العرض
            </p>
            <div className="bg-muted/40 flex gap-0.5 rounded-lg border p-0.5">
              {VIEW_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onViewModeChange(opt.value)}
                  className={cn(
                    "flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-md px-1 py-1.5 text-xs transition-all duration-150",
                    viewMode === opt.value
                      ? "bg-background text-foreground shadow-sm font-medium"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <opt.icon className="size-3.5" />
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <p className="text-muted-foreground mb-2 px-1 text-xs font-medium tracking-wider uppercase">
              الترتيب
            </p>
            <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="h-9 w-full rounded-lg text-xs">
                <SelectValue>{SORT_OPTIONS.find((o) => o.value === sort)?.label}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </aside>
      {/*Mobile Bar*/}
      <div className="bg-background border-border sticky top-0 z-50 border-b lg:hidden">
        {/* Row 1: Search + Filter toggle */}
        <div className="flex items-center gap-2 py-2">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
            <Input
              type="search"
              placeholder="ابحث في مكتبتك..."
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="bg-muted/50 rounded-xl pr-9 text-sm"
              autoComplete="off"
              dir="rtl"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                className="text-muted-foreground hover:text-foreground absolute top-1/2 left-3 -translate-y-1/2 transition-colors"
              >
                <XIcon className="size-3.5" weight="bold" />
              </button>
            )}
          </div>

          {/* Sort/View toggle button */}
          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn(
              "flex items-center gap-1.5 h-9 px-3 rounded-xl border text-sm font-medium transition-all shrink-0",
              filtersOpen
                ? "bg-primary/10 border-primary text-primary"
                : "bg-muted/50 border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <SlidersHorizontalIcon className="size-4" />
            فرز
            {/* Active filter badge */}
            {sort !== "added_desc" && (
              <span className="bg-primary text-primary-foreground flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
                1
              </span>
            )}
          </button>
        </div>

        {/* Row 2: Status chips — horizontal scroll */}
        <div
          className="flex scrollbar-none gap-1.5 overflow-x-auto px-0 pb-2.5"
          role="tablist"
          aria-label="حالة القراءة"
        >
          {STATUS_CONFIG.map((s) => {
            const Icon = s.icon;
            const isActive = activeStatus === s.value;
            const count = counts[s.value];
            return (
              <button
                key={s.value}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onStatusChange(s.value)}
                className={cn(
                  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm shrink-0 transition-all",
                  isActive
                    ? "bg-primary/10 border-primary text-primary font-medium"
                    : "border-border/60 text-muted-foreground hover:text-foreground hover:border-border",
                )}
              >
                <Icon
                  className={cn("size-3.5 shrink-0", isActive ? "text-primary" : s.color)}
                  weight={isActive ? "duotone" : "regular"}
                />
                {s.label}
                {count > 0 && (
                  <span
                    className={cn(
                      "text-xs tabular-nums",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground/70",
                    )}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Expandable panel: View + Sort */}
        {filtersOpen && (
          <div className="border-border/50 grid grid-cols-2 gap-3 border-t px-0 py-3">
            {/* View toggle */}
            <div>
              <p className="text-muted-foreground mb-1.5 px-0.5 text-[11px] font-medium tracking-wider uppercase">
                طريقة العرض
              </p>
              <div className="bg-muted/40 flex gap-0.5 rounded-lg border p-0.5">
                {VIEW_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onViewModeChange(opt.value)}
                    className={cn(
                      "flex flex-1 items-center justify-center gap-1 rounded-md px-1 py-1.5 text-xs transition-all",
                      viewMode === opt.value
                        ? "bg-background text-foreground shadow-sm font-medium"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <opt.icon className="size-3.5" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort select */}
            <div>
              <p className="text-muted-foreground mb-1.5 px-0.5 text-[11px] font-medium tracking-wider uppercase">
                الترتيب
              </p>
              <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
                <SelectTrigger className="h-9 w-full rounded-lg text-xs">
                  <SelectValue>{SORT_OPTIONS.find((o) => o.value === sort)?.label}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {SORT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface LibraryBooksProps {
  books: BookCardType[];
}

const LibraryBooks = ({ books }: LibraryBooksProps) => {
  // ── Local state (swap with URL params / server state as needed) ───────────
  const [query, setQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<ReadingStatus | "all">("all");
  const [sort, setSort] = useState<SortOption>("added_desc");
  const [viewMode, setViewMode] = useState<ViewMode>("detailed");

  const counts = useMemo(() => {
    const base: Record<ReadingStatus | "all", number> = {
      all: books.length,
      want_to_read: 0,
      currently_reading: 0,
      completed: 0,
      on_hold: 0,
      dropped: 0,
    };
    for (const book of books) {
      // book.status comes from the userBooks join in getUserBooks()
      if (book.status && book.status in base) {
        base[book.status as ReadingStatus]++;
      }
    }
    return base;
  }, [books]);

  // ── Filter + search ───────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = books;

    if (activeStatus !== "all") {
      result = result.filter((b) => b.status === activeStatus);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(
        (b) => b.title?.toLowerCase().includes(q) || b.author?.name?.toLowerCase().includes(q),
      );
    }

    // Sort
    switch (sort) {
      case "title":
        result = [...result].sort((a, b) => (a.title ?? "").localeCompare(b.title ?? ""));
        break;
      case "added_asc":
        result = [...result].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case "added_desc":
        result = [...result].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      default:
        result = [...result];
        break;
    }

    return result;
  }, [books, activeStatus, query, sort]);

  // ── Group by status for "all" view ────────────────────────────────────────
  const sections = useMemo(() => {
    if (activeStatus !== "all") {
      const config = STATUS_CONFIG.find((s) => s.value === activeStatus)!;
      return [{ config, books: filtered }];
    }
    return STATUS_CONFIG.filter((s) => s.value !== "all").map((config) => ({
      config,
      books: filtered.filter((b) => b.status === config.value),
    }));
  }, [activeStatus, filtered]);

  const hasResults = sections.some((s) => s.books.length > 0);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-360 px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        {/* Sidebar */}
        <LibrarySidebar
          query={query}
          onQueryChange={setQuery}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          counts={counts}
          sort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Main content */}
        <main className="min-w-0 flex-1 space-y-8 md:space-y-10">
          {/* Active query banner */}
          {query && (
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <MagnifyingGlassIcon className="size-4 shrink-0" />
              <span className="flex min-w-0 flex-wrap gap-2">
                نتائج البحث عن <span className="text-foreground font-medium">"{query}"</span>
                <span>{" · "}</span>
                <span>
                  {filtered.length} {filtered.length <= 10 ? "كتب" : "كتاب"}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-muted-foreground hover:text-foreground mr-1 transition-colors"
              >
                <XIcon className="size-3.5" />
              </button>
            </div>
          )}

          {/* Empty state */}
          {!hasResults ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="bg-muted mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                <BookOpenIcon className="text-muted-foreground/30 size-8" weight="duotone" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold">
                {query ? `لا نتائج لـ "${query}"` : "لا توجد كتب هنا بعد"}
              </h3>
              <p className="text-muted-foreground mb-5 max-w-xs text-sm leading-relaxed">
                {query
                  ? "جرّب كلمات مختلفة أو غيّر التصفية"
                  : "ابدأ باستكشاف الكتب وأضفها إلى مكتبتك"}
              </p>
              {query && (
                <Button variant="outline" size="sm" onClick={() => setQuery("")}>
                  مسح البحث
                </Button>
              )}
            </div>
          ) : (
            /* Status sections */
            sections.map(({ config, books: sectionBooks }) => (
              <StatusSection
                key={config.value}
                status={config}
                books={sectionBooks}
                viewMode={viewMode}
              />
            ))
          )}
        </main>
      </div>
    </div>
  );
};

export default LibraryBooks;
