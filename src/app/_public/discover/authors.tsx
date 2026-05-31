import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

import { DiscoverDirectoryPageSkeleton } from "@/features/books/components/discover-directory-skeleton";
import { searchAuthors } from "@/features/books/server/authors";

export const Route = createFileRoute("/_public/discover/authors")({
  component: lazyRouteComponent(
    () => import("@/features/books/pages/discover-authors-page"),
    "DiscoverAuthorsPage",
  ),
  pendingComponent: DiscoverDirectoryPageSkeleton,
  pendingMs: 0,
  pendingMinMs: 250,
  loader: () => searchAuthors({ data: { sort: "name-asc" } }),
});
