export interface Book {
  id: string;
  title?: string;
  description?: string;
  author_id?: string;
  page_count?: number;
  publication_date?: string;
  created_at?: string;
  cover_image_url?: string;
  author?: Author;
}
export interface Author {
  id: string;
  name?: string;
  bio?: string;
  birth_date?: string;
  death_date?: string;
  image_url?: string;
}

// FAKE TYPE
export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  likes: number;
  shelf: string;
  verified: boolean;
}

export interface BookDetail extends Book {
  series?: string;
  badges?: string[];
  ratingCounts?: { stars: number; pct: number }[];
  ratingTotal?: number;
  reviewCountTotal?: number;
  meta?: { label: string; value: string }[];
  descriptionTags?: string[];
  descriptionParagraphs?: string[];
  authorDetails?: Author;
  sidebarDetails?: { label: string; value: string }[];
  otherEditions?: { format: string; detail: string; publisher: string }[];
  reviews?: Review[];
}

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "وليدو الضباب: الإمبراطورية النهائية",
    description:
      "بداية ملحمة الرماد والسحر؛ صراع اللصوص ضد الطاغية الخالد في عالم تُحكمه المعادن.",
    page_count: 647,
    publication_date: "2024",
    cover_image_url: "/books/وليدو الضباب.png",
    author: {
      id: "brandon-sanderson",
      name: "براندون ساندرسون",
      bio: 'براندون ساندرسون هو أحد أبرز كتاب الفانتازيا المعاصرين، مبتكر عالم "الكوزمير" الضخم. اشتهر بنظم سحر منطقية ومفصلة، شخصيات عميقة، وقصص ملحمية مليئة بالمفاجآت.',
      image_url: "/sanderson.png",
    },
  },
  {
    id: "3",
    title: "البلاء الشديد والميلاد الجديد",
    description:
      "مذكرات واقعية وملهمة تروي تفاصيل 14 عاماً قضاها المؤلف في سجن غوانتانامو، تجسد الصبر واليقين في وجه الابتلاء.",
    page_count: 512,
    publication_date: "2020",
    cover_image_url: "/books/البلاء الشديد.png",
    author: {
      id: "faiz-alkandari",
      name: "فايز الكندري",
    },
  },
  {
    id: "4",
    title: "ذو البدلة البنية",
    description:
      "مغامرة مثيرة تبدأ من محطة قطار لندن وتنتهي في جنوب أفريقيا بحثاً عن قاتل غامض وماسة مفقودة.",
    page_count: 320,
    publication_date: "2024",
    cover_image_url: "/books/ذو البدلة البنية.png",
    author: {
      id: "agatha-christie",
      name: "أغاثا كريستي",
    },
  },
  {
    id: "6",
    title: "على ثرى دمشق",
    description:
      "مذكرات تاريخية توثق تفاصيل دقيقة ومرحلة مفصلية من الصراع وتاريخ العمل الإسلامي في دمشق خلال السبعينيات والثمانينيات.",
    page_count: 445,
    publication_date: "2017",
    cover_image_url: "/books/على ثرى دمشق.png",
    author: {
      id: "ayman-alsharbaji",
      name: "أيمن أحمد الشربجي",
    },
  },
  {
    id: "8",
    title: "أول مرة أتدبر فيها القرآن",
    description:
      "دليل عملي لفهم مقاصد السور والآيات لتعيش مع القرآن روحاً ومعنى.",
    page_count: 280,
    publication_date: "2025",
    cover_image_url: "/books/أول مرة أتدبر القرآن.png",
    author: {
      id: "adel-khalil",
      name: "عادل محمد خليل",
    },
  },
  {
    id: "9",
    title: "أسئلة الثورة",
    description:
      "مراجعات فكرية حول مفاهيم التغيير، المجتمع، وقضايا النهضة والحرية والاستبداد.",
    page_count: 240,
    publication_date: "2024",
    cover_image_url: "/books/أسئلة الثورة.png",
    author: {
      id: "salman-alodah",
      name: "سلمان العودة",
    },
  },
  {
    id: "10",
    title: "أحجار على رقعة الشطرنج",
    description:
      "كتاب تاريخي يتحدث عن القوى الخفية والمؤامرات التي تدير الصراعات العالمية من وراء الستار.",
    page_count: 320,
    publication_date: "2025",
    cover_image_url: "/books/شطرنج.png",
    author: {
      id: "william-guy-carr",
      name: "ويليام غاي كار",
    },
  },
  {
    id: "2",
    title: "نهج الملوك: أرشيف أضواء العاصفة",
    description:
      "عالم روشار الذي تضربه العواصف العاتية وصراع الفرسان لاستعادة مجدهم القديم.",
    page_count: 1200,
    publication_date: "2025",
    cover_image_url: "/books/نهج الملوك.png",
    author: {
      id: "brandon-sanderson",
      name: "براندون ساندرسون",
    },
  },
  {
    id: "7",
    title: "فصول في العقيدة",
    description:
      "رسالة علمية رصينة (تعرف بالرسالة الشامية) تؤصل لأبواب العقيدة الإسلامية بأسلوب واضح ومختصر يرسخ الإيمان.",
    page_count: 72,
    publication_date: "2013",
    cover_image_url: "/books/فصول في العقيدة.png",
    author: {
      id: "abdulaziz-al-tarifi",
      name: "عبدالعزيز الطريفي",
    },
  },
];

export const TRENDING_BOOKS = BOOKS;
export const NEW_RELEASES = BOOKS;
export const STAFF_PICKS = BOOKS;

export const ARTICLES = [
  {
    id: "1",
    type: "article",
    tag: "تحليل عميق",
    title:
      "كيف أعاد نظام الألومنسي في وليدو الضباب تعريف السحر في الفانتازيا الحديثة",
    excerpt:
      "نظام حرق المعادن الذي ابتكره براندون ساندرسون فريد تمامًا — نستعرض لماذا يعمل ببراعة وكيف يستلهم من الكلاسيكيات مع إضافة لمسة مبتكرة.",
    author: "محررو فوليو",
    date: "4 أكتوبر 2025",
    readTime: "6 دقائق قراءة",
    cover: "/books/شطرنج.png",
  },
  {
    id: "2",
    type: "article",
    tag: "حوار",
    title: "براندون ساندرسون يتحدث عن كتابة الثورة والسحر والكتب التي ألهمته",
    excerpt:
      "جلسنا مع الكاتب للحديث عن السنوات التي قضاها في بناء عالم سكادريال، هوسه بالتاريخ السياسي، وكيف صمم شخصيات مثل فين وكيلسير.",
    author: "محررو فوليو",
    date: "12 سبتمبر 2025",
    readTime: "9 دقائق قراءة",
    cover: "/sanderson.png",
  },
  {
    id: "3",
    type: "article",
    tag: "الأفضل",
    title:
      "أفضل 20 رواية فانتازيا بداية في العقد الأخير — ومكانة وليدو الضباب بينها",
    excerpt:
      "من The Name of the Wind إلى Babel، الروايات البداية في الفانتازيا أقوى من أي وقت مضى. أين يقف عمل ساندرسون الأول بين العمالقة؟",
    author: "محررو فوليو",
    date: "1 نوفمبر 2025",
    readTime: "12 دقيقة قراءة",
    cover: "/books/شطرنج.png",
  },
];

export const OFFICIAL_LISTS = [
  {
    id: "l1",
    title: "أفضل روايات الفانتازيا لعام 2025",
    bookCount: 25,
    rank: 1,
    cover: "/books/شطرنج.png",
  },
  {
    id: "l2",
    title: "أساسيات الفانتازيا البداية — مجموعة فوليو",
    bookCount: 30,
    rank: 3,
    cover: "/books/شطرنج.png",
  },
  {
    id: "l3",
    title: "أفضل أنظمة سحر لا تُنسى",
    bookCount: 18,
    rank: 2,
    cover: "/books/شطرنج.png",
  },
  {
    id: "l4",
    title: "روايات السرقة والثورة في الفانتازيا",
    bookCount: 22,
    rank: 4,
    cover: "/books/شطرنج.png",
  },
];

export const MEMBER_LISTS = [
  {
    id: "m1",
    title: "Books That Destroyed Me (Emotionally)",
    curator: "mira_reads",
    avatar: "/images/reviewer-1.jpg",
    votes: 2843,
    bookCount: 42,
    covers: ["/books/شطرنج.png", "/books/شطرنج.png", "/books/شطرنج.png"],
    rank: 1,
  },
  {
    id: "m2",
    title: "The Ultimate Fantasy Starter Pack — Curated for New Readers",
    curator: "literarylens",
    avatar: "/images/reviewer-2.jpg",
    votes: 1920,
    bookCount: 15,
    covers: ["/books/شطرنج.png", "/books/شطرنج.png", "/books/شطرنج.png"],
    rank: 3,
  },
  {
    id: "m3",
    title: "Slow Burn Romances That Made Me Lose Sleep",
    curator: "page_turner_k",
    avatar: "/images/reviewer-3.jpg",
    votes: 1455,
    bookCount: 28,
    covers: ["/books/شطرنج.png", "/books/شطرنج.png", "/books/شطرنج.png"],
    rank: 2,
  },
  {
    id: "m4",
    title: "If You Loved Game of Thrones, Read These Next",
    curator: "bookworm_91",
    avatar: "/images/reviewer-1.jpg",
    votes: 1102,
    bookCount: 20,
    covers: ["/books/شطرنج.png", "/books/شطرنج.png", "/books/شطرنج.png"],
    rank: 7,
  },
  {
    id: "m5",
    title: "Books With Morally Grey Characters Done Right",
    curator: "the.shelf.life",
    avatar: "/images/reviewer-3.jpg",
    votes: 988,
    bookCount: 35,
    covers: ["/books/شطرنج.png", "/books/شطرنج.png", "/books/شطرنج.png"],
    rank: 4,
  },
  {
    id: "m6",
    title: "Debut Novels That Should Have Won Every Award",
    curator: "mira_reads",
    avatar: "/images/reviewer-1.jpg",
    votes: 761,
    bookCount: 12,
    covers: ["/books/شطرنج.png", "/books/شطرنج.png", "/books/شطرنج.png"],
    rank: 1,
  },
];
