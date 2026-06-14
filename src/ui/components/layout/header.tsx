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
import { MagnifyingGlassIcon, TrophyIcon, UserIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { type CSSProperties } from "react";

import { UserMenu } from "@/features/auth/components/user-menu";
import { useUser } from "@/features/auth/use-user";
import { cn } from "@/ui/lib/utils";

import { Skeleton } from "../ui/skeleton";

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
          <ThemeToggle />

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
      nativeButton={false}
      render={<Link to="/discover/books" />}
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
      {/* Featured discovery strip */}
      <div className="bg-muted/60 mb-1 rounded-lg px-3 py-2">
        <p className="text-muted-foreground mb-1.5 text-[10px] font-semibold tracking-widest uppercase">
          أحدث الإضافات
        </p>
        <Link
          to="/discover/books"
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
