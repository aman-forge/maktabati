import { Skeleton } from "@shadcn/skeleton";

export default function DashboardHomeSkeleton() {
  return (
    <main className="container mx-auto px-4 h-full">
      <div className="space-y-6 xl:hidden min-h-screen py-6">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>

      <div className="hidden xl:grid xl:grid-cols-[1.7fr_1fr] xl:gap-6 h-[calc(100vh-80px-48px)] py-6">
        <div className="space-y-6">
          <Skeleton className="h-1/4 rounded-2xl" />
          <Skeleton className="h-2/4 rounded-2xl" />
          <Skeleton className="h-1/4 rounded-2xl" />
        </div>
        <div className="space-y-6 sticky top-0 h-full">
          <Skeleton className="h-2/4 rounded-2xl" />
          <Skeleton className="h-1/4 rounded-2xl" />
          <Skeleton className="h-1/4 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
