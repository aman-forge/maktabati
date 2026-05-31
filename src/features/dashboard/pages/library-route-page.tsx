import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

import { useUser } from "@/features/auth/use-user";
import { getUserBooks } from "@/features/books/server/library";
import LibraryPageSkeleton from "@/features/dashboard/components/library-page-skeleton";
import LibraryBooks from "@/features/dashboard/pages/library-page";

const LIBRARY_BOOKS_STALE_TIME = 60_000;

export function LibraryRoutePage() {
  const { user, isLoading: isUserLoading } = useUser();
  const booksQuery = useQuery({
    queryKey: ["library-books", user?.id],
    queryFn: () => getUserBooks(),
    enabled: !!user?.id,
    placeholderData: keepPreviousData,
    staleTime: LIBRARY_BOOKS_STALE_TIME,
  });
  const books = booksQuery.data;

  if (!user || isUserLoading || (booksQuery.isPending && !books)) {
    return <LibraryPageSkeleton />;
  }

  return (
    <Suspense fallback={<LibraryPageSkeleton />}>
      {books && <LibraryBooks books={books} />}
    </Suspense>
  );
}
