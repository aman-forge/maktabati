import Image from "next/image";
import { ArrowRight, FileText, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface Article {
  id: string;
  type: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
}

interface OfficialList {
  id: string;
  title: string;
  bookCount: number;
  rank: number;
  cover: string;
}

interface FeaturedArticlesProps {
  articles?: Article[];
  officialLists?: OfficialList[];
}

export function FeaturedArticles({ articles = [], officialLists = [] }: FeaturedArticlesProps) {
  if (articles.length === 0 && officialLists.length === 0) return null;

  return (
    <section className="flex flex-col gap-14">
      {/* المقالات */}
      {articles.length > 0 && (
        <div className="flex flex-col gap-7">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText
                  className="w-4 h-4"
                  style={{ color: "var(--accent)" }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  من فوليو
                </span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                }}
              >
                مقالات ومميزات
              </h2>
            </div>
            <a
              href="#"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              جميع المقالات <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a
                key={article.id}
                href="#"
                className="group flex flex-col gap-4 rounded-2xl overflow-hidden transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 4px oklch(0 0 0 / 0.04)",
                }}
              >
                {/* صورة الغلاف */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "16/9" }}
                >
                  <Image
                    src={article.cover}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "oklch(0.1 0.02 40 / 0.3)" }}
                  />
                  <Badge
                    className="absolute top-3 left-3 text-[10px] px-2.5 py-0.5 font-semibold"
                    style={{
                      backgroundColor: "var(--badge-amber)",
                      color: "var(--badge-amber-fg)",
                    }}
                  >
                    {article.tag}
                  </Badge>
                </div>

                <div className="flex flex-col gap-2 px-5 pb-5">
                  <h3
                    className="text-sm font-bold leading-snug text-balance line-clamp-2 group-hover:underline underline-offset-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {article.title}
                  </h3>
                  <p
                    className="text-xs leading-relaxed line-clamp-2"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {article.author}
                    </span>
                    <span style={{ color: "var(--border)" }}>·</span>
                    <span
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)", opacity: 0.7 }}
                    >
                      {article.readTime}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {articles.length > 0 && officialLists.length > 0 && (
        <Separator style={{ backgroundColor: "var(--border)" }} />
      )}

      {/* القوائم الرسمية */}
      {officialLists.length > 0 && (
        <div className="flex flex-col gap-7">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <List className="w-4 h-4" style={{ color: "var(--accent)" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: "var(--accent)" }}
                >
                  من فوليو
                </span>
              </div>
              <h2
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--foreground)",
                }}
              >
                مميز في قوائمنا
              </h2>
            </div>
            <a
              href="#"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--accent)" }}
            >
              جميع القوائم <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {officialLists.map(({ id, title, bookCount, rank, cover }) => (
              <a
                key={id}
                href="#"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:-translate-y-0.5"
                style={{
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                {/* شارة الترتيب + صورة مصغرة */}
                <div className="relative shrink-0">
                  <div
                    className="relative w-14 rounded-xl overflow-hidden shadow-sm"
                    style={{ aspectRatio: "2/3" }}
                  >
                    <Image
                      src={cover}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div
                    className="absolute -top-2 -left-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: "var(--badge-amber)",
                      color: "var(--badge-amber-fg)",
                    }}
                  >
                    #{rank}
                  </div>
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <p
                    className="text-xs font-semibold leading-snug line-clamp-3 text-balance group-hover:underline underline-offset-2"
                    style={{ color: "var(--foreground)" }}
                  >
                    {title}
                  </p>
                  <p
                    className="text-[11px]"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {bookCount} كتاب
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
