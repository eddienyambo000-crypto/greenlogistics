"use server";

import { SITE } from "@/lib/site";

export type QuoteState = {
  ok: boolean;
  message: string;
  errors?: Record<string, string>;
};

function str(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v.trim() : "";
}

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  // Honeypot — bots fill this hidden field.
  if (str(formData.get("company_website"))) {
    return { ok: true, message: "Thanks! We'll be in touch shortly." };
  }

  const data = {
    name: str(formData.get("name")),
    email: str(formData.get("email")),
    phone: str(formData.get("phone")),
    service: str(formData.get("service")),
    cargo_type: str(formData.get("cargo_type")),
    origin: str(formData.get("origin")),
    destination: str(formData.get("destination")),
    weight_kg: str(formData.get("weight_kg")),
    message: str(formData.get("message")),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Please enter your name.";
  if (!data.phone && !data.email)
    errors.phone = "Add a phone or email so we can reach you.";
  if (Object.keys(errors).length) {
    return { ok: false, message: "Please fix the highlighted fields.", errors };
  }

  const weightNum = data.weight_kg ? Number(data.weight_kg) : null;

  // 1) Store in Supabase (skipped gracefully if env not configured yet)
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      await supabase.from("quotes").insert({
        name: data.name,
        email: data.email || null,
        phone: data.phone || null,
        service: data.service || null,
        cargo_type: data.cargo_type || null,
        origin: data.origin || null,
        destination: data.destination || null,
        weight_kg: Number.isFinite(weightNum as number) ? weightNum : null,
        message: data.message || null,
      });
    } catch (e) {
      console.error("Supabase quote insert failed:", e);
      // don't block — Formspree below still captures the lead
    }
  }

  // 2) Email notification via Formspree (the inbox ping)
  try {
    const res = await fetch(SITE.formspree, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `New quote request — ${data.name}`,
        ...data,
      }),
    });
    if (!res.ok) throw new Error(`Formspree ${res.status}`);
  } catch (e) {
    console.error("Formspree submit failed:", e);
    return {
      ok: false,
      message:
        "Something went wrong sending your request. Please WhatsApp us or try again.",
    };
  }

  return {
    ok: true,
    message: "Thanks! Your request is in — we'll get back to you shortly.",
  };
}
