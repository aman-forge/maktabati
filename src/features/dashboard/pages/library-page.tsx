import {
  ArticleIcon,
  BookmarkIcon,
  BookOpenIcon,
  CaretDownIcon,
  CheckCircleIcon,
  ListIcon,
  MagnifyingGlassIcon,
  PauseCircleIcon,
  SquaresFourIcon,
  TrashIcon,
  XIcon,
} from "@phosphor-icons/react";
import { useMemo, useState } from "react";
import type { BookCardBook } from "@/features/books/server/get-books";
import { BookCard } from "@/ui/components/book/book-card";
import { BookCardDetailed } from "@/ui/components/book/book-card-detailed";
import { BookListItem } from "@/ui/components/book/book-list-item";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import { cn } from "@/ui/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type ReadingStatus = "all" | "Reading" | "Unread" | "Completed" | "On Hold" | "Dropped";
type ViewMode = "grid" | "list" | "detailed";
type SortOption = "added_desc" | "added_asc" | "title" | "rating";

interface StatusConfig {
  value: ReadingStatus;
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
    value: "Reading",
    label: "قيد القراءة",
    icon: BookOpenIcon,
    color: "text-blue-500",
    badgeClass: "bg-blue-500/10 text-blue-500",
  },
  {
    value: "Unread",
    label: "أخطط لقراءته",
    icon: BookmarkIcon,
    color: "text-amber-500",
    badgeClass: "bg-amber-500/10 text-amber-500",
  },
  {
    value: "Completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    color: "text-emerald-500",
    badgeClass: "bg-emerald-500/10 text-emerald-500",
  },
  {
    value: "On Hold",
    label: "متوقف",
    icon: PauseCircleIcon,
    color: "text-orange-500",
    badgeClass: "bg-orange-500/10 text-orange-500",
  },
  {
    value: "Dropped",
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
  { value: "rating", label: "التقييم" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Replace with real status from user-book relationship data.
 * Currently assigns a deterministic fake status for demo purposes.
 */
function getBookStatus(book: BookCardBook, index: number): Exclude<ReadingStatus, "all"> {
  const statuses: Exclude<ReadingStatus, "all">[] = [
    "Reading",
    "Unread",
    "Completed",
    "On Hold",
    "Dropped",
  ];
  return statuses[index % statuses.length];
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatusSectionProps {
  status: StatusConfig;
  books: BookCardBook[];
  viewMode: ViewMode;
}

function StatusSection({ status, books, viewMode }: StatusSectionProps) {
  const [collapsed, setCollapsed] = useState(false);
  const Icon = status.icon;

  if (books.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Section header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="group flex items-center gap-2.5 w-full text-right"
      >
        <div className={cn("p-1.5 rounded-lg bg-muted/60", status.color)}>
          <Icon className="size-4" weight="duotone" />
        </div>
        <h2 className="font-semibold text-base flex-1 text-right">{status.label}</h2>
        <Badge
          variant="secondary"
          className={cn("text-xs font-medium px-2 h-5", status.badgeClass)}
        >
          {books.length}
        </Badge>
        <CaretDownIcon
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-200",
            collapsed && "-rotate-90",
          )}
        />
      </button>

      {/* Books grid/detailed/list */}
      {!collapsed && (
        <div
          className={cn(
            viewMode === "grid"
              ? "flex flex-wrap gap-3 justify-center w-fit"
              : viewMode === "detailed"
                ? "grid grid-cols-1 lg:grid-cols-2 gap-4"
                : "flex-col divide-y divide-border/50",
          )}
        >
          {viewMode === "grid"
            ? books.map((book) => <BookCard key={book.id} book={book} size="lg" />)
            : viewMode === "detailed"
              ? books.map((book) => <BookCardDetailed key={book.id} book={book} />)
              : books.map((book) => <BookListItem key={book.id} book={book} />)}
        </div>
      )}
    </section>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

interface SidebarProps {
  query: string;
  onQueryChange: (q: string) => void;
  activeStatus: ReadingStatus;
  onStatusChange: (s: ReadingStatus) => void;
  counts: Record<ReadingStatus, number>;
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
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-6 sticky top-20 self-start h-[calc(100vh-6rem)] overflow-y-visible pb-6 scrollbar-none">
      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
        <Input
          type="search"
          placeholder="ابحث في مكتبتك..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="pr-9 h-9 text-sm"
          autoComplete="off"
        />

        {query && (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            className="absolute left-[13.4px] top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <XIcon className="size-3.5" weight="bold" />
          </button>
        )}
      </div>

      {/* Status filter */}
      <div className="space-y-1">
        <p className="text-xs font-medium text-muted-foreground px-1 mb-2 uppercase tracking-wider">
          حالة القراءة
        </p>
        <nav className="space-y-0.5">
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
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 text-right",
                  isActive
                    ? "bg-primary/10 border border-primary text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon
                  className={cn("size-4 shrink-0", isActive ? "text-primary" : s.color)}
                  weight={isActive ? "duotone" : "regular"}
                />
                <span className="flex-1 text-right">{s.label}</span>
                {count > 0 && (
                  <span
                    className={cn(
                      "text-xs tabular-nums min-w-5 text-center",
                      isActive ? "text-primary font-semibold" : "text-muted-foreground",
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
      <div className="h-px bg-border" />

      {/* View & Sort */}
      <div className="space-y-4">
        {/* View toggle */}
        <div>
          <p className="text-xs font-medium text-muted-foreground px-1 mb-2 uppercase tracking-wider">
            طريقة العرض
          </p>
          <div className="flex rounded-lg border bg-muted/40 p-0.5 gap-0.5">
            {(
              [
                { value: "grid", icon: SquaresFourIcon, label: "شبكة" },
                { value: "detailed", icon: ArticleIcon, label: "مفصل" },
                { value: "list", icon: ListIcon, label: "قائمة" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onViewModeChange(opt.value)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-all duration-150",
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
          <p className="text-xs font-medium text-muted-foreground px-1 mb-2 uppercase tracking-wider">
            الترتيب
          </p>
          <div className="space-y-0.5">
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onSortChange(opt.value)}
                className={cn(
                  "w-full text-right px-3 py-1.5 rounded-lg text-sm transition-all duration-150",
                  sort === opt.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface LibraryBooksProps {
  /**
   * In production: pass books enriched with a `status` field from the
   * user-book join table. The `getBookStatus` helper is a temporary stand-in.
   */
  books: BookCardBook[];
}

const LibraryBooks = ({ books }: LibraryBooksProps) => {
  // ── Local state (swap with URL params / server state as needed) ───────────
  const [query, setQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<ReadingStatus>("all");
  const [sort, setSort] = useState<SortOption>("added_desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // ── Enrich books with status (replace with real data in production) ───────
  const enrichedBooks = useMemo(
    () => books.map((book, i) => ({ ...book, _status: getBookStatus(book, i) })),
    [books],
  );

  // ── Counts per status ─────────────────────────────────────────────────────
  const counts = useMemo(() => {
    const base: Record<ReadingStatus, number> = {
      all: enrichedBooks.length,
      Reading: 0,
      Unread: 0,
      Completed: 0,
      "On Hold": 0,
      Dropped: 0,
    };
    for (const b of enrichedBooks) base[b._status]++;
    return base;
  }, [enrichedBooks]);

  // ── Filter + search ───────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = enrichedBooks;

    if (activeStatus !== "all") {
      result = result.filter((b) => b._status === activeStatus);
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
      // case "rating":
      //   result = [...result].sort((a, b) => (b.averageRating ?? 0) - (a.averageRating ?? 0));
      //   break;
      case "added_asc":
        // Replace with real `addedAt` timestamp when available
        result = [...result];
        break;
      case "added_desc":
        break;
      default:
        result = [...result].reverse();
        break;
    }

    return result;
  }, [enrichedBooks, activeStatus, query, sort]);

  // ── Group by status for "all" view ────────────────────────────────────────
  const sections = useMemo(() => {
    if (activeStatus !== "all") {
      const config = STATUS_CONFIG.find((s) => s.value === activeStatus)!;
      return [{ config, books: filtered }];
    }
    return STATUS_CONFIG.filter((s) => s.value !== "all").map((config) => ({
      config,
      books: filtered.filter((b) => b._status === config.value),
    }));
  }, [activeStatus, filtered]);

  const hasResults = sections.some((s) => s.books.length > 0);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-4">
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
        <main className="flex-1 min-w-0 space-y-10">
          {/* Active query banner */}
          {query && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MagnifyingGlassIcon className="size-4 shrink-0" />
              <span className="flex gap-2">
                نتائج البحث عن <span className="font-medium text-foreground">"{query}"</span>
                <span>{" · "}</span>
                <span>
                  {filtered.length} {filtered.length <= 10 ? "كتب" : "كتاب"}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mr-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <XIcon className="size-3.5" />
              </button>
            </div>
          )}

          {/* Empty state */}
          {!hasResults ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
                <BookOpenIcon className="size-8 text-muted-foreground/30" weight="duotone" />
              </div>
              <h3 className="text-base font-semibold mb-1.5">
                {query ? `لا نتائج لـ "${query}"` : "لا توجد كتب هنا بعد"}
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-5">
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
