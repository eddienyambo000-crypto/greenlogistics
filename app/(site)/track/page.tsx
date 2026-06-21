import type { Metadata } from "next";
import { Suspense } from "react";
import { PackageSearch, ShieldCheck, Clock4 } from "lucide-react";
import PageHero from "@/components/PageHero";
import TrackPortal from "@/components/TrackPortal";

export const metadata: Metadata = {
  title: "Track Your Shipment",
  description:
    "Track your Green Logistics Rwanda shipment in real time. Enter your tracking number for live status and delivery updates.",
  alternates: { canonical: "/track" },
};

export default function TrackPage() {
  return (
    <>
      <PageHero
        eyebrow="Live tracking"
        crumb="Track Shipment"
        title="Where's your cargo? Find out now."
        subtitle="Enter your tracking number to see live status, location, and estimated delivery — every step of the journey."
      />

      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-mist text-brand">
                <PackageSearch className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-ink">
                  Track a shipment
                </h2>
                <p className="text-sm text-ash">
                  Format: <span className="font-mono">GLR-YYYY-NNNN</span>
                </p>
              </div>
            </div>

            <Suspense fallback={<div className="h-14 animate-pulse rounded-xl bg-paper" />}>
              <TrackPortal />
            </Suspense>
          </div>

          {/* reassurance row */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Clock4, t: "Real-time status", d: "Updated as your cargo moves." },
              { icon: ShieldCheck, t: "Private & secure", d: "Only your shipment, nothing else." },
              { icon: PackageSearch, t: "Full history", d: "Every checkpoint, timestamped." },
            ].map((f) => (
              <div
                key={f.t}
                className="rounded-2xl border border-line bg-white p-5 shadow-soft"
              >
                <f.icon className="h-6 w-6 text-brand" strokeWidth={1.8} />
                <p className="mt-3 font-semibold text-ink">{f.t}</p>
                <p className="text-sm text-ash">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
