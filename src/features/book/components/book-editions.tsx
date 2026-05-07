import { Badge } from "@components/ui/badge";
import { BookOpenTextIcon, IdentificationCardIcon, TranslateIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { BibliographicEdition } from "@/features/book/book-page-mock";
import { cn } from "@/ui/lib/utils";

interface BookEditionsProps {
  editions: BibliographicEdition[];
}

export function BookEditions({ editions }: BookEditionsProps) {
  const [selected, setSelected] = useState(editions[0]?.id ?? "");

  if (editions.length === 0) return null;

  return (
    <section dir="rtl" className="flex flex-col gap-4" id="editions">
      <div className="flex flex-col gap-1">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">بيانات ببليوغرافية</p>
        <h2
          className="text-2xl font-bold text-foreground"
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
                <BookOpenTextIcon weight="duotone" className="w-5 h-5" />
              </div>

              <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-right">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {format} - {editionName}
                  </span>
                  <Badge variant="outline" className="text-[10px] px-2 py-0 font-medium">
                    {publication}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground font-medium">{publisher}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[11px] text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <TranslateIcon className="w-3 h-3" />
                    {language}
                  </span>
                  {isbn && (
                    <span className="inline-flex items-center gap-1">
                      <IdentificationCardIcon className="w-3 h-3" />
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
