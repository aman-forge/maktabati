import {
  BookmarkIcon,
  BookOpenIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  SquaresFourIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import type React from "react";

import type { BookRow, SeriesRow } from "./schema-types";

export const READING_STATUSES = [
  "want_to_read",
  "currently_reading",
  "completed",
  "on_hold",
  "dropped",
] as const;

export const BOOK_AUTHOR_ROLES = ["author", "co_author", "editor", "translator"] as const;

export type ReadingStatus = (typeof READING_STATUSES)[number];
export type BookAuthorRole = (typeof BOOK_AUTHOR_ROLES)[number];

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

export interface AuthorSummary {
  id: string;
  slug: string;
  name: string;
  nameEn?: string | null;
  profileImage?: string | null;
  bio?: string | null;
  birthYear?: number | null;
  deathYear?: number | null;
  nationality?: string | null;
  totalBooks?: number;
  books?: Array<{
    id: string;
    title: string;
    coverImageUrl: string | null;
  }>;
}

export interface PublisherSummary {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string | null;
  website?: string | null;
  country?: string | null;
}

export interface PublisherDetail extends PublisherSummary {
  bookCount: number;
  books: BookCardType[];
}

export interface BookContributor {
  role: BookAuthorRole;
  order: number;
  author: AuthorSummary;
}

export interface BookRatingSummary {
  average: number;
  totalRatings: number;
  totalReviews: number;
  distribution: Array<{ stars: 1 | 2 | 3 | 4 | 5; percent: number }>;
}

export interface BookReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  shelf: string;
  title: string;
  body: string;
  likes: number;
  verified?: boolean;
}

export interface BibliographicEdition {
  id: string;
  format: string;
  edition: string;
  publisher: string;
  publication: string;
  isbn?: string;
  isbn13?: string;
  language: string;
  translator?: string;
  pageCount?: number;
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
  pageProgress?: number | null;
  notes?: string | null;
  startedAt?: string | null;
  finishedAt?: string | null;
  primaryAuthor?: AuthorSummary | null;
  contributors?: BookContributor[];
  averageRating?: number | null;
  totalRatings?: number;
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
export type DetailedBookType = BookRow & {
  primaryAuthor: AuthorSummary | null;
  contributors: BookContributor[];
  authors: AuthorSummary[];
  translators: AuthorSummary[];
  editors: AuthorSummary[];
  series: Pick<SeriesRow, "id" | "name" | "slug"> | null;
  publisher: PublisherSummary | null;
  ratingSummary: BookRatingSummary;
  reviews: BookReviewItem[];
  editions: BibliographicEdition[];
  relatedBooks: BookCardType[];
};

export interface AuthorListItem extends AuthorSummary {
  bookCount: number;
}

export interface PublisherListItem extends PublisherSummary {
  bookCount: number;
}

export interface PublisherOption {
  id: string;
  name: string;
  slug: string;
}
