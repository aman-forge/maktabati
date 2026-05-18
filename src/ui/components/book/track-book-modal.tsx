import {
  ArrowCounterClockwiseIcon,
  BookmarkSimpleIcon,
  BookOpenIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  ClockIcon,
  HeartIcon,
  NotePencilIcon,
  PauseIcon,
  ProhibitIcon,
  StarIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@shadcn/dialog";
import { Input } from "@shadcn/input";
import { Textarea } from "@shadcn/textarea";
import React from "react";

import { TrackingDataType } from "@/features/books/server/update-book";
import { cn } from "@/ui/lib/utils";

import type { BaseBook } from "../../../features/books/types";
import { Label } from "../ui/label";

// ─── helpers ──────────────────────────────────────────────────────

function dateToInputValue(d: Date | string | undefined | null): string {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
}

function inputValueToDateString(s: string): string | null {
  // Returns null (not undefined) so callers can distinguish "not set" from "not provided"
  return s || null;
}

// ─── Date rules per status ─────────────────────────────────────────
// Defines which date fields are active and what happens on status change.
//
//  want_to_read     → clear both dates (hasn't started)
//  currently_reading → keep/set startDate, clear finishDate
//  on_hold          → keep both (was reading, paused)
//  completed        → keep both (both are meaningful)
//  dropped          → keep startDate, clear finishDate (never finished)

function getDateRulesForStatus(status: ReadingStatus) {
  return {
    showStart: status !== "want_to_read",
    showFinish: status === "completed",
    clearStartOnSwitch: status === "want_to_read",
    clearFinishOnSwitch: status !== "completed",
  };
}

/* ─── Status config ───────────────────────────────────────────── */
const STATUSES = [
  {
    value: "want_to_read" as const,
    label: "أخطط للقراءة",
    icon: BookmarkSimpleIcon,
    pill: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    active: "bg-slate-600 border-slate-600 shadow-slate-500/30 shadow-md text-white",
    dot: "bg-slate-400",
    barColor: "bg-slate-400",
  },
  {
    value: "currently_reading" as const,
    label: "أقرأ حالياً",
    icon: BookOpenIcon,
    pill: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    active: "bg-sky-500 border-sky-500 shadow-sky-500/30 shadow-md text-white",
    dot: "bg-sky-400",
    barColor: "bg-sky-400",
  },
  {
    value: "completed" as const,
    label: "مكتمل",
    icon: CheckCircleIcon,
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    active: "bg-emerald-500 border-emerald-500 shadow-emerald-500/30 shadow-md text-white",
    dot: "bg-emerald-400",
    barColor: "bg-emerald-400",
  },
  {
    value: "on_hold" as const, // ✅ was missing entirely
    label: "مؤجل",
    icon: PauseIcon,
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    active: "bg-amber-500 border-amber-500 shadow-amber-500/30 shadow-md text-white",
    dot: "bg-amber-400",
    barColor: "bg-amber-400",
  },
  {
    value: "dropped" as const,
    label: "متروك",
    icon: ProhibitIcon,
    pill: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    active: "bg-rose-500 border-rose-500 shadow-rose-500/30 shadow-md text-white",
    dot: "bg-rose-400",
    barColor: "bg-rose-400",
  },
] as const satisfies ReadonlyArray<{
  value: TrackingDataType["status"];
  label: string;
  icon: React.ElementType;
  pill: string;
  active: string;
  dot: string;
  barColor: string;
}>;

type ReadingStatus = TrackingDataType["status"];

/* ─── Rating labels ───────────────────────────────────────────────── */
const SCORE_LABELS: Record<number, string> = {
  0: "لم تقيّم بعد",
  1: "مروّع",
  2: "سيئ جداً",
  3: "سيئ",
  4: "مقبول",
  5: "متوسط",
  6: "جيد",
  7: "جيد جداً",
  8: "رائع",
  9: "ممتاز",
  10: "تحفة فنية",
};

/* ─── Types ───────────────────────────────────────────────────────── */
interface TrackBookModalProps {
  book: BaseBook | null;
  open: boolean;
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (bookId: string, data: TrackingDataType) => Promise<void>;
  initialData?: Partial<TrackingDataType>;
}

/* ─── Component ───────────────────────────────────────────────────── */
export function TrackBookModal({
  book,
  open,
  onOpenChange,
  onSave,
  isSaving,
  initialData,
}: TrackBookModalProps) {
  const [isFavorite, setIsFavorite] = React.useState(initialData?.isFavorite ?? false);
  const [status, setStatus] = React.useState<ReadingStatus>(initialData?.status ?? "want_to_read");
  const [score, setScore] = React.useState(initialData?.score ?? 0);
  const [pagesProgress, setPagesProgress] = React.useState(initialData?.pagesProgress ?? 0);
  // ✅ Both dates start empty — user must explicitly set them
  const [startDate, setStartDate] = React.useState<string>(
    dateToInputValue(initialData?.startDate),
  );
  const [finishDate, setFinishDate] = React.useState<string>(
    dateToInputValue(initialData?.finishDate),
  );
  const [notes, setNotes] = React.useState(initialData?.notes ?? "");
  const [rereadCount, setRereadCount] = React.useState(initialData?.rereadCount ?? 0);
  const [hoveredScore, setHoveredScore] = React.useState<number | null>(null);

  // ── Reset form when modal opens ───────────────────────────────────
  React.useEffect(() => {
    if (open && book) {
      setIsFavorite(initialData?.isFavorite ?? false);
      setStatus(initialData?.status ?? "want_to_read");
      setScore(initialData?.score ?? 0);
      setPagesProgress(initialData?.pagesProgress ?? 0);
      setStartDate(dateToInputValue(initialData?.startDate));
      setFinishDate(dateToInputValue(initialData?.finishDate));
      setNotes(initialData?.notes ?? "");
      setRereadCount(initialData?.rereadCount ?? 0);
    }
  }, [open, book, initialData]);

  // ── Status change: update pages + clear dates per rules ───────────
  const handleStatusChange = (next: ReadingStatus) => {
    const rules = getDateRulesForStatus(next);

    setStatus(next);

    // Pages
    if (next === "completed" && book?.pageCount) {
      setPagesProgress(book.pageCount);
    } else if (next === "want_to_read") {
      setPagesProgress(0);
    }

    // ✅ Clear dates based on what makes sense for each status
    if (rules.clearStartOnSwitch) setStartDate("");
    if (rules.clearFinishOnSwitch) setFinishDate("");

    // ✅ Auto-set today's start date when switching to actively reading
    if (next === "currently_reading" && !startDate) {
      setStartDate(new Date().toISOString().split("T")[0]);
    }
  };

  // ── Save ──────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!book || !onSave) return;

    const rules = getDateRulesForStatus(status);

    await onSave(book.id, {
      status,
      score,
      pagesProgress,
      startDate: rules.showStart ? inputValueToDateString(startDate) : null,
      finishDate: rules.showFinish ? inputValueToDateString(finishDate) : null,
      notes,
      isFavorite,
      rereadCount,
    });
  };

  if (!book) return null;

  const totalPages = book.pageCount || 0;
  const progressPercent = totalPages > 0 ? Math.min((pagesProgress / totalPages) * 100, 100) : 0;
  const currentStatus = STATUSES.find((s) => s.value === status);
  const dateRules = getDateRulesForStatus(status);
  const displayScore = hoveredScore ?? score;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className={cn(
          "p-0 gap-0 border-0 overflow-hidden",
          "w-[95vw] max-w-lg",
          "bg-card dark:bg-background",
          "shadow-2xl shadow-background/60 dark:shadow-primary/40",
          "rounded-2xl",
          "max-h-[92vh] flex flex-col",
        )}
        showCloseButton={false}
      >
        {/* ── Cover Hero ─────────────────────────────────────────── */}
        <div className="relative h-48 shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${book.coverImageUrl ?? "/books/book.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(5px) brightness(0.4) saturate(1.6)",
            }}
          />
          <div className="to-card dark:to-background absolute inset-0 bg-linear-to-b from-transparent" />

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="bg-secondary text-secondary-foreground hover:bg-accent/50! absolute top-3 left-3 z-10 h-8 w-8 rounded-xl backdrop-blur-sm"
            aria-label="إغلاق"
          >
            <XIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            onClick={() => setIsFavorite((f) => !f)}
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-3 right-3 z-10 w-8 h-8 rounded-xl backdrop-blur-sm transition-all duration-200",
              isFavorite
                ? "bg-rose-500 text-background! dark:text-foreground! hover:bg-rose-500/80 border-rose-500 scale-105"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-rose-400",
            )}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <HeartIcon weight={isFavorite ? "fill" : "bold"} className="h-4 w-4" />
          </Button>

          <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 px-5 pb-12">
            <div className="z-10 h-26 w-18 shrink-0 translate-y-5 overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10">
              <img
                src={book.coverImageUrl || "/books/book.jpg"}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <DialogTitle className="line-clamp-2 text-lg leading-snug font-bold text-white">
                {book.title}
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-sm text-white/50">
                {book.author?.name}
              </DialogDescription>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {book.publicationYear && (
                  <span className="rounded-full border border-white/10 bg-white/8 px-2 py-0.5 text-[11px] text-white/60">
                    {book.publicationYear}
                  </span>
                )}
                {book.pageCount && (
                  <span className="rounded-full border border-white/10 bg-white/8 px-2 py-0.5 text-[11px] text-white/60">
                    {book.pageCount} صفحة
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ─────────────────────────────────────── */}
        <div className="bg-card dark:bg-background flex-1 space-y-6 overflow-y-auto pt-8 pb-4">
          {/* ── Status ────────────────────────────────────────────── */}
          <section className="space-y-2.5">
            <SectionLabel icon={<ClockIcon className="h-3.5 w-3.5" />}>حالة القراءة</SectionLabel>
            <div className="no-scrollbar flex flex-nowrap gap-1.5 overflow-x-auto px-4">
              {STATUSES.map((s) => {
                const Icon = s.icon;
                const isActive = status === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => handleStatusChange(s.value)} // ✅ was setStatus directly
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 text-nowrap cursor-pointer shrink-0",
                      isActive ? s.active : cn(s.pill, "hover:brightness-125"),
                    )}
                  >
                    <Icon weight={isActive ? "fill" : "bold"} className="h-3.5 w-3.5 shrink-0" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </section>

          <Divider />

          {/* ── Progress ───────────────────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <SectionLabel icon={<BookOpenIcon className="h-3.5 w-3.5" />}>
              التقدم في القراءة
            </SectionLabel>
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Input
                  type="number"
                  min={0}
                  max={totalPages || 9999}
                  value={pagesProgress || ""}
                  onChange={(e) =>
                    setPagesProgress(
                      Math.max(0, Math.min(totalPages || 9999, parseInt(e.target.value, 10) || 0)),
                    )
                  }
                  disabled={status === "completed" || status === "want_to_read" || isSaving}
                  placeholder="0"
                  className="pl-16"
                />
                <span className="text-muted-foreground/40 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs tabular-nums">
                  / {totalPages || "؟"}
                </span>
              </div>
              <div
                className={cn(
                  "w-14 h-9 flex items-center justify-center rounded-lg border text-sm font-bold tabular-nums shrink-0 transition-colors",
                  progressPercent >= 100
                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                    : progressPercent > 0
                      ? "bg-sky-500/15 text-sky-400 border-sky-500/25"
                      : "text-muted-foreground/30 bg-muted/30 border-border/30",
                )}
              >
                {Math.round(progressPercent)}%
              </div>
            </div>
            {totalPages > 0 && (
              <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    progressPercent >= 100 ? "bg-emerald-400" : "bg-sky-400",
                  )}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
          </section>

          <Divider />

          {/* ── Dates ─────────────────────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <SectionLabel icon={<CalendarBlankIcon className="h-3.5 w-3.5" />}>
              التواريخ
            </SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <DateField
                id="start-date"
                label="بدأت القراءة"
                value={startDate}
                onChange={setStartDate}
                disabled={!dateRules.showStart || isSaving}
              />
              <DateField
                id="finish-date"
                label="انتهيت من القراءة"
                value={finishDate}
                onChange={setFinishDate}
                disabled={!dateRules.showFinish || isSaving}
              />
            </div>
            {/* Contextual hint — only show when finish date is locked */}
            {!dateRules.showFinish && (
              <p className="text-muted-foreground/35 flex items-center gap-1.5 text-[11px]">
                <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
                {status === "want_to_read"
                  ? "التواريخ متاحة بعد بدء القراءة"
                  : "تاريخ الانتهاء متاح عند تعيين الحالة إلى «مكتمل»"}
              </p>
            )}
          </section>

          <Divider />

          {/* ── Notes (hidden/TODO) ────────────────────────────────── */}
          <section className="hidden space-y-2.5 px-4">
            <SectionLabel icon={<NotePencilIcon className="h-3.5 w-3.5" />}>ملاحظاتي</SectionLabel>
            <Textarea
              disabled // TODO: NOTES
              placeholder="اكتب انطباعاتك وملاحظاتك عن الكتاب..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none text-sm"
            />
          </section>

          {/* ── Score (hidden/TODO) ────────────────────────────────── */}
          <section className="hidden space-y-2.5 px-4">
            <div className="flex items-center justify-between">
              <SectionLabel icon={<StarIcon className="h-3.5 w-3.5" />}>التقييم</SectionLabel>
              <span
                className={cn(
                  "text-xs font-semibold transition-colors",
                  displayScore > 0 ? "text-amber-400" : "text-muted-foreground/40",
                )}
              >
                {displayScore > 0
                  ? `${displayScore} · ${SCORE_LABELS[displayScore]}`
                  : SCORE_LABELS[0]}
              </span>
            </div>
            {/* biome-ignore lint/a11y/noStaticElementInteractions: intentional */}
            <div className="flex gap-1" onMouseLeave={() => setHoveredScore(null)}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <Button
                  disabled // TODO: RATING
                  key={n}
                  type="button"
                  variant="outline"
                  onClick={() => setScore(n === score ? 0 : n)}
                  onMouseEnter={() => setHoveredScore(n)}
                  className={cn(
                    "flex-1 h-8 rounded-lg border transition-all duration-100 text-xs font-semibold",
                    (hoveredScore != null ? n <= hoveredScore : n <= score) &&
                      "bg-amber-400/40 border-amber-400/70! hover:bg-amber-400 hover:border-amber-400 text-foreground scale-105 shadow-sm shadow-amber-400/30",
                  )}
                >
                  {n}
                </Button>
              ))}
            </div>
          </section>

          {/* ── Reread (hidden/TODO) ───────────────────────────────── */}
          <section className="hidden space-y-2.5 px-4">
            <SectionLabel icon={<ArrowCounterClockwiseIcon className="h-3.5 w-3.5" />}>
              عدد مرات القراءة
            </SectionLabel>
            <div className="flex items-center gap-3">
              <Button
                disabled // TODO: REREAD
                type="button"
                onClick={() => setRereadCount((c) => Math.max(0, c - 1))}
                variant="outline"
                aria-label="تقليل"
              >
                −
              </Button>
              <span className="text-foreground w-10 text-center text-2xl font-bold tabular-nums">
                {rereadCount}
              </span>
              <Button
                disabled // TODO: REREAD
                type="button"
                onClick={() => setRereadCount((c) => c + 1)}
                variant="outline"
                aria-label="زيادة"
              >
                +
              </Button>
              <span className="text-muted-foreground/40 mr-1 text-xs">
                {rereadCount === 0
                  ? "أول قراءة"
                  : rereadCount === 1
                    ? "قرأته مرة من قبل"
                    : `قرأته ${rereadCount} مرات`}
              </span>
            </div>
          </section>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="border-border/10 bg-card dark:bg-background flex shrink-0 items-center justify-between gap-3 border-t px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            {currentStatus && (
              <span className={cn("w-2 h-2 rounded-full shrink-0", currentStatus.dot)} />
            )}
            <span className="text-muted-foreground truncate text-sm">{currentStatus?.label}</span>
            {isFavorite && (
              <>
                <span className="text-muted-foreground/20 shrink-0">·</span>
                <HeartIcon weight="fill" className="h-3.5 w-3.5 shrink-0 text-rose-400" />
              </>
            )}
            {score > 0 && (
              <>
                <span className="text-muted-foreground/20 shrink-0">·</span>
                <span className="shrink-0 text-xs font-semibold text-amber-400 tabular-nums">
                  {score}/10
                </span>
              </>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              type="button"
              onClick={() => onOpenChange(false)}
              variant="ghost"
              size="sm"
              disabled={isSaving}
            >
              إلغاء
            </Button>
            <Button type="button" onClick={handleSave} disabled={isSaving} size="sm">
              {isSaving ? "جاري الحفظ..." : "حفظ التتبع"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────── */
function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground/50 flex items-center gap-1.5 px-4 text-[11px] font-semibold tracking-widest uppercase">
      {icon}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="bg-border/30 mx-4 h-px" />;
}

function DateField({
  id,
  label,
  value,
  onChange,
  disabled,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-muted-foreground/40 block text-[11px] font-medium">
        {label}
      </Label>
      <Input
        id={id}
        dir="rtl"
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(disabled && "opacity-30 cursor-not-allowed pointer-events-none")}
      />
    </div>
  );
}
