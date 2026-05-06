// TODO: DELETE File

import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet";
import { browseItems, discoverItems } from "@config/nav";
import { UserAvatar } from "@neondatabase/neon-js/auth/react";
import {
  BookBookmarkIcon,
  GearSixIcon,
  SignInIcon,
  SignOutIcon,
  UserIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { authClient } from "@/auth";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden border-0!">
            <UserAvatar className="border-0!" user={session?.user} />
            <span className="sr-only">القائمة</span>
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="flex w-64! flex-col overflow-y-auto rounded-l-2xl px-2"
        dir="rtl"
      >
        {/* ── Header ── */}
        <SheetHeader className="text-right flex flex-row items-center p-2 pt-4!">
          <img src="/logo.png" alt="logo" className="size-8 rounded-md" />
          <div className="flex flex-col">
            <SheetTitle className={"text-base"}>مكتبتي</SheetTitle>

            {!isPending && session?.user?.email ? (
              <p className="truncate text-xs text-muted-foreground">{session?.user.email}</p>
            ) : (
              <p className="truncate text-xs text-muted-foreground">ليست أول مكتبة عربية</p>
            )}
          </div>
        </SheetHeader>

        {/* ── Browse ── */}
        <NavSection label="تصفح">
          {browseItems.map((item) => (
            <MobileNavLink key={item.href} href={item.href} onClick={close}>
              <item.icon className="size-5 text-muted-foreground" />
              {item.title}
            </MobileNavLink>
          ))}
        </NavSection>

        <Separator className={"mt-2! -mb-1!"} />

        {/* ── Discover ── */}
        <NavSection label="اكتشف">
          {discoverItems.map((item) => (
            <MobileNavLink key={item.href} href={item.href} onClick={close}>
              <item.icon className="size-5 text-muted-foreground" />
              {item.title}
            </MobileNavLink>
          ))}
        </NavSection>

        <Separator className={"mt-2! -mb-1!"} />

        <NavSection label="الحساب">
          {session?.user ? (
            <>
              <MobileNavLink href={`/u/${session?.user?.id}`} onClick={close}>
                <UserIcon className="size-5 text-muted-foreground" />
                الملف الشخصي
              </MobileNavLink>
              <MobileNavLink href="/dashboard" onClick={close}>
                <BookBookmarkIcon className="size-5 text-muted-foreground" />
                مكتبتي
              </MobileNavLink>
              <MobileNavLink href="/account/settings" onClick={close}>
                <GearSixIcon className="size-5 text-muted-foreground" />
                الإعدادات
              </MobileNavLink>
              <MobileNavLink href="/auth/logout" onClick={close}>
                <SignOutIcon className="size-5 text-muted-foreground" />
                تسجيل الخروج
              </MobileNavLink>
            </>
          ) : (
            <>
              <MobileNavLink href="/auth/register" onClick={close}>
                <UserPlusIcon className="size-5 text-muted-foreground" />
                إنشاء حساب
              </MobileNavLink>
              <MobileNavLink href="/auth/login" onClick={close}>
                <SignInIcon className="size-5 text-muted-foreground" />
                تسجيل الدخول
              </MobileNavLink>
            </>
          )}
        </NavSection>

        {/* ── Auth button ── */}
      </SheetContent>
    </Sheet>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function NavSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="mb-1 px-2 text-xs font-semibold text-muted-foreground pt-4">{label}</span>
      {children}
    </div>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm transition-colors hover:bg-accent"
    >
      {children}
    </Link>
  );
}
