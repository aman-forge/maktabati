import type { PublisherType } from "@/features/publisher/server/get-publisher";

import { BooksIcon } from "@phosphor-icons/react";

import { toAuthorSummary } from "@/features/books/lib/mappers";
import { AuthorCard } from "@/features/book/components/author-card";
import { BookCard } from "@/ui/components/book/book-card";

export function PublisherAbout({ publisher }: { publisher: PublisherType }) {
  const uniqueAuthors = Array.from(
    new Map(
      publisher.books.flatMap((book) =>
        book.bookAuthors.flatMap((ba) =>
          ba.author ? [[ba.author.id, ba.author] as const] : [],
        ),
      ),
    ).values(),
  ).map(toAuthorSummary);
  // Derive unique series from books
  const uniqueSeries = Array.from(
    new Map(
      publisher.books
        .filter((b) => b.series !== null)
        .map((b) => [b.series!.id, b.series!]),
    ).values(),
  );

  return (
    <div className="flex flex-col gap-10" dir="rtl">

      {/* ── Books ── */}
      {publisher.books.length > 0 && (
        <section>
          <SectionTitle>أشهر الكتب</SectionTitle>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4">
            {publisher.books.map((book) => (
              <div key={book.id} className="flex shrink-0 pt-1">
                <BookCard author book={book} size="lg" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Series ── */}
      {uniqueSeries.length > 0 && (
        <section>
          <SectionTitle>السلاسل</SectionTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {uniqueSeries.map((series) => {
              const bookCount = publisher.books.filter(
                (book) => book.series?.id === series.id,
              ).length;

              return (
                <div
                  key={series.id}
                  className="border-border flex gap-3 rounded-xl border p-4"
                >
                  <div className="bg-primary/10 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <BooksIcon className="text-primary size-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground text-sm font-medium">{series.name}</h3>
                    {series.description && (
                      <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                        {series.description}
                      </p>
                    )}
                    <p className="text-muted-foreground mt-2 text-xs">
                      {bookCount.toLocaleString("ar-EG")} كتب
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Authors ── */}
      {uniqueAuthors.length > 0 && (
        <section>
          <SectionTitle>المؤلفون</SectionTitle>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {uniqueAuthors.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </section>
      )}

      <div className="border-border border-t py-8" />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-foreground text-lg font-normal whitespace-nowrap">
        {children}
      </h2>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}