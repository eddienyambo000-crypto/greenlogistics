"use server";

import type { TrackingResult } from "@/lib/db-types";

export type TrackState =
  | { status: "idle" }
  | { status: "notfound"; query: string }
  | { status: "unconfigured" }
  | { status: "error"; message: string }
  | { status: "found"; data: TrackingResult; query: string };

export async function trackShipment(
  _prev: TrackState,
  formData: FormData,
): Promise<TrackState> {
  const query =
    typeof formData.get("number") === "string"
      ? (formData.get("number") as string).trim()
      : "";

  if (!query) return { status: "idle" };

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return { status: "unconfigured" };
  }

  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_shipment_by_tracking", {
      p_tracking: query,
    });

    if (error) {
      console.error("track rpc error:", error);
      return { status: "error", message: "Couldn't reach tracking right now." };
    }
    if (!data) return { status: "notfound", query };

    return { status: "found", data: data as TrackingResult, query };
  } catch (e) {
    console.error("track failed:", e);
    return { status: "error", message: "Couldn't reach tracking right now." };
  }
}
