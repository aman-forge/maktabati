import { Skeleton } from "@shadcn/skeleton";

function range(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

// ─── Mobile top bar skeleton ──────────────────────────────────────────────────

function TopBarSkeleton() {
  return (
    <div className="border-border bg-background sticky top-0 z-50 border-b lg:hidden">
      {/* Row 1: Search + filter toggle */}
      <div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 w-16 shrink-0 rounded-xl" />
      </div>

      {/* Row 2: Status chips */}
      <div className="flex gap-1.5 overflow-hidden px-3 pb-2.5">
        {range(5).map((i) => (
          <Skeleton
            key={i}
            className="h-8 shrink-0 rounded-full"
            style={{ width: `${[64, 96, 80, 104, 80][i]}px` }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Desktop sidebar skeleton ─────────────────────────────────────────────────

function SidebarSkeleton() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 lg:flex">
      {/* Search input */}
      <Skeleton className="h-9 w-full rounded-lg" />

      {/* Status filter list */}
      <div className="space-y-1">
        <Skeleton className="mb-3 h-3.5 w-20 rounded" />
        <div className="flex flex-col gap-1">
          {range(6).map((i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2">
              <Skeleton className="size-4 shrink-0 rounded-md" />
              <Skeleton className="h-4 flex-1 rounded-md" />
              <Skeleton className="h-4 w-5 rounded-md" />
            </div>
          ))}
        </div>
      </div>

      <Skeleton className="h-px w-full" />

      {/* View toggle + Sort */}
      <div className="flex flex-col gap-4">
        <div className="space-y-3">
          <Skeleton className="h-3.5 w-24 rounded" />
          <Skeleton className="h-9 w-full rounded-lg" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-3.5 w-16 rounded" />
          <div className="space-y-1">
            {range(4).map((i) => (
              <Skeleton key={i} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─── Book card skeleton ───────────────────────────────────────────────────────

function BookCardSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-2/3 w-full rounded-xl" />
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
      <div className="flex items-center gap-2.5">
        <Skeleton className="size-7 shrink-0 rounded-lg" />
        <Skeleton className="h-5 w-32 flex-1 rounded-md" />
        <Skeleton className="h-5 w-7 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 min-[520px]:grid-cols-[repeat(auto-fill,minmax(9.5rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] 2xl:grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
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
    <div className="bg-background min-h-screen" dir="rtl">
      {/* Mobile/tablet top bar */}
      <TopBarSkeleton />

      <div className="mx-auto max-w-360 px-3 py-4 sm:px-4 sm:py-6 lg:px-6 lg:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
          {/* Desktop sidebar */}
          <SidebarSkeleton />

          <main className="min-w-0 flex-1 space-y-8 md:space-y-10">
            <SectionSkeleton count={3} />
            <SectionSkeleton count={6} />
            <SectionSkeleton count={4} />
          </main>
        </div>
      </div>
    </div>
  );
}
