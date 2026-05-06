import { ThemeToggle } from "@components/theme-toggle";
import { Button } from "@components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
} from "@components/ui/navigation-menu";
import { browseItems, discoverItems, type NavItem } from "@config/nav";
import { UserButton } from "@neondatabase/neon-js/auth/react";
import { BooksIcon, UserIcon } from "@phosphor-icons/react";
import { ArrowLeftIcon, BookIcon, MagnifyingGlassIcon } from "@phosphor-icons/react/ssr";
import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header className="hidden md:flex fixed inset-x-0 top-0 z-50 h-(--header-height) border-b bg-background/95 backdrop-blur-2xl supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto px-4 flex h-full items-center justify-between">
        {/* ── Left: Logo + Desktop Nav ── */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Link to="/" className="flex items-center gap-2.5">
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
                href: "/profile",
                icon: <UserIcon className="size-4" />,
                label: "الملف الشخصي",
                signedIn: true,
              },
            ]}
          />
        </div>
      </div>
    </header>
  );
}

// ─── Desktop Nav (pure static, no client JS needed) ──────────────────────────

function DesktopNav() {
  return (
    <NavigationMenu dir="rtl" align="center" className="hidden md:flex">
      <NavigationMenuList className="gap-1">
        {/* Browse */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>تصفح</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-100 grid-cols-[0.8fr_1fr] gap-1">
              <NavigationMenuLink
                render={
                  <Link
                    to="/" // /library
                    className="group flex h-full flex-col justify-between rounded-xl bg-linear-to-b from-primary/10 to-primary/5 p-4 transition-colors hover:bg-primary/10"
                  >
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary shadow-sm transition-transform group-hover:scale-105">
                      <BookIcon className="size-8 text-primary-foreground" />
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-base font-semibold">مكتبتي</div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        عرض وإدارة مجموعة كتبك الشخصية
                      </p>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary">
                      <span>الذهاب للمكتبة</span>
                      <ArrowLeftIcon />
                    </div>
                  </Link>
                }
              />
              <ul className="flex flex-col gap-0.5 p-1">
                {browseItems.map((item) => (
                  <NavListItem key={item.href} item={item} />
                ))}
              </ul>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

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
            to={item.href}
            className="group flex select-none items-center gap-3 rounded-lg p-2.5 leading-none no-underline outline-none transition-colors hover:bg-accent focus:bg-accent"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-primary/10">
              <item.icon className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
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
