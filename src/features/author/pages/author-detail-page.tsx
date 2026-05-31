import { AuthorHero } from "@features/author/components/author-hero";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import { getRouteApi } from "@tanstack/react-router";

import { AuthorAbout } from "@/features/author/components/author-about";
import { AuthorBooks } from "@/features/author/components/author-books";
import { AuthorNews } from "@/features/author/components/author-news";
import { AuthorQuotes } from "@/features/author/components/author-quotes";
import { AuthorReviews } from "@/features/author/components/author-reviews";
import { AuthorSeries } from "@/features/author/components/author-series";
import { AuthorSidebar } from "@/features/author/components/author-sidebar";

const routeApi = getRouteApi("/_public/author/$id");

const TAB_CONFIG = [
  { value: "about", label: "نبذة" },
  { value: "books", label: "الكتب" },
  { value: "series", label: "السلاسل" },
  { value: "reviews", label: "المراجعات" },
  { value: "quotes", label: "الاقتباسات" },
  { value: "news", label: "أخبار وفعاليات" },
];
export function AuthorDetailPage() {
  const author = routeApi.useLoaderData();

  return (
    <main className="bg-background min-h-screen overflow-auto pb-12" dir="rtl">
      <AuthorHero author={author} />
      <div className="container mx-auto max-w-6xl overflow-hidden px-4 py-10 md:px-0">
        <Tabs defaultValue="about" dir="rtl">
          <TabsList
            variant="line"
            className="border-border mb-15 h-auto w-full flex-wrap justify-center gap-x-5 gap-y-5 p-0 sm:mb-8 md:mb-8 md:justify-start"
          >
            {TAB_CONFIG.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="text-muted-foreground relative rounded-none border-none bg-transparent px-4 pt-0 pb-3 text-sm font-medium whitespace-nowrap shadow-none"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="about">
            <div className="gap-10 lg:grid lg:grid-cols-[1fr_280px]">
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

          <TabsContent value="news">
            <AuthorNews author={author} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
