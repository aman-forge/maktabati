import { Skeleton } from "@shadcn/skeleton";

export default function DashboardHomeSkeleton() {
  return (
    <main className="container mx-auto h-full px-4">
      <div className="min-h-screen space-y-6 py-6 xl:hidden">
        <Skeleton className="h-40 rounded-2xl" />
        <Skeleton className="h-72 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
        <Skeleton className="h-56 rounded-2xl" />
      </div>

      <div className="hidden h-[calc(100vh-80px-48px)] py-6 xl:grid xl:grid-cols-[1.7fr_1fr] xl:gap-6">
        <div className="space-y-6">
          <Skeleton className="h-1/4 rounded-2xl" />
          <Skeleton className="h-2/4 rounded-2xl" />
          <Skeleton className="h-1/4 rounded-2xl" />
        </div>
        <div className="sticky top-0 h-full space-y-6">
          <Skeleton className="h-2/4 rounded-2xl" />
          <Skeleton className="h-1/4 rounded-2xl" />
          <Skeleton className="h-1/4 rounded-2xl" />
        </div>
      </div>
    </main>
  );
}
