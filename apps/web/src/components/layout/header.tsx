"use client";

import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  Book,
  Bookmark,
  BookMarked,
  BookOpen,
  Clock,
  Library,
  ListChecks,
  Menu,
  Search,
  UserCircle,
  Users,
} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,} from "@/components/ui/sheet";
import {cn} from "@/lib/utils";
import {ThemeToggle} from "../theme-toggle";

const browseItems = [
    {
        title: "نشاط القراءة",
        href: "/activity",
        description: "تتبع تقدمك وسجل قراءاتك",
        icon: Clock,
    },
    {
        title: "الأصدقاء",
        href: "/friends",
        description: "شاهد ما يقرأه أصدقاؤك",
        icon: Users,
    },
    {
        title: "الإحصائيات",
        href: "/statistics",
        description: "تحليلات عن عادات القراءة",
        icon: BarChart3,
    },
    {
        title: "قوائم القراءة",
        href: "/reading-lists",
        description: "قوائمك المحفوظة والمفضلة",
        icon: ListChecks,
    },
];
const discoverItems = [
    {
        title: "الكتب",
        href: "/discover/books",
        description: "اكتشف كتب جديدة والأكثر مبيعاً",
        icon: Book,
    },
    {
        title: "المؤلفون",
        href: "/discover/authors",
        description: "ابحث عن مؤلفيك المفضلين",
        icon: UserCircle,
    },
    {
        title: "القراء",
        href: "/discover/readers",
        description: "تواصل مع محبي الكتب",
        icon: Users,
    },
    {
        title: "القوائم المنسقة",
        href: "/discover/lists",
        description: "قوائم قراءة وتوصيات مختارة",
        icon: Bookmark,
    },
];
const ListItem = React.forwardRef<
    React.ComponentRef<"a">,
    React.ComponentPropsWithoutRef<"a"> & {
    icon?: React.ComponentType<{ className?: string }>;
    position?: "row" | "column";
}
>(({className, title, children, icon: Icon, position, ...props}, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "group flex select-none items-center gap-3 rounded-lg p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
                        className,
                        position === "row" ? "flex-row" : "flex-col"
                    )}
                    {...props}
                >
                    {Icon && (
                        <div
                            className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
                            <Icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary"/>
                        </div>
                    )}
                    <div className="flex-1 space-y-0.5">
                        <div className="text-sm font-medium">{title}</div>
                        <p className="line-clamp-1 text-xs text-muted-foreground">
                            {children}
                        </p>
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

function MobileNav() {
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="size-9 md:hidden">
                    <Menu className="size-5"/>
                    <span className="sr-only">القائمة</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side="right"
                className="w-96 px-4 overflow-y-scroll"
                dir="rtl"
            >
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2.5 text-right">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                            <BookOpen className="size-4 text-primary-foreground"/>
                        </div>
                        <span>مكتبتي</span>
                    </SheetTitle>
                </SheetHeader>
                <div className="mb-4 flex flex-col gap-6">
                    {/* My Library - Featured */}
                    <Link
                        href="/library"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl bg-primary/5 p-4 transition-colors hover:bg-primary/10"
                    >
                        <div className="flex size-11 items-center justify-center rounded-xl bg-primary">
                            <Library className="size-5 text-primary-foreground"/>
                        </div>
                        <div>
                            <div className="font-semibold">مكتبتي</div>
                            <div className="text-xs text-muted-foreground">
                                إدارة مجموعة كتبك
                            </div>
                        </div>
                    </Link>

                    <div className="flex flex-col gap-1.5">
            <span className="mb-1 px-2 text-xs font-medium text-muted-foreground">
              تصفح
            </span>
                        {browseItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-accent"
                            >
                                <item.icon className="size-4 text-muted-foreground"/>
                                {item.title}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-1.5">
            <span className="mb-1 px-2 text-xs font-medium text-muted-foreground">
              اكتشف
            </span>
                        {discoverItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-accent"
                            >
                                <item.icon className="size-4 text-muted-foreground"/>
                                {item.title}
                            </Link>
                        ))}
                        {/*<Link*/}
                        {/*    href="/awards/2025"*/}
                        {/*    onClick={() => setOpen(false)}*/}
                        {/*    className="flex items-center gap-3 rounded-lg bg-amber-500/10 px-2 py-2.5 text-sm text-amber-600 transition-colors hover:bg-amber-500/20 dark:text-amber-400"*/}
                        {/*>*/}
                        {/*    <Award className="size-4"/>*/}
                        {/*    جوائز 2025*/}
                        {/*</Link>*/}
                    </div>

                    <div className="mt-auto flex flex-col gap-2 border-t pt-6">
                        <Button variant="outline" className="w-full bg-transparent" asChild>
                            <Link href="/login">تسجيل الدخول</Link>
                        </Button>
                        <Button className="w-full" asChild>
                            <Link href="/signup">إنشاء حساب</Link>
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function Header() {
    return (
        <header
            className="sticky top-2 px-2 z-50 w-[calc(100%-32px)] max-w-6xl mx-auto border rounded-md bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex h-12 items-center justify-between gap-4">
            {/* Right: Logo + Nav (RTL) */}
            <div className="flex items-center gap-2 lg:gap-4">
                <MobileNav/>

                <Link href="/" className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
                        <BookOpen className="size-4 text-primary-foreground"/>
                    </div>
                    <span className="hidden text-lg font-bold tracking-tight sm:inline-block">
              مكتبتي
            </span>
                </Link>

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden md:flex">
                    <NavigationMenuList className="gap-1">
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="gap-1 bg-transparent px-3">
                                تصفح
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="grid w-[400px] grid-cols-[0.8fr_1fr] gap-0">
                                    {/* Featured: My Library */}
                                    <div className="p-2">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/library"
                                                className="group flex h-full flex-col justify-between rounded-xl bg-linear-to-b from-primary/10 to-primary/5 p-4 transition-colors hover:from-primary/15 hover:to-primary/10"
                                            >
                                                <div
                                                    className="flex size-12 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:scale-105">
                                                    <Library className="size-6 text-primary-foreground"/>
                                                </div>
                                                <div className="mt-4 space-y-1">
                                                    <div className="text-base font-semibold">
                                                        مكتبتي
                                                    </div>
                                                    <p className="text-xs leading-relaxed text-muted-foreground">
                                                        عرض وإدارة مجموعة كتبك الشخصية
                                                    </p>
                                                </div>
                                                <div
                                                    className="mt-3 flex items-center gap-1.5 text-xs font-medium text-primary">
                                                    <span>فتح المكتبة</span>
                                                    <BookMarked className="size-3"/>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </div>
                                    {/* Other browse items */}
                                    <ul className="flex flex-col gap-0.5 p-1">
                                        {browseItems.map((item) => (
                                            <ListItem
                                                key={item.href}
                                                title={item.title}
                                                href={item.href}
                                                icon={item.icon}
                                                position={"row"}
                                            >
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className="h-9 gap-1.5 bg-transparent px-3">
                                اكتشف
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="w-[300px]">
                                    <ul className="grid grid-cols-1 gap-0.5">
                                        {discoverItems.map((item) => (
                                            <ListItem
                                                key={item.href}
                                                title={item.title}
                                                href={item.href}
                                                icon={item.icon}
                                                position="row"
                                            >
                                                {item.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                    {/* Awards Section */}
                                    {/*      <div className="mt-2 border-t pt-2">*/}
                                    {/*          <div className="flex items-center gap-2">*/}
                                    {/*              /!* 2025 Awards - Featured *!/*/}
                                    {/*              <Link*/}
                                    {/*                  href="/awards/2025"*/}
                                    {/*                  className="flex flex-1 items-center gap-3 rounded-lg bg-linear-to-l from-amber-500/10 to-orange-500/10 p-3 transition-colors hover:from-amber-500/20 hover:to-orange-500/20"*/}
                                    {/*              >*/}
                                    {/*                  <div*/}
                                    {/*                      className="flex size-10 items-center justify-center rounded-lg bg-linear-to-br from-amber-500 to-orange-500 shadow-sm">*/}
                                    {/*                      <Trophy className="size-5 text-white"/>*/}
                                    {/*                  </div>*/}
                                    {/*                  <div>*/}
                                    {/*                      <div className="flex items-center gap-2">*/}
                                    {/*<span className="font-semibold text-amber-700 dark:text-amber-400">*/}
                                    {/*  جوائز 2025*/}
                                    {/*</span>*/}
                                    {/*                          <span*/}
                                    {/*                              className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-600 dark:text-amber-400">*/}
                                    {/*  جديد*/}
                                    {/*</span>*/}
                                    {/*                      </div>*/}
                                    {/*                      <p className="text-xs text-muted-foreground">*/}
                                    {/*                          أفضل كتب العام*/}
                                    {/*                      </p>*/}
                                    {/*                  </div>*/}
                                    {/*              </Link>*/}
                                    {/*          </div>*/}
                                    {/*      </div>*/}
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="outline"
                    className="hidden h-9 gap-2 pl-2 pr-3 text-muted-foreground lg:flex"
                >
                    <Search className="size-4"/>
                    <span className="text-sm">بحث...</span>
                    <kbd
                        className="pointer-events-none mr-2 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                        K<span className="text-xs">⌘</span>
                    </kbd>
                </Button>
                <Button variant="ghost" size="icon" className="size-9 lg:hidden">
                    <Search className="size-[18px]"/>
                    <span className="sr-only">بحث</span>
                </Button>

                <ThemeToggle/>

                <div className="hidden items-center gap-1.5 border-r pr-2 mr-1 sm:flex">
                    <Button variant="ghost" size="sm" className="h-9 px-3" asChild>
                        <Link href="/login">تسجيل الدخول</Link>
                    </Button>
                    <Button size="sm" className="h-9 px-4" asChild>
                        <Link href="/signup">إنشاء حساب</Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default Header;
