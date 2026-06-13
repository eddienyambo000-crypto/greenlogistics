"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  Trash2,
  Loader2,
  Check,
  ImageIcon,
  Film,
  Save,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { saveSetting } from "@/app/admin/actions";
import type { Settings } from "@/lib/settings";

const field =
  "w-full rounded-lg border border-white/12 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-brand-glow focus:outline-none";

/* ---------------- Media slot (image / video upload) ---------------- */
function MediaSlot({
  slotKey,
  label,
  kind,
  current,
}: {
  slotKey: string;
  label: string;
  kind: "image" | "video";
  current?: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setErr("");

    if (kind === "video" && file.size > 12 * 1024 * 1024) {
      setErr("Video is over 12MB — compress to ~1080p for fast loading.");
      return;
    }
    setBusy(true);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || (kind === "video" ? "mp4" : "jpg");
      const path = `${slotKey}-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: true, cacheControl: "3600" });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      const res = await saveSetting(slotKey, data.publicUrl);
      if (!res.ok) throw new Error(res.message);
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed.");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  async function remove() {
    setBusy(true);
    await saveSetting(slotKey, null);
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="relative aspect-video bg-[#0a1410]">
        {current ? (
          kind === "video" ? (
            <video
              src={current}
              className="h-full w-full object-cover"
              muted
              loop
              autoPlay
              playsInline
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={current}
              alt={label}
              className="h-full w-full object-cover"
            />
          )
        ) : (
          <div className="mesh-green grain absolute inset-0 grid place-items-center">
            {kind === "video" ? (
              <Film className="h-8 w-8 text-white/40" />
            ) : (
              <ImageIcon className="h-8 w-8 text-white/40" />
            )}
          </div>
        )}
        {current && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-emerald-500/80 px-2 py-0.5 text-[10px] font-semibold text-white">
            <Check className="h-3 w-3" /> set
          </span>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-black/50">
            <Loader2 className="h-7 w-7 animate-spin text-white" />
          </div>
        )}
      </div>

      <div className="p-3">
        <p className="truncate text-sm font-medium text-white">{label}</p>
        {err && <p className="mt-1 text-xs text-red-300">{err}</p>}
        <div className="mt-2 flex items-center gap-2">
          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-brand-bright px-3 py-1.5 text-xs font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95">
            <Upload className="h-3.5 w-3.5" />
            {current ? "Replace" : "Upload"}
            <input
              type="file"
              accept={kind === "video" ? "video/mp4,video/webm" : "image/*"}
              onChange={onFile}
              disabled={busy}
              className="hidden"
            />
          </label>
          {current && (
            <button
              onClick={remove}
              disabled={busy}
              className="grid h-7 w-7 place-items-center rounded-lg bg-white/5 text-red-300 transition-colors hover:bg-red-500/20"
              title="Remove"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Text slot ---------------- */
function TextSlot({
  slotKey,
  label,
  placeholder,
  current,
  wide,
}: {
  slotKey: string;
  label: string;
  placeholder?: string;
  current?: string;
  wide?: boolean;
}) {
  const router = useRouter();
  const [val, setVal] = useState(current ?? "");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = val !== (current ?? "");

  async function save() {
    setBusy(true);
    await saveSetting(slotKey, val);
    setBusy(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
    router.refresh();
  }

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="mb-1 block text-xs text-white/50">{label}</label>
      <div className="flex gap-2">
        {wide ? (
          <textarea
            rows={2}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={placeholder}
            className={`${field} resize-y`}
          />
        ) : (
          <input
            value={val}
            onChange={(e) => setVal(e.target.value)}
            placeholder={placeholder}
            className={field}
          />
        )}
        <button
          onClick={save}
          disabled={busy || !dirty}
          className="shrink-0 self-start rounded-lg bg-brand-bright px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"
          title="Save"
        >
          {busy ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function Group({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/10 p-5">
      <h3 className="font-display mb-4 text-sm font-bold uppercase tracking-wide text-brand-glow">
        {title}
      </h3>
      {children}
    </div>
  );
}

/* ---------------- Panel ---------------- */
const SERVICE_SLOTS: [string, string][] = [
  ["img_service_custom", "Custom Logistics"],
  ["img_service_customs", "Customs Clearance"],
  ["img_service_door", "Door-to-Door"],
  ["img_service_warehousing", "Warehousing"],
  ["img_service_transport", "Cargo Transport"],
  ["img_service_distribution", "Distribution"],
];

export default function ContentPanel({ settings }: { settings: Settings }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <div className="border-b border-white/10 p-5">
        <h2 className="font-display text-lg font-bold text-white">
          Site content
        </h2>
        <p className="text-sm text-white/50">
          Upload media and edit text — changes go live instantly.
        </p>
      </div>

      <Group title="Hero">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MediaSlot
            slotKey="hero_video"
            label="Background video (≤12MB, 1080p)"
            kind="video"
            current={settings.hero_video}
          />
          <MediaSlot
            slotKey="hero_poster"
            label="Hero poster image"
            kind="image"
            current={settings.hero_poster}
          />
        </div>
      </Group>

      <Group title="Section images">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <MediaSlot
            slotKey="img_why_magerwa"
            label="Why Magerwa"
            kind="image"
            current={settings.img_why_magerwa}
          />
          <MediaSlot
            slotKey="img_about_story"
            label="About — our story"
            kind="image"
            current={settings.img_about_story}
          />
        </div>
      </Group>

      <Group title="Service images">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_SLOTS.map(([k, l]) => (
            <MediaSlot
              key={k}
              slotKey={k}
              label={l}
              kind="image"
              current={settings[k]}
            />
          ))}
        </div>
      </Group>

      <Group title="Team">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-2">
              <MediaSlot
                slotKey={`team_${n}`}
                label={`Photo ${n}`}
                kind="image"
                current={settings[`team_${n}`]}
              />
              <TextSlot
                slotKey={`team_${n}_name`}
                label="Name"
                placeholder="Full name"
                current={settings[`team_${n}_name`]}
              />
              <TextSlot
                slotKey={`team_${n}_role`}
                label="Role"
                placeholder="Role"
                current={settings[`team_${n}_role`]}
              />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Homepage stats">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="space-y-2 rounded-xl border border-white/10 p-3">
              <TextSlot
                slotKey={`stat_${n}_value`}
                label={`Stat ${n} value`}
                placeholder="e.g. 500+"
                current={settings[`stat_${n}_value`]}
              />
              <TextSlot
                slotKey={`stat_${n}_label`}
                label="Label"
                placeholder="e.g. Shipments"
                current={settings[`stat_${n}_label`]}
              />
            </div>
          ))}
        </div>
      </Group>

      <Group title="Testimonial">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextSlot
            slotKey="testimonial_quote"
            label="Quote"
            placeholder="What a client said…"
            current={settings.testimonial_quote}
            wide
          />
          <TextSlot
            slotKey="testimonial_author"
            label="Author"
            placeholder="Name, Company · Kigali"
            current={settings.testimonial_author}
          />
        </div>
      </Group>
    </section>
  );
}
