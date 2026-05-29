import type { PublisherType } from "@/features/publisher/server/get-publisher";

import { ArrowSquareOutIcon } from "@phosphor-icons/react";

import { cn } from "@/ui/lib/utils";

export function PublisherHero({ publisher }: { publisher: PublisherType }) {
  const initials = publisher.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  const uniqueAuthorsCount = new Set(
    publisher.books.flatMap((book) =>
      book.bookAuthors.flatMap((ba) => (ba.author ? [ba.author.id] : [])),
    ),
  ).size;

  const uniqueSeriesCount = new Set(
    publisher.books.filter((b) => b.series).map((b) => b.series!.id),
  ).size;

  const stats = [
    { num: publisher.books.length, label: "كتاب" },
    { num: uniqueAuthorsCount, label: "مؤلف" },
    { num: uniqueSeriesCount, label: "سلسلة" },
  ].filter((s) => s.num > 0);

  return (
    <div className="w-full" dir="rtl">
      {/* ── Banner ── */}
      <div className="relative h-48 w-full overflow-hidden bg-linear-to-bl from-slate-900 via-slate-800 to-slate-700 md:h-60">
        {/* subtle grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* bottom fade so avatar floats cleanly */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent"
        />
      </div>

      {/* ── Profile row ── */}
      <div className="bg-background border-border border-b">
        <div className="container mx-auto max-w-6xl px-4 md:px-0">
          {/* Avatar + actions */}
          <div className="flex items-end justify-between gap-4 pb-4">
            {/* Avatar — overlaps banner */}
            <div className="relative -mt-11 shrink-0">
              <div
                className={cn(
                  "border-background bg-muted flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-[3px] text-xl font-semibold tracking-tight shadow-lg",
                  "md:h-24 md:w-24 md:text-2xl",
                )}
              >
                {publisher.logoUrl ? (
                  <img
                    src={publisher.logoUrl}
                    alt={publisher.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-foreground/70 select-none">
                    {initials}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 pt-3">
              {publisher.website && (
                <a
                  href={publisher.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-muted-foreground hover:bg-muted flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors"
                >
                  <ArrowSquareOutIcon className="size-3.5" />
                  الموقع
                </a>
              )}
            </div>
          </div>

          {/* Name */}
          <div className="pb-5">
            <h1 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
              {publisher.name}
            </h1>
          </div>
        </div>

        {/* ── Stats bar ── */}
        {stats.length > 0 && (
          <div className="border-border border-t">
            <div
              className={cn(
                "container mx-auto max-w-6xl divide-x divide-x-reverse px-4 md:px-0",
                stats.length === 3 && "grid grid-cols-3",
                stats.length === 2 && "grid grid-cols-2",
                stats.length === 1 && "grid grid-cols-1",
              )}
            >
              {stats.map(({ num, label }) => (
                <div key={label} className="flex flex-col items-center py-3">
                  <span className="text-foreground text-base font-semibold tabular-nums md:text-lg">
                    {num.toLocaleString("ar-EG")}
                  </span>
                  <span className="text-muted-foreground mt-0.5 text-xs">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}