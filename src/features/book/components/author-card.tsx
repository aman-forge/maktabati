import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon, BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@tanstack/react-router";

import { DetailedBookType } from "@/features/books/types";

interface AuthorCardProps {
  author?: NonNullable<DetailedBookType>["author"];
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null;
  const stats = [
    { label: "مواليد", value: author.birthYear || "لا يوجد" },
    { label: "عدد الكتب", value: author.totalBooks },
    { label: "المتابعين", value: "403.609" },
  ];
  return (
    <section id="author" dir="rtl" className="sticky top-6 flex flex-col gap-6">
      <h2
        className="text-foreground text-xl font-bold"
        style={{ fontFamily: "var(--font-display)" }}
      >
        عن المؤلف
      </h2>

      <div className="bg-card border-border overflow-hidden rounded-2xl border">
        {/* Banner */}
        <div className="bg-primary relative h-20 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, hsl(var(--primary) / 0.6) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="px-2 pb-6">
          {/* Avatar + follow row */}
          <div className="-mt-10 mb-5 flex items-end justify-between">
            <div className="ring-card relative h-20 w-20 shrink-0 overflow-hidden rounded-full shadow-md ring-[3px]">
              <img
                src={author.profileImage || "/books/نهج الملوك.png"}
                alt={author.name || "لا يوجد"}
                className="object-cover"
              />
            </div>
            <Button
              variant="default"
              size="default"
              // className="gap-1.5 rounded-xl mt-0.5 bg-primary"
            >
              معرفة المزيد
              <ArrowLeftIcon weight="bold" className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Name, location, stats, bio, tags */}
          <div className="flex flex-col gap-4">
            <div>
              <h3
                className="text-foreground text-lg font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {author.name || "لا يوجد"}
              </h3>
              <p className="text-muted-foreground text-sm">{author.nationality || "لا يوجد"}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {stats.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-muted-foreground/80 text-[12px] font-semibold tracking-wider">
                    {label}
                  </span>
                  <span className="text-foreground text-lg font-semibold tabular-nums">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground line-clamp-6 text-justify text-xs leading-relaxed">
              {author.bio || "لا يوجد"}
            </p>

            {/*<div className="flex flex-wrap gap-2 mt-1">
              {author.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs rounded-full border-border text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>*/}
          </div>

          <Separator className="bg-border my-5" />

          {/* Other books */}
          <div className="flex flex-col gap-3">
            <p className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              أعمال أخرى للمؤلف
            </p>

            <div className="flex w-full justify-between gap-3">
              {author?.books?.map((b) => {
                return (
                  <Link
                    key={b.id}
                    to={"/book/$id"}
                    params={{ id: b.id }}
                    className="group flex shrink-0 flex-col gap-1.5"
                  >
                    <img
                      className="relative aspect-3/4 w-14 overflow-hidden rounded-lg object-cover shadow-sm transition-shadow group-hover:shadow-md"
                      src={b.coverImageUrl || "/books/نهج الملوك.png"}
                      alt={b.title || "لا يوجد"}
                    />
                    <p className="text-muted-foreground line-clamp-2 max-w-14 text-[11px] leading-tight text-balance">
                      {b.title || "لا يوجد"}
                    </p>
                  </Link>
                );
              })}
              {/* "View all" slot */}
              {/* TODO: we should make author`s book page */}
              <Link to="/" className="flex w-14 shrink-0 flex-col items-center gap-1.5">
                <div
                  className="bg-secondary border-border text-muted-foreground hover:text-foreground flex w-14 items-center justify-center rounded-lg border border-dashed transition-colors"
                  style={{ aspectRatio: "2/3" }}
                >
                  <BookOpenIcon className="h-5 w-5" />
                </div>
                <p className="text-muted-foreground text-center text-[11px] leading-tight">
                  عرض الكل
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
