import type { PublisherType } from "@/features/publisher/server/get-publisher";

import {
  ArrowSquareOutIcon,
  FacebookLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MedalIcon,
  TiktokLogoIcon,
  TrophyIcon,
  XLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Add these optional fields to your PublisherType / DB schema:
 *
 *   socials?: {
 *     x?:         string   // handle or full URL
 *     instagram?: string
 *     facebook?:  string
 *     linkedin?:  string
 *     youtube?:   string
 *     tiktok?:    string
 *   }
 *   awards?:  { year: string; name: string; icon?: "trophy" | "medal" }[]
 *   genres?:  string[]        // e.g. ["رواية", "شعر", "أطفال"]
 *   brandColor?: string       // hex — used for accent highlights
 */

type PublisherSocials = {
  x?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
};

// Dev-only previews — real DB values always win via ?? above
const DEMO_SOCIALS: PublisherSocials = {
  instagram: "maktabati",
  x: "maktabati",
  facebook: "maktabati",
  youtube: "maktabati",
  linkedin: "maktabati",
};

const DEMO_AWARDS: { year: string; name: string; icon?: "trophy" | "medal" }[] = [
  { year: "2023", name: "جائزة الدولة للثقافة والفنون", icon: "trophy" },
  { year: "2019", name: "جائزة الشيخ زayed للكتاب", icon: "medal" },
  { year: "2015", name: "جائزة كتارا للرواية العربية", icon: "trophy" },
];

const DEMO_GENRES = ["رواية", "شعر", "أطفال", "تاريخ", "فلسفة"];

// ─── Social platform config ───────────────────────────────────────────────────

const SOCIAL_CONFIG = [
  {
    key: "x" as const,
    label: "X / تويتر",
    Icon: XLogoIcon,
    color: "hover:bg-black/8 dark:hover:bg-white/10 hover:text-black dark:hover:text-white",
    accent: "#000000",
    toUrl: (v: string) =>
      v.startsWith("http") ? v : `https://x.com/${v.replace(/^@/, "")}`,
  },
  {
    key: "instagram" as const,
    label: "إنستغرام",
    Icon: InstagramLogoIcon,
    color: "hover:bg-pink-50 dark:hover:bg-pink-950/40 hover:text-pink-600 dark:hover:text-pink-400",
    accent: "#e1306c",
    toUrl: (v: string) =>
      v.startsWith("http") ? v : `https://instagram.com/${v.replace(/^@/, "")}`,
  },
  {
    key: "facebook" as const,
    label: "فيسبوك",
    Icon: FacebookLogoIcon,
    color: "hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 dark:hover:text-blue-400",
    accent: "#1877f2",
    toUrl: (v: string) =>
      v.startsWith("http") ? v : `https://facebook.com/${v}`,
  },
  {
    key: "linkedin" as const,
    label: "لينكد إن",
    Icon: LinkedinLogoIcon,
    color: "hover:bg-sky-50 dark:hover:bg-sky-950/40 hover:text-sky-700 dark:hover:text-sky-400",
    accent: "#0a66c2",
    toUrl: (v: string) =>
      v.startsWith("http") ? v : `https://linkedin.com/company/${v}`,
  },
  {
    key: "youtube" as const,
    label: "يوتيوب",
    Icon: YoutubeLogoIcon,
    color: "hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-600 dark:hover:text-red-400",
    accent: "#ff0000",
    toUrl: (v: string) =>
      v.startsWith("http") ? v : `https://youtube.com/@${v.replace(/^@/, "")}`,
  },
  {
    key: "tiktok" as const,
    label: "تيك توك",
    Icon: TiktokLogoIcon,
    color: "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
    accent: "#010101",
    toUrl: (v: string) =>
      v.startsWith("http") ? v : `https://tiktok.com/@${v.replace(/^@/, "")}`,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function PublisherSidebar({ publisher }: { publisher: PublisherType }) {
  const p = publisher as PublisherType & {
    socials?: PublisherSocials;
    awards?: { year: string; name: string; icon?: "trophy" | "medal" }[];
    genres?: string[];
    brandColor?: string;
    website?: string;
  };

  const socials = p.socials ?? (import.meta.env.DEV ? DEMO_SOCIALS : {});
  const activeSocials = SOCIAL_CONFIG.filter(({ key }) => socials[key]);

  const awards = p.awards ?? (import.meta.env.DEV ? DEMO_AWARDS : []);
  const genres = p.genres ?? (import.meta.env.DEV ? DEMO_GENRES : []);
  const brandColor = p.brandColor;

  return (
    <div className="flex flex-col gap-4" dir="rtl">

      {/* ── Social Media ── */}
      {(activeSocials.length > 0 || p.website) && (
        <SidebarCard title="تواصل مع الدار">
          <div className="flex flex-col gap-1">

            {/* Website — always first */}
            {p.website && (
              <SocialRow
                href={p.website}
                label="الموقع الرسمي"
                icon={
                  <ArrowSquareOutIcon
                    weight="duotone"
                    className="size-4 shrink-0"
                  />
                }
                colorClass="hover:bg-muted hover:text-foreground"
                brandColor={brandColor}
              />
            )}

            {/* Dynamic social rows */}
            {activeSocials.map(({ key, label, Icon, color, toUrl }) => {
              const value = socials[key]!;
              const handle = value.startsWith("http")
                ? undefined
                : value.replace(/^@/, "");
              return (
                <SocialRow
                  key={key}
                  href={toUrl(value)}
                  label={label}
                  sublabel={handle ? `@${handle}` : undefined}
                  icon={<Icon weight="duotone" className="size-4 shrink-0" />}
                  colorClass={color}
                />
              );
            })}
          </div>
        </SidebarCard>
      )}

      {/* ── Awards ── */}
      {awards.length > 0 && (
        <SidebarCard title="الجوائز والتكريمات">
          <div className="divide-border flex flex-col divide-y">
            {awards.map((award) => (
              <div
                key={`${award.year}-${award.name}`}
                className="flex items-center gap-2 py-2.5 first:pt-0 last:pb-0"
              >
                <span className="text-muted-foreground w-9 shrink-0 text-[11px]">
                  {award.year}
                </span>
                <span className="text-foreground flex-1 text-xs leading-snug">
                  {award.name}
                </span>
                {award.icon === "trophy" ? (
                  <TrophyIcon
                    weight="duotone"
                    className="size-4 shrink-0 text-amber-500"
                  />
                ) : (
                  <MedalIcon
                    weight="duotone"
                    className="size-4 shrink-0 text-amber-400"
                  />
                )}
              </div>
            ))}
          </div>
        </SidebarCard>
      )}

      {/* ── Genres / Categories ── */}
      {genres.length > 0 && (
        <SidebarCard title="التخصصات">
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <span
                key={genre}
                className="border-border bg-muted/50 text-muted-foreground rounded-full border px-2.5 py-1 text-[11px]"
              >
                {genre}
              </span>
            ))}
          </div>
        </SidebarCard>
      )}

      {/* ── Quick stats ── */}
      <SidebarCard title="إحصائيات">
        <div className="flex flex-col gap-2">
          <StatRow
            label="إجمالي الكتب"
            value={publisher.books.length.toLocaleString("ar-US")}
          />
          {/* Series count */}
          {(() => {
            const count = new Set(
              publisher.books.filter((b) => b.series).map((b) => b.series!.id),
            ).size;
            return count > 0 ? (
              <StatRow
                label="السلاسل"
                value={count.toLocaleString("ar-US")}
              />
            ) : null;
          })()}
        </div>
      </SidebarCard>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SidebarCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-border bg-card rounded-xl border p-4">
      <p className=" mb-3 text-[11px] font-medium tracking-wide uppercase">
        {title}
      </p>
      {children}
    </div>
  );
}

function SocialRow({
  href,
  label,
  sublabel,
  icon,
  colorClass,
}: {
  href: string;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  colorClass: string;
  brandColor?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-2.5 rounded-lg px-2 py-2 text-xs transition-colors duration-150 ${colorClass} text-muted-foreground`}
    >
      {/* Icon */}
      <span className="shrink-0 transition-transform duration-150 group-hover:scale-110">
        {icon}
      </span>

      {/* Label + handle */}
      <div className="flex min-w-0 flex-1 items-baseline gap-1.5">
        <span className="font-medium">{label}</span>
        {sublabel && (
          <span className="text-muted-foreground/50 truncate text-[10px]">
            {sublabel}
          </span>
        )}
      </div>

      {/* External arrow */}
      <ArrowSquareOutIcon
        className="size-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-40"
      />
    </a>
  );
}

function StatRow({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        {icon}
        <span className="text-muted-foreground text-xs">{label}</span>
      </div>
      <span className="text-foreground text-xs font-semibold tabular-nums">
        {value}
      </span>
    </div>
  );
}