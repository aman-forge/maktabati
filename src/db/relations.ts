// ====================== RELATIONS v2 ======================
// https://orm.drizzle.team/docs/relations-v2

import { defineRelations } from "drizzle-orm";

import {
  authors,
  bookAuthors,
  books,
  profiles,
  publishers,
  reviews,
  series,
  userBooks,
} from "./tables";

export const relations = defineRelations(
  { authors, bookAuthors, books, publishers, reviews, series, userBooks, profiles },
  (r) => ({
    books: {
      publisher: r.one.publishers({
        from: r.books.publisherId,
        to: r.publishers.id,
      }),
      series: r.one.series({ from: r.books.seriesId, to: r.series.id }),
      bookAuthors: r.many.bookAuthors({ from: r.books.id, to: r.bookAuthors.bookId }),
      userBooks: r.many.userBooks({ from: r.books.id, to: r.userBooks.bookId }),
      reviews: r.many.reviews({ from: r.books.id, to: r.reviews.bookId }),
    },
    bookAuthors: {
      book: r.one.books({ from: r.bookAuthors.bookId, to: r.books.id }),
      author: r.one.authors({ from: r.bookAuthors.authorId, to: r.authors.id }),
    },
    authors: {
      bookAuthors: r.many.bookAuthors({
        from: r.authors.id,
        to: r.bookAuthors.authorId,
      }),
    },
    publishers: {
      books: r.many.books({ from: r.publishers.id, to: r.books.publisherId }),
    },
    series: {
      books: r.many.books({ from: r.series.id, to: r.books.seriesId }),
    },
    profiles: {
      userBooks: r.many.userBooks({
        from: r.profiles.id,
        to: r.userBooks.userId,
      }),
      reviews: r.many.reviews({ from: r.profiles.id, to: r.reviews.userId }),
    },
    userBooks: {
      user: r.one.profiles({ from: r.userBooks.userId, to: r.profiles.id }),
      book: r.one.books({ from: r.userBooks.bookId, to: r.books.id }),
    },
    reviews: {
      user: r.one.profiles({ from: r.reviews.userId, to: r.profiles.id }),
      book: r.one.books({ from: r.reviews.bookId, to: r.books.id }),
    },
  }),
);
