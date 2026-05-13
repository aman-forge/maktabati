import { CaretLeftIcon } from "@phosphor-icons/react";
// import { Link } from "@tanstack/react-router";
import { AuthorType } from "@/features/auth/server/get-auther";

const MOCK_SIMILAR = [
  {
    id: "taha",
    name: "طه حسين",
    initials: "طح",
    meta: "٢١ كتاباً",
    bg: "bg-violet-100 dark:bg-violet-900",
    text: "text-violet-800 dark:text-violet-200",
  },
  {
    id: "youssef",
    name: "يوسف إدريس",
    initials: "يإ",
    meta: "١٥ كتاباً",
    bg: "bg-emerald-100 dark:bg-emerald-900",
    text: "text-emerald-800 dark:text-emerald-200",
  },
  {
    id: "gamal",
    name: "جمال الغيطاني",
    initials: "جغ",
    meta: "١٨ كتاباً",
    bg: "bg-amber-100 dark:bg-amber-900",
    text: "text-amber-800 dark:text-amber-200",
  },
  {
    id: "sonallah",
    name: "صنع الله إبراهيم",
    initials: "صإ",
    meta: "١٢ كتاباً",
    bg: "bg-rose-100 dark:bg-rose-900",
    text: "text-rose-800 dark:text-rose-200",
  },
];

const MOCK_INFLUENCES = [
  {
    id: "dostoevsky",
    name: "فيودور دوستويفسكي",
    initials: "فد",
    meta: "الواقعية الروسية",
    bg: "bg-sky-100 dark:bg-sky-900",
    text: "text-sky-800 dark:text-sky-200",
  },
  {
    id: "zola",
    name: "إميل زولا",
    initials: "إز",
    meta: "الواقعية الفرنسية",
    bg: "bg-teal-100 dark:bg-teal-900",
    text: "text-teal-800 dark:text-teal-200",
  },
];

export function AuthorSimilar({ author: _author }: { author: AuthorType }) {
  return (
    <div className="flex flex-col gap-8" dir="rtl">
      <section>
        <SectionTitle>مؤلفون في نفس الأسلوب</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_SIMILAR.map((a) => (
            <AuthorCard key={a.id} author={a} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>مؤلفون تأثر بهم</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MOCK_INFLUENCES.map((a) => (
            <AuthorCard key={a.id} author={a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function AuthorCard({ author }: { author: (typeof MOCK_SIMILAR)[0] }) {
  return (
    // <Link
    //   to="/_public/author/$id"
    //   params={{ id: author.id }}
    //   className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted/40 transition-colors"
    // >
    //   <div
    //     className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${author.bg} ${author.text}`}
    //   >
    //     {author.initials}
    //   </div>
    //   <div className="flex-1 min-w-0">
    //     <p className="text-sm font-medium text-foreground leading-none">{author.name}</p>
    //     <p className="text-xs text-muted-foreground mt-1">{author.meta}</p>
    //   </div>
    <CaretLeftIcon className="size-4 text-muted-foreground shrink-0" />
    // </Link>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <h2 className="font-serif text-lg font-normal text-foreground whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
