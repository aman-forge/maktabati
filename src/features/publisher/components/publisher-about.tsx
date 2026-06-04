import type { PublisherType } from "@/features/publisher/server/get-publisher";

import { BookOpenIcon, BooksIcon } from "@phosphor-icons/react";

import { BookCard } from "@/ui/components/book/book-card";

const DEFAULT_TAGLINE = "نشر الفكر · إحياء الكلمة · بناء المعرفة";

// Dev-only previews — real DB values always win via ?? below
const DEMO_TAGLINE = "نشر الفكر العربي · إحياء التراث · بناء المعرفة";
const DEMO_DESCRIPTION =
  "دار نشر عربية رائدة تُعنى بإصدار الأعمال الأدبية والفكرية والتراثية، وتسعى لربط القارئ العربي بأفضل ما كُتب من رواية وشعر وتاريخ وفلسفة، مع التزام بمعايير التحرير والتصميم العالية.";

export function PublisherAbout({ publisher }: { publisher: PublisherType }) {
  const p = publisher as PublisherType & {
    tagline?: string;
    description?: string;
  };

  const isDev = import.meta.env.DEV;
  const tagline = p.tagline ?? (isDev ? DEMO_TAGLINE : undefined);
  const description = p.description ?? (isDev ? DEMO_DESCRIPTION : undefined);

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

      {/* ── About ── */}
      <section>
        <SectionTitle>عن الدار</SectionTitle>
        <p className="text-foreground/80 text-sm leading-relaxed font-light">
          {description ?? tagline ?? DEFAULT_TAGLINE}
        </p>
      </section>

      {/* ── Books ── */}
      {publisher.books.length > 0 && (
        <section id="books">
          <SectionTitle
            action={
              <a
                href="#books"
                className="border-border/60 bg-background/40 hover:bg-background/70 flex shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors"
              >
                <BookOpenIcon className="size-3.5" />
                <span className="hidden sm:inline">استكشف الكتب</span>
                <span className="sm:hidden">الكتب</span>
              </a>
            }
          >
            أشهر الكتب
          </SectionTitle>
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
                      {bookCount.toLocaleString("ar-US")} كتب
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function SectionTitle({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-foreground text-lg font-normal whitespace-nowrap">
        {children}
      </h2>
      <div className="bg-border h-px flex-1" />
      {action}
    </div>
  );
}