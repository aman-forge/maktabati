import { UserAvatar } from "@neondatabase/auth/react/ui";
import {
  BookmarkSimpleIcon,
  CompassIcon,
  HouseIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useUser } from "@/features/auth/use-user";
import { cn } from "@/ui/lib/utils";

const unreadNotifications = 2;

type NavItem = {
  href: string;
  icon: React.ComponentType<{
    className?: string;
    weight?: "regular" | "fill";
  }>;
  label: string;
  kind: "home" | "discover" | "search" | "library" | "profile";
};

const navItems: NavItem[] = [
  {
    href: "/",
    icon: HouseIcon,
    label: "الرئيسية",
    kind: "home",
  },
  {
    href: "/discover/books",
    icon: CompassIcon,
    label: "اكتشف",
    kind: "discover",
  },
  {
    href: "/search",
    icon: MagnifyingGlassIcon,
    label: "بحث",
    kind: "search",
  },
  {
    href: "/library",
    icon: BookmarkSimpleIcon,
    label: "مكتبتي",
    kind: "library",
  },
  {
    href: "/me",
    icon: UserCircleIcon,
    label: "حسابي",
    kind: "profile",
  },
];

function isActiveRoute(pathname: string, item: NavItem, isLoggedIn: boolean) {
  switch (item.kind) {
    case "home":
      return isLoggedIn ? pathname === "/dashboard" : pathname === "/";
    case "discover":
      return pathname.startsWith("/discover");
    case "search":
      return pathname.startsWith("/search");
    case "library":
      return pathname.startsWith("/library");
    case "profile":
      return pathname.startsWith("/me") || pathname.startsWith("/u/");
    default:
      return false;
  }
}

function BottomBar() {
  const { user } = useUser();
  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  });

  const isLoggedIn = Boolean(user);

  return (
    <nav
      className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 md:hidden"
      dir="rtl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-1">
        {navItems.map((item) => {
          const to =
            item.kind === "profile" && !isLoggedIn
              ? "/auth/login"
              : item.kind === "home" && isLoggedIn
                ? "/dashboard"
                : item.href;

          const active = isActiveRoute(pathname, item, isLoggedIn);

          if (item.kind === "search") {
            return (
              <Link
                key={item.kind}
                to={to}
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "mx-3 relative flex h-10 w-14 items-center justify-center rounded-2xl transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <item.icon
                  className="size-5 transition-all duration-200"
                  weight={active ? "fill" : "regular"}
                />
              </Link>
            );
          }

          return (
            <Link
              key={item.kind}
              to={to}
              aria-label={item.label}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-full flex-1 flex-col items-center justify-center gap-1 transition-all duration-200",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active && <span className="absolute top-0 h-0.5 w-6 rounded-full bg-primary" />}

              {item.kind === "profile" && isLoggedIn ? (
                <div
                  className={cn(
                    "flex size-7 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-2 transition-all duration-200",
                    active ? "ring-primary" : "ring-transparent",
                  )}
                >
                  <UserAvatar />
                </div>
              ) : (
                <div className="relative">
                  <item.icon
                    className="size-6 transition-all duration-200"
                    weight={active ? "fill" : "regular"}
                  />

                  {item.kind === "profile" && unreadNotifications > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      {unreadNotifications > 9 ? "9+" : unreadNotifications}
                    </span>
                  )}
                </div>
              )}

              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default BottomBar;
