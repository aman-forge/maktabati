import { CaretDownIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { useState } from "react";
import { cn } from "@/ui/lib/utils";

interface BookDescriptionProps {
  paragraphs?: string;
  tags?: string[];
}

export function BookDescription({ paragraphs = "", tags = [] }: BookDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  if (!paragraphs) return null;

  // Split string into array by new lines to render actual paragraphs
  const contentParagraphs = paragraphs.split("\n").filter((p) => p.trim() !== "");

  return (
    <section dir="rtl" className="flex flex-col gap-6">
      <h2
        className="text-2xl font-bold text-foreground tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        عن هذا الكتاب
      </h2>

      <div className="relative flex flex-col gap-2">
        <div
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden text-base leading-relaxed text-foreground/85",
            !expanded ? "max-h-60 relative" : "max-h-500",
          )}
        >
          <div className="flex flex-col gap-4">
            {contentParagraphs.map((para, index) => (
              <p key={index.toString()}>{para}</p>
            ))}
          </div>

          {/* Fade overlay when collapsed */}
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent" />
          )}
        </div>

        <Button
          variant="ghost"
          className="self-start mt-2 gap-2 "
          onClick={() => setExpanded(!expanded)}
        >
          <span className="font-bold">{expanded ? "عرض أقل" : "اقرأ المزيد"}</span>
          <CaretDownIcon
            weight="bold"
            className={cn("w-4 h-4 transition-transform duration-300", expanded && "rotate-180")}
          />
        </Button>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-lg h-8 px-3">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </section>
  );
}
