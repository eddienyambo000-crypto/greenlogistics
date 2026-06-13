"use client";

import { useMemo, useState, useTransition } from "react";
import { useFormStatus } from "react-dom";
import {
  Plus,
  Search,
  ChevronRight,
  Trash2,
  X,
  Loader2,
  Pencil,
} from "lucide-react";
import Icon from "@/components/Icon";
import {
  createShipment,
  updateShipment,
  advanceShipment,
  deleteShipment,
} from "@/app/admin/actions";
import {
  STATUS_FLOW,
  STATUS_META,
  SERVICES,
  type ShipmentStatus,
} from "@/lib/site";
import type { Shipment } from "@/lib/db-types";

const ALL_STATUSES: ShipmentStatus[] = [...STATUS_FLOW, "exception"];

const badgeTone: Record<ShipmentStatus, string> = {
  pending: "bg-white/10 text-white/80",
  picked_up: "bg-sky-400/15 text-sky-200",
  in_transit: "bg-amber-400/15 text-amber-200",
  at_warehouse: "bg-violet-400/15 text-violet-200",
  out_for_delivery: "bg-blue-400/15 text-blue-200",
  delivered: "bg-emerald-400/20 text-emerald-200",
  exception: "bg-red-400/15 text-red-200",
};

const field =
  "w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-brand-glow focus:outline-none";

function CreateBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-bright px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      Create shipment
    </button>
  );
}

function SaveBtn() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-1.5 rounded-lg bg-brand-bright px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
    >
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
    </button>
  );
}

export default function ShipmentsPanel({
  shipments,
}: {
  shipments: Shipment[];
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [filter, setFilter] = useState<ShipmentStatus | "all">("all");
  const [q, setQ] = useState("");
  const [pending, start] = useTransition();

  const filtered = useMemo(() => {
    return shipments.filter((s) => {
      if (filter !== "all" && s.status !== filter) return false;
      if (q) {
        const hay = `${s.tracking_number} ${s.origin} ${s.destination} ${s.receiver_name} ${s.cargo_type}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [shipments, filter, q]);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-5">
        <div>
          <h2 className="font-display text-lg font-bold">Shipments</h2>
          <p className="text-sm text-white/50">{shipments.length} total</p>
        </div>
        <button
          onClick={() => {
            setShowCreate((v) => !v);
            setEditing(null);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-brand-bright px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
        >
          {showCreate ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showCreate ? "Close" : "New shipment"}
        </button>
      </div>

      {/* create form */}
      {showCreate && (
        <form
          action={async (fd) => {
            await createShipment(fd);
            setShowCreate(false);
          }}
          className="border-b border-white/10 bg-white/[0.02] p-5"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <select name="status" defaultValue="pending" className={field}>
              {ALL_STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#0d1512]">
                  {STATUS_META[s].label}
                </option>
              ))}
            </select>
            <select name="service" defaultValue="" className={field}>
              <option value="" className="bg-[#0d1512]">Service…</option>
              {SERVICES.map((s) => (
                <option key={s.key} value={s.title} className="bg-[#0d1512]">
                  {s.title}
                </option>
              ))}
            </select>
            <input name="cargo_type" placeholder="Cargo type" className={field} />
            <input name="origin" placeholder="Origin" className={field} />
            <input name="destination" placeholder="Destination" className={field} />
            <input name="current_location" placeholder="Current location" className={field} />
            <input name="receiver_name" placeholder="Receiver name" className={field} />
            <input name="receiver_phone" placeholder="Receiver phone" className={field} />
            <input name="weight_kg" type="number" min="0" placeholder="Weight (kg)" className={field} />
            <input name="sender_name" placeholder="Sender name" className={field} />
            <input name="sender_phone" placeholder="Sender phone" className={field} />
            <input
              name="estimated_delivery"
              type="date"
              className={`${field} [color-scheme:dark]`}
            />
          </div>
          <textarea
            name="notes"
            rows={2}
            placeholder="Internal notes (optional)"
            className={`${field} mt-3 resize-y`}
          />
          <div className="mt-3">
            <CreateBtn />
          </div>
        </form>
      )}

      {/* filters */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-4">
        <div className="relative grow sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tracking, route, client…"
            className={`${field} pl-9`}
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {(["all", ...ALL_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === s
                  ? "bg-brand-bright text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {s === "all" ? "All" : STATUS_META[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        {filtered.length === 0 ? (
          <p className="p-8 text-center text-sm text-white/45">
            No shipments match. Create one to get started.
          </p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wide text-white/45">
                <th className="px-5 py-3 font-medium">Tracking #</th>
                <th className="px-5 py-3 font-medium">Route</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <RowGroup
                  key={s.id}
                  s={s}
                  editing={editing === s.id}
                  onEdit={() =>
                    setEditing((cur) => (cur === s.id ? null : s.id))
                  }
                  onAdvance={() => start(() => advanceShipment(s.id, s.status))}
                  onDelete={() => {
                    if (confirm(`Delete ${s.tracking_number}? This can't be undone.`))
                      start(() => deleteShipment(s.id));
                  }}
                  busy={pending}
                />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

function RowGroup({
  s,
  editing,
  onEdit,
  onAdvance,
  onDelete,
  busy,
}: {
  s: Shipment;
  editing: boolean;
  onEdit: () => void;
  onAdvance: () => void;
  onDelete: () => void;
  busy: boolean;
}) {
  const idx = STATUS_FLOW.indexOf(s.status as (typeof STATUS_FLOW)[number]);
  const canAdvance = idx >= 0 && idx < STATUS_FLOW.length - 1;
  return (
    <>
      <tr className="border-b border-white/[0.06] align-middle hover:bg-white/[0.02]">
        <td className="px-5 py-3.5 font-mono text-xs text-white">
          {s.tracking_number}
        </td>
        <td className="px-5 py-3.5 text-white/70">
          {(s.origin || "—") + " → " + (s.destination || "—")}
        </td>
        <td className="px-5 py-3.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${badgeTone[s.status]}`}
          >
            <Icon name={STATUS_META[s.status].icon} className="h-3.5 w-3.5" />
            {STATUS_META[s.status].label}
          </span>
        </td>
        <td className="px-5 py-3.5 text-white/60">{s.current_location || "—"}</td>
        <td className="px-5 py-3.5">
          <div className="flex items-center justify-end gap-1.5">
            {canAdvance && (
              <button
                onClick={onAdvance}
                disabled={busy}
                title="Advance to next status"
                className="inline-flex items-center gap-1 rounded-lg bg-brand/30 px-2.5 py-1.5 text-xs font-medium text-brand-glow transition-colors hover:bg-brand/50 disabled:opacity-50"
              >
                Advance <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
            <button
              onClick={onEdit}
              title="Update status / location"
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/70 transition-colors hover:bg-white/10"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onDelete}
              disabled={busy}
              title="Delete"
              className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-red-300 transition-colors hover:bg-red-500/20 disabled:opacity-50"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </td>
      </tr>
      {editing && (
        <tr className="border-b border-white/[0.06] bg-white/[0.02]">
          <td colSpan={5} className="px-5 py-4">
            <form
              action={async (fd) => {
                await updateShipment(fd);
                onEdit();
              }}
              className="flex flex-wrap items-end gap-3"
            >
              <input type="hidden" name="id" value={s.id} />
              <div>
                <label className="mb-1 block text-xs text-white/50">Status</label>
                <select
                  name="status"
                  defaultValue={s.status}
                  className={field}
                >
                  {ALL_STATUSES.map((st) => (
                    <option key={st} value={st} className="bg-[#0d1512]">
                      {STATUS_META[st].label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grow">
                <label className="mb-1 block text-xs text-white/50">
                  Current location
                </label>
                <input
                  name="current_location"
                  defaultValue={s.current_location ?? ""}
                  placeholder="e.g. Nairobi hub"
                  className={field}
                />
              </div>
              <SaveBtn />
            </form>
          </td>
        </tr>
      )}
    </>
  );
}
