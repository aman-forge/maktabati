"use client";

import { useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/user-context";
import { useAuthDialog } from "@/components/auth/auth-dialog-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { UserIcon } from "@phosphor-icons/react";

export function HeaderActions() {
  const { user, loading, logout } = useUser();
  const { openDialog } = useAuthDialog();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
  };

  if (loading) {
    return <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />;
  }

  const email = user?.email;
  const profileHref = `/u/${user?.id}`;

  // ── حالة غير مسجل الدخول ─────────────────────────────────────────────
  if (!isLoggedIn || !user) {
    return (
      <Button
        onClick={() => openDialog("login")}
        className="h-9 px-4 font-medium"
      >
        تسجيل الدخول
      </Button>
    );
  }

  // ── حالة مسجل الدخول ─────────────────────────────────────────────────
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
          <UserIcon className="size-6" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-42">
          <div className="flex flex-col space-y-1 px-2 py-3">
            {email && (
              <p className="truncate text-xs leading-none text-muted-foreground">
                {email}
              </p>
            )}
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={profileHref}>الملف الشخصي</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/dashboard">مكتبتي</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/settings">الإعدادات</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          {/* زر تسجيل الخروج مع التصحيح المهم */}
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setTimeout(() => setLogoutOpen(true), 50);
            }}
          >
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* AlertDialog منفصل تماماً خارج الـ DropdownMenu */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من تسجيل الخروج؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم إنهاء جلستك الحالية، وستحتاج إلى إدخال بياناتك مرة أخرى
              للوصول إلى حسابك.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} variant="destructive">
              تسجيل الخروج
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
