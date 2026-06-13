"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { STATUS_FLOW, type ShipmentStatus } from "@/lib/site";
import type { QuoteStatus } from "@/lib/db-types";

function s(v: FormDataEntryValue | null) {
  const t = typeof v === "string" ? v.trim() : "";
  return t === "" ? null : t;
}

export async function createShipment(formData: FormData) {
  const supabase = await createClient();
  const weight = s(formData.get("weight_kg"));
  const { error } = await supabase.from("shipments").insert({
    status: (s(formData.get("status")) as ShipmentStatus) ?? "pending",
    service: s(formData.get("service")),
    origin: s(formData.get("origin")),
    destination: s(formData.get("destination")),
    cargo_type: s(formData.get("cargo_type")),
    weight_kg: weight ? Number(weight) : null,
    sender_name: s(formData.get("sender_name")),
    sender_phone: s(formData.get("sender_phone")),
    receiver_name: s(formData.get("receiver_name")),
    receiver_phone: s(formData.get("receiver_phone")),
    current_location: s(formData.get("current_location")),
    estimated_delivery: s(formData.get("estimated_delivery")),
    notes: s(formData.get("notes")),
  });
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  return { ok: true, message: "Shipment created." };
}

export async function updateShipment(formData: FormData) {
  const supabase = await createClient();
  const id = s(formData.get("id"));
  if (!id) return { ok: false, message: "Missing shipment id." };
  const { error } = await supabase
    .from("shipments")
    .update({
      status: s(formData.get("status")) as ShipmentStatus,
      current_location: s(formData.get("current_location")),
    })
    .eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin");
  return { ok: true, message: "Shipment updated." };
}

export async function advanceShipment(id: string, current: ShipmentStatus) {
  const supabase = await createClient();
  const idx = STATUS_FLOW.indexOf(current as (typeof STATUS_FLOW)[number]);
  const next = idx >= 0 && idx < STATUS_FLOW.length - 1 ? STATUS_FLOW[idx + 1] : null;
  if (!next) return;
  await supabase.from("shipments").update({ status: next }).eq("id", id);
  revalidatePath("/admin");
}

export async function deleteShipment(id: string) {
  const supabase = await createClient();
  await supabase.from("shipments").delete().eq("id", id);
  revalidatePath("/admin");
}

export async function updateQuoteStatus(id: string, status: QuoteStatus) {
  const supabase = await createClient();
  await supabase.from("quotes").update({ status }).eq("id", id);
  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
