import type { BookType } from "@/features/books/server/get-books";

export interface RatingSummary {
  average: number;
  totalRatings: number;
  totalReviews: number;
  distribution: Array<{ stars: number; percent: number }>;
}

export interface BookReviewItem {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  shelf: string;
  title: string;
  body: string;
  likes: number;
  verified?: boolean;
}

export interface MemberListItem {
  id: string;
  title: string;
  curator: string;
  avatar: string;
  votes: number;
  bookCount: number;
  covers: string[];
  rank: number;
}

export interface FeaturedArticleItem {
  id: string;
  tag: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  cover: string;
}

export interface OfficialListItem {
  id: string;
  title: string;
  bookCount: number;
  rank: number;
  cover: string;
}

export interface BibliographicEdition {
  id: string;
  format: string;
  edition: string;
  publisher: string;
  publication: string;
  isbn?: string;
  isbn13?: string;
  language: string;
  translator?: string;
  pageCount?: number;
}

export interface BookPageMockData {
  ratingSummary: RatingSummary;
  reviews: BookReviewItem[];
  memberLists: MemberListItem[];
  featuredArticles: FeaturedArticleItem[];
  officialLists: OfficialListItem[];
  editions: BibliographicEdition[];
}

export function getBookPageMock(book: BookType): BookPageMockData {
  const cover = book.coverImageUrl ?? "/books/نهج الملوك.png";

  return {
    ratingSummary: {
      average: 4.3,
      totalRatings: 12458,
      totalReviews: 973,
      distribution: [
        { stars: 5, percent: 52 },
        { stars: 4, percent: 29 },
        { stars: 3, percent: 12 },
        { stars: 2, percent: 5 },
        { stars: 1, percent: 2 },
      ],
    },
    reviews: [
      {
        id: "review-1",
        name: "آية سالم",
        avatar: "/books/نهج الملوك.png",
        rating: 5,
        date: "2026-03-21",
        shelf: "قرأتُه",
        title: "واحدة من أجمل قراءاتي هذا العام",
        body: "السرد متماسك والشخصيات مكتوبة بعمق. الترجمة سلسة جدًا، والكتاب يحافظ على إيقاع ممتاز من البداية للنهاية.",
        likes: 87,
        verified: true,
      },
      {
        id: "review-2",
        name: "سلمان الحربي",
        avatar: "/books/نهج الملوك.png",
        rating: 4,
        date: "2026-02-08",
        shelf: "قرأتُه",
        title: "ممتع لكنه يحتاج صبرًا في البداية",
        body: "أول الفصول بطيئة نسبيًا، لكن بعد ذلك العالم يتوسع بشكل رائع. مناسب لمحبي الفانتازيا الطويلة.",
        likes: 51,
      },
      {
        id: "review-3",
        name: "ديمة خضر",
        avatar: "/books/نهج الملوك.png",
        rating: 4,
        date: "2026-01-14",
        shelf: "أقرأ الآن",
        title: "ترجمة ممتازة ومصطلحات موفقة",
        body: "أكثر ما أعجبني هو جودة التعريب وتناسق المصطلحات عبر الفصول. أتمنى فقط وجود هوامش أكثر لبعض الأسماء.",
        likes: 36,
        verified: true,
      },
    ],
    memberLists: [
      {
        id: "list-1",
        title: "أفضل روايات الفانتازيا المترجمة للعربية",
        curator: "hadeel_reads",
        avatar: "/books/نهج الملوك.png",
        votes: 1280,
        bookCount: 40,
        covers: [cover, "/books/نهج الملوك.png", "/books/نهج الملوك.png"],
        rank: 2,
      },
      {
        id: "list-2",
        title: "كتب طويلة تستحق كل صفحة",
        curator: "omar_library",
        avatar: "/books/نهج الملوك.png",
        votes: 842,
        bookCount: 25,
        covers: ["/books/نهج الملوك.png", cover, "/books/نهج الملوك.png"],
        rank: 5,
      },
      {
        id: "list-3",
        title: "ترشيحات نادي القراءة الشهري",
        curator: "bookclub_ar",
        avatar: "/books/نهج الملوك.png",
        votes: 603,
        bookCount: 18,
        covers: ["/books/نهج الملوك.png", "/books/نهج الملوك.png", cover],
        rank: 1,
      },
    ],
    featuredArticles: [
      {
        id: "article-1",
        tag: "تحليل",
        title: "كيف يعيد هذا العمل تعريف الفانتازيا الملحمية بالعربية",
        excerpt: "قراءة في البنية السردية والشخصيات الرئيسية وأثر الترجمة على تجربة القارئ العربي.",
        author: "فريق مكتباتي",
        date: "2026-04-02",
        readTime: "6 دقائق",
        cover,
      },
      {
        id: "article-2",
        tag: "دليل قراءة",
        title: "من أين تبدأ في السلسلة؟ ترتيب مقترح للمبتدئين",
        excerpt: "خط سير واضح لمن يريد دخول العالم لأول مرة بدون حرق للأحداث الرئيسية.",
        author: "دعاء رجب",
        date: "2026-03-11",
        readTime: "4 دقائق",
        cover: "/books/نهج الملوك.png",
      },
      {
        id: "article-3",
        tag: "مقارنة",
        title: "مقارنة بين النسخ العربية المختلفة: ماذا تختار؟",
        excerpt: "مقارنة سريعة بين الطبعات والترجمات المتاحة للقارئ العربي.",
        author: "محمد الجهني",
        date: "2026-02-05",
        readTime: "5 دقائق",
        cover: "/books/نهج الملوك.png",
      },
    ],
    officialLists: [
      {
        id: "official-1",
        title: "أفضل 100 رواية فانتازيا مترجمة",
        bookCount: 100,
        rank: 12,
        cover,
      },
      {
        id: "official-2",
        title: "أقوى بدايات سلاسل خيالية",
        bookCount: 30,
        rank: 4,
        cover: "/books/نهج الملوك.png",
      },
      {
        id: "official-3",
        title: "كتب نوصي بها لمحبي العالميات",
        bookCount: 60,
        rank: 16,
        cover: "/books/نهج الملوك.png",
      },
      {
        id: "official-4",
        title: "قراءات طويلة لعشاق التفاصيل",
        bookCount: 20,
        rank: 7,
        cover,
      },
    ],
    editions: [
      {
        id: "edition-1",
        format: "غلاف صلب",
        edition: "الطبعة العربية الأولى",
        publisher: book.publisher?.name ?? "دار نشر عربية",
        publication: book.publicationYear ? `سنة ${book.publicationYear}` : "2023",
        isbn: book.isbn ?? "978-1-2345-6789-0",
        isbn13: book.isbn13 ?? "9781234567890",
        language: "العربية",
        translator: book.translator ?? "غير مذكور",
        pageCount: book.pageCount ?? 560,
      },
      {
        id: "edition-2",
        format: "غلاف ورقي",
        edition: "الطبعة الثانية",
        publisher: book.publisher?.name ?? "دار نشر عربية",
        publication: "2024",
        isbn: "1-86197-876-9",
        isbn13: "9781861978769",
        language: "العربية",
        translator: book.translator ?? "غير مذكور",
        pageCount: book.pageCount ?? 560,
      },
    ],
  };
}
