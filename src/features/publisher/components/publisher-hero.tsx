import type { PublisherType } from "@/features/publisher/server/get-publisher";

import { CalculatorIcon } from "@phosphor-icons/react";
import { useMemo } from "react";

import { cn } from "@/ui/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────


// Dev-only previews — real DB values always win via ?? below
const DEMO_BANNER_URL =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80";
const DEMO_BRAND_COLOR = "#8B1538";
const DEMO_TAGLINE = "نشر الفكر العربي · إحياء التراث · بناء المعرفة";
const DEMO_FOUNDED_YEAR = 1987;

// ─── Helpers ──────────────────────────────────────────────────────────────────

const DEFAULT_TAGLINE = "نشر الفكر · إحياء الكلمة · بناء المعرفة";

/** Darken a hex color toward black by `amount` (0–1). */
function darken(hex: string, amount: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const d = 1 - amount;
  return `#${[r, g, b]
    .map((c) => Math.round(c * d).toString(16).padStart(2, "0"))
    .join("")}`;
}

/** hex + alpha → rgba string */
function rgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}


// ─── Main component ───────────────────────────────────────────────────────────
export function PublisherHero({ publisher }: { publisher: PublisherType }) {
  const p = publisher as PublisherType & {
    bannerUrl?: string;
    brandColor?: string;
    tagline?: string;
    description?: string;
    foundedYear?: number;
  };

  const isDev = import.meta.env.DEV;

  const bannerUrl = p.bannerUrl ?? (isDev ? DEMO_BANNER_URL : undefined);
  const brandColorFromData =
    p.brandColor ?? (isDev ? DEMO_BRAND_COLOR : undefined);
  const brandColor = brandColorFromData ?? "#334155"; // slate-700 neutral fallback
  const tagline = p.tagline ?? (isDev ? DEMO_TAGLINE : undefined);
  const foundedYear = p.foundedYear ?? (isDev ? DEMO_FOUNDED_YEAR : undefined);

  const initials = useMemo(
    () =>
      publisher.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join(""),
    [publisher.name],
  );


  const uniqueSeriesCount = useMemo(
    () =>
      new Set(publisher.books.filter((b) => b.series).map((b) => b.series!.id)).size,
    [publisher.books],
  );

  const stats = [
    { num: publisher.books.length, label: "كتاب" },
    { num: uniqueSeriesCount, label: "سلسلة" },
  ].filter((s) => s.num > 0);

  // ── Banner background ───────────────────────────────────────────────────────
  // Priority: bannerUrl (image) > brandColor (solid/gradient) > dark slate fallback

  const bannerBg = useMemo((): React.CSSProperties => {
    if (bannerUrl) {
      // Image banner — brandColor used for the scrim tint so the logo/text stays legible
      return {
        backgroundImage: `url(${bannerUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }

    if (brandColorFromData) {
      // No image — rich two-stop gradient from brand color
      const lighter = darken(brandColor, -0.12); // slightly lighten for 'from'
      const darker = darken(brandColor, 0.4);   // deep dark for 'to'
      return {
        background: `linear-gradient(135deg, ${darker} 0%, ${brandColor} 55%, ${lighter} 100%)`,
      };
    }

    // Neutral fallback
    return {
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 55%, #334155 100%)",
    };
  }, [bannerUrl, brandColorFromData, brandColor]);

  // Scrim tint: when there's a banner image, overlay the brand color as a semi-transparent wash
  const scrimStyle: React.CSSProperties = bannerUrl
    ? { background: `linear-gradient(to left, ${rgba(brandColor, 0.72)} 0%, ${rgba(darken(brandColor, 0.45), 0.88)} 100%)` }
    : {};

  // On-banner text color (always light, since banner is always dark/tinted)
  const onBanner = "#f8fafc";

  // CTA button color uses the brand color if it's light enough to read on, else primary var

  return (
    <section className="relative overflow-hidden border-b" dir="rtl">
      {/* ── Page-level atmospheric background (below banner) ── */}
      <div className="from-muted/10 via-muted/25 to-muted/40 pointer-events-none absolute inset-0 bg-linear-to-b" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 15% 0%, ${rgba(brandColor, 0.18)}, transparent)`,
        }}
      />

      {/* ══════════════════════════════════════════════════════════════════════
          BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full overflow-hidden"
        style={{ ...bannerBg, minHeight: "230px" }}
      >
        {/* Brand-color scrim over image (no-op when no image) */}
        {bannerUrl && (
          <div className="absolute inset-0" style={scrimStyle} />
        )}

        {/* Radial spotlight — top-right accent */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 55% 75% at 95% -5%, ${rgba(brandColor, 0.5)}, transparent 70%)`,
          }}
        />

        {/* Fine dot-grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "18px 18px",
            color: onBanner,
          }}
        />

        {/* Bottom fade into page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/40 to-transparent"
        />

        {/* Faded publisher-name watermark */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        >
          <span
            className="whitespace-nowrap text-[clamp(3rem,10vw,7rem)] font-black tracking-tight opacity-[0.05]"
            style={{ color: onBanner }}
          >
            {publisher.name}
          </span>
        </div>

        {/* ── Banner foreground content ── */}
        <div
          className="relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-4 pb-8 pt-10 sm:px-6 lg:px-8"
          style={{ minHeight: "230px" }}
        >
          <div className="flex items-end gap-5">
            {/* Logo / Avatar — overhangs into the info section below */}
            <div className="relative shrink-0">
              {/* Glow halo */}
              <div
                className="absolute -inset-2 rounded-3xl blur-md"
                style={{ background: rgba(brandColor, 0.5) }}
              />

              {/* Avatar box */}
              <div
                className="relative flex size-24 items-center justify-center overflow-hidden rounded-3xl border-2 shadow-2xl md:size-28"
                style={{
                  borderColor: rgba(onBanner, 0.25),
                  background: rgba(darken(brandColor, 0.5), 0.65),
                  backdropFilter: "blur(10px)",
                }}
              >
                {publisher.logoUrl ? (
                  <img
                    src={publisher.logoUrl}
                    alt={publisher.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span
                    className="text-3xl font-light tracking-tight md:text-4xl"
                    style={{ color: onBanner }}
                  >
                    {initials}
                  </span>
                )}
              </div>
            </div>

            {/* Publisher name + label */}
            <div className="pb-1">
              <p
                className="mb-1 text-[10px] font-semibold tracking-[0.25em] uppercase opacity-65"
                style={{ color: onBanner }}
              >
                دار نشر
              </p>
              <h1
                className="text-2xl font-semibold tracking-tight drop-shadow-lg md:text-3xl"
                style={{ color: onBanner }}
              >
                {publisher.name}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          INFO ROW  (below banner)
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:gap-14">

          {/* Spacer matching avatar width on desktop */}
          <div className="hidden shrink-0 sm:block" style={{ width: "7rem" }} />

          {/* ── Info column ── */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">

            {/* Tagline */}
            <p className="text-muted-foreground/70 text-sm tracking-wider text-center sm:text-start">
              {tagline ?? DEFAULT_TAGLINE}
            </p>

            {/* Founded pill */}
            {foundedYear && (
              <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-amber-500/20 bg-amber-50/80 px-3.5 py-1.5 text-xs font-medium text-amber-700 shadow-sm sm:mx-0 dark:bg-amber-950/40 dark:text-amber-300">
                <CalculatorIcon weight="duotone" className="size-3.5 text-amber-500" />
                تأسست عام {foundedYear}
              </div>
            )}

            {/* Stats pill */}
            {stats.length > 0 && (
              <div className="border-border/50 bg-background/40 flex w-full items-stretch overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm sm:w-fit">
                {stats.map(({ num, label }, i) => (
                  <div
                    key={label}
                    className={cn("flex-1 sm:flex-none", i > 0 && "border-r border-border/40 border-r-reverse")}
                  >
                    <StatCell label={label} value={num.toLocaleString("ar-US")} />
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="via-border/60 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </section>
  );
}

// ─── Stat cell ────────────────────────────────────────────────────────────────
function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-4 py-3 sm:px-5">
      <span className="text-foreground text-base leading-none font-semibold tabular-nums">
        {value}
      </span>
      <span className="text-muted-foreground/70 mt-1 text-[10px] tracking-wide">{label}</span>
    </div>
  );
}