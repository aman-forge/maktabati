import { Skeleton } from "@shadcn/skeleton";

export default function DashboardHomeSkeleton() {
  return (
    <main className="min-h-screen container mx-auto py-6 px-4">
      <div className="space-y-6 xl:hidden">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>

      <div className="hidden xl:grid xl:grid-cols-[1.7fr_1fr] xl:gap-6">
        <div className="space-y-6">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-56 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-56 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
