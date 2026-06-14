import { createFileRoute } from "@tanstack/react-router";

import { getBooks } from "@/features/books/server/get-books";
import DashboardHome from "@/features/dashboard/pages/home-page";
import MarketingHome from "@/features/marketing/pages/home-page";

export const Route = createFileRoute("/_public/_marketing/")({
  loader: ({ context }) => {
    if (context.auth.user) return { booksPromise: null };

    return { booksPromise: getBooks() };
  },
  component: Home,
});

function Home() {
  const { booksPromise } = Route.useLoaderData();
  const { auth } = Route.useRouteContext();

  if (auth.user) return <DashboardHome />;
  if (!booksPromise) return null;

  return <MarketingHome booksPromise={booksPromise} />;
}
