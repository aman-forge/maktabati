import {
  BooksIcon,
  ChartLineIcon,
  CompassIcon,
  HouseIcon,
  MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
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
          to={"/"}
          className={cn(
            "text-primary",
            "rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1",
          )}
        >
          <HouseIcon className="size-6.5 fill-current" />
          <span className="text-xs font-semibold">الرئيسية</span>
        </Link>
        <Link
          to={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <BooksIcon className="size-6.5" />
          <span className="text-xs font-semibold">المكتبة</span>
        </Link>
        <Link
          to={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <MagnifyingGlassIcon className="size-6.5" />
          <span className="text-xs font-semibold">البحث</span>
        </Link>
        <Link
          to={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <ChartLineIcon className="size-6.5" />
          <span className="text-xs font-semibold">الاحصائيات</span>
        </Link>
        <Link
          to={"/"}
          className="rounded-lg hover:bg-accent h-full py-1 px-4 flex flex-col items-center justify-center gap-1"
        >
          <CompassIcon className="size-6.5" />
          <span className="text-xs font-semibold">تصفح</span>
        </Link>
      </div>
    </header>
  );
}

export default BottomBar;
