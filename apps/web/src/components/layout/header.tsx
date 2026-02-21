"use client";

import {
  AllBookmarkIcon,
  ArrowLeft01Icon,
  Book03Icon,
  Chart03Icon,
  CheckListIcon,
  Clock01Icon,
  LibraryIcon,
  Menu01Icon,
  UserCircleIcon,
  UserGroupIcon,
  UserIcon,
  UserMultiple02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme-toggle";
import { createClient } from "@/utils/supabase/client";

const browseItems = [
  {
    title: "نشاط القراءة",
    href: "/activity",
    description: "تتبع تقدمك وسجل قراءاتك",
    icon: Clock01Icon,
  },
  {
    title: "الأصدقاء",
    href: "/friends",
    description: "شاهد ما يقرأه أصدقاؤك",
    icon: UserMultiple02Icon,
  },
  {
    title: "الإحصائيات",
    href: "/statistics",
    description: "تحليلات عن عادات القراءة",
    icon: Chart03Icon,
  },
  {
    title: "قوائم القراءة",
    href: "/reading-lists",
    description: "قوائمك المحفوظة والمفضلة",
    icon: CheckListIcon,
  },
];
const discoverItems = [
  {
    title: "الكتب",
    href: "/discover/books",
    description: "اكتشف كتب جديدة والأكثر مبيعاً",
    icon: Book03Icon,
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
    icon: UserGroupIcon,
  },
  {
    title: "القوائم المنسقة",
    href: "/discover/lists",
    description: "قوائم قراءة وتوصيات مختارة",
    icon: AllBookmarkIcon,
  },
];
const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: IconSvgElement;
    position?: "row" | "column";
  }
>(({ className, title, children, icon, position, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group flex select-none items-center gap-3 rounded-lg p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
            className,
            position === "row" ? "flex-row" : "flex-col",
          )}
          {...props}
        >
          {icon && (
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
              <HugeiconsIcon
                icon={icon}
                className="size-4 text-muted-foreground transition-colors group-hover:text-primary"
              />
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
          <HugeiconsIcon icon={Menu01Icon} className="size-8" />
          <span className="sr-only">القائمة</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="max-w-screen w-80 px-4 overflow-y-scroll rounded-r-4xl"
        dir="rtl"
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2.5 text-right">
            معلومات الحساب
          </SheetTitle>
        </SheetHeader>
        <div className="mb-4 flex flex-col gap-6 h-full">
          {/* My Library - Featured */}
          {/*<Link
            href="/library"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl bg-primary/5 p-4 transition-colors hover:bg-primary/10"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-primary">
              <Library className="size-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold">مكتبتي</div>
              <div className="text-xs text-muted-foreground">
                إدارة مجموعة كتبك
              </div>
            </div>
          </Link>*/}

          <div className="flex flex-col gap-1.5">
            <span className="mb-1 px-2 text-xs font-semibold text-muted-foreground">
              تصفح
            </span>
            {browseItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-base transition-colors hover:bg-accent"
              >
                <HugeiconsIcon
                  icon={item.icon}
                  className="size-5 text-muted-foreground"
                />
                {item.title}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="mb-1 px-2 text-xs font-semibold text-muted-foreground">
              اكتشف
            </span>
            {discoverItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-base transition-colors hover:bg-accent"
              >
                <HugeiconsIcon
                  icon={item.icon}
                  className="size-5 text-muted-foreground"
                />
                {item.title}
              </Link>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-1 border-t pt-3">
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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutUser } from "@/actions/auth";
import type { User } from "@supabase/supabase-js";

function Header({ user: initialUser }: { user: User | null }) {
  const [user, setUser] = React.useState<User | null>(initialUser);

  React.useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <header className="fixed top-2 px-2 z-50 w-[calc(100%-32px)] left-1/2 -translate-x-1/2 max-w-6xl mx-auto border rounded-xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex h-12 items-center justify-between gap-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="size-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight inline-block">
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
                        className="group flex h-full flex-col justify-between rounded-xl bg-linear-to-b from-primary/10 to-primary/5 p-4 transition-colors hover:bg-primary/10 group"
                      >
                        <div className="flex size-12 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:scale-105">
                          <HugeiconsIcon
                            icon={LibraryIcon}
                            className="size-6 text-primary-foreground"
                          />
                        </div>
                        <div className="mt-4 space-y-1">
                          <div className="text-base font-semibold">مكتبتي</div>
                          <p className="text-xs leading-relaxed text-muted-foreground">
                            عرض وإدارة مجموعة كتبك الشخصية
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-0.5 group-hover:gap-1 duration-200 text-xs font-medium text-primary">
                          <span>الذهاب للمكتبة</span>
                          <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            className="text-primary"
                          />
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
        <ThemeToggle />

        <Button
          variant="outline"
          className="hidden h-9 gap-2 pl-2 pr-3 text-muted-foreground lg:flex"
        >
          <Search className="size-4" />
          <span className="text-sm">بحث...</span>
          <kbd className="pointer-events-none mr-2 rounded-full hidden h-5 select-none items-center gap-0.5 border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            K<span className="text-xs">⌘</span>
          </kbd>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="size-9 hidden sm:flex lg:hidden"
        >
          <Search className="size-[18px]" />
          <span className="sr-only">بحث</span>
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <HugeiconsIcon icon={UserIcon} className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user_metadata.full_name || "مستخدم"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/u/${user.user_metadata.full_name}`} className="w-full">
                  الملف الشخصي
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/settings" className="w-full">
                  الإعدادات
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                تسجيل الخروج
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="hidden items-center gap-1.5 sm:flex">
            <Button size="default" className="h-9 px-4" asChild>
              <Link href="/login">تسجيل الدخول</Link>
            </Button>
          </div>
        )}

        <MobileNav />
      </div>
    </header>
  );
}

export default Header;
