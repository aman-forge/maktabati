import type { Icon } from "@phosphor-icons/react";
import {
  BookmarkIcon,
  BooksIcon,
  ChartLineIcon,
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
  UserIcon,
  UsersIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr";

export type NavItem = {
  title: string;
  href: string;
  description: string;
  icon: Icon;
};

export const browseItems: NavItem[] = [
  {
    title: "نشاط القراءة",
    href: "/activity",
    description: "تتبع تقدمك وسجل قراءاتك",
    icon: ClockIcon,
  },
  {
    title: "الأصدقاء",
    href: "/friends",
    description: "شاهد ما يقرأه أصدقاؤك",
    icon: UsersIcon,
  },
  {
    title: "الإحصائيات",
    href: "/statistics",
    description: "تحليلات عن عادات القراءة",
    icon: ChartLineIcon,
  },
  {
    title: "قوائم القراءة",
    href: "/reading-lists",
    description: "قوائمك المحفوظة والمفضلة",
    icon: CheckIcon,
  },
];

export const discoverItems: NavItem[] = [
  {
    title: "الكتب",
    href: "/discover/books",
    description: "اكتشف كتب جديدة والأكثر مبيعاً",
    icon: BooksIcon,
  },
  {
    title: "المؤلفون",
    href: "/discover/authors",
    description: "ابحث عن مؤلفيك المفضلين",
    icon: UserCircleIcon,
  },
  {
    title: "القراء",
    href: "/discover/readers",
    description: "تواصل مع محبي الكتب",
    icon: UsersThreeIcon,
  },
  {
    title: "القوائم المنسقة",
    href: "/discover/lists",
    description: "قوائم قراءة وتوصيات مختارة",
    icon: BookmarkIcon,
  },
];
