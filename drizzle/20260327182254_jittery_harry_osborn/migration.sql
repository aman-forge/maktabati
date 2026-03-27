ALTER TABLE "authors" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "books" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "authors" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "authors" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "authors" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "authors" AS PERMISSIVE FOR DELETE TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "authors" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "authors" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "authors" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "authors" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-select" ON "books" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-insert" ON "books" AS PERMISSIVE FOR INSERT TO "authenticated" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-update" ON "books" AS PERMISSIVE FOR UPDATE TO "authenticated" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-authenticated-policy-delete" ON "books" AS PERMISSIVE FOR DELETE TO "authenticated" USING (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-select" ON "books" AS PERMISSIVE FOR SELECT TO "anonymous" USING (true);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-insert" ON "books" AS PERMISSIVE FOR INSERT TO "anonymous" WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-update" ON "books" AS PERMISSIVE FOR UPDATE TO "anonymous" USING (false) WITH CHECK (false);--> statement-breakpoint
CREATE POLICY "crud-anonymous-policy-delete" ON "books" AS PERMISSIVE FOR DELETE TO "anonymous" USING (false);