"use client";

import { useActionState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { motion } from "motion/react";
import {
  Search,
  Loader2,
  PackageX,
  MapPin,
  CalendarClock,
  ArrowRight,
  TriangleAlert,
  Info,
} from "lucide-react";
import Icon from "@/components/Icon";
import { trackShipment, type TrackState } from "@/app/(site)/track/actions";
import { STATUS_FLOW, STATUS_META, type ShipmentStatus } from "@/lib/site";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function SearchBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-bright px-7 py-4 font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-70"
    >
      {pending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Search className="h-5 w-5" />
      )}
      <span>{pending ? "Tracking…" : "Track"}</span>
    </button>
  );
}

export default function TrackPortal() {
  const params = useSearchParams();
  const initialNumber = params.get("number") ?? "";
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState<TrackState, FormData>(trackShipment, {
    status: "idle",
  });

  // Auto-run if a number is in the URL (deep link / hero pill).
  useEffect(() => {
    if (initialNumber) formRef.current?.requestSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form
        ref={formRef}
        action={action}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ash" />
          <input
            name="number"
            defaultValue={initialNumber}
            placeholder="Enter tracking number — e.g. GLR-2026-0001"
            autoComplete="off"
            spellCheck={false}
            className="w-full rounded-xl border border-line bg-white py-4 pl-12 pr-4 font-mono text-ink placeholder:font-sans placeholder:text-ash/70 focus:border-brand focus:outline-none"
          />
        </div>
        <SearchBtn />
      </form>

      <div className="mt-8">
        {state.status === "unconfigured" && (
          <Notice
            icon={<Info className="h-5 w-5" />}
            title="Tracking is going live soon"
            body="The tracking system is being connected. In the meantime, contact us and we'll give you a live update."
          />
        )}

        {state.status === "error" && (
          <Notice
            icon={<TriangleAlert className="h-5 w-5" />}
            title="Something went wrong"
            body={state.message}
            tone="warn"
          />
        )}

        {state.status === "notfound" && (
          <Notice
            icon={<PackageX className="h-5 w-5" />}
            title={`No shipment found for “${state.query}”`}
            body="Double-check the tracking number — it looks like GLR-YYYY-NNNN. Still stuck? Reach out and we'll help."
            tone="warn"
          />
        )}

        {state.status === "found" && <Result state={state} />}
      </div>
    </div>
  );
}

function Notice({
  icon,
  title,
  body,
  tone = "info",
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tone?: "info" | "warn";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-start gap-3 rounded-2xl border p-6 ${
        tone === "warn"
          ? "border-amber-200 bg-amber-50 text-amber-800"
          : "border-brand/15 bg-brand-mist/50 text-ink"
      }`}
    >
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="font-display font-bold">{title}</p>
        <p className="mt-1 text-sm opacity-80">{body}</p>
      </div>
    </motion.div>
  );
}

function Result({ state }: { state: Extract<TrackState, { status: "found" }> }) {
  const { shipment, events } = state.data;
  const status = shipment.status as ShipmentStatus;
  const isException = status === "exception";
  const currentIndex = STATUS_FLOW.indexOf(
    status as (typeof STATUS_FLOW)[number],
  );
  const pct =
    currentIndex < 0
      ? 0
      : (currentIndex / (STATUS_FLOW.length - 1)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift"
    >
      {/* Header */}
      <div className="mesh-green grain relative overflow-hidden p-6 text-white sm:p-8">
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-glow">
              Tracking number
            </p>
            <p className="font-display mt-1 text-2xl font-bold">
              {shipment.tracking_number}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              isException
                ? "bg-amber-400/20 text-amber-200"
                : status === "delivered"
                  ? "bg-brand-glow/25 text-white"
                  : "bg-white/12 text-white"
            }`}
          >
            <Icon name={STATUS_META[status].icon} className="h-4 w-4" />
            {STATUS_META[status].label}
          </span>
        </div>

        {/* Route + meta */}
        <div className="relative mt-6 grid gap-4 sm:grid-cols-3">
          <Meta
            label="Route"
            value={
              <span className="flex items-center gap-1.5">
                {shipment.origin || "—"}
                <ArrowRight className="h-3.5 w-3.5 text-brand-glow" />
                {shipment.destination || "—"}
              </span>
            }
          />
          <Meta
            label="Current location"
            value={
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-brand-glow" />
                {shipment.current_location || "In handling"}
              </span>
            }
          />
          <Meta
            label="Est. delivery"
            value={
              <span className="flex items-center gap-1.5">
                <CalendarClock className="h-3.5 w-3.5 text-brand-glow" />
                {shipment.estimated_delivery
                  ? new Date(shipment.estimated_delivery).toLocaleDateString(
                      "en-GB",
                      { day: "2-digit", month: "short", year: "numeric" },
                    )
                  : "TBC"}
              </span>
            }
          />
        </div>
      </div>

      {/* Progress stepper */}
      <div className="border-b border-line p-6 sm:p-8">
        {isException ? (
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <TriangleAlert className="h-5 w-5 shrink-0" />
            <p className="text-sm">
              This shipment has an exception. Our team is on it — contact us for
              the latest.
            </p>
          </div>
        ) : (
          <>
            <div className="relative">
              {/* track */}
              <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-line" />
              <motion.div
                className="absolute left-0 top-5 h-1 rounded-full bg-brand-bright"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              />
              <ol className="relative flex justify-between">
                {STATUS_FLOW.map((s, i) => {
                  const done = i <= currentIndex;
                  const isCurrent = i === currentIndex;
                  return (
                    <li
                      key={s}
                      className="flex flex-1 flex-col items-center text-center"
                    >
                      <motion.span
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 + i * 0.08 }}
                        className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border-2 transition-colors ${
                          done
                            ? "border-brand-bright bg-brand-bright text-white"
                            : "border-line bg-white text-ash"
                        }`}
                      >
                        {isCurrent && (
                          <span className="absolute inset-0 rounded-full bg-brand-bright/40 animate-pulse-ring" />
                        )}
                        <Icon
                          name={STATUS_META[s].icon}
                          className="h-5 w-5"
                          strokeWidth={2}
                        />
                      </motion.span>
                      <span
                        className={`mt-2 hidden text-xs font-medium sm:block ${
                          done ? "text-ink" : "text-ash"
                        }`}
                      >
                        {STATUS_META[s].label}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mt-3 text-center text-sm font-medium text-brand sm:hidden">
              {STATUS_META[status].label}
            </p>
          </>
        )}
      </div>

      {/* Event timeline */}
      <div className="p-6 sm:p-8">
        <h3 className="font-display text-lg font-bold text-ink">
          Shipment history
        </h3>
        <ol className="mt-5 space-y-0">
          {[...events].reverse().map((e, i) => (
            <li key={e.id} className="relative flex gap-4 pb-6 last:pb-0">
              {i !== events.length - 1 && (
                <span className="absolute left-[15px] top-8 h-full w-px bg-line" />
              )}
              <span
                className={`relative z-10 mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                  i === 0
                    ? "bg-brand text-white"
                    : "bg-brand-mist text-brand"
                }`}
              >
                <Icon name={STATUS_META[e.status].icon} className="h-4 w-4" />
              </span>
              <div className="pt-0.5">
                <p className="font-semibold text-ink">
                  {STATUS_META[e.status].label}
                </p>
                <p className="text-sm text-ash">
                  {[e.location, e.note].filter(Boolean).join(" · ") ||
                    "Status updated"}
                </p>
                <p className="mt-0.5 font-mono text-xs text-ash/80">
                  {fmt(e.created_at)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </motion.div>
  );
}

function Meta({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="glass rounded-2xl px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}
