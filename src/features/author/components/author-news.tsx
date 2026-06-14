import type { AuthorType } from "@features/author/server/get-author";
import { NewspaperIcon } from "@phosphor-icons/react";

import { AuthorEmptyState } from "./author-empty-state";

export function AuthorNews({ author: _author }: { author: AuthorType }) {
  return (
    <AuthorEmptyState
      icon={NewspaperIcon}
      title="لا توجد أخبار أو فعاليات موثقة"
      description="أخبار المؤلف والفعاليات تحتاج إلى مصدر تحريري أو جدول بيانات قبل عرضها."
    />
  );
}
