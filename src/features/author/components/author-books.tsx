/**
 * author-books.tsx
 * Filterable grid of all books by this author.
 */

import type { AuthorType } from "@features/author/server/get-author";
import { BookOpenIcon } from "@phosphor-icons/react";

import { BookCard } from "@/features/books/components/book-card";

import { AuthorEmptyState } from "./author-empty-state";

export function AuthorBooks({ author }: { author: AuthorType }) {
  if (author.books.length === 0) {
    return (
      <AuthorEmptyState
        icon={BookOpenIcon}
        title="لا توجد كتب مرتبطة بهذا المؤلف"
        description="ستظهر هنا الكتب عندما تكون مرتبطة ببيانات المؤلف في قاعدة البيانات."
      />
    );
  }

  return (
    <div dir="rtl">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-6">
        {author.books.map((book) => (
          <div key={book.id} className="flex shrink-0 flex-wrap pt-1">
            <BookCard book={book ?? undefined} size="md" />
          </div>
        ))}
      </div>
    </div>
  );
}
