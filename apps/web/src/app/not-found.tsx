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
      <EmptyHeader className="text-xl md:text-3xl lg:text-5xl h-screen flex items-center justify-center ">
        <EmptyTitle className="text-5xl flex gap-2">
          <LinkBreakIcon size={48} /> 404
        </EmptyTitle>
        <Separator />
        <EmptyTitle> عذراً لم يتم ايجاد ما تبحث عنه</EmptyTitle>
        <EmptyDescription>الصفحة التي تبحث عنها غير موجودة</EmptyDescription>
        <Button className="bg-[#dc7702]" variant="secondary" type="submit">
          <Link href="/"> العودة إلى الرئيسية</Link>
        </Button>
      </EmptyHeader>
    </Empty>
  );
}
