import { Badge } from "@components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon, FileTextIcon, ListIcon } from "@phosphor-icons/react/dist/ssr";

import type { DetailedBookType } from "@/features/books/types";

interface FeaturedArticleItem {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  cover: string;
}

interface OfficialListItem {
  id: string;
  title: string;
  bookCount: number;
  rank: number;
  cover: string;
}

interface FeaturedArticlesProps {
  book: DetailedBookType;
}

function getPlaceholderFeaturedArticles(book: DetailedBookType) {
  // TODO: Replace with database-backed articles and editorial lists once publishing tables exist.
  const cover = book.coverImageUrl ?? "/books/book.jpg";

  return {
    articles: [
      {
        id: "article-1",
        tag: "تحليل",
        title: `قراءة في ${book.title}`,
        excerpt: "مساحة تحريرية مؤقتة لتحليل العمل وسياقه وأثره على تجربة القارئ العربي.",
        author: "فريق مكتباتي",
        readTime: "6 دقائق",
        cover,
      },
      {
        id: "article-2",
        tag: "دليل قراءة",
        title: "ماذا تقرأ بعد هذا الكتاب؟",
        excerpt: "اقتراحات تحريرية مؤقتة تظهر هنا إلى أن تتوفر مقالات فعلية من قاعدة البيانات.",
        author: "محررو مكتباتي",
        readTime: "4 دقائق",
        cover,
      },
      {
        id: "article-3",
        tag: "مقارنة",
        title: "ملاحظات على الطبعة والترجمة",
        excerpt: "نموذج محتوى مؤقت يحافظ على تجربة الصفحة لحين إضافة نظام المقالات.",
        author: "فريق المحتوى",
        readTime: "5 دقائق",
        cover,
      },
    ] satisfies FeaturedArticleItem[],
    officialLists: [
      {
        id: "official-1",
        title: "مختارات مكتباتي لهذا الشهر",
        bookCount: 30,
        rank: 4,
        cover,
      },
      {
        id: "official-2",
        title: "كتب نوصي بها لمحبي هذا التصنيف",
        bookCount: 60,
        rank: 12,
        cover,
      },
      {
        id: "official-3",
        title: "قراءات طويلة لعشاق التفاصيل",
        bookCount: 20,
        rank: 7,
        cover,
      },
      {
        id: "official-4",
        title: "أعمال بارزة في المكتبة العربية",
        bookCount: 100,
        rank: 16,
        cover,
      },
    ] satisfies OfficialListItem[],
  };
}

export function FeaturedArticles({ book }: FeaturedArticlesProps) {
  const { articles, officialLists } = getPlaceholderFeaturedArticles(book);

  if (articles.length === 0 && officialLists.length === 0) return null;

  return (
    <section className="flex flex-col gap-12" dir="rtl" id="articles">
      {articles.length > 0 && (
        <div className="flex flex-col gap-7">
          <div className="flex items-end justify-between">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <FileTextIcon className="text-primary h-4 w-4" />
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                  من فوليو
                </span>
              </div>
              <h2
                className="text-foreground text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                مقالات ومميزات
              </h2>
            </div>
            <a
              href="/"
              className="text-primary hidden items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 sm:flex"
            >
              جميع المقالات <ArrowLeftIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {articles.map((article) => (
              <a key={article.id} href="/" className="group">
                <Card className="border-border overflow-hidden rounded-2xl transition-all group-hover:-translate-y-0.5">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={article.cover}
                      alt={article.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="from-background/70 absolute inset-0 bg-linear-to-t to-transparent" />
                    <Badge className="absolute top-3 right-3 px-2.5 py-0.5 text-[10px] font-semibold">
                      {article.tag}
                    </Badge>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="line-clamp-2 text-sm leading-snug text-balance underline-offset-2 group-hover:underline">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
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
              <div className="mb-1 flex items-center gap-2">
                <ListIcon className="text-primary h-4 w-4" />
                <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                  من فوليو
                </span>
              </div>
              <h2
                className="text-foreground text-2xl font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                مميز في قوائمنا الرسمية
              </h2>
            </div>
            <a
              href="/"
              className="text-primary hidden items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 sm:flex"
            >
              جميع القوائم <ArrowLeftIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {officialLists.map(({ id, title, bookCount, rank, cover }) => (
              <a key={id} href="/" className="group">
                <Card className="border-border rounded-2xl transition-all group-hover:-translate-y-0.5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="relative shrink-0">
                      <div className="relative aspect-2/3 w-14 overflow-hidden rounded-xl shadow-sm">
                        <img src={cover} alt={title} className="object-cover" />
                      </div>
                      <div className="bg-secondary text-secondary-foreground absolute -top-2 -left-2 flex size-5 items-center justify-center rounded-full text-[10px] font-bold">
                        #{rank}
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                      <p className="text-foreground line-clamp-3 text-xs leading-snug font-semibold text-balance underline-offset-2 group-hover:underline">
                        {title}
                      </p>
                      <p className="text-muted-foreground text-[11px]">{bookCount} كتاب</p>
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
