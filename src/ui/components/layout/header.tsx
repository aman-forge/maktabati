import { ThemeToggle } from "@components/theme-toggle";
import { Badge } from "@components/ui/badge";
import { Button, buttonVariants } from "@components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import { communityItems, discoverItems, type NavItem } from "@config/nav";
import {
  BellIcon,
  BookOpenIcon,
  BooksIcon,
  CheckCircleIcon,
  FireIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  UserIcon,
  XCircleIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { type CSSProperties, useEffect, useMemo, useRef, useState } from "react";

import { UserMenu } from "@/features/auth/components/user-menu";
import { useUser } from "@/features/auth/use-user";
import { cn } from "@/ui/lib/utils";

import { Skeleton } from "../ui/skeleton";

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  unread?: boolean;
  type?: "review" | "friend" | "recommendation" | "achievement" | "challenge";
};

const notifications: NotificationItem[] = [
  {
    id: "1",
    title: "مراجعة جديدة على كتابك المفضل",
    description: "أضاف أحد القراء مراجعة جديدة إلى كتاب كنت تتابعه.",
    time: "قبل 5 دقائق",
    unread: true,
    type: "review",
  },
  {
    id: "2",
    title: "طلب صداقة جديد",
    description: "لديك طلب صداقة جديد من قارئ آخر.",
    time: "قبل ساعة",
    unread: true,
    type: "friend",
  },
  {
    id: "3",
    title: "أكملت تحدي القراءة الشهري 🎉",
    description: "رائع! لقد أتممت قراءة 3 كتب هذا الشهر.",
    time: "أمس",
    unread: false,
    type: "achievement",
  },
  {
    id: "4",
    title: "اقتراح قراءة جديد",
    description: "تمت إضافة توصية قد تعجبك بناءً على نشاطك الأخير.",
    time: "منذ يومين",
    unread: false,
    type: "recommendation",
  },
];

// Mock: replace with real data from your API/store
const currentlyReading = {
  title: "مئة عام من العزلة",
  author: "غابرييل غارسيا ماركيز",
  progress: 42, // percentage
  coverUrl: null, // replace with real cover URL
};

const readingStreak = 7; // days

function Header() {
  const { user, isLoggedIn, isLoading } = useUser();

  return (
    <header className="bg-background/95 supports-backdrop-filter:bg-background/80 fixed inset-x-0 top-0 z-50 hidden h-(--header-height) border-b backdrop-blur-2xl md:flex">
      <div className="mx-auto flex h-full w-full max-w-7xl items-center gap-4 px-4">
        {/* Left */}
        <div className="flex min-w-0 shrink-0 items-center gap-2 lg:gap-4">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img src="/logo.png" alt="logo" className="size-8 rounded-md" />
            <span className="inline-block text-lg font-bold tracking-tight">مكتبتي</span>
          </Link>

          {isLoggedIn && !isLoading && readingStreak > 0 && (
            <div
              title={`سلسلة قراءة: ${readingStreak} أيام متواصلة`}
              className="flex cursor-default flex-row items-center rounded-full border border-orange-200 bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-600 select-none dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-400"
            >
              <FireIcon className="size-3.5" weight="fill" />
              <span>{readingStreak}</span>
            </div>
          )}

          <DesktopNav isLoggedIn={isLoggedIn} />
        </div>

        {/* Center */}
        <div className="flex min-w-0 flex-1 justify-center px-2">
          <div className="w-full max-w-[18rem] min-w-0 md:max-w-88 lg:max-w-120 xl:max-w-xl">
            <SearchButton />
          </div>
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-1">
          {isLoggedIn && !isLoading && <CurrentlyReadingChip book={currentlyReading} />}
          <ThemeToggle />
          {isLoggedIn && !isLoading && <NotificationsMenu notifications={notifications} />}

          {isLoading ? (
            <Skeleton className="flex size-8 items-center justify-center border">
              <UserIcon className="size-4" />
            </Skeleton>
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                nativeButton={false}
                render={<Link to="/auth/$pathname" params={{ pathname: "login" }} />}
              >
                تسجيل الدخول
              </Button>
              <Button
                type="button"
                nativeButton={false}
                render={<Link to="/auth/$pathname" params={{ pathname: "register" }} />}
              >
                إنشاء حساب
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function SearchButton() {
  return (
    <Button
      variant="outline"
      type="button"
      className="text-muted-foreground h-9 w-full max-w-sm min-w-0 justify-between gap-2 px-3"
      aria-label="البحث في المنصة"
    >
      <div className="flex min-w-0 items-center gap-2">
        <MagnifyingGlassIcon className="size-4 shrink-0" />
        <span className="truncate text-sm">ابحث عن كتاب، مؤلف، أو قائمة...</span>
      </div>

      <kbd className="bg-muted pointer-events-none flex h-5 items-center gap-0.5 rounded-full border px-1.5 font-mono text-[10px] font-medium select-none">
        K<span className="relative top-px text-xs">⌘</span>
      </kbd>
    </Button>
  );
}

type CurrentlyReadingBook = {
  title: string;
  author: string;
  progress: number;
  coverUrl: string | null;
};

function CurrentlyReadingChip({ book }: { book: CurrentlyReadingBook }) {
  return (
    <Link
      to="/library"
      className={cn(
        "group hidden lg:flex items-center gap-2 rounded-xl border p-1 transition-colors h-9",
        "hover:bg-accent text-xs text-muted-foreground hover:text-foreground",
      )}
      title={`تقرأ الآن: ${book.title}`}
    >
      <BookOpenIcon className="bg-primary/25 text-primary size-6 shrink-0 rounded-lg p-0.75" />
      <div className="flex max-w-36 min-w-0 flex-col gap-0.5">
        <span className="text-foreground text-[10px] leading-none font-medium">{book.title}</span>
        <div className="flex items-center gap-1.5">
          {/* Progress bar */}
          <div className="bg-muted h-1 w-16 overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{ width: `${book.progress}%` }}
            />
          </div>
          <span className="text-[8px] tabular-nums">{book.progress}%</span>
        </div>
      </div>
    </Link>
  );
}

const notificationIcons: Record<NonNullable<NotificationItem["type"]>, React.ElementType> = {
  review: BooksIcon,
  friend: UserIcon,
  recommendation: BooksIcon,
  achievement: TrophyIcon,
  challenge: FireIcon,
};

const notificationColors: Record<NonNullable<NotificationItem["type"]>, string> = {
  review: "bg-blue-100 dark:bg-blue-950/50",
  friend: "bg-purple-100 dark:bg-purple-950/50",
  recommendation: "bg-green-100 dark:bg-green-950/50",
  achievement: "bg-yellow-100 dark:bg-yellow-950/50",
  challenge: "bg-orange-100 dark:bg-orange-950/50",
};

const notificationIconColors: Record<NonNullable<NotificationItem["type"]>, string> = {
  review: "text-blue-500",
  friend: "text-purple-500",
  recommendation: "text-green-500",
  achievement: "text-yellow-500",
  challenge: "text-orange-500",
};

type NotificationTab = "all" | "unread";

function NotificationsMenu({ notifications }: { notifications: NotificationItem[] }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<NotificationTab>("all");
  const [items, setItems] = useState(notifications);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const unreadCount = useMemo(() => items.filter((item) => item.unread).length, [items]);
  const filtered = tab === "unread" ? items.filter((i) => i.unread) : items;

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!wrapperRef.current) return;
      if (event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function markOneRead(id: string) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  }

  return (
    <div ref={wrapperRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative size-9 rounded-xl"
        onClick={() => setOpen((v) => !v)}
        aria-label="الإشعارات"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <BellIcon className="size-4" />
        {unreadCount > 0 && (
          <span className="bg-primary text-primary-foreground absolute -top-0.75 -right-0.75 flex size-4 items-center justify-center rounded-full text-[9px] font-bold">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </Button>

      {open && (
        <div
          role="menu"
          aria-label="الإشعارات"
          className="bg-background absolute top-[calc(100%+0.5rem)] left-0 w-92 overflow-hidden rounded-2xl border shadow-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-sm font-semibold">الإشعارات</p>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 gap-1 px-2 text-xs"
                onClick={markAllRead}
              >
                <CheckCircleIcon className="size-3.5" />
                تمييز الكل كمقروء
              </Button>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {(["all", "unread"] as NotificationTab[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2 text-xs font-medium transition-colors",
                  tab === t
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t === "all" ? "الكل" : `غير مقروءة (${unreadCount})`}
              </button>
            ))}
          </div>

          {/* List */}
          <div className="max-h-80 overflow-auto">
            {filtered.length > 0 ? (
              <ul className="grid">
                {filtered.map((item) => {
                  const type = item.type ?? "review";
                  const IconComponent = notificationIcons[type];
                  return (
                    <li
                      key={item.id}
                      className={cn(
                        "group relative border-b px-4 py-3 transition-colors last:border-b-0 hover:bg-accent/60",
                        item.unread && "bg-primary/5",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
                            notificationColors[type],
                          )}
                        >
                          <IconComponent className={cn("size-4", notificationIconColors[type])} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-sm leading-5 font-medium">{item.title}</p>
                            <div className="flex shrink-0 items-center gap-1">
                              <span className="text-muted-foreground text-[11px]">{item.time}</span>
                              {item.unread && (
                                <button
                                  type="button"
                                  onClick={() => markOneRead(item.id)}
                                  className="opacity-0 transition-opacity group-hover:opacity-100"
                                  title="تمييز كمقروء"
                                >
                                  <XCircleIcon className="text-muted-foreground hover:text-foreground size-3.5" />
                                </button>
                              )}
                            </div>
                          </div>
                          <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                            {item.description}
                          </p>
                        </div>

                        {item.unread && (
                          <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-4 py-10 text-center">
                <BellIcon className="text-muted-foreground/40 mx-auto mb-2 size-8" />
                <p className="text-sm font-medium">لا توجد إشعارات</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  ستظهر هنا أحدث التنبيهات والنشاط.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-2">
            <Link
              to="/notifications"
              className="text-primary block text-center text-xs hover:underline"
            >
              عرض كل الإشعارات
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function DesktopNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <NavigationMenu dir="rtl" align="center" className="hidden md:flex">
      <NavigationMenuList className="gap-1" dir="rtl">
        {isLoggedIn && (
          <NavigationMenuItem
            className={cn(buttonVariants({ variant: "ghost" }), "border-0 px-4")}
            render={<Link to="/library" className="nav-link" />}
          >
            كتبي
          </NavigationMenuItem>
        )}

        <NavigationMenuItem dir="rtl">
          <NavigationMenuTrigger>اكتشف</NavigationMenuTrigger>
          <NavigationMenuContent dir="rtl" className="w-80">
            <DiscoverMenuContent />
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem dir="rtl">
          <NavigationMenuTrigger>المجتمع</NavigationMenuTrigger>
          <NavigationMenuContent dir="rtl" className="w-64">
            <ul className="grid gap-0.5 p-1">
              {communityItems.map((item) => (
                <NavListItem key={item.href} item={item} />
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        {/* Reading challenges link */}
        {/*<NavigationMenuItem
          className={cn(buttonVariants({ variant: "ghost" }), "border-0 px-4")}
          render={<Link to="/" className="nav-link" />}
          // TODO: /challenges
        >
          <span className="flex items-center gap-1.5">
            التحديات
            <Badge variant="secondary" className="h-4 px-1 text-[9px]">
              جديد
            </Badge>
          </span>
        </NavigationMenuItem>*/}
      </NavigationMenuList>

      <NavigationMenuPositioner
        side="bottom"
        align="center"
        sideOffset={5}
        style={
          {
            "--popup-width": "max-content",
            "--popup-height": "auto",
            "--available-width": "100vw",
            "--transform-origin": "top center",
          } as CSSProperties
        }
      />
    </NavigationMenu>
  );
}

/** Discover dropdown: featured strip + items grid */
function DiscoverMenuContent() {
  return (
    <div className="p-1">
      {/* Featured / trending strip */}
      <div className="bg-muted/60 mb-1 rounded-lg px-3 py-2">
        <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold tracking-widest uppercase">
          الأكثر قراءة هذا الأسبوع
        </p>
        <Link
          to="/discover/books"
          // TODO: Trending
          search={{ sort: "newest" }}
          className="hover:text-primary flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <TrophyIcon className="size-4 text-yellow-500" weight="fill" />
          استعرض الكتب الأكثر رواجاً
        </Link>
      </div>

      <ul className="grid gap-0.5">
        {discoverItems.map((item) => (
          <NavListItem key={item.href} item={item} />
        ))}
      </ul>
    </div>
  );
}

function NavListItem({ item }: { item: NavItem }) {
  if (item.disabled) {
    return (
      <li>
        <span
          aria-disabled="true"
          className={cn(
            "group flex select-none items-center gap-3 rounded-lg p-2.5 leading-none no-underline outline-none transition-colors",
            "cursor-not-allowed opacity-50",
          )}
        >
          <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors">
            <item.icon className="text-muted-foreground size-5" />
          </div>
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5 text-sm font-medium">
              {item.title}
              <Badge variant="outline" className="h-4 px-1 text-[9px]">
                قريباً
              </Badge>
            </div>
            <p className="text-muted-foreground line-clamp-1 text-xs">{item.description}</p>
          </div>
        </span>
      </li>
    );
  }

  return (
    <li>
      <NavigationMenuLink
        render={
          <Link
            to={item.href}
            className="group hover:bg-accent focus:bg-accent flex items-center gap-3 rounded-lg p-2.5 leading-none no-underline transition-colors outline-none select-none"
          >
            <div className="bg-muted group-hover:bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors">
              <item.icon className="text-muted-foreground group-hover:text-primary size-5 transition-all duration-200 group-hover:scale-110 dark:group-hover:brightness-150" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="text-sm font-medium">{item.title}</div>
              <p className="text-muted-foreground line-clamp-1 text-xs">{item.description}</p>
            </div>
          </Link>
        }
      />
    </li>
  );
}

export default Header;
