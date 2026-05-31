import {
  BooksIcon,
  BuildingsIcon,
  ChatCircleIcon,
  ClockIcon,
  FireIcon,
  type Icon,
  ListBulletsIcon,
  StarIcon,
  TrophyIcon,
  UserCircleIcon,
  UsersIcon,
} from "@phosphor-icons/react";

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: Icon;
  disabled?: boolean;
  badge?: string; // e.g. "جديد", "قريباً"
};

export const discoverItems: NavItem[] = [
  {
    title: "الكتب",
    href: "/discover/books",
    description: "استكشف الكتب عبر التصنيفات والتقييمات",
    icon: BooksIcon,
  },
  {
    title: "المؤلفون",
    href: "/discover/authors",
    description: "اكتشف المؤلفين وأعمالهم",
    icon: UserCircleIcon,
  },
  {
    title: "دور النشر",
    href: "/discover/publishers",
    description: "استعرض دور النشر وتاريخها",
    icon: BuildingsIcon,
  },
  {
    title: "القوائم",
    href: "/lists",
    description: "قوائم القراءة المنتقاة من المجتمع",
    icon: ListBulletsIcon,
    disabled: true,
  },
  {
    title: "الجوائز",
    href: "/awards-2026",
    description: "أفضل الكتب لعام 2026 بالتصويت الشعبي",
    icon: TrophyIcon,
    disabled: true,
    badge: "2026",
  },
];

export const communityItems: NavItem[] = [
  {
    title: "التحديات",
    href: "/challenges",
    description: "تحديات القراءة الشهرية والسنوية",
    icon: FireIcon,
    disabled: true,
    badge: "جديد",
  },
  {
    title: "الأصدقاء",
    href: "/friends",
    description: "تابع نشاط أصدقائك القراء",
    icon: UsersIcon,
    disabled: true,
  },
  {
    title: "التحديثات",
    href: "/feed",
    description: "آخر المراجعات والتقييمات",
    icon: ClockIcon,
    disabled: true,
  },
  {
    title: "المراجعات",
    href: "/reviews",
    description: "آراء القراء حول الكتب",
    icon: ChatCircleIcon,
    disabled: true,
  },
  {
    title: "لوحة الصدارة",
    href: "/leaderboard",
    description: "أكثر القراء نشاطاً هذا الشهر",
    icon: StarIcon,
    disabled: true,
  },
];
