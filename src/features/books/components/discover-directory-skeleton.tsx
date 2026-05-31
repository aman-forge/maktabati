import { Skeleton } from "@shadcn/skeleton";

import { cn } from "@/ui/lib/utils";

export function DiscoverDirectorySkeleton({ view = "grid" }: { view?: "grid" | "list" }) {
  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5"
          : "grid grid-cols-1 gap-3 md:grid-cols-2"
      }
    >
      {Array.from({ length: view === "grid" ? 10 : 8 }, (_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-xl border bg-card p-4",
            view === "list" && "flex items-center gap-4",
          )}
        >
          <Skeleton className={cn("size-16 rounded-xl", view === "list" && "size-12")} />
          <div className={cn("mt-3 flex min-w-0 flex-1 flex-col gap-2", view === "list" && "mt-0")}>
            <Skeleton className="h-4 w-3/4 rounded-md" />
            <Skeleton className="h-3.5 w-1/2 rounded-md" />
            <div className="mt-1 flex gap-2">
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-14 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DiscoverDirectoryPageSkeleton() {
  return (
    <div className="bg-background min-h-screen">
      <div className="bg-background/95 sticky top-0 z-30 border-b backdrop-blur">
        <div className="container mx-auto space-y-2.5 px-4 py-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-28 rounded-xl" />
            <div className="flex-1" />
            <Skeleton className="h-8 w-20 rounded-xl" />
          </div>
        </div>
      </div>
      <main className="container mx-auto px-4 py-6">
        <DiscoverDirectorySkeleton />
      </main>
    </div>
  );
}
