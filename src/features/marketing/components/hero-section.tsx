import {
  ArrowLeftIcon,
  BookOpenIcon,
  MagnifyingGlassIcon,
  SparkleIcon,
  StarIcon,
  TrendUpIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Separator } from "@shadcn/separator";
import type { CSSProperties } from "react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type FeaturedBook = {
  id: number;
  title: string;
  author: string;
  genre: string;
  score: number;
  readers: string;
  reviews: string;
  progress: number;
  tag: string;
  coverFrom: string;
  coverVia: string;
  coverTo: string;
  stripeColor: string;
  accent: string;
  accentRaw: string;
  accentBg: string;
  accentBorder: string;
  accentGlow: string;
};

const TRENDING_TAGS = [
  "روايات أدبية",
  "خيال علمي",
  "أكاديمية داكنة",
  "فانتازيا",
  "مذكرات",
];

const FEATURED: FeaturedBook[] = [
  {
    id: 1,
    title: "مكتبة منتصف الليل",
    author: "مات هايج",
    genre: "خيال فلسفي",
    score: 4.8,
    readers: "28.4k",
    reviews: "1.2k",
    progress: 62,
    tag: "الأعلى تقييماً",
    coverFrom: "#1e1040",
    coverVia: "#2d1b69",
    coverTo: "#0f0a1e",
    stripeColor: "rgba(139,92,246,0.25)",
    accent: "hsl(263 70% 60%)",
    accentRaw: "#7c3aed",
    accentBg: "hsl(263 70% 60% / 0.12)",
    accentBorder: "hsl(263 70% 60% / 0.25)",
    accentGlow: "hsl(263 70% 60% / 0.2)",
  },
  {
    id: 2,
    title: "إنترميتسو",
    author: "سالي رووني",
    genre: "أدب معاصر",
    score: 4.6,
    readers: "12.1k",
    reviews: "873",
    progress: 38,
    tag: "رائج الآن",
    coverFrom: "#042f2e",
    coverVia: "#134e4a",
    coverTo: "#0a1628",
    stripeColor: "rgba(20,184,166,0.25)",
    accent: "hsl(172 60% 45%)",
    accentRaw: "#0d9488",
    accentBg: "hsl(172 60% 45% / 0.12)",
    accentBorder: "hsl(172 60% 45% / 0.25)",
    accentGlow: "hsl(172 60% 45% / 0.2)",
  },
  {
    id: 3,
    title: "أطلس غيوم السحاب",
    author: "ديفيد ميتشل",
    genre: "خيال علمي",
    score: 4.4,
    readers: "9.7k",
    reviews: "640",
    progress: 81,
    tag: "مقترح لك",
    coverFrom: "#431407",
    coverVia: "#78350f",
    coverTo: "#1c1008",
    stripeColor: "rgba(245,158,11,0.25)",
    accent: "hsl(38 90% 52%)",
    accentRaw: "#d97706",
    accentBg: "hsl(38 90% 52% / 0.12)",
    accentBorder: "hsl(38 90% 52% / 0.25)",
    accentGlow: "hsl(38 90% 52% / 0.2)",
  },
  {
    id: 4,
    title: "أطلس غيوم السحاب",
    author: "ديفيد ميتشل",
    genre: "خيال علمي",
    score: 4.4,
    readers: "9.7k",
    reviews: "640",
    progress: 81,
    tag: "مقترح لك",
    coverFrom: "#042f2e",
    coverVia: "#134e4a",
    coverTo: "#0a1628",
    stripeColor: "rgba(20,184,166,0.25)",
    accent: "hsl(172 60% 45%)",
    accentRaw: "#0d9488",
    accentBg: "hsl(172 60% 45% / 0.12)",
    accentBorder: "hsl(172 60% 45% / 0.25)",
    accentGlow: "hsl(172 60% 45% / 0.2)",
  },
];

const STATS = [
  { icon: BookOpenIcon, value: "2.4M", label: "كتاب" },
  { icon: UsersThreeIcon, value: "180k", label: "قارئ" },
  { icon: StarIcon, value: "4.7M", label: "تقييم" },
] as const;

const AUTO_PLAY_DELAY = 3800;

// ─── Shared book cover renderer ───────────────────────────────────────────────

interface CoverArtProps {
  book: FeaturedBook;
  className?: string;
  showMeta?: boolean;
}

const CoverArt = memo(function CoverArt({
  book,
  className = "",
  showMeta = true,
}: CoverArtProps) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-xl ${className}`.trim()}
      style={{ aspectRatio: "2/3" }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, ${book.coverFrom} 0%, ${book.coverVia} 45%, ${book.coverTo} 100%)`,
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -52deg,
            transparent,
            transparent 9px,
            ${book.stripeColor} 9px,
            ${book.stripeColor} 10px
          )`,
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-1/3"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.06) 0%, transparent 100%)",
        }}
      />

      {showMeta ? (
        <div className="relative z-10 mt-auto bg-linear-to-t from-black/85 via-black/50 to-transparent p-4">
          <p
            className="mb-1.5 text-[9px] font-bold tracking-[0.2em] uppercase"
            style={{ color: book.accent }}
          >
            {book.genre}
          </p>
          <h3 className="mb-0.5 line-clamp-2 text-sm font-bold leading-snug text-white">
            {book.title}
          </h3>
          <p className="text-xs text-white/55">{book.author}</p>
        </div>
      ) : null}
    </div>
  );
});

function useAutoSlider(length: number) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();

    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % length);
    }, AUTO_PLAY_DELAY);
  }, [clearTimer, length]);

  const goTo = useCallback(
    (nextIndex: number) => {
      setIndex(nextIndex);
      startTimer();
    },
    [startTimer],
  );

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  return { index, goTo };
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const [query, setQuery] = useState("");
  const { index: activeIdx } = useAutoSlider(FEATURED.length); // goTo

  const book = FEATURED[activeIdx];

  const stars = useMemo(
    () => Array.from({ length: 5 }, (_, i) => i < Math.floor(book.score)),
    [book.score],
  );

  const searchRingStyle = useMemo(
    () =>
      ({
        "--tw-ring-color": book.accent,
      }) as CSSProperties,
    [book.accent],
  );

  return (
    <section
      dir="rtl"
      className="relative w-full overflow-hidden bg-background"
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 transition-all duration-700 ease-in-out"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 105% -5%, ${book.accentBg} 0%, transparent 65%),
            radial-gradient(ellipse 45% 35% at -5% 105%, ${book.accentBg} 0%, transparent 60%)
          `,
        }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top meta bar */}
      <div className="border-b border-border/50">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
          <div className="flex items-center gap-2 text-muted-foreground">
            <TrendUpIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">الموسم الربيعي · 2025</span>
          </div>

          <div className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
            <span>+2.4 مليون كتاب</span>
            <Separator orientation="vertical" className="h-3" />
            <span>منصة القراء العرب</span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid min-h-[calc(88vh-3rem)] grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:gap-20 lg:py-10">
          {/* Copy block */}
          <div className="order-1 flex flex-col gap-7 text-center md:text-start lg:order-1">
            <Badge
              variant="outline"
              className="mx-auto self-start gap-1.5 rounded-full border-border/70 px-3 py-1.5 text-xs font-semibold md:mx-0"
            >
              <SparkleIcon weight="fill" className="h-3 w-3 text-primary" />
              كونك القرائي
            </Badge>

            <div className="flex flex-col gap-6">
              <h1 className="text-5xl font-semibold leading-[0.6] tracking-tight text-foreground lg:text-6xl">
                اكتشف كتباً
              </h1>

              <div className="mt-1 text-5xl font-semibold leading-[0.6] tracking-tight text-foreground lg:text-6xl">
                <em
                  className="not-italic font-medium transition-colors duration-700"
                  style={{ color: book.accent }}
                >
                  تسكن فيك
                </em>{" "}
                للأبد.
              </div>

              <p className="mx-auto mt-2 max-w-100 text-[15px] leading-relaxed text-muted-foreground md:mx-0 sm:text-base">
                تتبّع قراءاتك، واكتشف مؤلفين جدد، وابنِ رفّاً رقمياً يعكس شخصيتك — مع
                مجتمع من القراء العرب.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 sm:gap-10 md:justify-start">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <span className="text-xl font-black leading-none tabular-nums text-foreground sm:text-2xl">
                    {value}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Icon className="h-3 w-3 shrink-0" />
                    <span className="text-xs">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mx-auto flex w-full max-w-120 flex-col gap-2.5 md:mx-0">
              <div className="group relative flex items-center">
                <MagnifyingGlassIcon className="pointer-events-none absolute right-3.5 z-10 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                <Input
                  dir="rtl"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="ابحث بالعنوان أو المؤلف أو ISBN…"
                  aria-label="ابحث عن كتب"
                  className="h-12 rounded-xl border-border/70 bg-card pl-26 pr-10 text-sm transition-all placeholder:text-muted-foreground/50 focus-visible:ring-2"
                  style={searchRingStyle}
                />
                <Button
                  size="sm"
                  className="absolute left-1.5 h-9 rounded-lg px-5 text-xs font-bold text-white transition-all"
                  style={{ background: book.accent, border: "none" }}
                >
                  بحث
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="ml-0.5 shrink-0 text-[11px] text-muted-foreground/50">
                  رائج:
                </span>
                {TRENDING_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="rounded-full border border-border/60 px-2.5 py-1 text-[11px] text-muted-foreground transition-all hover:border-border hover:bg-muted hover:text-foreground"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Button
                size="lg"
                className="h-11 rounded-xl px-7 text-sm font-bold text-white transition-all hover:opacity-90"
                style={{ background: book.accent, border: "none" }}
              >
                ابدأ مجاناً
              </Button>

              <Button
                variant="ghost"
                size="lg"
                className="h-11 rounded-xl gap-2 px-5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                تصفّح المكتبة
                <ArrowLeftIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Visual panel */}
          <div className="order-2 flex w-full flex-col items-center gap-6 lg:order-2">
            <div className="relative flex w-full items-center justify-center">
              {/* Glow halo behind cover */}
              <div
                className="pointer-events-none absolute rounded-full transition-all duration-700"
                style={{
                  width: "280px",
                  height: "280px",
                  background: book.accentRaw,
                  filter: "blur(90px)",
                  opacity: 0.18,
                  zIndex: 0,
                }}
              />

              {/* Main cover */}
              <div
                className="relative z-10 transition-all duration-500 right-[-4%]"
                style={{ width: "min(350px, 72vw)" }}
              >
                <CoverArt
                  book={book}
                  className="relative top-2 shadow-2xl ring-1 ring-white/10"
                  showMeta={false}
                />
              </div>

              {/* Floating card: Genre + Score */}
              <div className="absolute top-0 right-[8%] z-20 flex flex-col gap-2 sm:right-[12%] lg:right-[4%]">
                <div
                  className="self-start backdrop-blur-sm rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide transition-all duration-500"
                  style={{
                    background: book.accentBg,
                    color: book.accent,
                    border: `1px solid ${book.accentBorder}`,
                  }}
                >
                  {book.genre}
                </div>

                <div className="min-w-32.5 rounded-2xl border border-border/60 bg-card/95 px-4 py-3.5 shadow-xl backdrop-blur-md">
                  <div className="mb-2 flex items-center gap-0.5">
                    {stars.map((filled, i) => (
                      <StarIcon
                        key={`${book.id}-star-${i.toString()}`}
                        weight={filled ? "fill" : "regular"}
                        className="h-3.5 w-3.5"
                        style={{
                          color: filled
                            ? "#fbbf24"
                            : "hsl(var(--muted-foreground))",
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black leading-none tabular-nums text-foreground">
                      {book.score}
                    </span>
                    <span className="text-xs text-muted-foreground">/ 5</span>
                  </div>

                  <p className="mt-1 text-[11px] text-muted-foreground">
                    {book.reviews} مراجعة
                  </p>
                </div>
              </div>

              {/* Floating card: Reading progress */}
              <div className="absolute bottom-0 left-[8%] z-20 min-w-40 max-w-45 rounded-2xl border border-border/60 bg-card/95 px-4 py-4 shadow-xl backdrop-blur-md sm:left-[12%] lg:left-[8%]">
                <div
                  className="mb-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: book.accent }}
                >
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full"
                    style={{ background: book.accent }}
                  />
                  يقرأ الآن
                </div>

                <p className="mb-0.5 line-clamp-2 text-sm font-bold leading-tight text-card-foreground">
                  {book.title}
                </p>
                <p className="mb-3 text-xs text-muted-foreground">
                  {book.author}
                </p>

                <div className="space-y-1.5">
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      style={{
                        width: `${book.progress}%`,
                        background: book.accent,
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">
                      التقدم
                    </span>
                    <span
                      className="text-[11px] font-bold tabular-nums"
                      style={{ color: book.accent }}
                    >
                      {book.progress}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating pill: Reader count */}
              <div className="absolute bottom-8 right-[6%] z-20 flex items-center gap-2 rounded-full border border-border/60 bg-card/95 px-3.5 py-2 shadow-lg backdrop-blur-md sm:right-[10%] lg:right-[6%]">
                <UsersThreeIcon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <span className="text-xs font-bold tabular-nums text-foreground">
                  {book.readers}
                </span>
                <span className="text-[11px] text-muted-foreground">قارئ</span>
              </div>
            </div>

            {/* Thumbnail selector filmstrip */}
            {/*<div
              className="flex items-end justify-center gap-3 overflow-visible pb-1 relative left-5"
              dir="ltr"
            >
              {FEATURED.map((b, i) => {
                const isActive = i === activeIdx;

                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={b.title}
                    className="group flex flex-col items-center gap-2 focus:outline-none"
                  >
                    <div
                      className="relative overflow-hidden transition-all duration-300"
                      style={{
                        width: isActive ? "64px" : "52px",
                        aspectRatio: "2/3",
                        borderRadius: "10px",
                        opacity: isActive ? 1 : 0.5,
                        transform: isActive
                          ? "translateY(-4px)"
                          : "translateY(0)",
                        boxShadow: isActive
                          ? `0 8px 24px ${b.accentRaw}50, 0 0 0 2px ${b.accentRaw}`
                          : "0 2px 8px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(160deg, ${b.coverFrom} 0%, ${b.coverVia} 50%, ${b.coverTo} 100%)`,
                        }}
                      />
                      <div
                        className="absolute inset-0 opacity-[0.08]"
                        style={{
                          backgroundImage: `repeating-linear-gradient(-52deg, transparent, transparent 4px, ${b.stripeColor} 4px, ${b.stripeColor} 5px)`,
                        }}
                      />
                      {isActive ? (
                        <div
                          className="absolute inset-x-0 top-0 h-1/2"
                          style={{
                            background:
                              "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
                          }}
                        />
                      ) : null}
                    </div>

                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        height: "4px",
                        width: isActive ? "20px" : "4px",
                        background: isActive ? b.accent : "hsl(var(--border))",
                      }}
                    />
                  </button>
                );
              })}
            </div>*/}
          </div>
        </div>
      </div>

      {/* Bottom feature strip */}
      <div className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-8 lg:px-12">
          <div className="flex items-center gap-0 overflow-x-auto scrollbar-none">
            {[
              { icon: BookOpenIcon, text: "تتبّع قراءاتك بسهولة" },
              { icon: UsersThreeIcon, text: "انضم لمجتمع القراء" },
              { icon: StarIcon, text: "توصيات مخصّصة لك" },
              { icon: SparkleIcon, text: "ابنِ رفّك الرقمي" },
            ].map(({ icon: Icon, text }, i) => (
              <div key={text} className="flex shrink-0 items-center">
                {i > 0 ? (
                  <Separator
                    orientation="vertical"
                    className="mx-5 h-3 shrink-0"
                  />
                ) : null}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span className="whitespace-nowrap text-xs">{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
