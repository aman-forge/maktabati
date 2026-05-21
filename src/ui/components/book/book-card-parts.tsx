"use client";

import {
  BookOpenIcon,
  CheckCircleIcon,
  PencilSimpleIcon,
  PlusIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { Button } from "@shadcn/button";

import { ReadingStatus, getStatusConfig } from "@/features/books/types";
import { cn } from "@/ui/lib/utils";

/* ─────────────────────────────────────────────────────────────
   RatingPill
   Two visual variants:
   • "overlay"  – frosted glass pill for top-of-cover badges
   • "inline"   – warm amber chip for card content areas
───────────────────────────────────────────────────────────── */

interface RatingPillProps {
  rating: number;
  variant?: "overlay" | "inline";
  className?: string;
}

export function RatingPill({ rating, variant = "overlay", className }: RatingPillProps) {
  const isOverlay = variant === "overlay";
  return (
    <div
      className={cn(
        "flex items-center gap-1 font-semibold tabular-nums",
        isOverlay
          ? "rounded-full bg-foreground/60 dark:bg-background/60 border border-border/40 px-1.5 py-0.5 shadow-lg backdrop-blur-md"
          : "rounded-lg border border-amber-500/20 bg-amber-500/10 px-2 py-1",
        className,
      )}
    >
      <StarIcon
        weight="fill"
        className={cn("text-amber-400", isOverlay ? "h-2.5 w-2.5" : "h-3.5 w-3.5")}
      />
      <span
        className={cn(
          isOverlay ? "text-[11px] text-background dark:text-foreground" : "text-sm text-amber-400",
        )}
      >
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   StatusBadge
   Three visual variants:
   • "icon-only" – small circle with icon for cover overlays
   • "pill"      – icon + label chip for card footers
   • "stripe-dot" – tiny dot for compact list rows
───────────────────────────────────────────────────────────── */

interface StatusBadgeProps {
  status: ReadingStatus;
  variant?: "icon-only" | "pill" | "stripe-dot";
  className?: string;
}

export function StatusBadge({ status, variant = "pill", className }: StatusBadgeProps) {
  const config = getStatusConfig(status);
  if (!config) return null;
  const Icon = config.icon;

  if (variant === "stripe-dot") {
    return (
      <span
        className={cn(
          "inline-block h-2 w-2 rounded-full ring-2 ring-background shrink-0",
          config.bgColor,
          className,
        )}
        title={config.label}
      />
    );
  }

  if (variant === "icon-only") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-full border border-white/20 p-1 shadow-sm backdrop-blur-md",
          config.bgColor,
          className,
        )}
        title={config.label}
      >
        {Icon && <Icon weight="fill" className="size-3 text-white" />}
      </div>
    );
  }

  // pill
  return (
    <span
      className={cn(
        "flex text-nowrap items-center gap-1 rounded-full border border-border/60 px-2 py-0.5 text-[10px] font-medium backdrop-blur-sm",
        config.badgeClass,
        className,
      )}
    >
      {Icon && <Icon weight="fill" className="h-2.5 w-2.5" />}
      {config.label}
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────
   TrackButton
   Unified + / pen / check button used across all card types.
   Callers control visibility via className (opacity/scale).
───────────────────────────────────────────────────────────── */

interface TrackButtonProps {
  trackingStatus?: ReadingStatus;
  onClick: () => void;
  size?: "sm" | "md";
  className?: string;
  children?: React.ReactElement | undefined;
}

export function TrackButton({
  trackingStatus,
  onClick,
  size = "md",
  className,
  children,
}: TrackButtonProps) {
  const isCompleted = trackingStatus === "completed";
  const hasStatus = Boolean(trackingStatus);
  const iconCls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";

  return (
    <>
      {children ? (
        <Button
          type="button"
          className={className}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick();
          }}
          aria-label={hasStatus ? "تحديث حالة القراءة" : "إضافة إلى قائمة القراءة"}
          render={children}
        />
      ) : (
        <Button
          type="button"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onClick();
          }}
          className={cn(
            "rounded-full shadow-md bg-primary hover:bg-primary/90 text-primary-foreground",
            size === "sm" ? "h-8 w-8" : "h-9 w-9",
            className,
          )}
          aria-label={hasStatus ? "تحديث حالة القراءة" : "إضافة إلى قائمة القراءة"}
        >
          {isCompleted ? (
            <CheckCircleIcon weight="fill" className={iconCls} />
          ) : hasStatus ? (
            <PencilSimpleIcon weight="duotone" className={iconCls} />
          ) : (
            <PlusIcon weight="bold" className={iconCls} />
          )}
        </Button>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ReadingProgress
   Reusable progress bar with optional label row.
───────────────────────────────────────────────────────────── */

interface ReadingProgressProps {
  progress: number;
  unknown?: boolean;
  showLabel?: boolean;
  className?: string;
}

export function ReadingProgress({
  progress,
  unknown = false,
  showLabel = true,
  className,
}: ReadingProgressProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground flex items-center gap-1 text-[10px]">
            <BookOpenIcon className="h-3 w-3" />
            التقدم
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold text-blue-400 tabular-nums",
              unknown && "text-muted-foreground",
            )}
          >
            {unknown ? "?" : `${Math.round(progress)}%`}
          </span>
        </div>
      )}

      <div className="bg-muted h-1 overflow-hidden rounded-full">
        <div
          className={cn(
            "h-full rounded-full bg-blue-500 transition-all duration-700 ease-out",
            unknown && "bg-muted",
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   BookCover
   Book cover image with 3-D spine effect (Arabic: spine on right)
   and a generic image fallback. Accepts overlay children.
───────────────────────────────────────────────────────────── */

interface BookCoverProps {
  src?: string | null;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}

export function BookCover({ src, alt, className, children }: BookCoverProps) {
  return (
    <div className={cn("relative overflow-hidden bg-muted", className)}>
      {/* Spine shadow — Arabic books bind on the right */}
      <div className="from-background/40 pointer-events-none absolute inset-y-0 right-0 z-10 w-3 rounded-r-xl bg-linear-to-l to-transparent" />
      {/* Left edge highlight */}
      <div className="from-background/10 pointer-events-none absolute inset-y-0 left-0 z-10 w-1 bg-linear-to-r to-transparent" />

      <img
        src={src ?? "/books/book.jpg"}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {children}
    </div>
  );
}
