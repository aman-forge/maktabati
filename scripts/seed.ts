import "dotenv/config";
import { authors, books } from "@/db/tables";
import { eq } from "drizzle-orm";
import { db } from "@/db";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function createSlug(text: string): string {
  return (text || "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// ─── Author ───────────────────────────────────────────────────────────────────

const AUTHOR = {
  name: "عبدالعزيز مرزوق الطريفي",
  slug: "عبدالعزيز-الطريفي",
};

// ─── Books data ───────────────────────────────────────────────────────────────
// Sources: Goodreads, Safinatulnajat, Islamic way, Archive.org

type BookInput = {
  title: string;
  description: string | null;
  pageCount: number | null;
  publicationYear: number | null;
  genres: string[];
  tags: string[];
};

const BOOKS: BookInput[] = [
  {
    title: "التفسير والبيان لأحكام القرآن",
    description:
      "خمسة مجلدات في تفسير آيات الأحكام، يبسط فيها الشيخ القول على كل الآيات المتعلقة بأحكام التكليف الخمسة، مع العناية بالدليل والتوجيه الفقهي.",
    pageCount: null,
    publicationYear: 2017,
    genres: ["tafsir", "fiqh"],
    tags: [
      "tafsir_themes",
      "quranic_sciences",
      "fiqh_ibadat",
      "hadith_studies",
      "original_arabic",
      "annotated",
    ],
  },
  {
    title: "تفسير آيات الأحكام",
    description:
      "دروس علمية مفرغة في تفسير آيات الأحكام من القرآن الكريم، بدأت عام 1432هـ، تجمع بين التأصيل الحديثي والاستنباط الفقهي.",
    pageCount: null,
    publicationYear: 2011,
    genres: ["tafsir", "fiqh"],
    tags: ["tafsir_themes", "usul_al_tafsir", "fiqh_ibadat", "original_arabic"],
  },
  {
    title: "التقرير في أسانيد التفسير",
    description:
      "كتاب مختصر يبيّن فيه الشيخ الأسانيد التي تُروى بها التفاسير المختلفة لآيات القرآن الكريم، وضرورة اعتناء طالب العلم بها للتمييز بين الصحيح والضعيف.",
    pageCount: 96,
    publicationYear: 2013,
    genres: ["ulum_al_quran", "mustalah_hadith"],
    tags: [
      "usul_al_tafsir",
      "quranic_sciences",
      "mustalah",
      "hadith_studies",
      "original_arabic",
      "abridged",
    ],
  },
  {
    title: "الفصل بين النفس والعقل",
    description:
      "دراسة شرعية فلسفية تميّز بين مفهوم النفس ومفهوم العقل في الكتاب والسنة وكلام السلف، مع نقد المناهج الفلسفية المخالفة للوحي في هذا الباب.",
    pageCount: null,
    publicationYear: 2014,
    genres: ["aqidah", "philosophy"],
    tags: ["tawhid", "philosophical", "research", "original_arabic"],
  },
  {
    title: "الخرسانية في شرح عقيدة الرازيين",
    description:
      "شرح وتحقيق لعقيدة الرازيين، يُوضح الشيخ فيه مسائل الاعتقاد وبيان مواقف أهل السنة منها.",
    pageCount: null,
    publicationYear: null,
    genres: ["aqidah"],
    tags: ["tawhid", "asma_wa_sifat", "annotated", "original_arabic"],
  },
  {
    title: "صفة وضوء النبي صلى الله عليه وسلم",
    description: "رسالة في صفة وضوء النبي ﷺ مستخرجة من الأحاديث الصحيحة مع بيان الأحكام والسنن.",
    pageCount: null,
    publicationYear: null,
    genres: ["fiqh", "hadith"],
    tags: ["fiqh_ibadat", "hadith_studies", "original_arabic", "abridged"],
  },
  {
    title: "العقيدة المغربية",
    description:
      "شرح العقيدة القيروانية المعروفة بالعقيدة المغربية، يعرض فيها الشيخ مسائل الاعتقاد عند أهل السنة والجماعة بأسلوب علمي رصين.",
    pageCount: null,
    publicationYear: null,
    genres: ["aqidah"],
    tags: ["tawhid", "iman", "annotated", "original_arabic"],
  },
  {
    title: "صفة صلاة النبي صلى الله عليه وسلم",
    description:
      "أعظم مقامات العبودية اجتماع ظاهر الإنسان وباطنه على الخضوع لله. يصف الشيخ صلاة النبي ﷺ من التكبير إلى التسليم مع الاستدلال الحديثي الدقيق.",
    pageCount: 167,
    publicationYear: 2012,
    genres: ["fiqh", "hadith"],
    tags: ["fiqh_salah", "fiqh_ibadat", "hadith_studies", "original_arabic"],
  },
  {
    title: "صفة الحج",
    description:
      "رسالة علمية في صفة حجة النبي ﷺ مستخرجة من الأحاديث الصحيحة، تجمع بين الدقة الحديثية والفائدة الفقهية.",
    pageCount: null,
    publicationYear: null,
    genres: ["fiqh", "hadith"],
    tags: ["fiqh_hajj", "fiqh_ibadat", "hadith_studies", "original_arabic"],
  },
  {
    title: "التحجيل في تخريج ما لم يخرج من الأحاديث والآثار في إرواء الغليل",
    description:
      "يجمع الشيخ فيه الأحاديث المرفوعة والآثار الموقوفة التي أوردها الفقيه ابن ضويان في «منار السبيل» والتي لم يخرجها الألباني في «إرواء الغليل». فاز بجائزة أفضل عمل علمي لعام 1422هـ بالمملكة العربية السعودية.",
    pageCount: null,
    publicationYear: 2001,
    genres: ["hadith"],
    tags: [
      "hadith_studies",
      "jarh_tadil",
      "rijal_al_hadith",
      "research",
      "award_winning",
      "original_arabic",
    ],
  },
  {
    title: "الحجاب في الشرع والفطرة بين الدليل والقول الدخيل",
    description:
      "يؤصّل الشيخ حكم الحجاب من الكتاب والسنة والفطرة، ويرد على الشبهات المثارة حول فرضيته، مع التمييز بين الخمار والجلباب وأحكامهما.",
    pageCount: 176,
    publicationYear: 2015,
    genres: ["fiqh"],
    tags: ["fiqh_family", "halal_haram", "dawah", "original_arabic"],
  },
  {
    title: "تعظيم الله تعالى وحكم شاتمه",
    description:
      "بحث في تعظيم الله عز وجل وبيان حكم من سبّه أو استهزأ به، مستنداً إلى الأدلة الشرعية وأقوال العلماء.",
    pageCount: null,
    publicationYear: null,
    genres: ["aqidah", "fiqh"],
    tags: ["tawhid", "asma_wa_sifat", "research", "original_arabic"],
  },
  {
    title: "مختصر صحيح أذكار الصباح والمساء",
    description:
      "مختصر في الأذكار الثابتة عن النبي ﷺ للصباح والمساء، مع بيان درجة كل ذكر وما يترتب عليه من الفضائل.",
    pageCount: null,
    publicationYear: null,
    genres: ["hadith"],
    tags: ["hadith_studies", "adab_islami", "akhlaq_tazkiyah", "abridged", "original_arabic"],
  },
  {
    title: "المسائل المهمة في الأذان والإقامة",
    description:
      "رسالة فقهية حديثية في المسائل الدقيقة المتعلقة بالأذان والإقامة، تجمع الأدلة وتحرر الأقوال في كل مسألة.",
    pageCount: null,
    publicationYear: null,
    genres: ["fiqh", "hadith"],
    tags: ["fiqh_ibadat", "fiqh_salah", "hadith_studies", "original_arabic"],
  },
  {
    title: "الاختلاط تحرير وتقرير وتعقيب",
    description:
      "الكتاب الأكثر مبيعاً في معرض الرياض الدولي للكتاب 2010م. يحرر الشيخ مسألة الاختلاط بين الجنسين ويرد على من استدل بأحاديث قبل فرض الحجاب أو بسياقات خاصة على إباحته.",
    pageCount: null,
    publicationYear: 2010,
    genres: ["fiqh"],
    tags: ["fiqh_family", "halal_haram", "dawah", "award_winning", "original_arabic"],
  },
];

// ─── Main seed function ───────────────────────────────────────────────────────

async function seedAltarifiBooks() {
  console.log("🔍 Resolving author:", AUTHOR.name);

  // 1. Upsert author
  let authorId: string | undefined;

  // const [inserted] = await db
  //   .insert(authors)
  //   .values(AUTHOR)
  //   .onConflictDoNothing()
  //   .returning({ id: authors.id });

  // if (inserted) {
  //   authorId = inserted.id;
  //   console.log("✅ Author inserted, id:", authorId);
  // } else {
  const [existing] = await db
    .select({ id: authors.id })
    .from(authors)
    .where(eq(authors.slug, AUTHOR.slug))
    .limit(1);
  authorId = existing?.id;
  console.log("ℹ️  Author already exists, id:", authorId);
  // }

  if (!authorId) {
    console.error("❌ Could not resolve author ID. Aborting.");
    process.exit(1);
  }

  // 2. Build book rows
  const bookRows = BOOKS.map((b) => ({
    title: b.title,
    slug: `${createSlug(b.title)}-${Math.random().toString(36).substring(2, 7)}`,
    authorId,
    description: b.description,
    pageCount: b.pageCount,
    publicationYear: b.publicationYear,
    genres: b.genres,
    tags: b.tags,
    originalLanguage: "ar",
  }));

  // 3. Insert in one batch
  console.log(`📥 Inserting ${bookRows.length} books…`);

  await db.insert(books).values(bookRows);

  console.log(`\n🎉 Done! Inserted ${bookRows.length} books for "${AUTHOR.name}".`);
  console.log("\nBooks inserted:");
  BOOKS.forEach((b, i) => console.log(`  ${i + 1}. ${b.title}`));
}

seedAltarifiBooks().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
