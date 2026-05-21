import type { AuthorType } from "@features/author/server/get-author";

import { BookCard } from "@/ui/components/book/book-card";

export function AuthorAbout({ author }: { author: AuthorType }) {
  return (
    <div className="flex flex-col gap-8" dir="rtl">
      {/* ── Biography ── */}
      {author.bio && (
        <div>
          <SectionTitle>السيرة الأدبية</SectionTitle>
          <div className={"text-foreground/90 text-base leading-8 transition-all"}>
            {author.bio}
          </div>
        </div>
      )}

      {/* ── Featured books ── */}
      <div>
        <SectionTitle>أشهر أعماله</SectionTitle>
        <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4">
          {author.bookAuthors.map((item) => (
            <div key={`${item.authorId}-${item.bookId}`} className="flex shrink-0 pt-1">
              {item.book ? <BookCard book={item.book} size="lg" /> : <>ERRORR</>}
            </div>
          ))}
        </div>
      </div>
      <div className="border-border flex flex-col gap-8 border-t py-8"></div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <h2 className="text-foreground font-serif text-lg font-normal whitespace-nowrap">
        {children}
      </h2>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}
