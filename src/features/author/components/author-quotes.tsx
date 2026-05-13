import { useState } from "react";
import { HeartIcon } from "@phosphor-icons/react";
import { cn } from "@/ui/lib/utils";
import { AuthorType } from "@/features/auth/server/get-auther";


const MOCK_QUOTES = [
  { id: "1", text: "الإنسان لا يخشى الموت وإنما يخشى النسيان.", source: "زقاق المدق", likes: 241 },
  { id: "2", text: "الحب لا يعني أن تجد شخصاً مثالياً بل أن تجد شخصاً تقبل عيوبه.", source: "الثلاثية", likes: 185 },
  { id: "3", text: "لا تعيش لتأكل بل كُل لتعيش وتفهم وتُحب.", source: "أولاد حارتنا", likes: 152 },
  { id: "4", text: "الوطن ليس بلداً يعيش فيه الإنسان، بل هو البلد الذي يعيش في القلب.", source: "الحرافيش", likes: 98 },
  { id: "5", text: "إن الغني لا يشتري له سعادة، وإنما يشتري ما يخدر به آلامه.", source: "خان الخليلي", likes: 74 },
];

export function AuthorQuotes({ author: _author }: { author: AuthorType }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [counts, setCounts] = useState<Record<string, number>>(
    Object.fromEntries(MOCK_QUOTES.map((q) => [q.id, q.likes])),
  );

  function toggleLike(id: string) {
    setLiked((prev) => {
      const isLiked = prev[id];
      setCounts((c) => ({ ...c, [id]: c[id] + (isLiked ? -1 : 1) }));
      return { ...prev, [id]: !isLiked };
    });
  }

  return (
    <div className="flex flex-col gap-3" dir="rtl">
      {MOCK_QUOTES.map((quote) => (
        <div
          key={quote.id}
          className="rounded-xl border-r-[3px] border-r-primary border border-border bg-primary/5 px-5 py-4"
        >
          <p className="font-serif text-base italic leading-8 text-foreground">{quote.text}</p>
          <p className="text-xs text-muted-foreground mt-2">— {quote.source}</p>
          <button
            type="button"
            onClick={() => toggleLike(quote.id)}
            className={cn(
              "flex items-center gap-1.5 mt-3 text-xs transition-colors",
              liked[quote.id] ? "text-pink-500" : "text-muted-foreground hover:text-foreground",
            )}
          >
            <HeartIcon
              weight={liked[quote.id] ? "fill" : "regular"}
              className="size-3.5"
            />
            {counts[quote.id].toLocaleString("ar-EG")} إعجاباً
          </button>
        </div>
      ))}
    </div>
  );
}
