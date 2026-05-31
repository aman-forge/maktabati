import { z } from "zod";

import { READING_STATUSES } from "@/features/books/types";

export const uuidSchema = z.string().uuid();

export const bookSearchSchema = z.object({
  q: z.string().max(100).optional(),
  author: z.string().max(100).optional(),
  genres: z.array(z.string()).optional().catch(undefined),
  sort: z.enum(["newest", "oldest", "title-asc", "title-desc"]).default("newest"),
  view: z.enum(["grid", "detailed", "list"]).default("grid"),
  minYear: z.number().optional(),
  maxYear: z.number().optional(),
  minPages: z.number().optional(),
  maxPages: z.number().optional(),
  ratingMin: z.number().optional(),
  publishers: z.array(z.string()).optional().catch(undefined),
  topics: z.array(z.string()).optional().catch(undefined),
  readingStatus: z.array(z.enum(READING_STATUSES)).optional().catch(undefined),
  page: z.number().int().min(1).default(1),
});

export const bookSearchInputSchema = bookSearchSchema.extend({});

export type BookSearch = z.infer<typeof bookSearchSchema>;
export type BookSearchInput = z.infer<typeof bookSearchInputSchema>;
