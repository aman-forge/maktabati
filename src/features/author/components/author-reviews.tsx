import type { AuthorType } from "@features/author/server/get-author";
import { StarIcon } from "@phosphor-icons/react";

import { AuthorEmptyState } from "./author-empty-state";

export function AuthorReviews({ author: _author }: { author: AuthorType }) {
  return (
    <AuthorEmptyState
      icon={StarIcon}
      title="لا توجد مراجعات مرتبطة بالمؤلف"
      description="ستظهر المراجعات هنا عندما يكون لدينا مسار مراجعات محفوظ ومربوط بكتب المؤلف."
    />
  );
}
