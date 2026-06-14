import {
  ArrowLeftIcon,
  BooksIcon,
  BuildingsIcon,
  GlobeHemisphereEastIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { getPublisherById } from "@/features/books/server/publishers";
import { BookCard } from "@/ui/components/book/book-card";

export const Route = createFileRoute("/_public/publisher/$id")({
  component: PublisherPage,
  loader: async ({ params }) => {
    const publisher = await getPublisherById({ data: params.id });
    if (!publisher) throw notFound();
    return publisher;
  },
});

function PublisherPage() {
  const publisher = Route.useLoaderData();

  return (
    <main className="bg-background min-h-screen" dir="rtl">
      <section className="bg-muted/30 border-b">
        <div className="container mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="bg-background size-20 rounded-xl border">
              <AvatarImage src={publisher.logoUrl ?? undefined} alt={publisher.name} />
              <AvatarFallback className="rounded-xl">
                <BuildingsIcon className="size-8" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-muted-foreground mb-1 text-xs font-semibold tracking-widest uppercase">
                دار نشر
              </p>
              <h1 className="text-foreground truncate text-3xl font-bold">{publisher.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="gap-1">
                  <BooksIcon className="size-3.5" />
                  {publisher.bookCount.toLocaleString("ar")} كتاب
                </Badge>
                {publisher.country ? (
                  <span className="text-muted-foreground inline-flex items-center gap-1 text-sm">
                    <GlobeHemisphereEastIcon className="size-4" />
                    {publisher.country}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          {publisher.website ? (
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={publisher.website} target="_blank" rel="noreferrer" />}
            >
              الموقع الرسمي
            </Button>
          ) : null}
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">كتب الدار</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              أحدث الكتب المرتبطة بهذه الدار في مكتبة مكتبتي.
            </p>
          </div>
          <Button variant="ghost" nativeButton={false} render={<Link to="/discover/publishers" />}>
            العودة للدور
            <ArrowLeftIcon className="size-4" />
          </Button>
        </div>

        {publisher.books.length > 0 ? (
          <div className="grid grid-cols-2 justify-items-center gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {publisher.books.map((book) => (
              <BookCard key={book.id} book={book} size="md" />
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-xl border p-10 text-center">
            <BooksIcon className="text-muted-foreground/40 mx-auto mb-3 size-9" />
            <p className="text-sm font-medium">لا توجد كتب مرتبطة بهذه الدار بعد.</p>
            <p className="text-muted-foreground mt-1 text-sm">
              ستظهر هنا الكتب عند إضافتها إلى قاعدة البيانات.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
