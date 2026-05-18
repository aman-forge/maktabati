import {
  BookmarkIcon,
  BookOpenIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  SquaresFourIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import type React from "react";

import { authors, books, readingStatusEnum } from "@/db/tables";

// Reading Status Type
export type ReadingStatus = (typeof readingStatusEnum.enumValues)[number];

// ─── Status config ────────────────────────────────────────────────
// Single source of truth for colors, icons, and labels across all components
export interface StatusConfig {
  value: ReadingStatus | "all";
  label: string;
  icon: React.ElementType;
  // Tailwind text color class  e.g. "text-blue-500"
  color: string;
  // Tailwind badge classes     e.g. "bg-blue-500/10 text-blue-500"
  badgeClass: string;
  // Tailwind solid bg class    e.g. "bg-blue-500"  (for dots, stripes, pills)
  bgColor: string;
  bgHoverColor?: string;
}

export const STATUS_CONFIG = [
  {
    value: "all",
    label: "المكتبة كلها",
    icon: SquaresFourIcon,
    color: "text-foreground",
    badgeClass: "bg-foreground/10 text-foreground",
    bgColor: "bg-foreground",
    bgHoverColor: "hover:bg-foreground/60!",
  },
  {
    value: "currently_reading",
    label: "قيد القراءة",
    icon: BookOpenIcon,
    color: "text-blue-500",
    badgeClass: "bg-blue-500/70 text-foreground",
    bgColor: "bg-blue-500",
    bgHoverColor: "hover:bg-blue-500/60!",
  },
  {
    value: "want_to_read",
    label: "أخطط لقراءته",
    icon: BookmarkIcon,
    color: "text-amber-500",
    badgeClass: "bg-amber-500/70 text-foreground",
    bgColor: "bg-amber-500",
    bgHoverColor: "hover:bg-amber-500/60!",
  },
  {
    value: "completed",
    label: "مكتمل",
    icon: CheckCircleIcon,
    color: "text-emerald-500",
    badgeClass: "bg-emerald-500/70 text-foreground",
    bgColor: "bg-emerald-500",
    bgHoverColor: "hover:bg-emerald-500/60!",
  },
  {
    value: "on_hold",
    label: "متوقف",
    icon: PauseCircleIcon,
    color: "text-orange-500",
    badgeClass: "bg-orange-500/70 text-foreground",
    bgColor: "bg-orange-500",
    bgHoverColor: "hover:bg-orange-500/60!",
  },
  {
    value: "dropped",
    label: "متروك",
    icon: TrashIcon,
    color: "text-rose-500",
    badgeClass: "bg-rose-500/70 text-foreground",
    bgColor: "bg-rose-500",
    bgHoverColor: "hover:bg-rose-500/60!",
  },
] as const satisfies ReadonlyArray<StatusConfig>;

// Lookup helper — avoids .find() boilerplate at every call site
export function getStatusConfig(status: ReadingStatus): StatusConfig {
  return STATUS_CONFIG.find((s) => s.value === status) ?? STATUS_CONFIG[0];
}

/**
 * Base properties required by most UI components that display a book
 * (Cards, Modals, Simple Lists)
 */
export interface BaseBook {
  id: string;
  slug: string;
  title: string;
  coverImageUrl?: string | null;
  pageCount?: number | null;
  publicationYear?: number | null;
  status?: ReadingStatus | null;
  startedAt?: string | null;
  finishedAt?: string | null;
  author?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

/**
 * Type for book search results and list items
 */
export interface BookCardType extends BaseBook {
  subtitle?: string | null;
  description?: string | null;
  publicationDate?: string | null;
  originalLanguage?: string | null;
  originalTitle?: string | null;
  genres?: string[] | null;
  topics?: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Full book details with all relations
 * (Matches the result of findFirst with all relations)
 */
export type DetailedBookType = typeof books.$inferSelect & {
  author:
    | (typeof authors.$inferSelect & {
        totalBooks?: number;
        books?: Array<{
          id: string;
          title: string;
          coverImageUrl: string | null;
        }>;
      })
    | null;
  series: {
    id: string;
    name: string;
    slug: string;
  } | null;
  publisher: {
    id: string;
    name: string;
  } | null;
};
