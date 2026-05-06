import { Await } from "@tanstack/react-router";
import { Suspense } from "react";
import type { getBooks } from "@/features/books/server/get-books";
import {
  BookCarousel,
  BookCarouselSkeleton,
} from "@/features/marketing/components/book-carousel";
import { GenreGrid } from "@/features/marketing/components/genre-grid";
import { HeroSection } from "@/features/marketing/components/hero-section";

function MarketingHome({
  booksPromise,
}: {
  booksPromise: ReturnType<typeof getBooks>;
}) {
  return (
    <main className="min-h-screen font-sans">
      <HeroSection />

      <div className="flex flex-col gap-0">
        <div className="py-14">
          <Suspense fallback={<BookCarouselSkeleton />}>
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
        </div>

        <SectionDivider />

        <div className="py-14">
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
        </div>

        <SectionDivider label="التصنيفات" />

        <div className="py-14">
          <GenreGrid />
        </div>

        <SectionDivider />

        <div className="py-14">
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
        </div>
      </div>
    </main>
  );
}

function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 px-8 lg:px-16 opacity-40">
      <div className="h-px flex-1 bg-border" />
      {label && (
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-border" />
    </div>
  );
}

export default MarketingHome;
