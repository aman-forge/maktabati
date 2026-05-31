import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";

import { getBookById } from "@/features/books/server/get-books";

export const Route = createFileRoute("/_public/book/$id")({
  component: lazyRouteComponent(
    () => import("@/features/book/pages/book-detail-page"),
    "BookDetailPage",
  ),
  loader: async ({ params }) => {
    const book = await getBookById({ data: params.id });
    if (!book) throw notFound();
    return book;
  },
});
