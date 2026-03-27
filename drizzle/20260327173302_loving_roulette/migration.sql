CREATE TABLE "authors" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"bio" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "books" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"author_id" integer NOT NULL,
	"description" text NOT NULL,
	"cover_image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "books" ADD CONSTRAINT "books_author_id_authors_id_fkey" FOREIGN KEY ("author_id") REFERENCES "authors"("id") ON DELETE CASCADE;