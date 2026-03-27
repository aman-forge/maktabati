"use client";

import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { ArrowLeftIcon, BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { Author, Book } from "@server/db/schema/tables";
import Image from "next/image";
import Link from "next/link";

interface AuthorCardProps {
  author?: Author & { books: Book[] | null };
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null;

  return (
    <section id="author" dir="rtl" className="flex flex-col gap-6">
      <h2
        className="text-xl font-bold text-foreground"
        style={{ fontFamily: "var(--font-display)" }}
      >
        عن المؤلف
      </h2>

      <div className="rounded-2xl overflow-hidden bg-card border border-border">
        {/* Banner */}
        <div className="h-20 relative bg-secondary overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, hsl(var(--primary) / 0.6) 0%, transparent 60%)",
            }}
          />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + follow row */}
          <div className="flex items-end justify-between -mt-10 mb-5">
            <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 ring-[3px] ring-card shadow-md">
              <Image
                src={author.profileImage}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 rounded-xl mb-1"
            >
              متابعة
              <ArrowLeftIcon weight="bold" className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Name, location, stats, bio, tags */}
          <div className="flex flex-col gap-3">
            <div>
              <h3
                className="text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {author.name}
              </h3>
              <p className="text-sm text-muted-foreground">{author.country}</p>
            </div>

            {/* Stats */}
            {/* <div className="flex items-center gap-5">
              {author.stats.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center">
                  <span className="text-base font-bold text-foreground tabular-nums">
                    {value}
                  </span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div> */}

            <p className="text-sm leading-relaxed text-muted-foreground">
              {author.bio}
            </p>

            {/* <div className="flex flex-wrap gap-2 mt-1">
              {author.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs rounded-full border-border text-muted-foreground"
                >
                  {tag}
                </Badge>
              ))}
            </div> */}
          </div>

          <Separator className="my-5 bg-border" />

          {/* Other books */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              أعمال أخرى للمؤلف
            </p>

            <div className="flex gap-3">
              {author?.books?.map((b) => (
                <Link
                  key={b.title}
                  href="/"
                  className="group flex flex-col gap-1.5 shrink-0"
                >
                  <div
                    className="relative w-14 rounded-lg overflow-hidden shadow-sm transition-shadow group-hover:shadow-md"
                    style={{ aspectRatio: "2/3" }}
                  >
                    <Image
                      src={b.coverImageUrl}
                      alt={b.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[11px] leading-tight line-clamp-2 text-balance text-muted-foreground max-w-14">
                    {b.title}
                  </p>
                </Link>
              ))}

              {/* "View all" slot */}
              <Link
                href="/"
                className="flex flex-col items-center gap-1.5 w-14 shrink-0"
              >
                <div
                  className="w-14 rounded-lg flex items-center justify-center bg-secondary border border-dashed border-border text-muted-foreground transition-colors hover:text-foreground"
                  style={{ aspectRatio: "2/3" }}
                >
                  <BookOpenIcon className="w-5 h-5" />
                </div>
                <p className="text-[11px] leading-tight text-center text-muted-foreground">
                  عرض الكل
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
