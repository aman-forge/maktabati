import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { AuthorListItem } from "../types";

const authorSearchSchema = z.object({
  q: z.string().max(100).optional(),
  sort: z.enum(["name-asc", "name-desc", "books"]).default("name-asc"),
});

export type AuthorSearchInput = z.infer<typeof authorSearchSchema>;

export const searchAuthors = createServerFn({ method: "GET" })
  .inputValidator(authorSearchSchema)
  .handler(async ({ data }): Promise<AuthorListItem[]> => {
    const { searchAuthorsImpl } = await import("./authors.impl");
    return await searchAuthorsImpl(data);
  });
