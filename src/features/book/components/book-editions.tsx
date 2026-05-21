import { Badge } from "@components/ui/badge";
import { BookOpenTextIcon, IdentificationCardIcon, TranslateIcon } from "@phosphor-icons/react";
import { useState } from "react";

import type { DetailedBookType } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

interface BookEditionsProps {
  book: DetailedBookType;
}

export function BookEditions({ book }: BookEditionsProps) {
  // TODO: Replace this current-book fallback with database-backed editions once an editions table exists.
  const editions = book.editions;
  const [selected, setSelected] = useState(editions[0]?.id ?? "");

  if (editions.length === 0) return null;

  return (
    <section dir="rtl" className="flex flex-col gap-4" id="editions">
      <div className="flex flex-col gap-1">
        <p className="text-muted-foreground text-xs tracking-wider uppercase">بيانات ببليوغرافية</p>
        <h2
          className="text-foreground text-2xl font-bold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          الإصدارات والطبعات
        </h2>
      </div>

      <div className="flex flex-col gap-2.5">
        {editions.map((edition) => {
          const {
            id,
            format,
            edition: editionName,
            publisher,
            publication,
            isbn,
            isbn13,
            language,
          } = edition;
          const isSelected = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setSelected(id)}
              className={cn(
                "group flex items-center gap-4 rounded-xl px-4 py-3.5 text-right transition-all border",
                isSelected
                  ? "border-primary bg-primary/8 shadow-[0_0_0_3px_hsl(var(--primary)/0.12)]"
                  : "border-border bg-card hover:border-border/70",
              )}
              aria-pressed={isSelected}
            >
              <div
                className={cn(
                  "size-10 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground",
                )}
              >
                <BookOpenTextIcon weight="duotone" className="h-5 w-5" />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-right">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-foreground text-sm font-semibold">
                    {format} - {editionName}
                  </span>
                  <Badge variant="outline" className="px-2 py-0 text-[10px] font-medium">
                    {publication}
                  </Badge>
                </div>
                <p className="text-muted-foreground text-xs font-medium">{publisher}</p>
                <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <TranslateIcon className="h-3 w-3" />
                    {language}
                  </span>
                  {isbn && (
                    <span className="inline-flex items-center gap-1">
                      <IdentificationCardIcon className="h-3 w-3" />
                      ISBN: {isbn}
                    </span>
                  )}
                  {isbn13 && <span>ISBN-13: {isbn13}</span>}
                  {edition.pageCount ? <span>{edition.pageCount} صفحة</span> : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
