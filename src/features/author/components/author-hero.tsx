import type { AuthorType } from "@features/author/server/get-author";
import { BookOpenIcon, MapPinIcon, UserPlusIcon } from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

// ─── Main component ───────────────────────────────────────────────────────────
export function AuthorHero({ author }: { author: AuthorType }) {
  const initials = useMemo(
    () =>
      (author.name ?? "")
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join(""),
    [author.name],
  );

  return (
    <section className="relative overflow-hidden border-b" dir="rtl">
      {/* ── Atmospheric background layers ── */}
      <div className="from-muted/10 via-muted/25 to-muted/40 pointer-events-none absolute inset-0 bg-linear-to-b" />
      <div className="bg-[radial-gradient(ellipse_80%_60%_at_80%_0%,color-mix(in srgb, var(--primary) 22%, transparent),transparent)] pointer-events-none absolute inset-0" />

      {/* Mobile-only: strong radial behind avatar area */}
      <div className="bg-[radial-gradient(ellipse_100%_80%_at_50%_0%,color-mix(in srgb,var(--primary)_18%,transparent),transparent)] pointer-events-none absolute inset-x-0 top-0 h-72 sm:hidden" />

      {/* Subtle top accent line */}
      <div className="via-primary/40 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:gap-14">
          {/* ── Avatar column ── */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            {/* Mobile-only eyebrow label — sits above avatar for editorial feel */}
            <div className="flex items-center gap-2 sm:hidden">
              <div className="bg-primary/40 h-px w-8" />
              <span className="text-primary/60 text-[9px] font-bold tracking-[0.25em] uppercase">
                مؤلف
              </span>
              <div className="bg-primary/40 h-px w-8" />
            </div>

            <div className="relative">
              {/* Outer atmospheric glow — more pronounced on mobile */}
              <div className="from-primary via-primary/10 absolute -inset-3 rounded-full bg-linear-to-br to-transparent blur-lg sm:-inset-2 sm:blur-md" />

              <div className="border-primary/50 absolute -inset-1.5 animate-[spin_20s_linear_infinite] rounded-full border border-dashed" />
              {/* Inner border ring */}
              <div className="from-primary/30 to-border/20 absolute -inset-0.5 rounded-full bg-linear-to-br" />
              <div className="relative">
                {author.profileImage ? (
                  <img
                    src={author.profileImage}
                    alt={author.name ?? ""}
                    className="border-background h-40 w-40 rounded-full border-2 object-cover shadow-2xl sm:h-55 sm:w-55"
                  />
                ) : (
                  <div className="border-background flex h-40 w-40 items-center justify-center rounded-full border-2 bg-violet-50 shadow-2xl sm:h-44 sm:w-44 dark:bg-violet-950">
                    <span className="font-serif text-5xl font-light tracking-tight text-violet-700 sm:text-5xl dark:text-violet-300">
                      {initials}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Follow button */}
            <Button
              size="sm"
              variant="outline"
              className="w-full max-w-45 gap-1.5 text-xs"
              disabled
            >
              <UserPlusIcon weight="bold" className="size-3.5" />
              المتابعة قريباً
            </Button>
          </div>

          {/* ── Info column ── */}
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            {/* Eyebrow label — desktop/tablet only (mobile has it above avatar) */}
            <div className="hidden items-center gap-2.5 sm:flex">
              <div className="bg-primary/50 h-px w-10" />
              <span className="text-primary/70 text-[10px] font-semibold tracking-[0.2em] uppercase">
                مؤلف
              </span>
            </div>

            {/* Name + location */}
            <div className="space-y-2 text-center sm:text-start">
              <h1 className="text-foreground font-serif text-4xl leading-[1.1] font-light tracking-tight sm:text-5xl">
                {author.name}
              </h1>
              {author.nationality && (
                <p className="flex items-center justify-center gap-1.5 text-xs sm:justify-start">
                  <MapPinIcon className="text-primary/60 size-3.5 shrink-0" />
                  <span className="text-muted-foreground">{author.nationality}</span>
                  {author.birthYear && (
                    <span className="text-muted-foreground/70">
                      · {author.birthYear}
                      {author.deathYear ? ` – ${author.deathYear}` : ""}
                    </span>
                  )}
                </p>
              )}
            </div>

            {/* Stats row */}
            {/* Mobile: full-width with more padding; tablet+: unchanged compact pill */}
            <div className="border-border/50 bg-background/40 flex w-full items-stretch gap-0 overflow-hidden rounded-xl border shadow-sm backdrop-blur-sm sm:w-fit">
              <StatCell
                label="كتاباً"
                value={author.books.length > 0 ? author.books.length.toString() : "—"}
                mobile
              />
            </div>

            {/* Thin decorative rule */}
            <div className="via-border/60 -mx-1 h-px bg-linear-to-l from-transparent to-transparent" />

            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                type="button"
                size="sm"
                className="w-full gap-2 text-xs sm:w-auto"
                render={
                  <Link to="/discover/books" search={{ author: author.slug }}>
                    <BookOpenIcon weight="bold" className="size-3.5" />
                    استكشف الكتب
                  </Link>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="via-border/60 absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent" />
    </section>
  );
}

// ─── Stat cell ────────────────────────────────────────────────────────────────
function StatCell({ label, value, mobile }: { label: string; value: string; mobile?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-0.5 py-3 ${mobile ? "flex-1 px-3 sm:flex-none sm:px-5" : "px-5"}`}
    >
      <span className="text-foreground text-base leading-none font-semibold tabular-nums">
        {value}
      </span>
      <span className="text-muted-foreground/70 mt-1 text-[10px] tracking-wide">{label}</span>
    </div>
  );
}
