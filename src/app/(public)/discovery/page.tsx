import { BookCarousel } from "@features/discovery/components/book-carousel";
import { FeaturedBanner } from "@features/discovery/components/featured-banner";
import { GenreGrid } from "@features/discovery/components/genre-grid";
import { HeroSection } from "@features/discovery/components/hero-section";
import { QuoteSection } from "@features/discovery/components/quote-section";
import { NEW_RELEASES, STAFF_PICKS, TRENDING_BOOKS } from "../page";

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
        />

        {/* Staff Picks */}
        <BookCarousel
          title="اختيارات الفريق"
          subtitle="تم اختيارها بعناية من قبل محررينا لرواية قصص استثنائية"
          books={STAFF_PICKS}
          accentColor="oklch(0.55 0.14 140)"
        />

        {/* Featured book of the month */}
        <FeaturedBanner />

        {/* New Releases */}
        <BookCarousel
          title="الإصدارات الجديدة"
          subtitle="طازجة من المطبعة — تم نشرها للتو"
          books={NEW_RELEASES}
          accentColor="oklch(0.52 0.15 250)"
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
