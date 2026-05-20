CREATE TYPE "book_author_role" AS ENUM('author', 'co_author', 'editor', 'translator');--> statement-breakpoint
CREATE TYPE "profile_visibility" AS ENUM('public', 'private', 'followers_only');--> statement-breakpoint
CREATE TABLE "book_authors" (
	"book_id" uuid,
	"author_id" uuid,
	"role" "book_author_role" DEFAULT 'author'::"book_author_role" NOT NULL,
	"order" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "book_authors_pkey" PRIMARY KEY("book_id","author_id")
);
--> statement-breakpoint
ALTER TABLE "book_authors" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "reviews" DROP CONSTRAINT "review_needs_rating_or_body";--> statement-breakpoint
DROP INDEX "user_books_user_idx";--> statement-breakpoint
ALTER TABLE "publishers" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "series" ADD COLUMN "author_id" uuid;--> statement-breakpoint
ALTER TABLE "user_books" ADD COLUMN "page_progress" integer;--> statement-breakpoint
ALTER TABLE "user_books" ADD COLUMN "notes" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "username" text;--> statement-breakpoint
UPDATE "profiles" SET "username" = 'user_' || substr(md5("id"), 1, 12) WHERE "username" IS NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "spoiler" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "books" DROP COLUMN "translator";--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "original_language" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "preferred_language" SET DEFAULT 'ar';--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" SET DATA TYPE "profile_visibility" USING "profile_visibility"::"profile_visibility";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" SET DEFAULT 'public'::"profile_visibility";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_username_key" UNIQUE("username");--> statement-breakpoint
CREATE INDEX "authors_nationality_idx" ON "authors" ("nationality");--> statement-breakpoint
CREATE INDEX "publishers_country_idx" ON "publishers" ("country");--> statement-breakpoint
CREATE INDEX "series_author_idx" ON "series" ("author_id");--> statement-breakpoint
CREATE INDEX "book_authors_book_idx" ON "book_authors" ("book_id");--> statement-breakpoint
CREATE INDEX "book_authors_author_idx" ON "book_authors" ("author_id");--> statement-breakpoint
CREATE INDEX "book_authors_author_role_idx" ON "book_authors" ("author_id","role");--> statement-breakpoint
CREATE INDEX "books_publication_year_idx" ON "books" ("publication_year");--> statement-breakpoint
CREATE INDEX "books_original_language_idx" ON "books" ("original_language");--> statement-breakpoint
CREATE INDEX "user_books_user_status_idx" ON "user_books" ("user_id","status");--> statement-breakpoint
CREATE INDEX "user_books_user_created_idx" ON "user_books" ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "user_books_user_updated_idx" ON "user_books" ("user_id","updated_at");--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_username_idx" ON "profiles" ("username");--> statement-breakpoint
CREATE INDEX "reviews_book_rating_idx" ON "reviews" ("book_id","rating");--> statement-breakpoint
CREATE INDEX "reviews_user_rating_idx" ON "reviews" ("user_id","rating");--> statement-breakpoint
ALTER TABLE "series" ADD CONSTRAINT "series_author_id_authors_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "book_authors" ADD CONSTRAINT "book_authors_book_id_books_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "book_authors" ADD CONSTRAINT "book_authors_author_id_authors_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "page_progress_positive" CHECK ("page_progress" IS NULL OR "page_progress" >= 0);--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "review_has_content" CHECK ("rating" IS NOT NULL OR ("body" IS NOT NULL AND trim("body") <> ''));--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "book_authors" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "book_authors" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "book_authors" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "book_authors" AS PERMISSIVE FOR DELETE TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "book_authors" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "book_authors" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "book_authors" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "book_authors" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);
