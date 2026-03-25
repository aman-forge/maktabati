"use client";

import {
  Chart03Icon,
  DiscoverSquareIcon,
  Home09Icon,
  LibraryIcon,
  Search02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { cn } from "@/ui/lib/utils";

function BottomBar() {
  return (
    <header
      className={cn(
        "fixed bottom-0 z-50 h-18 w-full border-t bg-red-500/95 backdrop-blur supports-backdrop-filter:bg-background/60 md:hidden",
        "",
      )}
    >
      <div className="max-w-2xl mx-auto sm:px-4 flex h-full items-center justify-around gap-0.5 sm:gap-4">
        <Link
          href={"/"}
          className={cn(
            "text-primary",
            "rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1",
          )}
        >
          <HugeiconsIcon icon={Home09Icon} className="size-6.5 fill-current" />
          <span className="text-xs font-semibold">الرئيسية</span>
        </Link>
        <Link
          href={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <HugeiconsIcon icon={LibraryIcon} className="size-6.5" />
          <span className="text-xs font-semibold">المكتبة</span>
        </Link>
        <Link
          href={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <HugeiconsIcon icon={Search02Icon} className="size-6.5" />
          <span className="text-xs font-semibold">البحث</span>
        </Link>
        <Link
          href={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <HugeiconsIcon icon={Chart03Icon} className="size-6.5" />
          <span className="text-xs font-semibold">الاحصائيات</span>
        </Link>
        <Link
          href={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <HugeiconsIcon icon={DiscoverSquareIcon} className="size-6.5" />
          <span className="text-xs font-semibold">تصفح</span>
        </Link>
      </div>
    </header>
  );
}

export default BottomBar;
