import { cache } from "react";

export type Settings = Record<string, string>;

/**
 * Reads all editable site content (media URLs + text) from Supabase.
 * Returns {} when the backend isn't configured yet — pages fall back to
 * their built-in placeholders. Deduped per request via React cache().
 */
export const getSettings = cache(async (): Promise<Settings> => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return {};
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value");
    if (error || !data) return {};
    const out: Settings = {};
    for (const row of data) {
      if (row.value != null && row.value !== "") out[row.key] = row.value;
    }
    return out;
  } catch {
    return {};
  }
});
