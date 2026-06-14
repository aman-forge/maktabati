import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import {
  ArrowLeftIcon,
  BookmarkSimpleIcon,
  BookOpenIcon,
  StarIcon,
} from "@phosphor-icons/react/dist/ssr";

const BOOK_META = [
  { label: "الصفحات", value: "598" },
  { label: "التصنيف", value: "فانتازيا" },
  { label: "النشر", value: "2024" },
] as const;

export function FeaturedBanner() {
  return (
    <section dir="rtl" className="container mx-auto px-6 lg:px-12">
      <div className="bg-card border-border relative overflow-hidden rounded-2xl border">
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Ambient glow — adjusted for RTL (coming from right side) */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 z-0 h-96 w-96 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid items-stretch md:grid-cols-2">
          {/* Right column in RTL = text content */}
          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <Badge className="bg-primary text-primary-foreground w-fit border-0 px-3 py-1 text-xs font-medium">
              كتاب الشهر
            </Badge>

            <div className="flex flex-col gap-3">
              <h2
                className="text-foreground text-3xl leading-tight font-bold text-balance lg:text-4xl"
                style={{ fontFamily: "var(--font-display)" }}
              >
                بلاط الجمر
              </h2>
              <p className="text-primary text-base font-medium">بقلم سيرافينا فيل</p>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                السحر، ودسائس البلاط، ونبوءة قديمة تتصادم في هذا الإصدار المذهل. عالم بُني بتفاصيل
                آسرة، وشخصيات تبدو حقيقية بشكل مؤلم.
              </p>
            </div>

            {/* Rating stars */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} weight="fill" className="text-primary h-4 w-4" />
              ))}
              <span className="text-foreground me-1 text-sm font-semibold">4.8</span>
              <span className="text-muted-foreground text-sm">· 34.5 ألف تقييم</span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 rounded-xl">
                <BookOpenIcon weight="bold" className="h-4 w-4" />
                اقرأ المزيد
              </Button>
              <Button
                variant="ghost"
                className="group text-muted-foreground hover:text-foreground gap-2 rounded-xl"
              >
                <BookmarkSimpleIcon weight="bold" className="h-4 w-4" />
                أضف إلى الرف
                <ArrowLeftIcon className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              </Button>
            </div>

            {/* Meta */}
            <div className="pt-2">
              <Separator className="bg-border mb-4" />
              <div className="flex items-center gap-6">
                {BOOK_META.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-muted-foreground text-xs tracking-wide uppercase">
                      {label}
                    </span>
                    <span className="text-foreground text-sm font-semibold">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left column in RTL = book cover image – now proper book proportions */}
          <div className="relative flex items-center justify-center p-8 lg:p-12">
            <div className="relative aspect-2/3 w-full max-w-65 rotate-[-4deg] rounded-lg shadow md:max-w-75">
              <img
                src="/books/book.jpg"
                alt="غلاف كتاب بلاط الجمر"
                className="border-border/40 rounded-lg border object-cover shadow-inner"
                sizes="(max-width: 768px) 80vw, 45vw"
              />

              {/* Subtle fade from image edge into background (RTL friendly) */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: "linear-gradient(to left, hsl(var(--card)) 0%, transparent 35%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
