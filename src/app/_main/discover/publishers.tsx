import {
  MagnifyingGlassIcon,
  SortAscendingIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@shadcn/select";
import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";

// TODO: replace later
function PublisherCard({ publisher }: { publisher: any }) {
  return <div className="p-4 border rounded-xl">{publisher.name}</div>;
}

const SORT_OPTIONS = [
  { value: "name-asc", label: "الاسم أ-ي" },
  { value: "name-desc", label: "الاسم ي-أ" },
  { value: "books", label: "عدد الكتب" },
] as const;

export const Route = createFileRoute("/_main/discover/publishers")({
  component: PublishersPage,
});

function PublishersPage() {
  const [q, setQ] = React.useState("");
  const [sort, setSort] = React.useState("name-asc");
  const [view, setView] = React.useState<"grid" | "list">("grid");

  const publishers: any[] = [];

  const isEmpty = publishers.length === 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3 space-y-2.5">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
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
                className="absolute left-3 top-1/2 -translate-y-1/2"
              >
                <XIcon className="size-4 text-muted-foreground" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-8 text-xs gap-1.5">
                <SortAscendingIcon className="size-3.5" />
              </SelectTrigger>
              <SelectContent>
                {SORT_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
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
              >
                Grid
              </Button>
              <Button
                size="sm"
                variant={view === "list" ? "default" : "outline"}
                onClick={() => setView("list")}
              >
                List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-6">
        {isEmpty ? (
          <div className="text-center py-24">
            <MagnifyingGlassIcon className="size-8 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground">لا توجد نتائج</p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {publishers.map((p) => (
              <PublisherCard key={p.id} publisher={p} />
            ))}
          </div>
        ) : (
          <div className="divide-y border rounded-xl">
            {publishers.map((p) => (
              <div key={p.id} className="p-4">
                <PublisherCard publisher={p} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
