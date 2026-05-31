import type { AuthorType } from "@features/author/server/get-author";
import { BooksIcon } from "@phosphor-icons/react";
// import { Link } from "@tanstack/react-router";
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
  return (
    <div className="flex flex-col gap-3" dir="rtl">
      {MOCK_SERIES.map((series) => (
        <div
          key={series.id}
          className="border-border bg-card hover:bg-muted/40 flex items-center gap-4 rounded-xl border p-4 transition-colors"
        >
          <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
            <BooksIcon className="text-primary size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground text-sm font-medium">{series.name}</p>
            <p className="text-muted-foreground mt-0.5 text-xs">{series.description}</p>
          </div>
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
          {/* <Link
            to="/discover/books"
            search={{ series: series.id }}
            className="text-xs text-primary hover:underline shrink-0"
          >
            استعرض
          </Link> */}
        </div>
      ))}
    </div>
  );
}
