ALTER TABLE "user_books" ALTER COLUMN "status" SET DATA TYPE text;--> statement-breakpoint
UPDATE "user_books"
SET "status" = CASE "status"
	WHEN 'read' THEN 'completed'
	WHEN 'did_not_finish' THEN 'dropped'
	ELSE "status"
END;--> statement-breakpoint
DROP TYPE "reading_status";--> statement-breakpoint
CREATE TYPE "reading_status" AS ENUM('want_to_read', 'currently_reading', 'completed', 'on_hold', 'dropped');--> statement-breakpoint
ALTER TABLE "user_books" ALTER COLUMN "status" SET DATA TYPE "reading_status" USING "status"::"reading_status";
