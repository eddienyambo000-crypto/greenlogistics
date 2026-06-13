import Link from "next/link";
import {
  ArrowRight,
  MapPin,
  ShieldCheck,
  Truck,
  Warehouse,
  Clock3,
  Quote,
} from "lucide-react";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import StatCounter from "@/components/home/StatCounter";
import ServiceCard from "@/components/ServiceCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SITE, SERVICES, whatsappLink } from "@/lib/site";

const PROCESS = [
  {
    icon: "FileCheck2",
    title: "Request",
    body: "Send us your cargo details. We assess the route, customs needs, and timeline — and come back with a clear quote.",
  },
  {
    icon: "Workflow",
    title: "Plan",
    body: "We design the optimal path: documentation, packaging, fleet, and storage — engineered to cut cost and delay.",
  },
  {
    icon: "Truck",
    title: "Move",
    body: "Your goods travel on our GPS-tracked fleet with experienced drivers. You watch every step in real time.",
  },
  {
    icon: "PackageCheck",
    title: "Deliver",
    body: "Door-to-door handover with proof of delivery. Safe, on time, every time.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: SITE.name,
  description:
    "Premier logistics company in Magerwa, Kigali offering customs clearance, cargo transport, warehousing, door-to-door and distribution across Rwanda.",
  url: SITE.domain,
  telephone: SITE.phone,
  email: SITE.email,
  areaServed: "Rwanda",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Magerwa",
    addressLocality: "Kigali",
    addressCountry: "RW",
  },
  openingHours: "Mo-Sa 08:00-18:00",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <Marquee />

      {/* ---------------- Services ---------------- */}
      <section id="services" className="mesh-light relative py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand">
              What we do
            </span>
            <h2 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-tight text-ink text-balance sm:text-5xl">
              End-to-end logistics, handled with care.
            </h2>
            <p className="mt-4 max-w-xl text-ash">
              One partner for every link in your supply chain — from the border
              to your customer&apos;s doorstep.
            </p>
          </Reveal>

          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <RevealItem key={s.key} className="h-full">
                <ServiceCard
                  icon={s.icon}
                  title={s.title}
                  body={s.body}
                  index={i}
                />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Why Magerwa ---------------- */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-brand-ink shadow-lift">
              {/* IMAGE PLACEHOLDER: Magerwa hub / warehouse exterior */}
              <div className="mesh-green grain absolute inset-0" />
              <div className="absolute inset-0 grid place-items-center text-center">
                <div className="px-6">
                  <MapPin className="mx-auto h-10 w-10 text-brand-glow" />
                  <p className="mt-3 font-display text-2xl font-bold text-white">
                    Magerwa, Kigali
                  </p>
                  <p className="mt-1 text-sm text-white/55">
                    Image placeholder · facility / fleet photo
                  </p>
                </div>
              </div>
              {/* floating stat card */}
              <div className="glass absolute bottom-5 left-5 rounded-2xl px-5 py-4 text-white">
                <p className="font-display text-2xl font-bold">Crossroads</p>
                <p className="text-xs text-white/70">
                  of Rwanda&apos;s import &amp; export trade
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Why Green Logistics
            </span>
            <h2 className="font-display mt-4 text-4xl font-bold leading-tight text-ink text-balance sm:text-5xl">
              We operate where Rwanda&apos;s trade moves.
            </h2>
            <p className="mt-5 text-ash">
              Headquartered in the heart of Magerwa, Kigali&apos;s logistics
              hub, we sit at the crossroads of the country&apos;s import and
              export business. That strategic position lets us clear, move, and
              deliver goods faster — cutting delays and costs for businesses of
              every size.
            </p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, t: "Customs experts", d: "Full documentation & compliance handled in-house." },
                { icon: Truck, t: "GPS-tracked fleet", d: "Experienced, vetted drivers you can trust." },
                { icon: Warehouse, t: "Secure warehousing", d: "Climate-controlled storage, monitored 24/7." },
                { icon: Clock3, t: "On-time, every time", d: "Timelines we plan for and hit." },
              ].map((f) => (
                <li key={f.t} className="flex gap-3.5">
                  <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-mist text-brand">
                    <f.icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{f.t}</p>
                    <p className="text-sm text-ash">{f.d}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full border border-brand/20 px-6 py-3.5 text-sm font-semibold text-brand transition-colors hover:bg-brand-mist"
            >
              More about us
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Process ---------------- */}
      <section className="mesh-light py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-2xl">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand">
              How it works
            </span>
            <h2 className="font-display mt-4 text-4xl font-bold leading-tight text-ink text-balance sm:text-5xl">
              Four steps from request to delivered.
            </h2>
          </Reveal>

          <RevealGroup className="relative mt-14 grid gap-6 md:grid-cols-4">
            {/* connector line */}
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand/25 to-transparent md:block" />
            {PROCESS.map((p, i) => (
              <RevealItem key={p.title}>
                <div className="relative">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white shadow-glow">
                    <span className="font-display text-lg font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ash">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------------- Stats band ---------------- */}
      <section className="mesh-green grain relative overflow-hidden py-20 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <h2 className="font-display text-3xl font-bold text-balance sm:text-4xl">
              Built for businesses that can&apos;t afford to wait.
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-8 rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-10 lg:grid-cols-4">
            {/* Stats are placeholders — confirm real numbers with client */}
            <StatCounter value={500} suffix="+" label="Shipments delivered" />
            <StatCounter value={99} suffix="%" label="On-time delivery" />
            <StatCounter value={24} suffix="/7" label="Cargo monitoring" />
            <StatCounter value={50} suffix="+" label="Businesses served" />
          </div>
          <p className="mt-4 font-mono text-[11px] text-white/40">
            * Figures shown are placeholders — to be replaced with verified
            numbers.
          </p>
        </div>
      </section>

      {/* ---------------- Mission / Vision ---------------- */}
      <section className="bg-white py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-line bg-paper p-9 shadow-soft">
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-brand">
                  Our mission
                </span>
                <p className="font-display mt-5 text-2xl font-semibold leading-snug text-ink sm:text-[28px]">
                  To simplify logistics across Rwanda by delivering timely,
                  reliable, and cost-effective solutions that fuel business
                  growth — and keep the country moving.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mesh-green grain relative h-full overflow-hidden rounded-3xl p-9 text-white shadow-lift">
                <span className="relative font-mono text-xs uppercase tracking-[0.22em] text-brand-glow">
                  Our vision
                </span>
                <p className="font-display relative mt-5 text-2xl font-semibold leading-snug sm:text-[28px]">
                  To become Rwanda&apos;s most trusted logistics partner —
                  setting the national standard for speed, transparency, and
                  customer care.
                </p>
              </div>
            </Reveal>
          </div>

          {/* testimonial placeholder */}
          <Reveal delay={0.05}>
            <figure className="mt-6 rounded-3xl border border-line bg-paper p-9 shadow-soft">
              <Quote className="h-8 w-8 text-brand/30" />
              <blockquote className="font-display mt-4 max-w-3xl text-xl font-medium leading-relaxed text-ink sm:text-2xl">
                “Placeholder for a client testimonial — swap in a real quote
                once Green Logistics shares one. This builds instant trust right
                where buyers decide.”
              </blockquote>
              <figcaption className="mt-5 text-sm text-ash">
                — Client name, Company · <span className="text-brand">Kigali</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Final CTA ---------------- */}
      <section className="bg-paper pb-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-ink px-8 py-14 text-center text-white shadow-lift sm:px-12 sm:py-20">
            <div className="mesh-green absolute inset-0 opacity-90" />
            <div className="relative z-10">
              <h2 className="font-display mx-auto max-w-2xl text-4xl font-bold leading-tight text-balance sm:text-5xl">
                Let&apos;s move your goods with{" "}
                <span className="text-grad-green">precision.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/70">
                Get a fast, competitive quote today — or message us on WhatsApp
                and talk to a real person.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-bright px-8 py-4 text-base font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  Get a Quote
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
