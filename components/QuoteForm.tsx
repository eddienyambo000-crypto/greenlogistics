"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Loader2, Send } from "lucide-react";
import { submitQuote, type QuoteState } from "@/app/(site)/contact/actions";
import { SERVICES } from "@/lib/site";

const initial: QuoteState = { ok: false, message: "" };

const inputCls =
  "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-ash/60 transition-colors focus:border-brand focus:bg-white focus:outline-none";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-bright px-6 py-4 text-base font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> Sending…
        </>
      ) : (
        <>
          Send request
          <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </>
      )}
    </button>
  );
}

export default function QuoteForm({
  defaultService = "",
}: {
  defaultService?: string;
}) {
  const [state, formAction] = useActionState(submitQuote, initial);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  if (state.ok) {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-4 rounded-3xl border border-brand/15 bg-brand-mist/50 px-6 py-14 text-center"
      >
        <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-white shadow-glow">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="font-display text-2xl font-bold text-ink">
          Request received!
        </h3>
        <p className="max-w-sm text-ash">{state.message}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      {state.message && !state.ok && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </div>
      )}

      {/* honeypot */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full name <span className="text-brand-bright">*</span>
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Jean Habimana"
            className={inputCls}
          />
          {state.errors?.name && (
            <p className="mt-1.5 text-xs text-red-600">{state.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>
            Phone <span className="text-brand-bright">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+250 7xx xxx xxx"
            className={inputCls}
          />
          {state.errors?.phone && (
            <p className="mt-1.5 text-xs text-red-600">{state.errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelCls}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="service" className={labelCls}>
            Service needed
          </label>
          <select
            id="service"
            name="service"
            defaultValue={defaultService}
            className={inputCls}
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s.key} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other / Not sure">Other / Not sure</option>
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="origin" className={labelCls}>
            From (origin)
          </label>
          <input
            id="origin"
            name="origin"
            placeholder="e.g. Mombasa"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="destination" className={labelCls}>
            To (destination)
          </label>
          <input
            id="destination"
            name="destination"
            placeholder="e.g. Kigali"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="weight_kg" className={labelCls}>
            Weight (kg)
          </label>
          <input
            id="weight_kg"
            name="weight_kg"
            type="number"
            inputMode="numeric"
            min="0"
            placeholder="e.g. 1200"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cargo_type" className={labelCls}>
          What are you shipping?
        </label>
        <input
          id="cargo_type"
          name="cargo_type"
          placeholder="e.g. Electronics, perishables, machinery…"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tell us about timelines, special handling, or anything else…"
          className={`${inputCls} resize-y`}
        />
      </div>

      <SubmitBtn />
      <p className="text-xs text-ash">
        By submitting, you agree to be contacted about your request. We never
        share your details.
      </p>
    </form>
  );
}
