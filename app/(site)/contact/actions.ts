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

  // 2) Email notification — Resend (preferred, from our own domain) with
  //    Formspree as fallback. Best-effort: the lead is already saved in the
  //    database (admin dashboard), so we never block the user on email.
  const summary = [
    `New quote request from ${data.name}`,
    "",
    `Phone:       ${data.phone || "—"}`,
    `Email:       ${data.email || "—"}`,
    `Service:     ${data.service || "—"}`,
    `Cargo:       ${data.cargo_type || "—"}`,
    `Route:       ${data.origin || "—"} → ${data.destination || "—"}`,
    `Weight (kg): ${data.weight_kg || "—"}`,
    "",
    `Message:`,
    data.message || "—",
  ].join("\n");

  let emailed = false;

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: process.env.QUOTE_FROM || "Green Logistics <onboarding@resend.dev>",
        to: process.env.QUOTE_NOTIFY_EMAIL || SITE.email,
        replyTo: data.email || undefined,
        subject: `New quote request — ${data.name}`,
        text: summary,
      });
      if (error) throw error;
      emailed = true;
    } catch (e) {
      console.error("Resend failed:", e);
    }
  }

  if (!emailed) {
    try {
      // Form-encoded (not JSON) — the format Formspree accepts on all forms.
      const params = new URLSearchParams();
      params.set("_subject", `New quote request — ${data.name}`);
      for (const [k, v] of Object.entries(data)) if (v) params.set(k, v);
      const res = await fetch(SITE.formspree, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: params.toString(),
      });
      emailed = res.ok;
    } catch (e) {
      console.error("Formspree submit failed:", e);
    }
  }

  return {
    ok: true,
    message: "Thanks! Your request is in — we'll get back to you shortly.",
  };
}
