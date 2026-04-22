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
import { Label } from "@shadcn/label";
import { Textarea } from "@shadcn/textarea";
import React from "react";
import type { BookWithAuthor } from "@/db/tables";
import { cn } from "@/ui/lib/utils";

/* ─── Status Config ───────────────────────────────────────────────── */
const STATUSES = [
  {
    value: "plan-to-read",
    label: "أخطط للقراءة",
    icon: BookmarkSimpleIcon,
    pill: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    active: "bg-slate-600 text-white border-slate-600 shadow-slate-500/30 shadow-lg",
    dot: "bg-slate-400",
  },
  {
    value: "reading",
    label: "أقرأ حالياً",
    icon: BookOpenIcon,
    pill: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    active: "bg-sky-500 text-white border-sky-500 shadow-sky-500/30 shadow-lg",
    dot: "bg-sky-400",
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    active: "bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/30 shadow-lg",
    dot: "bg-emerald-400",
  },
  {
    value: "on-hold",
    label: "مؤجل",
    icon: PauseIcon,
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    active: "bg-amber-500 text-white border-amber-500 shadow-amber-500/30 shadow-lg",
    dot: "bg-amber-400",
  },
  {
    value: "dropped",
    label: "متروك",
    icon: ProhibitIcon,
    pill: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    active: "bg-rose-500 text-white border-rose-500 shadow-rose-500/30 shadow-lg",
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
  book: BookWithAuthor | null;
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
      onSave(book.id, { status, score, pagesProgress, startDate, finishDate, notes, isFavorite });
    }
    onOpenChange(false);
  };

  if (!book) return null;

  const totalPages = book.pageCount || 0;
  const progressPercent = totalPages > 0 ? Math.min((pagesProgress / totalPages) * 100, 100) : 0;
  const currentStatus = STATUSES.find((s) => s.value === status)!;
  const showFinishDate = status === "completed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className={cn(
          "p-0 gap-0 border-0 overflow-hidden",
          "w-[95vw] max-w-165",
          "bg-[#0f0f11] text-white",
          "shadow-2xl shadow-black/60",
          "rounded-2xl",
          "max-h-[92vh] flex flex-col",
        )}
        showCloseButton={false}
      >
        {/* ── Cover Hero ─────────────────────────────────────────── */}
        <div className="relative h-52  shrink-0 overflow-hidden shadow-2xl shadow-background">
          {/* Blurred bg */}
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${book.coverImageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(30px) brightness(0.2) saturate(1)",
            }}
          />
          {/* Gradient overlay — fades to modal bg */}
          <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-[#0f0f11]" />

          {/* Close button */}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-all"
            aria-label="إغلاق"
          >
            <XIcon className="w-4 h-4" />
          </button>

          {/* Favorite button */}
          <button
            type="button"
            onClick={() => setIsFavorite((f) => !f)}
            className={cn(
              "absolute top-4 right-4 z-10 w-8 h-8 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-200",
              isFavorite
                ? "bg-rose-500 border-rose-400 text-white scale-110"
                : "bg-white/10 border-white/10 text-white/70 hover:bg-white/20 hover:text-rose-400",
            )}
            aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
          >
            <HeartIcon weight={isFavorite ? "fill" : "bold"} className="w-4 h-4" />
          </button>

          {/* Book info row */}
          <div className="absolute bottom-6 inset-x-0 flex items-end gap-4 px-6 pb-5">
            {/* Cover */}
            <div className="shrink-0 w-20 h-30 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 translate-y-6">
              <img
                src={book.coverImageUrl || "/books/book.jpg"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Title / author / badges */}
            <div className="flex-1 min-w-0 pb-2">
              <DialogTitle className="text-xl font-bold leading-tight text-white line-clamp-2">
                {book.title}
              </DialogTitle>
              <DialogDescription className="text-sm text-white/55 mt-1">
                {book.author?.name}
              </DialogDescription>
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                {book.publicationYear && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/8 border border-white/10 text-white/60">
                    {book.publicationYear}
                  </span>
                )}
                {book.pageCount && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/8 border border-white/10 text-white/60">
                    {book.pageCount} صفحة
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Scrollable body ─────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-0 pb-6 space-y-7 pt-6">
          {/* Status pills */}
          <section className="space-y-3">
            <div className="pr-6">
              <SectionLabel icon={<ClockIcon className="w-3.5 h-3.5" />}>حالة القراءة</SectionLabel>
            </div>
            <div className="flex flex-nowrap gap-2 overflow-x-scroll px-4">
              {STATUSES.map((s) => {
                const Icon = s.icon;
                const isActive = status === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setStatus(s.value)}
                    className={cn(
                      "flex items-center gap-1.5 px-3.5 text-nowrap py-2 rounded-xl text-sm font-medium border transition-all duration-200",
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

          {/* Progress */}
          <section className="space-y-3 px-6">
            <SectionLabel icon={<BookOpenIcon className="w-3.5 h-3.5" />}>
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
                    onChange={(e) => setPagesProgress(Math.max(0, parseInt(e.target.value) || 0))}
                    placeholder="0"
                  />
                  <span className="absolute right-16 top-1/2 -translate-y-1/2 text-sm text-white/30 font-medium pointer-events-none">
                    / {totalPages || "؟"}
                  </span>
                </div>
                <div
                  className={cn(
                    "w-14 h-8  rounded-full flex items-center justify-center text-sm font-bold tabular-nums border shrink-0",
                    progressPercent >= 100
                      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/25"
                      : progressPercent > 0
                        ? "bg-sky-500/15 text-sky-400 border-sky-500/25"
                        : "bg-white/5 text-white/30 border-white/10",
                  )}
                >
                  {progressPercent.toFixed(0)}%
                </div>
              </div>
              {totalPages > 0 && (
                <div className="h-1 bg-white/8 rounded-full overflow-hidden">
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
              <p className="text-[11px] text-white/30 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-amber-400/60 inline-block" />
                تاريخ الانتهاء متاح فقط عند تعيين الحالة إلى «مكتمل»
              </p>
            )}
          </section>

          <Divider />

          {/* Rating */}
          <section className="space-y-3 px-6">
            <SectionLabel icon={<StarIcon className="w-3.5 h-3.5" />}>تقييمك للكتاب</SectionLabel>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5 bg-white/5 border border-white/8 rounded-xl px-3 py-2.5">
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
                        hoveredStar >= star || score >= star ? "text-amber-400" : "text-white/20",
                      )}
                    />
                  </button>
                ))}
              </div>
              <span className="text-sm font-semibold text-white/60 tabular-nums">
                {score > 0 ? (
                  <span className="text-amber-400 text-base">
                    {score}
                    <span className="text-white/30 text-sm"> / 5</span>
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
            <SectionLabel icon={<NotePencilIcon className="w-3.5 h-3.5" />}>ملاحظاتي</SectionLabel>
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
        <div className="shrink-0 flex items-center justify-between gap-3 px-6 py-4 border-t border-white/6 bg-[#0c0c0e]">
          {/* Status indicator */}
          <div className="flex items-center gap-2 text-sm text-white/40">
            <span className={cn("w-2 h-2 rounded-full shrink-0", currentStatus.dot)} />
            <span>{currentStatus.label}</span>
            {isFavorite && (
              <>
                <span className="text-white/20">·</span>
                <HeartIcon weight="fill" className="w-3.5 h-3.5 text-rose-400" />
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-xl text-sm text-white/50 hover:text-white/80 hover:bg-white/5 transition-all"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl text-sm font-semibold bg-white text-[#0f0f11] hover:bg-white/90 transition-all shadow-lg shadow-black/30 active:scale-95"
            >
              حفظ التتبع
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────── */

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-xs font-semibold text-white/40 uppercase tracking-widest">
      {icon}
      {children}
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/6 -mx-0" />;
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
      <label htmlFor={id} className="block text-[11px] text-white/35 font-medium">
        {label}
      </label>
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full h-10 bg-white/5 border border-white/10 rounded-xl px-3 text-sm text-white/80",
          "focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all",
          "[color-scheme:dark]",
          disabled && "opacity-30 cursor-not-allowed pointer-events-none",
        )}
      />
    </div>
  );
}
