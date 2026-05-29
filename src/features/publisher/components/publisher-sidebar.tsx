import type { PublisherType } from "@/features/publisher/server/get-publisher";

import { ArrowSquareOutIcon } from "@phosphor-icons/react";

export function PublisherSidebar({ publisher }: { publisher: PublisherType }) {
  const uniqueAuthorsCount = new Set(
    publisher.books.flatMap((book) =>
      book.bookAuthors.flatMap((ba) => (ba.author ? [ba.author.id] : [])),
    ),
  ).size;

  const uniqueSeriesCount = new Set(
    publisher.books.filter((b) => b.series).map((b) => b.series!.id),
  ).size;

  return (
    <div className="flex flex-col gap-6" dir="rtl">

      {/* ── Stats ── */}
      <div className="flex flex-col gap-3">
        <SidebarSectionTitle>إحصائيات</SidebarSectionTitle>
        <StatRow label="إجمالي الكتب" value={publisher.books.length} />
        {uniqueAuthorsCount > 0 && (
          <StatRow label="المؤلفون" value={uniqueAuthorsCount} />
        )}
        {uniqueSeriesCount > 0 && (
          <StatRow label="السلاسل" value={uniqueSeriesCount} />
        )}
      </div>

      {/* ── Details ── */}
      {publisher.website && (
        <div className="flex flex-col gap-3">
          <SidebarSectionTitle>معلومات</SidebarSectionTitle>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-sm">الموقع الإلكتروني</span>
            <a
              href={publisher.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground flex items-center gap-1 text-sm hover:underline"
            >
              {new URL(publisher.website).hostname}
              <ArrowSquareOutIcon className="size-3" />
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

function SidebarSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="text-foreground text-sm font-medium whitespace-nowrap">
        {children}
      </h3>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground text-sm font-medium tabular-nums">
        {value.toLocaleString("ar-EG")}
      </span>
    </div>
  );
}