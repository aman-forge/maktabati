import { BooksIcon } from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
// import { Link } from "@tanstack/react-router";

import { AuthorType } from "@/features/auth/server/get-auther";

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
    description: "ملحمة اجتماعية — ١ مجلد",
    bookCount: 1,
    status: "مكتملة",
    accent: false,
  },
  {
    id: "3",
    name: "أولاد حارتنا",
    description: "رواية رمزية فلسفية — ١ مجلد",
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
          className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 hover:bg-muted/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <BooksIcon className="size-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{series.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{series.description}</p>
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
