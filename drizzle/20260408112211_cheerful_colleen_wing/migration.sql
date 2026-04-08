ALTER TABLE "books" ADD COLUMN "tags" text[] DEFAULT '{}'::text[];--> statement-breakpoint
CREATE INDEX "books_genres_gin_idx" ON "books" USING gin ("genres");--> statement-breakpoint
CREATE INDEX "books_tags_gin_idx" ON "books" USING gin ("tags");