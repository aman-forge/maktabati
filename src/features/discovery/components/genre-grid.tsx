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
  /** Raw hsl values e.g. "25 90% 55%" — consumed as hsl(var) */
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
    <section dir="rtl" className="flex flex-col gap-8 px-6 lg:px-12 container mx-auto">
      {/* Section header */}
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1 h-5 rounded-full bg-primary shrink-0" aria-hidden="true" />
            <h2
              className="text-2xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              تصفح حسب التصنيفات
            </h2>
          </div>
          <p className="text-sm text-muted-foreground pe-3">
            ابحث عن قراءتك المثالية عبر مجموعات التصنيفات المنتقاة بعناية.
          </p>
        </div>

        <Badge
          variant="secondary"
          className="shrink-0 text-xs px-3 py-1.5 rounded-full tabular-nums"
        >
          {GENRES.length} تصنيفات
        </Badge>
      </div>

      <Separator className="bg-border -mt-2" />

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {GENRES.map((genre) => {
          const Icon = genre.icon;
          const color = `hsl(${genre.hsl})`;
          const colorBg = `hsl(${genre.hsl} / 0.1)`;
          const colorGlow = `hsl(${genre.hsl} / 0.12)`;

          return (
            <a
              key={genre.name}
              href="/"
              className="group relative flex flex-col gap-4 p-5 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:border-border/80 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`تصفح ${genre.name}`}
            >
              {/* Radial glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 15% 0%, ${colorGlow} 0%, transparent 65%)`,
                }}
              />

              {/* Icon bubble */}
              <div
                className="relative z-10 w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-sm"
                style={{ backgroundColor: colorBg, color }}
              >
                <Icon weight="duotone" className="w-5 h-5" />
              </div>

              {/* Text */}
              <div className="relative z-10 flex flex-col gap-0.5 flex-1">
                <h3 className="text-sm font-semibold leading-snug text-balance text-foreground">
                  {genre.name}
                </h3>
                <p className="text-xs text-muted-foreground">{genre.count} كتاب</p>
              </div>

              {/* Explore arrow — slides in on hover */}
              <div
                className="relative z-10 flex items-center gap-1 text-xs font-medium transition-all duration-200 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                style={{ color }}
              >
                استكشف
                <ArrowUpRight weight="bold" className="w-3.5 h-3.5" />
              </div>

              {/* Subtle bottom accent line */}
              <div
                className="absolute bottom-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
