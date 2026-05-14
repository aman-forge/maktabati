ALTER TABLE "profiles" ADD COLUMN "birthday" date;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "website" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "social_links" jsonb;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "preferred_language" text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "profile_visibility" text DEFAULT 'public';--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "display_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "user_books" ADD CONSTRAINT "user_books_user_id_profiles_id_fkey" FOREIGN KEY ("user_id") REFERENCES "profiles"("id") ON DELETE CASCADE;