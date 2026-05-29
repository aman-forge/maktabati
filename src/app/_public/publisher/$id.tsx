import { PublisherHero } from "@features/publisher/components/publisher-hero";
import { getPublisherById } from "@features/publisher/server/get-publisher";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { PublisherAbout } from "@features/publisher/components/publisher-about";
import { PublisherSidebar } from "@features/publisher/components/publisher-sidebar";

export const Route = createFileRoute("/_public/publisher/$id")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const publisher = await getPublisherById({ data: params.id });
    if (!publisher) throw notFound();
    return publisher;
  },
});

function RouteComponent() {
  const publisher = Route.useLoaderData();

  return (
    <main className="bg-background min-h-screen overflow-auto" dir="rtl">
      <PublisherHero publisher={publisher} />
      <div className="container mx-auto max-w-6xl overflow-hidden px-4 py-10 md:px-0">
        <div className="gap-10 lg:grid lg:grid-cols-[1fr_280px]">
          <PublisherAbout publisher={publisher} />
          <aside className="hidden lg:block">
            <PublisherSidebar publisher={publisher} />
          </aside>
        </div>
      </div>
    </main>
  );
}