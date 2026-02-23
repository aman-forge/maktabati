import Link from "next/link";
import {
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader className="flex flex-wrap items-center mt-40">
        <EmptyTitle> عذراً لم يتم ايجاد ما تبحث عنه</EmptyTitle>
        <EmptyDescription>الصفحة التي تبحث عنها غير موجودة</EmptyDescription>
        <Button className="bg-amber-600" variant="secondary" type="submit">
          <Link href="/"> العودة الئ الرئيسية</Link>
        </Button>
      </EmptyHeader>
    </Empty>
  );
}
