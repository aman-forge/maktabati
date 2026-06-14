import { BooksIcon, GearSixIcon, SignOutIcon, UserIcon } from "@phosphor-icons/react";
import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { authClient } from "@/features/auth/client";
import { clearClientAuthSnapshot } from "@/features/auth/client-auth-snapshot";
import type { AuthUser } from "@/features/auth/server/types";
import { clearHasSessionHint } from "@/features/auth/session-storage";
import { Button } from "@/ui/components/ui/button";
import { cn } from "@/ui/lib/utils";

import { UserAvatar } from "./user-avatar";

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-xl px-3 py-2 text-start text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

export function UserMenu({ user }: { user: AuthUser }) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      if (!wrapperRef.current) return;
      if (event.target instanceof Node && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const signOut = async () => {
    setIsSigningOut(true);
    try {
      await authClient.signOut();
      clearHasSessionHint();
      clearClientAuthSnapshot();
      await router.invalidate();
      await router.navigate({ to: "/", replace: true });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="rounded-xl! border-0!"
        aria-label="قائمة المستخدم"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        <UserAvatar user={user} className="z-12 size-9" />
      </Button>

      {open && (
        <div
          role="menu"
          aria-label="قائمة المستخدم"
          className="bg-popover text-popover-foreground ring-foreground/5 dark:ring-foreground/10 absolute top-[calc(100%+0.5rem)] left-0 z-50 min-w-56 rounded-2xl p-1 shadow-2xl ring-1"
        >
          <div className="text-muted-foreground px-3 py-2.5 text-xs">
            <div className="flex min-w-0 items-center gap-3 text-start">
              <UserAvatar user={user} className="size-9" />
              <div className="min-w-0">
                <p className="text-foreground truncate text-sm font-medium">
                  {user.name ?? "قارئ"}
                </p>
                <p className="truncate text-xs">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-border/50 -mx-1 my-1 h-px" />

          <div role="group">
            <Link to="/" role="menuitem" className={menuItemClass} onClick={() => setOpen(false)}>
              <BooksIcon data-icon="inline-start" />
              الصفحة الرئيسية
            </Link>
            <Link to="/me" role="menuitem" className={menuItemClass} onClick={() => setOpen(false)}>
              <UserIcon data-icon="inline-start" />
              الملف الشخصي
            </Link>
            <Link
              to="/library"
              role="menuitem"
              className={menuItemClass}
              onClick={() => setOpen(false)}
            >
              <BooksIcon data-icon="inline-start" />
              مكتبتي
            </Link>
            <Link
              to="/settings/account"
              role="menuitem"
              className={menuItemClass}
              onClick={() => setOpen(false)}
            >
              <GearSixIcon data-icon="inline-start" />
              إعدادات الحساب
            </Link>
          </div>

          <div className="bg-border/50 -mx-1 my-1 h-px" />

          <button
            type="button"
            role="menuitem"
            className={cn(
              menuItemClass,
              "text-destructive hover:bg-destructive/10 hover:text-destructive focus-visible:bg-destructive/10 focus-visible:text-destructive dark:hover:bg-destructive/20 dark:focus-visible:bg-destructive/20",
            )}
            onClick={signOut}
            disabled={isSigningOut}
          >
            <SignOutIcon data-icon="inline-start" />
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
