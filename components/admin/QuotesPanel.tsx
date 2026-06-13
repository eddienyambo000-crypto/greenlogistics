"use client";

import { useState, useTransition } from "react";
import { ChevronDown, Mail, Phone, MessageSquare } from "lucide-react";
import { updateQuoteStatus } from "@/app/admin/actions";
import type { Quote, QuoteStatus } from "@/lib/db-types";

const STATUSES: QuoteStatus[] = ["new", "contacted", "quoted", "won", "lost"];

const tone: Record<QuoteStatus, string> = {
  new: "bg-sky-400/15 text-sky-200 border-sky-400/20",
  contacted: "bg-amber-400/15 text-amber-200 border-amber-400/20",
  quoted: "bg-violet-400/15 text-violet-200 border-violet-400/20",
  won: "bg-emerald-400/20 text-emerald-200 border-emerald-400/25",
  lost: "bg-white/5 text-white/40 border-white/10",
};

export default function QuotesPanel({ quotes }: { quotes: Quote[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const [pending, start] = useTransition();

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Quote requests</h2>
          <p className="text-sm text-white/50">{quotes.length} leads</p>
        </div>
      </div>

      {quotes.length === 0 ? (
        <p className="p-8 text-center text-sm text-white/45">
          No leads yet. They&apos;ll appear here when someone submits the quote
          form.
        </p>
      ) : (
        <ul className="divide-y divide-white/[0.06]">
          {quotes.map((quote) => {
            const isOpen = open === quote.id;
            return (
              <li key={quote.id} className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-white">{quote.name}</p>
                      <span className="font-mono text-xs text-white/40">
                        {new Date(quote.created_at).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/55">
                      {quote.phone && (
                        <a
                          href={`tel:${quote.phone}`}
                          className="inline-flex items-center gap-1.5 hover:text-white"
                        >
                          <Phone className="h-3.5 w-3.5" />
                          {quote.phone}
                        </a>
                      )}
                      {quote.email && (
                        <a
                          href={`mailto:${quote.email}`}
                          className="inline-flex items-center gap-1.5 hover:text-white"
                        >
                          <Mail className="h-3.5 w-3.5" />
                          {quote.email}
                        </a>
                      )}
                      {quote.service && (
                        <span className="text-white/70">{quote.service}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={quote.status}
                      disabled={pending}
                      onChange={(e) =>
                        start(() =>
                          updateQuoteStatus(
                            quote.id,
                            e.target.value as QuoteStatus,
                          ),
                        )
                      }
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium capitalize focus:outline-none ${tone[quote.status]}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-[#0d1512] text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    {(quote.message || quote.origin || quote.cargo_type) && (
                      <button
                        onClick={() => setOpen(isOpen ? null : quote.id)}
                        className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/60 transition-colors hover:bg-white/10"
                        aria-label="Toggle details"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="mt-4 grid gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm sm:grid-cols-2">
                    {(quote.origin || quote.destination) && (
                      <Detail
                        label="Route"
                        value={`${quote.origin || "—"} → ${quote.destination || "—"}`}
                      />
                    )}
                    {quote.cargo_type && (
                      <Detail label="Cargo" value={quote.cargo_type} />
                    )}
                    {quote.weight_kg != null && (
                      <Detail label="Weight" value={`${quote.weight_kg} kg`} />
                    )}
                    {quote.message && (
                      <div className="sm:col-span-2">
                        <p className="mb-1 flex items-center gap-1.5 text-xs uppercase tracking-wide text-white/40">
                          <MessageSquare className="h-3.5 w-3.5" /> Message
                        </p>
                        <p className="text-white/75">{quote.message}</p>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-0.5 text-white/75">{value}</p>
    </div>
  );
}
