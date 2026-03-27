import { createClient } from "@server/db/server";
import { QueryData } from "@supabase/supabase-js";

const supabase = await createClient();

export const bookcardQuery = supabase
  .from("books")
  .select(
    `
  id, title, cover_image_url, page_count,
  authors ( name )`,
  )
  .limit(12);

export type BookCardArrayType = QueryData<typeof bookcardQuery>; // the type of bookcard Query is a Query Data Type
export type BookCardType = BookCardArrayType[number];
