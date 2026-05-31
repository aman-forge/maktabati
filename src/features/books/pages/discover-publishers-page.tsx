import {
  BooksIcon,
  BuildingsIcon,
  GlobeHemisphereEastIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
  SortAscendingIcon,
  SquaresFourIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@shadcn/avatar";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@shadcn/select";
import { useQuery } from "@tanstack/react-query";
import { getRouteApi, Link } from "@tanstack/react-router";
import * as React from "react";

import { DiscoverDirectorySkeleton } from "@/features/books/components/discover-directory-skeleton";
import { searchPublishers } from "@/features/books/server/publishers";
import type { PublisherListItem } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

const SORT_OPTIONS = [
  { value: "name-asc", label: "الاسم أ-ي" },
  { value: "name-desc", label: "الاسم ي-أ" },
  { value: "books", label: "عدد الكتب" },
] as const;

type PublisherSort = (typeof SORT_OPTIONS)[number]["value"];

const routeApi = getRouteApi("/_public/discover/publishers");

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function PublisherCard({
  publisher,
  view,
}: {
  publisher: PublisherListItem;
  view: "grid" | "list";
}) {
  return (
    <Link
      to="/publisher/$id"
      params={{ id: publisher.id }}
      className={cn(
        "group rounded-xl border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-sm",
        view === "list" && "flex items-center gap-4",
      )}
    >
      <Avatar className={cn("size-16 rounded-xl", view === "list" && "size-12")}>
        <AvatarImage src={publisher.logoUrl ?? undefined} alt={publisher.name} />
        <AvatarFallback className="rounded-xl">
          {publisher.logoUrl ? <BuildingsIcon /> : getInitials(publisher.name)}
        </AvatarFallback>
      </Avatar>
      <div className={cn("mt-3 flex min-w-0 flex-col gap-1", view === "list" && "mt-0 flex-1")}>
        <h2 className="text-foreground truncate text-sm font-semibold group-hover:underline">
          {publisher.name}
        </h2>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1 text-xs">
            <BooksIcon className="size-3" />
            {publisher.bookCount.toLocaleString("ar")} كتاب
          </Badge>
          {publisher.country ? (
            <span className="text-muted-foreground inline-flex items-center gap-1 text-xs">
              <GlobeHemisphereEastIcon className="size-3" />
              {publisher.country}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export function DiscoverPublishersPage() {
  const initialPublishers = routeApi.useLoaderData();
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState<PublisherSort>("name-asc");
  const [view, setView] = React.useState<"grid" | "list">("grid");
  const debouncedQ = React.useDeferredValue(q.trim());
  const publishersQuery = useQuery({
    queryKey: ["discover-publishers", debouncedQ, sort],
    queryFn: () => searchPublishers({ data: { q: debouncedQ || undefined, sort } }),
    initialData: debouncedQ || sort !== "name-asc" ? undefined : initialPublishers,
  });

  const publishers = publishersQuery.data ?? [];
  const isLoading =
    publishersQuery.isPending || (publishersQuery.isFetching && !publishersQuery.data);
  const isEmpty = publishers.length === 0;

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-background/95 sticky top-0 z-30 border-b backdrop-blur">
        <div className="container mx-auto space-y-2.5 px-4 py-3">
          <div className="relative">
            <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="ابحث عن دار نشر..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="pr-9"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                className="absolute top-1/2 left-3 -translate-y-1/2"
              >
                <XIcon className="text-muted-foreground size-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={(value) => setSort(value as PublisherSort)}>
              <SelectTrigger className="h-8 gap-1.5 text-xs">
                <SortAscendingIcon className="size-3.5" />
                {SORT_OPTIONS.find((option) => option.value === sort)?.label}
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex-1" />

            <div className="flex gap-1">
              <Button
                size="sm"
                variant={view === "grid" ? "default" : "outline"}
                onClick={() => setView("grid")}
                aria-label="عرض شبكي"
              >
                <SquaresFourIcon />
              </Button>
              <Button
                size="sm"
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
                aria-label="عرض قائمة"
              >
                <ListBulletsIcon />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6">
        {isLoading ? (
          <DiscoverDirectorySkeleton view={view} />
        ) : isEmpty ? (
          <div className="py-24 text-center">
            <MagnifyingGlassIcon className="text-muted-foreground/40 mx-auto mb-3 size-8" />
            <p className="text-muted-foreground text-sm">لا توجد نتائج</p>
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5"
                : "grid grid-cols-1 gap-3 md:grid-cols-2"
            }
          >
            {publishers.map((publisher) => (
              <PublisherCard key={publisher.id} publisher={publisher} view={view} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
