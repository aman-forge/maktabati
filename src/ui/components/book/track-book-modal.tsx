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
import { cn } from "@/ui/lib/utils";
import type { BookCardBook, BookType } from "../../../features/books/server/get-books";
import { Label } from "../ui/label";

/* ─── Status config ───────────────────────────────────────────────── */
const STATUSES = [
  {
    value: "plan-to-read",
    label: "أخطط للقراءة",
    icon: BookmarkSimpleIcon,
    pill: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    active: "bg-slate-600 border-slate-600 shadow-slate-500/30 shadow-md text-white",
    dot: "bg-slate-400",
    barColor: "bg-slate-400",
  },
  {
    value: "reading",
    label: "أقرأ حالياً",
    icon: BookOpenIcon,
    pill: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    active: "bg-sky-500 border-sky-500 shadow-sky-500/30 shadow-md text-white",
    dot: "bg-sky-400",
    barColor: "bg-sky-400",
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    active: "bg-emerald-500 border-emerald-500 shadow-emerald-500/30 shadow-md text-white",
    dot: "bg-emerald-400",
    barColor: "bg-emerald-400",
  },
  {
    value: "on-hold",
    label: "مؤجل",
    icon: PauseIcon,
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    active: "bg-amber-500 border-amber-500 shadow-amber-500/30 shadow-md text-white",
    dot: "bg-amber-400",
    barColor: "bg-amber-400",
  },
  {
    value: "dropped",
    label: "متروك",
    icon: ProhibitIcon,
    pill: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    active: "bg-rose-500 border-rose-500 shadow-rose-500/30 shadow-md text-white",
    dot: "bg-rose-400",
    barColor: "bg-rose-400",
  },
] as const;

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
export interface TrackingData {
  status: string;
  score: number;
  pagesProgress: number;
  startDate: string;
  finishDate: string;
  notes: string;
  isFavorite: boolean;
  rereadCount: number;
}

interface TrackBookModalProps {
  book: BookCardBook | BookType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (bookId: string, data: TrackingData) => void;
  initialData?: Partial<TrackingData>;
}

/* ─── Component ───────────────────────────────────────────────────── */
export function TrackBookModal({
  book,
  open,
  onOpenChange,
  onSave,
  initialData,
}: TrackBookModalProps) {
  const [isFavorite, setIsFavorite] = React.useState(initialData?.isFavorite ?? false);
  const [status, setStatus] = React.useState(initialData?.status ?? "plan-to-read");
  const [score, setScore] = React.useState(initialData?.score ?? 0);
  const [pagesProgress, setPagesProgress] = React.useState(initialData?.pagesProgress ?? 0);
  const [startDate, setStartDate] = React.useState(
    initialData?.startDate ?? new Date().toISOString().split("T")[0],
  );
  const [finishDate, setFinishDate] = React.useState(initialData?.finishDate ?? "");
  const [notes, setNotes] = React.useState(initialData?.notes ?? "");
  const [rereadCount, setRereadCount] = React.useState(initialData?.rereadCount ?? 0);
  const [hoveredScore, setHoveredScore] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (open && book) {
      setIsFavorite(initialData?.isFavorite ?? false);
      setStatus(initialData?.status ?? "plan-to-read");
      setScore(initialData?.score ?? 0);
      setPagesProgress(initialData?.pagesProgress ?? 0);
      setStartDate(initialData?.startDate ?? new Date().toISOString().split("T")[0]);
      setFinishDate(initialData?.finishDate ?? "");
      setNotes(initialData?.notes ?? "");
      setRereadCount(initialData?.rereadCount ?? 0);
    }
  }, [open, book, initialData]);

  const handleSave = () => {
    if (book && onSave) {
      onSave(book.id, {
        status,
        score,
        pagesProgress,
        startDate,
        finishDate,
        notes,
        isFavorite,
        rereadCount,
      });
    }
    onOpenChange(false);
  };

  if (!book) return null;

  const totalPages = book.pageCount || 0;
  const progressPercent = totalPages > 0 ? Math.min((pagesProgress / totalPages) * 100, 100) : 0;
  const currentStatus = STATUSES.find((s) => s.value === status);
  const showFinishDate = status === "completed";
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
          {/* Blurred background */}
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${book.coverImageUrl ?? "/books/book.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(5px) brightness(0.4) saturate(1.6)",
            }}
          />
          {/* Bottom fade to modal bg */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-card dark:to-background" />

          {/* Controls */}
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon"
            className="absolute top-3 left-3 z-10 w-8 h-8 rounded-xl backdrop-blur-sm bg-secondary text-secondary-foreground hover:bg-accent/50!"
            aria-label="إغلاق"
          >
            <XIcon className="w-4 h-4" />
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
                : " bg-secondary text-secondary-foreground hover:bg-accent hover:text-rose-400",
            )}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <HeartIcon weight={isFavorite ? "fill" : "bold"} className="w-4 h-4" />
          </Button>

          {/* Book info row */}
          <div className="absolute bottom-0 inset-x-0 flex items-end gap-4 px-5 pb-12">
            {/* Cover */}
            <div className="shrink-0 w-18 h-26 rounded-lg overflow-hidden shadow-2xl ring-1 ring-white/10 translate-y-5 z-10">
              <img
                src={book.coverImageUrl || "/books/book.jpg"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <DialogTitle className="text-lg font-bold leading-snug line-clamp-2 text-white">
                {book.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-white/50 mt-0.5">
                {book.author?.name}
              </DialogDescription>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                {book.publicationYear && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-white/60">
                    {book.publicationYear}
                  </span>
                )}
                {book.pageCount && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-white/60">
                    {book.pageCount} صفحة
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto pb-4 pt-8 space-y-6 bg-card dark:bg-background">
          {/* ── Status ────────────────────────────────────────────── */}
          <section className="space-y-2.5">
            <SectionLabel icon={<ClockIcon className="w-3.5 h-3.5" />}>حالة القراءة</SectionLabel>
            <div className="flex flex-nowrap gap-1.5 overflow-x-auto no-scrollbar px-4">
              {STATUSES.map((s) => {
                const Icon = s.icon;
                const isActive = status === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStatus(s.value)}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 text-nowrap cursor-pointer shrink-0",
                      isActive ? s.active : cn(s.pill, "hover:brightness-125"),
                    )}
                  >
                    <Icon weight={isActive ? "fill" : "bold"} className="w-3.5 h-3.5 shrink-0" />
                    {s.label}
                  </button>
                );
              })}
            </div>
          </section>

          <Divider />

          {/* ── Progress ───────────────────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <SectionLabel icon={<BookOpenIcon className="w-3.5 h-3.5" />}>
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
                  placeholder="0"
                  className="pl-16"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/40 pointer-events-none tabular-nums">
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

            {/* Progress bar */}
            {totalPages > 0 && (
              <div className="space-y-1">
                <div className="h-1.5 rounded-full overflow-hidden bg-white/6">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      progressPercent >= 100 ? "bg-emerald-400" : "bg-sky-400",
                    )}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </section>

          <Divider />

          {/* ── Dates ─────────────────────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <SectionLabel icon={<CalendarBlankIcon className="w-3.5 h-3.5" />}>
              التواريخ
            </SectionLabel>
            <div className="grid grid-cols-2 gap-3">
              <DateField
                id="start-date"
                label="بدأت القراءة"
                value={startDate}
                onChange={setStartDate}
              />
              <DateField
                id="finish-date"
                label="انتهيت من القراءة"
                value={finishDate}
                onChange={setFinishDate}
                disabled={!showFinishDate}
              />
            </div>
            {!showFinishDate && (
              <p className="text-[11px] text-muted-foreground/35 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/50 inline-block shrink-0" />
                متاح عند تعيين الحالة إلى «مكتمل»
              </p>
            )}
          </section>

          <Divider />

          {/* ── Notes ─────────────────────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <SectionLabel icon={<NotePencilIcon className="w-3.5 h-3.5" />}>ملاحظاتي</SectionLabel>
            <Textarea
              placeholder="اكتب انطباعاتك وملاحظاتك عن الكتاب..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none text-sm"
            />
          </section>

          <Divider />

          {/* ── Score: 10-point scale ──────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <div className="flex items-center justify-between">
              <SectionLabel icon={<StarIcon className="w-3.5 h-3.5" />}>التقييم</SectionLabel>
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

            {/* 10-square grid */}
            {/* biome-ignore lint/a11y/noStaticElementInteractions: I want this*/}
            <div className="flex gap-1" onMouseLeave={() => setHoveredScore(null)}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                <Button
                  key={n}
                  type="button"
                  variant={"outline"}
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

          <Divider />

          {/* ── Reread counter ─────────────────────────────────────── */}
          <section className="space-y-2.5 px-4">
            <SectionLabel icon={<ArrowCounterClockwiseIcon className="w-3.5 h-3.5" />}>
              عدد مرات القراءة
            </SectionLabel>
            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={() => setRereadCount((c) => Math.max(0, c - 1))}
                variant="outline"
                aria-label="تقليل"
              >
                −
              </Button>
              <span className="w-10 text-center text-2xl font-bold tabular-nums text-foreground">
                {rereadCount}
              </span>
              <Button
                type="button"
                onClick={() => setRereadCount((c) => c + 1)}
                variant="outline"
                aria-label="زيادة"
              >
                +
              </Button>
              <span className="text-xs text-muted-foreground/40 mr-1">
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
        <div className="shrink-0 flex items-center justify-between gap-3 px-4 py-3 border-t border-border/10 bg-card dark:bg-background">
          {/* Status pill */}
          <div className="flex items-center gap-2 min-w-0">
            {currentStatus && (
              <span className={cn("w-2 h-2 rounded-full shrink-0", currentStatus.dot)} />
            )}
            <span className="text-sm text-muted-foreground truncate">{currentStatus?.label}</span>
            {isFavorite && (
              <>
                <span className="text-muted-foreground/20 shrink-0">·</span>
                <HeartIcon weight="fill" className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              </>
            )}
            {score > 0 && (
              <>
                <span className="text-muted-foreground/20 shrink-0">·</span>
                <span className="text-xs font-semibold text-amber-400 tabular-nums shrink-0">
                  {score}/10
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button type="button" onClick={() => onOpenChange(false)} variant="ghost" size="sm">
              إلغاء
            </Button>
            <Button type="button" onClick={handleSave} size="sm">
              حفظ التتبع
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
    <div className="flex items-center gap-1.5 px-4 text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-widest">
      {icon}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-border/30 mx-4" />;
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
      <Label htmlFor={id} className="block text-[11px] text-muted-foreground/40 font-medium">
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
