// db/constants/books.ts

// ─────────────────────────────────────────────────────────────
// 1. Main Genres (تصنيفات)
// ─────────────────────────────────────────────────────────────
export interface BookGenre {
  value: string;
  label: string;
}

export const BOOK_GENRES: BookGenre[] = [
  // ── الأدب والروايات ──
  { value: "fiction", label: "أدب عام" },
  { value: "literary_fiction", label: "أدب رفيع" },
  { value: "historical_fiction", label: "رواية تاريخية" },
  { value: "mystery_thriller", label: "غموض وإثارة" },
  { value: "crime", label: "جريمة وتحقيق" },
  { value: "horror", label: "رعب" },
  { value: "romance", label: "رومانسية" },
  { value: "science_fiction", label: "خيال علمي" },
  { value: "fantasy", label: "فنتازيا" },
  { value: "adventure", label: "مغامرات" },
  { value: "drama", label: "دراما" },
  { value: "satire", label: "سخرية" },
  { value: "short_stories", label: "قصص قصيرة" },
  { value: "novella", label: "رواية قصيرة" },
  { value: "young_adult", label: "يافعين / ناشئة" },
  { value: "children", label: "أدب أطفال" },
  { value: "folklore", label: "فولكلور وأساطير" },
  { value: "poetry", label: "شعر" },

  // ── غير قصصي ──
  { value: "biography", label: "سيرة ذاتية" },
  { value: "memoir", label: "مذكرات" },
  { value: "history", label: "تاريخ" },
  { value: "psychology", label: "علم نفس" },
  { value: "self_help", label: "تطوير الذات" },
  { value: "business_economics", label: "أعمال واقتصاد" },
  { value: "science_technology", label: "علوم وتكنولوجيا" },
  { value: "philosophy", label: "فلسفة" },
  { value: "politics", label: "سياسة وفكر سياسي" },
  { value: "sociology", label: "علم اجتماع" },
  { value: "education", label: "تربية وتعليم" },
  { value: "arts_culture", label: "فنون وثقافة" },
  { value: "travel", label: "سفر ورحلات" },
  { value: "health_medicine", label: "صحة وطب" },
  { value: "literary_criticism", label: "نقد أدبي" },
  { value: "reference", label: "مراجع وموسوعات" },
  { value: "academic", label: "دراسات أكاديمية" },

  // ── إسلاميات ──
  { value: "islamic_studies", label: "دراسات إسلامية" },
  { value: "aqidah", label: "عقيدة" },
  { value: "fiqh", label: "فقه" },
  { value: "usul_fiqh", label: "أصول الفقه" },
  { value: "qawaid_fiqhiyyah", label: "القواعد الفقهية" },
  { value: "maqasid_al_sharia", label: "مقاصد الشريعة" },
  { value: "tafsir", label: "تفسير القرآن" },
  { value: "ulum_al_quran", label: "علوم القرآن" },
  { value: "qiraat", label: "القراءات" },
  { value: "tajweed", label: "التجويد" },
  { value: "hadith", label: "الحديث النبوي" },
  { value: "mustalah_hadith", label: "مصطلح الحديث" },
  { value: "rijal", label: "الرجال والتراجم" },
  { value: "sirah", label: "السيرة النبوية" },
  { value: "shamaail", label: "الشمائل" },
  { value: "tazkiyah", label: "تزكية النفس" },
  { value: "akhlaq", label: "الأخلاق والآداب" },
  { value: "islamic_finance", label: "الاقتصاد الإسلامي" },
  { value: "comparative_religion", label: "مقارنة الأديان" },
];

// ─────────────────────────────────────────────────────────────
// 2. Tags / Topics (وسام؟)
// ─────────────────────────────────────────────────────────────
export const BOOK_TOPICS = [
  // ── البيئة والعالم ──
  { value: "space", label: "فضاء" },
  { value: "dystopia", label: "ديستوبيا" },
  { value: "post_apocalyptic", label: "ما بعد الكارثة" },
  { value: "alternate_history", label: "تاريخ بديل" },
  { value: "medieval", label: "عصور وسطى" },
  { value: "virtual_reality", label: "واقع افتراضي" },
  { value: "multiverse", label: "عوالم متعددة" },
  { value: "time_travel", label: "سفر عبر الزمن" },
  { value: "desert", label: "صحراء" },
  { value: "city_life", label: "حياة مدينة" },
  { value: "village_life", label: "حياة ريفية" },

  // ── الحبكات والموضوعات ──
  { value: "survival", label: "بقاء" },
  { value: "revenge", label: "انتقام" },
  { value: "redemption", label: "خلاص" },
  { value: "sacrifice", label: "تضحية" },
  { value: "rebellion", label: "تمرد" },
  { value: "war", label: "حروب" },
  { value: "conspiracy", label: "مؤامرة" },
  { value: "prophecy", label: "نبوءة" },
  { value: "investigation", label: "تحقيق" },
  { value: "mystery", label: "ألغاز" },
  { value: "journey", label: "رحلة" },
  { value: "coming_of_age", label: "نضوج" },
  { value: "family", label: "عائلة" },
  { value: "friendship", label: "صداقة" },
  { value: "betrayal", label: "خيانة" },
  { value: "destiny", label: "قدر" },
  { value: "moral_dilemma", label: "مأزق أخلاقي" },

  // ── عناصر خيالية ──
  { value: "magic", label: "سحر" },
  { value: "mythology", label: "أساطير" },
  { value: "aliens", label: "كائنات فضائية" },

  // ── إسلاميات ──
  { value: "tawhid", label: "توحيد" },
  { value: "iman", label: "الإيمان" },
  { value: "qadar", label: "القدر" },
  { value: "sirah_nabawiyyah", label: "السيرة النبوية" },
  { value: "fiqh_ibadat", label: "فقه العبادات" },
  { value: "akhlaq_tazkiyah", label: "تزكية وأخلاق" },
  { value: "dawah", label: "دعوة" },

  // ── اللغة العربية ──
  { value: "grammar", label: "نحو" },
  { value: "morphology", label: "صرف" },
  { value: "rhetoric", label: "بلاغة" },
  { value: "classical_arabic", label: "لغة تراثية" },
  { value: "modern_arabic", label: "لغة معاصرة" },
];

// TODO: DELETE
export const PUBLISHERS = [
  "دار الكتب العلمية",
  "دار الفكر",
  "دار السلام",
  "دار ابن حزم",
  "دار المنهاج",
  "دار التقوى",
  "دار الحديث",
  "مؤسسة الرسالة",
  "دار المعارف",
  "دار القلم",
] as const;

// ─────────────────────────────────────────────────────────────
// 3. TypeScript Utility Types
// ─────────────────────────────────────────────────────────────
export type GenreValue = (typeof BOOK_GENRES)[number]["value"];
export type TopicValue = (typeof BOOK_TOPICS)[number]["value"];

export interface GenreOption {
  value: GenreValue;
  label: string;
}
export interface TopicOption {
  value: TopicValue;
  label: string;
}
