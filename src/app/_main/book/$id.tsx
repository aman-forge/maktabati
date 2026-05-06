import { Separator } from "@shadcn/separator";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { BookDescription } from "@/features/book/components/book-description";
import { BookReviews } from "@/features/book/components/book-reviews";
import { AuthorCard } from "@/features/books/components/author-card";
import { BookHero } from "@/features/books/components/book-hero";
import { TrackBookModal } from "@/features/books/components/track-book-modal";
import { WriteReview } from "@/features/books/components/write-review";
import { getBookById } from "@/features/books/server/get-books";
import { BookCarousel } from "@/features/marketing/components/book-carousel";

export const Route = createFileRoute("/_main/book/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const book = await getBookById({ data: params.id });
    if (!book) throw notFound();
    return book;
  },
});

function RouteComponent() {
  const book = Route.useLoaderData();

  return (
    <main className="min-h-screen font-sans" style={{ backgroundColor: "var(--background)" }}>
      {/* Hero: cover, title, rating, meta */}
      <BookHero book={book ?? undefined} />

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <div className="grid lg:grid-cols-[1fr_340px] gap-14">
          {/* Left column: description, reviews, write-review */}
          <div className="flex flex-col gap-12 min-w-0">
            <BookDescription
              paragraphs={book.description || "لا يوجد وصف"}
              tags={book.genres || ["لا يوجد تصنيف"]}
            />
            <Separator style={{ backgroundColor: "var(--border)" }} />
            {/* TODO: we should post informations to review table in database from this component. */}
            <WriteReview />
            <Separator style={{ backgroundColor: "var(--border)" }} />
            {/*  TODO: we have to implement the reviews component from database. */}
            <BookReviews />
          </div>

          {/* Right sidebar: editions, author, activity */}
          <aside className="flex flex-col gap-10">
            {/* <BookEditions /> */}
            <AuthorCard author={book.author ?? undefined} />
            {/*<TrackBookModal />*/}
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
