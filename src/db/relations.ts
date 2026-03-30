// ====================== RELATIONS ======================
// https://orm.drizzle.team/docs/relations-v2

import { defineRelations } from "drizzle-orm";
import { authors, books } from "./tables";

export const relations = defineRelations({ authors, books }, (r) => ({
	books: {
		author: r.one.authors({
			from: r.books.authorId,
			to: r.authors.id,
		}),
	},
	authors: {
		books: r.many.books({
			from: r.authors.id,
			to: r.books.authorId,
		}),
	},
}));
