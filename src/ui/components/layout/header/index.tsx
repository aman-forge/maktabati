import { ThemeToggle } from "@components/theme-toggle";
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
import { UserButton } from "@neondatabase/neon-js/auth/react";
import { BooksIcon, UserIcon } from "@phosphor-icons/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { Link } from "@tanstack/react-router";
import { useUser } from "@/features/auth/use-user";
import { cn } from "@/ui/lib/utils";
import { Skeleton } from "../../ui/skeleton";

function Header() {
  const { isLoggedIn, isLoading } = useUser();

  return (
    <header className="hidden md:flex fixed inset-x-0 top-0 z-50 h-(--header-height) border-b bg-background/95 backdrop-blur-2xl supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto px-4 flex h-full items-center justify-between">
        {/* ── Left: Logo + Desktop Nav ── */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2.5">
            <img src="/logo.png" alt="logo" className="size-8 rounded-md" />
            <span className="inline-block text-lg font-bold tracking-tight">مكتبتي</span>
          </Link>

          <DesktopNav />
        </div>

        {/* ── Right: Search + Theme + User  ── */}
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button variant="outline" className="h-9 gap-2 pl-2 pr-3 text-muted-foreground">
            <MagnifyingGlassIcon className="size-4" />
            <span className="text-sm">بحث...</span>
            <kbd className="pointer-events-none mr-2 h-5 select-none items-center gap-0.5 rounded-full border bg-muted px-1.5 font-mono text-[10px] font-medium flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>
          {isLoading ? (
            <Skeleton></Skeleton>
          ) : isLoggedIn ? (
            <UserButton
              size="icon"
              classNames={{
                content: { base: "min-w-42 direction-rtl", user: { base: "direction-rtl" } },
              }}
              align="start"
              side="bottom"
              additionalLinks={[
                {
                  href: "/dashboard",
                  icon: <BooksIcon className="size-4" />,
                  label: "مكتبتي",
                  signedIn: true,
                },
                {
                  href: "/me",
                  icon: <UserIcon className="size-4" />,
                  label: "الملف الشخصي",
                  signedIn: true,
                },
              ]}
            />
          ) : (
            <Button render={<Link to="/auth/$pathname" params={{ pathname: "login" }} />}>
              تسجيل الدخول
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

// ─── Desktop Nav (pure static, no client JS needed) ──────────────────────────

function DesktopNav() {
  return (
    <NavigationMenu dir="rtl" align="start" className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem
          className={cn(buttonVariants({ variant: "ghost" }), "border-0 px-4")}
          render={
            <Link to="/library" className="nav-link">
              مكتبتي
            </Link>
          }
        />

        {/* Discover */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>اكتشف</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-75">
              <ul className="grid gap-0.5">
                {discoverItems.map((item) => (
                  <NavListItem key={item.href} item={item} />
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* Community */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>المجتمع</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-75">
              <ul className="grid gap-0.5">
                {communityItems.map((item) => (
                  <NavListItem key={item.href} item={item} />
                ))}
              </ul>
            </div>
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
          } as React.CSSProperties
        }
      />
    </NavigationMenu>
  );
}

// ─── Shared Nav List Item ─────────────────────────────────────────────────────

function NavListItem({ item }: { item: NavItem }) {
  return (
    <li>
      <NavigationMenuLink
        render={
          <Link
            disabled={item.disabled ?? false}
            to={item.href}
            className={cn(
              "group flex select-none items-center gap-3 rounded-lg p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent",
              item.disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors">
              <item.icon className="size-5 text-muted-foreground transition-all duration-200 group-hover:text-primary group-hover:scale-110 dark:group-hover:brightness-150" />
            </div>
            <div className="flex-1 space-y-0.5">
              <div className="text-sm font-medium">{item.title}</div>
              <p className="line-clamp-1 text-xs text-muted-foreground">{item.description}</p>
            </div>
          </Link>
        }
      />
    </li>
  );
}

export default Header;
