import type { AuthorType } from "@features/author/server/get-author";
import { ArrowLeftIcon, BooksIcon } from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@shadcn/badge";

const MOCK_SERIES = [
  {
    id: "1",
    name: "الثلاثية",
    description: "بين القصرين · قصر الشوق · السكرية",
    bookCount: 3,
    status: "مكتملة",
    accent: false,
  },
  {
    id: "2",
    name: "الحرافيش",
    description: "ملحمة اجتماعية — 1 مجلد",
    bookCount: 1,
    status: "مكتملة",
    accent: false,
  },
  {
    id: "3",
    name: "أولاد حارتنا",
    description: "رواية رمزية فلسفية — 1 مجلد",
    bookCount: 1,
    status: "مميزة",
    accent: true,
  },
];

export function AuthorSeries({ author: _author }: { author: AuthorType }) {
  if (MOCK_SERIES.length === 0) return null;

  return (
    <section className="flex flex-col gap-7" dir="rtl" id="author-series">
      {/* Section header — mirrors MemberLists */}
      <div className="flex items-end justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <BooksIcon className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              المؤلف
            </span>
          </div>
          <h2
            className="text-foreground text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            سلاسل الكتب
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">مجموعات وروايات الكاتب</p>
        </div>
        <a
          href="/"
          className="text-primary hidden items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 sm:flex"
        >
          عرض كل السلاسل <ArrowLeftIcon className="h-4 w-4" />
        </a>
      </div>

      {/* Cards grid — mirrors MemberLists */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_SERIES.map((series) => (
          <a key={series.id} href="/" className="group">
            <Card className="border-border h-full rounded-2xl transition-all group-hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="relative flex h-16 items-end gap-0">
                  <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-xl">
                    <BooksIcon className="text-primary size-7" />
                  </div>
                  <div className="bg-secondary text-secondary-foreground absolute bottom-0 left-0 rounded-full px-2 py-0.5 text-[10px] font-bold">
                    {series.bookCount} كتب
                  </div>
                </div>
                <CardTitle className="line-clamp-2 text-sm leading-snug">{series.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pt-0">
                <p className="text-muted-foreground text-xs">{series.description}</p>
                <div className="border-border flex items-center gap-1.5 border-t pt-2">
                  <Badge
                    variant="secondary"
                    className={
                      series.accent
                        ? "bg-primary/10 text-primary border-transparent text-[10px]"
                        : "text-[10px]"
                    }
                  >
                    {series.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
