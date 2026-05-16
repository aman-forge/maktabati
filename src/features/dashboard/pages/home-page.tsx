import {
  BookOpenIcon,
  CaretRightIcon,
  ChartBarIcon,
  ChatCircleIcon,
  ClockIcon,
  FireIcon,
  type Icon,
  PlusIcon,
  StarIcon,
  TargetIcon,
  UserIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ReadingBook = {
  id: string;
  title: string;
  author: string;
  authorId: string;
  currentPage: number;
  totalPages: number;
  progress: number;
  tone: string;
  coverUrl?: string;
};

type ActivityItem = {
  userId: string;
  user: string;
  action: string;
  book: string;
  bookId: string;
  detail: string;
  time: string;
  type: "read" | "review" | "comment" | "goal";
};

type GoalItem = {
  label: string;
  value: string;
  progress: number;
  hint: string;
  isStreak?: boolean;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const inProgressBooks: ReadingBook[] = [
  {
    id: "way-of-kings",
    title: "طريق الملوك",
    author: "براندون ساندرسون",
    authorId: "brandon-sanderson",
    progress: 68,
    currentPage: 542,
    totalPages: 800,
    tone: "فانتازيا ملحمية",
  },
  {
    id: "lies-of-locke",
    title: "أكاذيب لوك لامورا",
    author: "سكوت لينش",
    authorId: "scott-lynch",
    progress: 41,
    currentPage: 190,
    totalPages: 460,
    tone: "فانتازيا",
  },
  {
    id: "fifth-season",
    title: "الموسم الخامس",
    author: "ن. ك. جيمي سين",
    authorId: "nk-jemisin",
    progress: 22,
    currentPage: 84,
    totalPages: 380,
    tone: "خيال علمي",
  },
];

const activityFeed: ActivityItem[] = [
  {
    userId: "abdulrahman",
    user: "عبدالرحمن النحاس",
    action: "بدأ قراءة",
    book: "اسم الريح",
    bookId: "name-of-the-wind",
    detail: "أضافه إلى رف «قيد القراءة» — 876 صفحة لباتريك روثفوس",
    time: "منذ 3 دقائق",
    type: "read",
  },
  {
    userId: "me",
    user: "أنت",
    action: "قرأت 33 صفحة في",
    book: "كلمات الإشراق",
    bookId: "words-of-radiance",
    detail: "من الصفحة 310 إلى 343 — جلسة 46 دقيقة. تقدمك الآن 61٪",
    time: "منذ 18 دقيقة",
    type: "read",
  },
  {
    userId: "omar",
    user: "عمر خالد",
    action: "كتب مراجعة لـ",
    book: "ولد الضباب",
    bookId: "mistborn",
    detail: "«واحدة من أكثر الروايات إثارة قرأتها هذا العام...» — 6 نجوم",
    time: "منذ ساعة",
    type: "review",
  },
  {
    userId: "sara",
    user: "سارة محمد",
    action: "علّقت على نقاش في",
    book: "دير شجرة البرتقال",
    bookId: "my-name-is-red",
    detail: "«الترجمة العربية أجمل من النص الأصلي — الأسلوب أكثر شاعرية»",
    time: "منذ ساعتين",
    type: "comment",
  },
  {
    userId: "me",
    user: "أنت",
    action: "أنجزت 34 كتاباً في",
    book: "تحدي القراءة السنوي",
    bookId: "reading-challenge-2025",
    detail: "60٪ مكتمل — في المسار الصحيح للإنهاء قبل نهاية العام بـ 30 يوماً",
    time: "اليوم",
    type: "goal",
  },
];

const streak = {
  days: 13,
  todayDone: false,
  weekDays: ["س", "ح", "ن", "ث", "ر", "خ", "ج"], // السبت → الجمعة
  completedDays: [true, true, true, true, true, true, false], // اليوم = الجمعة
};

const goals: GoalItem[] = [
  {
    label: "كتب هذا العام",
    value: "34 / 40",
    progress: 85,
    hint: "6 كتب متبقية",
  },
  {
    label: "صفحات هذا الشهر",
    value: "1380 / 1600",
    progress: 86,
    hint: "220 صفحة متبقية",
  },
];

const stats = [
  { label: "كتب منتهية", value: "34", icon: BookOpenIcon },
  { label: "صفحات مقروءة", value: "8430", icon: ChartBarIcon },
  { label: "ساعات القراءة", value: "136 س", icon: ClockIcon },
  { label: "أصدقاء نشطون", value: "18", icon: UsersIcon },
];

// ─── Activity config ──────────────────────────────────────────────────────────

const activityConfig = {
  read: {
    icon: BookOpenIcon,
    dotClass: "bg-emerald-500",
    ringClass: "ring-emerald-500/20",
  },
  review: {
    icon: StarIcon,
    dotClass: "bg-violet-500",
    ringClass: "ring-violet-500/20",
  },
  comment: {
    icon: ChatCircleIcon,
    dotClass: "bg-sky-500",
    ringClass: "ring-sky-500/20",
  },
  goal: {
    icon: TargetIcon,
    dotClass: "bg-amber-500",
    ringClass: "ring-amber-500/20",
  },
} as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardHome() {
  return (
    <main className="container mx-auto min-h-screen px-4 py-6">
      {/* Mobile */}
      <div className="space-y-6 xl:hidden">
        <StreakCard streak={streak} />

        <PanelCard
          title="قيد القراءة"
          subtitle={`${inProgressBooks.length} كتب تقرأها الآن`}
          actionLabel="مكتبتي"
          actionHref="/library"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {inProgressBooks.map((book) => (
              <ReadingCard key={book.id} book={book} />
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="الأهداف"
          subtitle="تقدمك هذا العام"
          actionLabel="التفاصيل"
          actionHref="/settings/goals"
        >
          <div className="space-y-3">
            {goals.map((goal) => (
              <GoalCard key={goal.label} goal={goal} />
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="ملخص العام"
          subtitle="إحصائياتك لعام 2026"
          actionLabel="التفاصيل"
          actionHref="/statistics"
        >
          <div className="mt-2 grid grid-cols-2 gap-3">
            {stats.map((item) => (
              <StatCard key={item.label} label={item.label} value={item.value} icon={item.icon} />
            ))}
          </div>
        </PanelCard>

        <PanelCard
          title="النشاط"
          subtitle="أصدقاؤك وحياتك القرائية"
          actionLabel="الموجز الكامل"
          actionHref="/activity"
        >
          <div className="space-y-0">
            {activityFeed.map((item, i) => (
              <ActivityRow
                key={`${item.userId}-${item.time}`}
                item={item}
                isLast={i === activityFeed.length - 1}
              />
            ))}
          </div>
        </PanelCard>
      </div>

      {/* Desktop */}
      <div className="hidden xl:grid xl:grid-cols-[1.7fr_1fr] xl:gap-6">
        {/* First column */}
        <div className="space-y-6">
          <PanelCard
            title="قيد القراءة"
            subtitle={`${inProgressBooks.length} كتب تقرأها الآن`}
            actionLabel="مكتبتي"
            actionHref="/library"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {inProgressBooks.map((book) => (
                <ReadingCard key={book.id} book={book} />
              ))}
            </div>
          </PanelCard>

          <PanelCard
            title="النشاط"
            subtitle="أصدقاؤك وحياتك القرائية"
            actionLabel="الموجز الكامل"
            actionHref="/activity"
          >
            <div className="space-y-0">
              {activityFeed.map((item, i) => (
                <ActivityRow
                  key={`${item.userId}-${item.time}`}
                  item={item}
                  isLast={i === activityFeed.length - 1}
                />
              ))}
            </div>
          </PanelCard>
        </div>

        {/* Second column */}
        <div className="space-y-6">
          <StreakCard streak={streak} />

          <PanelCard
            title="الأهداف"
            subtitle="تقدمك هذا العام"
            actionLabel="التفاصيل"
            actionHref="/settings/goals"
          >
            <div className="space-y-3">
              {goals.map((goal) => (
                <GoalCard key={goal.label} goal={goal} />
              ))}
            </div>
          </PanelCard>

          <PanelCard
            title="ملخص العام"
            subtitle="إحصائياتك لعام 2026"
            actionLabel="التفاصيل"
            actionHref="/statistics"
          >
            <div className="mt-2 grid grid-cols-2 gap-3">
              {stats.map((item) => (
                <StatCard key={item.label} label={item.label} value={item.value} icon={item.icon} />
              ))}
            </div>
          </PanelCard>
        </div>
      </div>
    </main>
  );
}

// ─── Panel wrapper ────────────────────────────────────────────────────────────

function PanelCard({
  title,
  subtitle,
  actionLabel,
  actionHref,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={["rounded-2xl border bg-card p-5 shadow-sm", className ?? ""].join(" ")}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight">{title}</h2>
          {subtitle && <p className="text-muted-foreground mt-0.5 text-sm">{subtitle}</p>}
        </div>
        {actionLabel && actionHref && (
          <Link
            to={actionHref}
            className="text-muted-foreground hover:text-foreground inline-flex shrink-0 items-center gap-1 text-xs transition-colors"
          >
            {actionLabel}
            <CaretRightIcon weight="bold" className="h-3 w-3 rotate-180" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

// ─── Reading card ─────────────────────────────────────────────────────────────

function ReadingCard({ book }: { book: ReadingBook }) {
  return (
    <article className="group bg-background hover:border-border/80 relative rounded-xl border p-3 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-3">
        <img
          src={book.coverUrl ?? "/books/book.jpg"}
          alt={book.title}
          loading="lazy"
          decoding="async"
          className="bg-muted aspect-2/3 h-auto w-16 rounded-lg object-cover"
        />

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <Link to={`/book/$id`} params={{ id: book.id }}>
              <h3 className="hover:text-primary truncate text-sm leading-snug font-semibold transition-colors">
                {book.title}
              </h3>
            </Link>
            {/*TODO: UPDATE URL*/}
            <Link to={`/`}>
              <p className="text-muted-foreground hover:text-foreground mt-0.5 text-xs transition-colors hover:underline">
                {book.author}
              </p>
            </Link>
          </div>

          <div className="mt-3 flex w-full gap-2">
            <div className="flex-1">
              <div className="text-muted-foreground mb-1.5 flex items-center justify-between text-[11px]">
                <span>
                  صفحة {book.currentPage} من {book.totalPages}
                </span>
                <span className="text-foreground font-medium">{book.progress}٪</span>
              </div>
              <div className="bg-muted h-1.5 overflow-hidden rounded-full">
                <div
                  className="bg-primary h-1.5 rounded-full transition-all"
                  style={{ width: `${book.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-1 flex justify-end">
              <Button type="button" variant="ghost" size="xs" className="gap-0.5 px-2 text-xs">
                <PlusIcon weight="bold" className="h-3 w-3 rotate-180" />
                تحديث
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Activity row ─────────────────────────────────────────────────────────────

function ActivityRow({ item, isLast }: { item: ActivityItem; isLast: boolean }) {
  const cfg = activityConfig[item.type];
  const isMe = item.userId === "me";

  return (
    <div className="relative flex gap-3 pb-4 last:pb-0">
      {/* Timeline line */}
      {!isLast && <div className="bg-border absolute top-7 right-3 bottom-0 w-px" />}

      {/* Dot */}
      <div className="relative z-10 shrink-0">
        <div
          className={`ring-background flex h-6 w-6 items-center justify-center rounded-full ring-4 ${cfg.dotClass}`}
        >
          <cfg.icon className="size-3 text-white" weight="bold" />
        </div>
      </div>

      {/* Card */}
      <div className="bg-background hover:border-border/80 min-w-0 flex-1 rounded-xl border p-3 transition-all hover:shadow-sm">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-secondary flex h-7 w-7 items-center justify-center rounded-full">
              <UserIcon weight="duotone" className="text-muted-foreground size-4" />
            </div>
            {isMe ? (
              <span className="text-sm font-semibold">أنت</span>
            ) : (
              <Link
                to={`/`} // TODO: UPDATE URL - /u/${item.userId}
                className="hover:text-primary text-sm font-semibold transition-colors"
              >
                {item.user}
              </Link>
            )}
          </div>
          <span className="text-muted-foreground bg-muted shrink-0 rounded-full px-2 py-0.5 text-[11px]">
            {item.time}
          </span>
        </div>

        {/* Content */}
        <div className="flex gap-3">
          {item.type !== "goal" && (
            <Link to={`/book/$id`} params={{ id: item.bookId }} className="shrink-0">
              <img
                src={"/books/book.jpg"}
                alt={item.bookId}
                loading="lazy"
                decoding="async"
                className="bg-muted aspect-2/3 h-auto w-16 rounded-lg object-cover"
              />
            </Link>
          )}

          <div className="min-w-0 flex-1 space-y-1.5">
            <p className="text-sm leading-relaxed">
              <span className="text-muted-foreground">{item.action} </span>
              {item.type === "goal" ? (
                <span className="font-semibold">{item.book}</span>
              ) : (
                <Link
                  to={`/book/$id`}
                  params={{ id: item.bookId }}
                  className="hover:text-primary font-semibold transition-colors"
                >
                  {item.book}
                </Link>
              )}
            </p>

            <p className="text-muted-foreground bg-muted/60 rounded-lg px-2.5 py-2 text-xs leading-relaxed">
              {item.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Streak card ─────────────────────────────────────────────────────────────

type StreakData = {
  days: number;
  todayDone: boolean;
  weekDays: string[];
  completedDays: boolean[];
};

function StreakCard({ streak }: { streak: StreakData }) {
  return (
    <section className="bg-card relative overflow-hidden rounded-2xl border p-5 shadow-sm">
      {/* Subtle amber glow behind the number */}
      <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl" />

      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold tracking-tight">سلسلة القراءة</h2>
          <p className="text-muted-foreground mt-0.5 text-sm">حافظ على القراءة يومياً</p>
        </div>
        <Link
          to="/" // TODO: UPDATE URL
          className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs transition-colors"
        >
          تعديل
          <CaretRightIcon weight="bold" className="h-3 w-3 rotate-180" />
        </Link>
      </div>

      {/* Big number — Duolingo style */}
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-amber-400/15">
          <FireIcon weight="fill" className="h-8 w-8 text-amber-500" />
        </div>
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight text-amber-500">{streak.days}</span>
            <span className="text-muted-foreground text-sm font-medium">يوم</span>
          </div>
          <span
            className={[
              "mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              streak.todayDone
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
            ].join(" ")}
          >
            {streak.todayDone ? <>✓ أنجزت اليوم</> : <>اقرأ الليلة للحفاظ عليها</>}
          </span>
        </div>
      </div>

      {/* Week dots — Duolingo style */}
      <div className="flex items-center justify-between gap-1">
        {streak.weekDays.map((day, i) => (
          <div key={day} className="flex flex-1 flex-col items-center gap-1.5">
            <div
              className={[
                "flex h-8 w-full max-w-8 items-center justify-center rounded-lg text-[11px] font-medium transition-all",
                streak.completedDays[i]
                  ? "bg-amber-400 text-white shadow-sm"
                  : i === streak.weekDays.length - 1 && !streak.todayDone
                    ? "border-2 border-dashed border-amber-300 text-amber-400"
                    : "bg-muted text-muted-foreground",
              ].join(" ")}
            >
              {streak.completedDays[i] ? <FireIcon weight="fill" className="size-3.5" /> : day}
            </div>
            <span className="text-muted-foreground text-[10px]">{day}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Goal card (simplified, no streak logic) ──────────────────────────────────

function GoalCard({ goal }: { goal: GoalItem }) {
  return (
    <div className="bg-background flex items-center gap-4 rounded-xl border p-3">
      {/* Circular progress */}
      <div className="relative h-14 shrink-0">
        <svg viewBox="0 0 36 36" className="size-14 -rotate-90">
          <title>logo</title>
          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-muted"
          />
          <circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray={`${goal.progress}, 100`}
            strokeLinecap="round"
            className="text-primary transition-all duration-500"
          />
        </svg>
        <span className="absolute inset-0 -mb-0.5 flex items-center justify-center text-sm font-semibold">
          {goal.progress}٪
        </span>
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <p className="text-sm leading-snug font-medium">{goal.label}</p>
        <p className="text-muted-foreground mt-0.5 text-xs">{goal.value}</p>
        <p className="text-muted-foreground mt-1 text-[11px]">{goal.hint}</p>
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: Icon }) {
  return (
    <div className="bg-background rounded-xl border p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="bg-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <Icon weight="duotone" className="text-primary h-4 w-4" />
        </div>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-muted-foreground mt-0.5 text-xs">{label}</p>
    </div>
  );
}
