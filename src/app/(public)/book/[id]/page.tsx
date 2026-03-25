import { Separator } from "@components/ui/separator";
import { AuthorCard } from "@features/books/components/author-card";
import { BookDescription } from "@features/books/components/book-description";
import { BookDetailsSidebar } from "@features/books/components/book-details-sidebar";
import { BookHero } from "@features/books/components/book-hero";
import { BookReviews } from "@features/books/components/book-reviews";
import { FeaturedArticles } from "@features/books/components/featured-articles";
import { MemberLists } from "@features/books/components/member-lists";
import { WriteReview } from "@features/books/components/write-review";
import {
  ARTICLES,
  BOOKS,
  MEMBER_LISTS,
  OFFICIAL_LISTS,
  TRENDING_BOOKS,
} from "@features/books/types";
import { BookCarousel } from "@features/discovery/components/book-carousel";
import { notFound } from "next/navigation";

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
        />
      </div>
    </main>
  );
}
