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
import { LinkBreakIcon } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <Empty>
      <EmptyHeader className="flex items-center mt-40 gap-2">
        <EmptyTitle className="text-5xl flex items-center gap-2 ">
          <LinkBreakIcon size={48} /> 404
        </EmptyTitle>
        <Separator />
        <EmptyTitle> عذراً لم يتم ايجاد ما تبحث عنه</EmptyTitle>
        <EmptyDescription>الصفحة التي تبحث عنها غير موجودة</EmptyDescription>
        <Button className="bg-amber-600 h-9" variant="secondary" type="submit">
          <Link href="/"> العودة إلى الرئيسية</Link>
        </Button>
      </EmptyHeader>
    </Empty>
  );
}
