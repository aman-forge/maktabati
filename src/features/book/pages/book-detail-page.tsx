import { Separator } from "@shadcn/separator";
import { getRouteApi } from "@tanstack/react-router";

import { AuthorCard } from "@/features/book/components/author-card";
import { BookDescription } from "@/features/book/components/book-description";
import { BookDetailsSidebar } from "@/features/book/components/book-details-sidebar";
import { BookEditions } from "@/features/book/components/book-editions";
import { BookHero } from "@/features/book/components/book-hero";
import { BookReviews } from "@/features/book/components/book-reviews";
import { BOOK_GENRES, BOOK_TOPICS } from "@/features/books/constants";
import { BookCarousel } from "@/features/marketing/components/book-carousel";

const routeApi = getRouteApi("/_public/book/$id");

const genreLabels = new Map(BOOK_GENRES.map((genre) => [genre.value, genre.label]));
const topicLabels = new Map(BOOK_TOPICS.map((topic) => [topic.value, topic.label]));

function getGenreLabel(value: string) {
  return genreLabels.get(value) ?? value;
}

function getTopicLabel(value: string) {
  return topicLabels.get(value) ?? value;
}

export function BookDetailPage() {
  const book = routeApi.useLoaderData();
  const genreTags =
    book.genres && book.genres.length > 0 ? book.genres.map(getGenreLabel) : ["لا يوجد تصنيف"];
  const translatorNames = book.translators.map((translator) => translator.name).join("، ");
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
      value: translatorNames,
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
      value: book.topics && book.topics.length > 0 ? book.topics.map(getTopicLabel).join("، ") : "",
    },
  ].filter((field) => field.value && field.value.trim().length > 0);

  return (
    <main className="bg-background min-h-screen pb-6 font-sans">
      <BookHero book={book} ratingSummary={book.ratingSummary} />

      <div className="container mx-auto flex flex-col gap-8 px-4 py-12 md:px-0">
        <div className="gap-10 lg:grid lg:grid-cols-[1fr_340px] lg:gap-14">
          <div className="flex min-w-0 flex-col gap-10">
            <div className="lg:hidden">
              <BookDetailsSidebar details={bookDetails} otherEditions={[]} />
            </div>
            <BookDescription paragraphs={book.description || "لا يوجد وصف"} tags={genreTags} />
            <Separator className="bg-border" />
            <BookEditions book={book} />
            <Separator className="bg-border" />
            <BookReviews reviews={book.reviews} />
          </div>

          <aside className="hidden flex-col gap-10 lg:flex">
            <BookDetailsSidebar details={bookDetails} otherEditions={[]} />
            <AuthorCard author={book.primaryAuthor} />
          </aside>
        </div>
      </div>
      {book.relatedBooks.length > 0 && (
        <BookCarousel
          title="قد يعجبك أيضا"
          books={book.relatedBooks}
          accentColor="var(--primary)"
        />
      )}
    </main>
  );
}
