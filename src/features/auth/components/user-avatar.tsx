import { UserIcon } from "@phosphor-icons/react";

import type { AuthUser } from "@/features/auth/server/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/components/ui/avatar";
import { cn } from "@/ui/lib/utils";

export function UserAvatar({
  user,
  className,
  fallbackClassName,
}: {
  user: AuthUser | null;
  className?: string;
  fallbackClassName?: string;
}) {
  const fallback = getUserInitials(user);

  return (
    <Avatar className={className}>
      {user?.image && <AvatarImage src={user.image} alt={user.name ?? user.email} />}
      <AvatarFallback className={cn("bg-primary/10 text-primary", fallbackClassName)}>
        {fallback || <UserIcon />}
      </AvatarFallback>
    </Avatar>
  );
}

function getUserInitials(user: AuthUser | null) {
  if (!user) return "";

  const source = user.name?.trim() || user.email;
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
