import "dotenv/config";
import fs from "fs";
import csv from "csv-parser";
import { authors, books } from "@/db/tables";
import { eq } from "drizzle-orm";
import { db } from "@/db";

function createSlug(text: string): string {
  return (text || "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Robust number parser
const parseCsvInt = (val: any) => {
  if (!val || val === "None" || val === "") return null;
  const cleaned = val.toString().replace(/[^\d]/g, ""); // Remove non-digits
  const parsed = parseInt(cleaned, 10);
  return isNaN(parsed) ? null : parsed;
};

async function seedJamalon() {
  const csvPath = "./scripts/jamalon_cleaned.csv";
  if (!fs.existsSync(csvPath)) return console.error("❌ CSV not found");

  console.log("📥 Reading CSV...");
  const rows: any[] = await new Promise((resolve, reject) => {
    const data: any[] = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => data.push(row))
      .on("end", () => resolve(data))
      .on("error", reject);
  });

  console.log(`✅ Loaded ${rows.length} rows. Seeding in batches...`);

  const authorCache = new Map<string, string>();
  let seededCount = 0;
  let skippedCount = 0;

  // Batching setup
  const BATCH_SIZE = 100;
  let currentBatch: any[] = [];

  for (const row of rows) {
    try {
      const authorName = (row.author_name_ar || "").trim();
      const authorSlug = (row.author_slug || "").trim();
      if (!authorName) {
        skippedCount++;
        continue;
      }

      // 1. Resolve Author ID (Cached)
      let authorId = authorCache.get(authorSlug);
      if (!authorId) {
        const [inserted] = await db
          .insert(authors)
          .values({ name: authorName, slug: authorSlug })
          .onConflictDoNothing()
          .returning({ id: authors.id });

        if (inserted) {
          authorId = inserted.id;
        } else {
          const [existing] = await db
            .select({ id: authors.id })
            .from(authors)
            .where(eq(authors.slug, authorSlug))
            .limit(1);
          authorId = existing?.id;
        }
        if (authorId) authorCache.set(authorSlug, authorId);
      }

      if (!authorId) {
        skippedCount++;
        continue;
      }

      // 2. Build Book Object
      const title = (row.title_ar || "").trim();
      const desc = row.description_ar === "None" ? null : (row.description_ar || "").trim();

      currentBatch.push({
        title,
        slug: `${createSlug(title)}-${Math.random().toString(36).substring(2, 7)}`,
        description: desc || null,
        pageCount: parseCsvInt(row.pages),
        publicationYear: parseCsvInt(row.published_year),
        genres: row.genre ? [row.genre.trim()] : [],
        authorId: authorId,
      });

      // 3. Insert Batch
      if (currentBatch.length >= BATCH_SIZE) {
        await db.insert(books).values(currentBatch);
        seededCount += currentBatch.length;
        process.stdout.write(`\r🚀 Seeded ${seededCount} books...`);
        currentBatch = [];
      }
    } catch (err) {
      console.error(`\n❌ Error at "${row.title_ar}":`, err);
      skippedCount++;
    }
  }

  // Final remaining batch
  if (currentBatch.length > 0) {
    await db.insert(books).values(currentBatch);
    seededCount += currentBatch.length;
  }

  console.log(`\n\n🎉 Done! Seeded: ${seededCount}, Skipped: ${skippedCount}`);
}

seedJamalon().catch(console.error);
