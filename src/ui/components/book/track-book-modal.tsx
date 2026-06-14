import {
  BookmarkSimpleIcon,
  BookOpenIcon,
  CalendarBlankIcon,
  CheckCircleIcon,
  ClockIcon,
  PauseIcon,
  PencilSimpleIcon,
  ProhibitIcon,
  XIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@shadcn/dialog";
import { Field, FieldGroup, FieldLabel } from "@shadcn/field";
import { Input } from "@shadcn/input";
import { Progress } from "@shadcn/progress";
import { Separator } from "@shadcn/separator";
import { Spinner } from "@shadcn/spinner";
import { Textarea } from "@shadcn/textarea";
import { ToggleGroup, ToggleGroupItem } from "@shadcn/toggle-group";
import React from "react";

import type { TrackingDataType } from "@/features/books/server/update-book";
import type { BaseBook } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

type ReadingStatus = TrackingDataType["status"];

const STATUSES = [
  {
    value: "want_to_read" as const,
    label: "أخطط للقراءة",
    icon: BookmarkSimpleIcon,
    pill: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    active: "bg-slate-600/60! border-slate-600! shadow-slate-500/30 shadow-md text-white",
    dot: "bg-slate-400",
  },
  {
    value: "currently_reading" as const,
    label: "أقرأ حالياً",
    icon: BookOpenIcon,
    pill: "bg-sky-500/10 text-sky-400 border-sky-500/20",
    active: "bg-sky-500/60! border-sky-500! shadow-sky-500/30 shadow-md text-white",
    dot: "bg-sky-400",
  },
  {
    value: "completed" as const,
    label: "مكتمل",
    icon: CheckCircleIcon,
    pill: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    active: "bg-emerald-500/60! border-emerald-500! shadow-emerald-500/30 shadow-md text-white",
    dot: "bg-emerald-400",
  },
  {
    value: "on_hold" as const,
    label: "مؤجل",
    icon: PauseIcon,
    pill: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    active: "bg-amber-500/60! border-amber-500! shadow-amber-500/30 shadow-md text-white",
    dot: "bg-amber-400",
  },
  {
    value: "dropped" as const,
    label: "متروك",
    icon: ProhibitIcon,
    pill: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    active: "bg-rose-500/60! border-rose-500! shadow-rose-500/30 shadow-md text-white",
    dot: "bg-rose-400",
  },
] as const satisfies ReadonlyArray<{
  value: ReadingStatus;
  label: string;
  icon: React.ElementType;
  pill: string;
  active: string;
  dot: string;
}>;

interface TrackBookModalProps {
  book: BaseBook | null;
  open: boolean;
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (bookId: string, data: TrackingDataType) => Promise<void>;
  initialData?: Partial<TrackingDataType>;
}

function dateToInputValue(value: Date | string | undefined | null): string {
  if (!value) return "";
  if (typeof value === "string") {
    return /^\d{4}-\d{2}-\d{2}/.test(value) ? value.slice(0, 10) : "";
  }

  return Number.isNaN(value.getTime()) ? "" : value.toISOString().slice(0, 10);
}

function inputValueToDateString(value: string): string | null {
  return value || null;
}

function todayInputValue(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function getDateRulesForStatus(status: ReadingStatus) {
  return {
    showStartedAt: status !== "want_to_read",
    showFinishedAt: status === "completed",
    clearStartedAt: status === "want_to_read",
    clearFinishedAt: status !== "completed",
  };
}

function clampPageProgress(value: number, totalPages: number): number {
  const progress = Number.isFinite(value) ? Math.trunc(value) : 0;
  const lowerBounded = Math.max(0, progress);
  return totalPages > 0 ? Math.min(lowerBounded, totalPages) : lowerBounded;
}

const newLocal = "[&_[data-slot=progress-indicator]]:bg-emerald-400";
export function TrackBookModal({
  book,
  open,
  onOpenChange,
  onSave,
  isSaving,
  initialData,
}: TrackBookModalProps) {
  const [status, setStatus] = React.useState<ReadingStatus>(initialData?.status ?? "want_to_read");
  const [pageProgress, setPageProgress] = React.useState(initialData?.pageProgress ?? 0);
  const [startedAt, setStartedAt] = React.useState(dateToInputValue(initialData?.startedAt));
  const [finishedAt, setFinishedAt] = React.useState(dateToInputValue(initialData?.finishedAt));
  const [notes, setNotes] = React.useState(initialData?.notes ?? "");

  React.useEffect(() => {
    if (!open || !book) return;

    setStatus(initialData?.status ?? "want_to_read");
    setPageProgress(initialData?.pageProgress ?? 0);
    setStartedAt(dateToInputValue(initialData?.startedAt));
    setFinishedAt(dateToInputValue(initialData?.finishedAt));
    setNotes(initialData?.notes ?? "");
  }, [open, book, initialData]);

  if (!book) return null;

  const totalPages = book.pageCount ?? 0;
  const progressPercent = totalPages > 0 ? Math.min((pageProgress / totalPages) * 100, 100) : 0;
  const currentStatus = STATUSES.find((item) => item.value === status);
  const dateRules = getDateRulesForStatus(status);

  const handleStatusChange = (next: ReadingStatus) => {
    const rules = getDateRulesForStatus(next);

    setStatus(next);

    if (next === "completed" && totalPages > 0) {
      setPageProgress(totalPages);
    } else if (next === "want_to_read") {
      setPageProgress(0);
    }

    if (rules.clearStartedAt) setStartedAt("");
    if (rules.clearFinishedAt) setFinishedAt("");
    if (next === "currently_reading" && !startedAt) setStartedAt(todayInputValue());
  };

  const handleProgressChange = (value: string) => {
    setPageProgress(clampPageProgress(Number.parseInt(value, 10), totalPages));
  };

  const handleSave = async () => {
    if (!onSave) return;

    await onSave(book.id, {
      status,
      pageProgress,
      notes: notes.trim() || null,
      startedAt: dateRules.showStartedAt ? inputValueToDateString(startedAt) : null,
      finishedAt: dateRules.showFinishedAt ? inputValueToDateString(finishedAt) : null,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className={cn(
          "flex max-h-[92vh] w-[95vw] max-w-lg flex-col gap-0 overflow-hidden border-0 p-0",
          "rounded-2xl bg-card shadow-2xl shadow-background/60 dark:bg-background dark:shadow-primary/40",
        )}
        showCloseButton={false}
      >
        <div className="relative h-48 shrink-0 overflow-hidden">
          <div
            className="absolute inset-0 scale-110"
            style={{
              backgroundImage: `url(${book.coverImageUrl ?? "/books/book.jpg"})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              filter: "blur(5px) brightness(0.4) saturate(1.6)",
            }}
          />
          <div className="to-card dark:to-background absolute inset-0 bg-linear-to-b from-transparent" />

          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            variant="ghost"
            size="icon-sm"
            className="bg-secondary text-secondary-foreground hover:bg-accent/50! absolute top-3 left-3 rounded-xl backdrop-blur-sm"
            aria-label="إغلاق"
          >
            <XIcon />
          </Button>

          <div className="absolute inset-x-0 bottom-0 flex items-end gap-4 px-5 pb-12">
            <div className="h-26 w-18 shrink-0 translate-y-5 overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10">
              <img
                src={book.coverImageUrl ?? "/books/book.jpg"}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1 pb-1">
              <DialogTitle className="line-clamp-2 text-lg leading-snug font-bold text-white">
                {book.title}
              </DialogTitle>
              <DialogDescription className="mt-0.5 text-sm text-white/50">
                {book.primaryAuthor?.name}
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

        <div className="bg-card dark:bg-background flex flex-1 flex-col gap-5 overflow-x-hidden overflow-y-scroll pt-8 pb-4">
          <section className="flex flex-col gap-2.5">
            <div className="px-4">
              <SectionLabel icon={<ClockIcon className="size-3.5" />}>حالة القراءة</SectionLabel>
            </div>
            <ToggleGroup
              value={[status]}
              onValueChange={(values: string[]) => {
                const next = values[0] as ReadingStatus | undefined;
                if (next) handleStatusChange(next);
              }}
              className="no-scrollbar flex w-full justify-start gap-0 overflow-x-scroll px-2"
            >
              {STATUSES.map((item) => {
                const Icon = item.icon;
                const isActive = status === item.value;

                return (
                  <ToggleGroupItem
                    key={item.value}
                    value={item.value}
                    disabled={isSaving}
                    aria-label={item.label}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-200 text-nowrap cursor-pointer shrink-0",
                      isActive ? item.active : cn(item.pill, "hover:brightness-125"),
                    )}
                  >
                    <Icon weight={isActive ? "fill" : "bold"} className="size-3.5" />
                    {item.label}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </section>

          <Separator className="bg-border/30 mx-4" />

          <section className="flex flex-col gap-2.5 px-4">
            <SectionLabel icon={<BookOpenIcon className="size-3.5" />}>
              التقدم في القراءة
            </SectionLabel>
            <FieldGroup className="gap-3">
              <Field>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Input
                      type="number"
                      min={0}
                      max={totalPages || undefined}
                      value={pageProgress || ""}
                      onChange={(event) => handleProgressChange(event.target.value)}
                      disabled={
                        (status === "completed" && !!pageProgress) ||
                        status === "want_to_read" ||
                        isSaving
                      }
                      placeholder="0"
                      className="ps-3 pe-16"
                    />
                    <span className="text-muted-foreground/40 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs tabular-nums">
                      / {totalPages || "؟"}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "flex h-9 w-14 shrink-0 items-center justify-center rounded-lg border text-sm font-bold tabular-nums transition-colors",
                      progressPercent >= 100
                        ? "border-emerald-500/25 bg-emerald-500/15 text-emerald-400"
                        : progressPercent > 0
                          ? "border-sky-500/25 bg-sky-500/15 text-sky-400"
                          : "border-border/30 bg-muted/30 text-muted-foreground/30",
                    )}
                  >
                    {Math.round(progressPercent)}%
                  </div>
                </div>
                {totalPages > 0 && (
                  <Progress
                    value={progressPercent}
                    className={cn(
                      "gap-0 **:data-[slot=progress-track]:h-1.5",
                      progressPercent >= 100
                        ? newLocal
                        : "**:data-[slot=progress-indicator]:bg-sky-400",
                    )}
                  />
                )}
              </Field>
            </FieldGroup>
          </section>

          <Separator className="bg-border/30 mx-4" />

          <section className="flex flex-col gap-2.5 px-4">
            <SectionLabel icon={<CalendarBlankIcon className="size-3.5" />}>التواريخ</SectionLabel>
            <FieldGroup className="grid grid-cols-2 gap-3">
              <DateField
                id="started-at"
                label="بدأت القراءة"
                value={startedAt}
                onChange={setStartedAt}
                disabled={!dateRules.showStartedAt || isSaving}
              />
              <DateField
                id="finished-at"
                label="انتهيت من القراءة"
                value={finishedAt}
                onChange={setFinishedAt}
                disabled={!dateRules.showFinishedAt || isSaving}
              />
            </FieldGroup>
            {!dateRules.showFinishedAt && (
              <p className="text-muted-foreground/40 flex items-center gap-1.5 text-[11px]">
                <span className="inline-block size-1.5 shrink-0 rounded-full bg-amber-400/50" />
                {status === "want_to_read"
                  ? "التواريخ متاحة بعد بدء القراءة"
                  : "تاريخ الانتهاء متاح عند تعيين الحالة إلى «مكتمل»"}
              </p>
            )}
          </section>

          <Separator className="bg-border/30 mx-4" />

          <section className="flex flex-col gap-2.5 px-4">
            <SectionLabel icon={<PencilSimpleIcon className="size-3.5" />}>
              ملاحظاتي الخاصة
            </SectionLabel>
            <FieldGroup className="gap-3">
              <Field>
                <Textarea
                  placeholder="اكتب ملاحظاتك الخاصة عن الكتاب..."
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  disabled={isSaving}
                  rows={4}
                  className="resize-none text-sm"
                />
              </Field>
            </FieldGroup>
          </section>
        </div>

        <div className="border-border/10 bg-card dark:bg-background flex shrink-0 items-center justify-between gap-3 border-t px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            {currentStatus && (
              <span className={cn("size-2 shrink-0 rounded-full", currentStatus.dot)} />
            )}
            <span className="text-muted-foreground truncate text-sm">{currentStatus?.label}</span>
            {pageProgress > 0 && (
              <>
                <span className="text-muted-foreground/20 shrink-0">·</span>
                <span className="text-muted-foreground shrink-0 text-xs font-semibold tabular-nums">
                  {pageProgress} صفحة
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
              {isSaving && <Spinner data-icon="inline-start" />}
              {isSaving ? "جاري الحفظ..." : "حفظ التتبع"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionLabel({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="text-muted-foreground/50 flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase">
      {icon}
      {children}
    </div>
  );
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
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <Field data-disabled={disabled}>
      <FieldLabel htmlFor={id} className="text-muted-foreground/40 text-[11px] font-medium">
        {label}
      </FieldLabel>
      <Input
        id={id}
        dir="rtl"
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className={cn(disabled && "pointer-events-none cursor-not-allowed opacity-30")}
      />
    </Field>
  );
}
