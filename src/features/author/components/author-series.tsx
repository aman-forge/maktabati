import type { AuthorType } from "@features/author/server/get-author";
import { BooksIcon } from "@phosphor-icons/react";

import { AuthorEmptyState } from "./author-empty-state";

export function AuthorSeries({ author: _author }: { author: AuthorType }) {
  return (
    <AuthorEmptyState
      icon={BooksIcon}
      title="لا توجد سلاسل موثقة"
      description="سلاسل المؤلف ستظهر هنا بعد إضافة نموذج بيانات يدعم ربط الكتب بالسلاسل."
    />
  );
}
