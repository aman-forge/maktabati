"use client";

import { TrackBookModal } from "@components/book/track-book-modal";
import { BookType, type BookCardBook } from "@features/books/server/get-books";
import React from "react";
import { toast } from "sonner";

import { useUser } from "@/features/auth/use-user";

interface BookTrackingContextValue {
  openTrackModal: (book: BookCardBook | BookType) => void;
}

const BookTrackingContext = React.createContext<BookTrackingContextValue | null>(null);

export function useBookTracking(): BookTrackingContextValue {
  const ctx = React.useContext(BookTrackingContext);
  if (!ctx) throw new Error("useBookTracking must be used within BookTrackingProvider");
  return ctx;
}

interface BookTrackingProviderProps {
  children: React.ReactNode;
}

export function BookTrackingProvider({ children }: BookTrackingProviderProps) {
  const [selectedBook, setSelectedBook] = React.useState<BookCardBook | BookType | null>(null);
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, isLoading } = useUser();

  const openTrackModal = React.useCallback(
    (book: BookCardBook | BookType) => {
      if (isLoading) return;
      if (!isLoggedIn) {
        toast.error("يجب تسجيل الدخول أولاً", {
          description: "لا يمكنك تتبع الكتب وإضافتها لمكتبتك بدون تسجيل الدخول.",
        });
        return;
      }
      setSelectedBook(book);
      setOpen(true);
    },
    [isLoggedIn, isLoading],
  );

  return (
    <BookTrackingContext.Provider value={{ openTrackModal }}>
      {children}
      <TrackBookModal book={selectedBook} open={open} onOpenChange={setOpen} />
    </BookTrackingContext.Provider>
  );
}
