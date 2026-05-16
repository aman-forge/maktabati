import { Skeleton } from "@shadcn/skeleton";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

// ─── Sidebar skeleton ─────────────────────────────────────────────────────────

function SidebarSkeleton() {
  return (
    <aside className="w-64 shrink-0 flex flex-col gap-6">
      {/* Search input */}
      <Skeleton className="h-9 w-full rounded-lg" />

      {/* Status filter list */}
      <div className="space-y-1">
        <Skeleton className="h-3.5 w-20 rounded mb-3" />
        {range(6).map((i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2">
            <Skeleton className="size-4 rounded-md shrink-0" />
            <Skeleton className="h-4 flex-1 rounded-md" />
            <Skeleton className="h-4 w-5 rounded-md" />
          </div>
        ))}
      </div>

      <Skeleton className="h-px w-full" />

      {/* View toggle */}
      <div className="space-y-3">
        <Skeleton className="h-3.5 w-24 rounded" />
        <Skeleton className="h-9 w-full rounded-lg" />
      </div>

      {/* Sort options */}
      <div className="space-y-1">
        <Skeleton className="h-3.5 w-16 rounded mb-3" />
        {range(4).map((i) => (
          <Skeleton key={i} className="h-8 w-full rounded-lg" />
        ))}
      </div>
    </aside>
  );
}

// ─── Book card skeleton ───────────────────────────────────────────────────────

function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full aspect-2/3 rounded-xl" />
      <Skeleton className="h-4 w-4/5 rounded-md" />
      <Skeleton className="h-3.5 w-3/5 rounded-md" />
    </div>
  );
}

// ─── Section skeleton ─────────────────────────────────────────────────────────

interface SectionSkeletonProps {
  count?: number;
}

function SectionSkeleton({ count = 6 }: SectionSkeletonProps) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2.5">
        <Skeleton className="size-7 rounded-lg shrink-0" />
        <Skeleton className="h-5 w-32 rounded-md flex-1" />
        <Skeleton className="h-5 w-7 rounded-full" />
        <Skeleton className="size-4 rounded shrink-0" />
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {range(count).map((i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

// ─── Page skeleton ────────────────────────────────────────────────────────────

export default function LibraryPageSkeleton() {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <SidebarSkeleton />

          <main className="flex-1 min-w-0 space-y-10">
            <SectionSkeleton count={3} />
            <SectionSkeleton count={6} />
            <SectionSkeleton count={4} />
          </main>
        </div>
      </div>
    </div>
  );
}
