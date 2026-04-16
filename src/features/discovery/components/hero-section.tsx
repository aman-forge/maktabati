import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  TrophyIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

const TRENDING_TAGS = [
  "روايات أدبية",
  "خيال علمي",
  "أكاديمية داكنة",
  "فانتازيا",
  "مذكرات",
];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <section
      dir="rtl"
      className="relative h-[80vh] flex items-center overflow-hidden bg-linear-to-b from-primary/10 to-background max-h-210!"
    >
      {/* Ambient glow — top-right */}
      <div
        className="pointer-events-none absolute -right-32 -top-40 h-125 w-125 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Right (visually left in RTL): Copy + Search */}
          <div className="flex flex-col gap-8">
            {/* Label */}
            <div className="flex items-center gap-2">
              <SparkleIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                كونك القرائي
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-4">
              <h1
                className="text-5xl lg:text-7xl font-bold leading-[1.15] text-balance tracking-tight text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                اكتشف{" "}
                <span className="italic font-normal text-primary">كتباً</span>
                <br />
                تبقى معك للأبد.
              </h1>

              <p className="text-lg leading-relaxed max-w-md text-muted-foreground">
                تتبّع قراءاتك، واكتشف مؤلفين جدد، وابحث عن إدمانك القادم — كل ذلك
                في مكان واحد جميل.
              </p>
            </div>

            {/* Search bar */}
            <div className="flex flex-col gap-3">
              <div
                className="flex items-center gap-3 rounded-xl px-5 py-4 transition-all duration-200 bg-card"
                style={{
                  border: `1.5px solid ${focused ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                  boxShadow: focused
                    ? "0 0 0 3px hsl(var(--primary) / 0.15)"
                    : "none",
                }}
              >
                <MagnifyingGlassIcon
                  className="w-5 h-5 shrink-0 transition-colors"
                  style={{
                    color: focused
                      ? "hsl(var(--primary))"
                      : "hsl(var(--muted-foreground))",
                  }}
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder="ابحث بالعنوان أو المؤلف أو الرقم المعياري…"
                  className="flex-1 bg-transparent text-base outline-none text-foreground placeholder:text-muted-foreground"
                  aria-label="ابحث عن كتب"
                />
                <Button
                  size="sm"
                  className="rounded-lg px-4 shrink-0 bg-primary text-primary-foreground"
                >
                  بحث
                </Button>
              </div>

              {/* Trending tags */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs text-muted-foreground">رائج:</span>
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="text-xs px-3 py-1 rounded-full border border-border text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                    onClick={() => setQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA row */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                className="group flex items-center gap-2 pr-4 font-medium text-muted-foreground hover:text-foreground"
              >
                تصفّح جميع الأنواع
                <ArrowRightIcon className="w-4 h-4 transition-transform translate-x-0.5 group-hover:-translate-x-0.5 rotate-180" />
              </Button>
              <div className="w-px h-5 bg-border" />
              <span className="text-sm text-muted-foreground">
                <strong className="font-semibold text-primary">
                  +2.4 مليون
                </strong>{" "}
                كتاب مُفهرَس
              </span>
            </div>
          </div>

          {/* Left (visually right in RTL): Hero image collage */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Background glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
              }}
            />

            {/* Main book stack image */}
            <div className="relative z-10 w-105 h-130 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/hero-book.png"
                alt="مجموعة مختارة من الكتب الجميلة"
                className="h-full w-full object-cover"
              />
              {/* Dark overlay at bottom */}
              <div
                className="absolute inset-x-0 bottom-0 h-40"
                style={{
                  background:
                    "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Floating stat card — currently reading (RTL: right side) */}
            <div className="absolute top-10 -right-8 z-20 rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm bg-card border border-border">
              <p className="text-xs mb-1 text-muted-foreground">يقرأ الآن</p>
              <p className="text-sm font-semibold leading-tight text-card-foreground">
                مكتبة منتصف الليل
              </p>
              <p className="text-xs mt-0.5 text-muted-foreground">مات هايج</p>
              {/* Mini progress bar */}
              <div className="mt-2 h-1 rounded-full w-28 bg-muted">
                <div className="h-1 rounded-full w-3/5 bg-primary" />
              </div>
            </div>

            {/* Trending in circle card */}
            <div className="absolute bottom-16 -left-6 z-20 rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm bg-primary/80 border border-primary">
              <div className="flex items-center gap-2 mb-1">
                <TrophyIcon type="fill" className="size-4.5" />
                <p className="text-xs text-primary-foreground/70">
                  الأكثر رواجاً في دائرتك
                </p>
              </div>
              <p className="text-sm font-semibold text-primary-foreground">
                إنترميتسو
              </p>
              <p className="text-xs text-primary-foreground/80">
                ★ 4.6 &nbsp;·&nbsp; 12 ألف قراءة هذا الأسبوع
              </p>
            </div>

            {/* Decorative floating badge */}
            <Badge className="absolute top-1/2 -left-4 z-20 -rotate-3 text-xs px-3 py-1.5 shadow-lg bg-primary text-primary-foreground border-0">
              #1 رائج
            </Badge>
          </div>
        </div>
      </div>

      {/* Bottom fade into page background */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
}
