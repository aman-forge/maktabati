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
} from "@phosphor-icons/react";
import { Badge } from "@shadcn/badge";
import { Button } from "@shadcn/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@shadcn/dialog";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Separator } from "@shadcn/separator";
import { Textarea } from "@shadcn/textarea";
import React from "react";
import type { Book } from "@/db/tables";
import { cn } from "@/ui/lib/utils";

const STATUSES = [
  {
    value: "reading",
    label: "أقرأ حالياً",
    icon: BookOpenIcon,
    color: "text-blue-400",
    bg: "bg-blue-500/15 border-blue-500/30 hover:bg-blue-500/25",
    activeBg: "bg-blue-500 text-white border-blue-500",
  },
  {
    value: "plan-to-read",
    label: "أخطط للقراءة",
    icon: BookmarkSimpleIcon,
    color: "text-slate-400",
    bg: "bg-slate-500/15 border-slate-500/30 hover:bg-slate-500/25",
    activeBg: "bg-slate-500 text-white border-slate-500",
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    color: "text-emerald-400",
    bg: "bg-emerald-500/15 border-emerald-500/30 hover:bg-emerald-500/25",
    activeBg: "bg-emerald-500 text-white border-emerald-500",
  },
  {
    value: "on-hold",
    label: "مؤجل",
    icon: PauseIcon,
    color: "text-amber-400",
    bg: "bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/25",
    activeBg: "bg-amber-500 text-white border-amber-500",
  },
  {
    value: "dropped",
    label: "متروك",
    icon: ProhibitIcon,
    color: "text-red-400",
    bg: "bg-red-500/15 border-red-500/30 hover:bg-red-500/25",
    activeBg: "bg-red-500 text-white border-red-500",
  },
];

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
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (bookId: string, data: TrackingData) => void;
}

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

  const showFinishDate = status === "completed";
  const totalPages = book.pageCount || 0;
  const progressPercent = totalPages > 0 ? Math.min((pagesProgress / totalPages) * 100, 100) : 0;
  const currentStatus = STATUSES.find((s) => s.value === status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] sm:max-w-[620px] lg:max-w-[740px] p-0 gap-0 overflow-hidden border-border/40 bg-background/95 backdrop-blur-xl max-h-[95vh] overflow-y-scroll">
        {/* Hero Section with Book Cover */}
        <DialogHeader className="pt-8">
          <div className="relative h-[190px] sm:h-[210px] overflow-visible">
            {/* Background blur */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{
                backgroundImage: `url(${book.coverImageUrl})`,
                filter: "blur(42px) brightness(0.38) saturate(1.25)",
              }}
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/60 to-background" />

            {/* Content */}
            <div className="relative h-full flex items-end p-5 sm:p-7 gap-5">
              {/* Book cover */}
              <div className="relative shrink-0 group">
                <div className="w-[100px] sm:w-[120px] h-[150px] sm:h-[180px] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transform transition-all group-hover:scale-[1.03] duration-300">
                  <img
                    src={book.coverImageUrl || "/books/book.jpg"}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Favorite button */}
                <button
                  type="button"
                  onClick={() => setIsFavorite((f) => !f)}
                  className={cn(
                    "absolute -top-3 -right-3 p-2.5 rounded-full shadow-xl transition-all duration-200 border z-10",
                    isFavorite
                      ? "bg-red-500 text-white border-red-400 scale-110"
                      : "bg-background/90 backdrop-blur-md text-muted-foreground border-border hover:text-red-500 hover:border-red-500/60 hover:scale-105",
                  )}
                  aria-label={isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
                >
                  <HeartIcon weight={isFavorite ? "fill" : "bold"} className="w-4 h-4" />
                </button>
              </div>

              {/* Book info */}
              <div className="flex-1 min-w-0 pb-2">
                <DialogTitle className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-foreground">
                  {book.title}
                </DialogTitle>
                <DialogDescription className="text-base text-muted-foreground mt-2">
                  {book.authorId}
                </DialogDescription>

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {book.publicationYear && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/10 border-white/10 text-foreground/80 px-3 py-1"
                    >
                      {book.publicationYear}
                    </Badge>
                  )}
                  {book.pageCount && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-white/10 border-white/10 text-foreground/80 px-3 py-1"
                    >
                      {book.pageCount} صفحة
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Form Content */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Status Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-muted-foreground" />
              حالة القراءة
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
              {STATUSES.map((s) => {
                const Icon = s.icon;
                const isActive = status === s.value;
                return (
                  <button
                    type="button"
                    key={s.value}
                    onClick={() => setStatus(s.value)}
                    className={cn(
                      "flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                      isActive ? s.activeBg : s.bg,
                      !isActive && s.color,
                    )}
                  >
                    <Icon weight={isActive ? "fill" : "bold"} className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <Separator className="bg-border/60" />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-7">
              {/* Rating */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <StarIcon className="w-4 h-4 text-muted-foreground" />
                  تقييمك
                </Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 p-3 rounded-2xl bg-muted/50 border border-border/60">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setScore(star === score ? 0 : star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className="p-1 transition-all hover:scale-110 active:scale-95"
                      >
                        <StarIcon
                          weight={hoveredStar >= star || score >= star ? "fill" : "regular"}
                          className={cn(
                            "w-7 h-7 transition-colors",
                            hoveredStar >= star || score >= star
                              ? "text-amber-400"
                              : "text-muted-foreground/50",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-foreground tabular-nums">
                    {score > 0 ? `${score} / 5` : "بدون تقييم"}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <BookOpenIcon className="w-4 h-4 text-muted-foreground" />
                  التقدم في القراءة
                </Label>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Input
                        type="number"
                        min={0}
                        max={totalPages || 9999}
                        value={pagesProgress}
                        onChange={(e) =>
                          setPagesProgress(Math.max(0, parseInt(e.target.value) || 0))
                        }
                        className="h-11 text-lg font-medium bg-muted/50 border-border/60 focus:border-primary/50"
                        placeholder="0"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">
                        / {totalPages || "؟"}
                      </span>
                    </div>

                    {totalPages > 0 && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "px-4 py-1.5 text-sm font-semibold min-w-[62px] justify-center",
                          progressPercent >= 100
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                            : progressPercent > 0
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-muted",
                        )}
                      >
                        {progressPercent.toFixed(0)}%
                      </Badge>
                    )}
                  </div>

                  {totalPages > 0 && (
                    <div className="h-2.5 bg-muted/70 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full transition-all duration-500 rounded-full",
                          progressPercent >= 100
                            ? "bg-linear-to-r from-emerald-500 to-emerald-400"
                            : "bg-linear-to-r from-blue-500 to-blue-400",
                        )}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-7">
              {/* Dates */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CalendarBlankIcon className="w-4 h-4 text-muted-foreground" />
                  التواريخ
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="start-date" className="text-xs text-muted-foreground">
                      بدأت القراءة
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-11 bg-muted/50 border-border/60"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="finish-date" className="text-xs text-muted-foreground">
                      انتهيت من القراءة
                    </Label>
                    <Input
                      id="finish-date"
                      type="date"
                      value={finishDate}
                      onChange={(e) => setFinishDate(e.target.value)}
                      disabled={!showFinishDate}
                      className={cn(
                        "h-11 bg-muted/50 border-border/60",
                        !showFinishDate && "opacity-50 cursor-not-allowed",
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-3">
                <Label
                  htmlFor="notes"
                  className="text-sm font-semibold text-foreground flex items-center gap-2"
                >
                  <NotePencilIcon className="w-4 h-4 text-muted-foreground" />
                  ملاحظاتي الشخصية
                </Label>
                <Textarea
                  id="notes"
                  placeholder="اكتب انطباعاتك وملاحظاتك عن الكتاب..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[110px] resize-y bg-muted/50 border-border/60"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-4 px-6 sm:px-8 py-5 border-t border-border/60 bg-muted/40">
          <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
            {currentStatus && (
              <>
                <currentStatus.icon weight="fill" className={cn("w-4 h-4", currentStatus.color)} />
                <span className="font-medium">{currentStatus.label}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-muted-foreground hover:text-foreground px-6"
            >
              إلغاء
            </Button>
            <Button onClick={handleSave} className="min-w-[110px] shadow-md font-semibold">
              حفظ التتبع
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
