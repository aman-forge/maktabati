import { Badge } from "@components/ui/badge";
import { Separator } from "@components/ui/separator";
import {
  ArrowUpRight,
  Book,
  Heart,
  Lightning,
  MagnifyingGlass,
  Planet,
  Scroll,
  Sparkle,
  User,
} from "@phosphor-icons/react/dist/ssr";

type Genre = {
  name: string;
  icon: React.ElementType;
  count: string;
  hsl: string;
};

const GENRES: Genre[] = [
  { name: "الرواية الأدبية", icon: Book, count: "142 ألف", hsl: "30 80% 55%" },
  { name: "الخيال العلمي", icon: Planet, count: "98 ألف", hsl: "220 70% 60%" },
  { name: "الفانتازيا", icon: Sparkle, count: "201 ألف", hsl: "145 55% 48%" },
  { name: "الإثارة", icon: Lightning, count: "76 ألف", hsl: "15 85% 55%" },
  { name: "الرومانسية", icon: Heart, count: "310 ألف", hsl: "350 70% 60%" },
  {
    name: "الغموض",
    icon: MagnifyingGlass,
    count: "89 ألف",
    hsl: "270 55% 58%",
  },
  {
    name: "الرواية التاريخية",
    icon: Scroll,
    count: "64 ألف",
    hsl: "45 65% 50%",
  },
  {
    name: "المذكرات والسيرة الذاتية",
    icon: User,
    count: "53 ألف",
    hsl: "195 55% 50%",
  },
];

export function GenreGrid() {
  return (
    <section dir="rtl" className="container mx-auto flex flex-col gap-8 px-6 lg:px-12">
      {/* Section header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="bg-primary h-5 w-1 shrink-0 rounded-full" aria-hidden="true" />
            <h2
              className="text-foreground text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              تصفح حسب التصنيفات
            </h2>
          </div>
          <p className="text-muted-foreground pe-3 text-sm">
            ابحث عن قراءتك المثالية عبر مجموعات التصنيفات المنتقاة بعناية.
          </p>
        </div>

        <Badge
          variant="secondary"
          className="shrink-0 rounded-full px-3 py-1.5 text-xs tabular-nums"
        >
          {GENRES.length} تصنيفات
        </Badge>
      </div>

      <Separator className="bg-border -mt-2" />

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {GENRES.map((genre) => {
          const Icon = genre.icon;
          const color = `hsl(${genre.hsl})`;
          const colorBg = `hsl(${genre.hsl} / 0.1)`;
          const colorGlow = `hsl(${genre.hsl} / 0.12)`;

          return (
            <a
              key={genre.name}
              href="/"
              className="group border-border bg-card hover:border-border/80 focus-visible:ring-ring relative flex flex-col gap-4 overflow-hidden rounded-2xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus-visible:ring-2 focus-visible:outline-none"
              aria-label={`تصفح ${genre.name}`}
            >
              {/* Radial glow on hover */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 15% 0%, ${colorGlow} 0%, transparent 65%)`,
                }}
              />

              {/* Icon bubble */}
              <div
                className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl shadow-sm transition-transform duration-200 group-hover:scale-110"
                style={{ backgroundColor: colorBg, color }}
              >
                <Icon weight="duotone" className="h-5 w-5" />
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-1 flex-col gap-0.5">
                <h3 className="text-foreground text-sm leading-snug font-semibold text-balance">
                  {genre.name}
                </h3>
                <p className="text-muted-foreground text-xs">{genre.count} كتاب</p>
              </div>

              {/* Explore arrow — slides in on hover */}
              <div
                className="relative z-10 flex translate-y-1 items-center gap-1 text-xs font-medium opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
                style={{ color }}
              >
                استكشف
                <ArrowUpRight weight="bold" className="h-3.5 w-3.5" />
              </div>

              {/* Subtle bottom accent line */}
              <div
                className="absolute inset-x-0 bottom-0 h-0.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{
                  background: `linear-gradient(to left, ${color}, transparent)`,
                }}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
