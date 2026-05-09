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
          <div className="flex items-center gap-2 mb-1">
            <UsersIcon className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              المجتمع
            </span>
          </div>
          <h2
            className="text-2xl font-bold text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            قوائم القرّاء التي تضم هذا الكتاب
          </h2>
          <p className="text-sm mt-1 text-muted-foreground">
            اختيارات المستخدمين الأكثر تصويتًا
          </p>
        </div>
        <a
          href="/"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-70"
        >
          عرض كل القوائم <ArrowLeftIcon className="w-4 h-4" />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map(
          ({ id, title, curator, avatar, votes, bookCount, covers, rank }) => (
            <a key={id} href="/" className="group">
              <Card className="h-full rounded-2xl border-border transition-all group-hover:-translate-y-0.5">
                <CardHeader className="pb-2">
                  <div className="flex items-end gap-0 relative h-16">
                    {covers.slice(0, 3).map((src, i) => (
                      <div
                        key={`${id}-${src}`}
                        className="absolute rounded-lg overflow-hidden shadow-md w-9"
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
                    <div className="absolute left-0 bottom-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                      #{rank}
                    </div>
                  </div>
                  <CardTitle className="text-sm leading-snug line-clamp-2">
                    {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="relative size-5 rounded-full overflow-hidden shrink-0">
                      <img
                        src={avatar}
                        alt={curator}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      بواسطة{" "}
                      <span className="text-foreground font-semibold">
                        @{curator}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground mr-auto">
                      {bookCount} كتاب
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground border-t border-border pt-2">
                    <ThumbsUpIcon className="w-3.5 h-3.5" />
                    {votes.toLocaleString("ar")} صوتًا
                  </div>
                </CardContent>
              </Card>
            </a>
          ),
        )}
      </div>
    </section>
  );
}
