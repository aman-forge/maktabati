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
    <section dir="rtl" className="px-6 lg:px-12 container mx-auto">
      <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
        {/* Grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px",
          }}
        />

        {/* Ambient glow — adjusted for RTL (coming from right side) */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 rounded-full opacity-20 z-0"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 grid md:grid-cols-2 items-stretch">
          {/* Right column in RTL = text content */}
          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <Badge className="w-fit text-xs px-3 py-1 font-medium bg-primary text-primary-foreground border-0">
              كتاب الشهر
            </Badge>

            <div className="flex flex-col gap-3">
              <h2
                className="text-3xl lg:text-4xl font-bold leading-tight text-balance text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                بلاط الجمر
              </h2>
              <p className="text-base font-medium text-primary">
                بقلم سيرافينا فيل
              </p>
              <p className="text-sm leading-relaxed max-w-sm text-muted-foreground">
                السحر، ودسائس البلاط، ونبوءة قديمة تتصادم في هذا الإصدار المذهل.
                عالم بُني بتفاصيل آسرة، وشخصيات تبدو حقيقية بشكل مؤلم.
              </p>
            </div>

            {/* Rating stars */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  weight="fill"
                  className="w-4 h-4 text-primary"
                />
              ))}
              <span className="text-sm font-semibold text-foreground me-1">
                4.8
              </span>
              <span className="text-sm text-muted-foreground">
                · 34.5 ألف تقييم
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <Button className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <BookOpenIcon weight="bold" className="w-4 h-4" />
                اقرأ المزيد
              </Button>
              <Button
                variant="ghost"
                className="group gap-2 rounded-xl text-muted-foreground hover:text-foreground"
              >
                <BookmarkSimpleIcon weight="bold" className="w-4 h-4" />
                أضف إلى الرف
                <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              </Button>
            </div>

            {/* Meta */}
            <div className="pt-2">
              <Separator className="mb-4 bg-border" />
              <div className="flex items-center gap-6">
                {BOOK_META.map(({ label, value }) => (
                  <div key={label} className="flex flex-col gap-0.5">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Left column in RTL = book cover image – now proper book proportions */}
          <div className="relative flex items-center justify-center p-8 lg:p-12">
            <div className="relative w-full max-w-65 md:max-w-75 aspect-2/3 rotate-[-4deg] shadow rounded-lg">
              <img
                src="/books/شطرنج.png" // ← Replace with real path, e.g. "/covers/blat-al-jamar.jpg"
                alt="غلاف كتاب بلاط الجمر"
                className="object-cover rounded-lg border border-border/40 shadow-inner"
                sizes="(max-width: 768px) 80vw, 45vw"
              />

              {/* Subtle fade from image edge into background (RTL friendly) */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to left, hsl(var(--card)) 0%, transparent 35%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
