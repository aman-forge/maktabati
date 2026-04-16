// constants/books.ts

// ─────────────────────────────────────────────────────────────
// 1. التصنيفات الرئيسية (Genres)
// يفضّل إجبار المستخدم على اختيار 1 إلى 3 فقط
// ─────────────────────────────────────────────────────────────
export interface BookGenre {
  value: string;
  label: string;
}
export const BOOK_GENRES: BookGenre[] = [
  // أدب / روايات / قصص
  { value: "fiction", label: "أدب قصصي / عام" },
  { value: "literary_fiction", label: "أدب أدبي / رفيع" },
  { value: "historical_fiction", label: "رواية تاريخية" },
  { value: "mystery_thriller", label: "غموض وإثارة" },
  { value: "crime", label: "جريمة وتحقيق" },
  { value: "horror", label: "رعب" },
  { value: "romance", label: "رومانسية" },
  { value: "science_fiction", label: "خيال علمي" },
  { value: "fantasy", label: "فنتازيا" },
  { value: "adventure", label: "مغامرات" },
  { value: "drama", label: "دراما" },
  { value: "satire", label: "سخرية / تهكم" },
  { value: "poetry", label: "شعر" },
  { value: "short_stories", label: "قصص قصيرة" },
  { value: "novella", label: "نوفيلا / رواية قصيرة" },
  { value: "young_adult", label: "يافعين / ناشئة" },
  { value: "children", label: "أدب أطفال" },
  { value: "translated_literature", label: "أدب مترجم" },

  // غير قصصي / معرفي
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
  { value: "reference", label: "مراجع وموسوعات" },
  { value: "academic", label: "أكاديمي / دراسي" },

  // إسلاميات وعلوم شرعية
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
  { value: "islamic_finance", label: "الاقتصاد والمالية الإسلامية" },
  { value: "comparative_religion", label: "مقارنة الأديان" },
] as const;

// ─────────────────────────────────────────────────────────────
// 2. الوسوم (Tags / Tropes / Topics)
// يمكن اختيار عدد مفتوح منها
// مقسّمة لتناسب الروايات والكتب الإسلامية والعربية والمعرفة العامة
// ─────────────────────────────────────────────────────────────
export const BOOK_TAGS = [
  // ── إعدادات وعوالم القصة ──
  { value: "space", label: "فضاء" },
  { value: "dystopia", label: "ديستوبيا" },
  { value: "utopia", label: "يوتوبيا" },
  { value: "cyberpunk", label: "سايبربانك" },
  { value: "steampunk", label: "ستيم بانك" },
  { value: "post_apocalyptic", label: "ما بعد الكارثة" },
  { value: "alternate_history", label: "تاريخ بديل" },
  { value: "medieval", label: "عصور وسطى" },
  { value: "school_life", label: "حياة مدرسية / جامعية" },
  { value: "academy", label: "أكاديمية / معهد" },
  { value: "virtual_reality", label: "واقع افتراضي" },
  { value: "multiverse", label: "عوالم متعددة" },
  { value: "time_travel", label: "سفر عبر الزمن" },
  { value: "prison", label: "سجن / معتقل" },
  { value: "desert", label: "صحراء" },
  { value: "city_life", label: "حياة مدينة" },
  { value: "village_life", label: "حياة ريفية / قروية" },
  { value: "royal_court", label: "قصر / بلاط ملكي" },
  { value: "interstellar", label: "بين النجوم" },

  // ── الحبكات والموضوعات العامة ──
  { value: "survival", label: "بقاء على قيد الحياة" },
  { value: "revenge", label: "انتقام" },
  { value: "redemption", label: "خلاص / توبة / فداء" },
  { value: "sacrifice", label: "تضحية" },
  { value: "rebellion", label: "تمرد / ثورة" },
  { value: "war_military", label: "حروب ومعارك" },
  { value: "politics", label: "سياسة ومؤامرات" },
  { value: "conspiracy", label: "مؤامرة" },
  { value: "prophecy", label: "نبوءة" },
  { value: "secret_society", label: "جمعيات سرية" },
  { value: "investigation", label: "تحقيق" },
  { value: "mystery", label: "ألغاز" },
  { value: "quest", label: "مهمة / رحلة" },
  { value: "treasure_hunt", label: "البحث عن كنز" },
  { value: "journey", label: "رحلة" },
  { value: "trial", label: "محاكمة / ابتلاء" },
  { value: "competition", label: "منافسة / بطولة" },
  { value: "coming_of_age", label: "نضوج وبلوغ" },
  { value: "family_drama", label: "دراما عائلية" },
  { value: "friendship", label: "صداقة" },
  { value: "betrayal", label: "خيانة" },
  { value: "betrayal_and_loyalty", label: "خيانة ووفاء" },
  { value: "amnesia", label: "فقدان الذاكرة" },
  { value: "identity_secret", label: "هوية سرية" },
  { value: "destiny", label: "قدر / مصير" },
  { value: "moral_dilemma", label: "مأزق أخلاقي" },
  { value: "found_family", label: "عائلة مكتسبة" },
  { value: "chosen_one", label: "المختار" },
  { value: "forbidden_knowledge", label: "معرفة محرمة" },
  { value: "under_dog", label: "بطل من الهامش" },
  { value: "slice_of_life", label: "حياة يومية" },
  { value: "dark_comedy", label: "كوميديا سوداء" },
  { value: "philosophical", label: "فلسفي / تأملي" },
  { value: "plot_twist", label: "حبكة صادمة" },
  { value: "fast_paced", label: "إيقاع سريع" },
  { value: "slow_paced", label: "إيقاع هادئ" },
  { value: "tragic", label: "تراجيدي" },
  { value: "cozy", label: "دافئ / مريح" },
  { value: "suspense", label: "تشويق" },
  { value: "multiple_pov", label: "تعدد وجهات النظر" },
  { value: "first_person", label: "سرد بضمير المتكلم" },
  { value: "third_person", label: "سرد بضمير الغائب" },
  { value: "epistolary", label: "سرد بالرسائل / المذكرات" },
  { value: "anthology", label: "مجموعة / أنطولوجيا" },

  // ── شخصيات وأنماط شخصيات ──
  { value: "villain_protagonist", label: "بطل شرير" },
  { value: "anti_hero", label: "بطل غير مثالي" },
  { value: "strong_female_lead", label: "بطلة قوية" },
  { value: "detective", label: "محقق ذكي" },
  { value: "scholar_protagonist", label: "بطل/بطلة من أهل العلم" },
  { value: "warrior", label: "محارب" },
  { value: "ruler", label: "حاكم / ملك" },
  { value: "prince_princess", label: "أمير / أميرة" },
  { value: "orphan", label: "يتيم" },
  { value: "assassin", label: "قاتل مأجور" },
  { value: "unreliable_narrator", label: "راوٍ غير موثوق" },
  { value: "genius", label: "عبقري" },
  { value: "mentor", label: "مرشد / معلّم" },
  { value: "child_protagonist", label: "بطل طفل" },
  { value: "outcast", label: "منبوذ / معزول" },
  { value: "female_protagonist", label: "بطلة رئيسية" },
  { value: "male_protagonist", label: "بطل رئيسي" },

  // ── عناصر خيالية / أسطورية ──
  { value: "magic", label: "سحر وقوى خارقة" },
  { value: "mythology", label: "أساطير وميثولوجيا" },
  { value: "vampires", label: "مصاصو دماء" },
  { value: "demons", label: "شياطين" },
  { value: "jinn", label: "جن" },
  { value: "angels", label: "ملائكة" },
  { value: "aliens", label: "كائنات فضائية" },

  // ── الرومانسية ──
  { value: "enemies_to_lovers", label: "من أعداء إلى عشاق" },
  { value: "friends_to_lovers", label: "من أصدقاء إلى عشاق" },
  { value: "fake_dating", label: "مواعدة مزيفة" },
  { value: "love_triangle", label: "مثلث حب" },
  { value: "slow_burn", label: "حب بطيء الاشتعال" },
  { value: "arranged_marriage", label: "زواج مدبّر" },
  { value: "second_chance", label: "فرصة ثانية" },
  { value: "forbidden_love", label: "حب ممنوع" },
  { value: "childhood_friends", label: "أصدقاء الطفولة" },
  { value: "opposites_attract", label: "الأضداد تتجاذب" },
  { value: "contract_marriage", label: "زواج تعاقدي" },
  { value: "protective_mc", label: "بطل/بطلة حامية" },

  // ── إسلاميات وموضوعات شرعية ──
  { value: "tawhid", label: "توحيد" },
  { value: "asma_wa_sifat", label: "الأسماء والصفات" },
  { value: "iman", label: "الإيمان" },
  { value: "qadar", label: "القدر" },
  { value: "imaniyyat", label: "إيمانيات" },
  { value: "usul_al_tafsir", label: "أصول التفسير" },
  { value: "tafsir_themes", label: "موضوعات قرآنية" },
  { value: "quranic_sciences", label: "علوم قرآنية" },
  { value: "qiraat_studies", label: "دراسات قرآنية / قراءات" },
  { value: "tajweed_rules", label: "أحكام التجويد" },
  { value: "hadith_studies", label: "دراسات حديثية" },
  { value: "mustalah", label: "مصطلح الحديث" },
  { value: "jarh_tadil", label: "الجرح والتعديل" },
  { value: "rijal_al_hadith", label: "رجال الحديث" },
  { value: "sirah_nabawiyyah", label: "السيرة النبوية" },
  { value: "shamaail_nabawiyyah", label: "الشمائل النبوية" },
  { value: "sahaba", label: "الصحابة" },
  { value: "tabiun", label: "التابعون" },
  { value: "fiqh_ibadat", label: "فقه العبادات" },
  { value: "fiqh_muamalat", label: "فقه المعاملات" },
  { value: "fiqh_family", label: "فقه الأسرة" },
  { value: "fiqh_inheritance", label: "فقه المواريث" },
  { value: "fiqh_zakat", label: "فقه الزكاة" },
  { value: "fiqh_salah", label: "فقه الصلاة" },
  { value: "fiqh_sawm", label: "فقه الصيام" },
  { value: "fiqh_hajj", label: "فقه الحج" },
  { value: "halal_haram", label: "حلال وحرام" },
  { value: "adab_islami", label: "آداب إسلامية" },
  { value: "akhlaq_tazkiyah", label: "أخلاق وتزكية" },
  { value: "spirituality", label: "روحانيات" },
  { value: "dawah", label: "دعوة" },
  { value: "comparative_fiqh", label: "فقه مقارن" },
  { value: "madhahib", label: "المذاهب الفقهية" },
  { value: "aqeedah_deviant_sects", label: "فرق ومذاهب عقدية" },
  { value: "islamic_history", label: "تاريخ إسلامي" },
  { value: "islamic_civilization", label: "حضارة إسلامية" },
  { value: "islamic_finance", label: "مالية إسلامية" },
  { value: "waqf", label: "الوقف" },
  { value: "endowments", label: "الأوقاف" },

  // ── اللغة العربية والأدب ──
  { value: "grammar", label: "قواعد" },
  { value: "morphology", label: "صرف" },
  { value: "rhetoric", label: "بلاغة" },
  { value: "prosody", label: "عَروض" },
  { value: "philology", label: "فقه اللغة" },
  { value: "semantics", label: "دلالة ومعنى" },
  { value: "vocabulary", label: "مفردات" },
  { value: "writing_skills", label: "مهارات كتابة" },
  { value: "reading_skills", label: "مهارات قراءة" },
  { value: "classical_arabic", label: "عربية تراثية" },
  { value: "modern_arabic", label: "عربية معاصرة" },
  { value: "poetry_classical", label: "شعر عربي كلاسيكي" },
  { value: "poetry_modern", label: "شعر حديث" },

  // ── أنواع الكتب والهيئة العامة ──
  { value: "classic", label: "كلاسيكي" },
  { value: "contemporary", label: "معاصر" },
  { value: "translated", label: "مترجم" },
  { value: "original_arabic", label: "مؤلف عربي أصلي" },
  { value: "abridged", label: "مختصر" },
  { value: "annotated", label: "مشروح / معلّق" },
  { value: "illustrated", label: "مُصوّر" },
  { value: "standalone", label: "كتاب مستقل" },
  { value: "series", label: "سلسلة" },
  { value: "omnibus", label: "مجموعة مجلدات" },
  { value: "essay_collection", label: "مجموعة مقالات" },
  { value: "guide", label: "دليل" },
  { value: "manual", label: "كتيّب / مرجع عملي" },
  { value: "textbook", label: "كتاب دراسي" },
  { value: "workbook", label: "دفتر تدريبات" },
  { value: "reference_work", label: "مرجع" },
  { value: "encyclopedia", label: "موسوعة" },
  { value: "interview", label: "حوار / مقابلات" },
  { value: "research", label: "بحث علمي" },
  { value: "case_study", label: "دراسة حالة" },
  { value: "review", label: "مراجعة / عرض" },
] as const;

// ─────────────────────────────────────────────────────────────
// 3. استخراج الأنواع (TypeScript Utility Types)
// ─────────────────────────────────────────────────────────────
export type GenreValue = (typeof BOOK_GENRES)[number]["value"];
export type TagValue = (typeof BOOK_TAGS)[number]["value"];

export interface GenreOption {
  value: GenreValue;
  label: string;
}

export interface TagOption {
  value: TagValue;
  label: string;
}
