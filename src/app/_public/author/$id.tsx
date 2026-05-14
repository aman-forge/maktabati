import { AuthorHero } from "@features/author/components/author-hero";
import { getAuthorById } from "@features/author/server/get-author";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { AuthorAbout } from "@/features/author/components/author-about";
import { AuthorBooks } from "@/features/author/components/author-books";
import { AuthorNews } from "@/features/author/components/author-news";
import { AuthorQuotes } from "@/features/author/components/author-quotes";
import { AuthorReviews } from "@/features/author/components/author-reviews";
import { AuthorSeries } from "@/features/author/components/author-series";
import { AuthorSidebar } from "@/features/author/components/author-sidebar";
import { AuthorSimilar } from "@/features/author/components/author-similar";

export const Route = createFileRoute("/_public/author/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const author = await getAuthorById({ data: params.id });
    if (!author) throw notFound();
    return author;
  },
});

const TAB_CONFIG = [
  { value: "about", label: "نبذة" },
  { value: "books", label: "الكتب" },
  { value: "series", label: "السلاسل" },
  { value: "reviews", label: "المراجعات" },
  { value: "quotes", label: "الاقتباسات" },
  { value: "similar", label: "مؤلفون مشابهون" },
  { value: "news", label: "أخبار وفعاليات" },
];
function RouteComponent() {
  const author = Route.useLoaderData();

  return (
    <main className="min-h-screen font-sans bg-background pb-12" dir="rtl">
      <AuthorHero author={author} />

      <div className="container mx-auto px-4 md:px-0 py-10 max-w-6xl">
        <Tabs defaultValue="about" dir="rtl">
          <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0 h-auto mb-8  flex-nowrap">
            {TAB_CONFIG.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="rounded border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3 pt-0 text-sm font-medium text-muted-foreground data-[state=active]:text-primary whitespace-nowrap"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="about">
            <div className="lg:grid lg:grid-cols-[1fr_280px] gap-10">
              <AuthorAbout author={author} />
              <aside className="hidden lg:block">
                <AuthorSidebar author={author} />
              </aside>
            </div>
          </TabsContent>

          <TabsContent value="books">
            <AuthorBooks author={author} />
          </TabsContent>

          <TabsContent value="series">
            <AuthorSeries author={author} />
          </TabsContent>

          <TabsContent value="reviews">
            <AuthorReviews author={author} />
          </TabsContent>

          <TabsContent value="quotes">
            <AuthorQuotes author={author} />
          </TabsContent>

          <TabsContent value="similar">
            <AuthorSimilar author={author} />
          </TabsContent>

          <TabsContent value="news">
            <AuthorNews author={author} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
