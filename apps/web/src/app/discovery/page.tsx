import { HeroSection } from "@/components/discovery/hero-section";
import { BookCarousel } from "@/components/discovery/book-carousel";
import { GenreGrid } from "@/components/discovery/genre-grid";
import { FeaturedBanner } from "@/components/discovery/featured-banner";
import { QuoteSection } from "@/components/discovery/quote-section";
import { Book } from "@/components/book-card";

export const TRENDING_BOOKS: Book[] = [
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2024,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
    badge: "🔥 ساخن",
  },
  {
    id: "2",
    title: "خراب هادئ",
    author: "إليز مارشيتي",
    cover: "/book.png",
    rating: 4.5,
    ratingCount: "9.7k",
    genre: "الرواية الأدبية",
    pages: 288,
    year: 2024,
    description: "تأمل في الحزن والذاكرة على خلفية الساحل الإيطالي.",
  },
  {
    id: "3",
    title: "ساعات زجاجية",
    author: "آر. جيه. هارتويل",
    cover: "/book.png",
    rating: 4.3,
    ratingCount: "22.1k",
    genre: "إثارة",
    pages: 354,
    year: 2023,
    description: "إثارة نفسية متوترة حيث يكشف صانع ساعات عن مؤامرة قاتلة.",
    badge: "الأكثر مبيعًا",
  },
  {
    id: "4",
    title: "بلاط الجمر",
    author: "سيرفينا فال",
    cover: "/book.png",
    rating: 4.8,
    ratingCount: "34.5k",
    genre: "الفانتازيا",
    pages: 598,
    year: 2024,
    description:
      "السحر والمؤامرات البلاطية والنبوءة القديمة تتصادم في هذا الظهور الفانتازي الغني.",
    badge: "⭐ اختيار المحرر",
  },
  {
    id: "5",
    title: "صيف المياه المالحة",
    author: "كليو أدييمي",
    cover: "/book.png",
    rating: 4.2,
    ratingCount: "6.3k",
    genre: "رومانسية",
    pages: 304,
    year: 2024,
    description:
      "رومانسية بطيئة الاشتعال تتكشف خلال صيف مثالي واحد على جزيرة نائية.",
  },
  {
    id: "5",
    title: "صيف المياه المالحة",
    author: "كليو أدييمي",
    cover: "/book.png",
    rating: 4.2,
    ratingCount: "6.3k",
    genre: "رومانسية",
    pages: 304,
    year: 2024,
    description:
      "رومانسية بطيئة الاشتعال تتكشف خلال صيف مثالي واحد على جزيرة نائية.",
  },
  {
    id: "5",
    title: "صيف المياه المالحة",
    author: "كليو أدييمي",
    cover: "/book.png",
    rating: 4.2,
    ratingCount: "6.3k",
    genre: "رومانسية",
    pages: 304,
    year: 2024,
    description:
      "رومانسية بطيئة الاشتعال تتكشف خلال صيف مثالي واحد على جزيرة نائية.",
  },
  {
    id: "5",
    title: "صيف المياه المالحة",
    author: "كليو أدييمي",
    cover: "/book.png",
    rating: 4.2,
    ratingCount: "6.3k",
    genre: "رومانسية",
    pages: 304,
    year: 2024,
    description:
      "رومانسية بطيئة الاشتعال تتكشف خلال صيف مثالي واحد على جزيرة نائية.",
  },
  {
    id: "5",
    title: "صيف المياه المالحة",
    author: "كليو أدييمي",
    cover: "/book.png",
    rating: 4.2,
    ratingCount: "6.3k",
    genre: "رومانسية",
    pages: 304,
    year: 2024,
    description:
      "رومانسية بطيئة الاشتعال تتكشف خلال صيف مثالي واحد على جزيرة نائية.",
  },
  {
    id: "5",
    title: "صيف المياه المالحة",
    author: "كليو أدييمي",
    cover: "/book.png",
    rating: 4.2,
    ratingCount: "6.3k",
    genre: "رومانسية",
    pages: 304,
    year: 2024,
    description:
      "رومانسية بطيئة الاشتعال تتكشف خلال صيف مثالي واحد على جزيرة نائية.",
  },
];
export const NEW_RELEASES: Book[] = [
  {
    id: "6",
    title: "رسائل فيينا",
    author: "إيزادورا براندت",
    cover: "/book.png",
    rating: 4.6,
    ratingCount: "4.1k",
    genre: "رواية تاريخية",
    pages: 448,
    year: 2025,
    description:
      "رسائل سرية تكشف لغزًا يعود لقرن من الزمن عبر فيينا ما بعد الحرب.",
    badge: "جديد",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
    badge: "جديد",
  },
  {
    id: "8",
    title: "موسم الفراغ",
    author: "ميرا ثورنتون",
    cover: "/book.png",
    rating: 4.5,
    ratingCount: "5.6k",
    genre: "غموض",
    pages: 336,
    year: 2025,
    description:
      "محقق له ماضٍ مسكون يحقق في حالات اختفاء في وادٍ مغطى بالضباب.",
    badge: "جديد",
  },
  {
    id: "3",
    title: "ساعات زجاجية",
    author: "آر. جيه. هارتويل",
    cover: "/book.png",
    rating: 4.3,
    ratingCount: "22.1k",
    genre: "إثارة",
    pages: 354,
    year: 2025,
    description: "إثارة نفسية متوترة حيث يكشف صانع ساعات عن مؤامرة قاتلة.",
  },
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2025,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
  },
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2025,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
  },
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2025,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
  },
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2025,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
  },
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2025,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
  },
  {
    id: "1",
    title: "الفاصل النجمي",
    author: "نادية أوسي",
    cover: "/book.png",
    rating: 4.7,
    ratingCount: "18.2k",
    genre: "الخيال العلمي",
    pages: 412,
    year: 2025,
    description: "أوبرا فضائية ملحمية عن حضارتين على حافة صدع كوني.",
  },
];
export const STAFF_PICKS: Book[] = [
  {
    id: "4",
    title: "بلاط الجمر",
    author: "سيرفينا فال",
    cover: "/book.png",
    rating: 4.8,
    ratingCount: "34.5k",
    genre: "الفانتازيا",
    pages: 598,
    year: 2024,
    description:
      "السحر والمؤامرات البلاطية والنبوءة القديمة تتصادم في هذا الظهور الفانتازي الغني.",
    badge: "⭐ اختيار المحرر",
  },
  {
    id: "2",
    title: "خراب هادئ",
    author: "إليز مارشيتي",
    cover: "/book.png",
    rating: 4.5,
    ratingCount: "9.7k",
    genre: "الرواية الأدبية",
    pages: 288,
    year: 2024,
    description: "تأمل في الحزن والذاكرة على خلفية الساحل الإيطالي.",
  },
  {
    id: "8",
    title: "موسم الفراغ",
    author: "ميرا ثورنتون",
    cover: "/book.png",
    rating: 4.5,
    ratingCount: "5.6k",
    genre: "غموض",
    pages: 336,
    year: 2025,
    description:
      "محقق له ماضٍ مسكون يحقق في حالات اختفاء في وادٍ مغطى بالضباب.",
  },
  {
    id: "6",
    title: "رسائل فيينا",
    author: "إيزادورا براندت",
    cover: "/book.png",
    rating: 4.6,
    ratingCount: "4.1k",
    genre: "رواية تاريخية",
    pages: 448,
    year: 2025,
    description:
      "رسائل سرية تكشف لغزًا يعود لقرن من الزمن عبر فيينا ما بعد الحرب.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
  {
    id: "7",
    title: "كل جزء متحرك",
    author: "جيمس أوكافور",
    cover: "/book.png",
    rating: 4.4,
    ratingCount: "2.8k",
    genre: "مذكرات",
    pages: 256,
    year: 2025,
    description: "مذكرات صريحة عن العائلة والفشل والشجاعة للبدء من جديد.",
  },
];

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
