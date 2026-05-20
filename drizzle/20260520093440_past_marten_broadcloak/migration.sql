ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" DROP DEFAULT;--> statement-breakpoint
DROP TYPE "profile_visibility";--> statement-breakpoint
CREATE TYPE "profile_visibility" AS ENUM('public', 'private', 'friends');--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" SET DATA TYPE "profile_visibility" USING "profile_visibility"::"profile_visibility";--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "profile_visibility" SET DEFAULT 'public'::"profile_visibility";