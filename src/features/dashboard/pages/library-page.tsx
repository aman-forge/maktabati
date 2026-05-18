// features/dashboard/pages/library-page.tsx
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

import { ReadingStatus } from "@/db/tables";
import { BookCardType } from "@/features/books/types";
import { BookCard } from "@/ui/components/book/book-card";
import { BookCardDetailed } from "@/ui/components/book/book-card-detailed";
import { BookListItem } from "@/ui/components/book/book-card-list";
import { Badge } from "@/ui/components/ui/badge";
import { Button } from "@/ui/components/ui/button";
import { Input } from "@/ui/components/ui/input";
import { cn } from "@/ui/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type ViewMode = "grid" | "list" | "detailed";
type SortOption = "added_desc" | "added_asc" | "title" | "rating";

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
  { value: "rating", label: "التقييم" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StatusSectionProps {
  status: StatusConfig;
  books: BookCardType[];
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
        className="group flex w-full items-center gap-2.5 text-right hover:bg-accent py-2 px-4 rounded-full"
      >
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
            ? books.map((book) => (
                <BookCard trackingStatus={book.status} key={book.id} book={book} size="lg" />
              ))
            : viewMode === "detailed"
              ? books.map((book) => (
                  <BookCardDetailed trackingStatus={book.status} key={book.id} book={book} />
                ))
              : books.map((book) => (
                  <BookListItem trackingStatus={book.status} key={book.id} book={book} />
                ))}
        </div>
      )}
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
  return (
    <aside className="scrollbar-none sticky top-20 flex h-[calc(100vh-6rem)] w-64 shrink-0 flex-col gap-6 self-start overflow-y-visible pb-6">
      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" />
        <Input
          type="search"
          placeholder="ابحث في مكتبتك..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="h-9 pr-9 text-sm"
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
      <div className="space-y-1">
        <p className="text-muted-foreground mb-2 px-1 text-xs font-medium tracking-wider uppercase">
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
      <div className="bg-border h-px" />

      {/* View & Sort */}
      <div className="space-y-4">
        {/* View toggle */}
        <div>
          <p className="text-muted-foreground mb-2 px-1 text-xs font-medium tracking-wider uppercase">
            طريقة العرض
          </p>
          <div className="bg-muted/40 flex gap-0.5 rounded-lg border p-0.5">
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
          <p className="text-muted-foreground mb-2 px-1 text-xs font-medium tracking-wider uppercase">
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
  books: BookCardType[];
}

const LibraryBooks = ({ books }: LibraryBooksProps) => {
  // ── Local state (swap with URL params / server state as needed) ───────────
  const [query, setQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<ReadingStatus | "all">("all");
  const [sort, setSort] = useState<SortOption>("added_desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  // ── Counts per status ─────────────────────────────────────────────────────
  // ✅ Uses real `userBook.status` from the DB join — no fake getBookStatus()
  // BookCardType must include `status: ReadingStatus` from the userBooks join
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
        <main className="min-w-0 flex-1 space-y-10">
          {/* Active query banner */}
          {query && (
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <MagnifyingGlassIcon className="size-4 shrink-0" />
              <span className="flex gap-2">
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
