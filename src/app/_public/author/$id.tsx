import { getAuthorById } from "@features/author/server/get-author";
import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/author/$id")({
  component: lazyRouteComponent(
    () => import("@/features/author/pages/author-detail-page"),
    "AuthorDetailPage",
  ),
  loader: async ({ params }) => {
    const author = await getAuthorById({ data: params.id });
    if (!author) throw notFound();
    return author;
  },
});
