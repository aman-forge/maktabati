import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { PublisherDetail, PublisherListItem, PublisherOption } from "../types";

const publisherSearchSchema = z.object({
  q: z.string().max(100).optional(),
  sort: z.enum(["name-asc", "name-desc", "books"]).default("name-asc"),
});

export type PublisherSearchInput = z.infer<typeof publisherSearchSchema>;

export const searchPublishers = createServerFn({ method: "GET" })
  .inputValidator(publisherSearchSchema)
  .handler(async ({ data }): Promise<PublisherListItem[]> => {
    const { searchPublishersImpl } = await import("./publishers.impl");
    return await searchPublishersImpl(data);
  });

export const getPublisherOptions = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublisherOption[]> => {
    const { getPublisherOptionsImpl } = await import("./publishers.impl");
    return await getPublisherOptionsImpl();
  },
);

export const getPublisherById = createServerFn({ method: "GET" })
  .inputValidator(z.uuid())
  .handler(async ({ data: publisherId }): Promise<PublisherDetail | null> => {
    const { getPublisherByIdImpl } = await import("./publishers.impl");
    return await getPublisherByIdImpl(publisherId);
  });
