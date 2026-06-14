ALTER TABLE "books" RENAME COLUMN "tags" TO "topics";--> statement-breakpoint
ALTER INDEX "books_tags_gin_idx" RENAME TO "books_topics_gin_idx";