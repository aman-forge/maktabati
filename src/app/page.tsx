import { HeroSection } from "@/components/discovery/hero-section";
import { BookCarousel } from "@/components/discovery/book-carousel";
import { GenreGrid } from "@/components/discovery/genre-grid";
import { FeaturedBanner } from "@/components/discovery/featured-banner";
import { QuoteSection } from "@/components/discovery/quote-section";
import { TRENDING_BOOKS, NEW_RELEASES, STAFF_PICKS } from "@/data/books";

export { TRENDING_BOOKS, NEW_RELEASES, STAFF_PICKS };

export default function DiscoveryPage() {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <HeroSection />

      {/* Main content feed */}
      <div className="flex flex-col gap-16 py-16">
        {/* Trending Now */}
        <BookCarousel
          title="الرائج الآن"
          subtitle="ما لا يستطيع القراء تركه هذا الأسبوع"
          books={TRENDING_BOOKS}
          accentColor="var(--badge-amber)"
          viewAllHref="#"
        />

        {/* Staff Picks */}
        <BookCarousel
          title="اختيارات الفريق"
          subtitle="تم اختيارها بعناية من قبل محررينا لرواية قصص استثنائية"
          books={STAFF_PICKS}
          accentColor="oklch(0.55 0.14 140)"
          viewAllHref="#"
        />

        {/* Featured book of the month */}
        <FeaturedBanner />

        {/* New Releases */}
        <BookCarousel
          title="الإصدارات الجديدة"
          subtitle="طازجة من المطبعة — تم نشرها للتو"
          books={NEW_RELEASES}
          accentColor="oklch(0.52 0.15 250)"
          viewAllHref="#"
        />

        {/* Quote break */}
        <div className="px-2">
          <QuoteSection />
        </div>

        {/* Browse by Genre */}
        <GenreGrid />
      </div>
    </main>
  );
}
