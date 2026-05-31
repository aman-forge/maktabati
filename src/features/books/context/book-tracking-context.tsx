import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import React from "react";

import { useUser } from "@/features/auth/use-user";
import type { BaseBook } from "@/features/books/types";
import { TrackBookModal } from "@/ui/components/book/track-book-modal";
import { toast } from "@/ui/components/ui/sonner";

import { updateBookTracking, type TrackingDataType } from "../server/update-book";

interface BookTrackingContextValue {
  openTrackModal: (book: BaseBook) => void;
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
  const [selectedBook, setSelectedBook] = React.useState<BaseBook | null>(null);
  const [open, setOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const { user, isLoggedIn, isLoading } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();
  const initialTrackingData = React.useMemo(
    () =>
      selectedBook?.status
        ? {
            status: selectedBook.status,
            pageProgress: selectedBook.pageProgress ?? null,
            notes: selectedBook.notes ?? null,
            startedAt: selectedBook.startedAt ?? null,
            finishedAt: selectedBook.finishedAt ?? null,
          }
        : undefined,
    [
      selectedBook?.finishedAt,
      selectedBook?.notes,
      selectedBook?.pageProgress,
      selectedBook?.startedAt,
      selectedBook?.status,
    ],
  );

  const openTrackModal = React.useCallback(
    (book: BaseBook) => {
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

  const updateBookStatus = async (bookId: string, data: TrackingDataType) => {
    if (!user) return;

    setIsSaving(true);
    try {
      await updateBookTracking({ data: { bookId, data } });
      setSelectedBook((book) =>
        book?.id === bookId
          ? {
              ...book,
              status: data.status,
              pageProgress: data.pageProgress,
              notes: data.notes,
              startedAt: data.startedAt,
              finishedAt: data.finishedAt,
            }
          : book,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["library-books"] }),
        queryClient.invalidateQueries({ queryKey: ["discover-books"] }),
        queryClient.invalidateQueries({ queryKey: ["book-tracking"] }),
        router.invalidate(),
      ]);
      toast.success("تم حفظ التتبع بنجاح");
      setOpen(false);
    } catch (error) {
      console.error("Failed to update book tracking:", error);
      toast.error("حدث خطأ أثناء الحفظ", {
        description: "يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <BookTrackingContext.Provider value={{ openTrackModal }}>
      {children}
      <TrackBookModal
        book={selectedBook}
        open={open}
        onOpenChange={setOpen}
        isSaving={isSaving}
        onSave={updateBookStatus}
        initialData={initialTrackingData}
      />
    </BookTrackingContext.Provider>
  );
}
