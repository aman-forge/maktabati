import { BookDescription } from "@/features/book/components/book-description";
// import { BookEditions } from "@/components/book/book-editions"

// import { AuthorCard } from "@/components/book/author-card"
// import { ReadingActivity } from "@/components/book/reading-activity"
import { WriteReview } from "@/features/books/components/write-review";

import { Separator } from "@shadcn/separator";
import { createFileRoute } from "@tanstack/react-router";
import { BookHero } from "@/features/books/components/book-hero";
import { BookCarousel } from "@/features/discovery/components/book-carousel"; // Neon ()
import { BookReviews } from "@/features/book/components/book-reviews";
import { BookEditions } from "@/features/books/components/book-editions";
import { AuthorCard } from "@/features/books/components/author-card";
import { TrackBookModal } from "@/features/books/components/track-book-modal";
export const Route = createFileRoute("/_main/book/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <main
      className="min-h-screen font-sans"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Hero: cover, title, rating, meta */}
      <BookHero />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_340px] gap-14">
          {/* Left column: description, reviews, write-review */}
          <div className="flex flex-col gap-12 min-w-0">
            <BookDescription
              paragraphs={[
                "هذا كتاب يتحدث عن ...",
                "فقرة ثانية عن تفاصيل القصة...",
              ]}
              tags={["رواية", "تشويق"]}
            />
            <Separator style={{ backgroundColor: "var(--border)" }} />
            <WriteReview />
            <Separator style={{ backgroundColor: "var(--border)" }} />
            <BookReviews />
          </div>

          {/* Right sidebar: editions, author, activity */}
          <aside className="flex flex-col gap-10">
            <BookEditions />
            <AuthorCard />
            {/* <TrackBookModal /> */}
          </aside>
        </div>
      </div>
      {/* You might also like */}
      <div className="py-14 border-t" style={{ borderColor: "var(--border)" }}>
        <BookCarousel
          title="Readers Also Enjoyed"
          subtitle="Books loved by fans of The Ember Court"
          books={[]}
          accentColor="var(--badge-amber)"
          viewAllHref="#"
        />
      </div>
    </main>
  );
}
