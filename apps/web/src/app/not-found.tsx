"use client";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader className="text-xl md:text-3xl lg:text-5xl h-screen flex items-center justify-center gap-2 ">
        <EmptyTitle className=" text-5xl flex gap-2 font-semibold">
          404
        </EmptyTitle>

        <EmptyTitle className="text-xl">الصفحة غير موجودة</EmptyTitle>
        <EmptyDescription className="text-xl">
          عذرًا، الصفحة التي تحاول الوصول إليها غير متوفرة أو ربما تم نقلها.
          يمكنك العودة إلى الصفحة السابقة أو الانتقال إلى الصفحة الرئيسية
          للمتابعة.
        </EmptyDescription>
        <Button className="text-lg py-5 px-2" size={"lg"} variant="default">
          <Link href="/"> العودة إلى الرئيسية</Link>
        </Button>
      </EmptyHeader>
    </Empty>
  );
}
