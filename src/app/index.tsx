import { SignedIn, SignedOut } from "@neondatabase/neon-js/auth/react/ui";
import { createFileRoute } from "@tanstack/react-router";
import { getBooks } from "@/features/books/server/get-books";
import DashboardHome from "@/features/dashboard/pages/home-page";
import MarketingHome from "@/features/marketing/pages/home-page";

export const Route = createFileRoute("/")({
  loader: () => {
    const booksPromise = getBooks();
    return { booksPromise };
  },
  component: Home,
});

function Home() {
  const { booksPromise } = Route.useLoaderData();

  return (
    <>
      <SignedOut>
        <MarketingHome booksPromise={booksPromise} />
      </SignedOut>

      <SignedIn>
        <DashboardHome />
      </SignedIn>
    </>
  );
}
