import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon, FileTextIcon, ListIcon } from "@phosphor-icons/react/dist/ssr";
import type { FeaturedArticleItem, OfficialListItem } from "@/features/book/book-page-mock";

interface FeaturedArticlesProps {
  articles?: FeaturedArticleItem[];
  officialLists?: OfficialListItem[];
}

export function FeaturedArticles({ articles = [], officialLists = [] }: FeaturedArticlesProps) {
  if (articles.length === 0 && officialLists.length === 0) return null;

  return (
    <section className="flex flex-col gap-12" dir="rtl" id="articles">
      {articles.length > 0 && (
        <div className="flex flex-col gap-7">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileTextIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  من فوليو
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                مقالات ومميزات
              </h2>
            </div>
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-70"
            >
              جميع المقالات <ArrowLeftIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {articles.map((article) => (
              <a key={article.id} href="/" className="group">
                <Card className="overflow-hidden rounded-2xl border-border transition-all group-hover:-translate-y-0.5">
                  <div className="relative w-full overflow-hidden aspect-video">
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/70 to-transparent" />
                    <Badge className="absolute top-3 right-3 text-[10px] px-2.5 py-0.5 font-semibold">
                      {article.tag}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm leading-snug text-balance line-clamp-2 group-hover:underline underline-offset-2">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs leading-relaxed line-clamp-2 text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="font-medium">{article.author}</span>
                      <span>·</span>
                      <span>{article.readTime}</span>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {articles.length > 0 && officialLists.length > 0 && <Separator className="bg-border" />}

      {officialLists.length > 0 && (
        <div className="flex flex-col gap-7">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ListIcon className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  من فوليو
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                مميز في قوائمنا الرسمية
              </h2>
            </div>
            <a
              href="/"
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-70"
            >
              جميع القوائم <ArrowLeftIcon className="w-4 h-4" />
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {officialLists.map(({ id, title, bookCount, rank, cover }) => (
              <a key={id} href="/" className="group">
                <Card className="rounded-2xl border-border transition-all group-hover:-translate-y-0.5">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="relative shrink-0">
                      <div className="relative w-14 rounded-xl overflow-hidden shadow-sm aspect-2/3">
                        <img src={cover} alt={title} className="object-cover" />
                      </div>
                      <div className="absolute -top-2 -left-2 size-5 rounded-full flex items-center justify-center text-[10px] font-bold bg-secondary text-secondary-foreground">
                        #{rank}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="text-xs font-semibold leading-snug line-clamp-3 text-balance group-hover:underline underline-offset-2 text-foreground">
                        {title}
                      </p>
                      <p className="text-[11px] text-muted-foreground">{bookCount} كتاب</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
