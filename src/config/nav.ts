import {
  BooksIcon,
  BuildingsIcon,
  ChatCircleIcon,
  ClockIcon,
  type Icon,
  SparkleIcon,
  UserCircleIcon,
  UsersIcon,
} from "@phosphor-icons/react";

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: Icon;
  disabled?: boolean;
};

// export const libraryItems: NavItem[] = [
//   {
//     title: "مكتبتي",
//     href: "/library",
//     description: "كتبك، حالات القراءة، والتنظيم",
//     icon: BooksIcon,
//   },
//   {
//     title: "قوائم القراءة",
//     href: "/lists",
//     description: "قوائمك المخصصة والمحفوظة",
//     icon: CheckIcon,
//     disabled: true, // coming soon
//   },
//   {
//     title: "الإحصائيات",
//     href: "/stats",
//     description: "تحليل عاداتك القرائية",
//     icon: ChartLineIcon,
//     disabled: true, // coming soon
//   },
// ];

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
    title: "التوصيات",
    href: "/discover/recommendations",
    description: "اقتراحات مخصصة لك",
    icon: SparkleIcon,
    disabled: true, // after MVP
  },
];

export const communityItems: NavItem[] = [
  {
    title: "الأصدقاء",
    href: "/friends",
    description: "تابع نشاط أصدقائك",
    icon: UsersIcon,
    disabled: true, // coming soon
  },
  {
    title: "التحديثات",
    href: "/feed",
    description: "آخر المراجعات والتقييمات",
    icon: ClockIcon,
    disabled: true, // coming soon
  },
  {
    title: "المراجعات",
    href: "/reviews",
    description: "آراء القراء حول الكتب",
    icon: ChatCircleIcon,
    disabled: true, // coming soon
  },
];
