import { createFileRoute, Await } from "@tanstack/react-router";
import { Suspense } from "react";

import { getBooks } from "@/features/books/server/get-books";
import LibraryPageSkeleton from "@/features/dashboard/components/library-page-skeleton";
import LibraryBooks from "@/features/dashboard/pages/library-page";

export const Route = createFileRoute("/_app/library")({
  component: RouteComponent,
  loader: () => {
    const booksPromise = getBooks();
    return { booksPromise };
  },
});

function RouteComponent() {
  const { booksPromise } = Route.useLoaderData();

  return (
    <Suspense fallback={<LibraryPageSkeleton />}>
      <Await promise={booksPromise}>{(books) => <LibraryBooks books={books} />}</Await>
    </Suspense>
  );
}
