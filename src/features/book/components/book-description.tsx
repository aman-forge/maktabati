import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { CaretDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

const PREVIEW_LENGTH = 280;

interface BookDescriptionProps {
  paragraphs?: string[];
  tags?: string[];
}

export function BookDescription({
  paragraphs = [],
  tags = [],
}: BookDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (paragraphs.length === 0) return null;

  const previewText =
    paragraphs[0].slice(0, PREVIEW_LENGTH) +
    (paragraphs[0].length > PREVIEW_LENGTH ? "…" : "");

  return (
    <section dir="rtl" className="flex flex-col gap-6">
      <h2
        className="text-xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        عن هذا الكتاب
      </h2>

      <div className="flex flex-col gap-4">
        <div className="text-base leading-relaxed text-foreground/85">
          {expanded ? (
            paragraphs.map((para, i) => (
              <p key={para} className={i > 0 ? "mt-4" : ""}>
                {para}
              </p>
            ))
          ) : (
            <p>{previewText}</p>
          )}
        </div>

        {paragraphs.length > 1 || paragraphs[0].length > PREVIEW_LENGTH ? (
          <Button
            variant="ghost"
            className="self-start gap-1 px-1 text-sm font-medium hover:text-primary/80 bg-primary hover:bg-transparent"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "عرض أقل" : "اقرأ المزيد"}
            <CaretDownIcon
              weight="bold"
              className="w-4 h-4 transition-transform duration-200"
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </Button>
        ) : null}
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs px-3 py-1 rounded-full cursor-pointer border-border text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
