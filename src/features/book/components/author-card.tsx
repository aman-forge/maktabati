import { Button } from "@components/ui/button";
import {
  ArrowLeftIcon,
  BookOpenIcon,
  MapPinIcon,
  UsersThreeIcon,
  BookmarkSimpleIcon,
  CalendarBlankIcon,
} from "@phosphor-icons/react/dist/ssr";
import { Link } from "@tanstack/react-router";

import type { AuthorSummary } from "@/features/books/types";

interface AuthorCardProps {
  author?: AuthorSummary | null;
}

// TODO: Replace with database-backed follower counts once follow tables exist.
const PLACEHOLDER_FOLLOWERS = "403K";

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null;

  const stats = [
    {
      label: "مواليد",
      value: author.birthYear || "—",
      icon: <CalendarBlankIcon weight="duotone" className="h-4 w-4" />,
    },
    {
      label: "الكتب",
      value: author.totalBooks,
      icon: <BookmarkSimpleIcon weight="duotone" className="h-4 w-4" />,
    },
    {
      label: "المتابعون",
      value: PLACEHOLDER_FOLLOWERS,
      icon: <UsersThreeIcon weight="duotone" className="h-4 w-4" />,
    },
  ];

  return (
    <section
      id="author"
      dir="rtl"
      className="sticky top-7 flex max-h-[calc(100vh-40px)] flex-col gap-2"
    >
      {/* Section header */}
      <div className="flex items-center gap-2">
        <div className="bg-primary h-5 w-1 rounded-full" />
        <h2
          className="text-foreground text-lg font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          عن المؤلف
        </h2>
      </div>

      <div className="bg-card border-border overflow-hidden overflow-y-scroll! rounded-2xl border shadow-sm transition-shadow hover:shadow-md">
        {/* ── Banner ── */}
        <div className="relative h-24 overflow-hidden">
          {/* Rich gradient banner instead of flat primary */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.7) 50%, hsl(var(--primary) / 0.4) 100%)",
            }}
          />
          {/* Decorative circles for depth */}
          <div
            className="absolute -top-6 -left-6 h-28 w-28 rounded-full opacity-20"
            style={{ background: "hsl(var(--primary-foreground))" }}
          />
          <div
            className="absolute -bottom-4 left-16 h-16 w-16 rounded-full opacity-10"
            style={{ background: "hsl(var(--primary-foreground))" }}
          />
          <div
            className="absolute top-2 right-8 h-10 w-10 rounded-full opacity-15"
            style={{ background: "hsl(var(--primary-foreground))" }}
          />
        </div>

        <div className="px-5 pb-6">
          {/* ── Avatar + CTA row ── */}
          <div className="-mt-20 mb-4 flex items-center justify-center">
            {/* Avatar with status ring */}
            <div className="relative">
              <div
                className="ring-card w-full overflow-hidden rounded-2xl shadow-lg ring-[3px]"
                style={{ borderRadius: "16px" }}
              >
                <img
                  src={author.profileImage ?? "/books/book.jpg"}
                  alt={author.name ?? "المؤلف"}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between">
            {/* ── Name & location ── */}
            <div>
              <h3
                className="text-foreground text-base leading-tight font-bold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {author.name || "—"}
              </h3>
              {author.nationality && (
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[13px]">
                  <MapPinIcon weight="fill" className="h-3.5 w-3.5 shrink-0 opacity-60" />
                  {author.nationality}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              nativeButton={false}
              render={
                <Link to="/author/$id" params={{ id: author.id }}>
                  <span>معرفة المزيد</span>
                  <ArrowLeftIcon weight="bold" className="h-3.5 w-3.5" />
                </Link>
              }
            />
          </div>

          {/* ── Stats ── */}
          <div className="bg-muted/50 border-border/50 mb-4 flex items-stretch overflow-hidden rounded-xl border divide-x-reverse">
            {stats.map(({ label, value, icon }) => (
              <div
                key={label}
                className="flex flex-1 flex-col items-center gap-1 border-l px-3 py-2.5 last:border-l-0"
              >
                <span className="text-primary opacity-80">{icon}</span>
                <span className="text-foreground text-sm leading-none font-bold tabular-nums">
                  {value}
                </span>
                <span className="text-muted-foreground text-[11px] leading-none">{label}</span>
              </div>
            ))}
          </div>

          {/* ── Bio ── */}
          {author.bio && (
            <p className="text-muted-foreground mb-5 line-clamp-5 text-right text-[13px] leading-[1.7]">
              {author.bio}
            </p>
          )}

          {/* ── Divider with label ── */}
          <div className="relative mb-4 flex items-center">
            <div className="border-border flex-1 border-t" />
            <span className="text-muted-foreground bg-card mx-3 text-[11px] font-semibold tracking-widest whitespace-nowrap uppercase">
              أعمال أخرى
            </span>
            <div className="border-border flex-1 border-t" />
          </div>

          {/* ── Other books grid ── */}
          <div className="flex w-full items-start gap-2">
            {author?.books?.slice(0, 3).map((b) => (
              <Link
                key={b.id}
                to="/book/$id"
                params={{ id: b.id }}
                className="group flex flex-1 flex-col items-center gap-1.5"
              >
                <div className="relative w-full overflow-hidden rounded-xl shadow-sm transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <img
                    className="aspect-2/3 w-full object-cover"
                    src={b.coverImageUrl ?? "/books/book.jpg"}
                    alt={b.title ?? "كتاب"}
                  />
                  {/* Hover overlay */}
                  <div className="bg-primary/10 absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <p className="text-muted-foreground group-hover:text-foreground line-clamp-2 w-full text-center text-[11px] leading-tight transition-colors">
                  {b.title || "—"}
                </p>
              </Link>
            ))}

            {/* "View all" tile */}
            <Link to="/" className="group flex flex-1 flex-col items-center gap-1.5">
              <div className="bg-muted border-border hover:border-primary/40 hover:bg-primary/5 flex aspect-2/3 w-full items-center justify-center rounded-xl border border-dashed transition-all duration-200 group-hover:-translate-y-0.5">
                <BookOpenIcon className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
              </div>
              <p className="text-muted-foreground group-hover:text-foreground text-center text-[11px] leading-tight transition-colors">
                عرض الكل
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
