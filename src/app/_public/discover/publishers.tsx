import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

import { DiscoverDirectoryPageSkeleton } from "@/features/books/components/discover-directory-skeleton";
import { searchPublishers } from "@/features/books/server/publishers";

export const Route = createFileRoute("/_public/discover/publishers")({
  component: lazyRouteComponent(
    () => import("@/features/books/pages/discover-publishers-page"),
    "DiscoverPublishersPage",
  ),
  pendingComponent: DiscoverDirectoryPageSkeleton,
  pendingMs: 0,
  pendingMinMs: 250,
  loader: () => searchPublishers({ data: { sort: "name-asc" } }),
});
