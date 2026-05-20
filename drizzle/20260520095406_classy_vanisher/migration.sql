INSERT INTO "book_authors" ("book_id", "author_id", "role", "order")
SELECT "id", "author_id", 'author'::"book_author_role", 0
FROM "books"
WHERE "author_id" IS NOT NULL
ON CONFLICT DO NOTHING;--> statement-breakpoint
DELETE FROM "book_authors"
WHERE "book_id" IS NULL OR "author_id" IS NULL;--> statement-breakpoint
ALTER TABLE "book_authors" ALTER COLUMN "book_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "book_authors" ALTER COLUMN "author_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "book_authors" DROP CONSTRAINT "book_authors_pkey";--> statement-breakpoint
ALTER TABLE "book_authors" ADD PRIMARY KEY ("book_id","author_id","role");--> statement-breakpoint
ALTER TABLE "books" DROP CONSTRAINT "books_author_id_authors_id_fkey";--> statement-breakpoint
DROP INDEX "books_author_idx";--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN "author_id";--> statement-breakpoint
CREATE INDEX "book_authors_book_role_order_idx" ON "book_authors" ("book_id","role","order");
