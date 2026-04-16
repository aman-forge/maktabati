import fs from "fs";
import csvParser from "csv-parser";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";

const INPUT_CSV = path.join(process.cwd(), "jamalon-arabic-books.csv");
const OUTPUT_CSV = path.join(process.cwd(), "jamalon_cleaned.csv");

const CATEGORY_MAPPING: Record<string, string> = {
  "الكتب الإسلامية": "دراسات إسلامية",
  "الكتب السياسية": "سياسة وفكر سياسي",
  الفنون: "فنون وثقافة",
  الفلسفة: "فلسفة",
  "العلوم والطبيعة": "العلوم والطبيعة",
  "الصحافة والإعلام": "الصحافة والإعلام",
  "الشرع والقانون": "الشرع والقانون",
  "السير والمذكرات": "سيرة ذاتية",
  "الرياضة والتسلية": "فنون وثقافة",
  "التاريخ والجغرافيا": "تاريخ",
  "الاقتصاد والأعمال": "أعمال واقتصاد",
  "الأسرة والطفل": "أدب أطفال",
  "الأدب والخيال": "أدب قصصي / عام",
};

function isCleanArabic(text: string): boolean {
  if (!text || text.trim() === "") return false;
  const cleaned = text.replace(/[\u200e\u200f\u200c\u200d]/g, "").trim();
  // More inclusive Regex: Arabic + Numbers + basic punctuation
  return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\s0-9،؛؟.()"\'-]+$/.test(cleaned);
}

async function cleanJamalon() {
  const results: any[] = [];
  let totalRows = 0;
  let skippedEnglish = 0;

  console.log("🚀 Starting cleaning...");

  // We use a promise wrapper to ensure the file is written before the script ends
  return new Promise((resolve, reject) => {
    fs.createReadStream(INPUT_CSV)
      .pipe(csvParser())
      .on("data", (row: any) => {
        totalRows++;

        // 1. NORMALIZE KEYS (handles "Author", "author", " AUTHOR ")
        const normalizedRow: any = {};
        Object.keys(row).forEach((key) => {
          normalizedRow[key.trim().toLowerCase()] = row[key];
        });

        // 2. DEBUG: Log the first row to see what's happening
        if (totalRows === 1) {
          console.log("🔍 Detected columns:", Object.keys(normalizedRow));
        }

        const rawAuthor = (normalizedRow.author || "").toString().trim();

        // 3. VALIDATION
        if (!isCleanArabic(rawAuthor)) {
          skippedEnglish++;
          return;
        }

        const mappedGenre = CATEGORY_MAPPING[normalizedRow.category?.trim()] || null;

        results.push({
          title_ar: (normalizedRow.title || "").toString().trim(),
          description_ar: (normalizedRow.description || "").toString().trim(),
          pages: parseInt(normalizedRow.pagecount) || null,
          published_year: parseInt(normalizedRow.publicationyear) || null,
          author_name_ar: rawAuthor,
          author_slug: rawAuthor.replace(/\s+/g, "-").replace(/[^\u0600-\u06FF-]/g, ""),
          genre: mappedGenre,
          cover: normalizedRow.cover,
          isbn: normalizedRow.isbn,
        });
      })
      .on("end", async () => {
        console.log(`📊 Total rows processed: ${totalRows}`);
        console.log(`⛔ Skipped: ${skippedEnglish}`);
        console.log(`✅ Kept: ${results.length}`);

        if (results.length > 0) {
          const csvWriter = createObjectCsvWriter({
            path: OUTPUT_CSV,
            header: [
              { id: "title_ar", title: "title_ar" },
              { id: "description_ar", title: "description_ar" },
              { id: "pages", title: "pages" },
              { id: "published_year", title: "published_year" },
              { id: "author_name_ar", title: "author_name_ar" },
              { id: "author_slug", title: "author_slug" },
              { id: "genre", title: "genre" },
              { id: "cover", title: "cover" },
              { id: "isbn", title: "isbn" },
            ],
          });

          await csvWriter.writeRecords(results);
          console.log(`🎉 Saved to: ${OUTPUT_CSV}`);
        } else {
          console.log("⚠️ No records matched the criteria. No file was created.");
        }
        resolve(true);
      })
      .on("error", reject);
  });
}

cleanJamalon().catch(console.error);
