import { Separator } from "@shadcn/separator";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { getBookPageMock } from "@/features/book/book-page-mock";
import { AuthorCard } from "@/features/book/components/author-card";
import { BookDescription } from "@/features/book/components/book-description";
import { BookDetailsSidebar } from "@/features/book/components/book-details-sidebar";
import { BookEditions } from "@/features/book/components/book-editions";
import { FeaturedArticles } from "@/features/book/components/featured-articles";
import { BookHero } from "@/features/book/components/book-hero";
import { BookReviews } from "@/features/book/components/book-reviews";
import { MemberLists } from "@/features/book/components/member-lists";
import { WriteReview } from "@/features/book/components/write-review";
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
  const mock = getBookPageMock(book);
  const bookDetails = [
    {
      label: "السلسلة",
      value:
        book.series && (book.seriesPosition ?? null)
          ? `${book.series.name} – #${book.seriesPosition}`
          : (book.series?.name ?? ""),
    },
    {
      label: "الناشر",
      value: book.publisher?.name ?? "",
    },
    {
      label: "عدد الصفحات",
      value: book.pageCount ? `${book.pageCount} صفحة` : "",
    },
    {
      label: "سنة النشر",
      value: book.publicationYear?.toString() ?? "",
    },
    {
      label: "اللغة الأصلية",
      value:
        book.originalLanguage === "ar"
          ? "العربية"
          : book.originalLanguage === "eng"
            ? "الإنجليزية"
            : (book.originalLanguage ?? ""),
    },
    {
      label: "العنوان الأصلي",
      value: book.originalTitle ?? "",
    },
    {
      label: "المترجم",
      value: book.translator ?? "",
    },
    {
      label: "ISBN",
      value: book.isbn ?? "",
    },
    {
      label: "ISBN-13",
      value: book.isbn13 ?? "",
    },
    {
      label: "الموضوعات",
      value:
        book.topics && book.topics.length > 0 ? book.topics.join("، ") : "",
    },
  ].filter((field) => field.value && field.value.trim().length > 0);

  return (
    <main className="min-h-screen font-sans bg-background pb-6">
      <BookHero book={book ?? undefined} ratingSummary={mock.ratingSummary} />

      <div className="container mx-auto flex flex-col gap-8 px-4 md:px-0 py-12">
        <div className="lg:grid lg:grid-cols-[1fr_340px] gap-10 lg:gap-14">
          <div className="flex flex-col gap-10 min-w-0">
            <div className="lg:hidden">
              <BookDetailsSidebar details={bookDetails} otherEditions={[]} />
            </div>
            <BookDescription
              paragraphs={book.description || "لا يوجد وصف"}
              tags={book.genres || ["لا يوجد تصنيف"]}
            />
            <Separator className="bg-border" />
            <BookEditions editions={mock.editions} />
            <Separator className="bg-border" />
            <WriteReview />
            <Separator className="bg-border" />
            <BookReviews reviews={mock.reviews} />
          </div>

          <aside className="hidden lg:flex flex-col gap-10">
            <BookDetailsSidebar details={bookDetails} otherEditions={[]} />
            <AuthorCard author={book.author ?? undefined} />
          </aside>
        </div>
        <div className="py-8 border-t border-border flex flex-col gap-8">
          <MemberLists lists={mock.memberLists} />
          <Separator className="bg-border" />
        </div>
      </div>
      <BookCarousel
        title="قد يعجبك أيضا"
        // subtitle="Books loved by fans of The Ember Court"
        books={[book, book, book, book, book, book]}
        accentColor="var(--primary)"
        // viewAllHref="#"
      />
      <div className="container mx-auto flex flex-col gap-8 px-4 md:px-0 py-12">
        <FeaturedArticles
          articles={mock.featuredArticles}
          officialLists={mock.officialLists}
        />
      </div>
    </main>
  );
}
