import { Book as BaseBook } from "@/components/book/book-card";

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

export interface Author {
  id: string;
  name: string;
  image: string;
  location: string;
  bio: string;
  stats: { label: string; value: string }[];
  tags: string[];
  books: { title: string; year: number; cover: string }[];
}

export interface BookDetail extends BaseBook {
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

export const BOOKS: BookDetail[] = [
  {
    id: "1",
    title: "وليدو الضباب: الإمبراطورية النهائية",
    author: "براندون ساندرسون",
    cover: "/books/وليدو الضباب.png",
    rating: 4.8,
    ratingCount: "124k+",
    genre: "فانتازيا ملحمية",
    pages: 647,
    year: 2024,
    description:
      "بداية ملحمة الرماد والسحر؛ صراع اللصوص ضد الطاغية الخالد في عالم تُحكمه المعادن.",
    badge: "🔥 الأكثر رواجاً",
    series: "الجزء الأول من سلسلة وليدو الضباب",
    badges: ["اختيار المحررين", "فانتازيا ملحمية", "#1 في الفانتازيا العالمية"],
    ratingTotal: 124870,
    reviewCountTotal: 28430,
    ratingCounts: [
      { stars: 5, pct: 68 },
      { stars: 4, pct: 20 },
      { stars: 3, pct: 8 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 1 },
    ],
    meta: [
      { label: "الصفحات", value: "647" },
      { label: "النشر", value: "2024" },
      { label: "الناشر", value: "دار كيان" },
      { label: "الترجمة", value: "محمود عاطف" },
    ],
    descriptionTags: [
      "الألومنسي",
      "ثورة ضد الإمبراطورية",
      "عصابة السرقة",
      "اللورد الحاكم",
      "عالم مغطى بالرماد",
      "فانتازيا ملحمية",
      "نظام سحر مبتكر",
    ],
    descriptionParagraphs: [
      `في عالم يغطي الرماد كل شيء منذ ألف عام، يحكم اللورد الحاكم بقبضة حديدية، محولاً السكا إلى عبيد تحت خوف دائم. لكن شرارة أمل تشتعل عندما يكتشف كيلسير — أسطورة حية — قوى وليدي الضباب، ويجمع فريقًا لتحقيق المستحيل: سرقة الإمبراطورية نفسها.`,
      `فين — فتاة شوارع قاسية الحياة — تُجبر على الانضمام إلى الخطة الجريئة. تمتلك قدرة نادرة على حرق المعادن داخل جسمها لتكتسب قوى خارقة: دفع المعادن، جذبها، تعزيز الحواس، أو حتى التأثير على العواطف. لكن استخدام هذه القوى يأتي بثمن، والخيانة تتربص في كل زاوية.`,
      `بينما يخطط الفريق لاقتحام قصر اللورد الحاكم، تكتشف فين أسرارًا عن ماضيها وعن العالم الذي يُعتقد أنه لا يمكن تغييره. هل يمكن لمجموعة من المنبوذين قلب نظام دام ألف سنة؟ أم أن الإمبراطورية النهائية حقًا لا تُقهر؟`,
      `رواية براندون ساندرسون الشهيرة تقدم نظام سحر منطقيًا ومبتكرًا، شخصيات عميقة، ومكائد سياسية مشوقة. «وليدو الضباب: الإمبراطورية النهائية» هي بداية ملحمة غيرت وجه الفانتازيا الحديثة، وألهمت ملايين القراء حول العالم.`,
      `ترجمة عربية مميزة تجعل العالم الرمادي والمغامرة الملحمية تتنفس بالعربية، مع تفاصيل تجعلك تشعر بثقل الرماد وإثارة حرق المعادن.`,
    ],
    authorDetails: {
      id: "brandon-sanderson",
      name: "براندون ساندرسون",
      image: "/sanderson.png",
      location: "روائي فانتازيا أمريكي · يوتا، الولايات المتحدة",
      bio: `براندون ساندرسون هو أحد أبرز كتاب الفانتازيا المعاصرين، مبتكر عالم "الكوزمير" الضخم. اشتهر بنظم سحر منطقية ومفصلة، شخصيات عميقة، وقصص ملحمية مليئة بالمفاجآت. روايته "وليدو الضباب: الإمبراطورية النهائية" أحدثت ثورة في النوع، وبيعت ملايين النسخ حول العالم. يُعرف بإنتاجه الغزير وجودة كتاباته المتسقة.`,
      stats: [
        { label: "متابع", value: "1.2 مليون" },
        { label: "كتب", value: "35+" },
        { label: "متوسط التقييم", value: "4.4" },
      ],
      tags: ["فانتازيا ملحمية", "عالم الكوزمير", "نظم سحر مبتكرة"],
      books: [
        {
          title: "وليدو الضباب: الإمبراطورية النهائية",
          year: 2024,
          cover: "/books/وليدو الضباب.png",
        },
        { title: "طريق الملوك", year: 2023, cover: "/book.png" },
        { title: "إلانتريس", year: 2022, cover: "/book.png" },
      ],
    },
    sidebarDetails: [
      { label: "العنوان الأصلي", value: "Mistborn: The Final Empire" },
      { label: "تاريخ النشر (العربية)", value: "2024" },
      { label: "الناشر", value: "دار كيان للنشر والتوزيع" },
      { label: "الترجمة", value: "محمود عاطف" },
      { label: "الصفحات", value: "1008 صفحة" },
      { label: "النوع", value: "غلاف ورقي" },
      { label: "الطبعة", value: "الطبعة الأولى (عربية)" },
      { label: "ISBN-13", value: "978-977-820-173-4" },
      { label: "اللغة", value: "العربية" },
      { label: "السلسلة", value: "وليدو الضباب، الجزء الأول" },
    ],
    otherEditions: [
      {
        format: "غلاف ورقي (إنجليزي)",
        detail: "2007 · 647 صفحة (Tor mass market)",
        publisher: "Tor Books",
      },
      {
        format: "كتاب إلكتروني",
        detail: "متوفر · Kindle",
        publisher: "Tor Books / Amazon",
      },
      {
        format: "كتاب صوتي",
        detail: "متوفر · ~22 ساعة 40 دقيقة",
        publisher: "Audible / Macmillan Audio",
      },
      {
        format: "طباعة كبيرة",
        detail: "متوفر · أكثر من 700 صفحة",
        publisher: "Thorndike Press",
      },
    ],
    reviews: [
      {
        id: "1",
        name: "أمارا نووسو",
        avatar: "/images/reviewer-1.jpg",
        rating: 5,
        date: "15 نوفمبر 2025",
        title: "نظام سحر يغير قواعد الفانتازيا",
        body: "لم أقرأ من قبل نظام سحر بهذه الدقة والمنطقية! حرق المعادن، الألومنسي، كل شيء مبني بعناية تجعلك تشعر أنك تتعلم قواعد حقيقية. فين شخصية مذهلة — قاسية، ذكية، وتتطور بشكل مؤثر. والعالم المغطى بالرماد يبقى في ذهنك طويلاً. كيلسير أسطورة! أكثر من 600 صفحة مرت كأنها ساعات قليلة. إذا كنت تحب الفانتازيا الذكية، ابدأ بهذا الكتاب فورًا.",
        likes: 1247,
        shelf: "قرأتُه",
        verified: true,
      },
      {
        id: "2",
        name: "أوليفر برنشتاين",
        avatar: "/images/reviewer-2.jpg",
        rating: 4.5,
        date: "8 ديسمبر 2025",
        title: "عصابة سرقة ملحمية مع توتر مذهل",
        body: "البداية بطيئة قليلاً لبناء العالم، لكن بمجرد أن يبدأ التخطيط للضربة الكبرى ضد اللورد الحاكم، يصبح الكتاب لا يُقاوم. الفريق (كيلسير، فين، الجميع) لديهم كيمياء رائعة — مزيج من الفكاهة، الخيانة المحتملة، والأمل. النهاية صدمتني تمامًا. ترجمة محمود عاطف ممتازة، تجعل الرماد والضباب يشعران حقيقيين. أحد أفضل الروايات التي قرأتها هذا العام.",
        likes: 689,
        shelf: "قرأتُه",
        verified: true,
      },
      {
        id: "3",
        name: "دايسوكي موري",
        avatar: "/images/reviewer-3.jpg",
        rating: 5,
        date: "2 أكتوبر 2025",
        title: "ثورة ضد الإمبراطورية الخالدة — تحفة!",
        body: "براندون ساندرسون يثبت لماذا هو أحد أعظم كتاب الفانتازيا الحديثة. عالم دام ألف سنة تحت حكم طاغية خالد، ثم تأتي فتاة شوارع لتقلب كل شيء. المكائد، الخطط، الخيانات، والكشوفات — كل شيء متقن. النهاية جعلتني أصرخ من الدهشة! إذا أردت فانتازيا مع نظام سحر مبتكر، شخصيات لا تُنسى، ورهانات عالية — هذا الكتاب سيغير توقعاتك.",
        likes: 1582,
        shelf: "مفضّل",
        verified: true,
      },
      {
        id: "4",
        name: "أمارا نووسو",
        avatar: "/images/reviewer-1.jpg",
        rating: 1,
        date: "15 نوفمبر 2025",
        title: "نظام سحر يغير قواعد الفانتازيا",
        body: "لم أقرأ من قبل نظام سحر بهذه الدقة والمنطقية! حرق المعادن، الألومنسي، كل شيء مبني بعناية تجعلك تشعر أنك تتعلم قواعد حقيقية. فين شخصية مذهلة — قاسية، ذكية، وتتطور بشكل مؤثر. والعالم المغطى بالرماد يبقى في ذهنك طويلاً. كيلسير أسطورة! أكثر من 600 صفحة مرت كأنها ساعات قليلة. إذا كنت تحب الفانتازيا الذكية، ابدأ بهذا الكتاب فورًا.",
        likes: 1247,
        shelf: "قرأتُه",
        verified: false,
      },
    ],
  },
  {
    id: "3",
    title: "البلاء الشديد والميلاد الجديد",
    author: "فايز الكندري",
    cover: "/books/البلاء الشديد.png",
    rating: 4.8,
    ratingCount: "45k+",
    genre: "فكر إسلامي / سيرة ذاتية",
    pages: 512,
    year: 2020,
    description:
      "مذكرات واقعية وملهمة تروي تفاصيل 14 عاماً قضاها المؤلف في سجن غوانتانامو، تجسد الصبر واليقين في وجه الابتلاء.",
  },
  {
    id: "4",
    title: "ذو البدلة البنية",
    author: "أغاثا كريستي",
    cover: "/books/ذو البدلة البنية.png",
    rating: 4.7,
    ratingCount: "60k+",
    genre: "غموض وجريمة",
    pages: 320,
    year: 2024,
    description:
      "مغامرة مثيرة تبدأ من محطة قطار لندن وتنتهي في جنوب أفريقيا بحثاً عن قاتل غامض وماسة مفقودة.",
  },
  {
    id: "6",
    title: "على ثرى دمشق",
    author: "أيمن أحمد الشربجي",
    cover: "/books/على ثرى دمشق.png",
    rating: 4.9,
    ratingCount: "40k+",
    genre: "تاريخ وسير",
    pages: 445,
    year: 2017,
    description:
      "مذكرات تاريخية توثق تفاصيل دقيقة ومرحلة مفصلية من الصراع وتاريخ العمل الإسلامي في دمشق خلال السبعينيات والثمانينيات.",
  },
  {
    id: "8",
    title: "أول مرة أتدبر فيها القرآن",
    author: "عادل محمد خليل",
    cover: "/books/أول مرة أتدبر القرآن.png",
    rating: 4.9,
    ratingCount: "110k+",
    genre: "علوم القرآن",
    pages: 280,
    year: 2025,
    description:
      "دليل عملي لفهم مقاصد السور والآيات لتعيش مع القرآن روحاً ومعنى.",
  },
  {
    id: "9",
    title: "أسئلة الثورة",
    author: "سلمان العودة",
    cover: "/books/أسئلة الثورة.png",
    rating: 4.5,
    ratingCount: "50k+",
    genre: "فكر واجتماع",
    pages: 240,
    year: 2024,
    description:
      "مراجعات فكرية حول مفاهيم التغيير، المجتمع، وقضايا النهضة والحرية والاستبداد.",
  },
  {
    id: "10",
    title: "أحجار على رقعة الشطرنج",
    author: "ويليام غاي كار",
    cover: "/books/شطرنج.png",
    rating: 4.4,
    ratingCount: "150k+",
    genre: "تاريخ ومؤامرة",
    pages: 320,
    year: 2025,
    description:
      "كتاب تاريخي يتحدث عن القوى الخفية والمؤامرات التي تدير الصراعات العالمية من وراء الستار.",
  },
  {
    id: "2",
    title: "نهج الملوك: أرشيف أضواء العاصفة",
    author: "براندون ساندرسون",
    cover: "/books/نهج الملوك.png",
    rating: 4.9,
    ratingCount: "120k+",
    genre: "فانتازيا عالية",
    pages: 1200,
    year: 2025,
    description:
      "عالم روشار الذي تضربه العواصف العاتية وصراع الفرسان لاستعادة مجدهم القديم.",
    badge: "⭐ الأكثر طلباً",
  },
  {
    id: "7",
    title: "فصول في العقيدة",
    author: "عبدالعزيز الطريفي",
    cover: "/books/فصول في العقيدة.png",
    rating: 4.8,
    ratingCount: "55k+",
    genre: "عقيدة",
    pages: 72,
    year: 2013,
    description:
      "رسالة علمية رصينة (تعرف بالرسالة الشامية) تؤصل لأبواب العقيدة الإسلامية بأسلوب واضح ومختصر يرسخ الإيمان.",
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
    cover: "/book.png",
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
    cover: "/book.png",
  },
];

export const OFFICIAL_LISTS = [
  {
    id: "l1",
    title: "أفضل روايات الفانتازيا لعام 2025",
    bookCount: 25,
    rank: 1,
    cover: "/book.png",
  },
  {
    id: "l2",
    title: "أساسيات الفانتازيا البداية — مجموعة فوليو",
    bookCount: 30,
    rank: 3,
    cover: "/book.png",
  },
  {
    id: "l3",
    title: "أفضل أنظمة سحر لا تُنسى",
    bookCount: 18,
    rank: 2,
    cover: "/book.png",
  },
  {
    id: "l4",
    title: "روايات السرقة والثورة في الفانتازيا",
    bookCount: 22,
    rank: 4,
    cover: "/book.png",
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
    covers: ["/book.png", "/book.png", "/book.png"],
    rank: 1,
  },
  {
    id: "m2",
    title: "The Ultimate Fantasy Starter Pack — Curated for New Readers",
    curator: "literarylens",
    avatar: "/images/reviewer-2.jpg",
    votes: 1920,
    bookCount: 15,
    covers: ["/book.png", "/book.png", "/book.png"],
    rank: 3,
  },
  {
    id: "m3",
    title: "Slow Burn Romances That Made Me Lose Sleep",
    curator: "page_turner_k",
    avatar: "/images/reviewer-3.jpg",
    votes: 1455,
    bookCount: 28,
    covers: ["/book.png", "/book.png", "/book.png"],
    rank: 2,
  },
  {
    id: "m4",
    title: "If You Loved Game of Thrones, Read These Next",
    curator: "bookworm_91",
    avatar: "/images/reviewer-1.jpg",
    votes: 1102,
    bookCount: 20,
    covers: ["/book.png", "/book.png", "/book.png"],
    rank: 7,
  },
  {
    id: "m5",
    title: "Books With Morally Grey Characters Done Right",
    curator: "the.shelf.life",
    avatar: "/images/reviewer-3.jpg",
    votes: 988,
    bookCount: 35,
    covers: ["/book.png", "/book.png", "/book.png"],
    rank: 4,
  },
  {
    id: "m6",
    title: "Debut Novels That Should Have Won Every Award",
    curator: "mira_reads",
    avatar: "/images/reviewer-1.jpg",
    votes: 761,
    bookCount: 12,
    covers: ["/book.png", "/book.png", "/book.png"],
    rank: 1,
  },
];
