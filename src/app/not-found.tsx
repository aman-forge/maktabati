import { Button } from "@components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@components/ui/empty";
import Link from "next/link";

export default function NotFound() {
  return (
    <Empty className="h-[calc(100vh-80px)]">
      <EmptyHeader className="text-xl md:text-3xl lg:text-5xl h-screen flex items-center justify-center gap-4 ">
        <EmptyTitle className=" text-6xl flex gap-2 font-bold">404</EmptyTitle>

        <EmptyTitle className="text-2xl font-bold">
          الصفحة غير موجودة
        </EmptyTitle>
        <EmptyDescription className="text-lg font-normal">
          عذرًا، الصفحة التي تحاول الوصول إليها غير متوفرة أو ربما تم نقلها.
          يمكنك العودة إلى الصفحة السابقة أو الانتقال إلى الصفحة الرئيسية
          للمتابعة.
        </EmptyDescription>
        <Button size={"lg"} variant="default">
          <Link href="/"> العودة إلى الرئيسية</Link>
        </Button>
      </EmptyHeader>
    </Empty>
  );
}
