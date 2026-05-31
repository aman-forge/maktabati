import type { PublisherDetail } from "../types";

export type PublisherDetailRow = Omit<PublisherDetail, "bookCount" | "books"> & {
  bookCount: string | number;
};

export function mapPublisherDetail(
  row: PublisherDetailRow,
  books: PublisherDetail["books"],
): PublisherDetail {
  return {
    ...row,
    bookCount: Number(row.bookCount),
    books,
  };
}
