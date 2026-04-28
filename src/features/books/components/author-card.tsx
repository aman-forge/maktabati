import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon, BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { Link } from "@tanstack/react-router";
import { books, type Author, type Book } from "@/db/tables";
import { Badge } from "@/ui/components/ui/badge";

interface AuthorCardProps {
  author?: Author & { books: Book[] | null };
}
const author = {
  name: "محمد الشاعر",
  country: "سوريا",
  bio: " لقد عاش في بلد لكن لم يكن ما اراد كان يلعب ويمرح وكان مكان",
  books: "gfg",
  b: "شطرنج",
  tags: ["الأكثر مبيعًا", "جديد"],
  stats: [
    { label: "عدد الكتب المكتوبه", value: "320" },
    { label: "عمره", value: "55" },
    { label: "تقيم", value: "4.6" },
  ],
};
// export function AuthorCard({ author }: AuthorCardProps) {
// if (!author) return null;
export function AuthorCard() {
  return (
    <section id="author" dir="rtl" className="flex flex-col gap-6">
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

        <div className="px-6 pb-6">
          {/* Avatar + follow row */}
          <div className="flex items-end justify-between -mt-10 mb-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 ring-[3px] ring-card shadow-md">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sara"
                alt={author.name}
                className="object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl mb-0.5 bg-primary"
            >
              متابعة
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
                {author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{author.country}</p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6">
              {author.stats.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-lg font-extrabold text-foreground tabular-nums  ">
                    {value}
                  </span>
                  <span className="text-[12px] tracking-wider font-semibold text-muted-foreground/80">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {author.bio}
            </p>

            <div className="flex flex-wrap gap-2 mt-1">
              {author.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs rounded-full border-border text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-5 bg-border" />

          {/* Other books */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              أعمال أخرى للمؤلف
            </p>

            <div className="flex gap-3">
              {/* {author?.books?.map((b) => ( */}
              <Link
                key={"شطرنج"}
                to="/"
                className="group flex flex-col gap-1.5 shrink-0"
              >
                <div
                  className="relative w-14 rounded-lg overflow-hidden shadow-sm transition-shadow group-hover:shadow-md"
                  style={{ aspectRatio: "2/3" }}
                >
                  <img
                    src="/hero-book.png"
                    alt={`شرنج`}
                    // fill
                    className="object-cover"
                  />
                </div>
                <p className="text-[11px] leading-tight line-clamp-2 text-balance text-muted-foreground max-w-14">
                  {"شرنج"}
                </p>
              </Link>
              {/* ))} */}

              {/* "View all" slot */}
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
