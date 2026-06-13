import Link from "next/link";
import { Package, Truck, CheckCircle2, Inbox, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import Logo from "@/components/Logo";
import SignOutButton from "@/components/admin/SignOutButton";
import ShipmentsPanel from "@/components/admin/ShipmentsPanel";
import QuotesPanel from "@/components/admin/QuotesPanel";
import ContentPanel from "@/components/admin/ContentPanel";
import AdminTabs from "@/components/admin/AdminTabs";
import { getSettings } from "@/lib/settings";
import type { Shipment, Quote } from "@/lib/db-types";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <div className="grid min-h-dvh place-items-center px-5 text-center text-white">
        <div className="glass max-w-md rounded-3xl p-8">
          <h1 className="font-display text-2xl font-bold">Backend not connected</h1>
          <p className="mt-3 text-white/70">
            Add your Supabase keys to{" "}
            <span className="font-mono text-brand-glow">.env.local</span> and run
            the SQL in{" "}
            <span className="font-mono text-brand-glow">supabase/schema.sql</span>{" "}
            to activate the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: shipments }, { data: quotes }, settings] = await Promise.all([
    supabase.from("shipments").select("*").order("created_at", { ascending: false }),
    supabase.from("quotes").select("*").order("created_at", { ascending: false }),
    getSettings(),
  ]);

  const ships = (shipments ?? []) as Shipment[];
  const leads = (quotes ?? []) as Quote[];

  const active = ships.filter(
    (s) => s.status !== "delivered" && s.status !== "exception",
  ).length;
  const inTransit = ships.filter((s) =>
    ["picked_up", "in_transit", "at_warehouse", "out_for_delivery"].includes(
      s.status,
    ),
  ).length;
  const delivered = ships.filter((s) => s.status === "delivered").length;
  const newLeads = leads.filter((q) => q.status === "new").length;

  const kpis = [
    { icon: Package, label: "Active shipments", value: active, tint: "text-brand-glow" },
    { icon: Truck, label: "In transit", value: inTransit, tint: "text-amber-300" },
    { icon: CheckCircle2, label: "Delivered", value: delivered, tint: "text-emerald-300" },
    { icon: Inbox, label: "New leads", value: newLeads, tint: "text-sky-300" },
  ];

  return (
    <div className="text-white">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#0d1512]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Logo variant="light" />
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white sm:inline-flex"
            >
              View site <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <span className="hidden text-sm text-white/50 md:inline">
              {user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">
          Operations dashboard
        </h1>
        <p className="mt-1 text-white/55">
          Manage shipments, tracking updates, and incoming leads.
        </p>

        {/* KPIs */}
        <div className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <k.icon className={`h-6 w-6 ${k.tint}`} strokeWidth={1.8} />
              <p className="font-display mt-3 text-3xl font-bold">{k.value}</p>
              <p className="text-sm text-white/55">{k.label}</p>
            </div>
          ))}
        </div>

        <AdminTabs
          operations={
            <div className="space-y-10">
              <ShipmentsPanel shipments={ships} />
              <QuotesPanel quotes={leads} />
            </div>
          }
          content={<ContentPanel settings={settings} />}
        />
      </main>
    </div>
  );
}
