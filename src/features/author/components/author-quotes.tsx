import type { AuthorType } from "@features/author/server/get-author";
import { QuotesIcon } from "@phosphor-icons/react";

import { AuthorEmptyState } from "./author-empty-state";

export function AuthorQuotes({ author: _author }: { author: AuthorType }) {
  return (
    <AuthorEmptyState
      icon={QuotesIcon}
      title="لا توجد اقتباسات موثقة"
      description="سيظهر هذا القسم بعد وجود مصدر بيانات حقيقي للاقتباسات ونِسبها إلى الكتب."
    />
  );
}
