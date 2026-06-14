import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";

import { bookSearchSchema } from "@/features/books/lib/validators";
import { searchBooks } from "@/features/books/server/get-books";
import { getPublisherOptions } from "@/features/books/server/publishers";

const DISCOVER_BOOKS_STALE_TIME = 60_000;

export const Route = createFileRoute("/_public/discover/books")({
  validateSearch: bookSearchSchema,
  component: lazyRouteComponent(
    () => import("@/features/books/pages/discover-books-page"),
    "BooksSearchPage",
  ),
  pendingComponent: lazyRouteComponent(
    () => import("@/features/books/pages/discover-books-page"),
    "BooksSearchPageSkeleton",
  ),
  pendingMs: 300,
  pendingMinMs: 0,
  staleTime: DISCOVER_BOOKS_STALE_TIME,
  loaderDeps: ({ search: { view: _view, ...rest } }) => rest,
  loader: async ({ deps }) => {
    const [result, publisherOptions] = await Promise.all([
      searchBooks({ data: deps }),
      getPublisherOptions(),
    ]);

    return { result, publisherOptions };
  },
});
