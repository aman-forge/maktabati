import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

import { useUser } from "@/features/auth/use-user";
import { getUserBooks } from "@/features/books/server/library";
import LibraryPageSkeleton from "@/features/dashboard/components/library-page-skeleton";
import LibraryBooks from "@/features/dashboard/pages/library-page";

export const Route = createFileRoute("/_app/library")({
  component: RouteComponent,
  // TODO: Server Auth
  // loader: ({ userId }: { userId: string }) => {
  //   const booksPromise = getUserBooks(userId);
  //   return { booksPromise };
  // },
});

function RouteComponent() {
  const { user, isLoading: isUserLoading } = useUser();
  const { data: books, isLoading: isBooksLoading } = useQuery({
    queryKey: ["library-books", user?.id],
    // Temporary auth boundary: use the client session id until Neon Auth can be
    // read reliably from TanStack Start server functions.
    queryFn: () => getUserBooks({ data: user!.id }),
    enabled: !!user?.id, // NOTE: This prevents the query from running until the client auth is ready
  });

  if (!user || isUserLoading || isBooksLoading) {
    return <LibraryPageSkeleton />;
  }

  return (
    <Suspense fallback={<LibraryPageSkeleton />}>
      {books && <LibraryBooks books={books} />}
    </Suspense>
  );
}
