"use client";

import React from "react";
import type { Book } from "@/db/tables";
import { TrackBookModal, TrackingData } from "../components/track-book-modal";

interface BookTrackingContextValue {
  openTrackModal: (book: Book) => void;
}

const BookTrackingContext =
  React.createContext<BookTrackingContextValue | null>(null);

export function useBookTracking(): BookTrackingContextValue {
  const ctx = React.useContext(BookTrackingContext);
  if (!ctx)
    throw new Error("useBookTracking must be used within BookTrackingProvider");
  return ctx;
}

interface BookTrackingProviderProps {
  children: React.ReactNode;
  onSave?: (bookId: string, data: TrackingData) => void;
}

export function BookTrackingProvider({
  children,
  onSave,
}: BookTrackingProviderProps) {
  const [selectedBook, setSelectedBook] = React.useState<Book | null>(null);
  const [open, setOpen] = React.useState(false);

  const openTrackModal = React.useCallback((book: Book) => {
    setSelectedBook(book);
    setOpen(true);
  }, []);

  return (
    <BookTrackingContext.Provider value={{ openTrackModal }}>
      {children}
      <TrackBookModal
        book={selectedBook}
        open={open}
        onOpenChange={setOpen}
        onSave={onSave}
      />
    </BookTrackingContext.Provider>
  );
}
