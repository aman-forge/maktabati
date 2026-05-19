import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { ArrowLeftIcon, ThumbsUpIcon, UsersIcon } from "@phosphor-icons/react";

import type { MemberListItem } from "@/features/book/book-page-mock";

interface MemberListsProps {
  lists?: MemberListItem[];
}

export function MemberLists({ lists = [] }: MemberListsProps) {
  if (lists.length === 0) return null;

  return (
    <section className="flex flex-col gap-7" dir="rtl" id="member-lists">
      <div className="flex items-end justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <UsersIcon className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
              المجتمع
            </span>
          </div>
          <h2
            className="text-foreground text-2xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            قوائم القرّاء التي تضم هذا الكتاب
          </h2>
          <p className="text-muted-foreground mt-1 text-sm">اختيارات المستخدمين الأكثر تصويتًا</p>
        </div>
        <a
          href="/"
          className="text-primary hidden items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70 sm:flex"
        >
          عرض كل القوائم <ArrowLeftIcon className="h-4 w-4" />
        </a>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {lists.map(({ id, title, curator, avatar, votes, bookCount, covers, rank }) => (
          <a key={id} href="/" className="group">
            <Card className="border-border h-full rounded-2xl transition-all group-hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="relative flex h-16 items-end gap-0">
                  {covers.slice(0, 3).map((src, i) => (
                    <div
                      key={`${id}-${src}-${i.toString()}`}
                      className="absolute w-9 overflow-hidden rounded-lg shadow-md"
                      style={{
                        aspectRatio: "2/3",
                        right: i * 18,
                        zIndex: i + 1,
                        transform: `rotate(${(1 - i) * 4}deg)`,
                      }}
                    >
                      <img src={src} alt="" className="object-cover" />
                    </div>
                  ))}
                  <div className="bg-secondary text-secondary-foreground absolute bottom-0 left-0 rounded-full px-2 py-0.5 text-[10px] font-bold">
                    #{rank}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 text-sm leading-snug">{title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-3 pt-0">
                <div className="flex items-center gap-2">
                  <div className="relative size-5 shrink-0 overflow-hidden rounded-full">
                    <img src={avatar} alt={curator} className="object-cover" />
                  </div>
                  <span className="text-muted-foreground text-xs">
                    بواسطة <span className="text-foreground font-semibold">@{curator}</span>
                  </span>
                  <span className="text-muted-foreground mr-auto text-xs">{bookCount} كتاب</span>
                </div>
                <div className="text-muted-foreground border-border flex items-center gap-1.5 border-t pt-2 text-xs">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  {votes.toLocaleString("ar")} صوتًا
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
}
