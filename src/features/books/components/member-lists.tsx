import { ArrowRightIcon, ThumbsUpIcon, UsersIcon } from "@phosphor-icons/react";
import Image from "next/image";

interface MemberList {
  id: string;
  title: string;
  curator: string;
  avatar: string;
  votes: number;
  bookCount: number;
  covers: string[];
  rank: number;
}

interface MemberListsProps {
  lists?: MemberList[];
}

export function MemberLists({ lists = [] }: MemberListsProps) {
  if (lists.length === 0) return null;

  return (
    <section className="flex flex-col gap-7">
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <UsersIcon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--muted-foreground)" }}
            >
              Community
            </span>
          </div>
          <h2
            className="text-2xl font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--foreground)",
            }}
          >
            Lists With This Book
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>
            Curated by our members &mdash; voted for by the community
          </p>
        </div>
        <a
          href="/"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: "var(--accent)" }}
        >
          Browse all lists <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map(({ id, title, curator, avatar, votes, bookCount, covers, rank }) => (
          <a
            key={id}
            href="/"
            className="group flex flex-col gap-4 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
            style={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 4px oklch(0 0 0 / 0.04)",
            }}
          >
            {/* Stacked covers */}
            <div className="flex items-end gap-0 relative h-16">
              {covers.map((src, i) => (
                <div
                  key={src}
                  className="absolute rounded-lg overflow-hidden shadow-md"
                  style={{
                    width: 36,
                    aspectRatio: "2/3",
                    left: i * 22,
                    zIndex: i,
                    transform: `rotate(${(i - 1) * 4}deg)`,
                    boxShadow: "0 4px 12px oklch(0 0 0 / 0.15)",
                  }}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
              {/* Rank pill */}
              <div
                className="absolute right-0 bottom-0 text-[10px] font-bold px-2 py-0.5 rounded-full"
                style={{
                  backgroundColor: "var(--badge-amber)",
                  color: "var(--badge-amber-fg)",
                }}
              >
                #{rank} on list
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1.5 mt-2">
              <h3
                className="text-sm font-bold leading-snug line-clamp-2 text-balance group-hover:underline underline-offset-2"
                style={{ color: "var(--foreground)" }}
              >
                {title}
              </h3>

              {/* Curator row */}
              <div className="flex items-center gap-2 mt-1">
                <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0">
                  <Image src={avatar} alt={curator} fill className="object-cover" />
                </div>
                <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                  by{" "}
                  <span className="font-semibold" style={{ color: "var(--foreground)" }}>
                    @{curator}
                  </span>
                </span>
                <span
                  className="text-xs ml-auto"
                  style={{ color: "var(--muted-foreground)", opacity: 0.6 }}
                >
                  {bookCount} books
                </span>
              </div>
            </div>

            {/* Votes */}
            <div
              className="flex items-center gap-1.5 pt-3 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <ThumbsUpIcon className="w-3.5 h-3.5" style={{ color: "var(--muted-foreground)" }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
                {votes.toLocaleString()} votes
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
