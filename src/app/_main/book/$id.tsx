// import { BookHero } from "@/components/book/book-hero"
// import { BookDescription } from "@/components/book/book-description"
// import { BookEditions } from "@/components/book/book-editions"
// import { BookReviews } from "@/components/book/book-reviews"
// import { AuthorCard } from "@/components/book/author-card"
// import { ReadingActivity } from "@/components/book/reading-activity"
// import { WriteReview } from "@/components/book/write-review"

import { Separator } from "@shadcn/separator";
import { createFileRoute } from "@tanstack/react-router";
import { BookHero } from "@/features/books/components/book-hero";
import { BookCarousel } from "@/features/marketing/components/book-carousel"; // Neon ()

export const Route = createFileRoute("/_main/book/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "var(--background)" }}>
      {/* Hero: cover, title, rating, meta */}
      <BookHero />
      HELLLOOO
      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_340px] gap-14">
          {/* Left column: description, reviews, write-review */}
          <div className="flex flex-col gap-12 min-w-0">
            {/*<BookDescription />*/}
            <Separator style={{ backgroundColor: "var(--border)" }} />
            {/*<WriteReview />*/}
            <Separator style={{ backgroundColor: "var(--border)" }} />
            {/*<BookReviews />*/}
          </div>

          {/* Right sidebar: editions, author, activity */}
          <aside className="flex flex-col gap-10">
            {/*<BookEditions />
            <AuthorCard />
            <ReadingActivity />*/}
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
