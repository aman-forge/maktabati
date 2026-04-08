import { BookCarousel, BookCarouselSkeleton } from "@features/discovery/components/book-carousel";
// import { FeaturedBanner } from "@features/discovery/components/featured-banner";
import { GenreGrid } from "@features/discovery/components/genre-grid";
import { HeroSection } from "@features/discovery/components/hero-section";
// import { QuoteSection } from "@features/discovery/components/quote-section";
import { Await, createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { getBooks } from "@/features/books/server/get-books";

export const Route = createFileRoute("/")({
  loader: () => {
    // DO NOT await here. We pass the promise directly to stream it to the client.
    const booksPromise = getBooks();
    return { booksPromise };
  },
  component: Home,
});

function Home() {
  const { booksPromise } = Route.useLoaderData();

  return (
    <main className="min-h-screen font-sans">
      <HeroSection />

      <div className="flex flex-col gap-16 py-16">
        <Suspense fallback={<BookCarouselSkeleton />}>
          {/* Await handles unwrapping the promise when it resolves */}
          <Await promise={booksPromise}>
            {(books) => (
              <BookCarousel
                title="الرائج الآن"
                subtitle="ما لا يستطيع القراء تركه هذا الأسبوع"
                books={books}
                accentColor="var(--badge-amber)"
              />
            )}
          </Await>
        </Suspense>

        <Suspense fallback={<BookCarouselSkeleton />}>
          <Await promise={booksPromise}>
            {(books) => (
              <BookCarousel
                title="اختيارات الفريق"
                subtitle="تم اختيارها بعناية من قبل محررينا لرواية قصص استثنائية"
                books={books}
                accentColor="oklch(0.55 0.14 140)"
              />
            )}
          </Await>
        </Suspense>

        <GenreGrid />

        {/*<FeaturedBanner />*/}

        <Suspense fallback={<BookCarouselSkeleton />}>
          <Await promise={booksPromise}>
            {(books) => (
              <BookCarousel
                title="الإصدارات الجديدة"
                subtitle="طازجة من المطبعة — تم نشرها للتو"
                books={books}
                accentColor="oklch(0.52 0.15 250)"
              />
            )}
          </Await>
        </Suspense>

        {/*<div className="px-2">
          <QuoteSection />
        </div>*/}
      </div>
    </main>
  );
}
