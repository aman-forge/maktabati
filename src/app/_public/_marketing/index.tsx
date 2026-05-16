import { createFileRoute } from "@tanstack/react-router";

import { getBooks } from "@/features/books/server/get-books";
import MarketingHome from "@/features/marketing/pages/home-page";

export const Route = createFileRoute("/_public/_marketing/")({
  loader: () => {
    const booksPromise = getBooks();
    return { booksPromise };
  },
  component: Home,
});

function Home() {
  const { booksPromise } = Route.useLoaderData();

  return <MarketingHome booksPromise={booksPromise} />;
}
