"use client";

import { useState } from "react";
import type { User } from "@supabase/supabase-js";
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

export type HeaderProfile = {
  username: string;
  first_name: string | null;
  last_name: string | null;
  profile_image_url: string | null;
} | null;

export function HeaderActions({
  user: initialUser,
  profile,
}: {
  user: User | null;
  profile: HeaderProfile;
}) {
  const { user, loading, logout } = useUser();
  const { openDialog } = useAuthDialog();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const currentUser = loading ? user : (user ?? initialUser);
  const isLoggedIn = !!currentUser;

  const handleLogout = async () => {
    await logout();
    setLogoutOpen(false);
  };

  const displayName = profile?.first_name
    ? `${profile.first_name} ${profile.last_name ?? ""}`.trim()
    : (profile?.username ?? null);

  const email = currentUser?.email;
  const profileHref = `/u/${profile?.username ?? currentUser?.id}`;

  // ── حالة غير مسجل الدخول ─────────────────────────────────────────────
  if (!isLoggedIn) {
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
            {displayName && (
              <p className="text-sm font-medium leading-none">{displayName}</p>
            )}
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
