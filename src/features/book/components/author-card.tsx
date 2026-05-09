import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon, BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@tanstack/react-router";
import type { BookType } from "../../books/server/get-books";

interface AuthorCardProps {
  author?: NonNullable<BookType>["author"];
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null;
  const stats = [
    { label: "مواليد", value: author.birthYear || "لا يوجد" },
    { label: "عدد الكتب", value: author.totalBooks },
    { label: "المتابعين", value: "403.609" },
  ];
  return (
    <section id="author" dir="rtl" className="flex flex-col gap-6 sticky top-6">
      <h2
        className="text-xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        عن المؤلف
      </h2>

      <div className="rounded-2xl overflow-hidden bg-card border border-border">
        {/* Banner */}
        <div className="h-20 relative bg-primary overflow-hidden">
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
          <div className="flex items-end justify-between -mt-10 mb-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 ring-[3px] ring-card shadow-md">
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
              <ArrowLeftIcon weight="bold" className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Name, location, stats, bio, tags */}
          <div className="flex flex-col gap-4">
            <div>
              <h3
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {author.name || "لا يوجد"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {author.nationality || "لا يوجد"}
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {stats.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-[12px] tracking-wider font-semibold text-muted-foreground/80">
                    {label}
                  </span>
                  <span className="text-lg font-semibold text-foreground tabular-nums  ">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground text-justify line-clamp-6">
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

          <Separator className="my-5 bg-border" />

          {/* Other books */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              أعمال أخرى للمؤلف
            </p>

            <div className="flex gap-3 w-full justify-between">
              {author?.books?.map((b) => {
                return (
                  <Link
                    key={b.id}
                    to={"/book/$id"}
                    params={{ id: b.id }}
                    className="group flex flex-col gap-1.5 shrink-0"
                  >
                    <img
                      className="aspect-3/4 object-cover relative w-14 rounded-lg overflow-hidden shadow-sm transition-shadow group-hover:shadow-md"
                      src={b.coverImageUrl || "/books/نهج الملوك.png"}
                      alt={b.title || "لا يوجد"}
                    />
                    <p className="text-[11px] leading-tight line-clamp-2 text-balance text-muted-foreground max-w-14">
                      {b.title || "لا يوجد"}
                    </p>
                  </Link>
                );
              })}
              {/* "View all" slot */}
              {/* TODO: we should make author`s book page */}
              <Link
                to="/"
                className="flex flex-col items-center gap-1.5 w-14 shrink-0"
              >
                <div
                  className="w-14 rounded-lg flex items-center justify-center bg-secondary border border-dashed border-border text-muted-foreground transition-colors hover:text-foreground"
                  style={{ aspectRatio: "2/3" }}
                >
                  <BookOpenIcon className="w-5 h-5" />
                </div>
                <p className="text-[11px] leading-tight text-center text-muted-foreground">
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
