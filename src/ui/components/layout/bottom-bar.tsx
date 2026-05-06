import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import {
  BookmarkSimpleIcon,
  CompassIcon,
  HouseIcon,
  PulseIcon,
  UserCircleIcon,
} from "@phosphor-icons/react";
import { Link, linkOptions, useRouterState } from "@tanstack/react-router";
import { authClient } from "@/auth";
import { cn } from "@/ui/lib/utils";

const navItems = [
  { href: linkOptions({ to: "/" }), icon: HouseIcon, label: "الرئيسية", isProfile: false },
  {
    href: linkOptions({ to: "/discover/books" }),
    icon: CompassIcon,
    label: "اكتشف",
    isProfile: false,
  },
  {
    href: linkOptions({ to: "/library" }), // library
    icon: BookmarkSimpleIcon,
    label: "مكتبتي",
    isProfile: false,
  },
  { href: linkOptions({ to: "/" }), icon: PulseIcon, label: "النشاط", isProfile: false }, // activity
  { href: linkOptions({ to: "/me" }), icon: UserCircleIcon, label: "حسابي", isProfile: true },
] as const;

function BottomBar() {
  const { data: session } = authClient.useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      className="fixed bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80  md:hidden"
      dir="rtl"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto flex h-16 max-w-lg items-center justify-around px-1">
        {navItems.map((item) => {
          const href =
            item.isProfile && !session?.user
              ? linkOptions({ to: "/auth/$pathname", params: { pathname: "/login" } })
              : item.href;
          const isActive =
            item.href.to === "/"
              ? pathname === "/"
              : item.isProfile
                ? pathname.startsWith("/u/")
                : pathname.startsWith(item.href.to);

          return (
            <Link
              key={item.href.to}
              to={href.to}
              className={cn(
                "relative flex h-full flex-1 flex-col items-center justify-center gap-1 transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* Top indicator */}
              {isActive && <span className="absolute top-0 h-0.5 w-6 rounded-full bg-primary" />}

              {/* Profile avatar when logged in */}
              {item.isProfile && session?.user ? (
                <div
                  className={cn(
                    "h-7 w-7 rounded-full ring-2  transition-all duration-200 overflow-hidden flex items-center justify-center bg-primary/10",
                    isActive ? "ring-primary" : "ring-transparent",
                  )}
                >
                  <UserAvatar />
                </div>
              ) : (
                <item.icon
                  className="size-6 transition-all duration-200"
                  weight={isActive ? "fill" : "regular"}
                />
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
