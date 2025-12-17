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
import { cn } from "@/lib/utils";

function BottomBar() {
  return (
    <header
      className={cn(
        "fixed bottom-2 px-0 sm:px-4 z-50 w-[calc(100%-16px)] sm:w-[calc(100%-32px)] left-1/2 -translate-x-1/2 max-w-2xl mx-auto border rounded-xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 flex h-17 items-center justify-around gap-0.5 sm:gap-4 md:hidden",
        "",
      )}
    >
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
        className="hover:bg-accent h-full py-1 px-auto flex flex-col items-center justify-center gap-1 bg-primary rounded-full relative -top-2 aspect-square border"
      >
        <HugeiconsIcon
          icon={Search02Icon}
          className="size-6.5 text-primary-foreground"
        />
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
    </header>
  );
}

export default BottomBar;
