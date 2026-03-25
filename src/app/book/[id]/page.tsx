import { notFound } from "next/navigation";
import { BookHero } from "@/components/book/book-hero";
import { BookDescription } from "@/components/book/book-description";
import { BookReviews } from "@/components/book/book-reviews";
import { AuthorCard } from "@/components/book/author-card";
import { WriteReview } from "@/components/book/write-review";
import { BookDetailsSidebar } from "@/components/book/book-details-sidebar";
import { FeaturedArticles } from "@/components/book/featured-articles";
import { MemberLists } from "@/components/book/member-lists";
import { BookCarousel } from "@/components/discovery/book-carousel";
import { Separator } from "@/components/ui/separator";
import {
  BOOKS,
  TRENDING_BOOKS,
  ARTICLES,
  OFFICIAL_LISTS,
  MEMBER_LISTS,
} from "@/data/books";

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(`BOOK ID: ${id}`);

  const book = BOOKS.find((b) => b.id === id);

  if (!book) {
    notFound();
  }

  return (
    <main className="min-h-screen font-sans bg-background">
      {/* Hero: blurred cover backdrop, title, tracker, meta */}
      <BookHero book={book} />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_320px] gap-14">
          {/* ── Left column ── */}
          <div className="flex flex-col gap-12 min-w-0">
            {/* Description + tags */}
            <BookDescription
              paragraphs={book.descriptionParagraphs}
              tags={book.descriptionTags}
            />

            <Separator style={{ backgroundColor: "var(--border)" }} />

            {/* Write a review */}
            <WriteReview />

            <Separator style={{ backgroundColor: "var(--border)" }} />

            {/* Community reviews */}
            <BookReviews reviews={book.reviews} />
          </div>

          {/* ── Right sidebar ── */}
          <aside className="flex flex-col gap-10">
            <AuthorCard author={book.authorDetails} />
            <BookDetailsSidebar
              details={book.sidebarDetails}
              otherEditions={book.otherEditions}
            />
          </aside>
        </div>
      </div>

      {/* Articles, Features & Official Lists */}
      <div
        className="border-t"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--secondary)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <FeaturedArticles
            articles={ARTICLES}
            officialLists={OFFICIAL_LISTS}
          />
        </div>
      </div>

      {/* Member curated lists */}
      <div className="border-t" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <MemberLists lists={MEMBER_LISTS} />
        </div>
      </div>

      {/* Readers Also Enjoyed carousel */}
      <div
        className="border-t py-14"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--secondary)",
        }}
      >
        <BookCarousel
          title="كتب نالت إعجاب القرّاء"
          subtitle="كتب أحبها محبو سلسلة الإمبراطورية الأخيرة"
          books={TRENDING_BOOKS}
          accentColor="var(--badge-amber)"
          viewAllHref="#"
        />
      </div>
    </main>
  );
}
