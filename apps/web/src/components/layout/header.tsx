"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { useRouter } from "next/navigation";
import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
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
import { createClient } from "@/utils/supabase/client";
import { ThemeToggle } from "../theme-toggle";
import type { User } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/user-context";

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

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, loading } = useUser();
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  const handleLogout = async () => {
    setIsOpen(false);
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header
      className={cn(
        "fixed px-4 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 gap-4",
        // "top-2 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-6xl border rounded-xl",
        "border-b w-full",
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-14">
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
          <NavigationMenu dir="rtl" align="center" className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {/* ========== Browse ========== */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>تصفح</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="grid w-[400px] grid-cols-[0.8fr_1fr] gap-1">
                    {/* Featured */}
                    <div>
                      <NavigationMenuLink
                        render={
                          <Link
                            href="/library"
                            className="group flex h-full flex-col justify-between rounded-xl bg-linear-to-b from-primary/10 to-primary/5 p-4 transition-colors hover:bg-primary/10"
                          >
                            <div className="flex size-12 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:scale-105">
                              <HugeiconsIcon
                                icon={LibraryIcon}
                                className="size-8 text-primary-foreground"
                              />
                            </div>

                            <div className="mt-4 space-y-1">
                              <div className="text-base font-semibold">
                                مكتبتي
                              </div>
                              <p className="text-xs leading-relaxed text-muted-foreground">
                                عرض وإدارة مجموعة كتبك الشخصية
                              </p>
                            </div>

                            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                              <span>الذهاب للمكتبة</span>
                              <HugeiconsIcon icon={ArrowLeft01Icon} />
                            </div>
                          </Link>
                        }
                      />
                    </div>

                    {/* List */}
                    <ul className="flex flex-col gap-0.5 p-1">
                      {browseItems.map((item) => (
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
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* ========== Discover ========== */}
              <NavigationMenuItem>
                <NavigationMenuTrigger>اكتشف</NavigationMenuTrigger>

                <NavigationMenuContent>
                  <div className="w-[300px]">
                    <ul className="grid gap-0.5">
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
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>

            {/* ===== Positioner (ONE TIME ONLY) ===== */}
            <NavigationMenuPositioner
              side="bottom"
              align="center"
              sideOffset={5}
              style={
                {
                  ["--popup-width"]: "max-content",
                  ["--popup-height"]: "auto",
                  ["--available-width"]: "100vw",
                  ["--transform-origin"]: "top center",
                } as React.CSSProperties
              }
            />
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

          {user && !loading ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" size="icon-lg">
                    <HugeiconsIcon icon={UserIcon} className="size-6" />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-42" align="end">
                <DropdownMenuGroup className={"p-0"}>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-2">
                      <p className="text-sm font-medium leading-none">الأسم</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={
                      <Link href={`/u/${user.id}`} className="w-full">
                        الملف الشخصي
                      </Link>
                    }
                  />
                  <DropdownMenuItem
                    render={
                      <Link href="/settings" className="w-full">
                        الإعدادات
                      </Link>
                    }
                  />
                </DropdownMenuGroup>
                <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                  <AlertDialogTrigger
                    className={cn(
                      "w-full justify-start! hover:bg-destructive/10! hover:text-destructive!",
                      buttonVariants({ variant: "ghost" }),
                    )}
                  >
                    تسجيل الخروج
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        هل أنت متأكد من تسجيل الخروج؟
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        سيتم إنهاء جلستك الحالية، وستحتاج إلى إدخال بياناتك مرة
                        أخرى للوصول إلى حسابك.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className={buttonVariants({ variant: "destructive" })}
                      >
                        تسجيل الخروج
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden items-center gap-1.5 sm:flex">
              <Link href="/login" className={cn("h-9 px-4", buttonVariants())}>
                تسجيل الدخول
              </Link>
            </div>
          )}

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="size-9 md:hidden">
            <HugeiconsIcon icon={Menu01Icon} className="size-8" />
            <span className="sr-only">القائمة</span>
          </Button>
        }
      />
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
            <Link
              href="/login"
              className={cn(
                "w-full bg-transparent",
                buttonVariants({ variant: "outline" }),
              )}
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/signup"
              className={cn("w-full", buttonVariants({ variant: "default" }))}
            >
              إنشاء حساب
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    icon?: IconSvgElement;
    position?: "row" | "column";
  }
>(({ className, title, children, icon, position, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink
        render={
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
        }
      />
    </li>
  );
});
ListItem.displayName = "ListItem";
