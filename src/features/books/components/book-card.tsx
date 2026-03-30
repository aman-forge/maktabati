import { Button } from "@components/ui/button";
import {
  BookOpenIcon,
  CheckIcon,
  PlusIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { BookWithAuthor } from "@/db/tables";
import { cn } from "@/ui/lib/utils";

interface BookCardProps {
  book: BookWithAuthor;
  size?: "sm" | "md" | "lg";
}

const DIMENSIONS = {
  sm: { card: "w-36", image: "h-52" },
  md: { card: "w-44", image: "h-64" },
  lg: { card: "w-52", image: "h-76" },
} as const;

export function BookCard({ book, size = "md" }: BookCardProps) {
  const [saved, setSaved] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dim = DIMENSIONS[size];

  return (
    <article
      dir="rtl"
      className={cn(
        "flex flex-col gap-3 shrink-0 group cursor-pointer",
        dim.card,
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${book.title} بقلم ${book.author?.name}`}
    >
      {/* Cover */}
      <div
        className={cn(
          "relative rounded-xl overflow-hidden shadow-md",
          dim.image,
        )}
        style={{
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          boxShadow: hovered
            ? "0 20px 40px hsl(var(--foreground) / 0.2)"
            : undefined,
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <img
          src={book.coverImageUrl || "not_found.png"}
          alt={`غلاف ${book.title}`}
          className="object-cover"
          sizes="(max-width: 768px) 144px, 176px"
        />

        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex flex-col justify-between p-3 transition-opacity duration-200"
          style={{
            background:
              "linear-gradient(to top, hsl(var(--background) / 0.92) 0%, hsl(var(--background) / 0) 55%)",
            opacity: hovered ? 1 : 0,
          }}
        >
          {/* Badge top-start (right in RTL) */}
          <div className="flex justify-start">
            {/*{book.badge && (
              <Badge className="text-[10px] px-2 py-0.5 font-medium bg-primary text-primary-foreground border-0">
                {book.badge}
              </Badge>
            )}*/}
          </div>

          {/* Bottom actions */}
          <div className="flex items-center justify-between gap-2">
            <Button
              size="sm"
              className="h-8 gap-1.5 text-xs rounded-lg flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <BookOpenIcon weight="bold" className="w-3.5 h-3.5" />
              التفاصيل
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className={cn(
                "h-8 w-8 rounded-lg shrink-0 transition-colors",
                saved &&
                  "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30",
              )}
              onClick={(e) => {
                e.stopPropagation();
                setSaved((s) => !s);
              }}
              aria-label={
                saved ? "إزالة من قائمة القراءة" : "إضافة إلى قائمة القراءة"
              }
            >
              {saved ? (
                <CheckIcon weight="bold" className="w-3.5 h-3.5" />
              ) : (
                <PlusIcon weight="bold" className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Book info */}
      <div className="flex flex-col gap-1 px-0.5">
        <h3 className="text-sm font-semibold leading-tight line-clamp-2 text-balance text-foreground">
          {book.title}
        </h3>
        <p className="text-xs leading-tight text-muted-foreground">
          {book?.author?.name}
        </p>

        <div className="flex items-center gap-1 mt-0.5">
          <StarIcon weight="fill" className="w-3 h-3 text-primary" />
          <span className="text-xs font-medium text-foreground">
            {book.pageCount}
          </span>
        </div>
      </div>
    </article>
  );
}
