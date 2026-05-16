"use client";

import {
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
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@shadcn/dialog";
import { Input } from "@shadcn/input";
import { Textarea } from "@shadcn/textarea";
import React from "react";

import { cn } from "@/ui/lib/utils";

import type { BookCardBook, BookType } from "../server/get-books";

/* ─── Status Config ───────────────────────────────────────────────── */
const STATUSES = [
  {
    value: "plan-to-read",
    label: "أخطط للقراءة",
    icon: BookmarkSimpleIcon,
    pill: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    active: "bg-slate-600  border-slate-600 shadow-slate-500/30 shadow-lg text-white",
    dot: "bg-slate-400",
  },
  {
    value: "reading",
    label: "أقرأ حالياً",
    icon: BookOpenIcon,
    pill: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    active: "bg-sky-500  border-sky-500 shadow-sky-500/30 shadow-lg text-white",
    dot: "bg-sky-400",
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    active: "bg-emerald-500  border-emerald-500 shadow-emerald-500/30 shadow-lg text-white",
    dot: "bg-emerald-400",
  },
  {
    value: "on-hold",
    label: "مؤجل",
    icon: PauseIcon,
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    active: "bg-amber-500  border-amber-500 shadow-amber-500/30 shadow-lg text-white",
    dot: "bg-amber-400",
  },
  {
    value: "dropped",
    label: "متروك",
    icon: ProhibitIcon,
    pill: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    active: "bg-rose-500  border-rose-500 shadow-rose-500/30 shadow-lg text-white",
    dot: "bg-rose-400",
  },
];

/* ─── Types ───────────────────────────────────────────────────────── */
export interface TrackingData {
  status: string;
  score: number;
  pagesProgress: number;
  startDate: string;
  finishDate: string;
  notes: string;
  isFavorite: boolean;
}

interface TrackBookModalProps {
  book: BookCardBook | BookType | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (bookId: string, data: TrackingData) => void;
}

/* ─── Component ───────────────────────────────────────────────────── */
export function TrackBookModal({ book, open, onOpenChange, onSave }: TrackBookModalProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [status, setStatus] = React.useState("plan-to-read");
  const [score, setScore] = React.useState(0);
  const [pagesProgress, setPagesProgress] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date().toISOString().split("T")[0]);
  const [finishDate, setFinishDate] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [hoveredStar, setHoveredStar] = React.useState(0);

  React.useEffect(() => {
    if (open && book) {
      setIsFavorite(false);
      setStatus("plan-to-read");
      setScore(0);
      setPagesProgress(0);
      setStartDate(new Date().toISOString().split("T")[0]);
      setFinishDate("");
      setNotes("");
    }
  }, [open, book]);

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
      });
    }
    onOpenChange(false);
  };

  if (!book) return null;

  const totalPages = book.pageCount || 0;
  const progressPercent = totalPages > 0 ? Math.min((pagesProgress / totalPages) * 100, 100) : 0;
  const currentStatus = STATUSES.find((s) => s.value === status);
  const showFinishDate = status === "completed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className={cn(
          "p-0 gap-0 border-0 overflow-hidden",
          "w-[95vw] max-w-165",
          "bg-card",
          "shadow-2xl shadow-black/60",
          "rounded-2xl",
          "max-h-[92vh] flex flex-col",
        )}
        showCloseButton={false}
      >
        {/* ── Cover Hero ─────────────────────────────────────────── */}
        <div className="shadow-background relative h-52 shrink-0 overflow-hidden border-b-2 shadow-2xl dark:border-0">
          {/* Blurred bg */}
          <div
            className={`absolute inset-0 scale-110 bg-none! dark:bg-[url(${book.coverImageUrl ?? "/books/book.jpg"})]!`}
            style={{
              backgroundImage: `url(${book.coverImageUrl ?? "/books/book.jpg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(30px) brightness(0.2) saturate(1)",
            }}
          />
          {/* Gradient overlay — fades to modal bg */}
          <div className="from-background/20 to-background absolute inset-0 bg-linear-to-b via-transparent" />

          {/* Close button */}
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant={"ghost"}
            size={"icon-lg"}
            className="absolute top-4 left-4 z-10 h-8 w-8 backdrop-blur-md transition-all"
            aria-label="إغلاق"
          >
            <XIcon className="h-4 w-4" />
          </Button>

          {/* Favorite button */}
          <Button
            type="button"
            onClick={() => setIsFavorite((f) => !f)}
            variant={"ghost"}
            size={"icon-lg"}
            className={cn(
              "absolute top-4 right-4 z-10 w-8 h-8 backdrop-blur-md  transition-all duration-200",
              isFavorite
                ? "bg-rose-500 border-rose-400 text-white hover:bg-rose-500/80 hover:text-white dark:hover:text-rose-500/80! scale-105"
                : " hover:text-rose-400",
            )}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <HeartIcon weight={isFavorite ? "fill" : "bold"} className="h-4 w-4" />
          </Button>

          {/* Book info row */}
          <div className="absolute inset-x-0 bottom-6 flex items-end gap-4 px-6 pb-5">
            {/* Cover */}
            <div className="ring-background h-30 w-20 shrink-0 translate-y-6 overflow-hidden rounded-md ring-1 dark:shadow-2xl">
              <img
                src={book.coverImageUrl || "/books/book.jpg"}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Title / author / badges */}
            <div className="min-w-0 flex-1 pb-2">
              <DialogTitle className="line-clamp-2 text-xl leading-tight font-bold">
                {book.title}
              </DialogTitle>
              <DialogDescription className="/55 mt-1 text-sm">
                {book.author?.name}
              </DialogDescription>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                {book.publicationYear && (
                  <span className="/60 rounded-full border border-white/10 bg-white/8 px-2.5 py-0.5 text-[11px]">
                    {book.publicationYear}
                  </span>
                )}
                {book.pageCount && (
                  <span className="/60 rounded-full border border-white/10 bg-white/8 px-2.5 py-0.5 text-[11px]">
                    {book.pageCount} صفحة
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ─────────────────────────────────────── */}
        <div className="dark:bg-background flex-1 space-y-7 overflow-y-auto bg-transparent px-0 pt-6 pb-6">
          {/* Status pills */}
          <section className="space-y-3">
            <div className="pr-6">
              <SectionLabel icon={<ClockIcon className="h-3.5 w-3.5" />}>حالة القراءة</SectionLabel>
            </div>
            <div className="no-scrollbar flex flex-nowrap gap-2 overflow-x-scroll px-4">
              {STATUSES.map((s) => {
                const Icon = s.icon;
                const isActive = status === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStatus(s.value)}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 text-nowrap py-2 rounded-xl text-sm font-medium border transition-all duration-200 cursor-pointer",
                      isActive
                        ? s.active
                        : cn(s.pill, "dark:hover:brightness-125 hover:brightness-75"),
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

          {/* Progress */}
          <section className="space-y-3 px-6">
            <SectionLabel icon={<BookOpenIcon className="h-3.5 w-3.5" />}>
              التقدم في القراءة
            </SectionLabel>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Input
                    type="number"
                    min={0}
                    max={totalPages || 9999}
                    value={pagesProgress || ""}
                    onChange={(e) =>
                      setPagesProgress(Math.max(0, parseInt(e.target.value, 10) || 0))
                    }
                    placeholder="0"
                  />
                  <span className="/30 pointer-events-none absolute top-1/2 right-16 -translate-y-1/2 text-sm font-medium">
                    / {totalPages || "؟"}
                  </span>
                </div>
                <Badge
                  className={cn(
                    "w-14 h-8  rounded-full flex items-center justify-center text-sm font-bold tabular-nums border shrink-0",
                    progressPercent >= 100
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                      : progressPercent > 0
                        ? "bg-sky-500/15 text-sky-400 border-sky-500/25"
                        : "text-foreground bg-foreground/5 /30 border-foreground/10",
                  )}
                >
                  {progressPercent.toFixed(0)}%
                </Badge>
              </div>
              {totalPages > 0 && (
                <div className="h-1 overflow-hidden rounded-full bg-white/8">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      progressPercent >= 100
                        ? "bg-linear-to-l from-emerald-400 to-emerald-500"
                        : "bg-linear-to-l from-sky-400 to-sky-500",
                    )}
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              )}
            </div>
          </section>

          <Divider />

          {/* Dates */}
          <section className="space-y-3 px-6">
            <SectionLabel icon={<CalendarBlankIcon className="h-3.5 w-3.5" />}>
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
              <p className="/30 flex items-center gap-1.5 text-[11px]">
                <span className="inline-block h-1 w-1 rounded-full bg-amber-400/60" />
                تاريخ الانتهاء متاح فقط عند تعيين الحالة إلى «مكتمل»
              </p>
            )}
          </section>

          <Divider />

          {/* Rating */}
          <section className="space-y-3 px-6">
            <SectionLabel icon={<StarIcon className="h-3.5 w-3.5" />}>تقييمك للكتاب</SectionLabel>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5 rounded-xl border border-white/8 bg-white/5 px-3 py-2.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setScore(star === score ? 0 : star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="p-0.5 transition-transform hover:scale-110 active:scale-90"
                  >
                    <StarIcon
                      weight={hoveredStar >= star || score >= star ? "fill" : "regular"}
                      className={cn(
                        "w-7 h-7 transition-colors",
                        hoveredStar >= star || score >= star ? "text-amber-400" : "/20",
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="/60 text-sm font-semibold tabular-nums">
                {score > 0 ? (
                  <span className="text-base text-amber-400">
                    {score}
                    <span className="/30 text-sm"> / 5</span>
                  </span>
                ) : (
                  "لم تقيّم بعد"
                )}
              </span>
            </div>
          </section>

          <Divider />

          {/* Notes */}
          <section className="space-y-3 px-6">
            <SectionLabel icon={<NotePencilIcon className="h-3.5 w-3.5" />}>ملاحظاتي</SectionLabel>
            <Textarea
              placeholder="اكتب انطباعاتك وملاحظاتك عن الكتاب..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="h-32"
            />
          </section>
        </div>

        {/* ── Footer ──────────────────────────────────────────────── */}
        <div className="border-border/5 bg-secondary/50 flex shrink-0 items-center justify-between gap-3 border-t px-6 py-4">
          {/* Status indicator */}
          <div className="/40 flex items-center gap-2 text-sm">
            {currentStatus && (
              <>
                <span className={cn("w-2 h-2 rounded-full shrink-0", currentStatus.dot)} />
                <span>{currentStatus.label}</span>
              </>
            )}
            {isFavorite && (
              <>
                <span className="/20">·</span>
                <HeartIcon weight="fill" className="h-3.5 w-3.5 text-rose-400" />
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button type="button" onClick={() => onOpenChange(false)} variant={"ghost"}>
              إلغاء
            </Button>
            <Button type="button" onClick={handleSave}>
              حفظ التتبع
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────── */

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="/40 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase">
      {icon}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="mx-0 h-px bg-white/6" />;
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
      <label htmlFor={id} className="/35 block text-[11px] font-medium">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full h-10 bg-white/5 border border-white/10 rounded-xl px-3 text-sm /80",
          "focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all",
          "scheme-dark",
          disabled && "opacity-30 cursor-not-allowed pointer-events-none",
        )}
      />
    </div>
  );
}
