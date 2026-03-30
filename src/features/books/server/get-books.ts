import { createServerFn } from "@tanstack/react-start";
import { db } from "@/db";

export const getBooks = createServerFn({ method: "GET" }).handler(async () => {
	const books = await db.query.books.findMany({
		with: {
			author: true,
		},
	});
	return books;
});
