import type { AuthorType } from "@features/author/server/get-author";
import {
  MedalIcon,
  TrophyIcon,
} from "@phosphor-icons/react";


// ─── Mock data — replace with real queries ───────────────────────────────────

const MOCK_AWARDS = [
  { year: "1988", name: "جائزة نوبل في الأدب", icon: "trophy" },
  { year: "1972", name: "جائزة الدولة التقديرية", icon: "medal" },
  { year: "1966", name: "قلادة الجمهورية", icon: "medal" },
  { year: "1959", name: "جائزة الدولة للتفوق", icon: "medal" },
];

const MOCK_FRIENDS = [
  {
    initials: "عخ",
    name: "عمر خ.",
    bg: "bg-violet-100 dark:bg-violet-900",
    text: "text-violet-800 dark:text-violet-200",
  },
  {
    initials: "سم",
    name: "سارة م.",
    bg: "bg-emerald-100 dark:bg-emerald-900",
    text: "text-emerald-800 dark:text-emerald-200",
  },
  {
    initials: "من",
    name: "محمد ن.",
    bg: "bg-amber-100 dark:bg-amber-900",
    text: "text-amber-800 dark:text-amber-200",
  },
];

const MOCK_RANKINGS = [
  { label: "الأدب العربي", rank: "#1" },
  { label: "الرواية التاريخية", rank: "#3" },
  { label: "الكلاسيكيات", rank: "#7" },
];

export function AuthorSidebar({ author: _author }: { author: AuthorType }) {
  return (
    <div className="flex flex-col gap-4" dir="rtl">
      {/* Awards */}
      <SidebarCard title="الجوائز">
        <div className="flex flex-col divide-y divide-border">
          {MOCK_AWARDS.map((award) => (
            <div key={award.year} className="flex items-center gap-2 py-2.5 first:pt-0 last:pb-0">
              <span className="text-[11px] text-muted-foreground w-9 shrink-0">{award.year}</span>
              <span className="text-xs text-foreground flex-1 leading-snug">{award.name}</span>
              {award.icon === "trophy" ? (
                <TrophyIcon weight="duotone" className="size-4 text-amber-500 shrink-0" />
              ) : (
                <MedalIcon weight="duotone" className="size-4 text-amber-400 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </SidebarCard>

      {/* Friends */}
      <SidebarCard title="أصدقاء يقرؤون له">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {MOCK_FRIENDS.map((f) => (
            <div
              key={f.initials}
              className="flex items-center gap-1.5 rounded-full border border-border px-2 py-1"
            >
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-medium ${f.bg} ${f.text}`}
              >
                {f.initials}
              </div>
              <span className="text-[11px] text-muted-foreground">{f.name}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">5 من أصدقائك يقرؤون له</p>
      </SidebarCard>

      {/* Rankings */}
      <SidebarCard title="الأكثر قراءة في">
        <div className="flex flex-col gap-2">
          {MOCK_RANKINGS.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-xs text-foreground">{r.label}</span>
              <span className="text-xs font-semibold text-primary">{r.rank}</span>
            </div>
          ))}
        </div>
      </SidebarCard>

      {/* Add to list */}

    </div>
  );
}

function SidebarCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
        {title}
      </p>
      {children}
    </div>
  );
}
