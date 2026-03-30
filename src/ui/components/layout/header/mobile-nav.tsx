import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import { browseItems, discoverItems } from "@config/nav";
import { UserButton } from "@neondatabase/neon-js/auth/react";
import { ListIcon } from "@phosphor-icons/react";
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
          <Button variant="ghost" size="icon" className="size-9 md:hidden">
            <ListIcon className="size-5" />
            <span className="sr-only">القائمة</span>
          </Button>
        }
      />

      <SheetContent
        side="right"
        className="flex w-80 flex-col overflow-y-auto rounded-l-2xl px-4"
        dir="rtl"
      >
        {/* ── Header ── */}
        <SheetHeader className="text-right">
          <SheetTitle>{isPending ? "مرحباً بك" : "مكتبتي"}</SheetTitle>
          {isPending && session?.user?.email && (
            <p className="truncate text-xs text-muted-foreground">
              {session?.user.email}
            </p>
          )}
        </SheetHeader>

        {/* ── Profile links (logged in only) ── */}
        {isPending && (
          <>
            <div className="flex flex-col gap-1">
              <NavSection label="حسابي">
                <MobileNavLink href={`/u/${session?.user?.id}`} onClick={close}>
                  الملف الشخصي
                </MobileNavLink>
                <MobileNavLink href="/dashboard" onClick={close}>
                  مكتبتي
                </MobileNavLink>
                <MobileNavLink href="/settings" onClick={close}>
                  الإعدادات
                </MobileNavLink>
              </NavSection>
            </div>
            <Separator />
          </>
        )}

        {/* ── Browse ── */}
        <NavSection label="تصفح">
          {browseItems.map((item) => (
            <MobileNavLink key={item.href} href={item.href} onClick={close}>
              <item.icon className="size-5 text-muted-foreground" />
              {item.title}
            </MobileNavLink>
          ))}
        </NavSection>

        <Separator />

        {/* ── Discover ── */}
        <NavSection label="اكتشف">
          {discoverItems.map((item) => (
            <MobileNavLink key={item.href} href={item.href} onClick={close}>
              <item.icon className="size-5 text-muted-foreground" />
              {item.title}
            </MobileNavLink>
          ))}
        </NavSection>

        {/* ── Auth button ── */}
        <UserButton size={"lg"} />
      </SheetContent>
    </Sheet>
  );
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function NavSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="mb-1 px-2 text-xs font-semibold text-muted-foreground">
        {label}
      </span>
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
