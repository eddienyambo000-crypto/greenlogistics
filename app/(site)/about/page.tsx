import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, MapPin, Heart, ShieldCheck, Zap, Users } from "lucide-react";
import PageHero from "@/components/PageHero";
import SlotImage from "@/components/SlotImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "About",
  description:
    "Green Logistics Rwanda is a premier logistics company in Magerwa, Kigali — moving Rwanda's goods with precision, professionalism, and care.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  { icon: Zap, t: "Speed", d: "We move fast and cut delays — because your business can't wait." },
  { icon: ShieldCheck, t: "Reliability", d: "What we promise, we deliver. Safe, on time, every time." },
  { icon: Heart, t: "Care", d: "Your cargo is handled like it's our own — with real attention." },
  { icon: Users, t: "Partnership", d: "We grow when you grow. We're invested in your outcome." },
];

const TEAM = ["Operations Lead", "Customs Specialist", "Fleet Manager", "Client Success"];

export default async function AboutPage() {
  const settings = await getSettings();
  const team = [1, 2, 3, 4]
    .map((n, i) => ({
      photo: settings[`team_${n}`],
      name: settings[`team_${n}_name`],
      role: settings[`team_${n}_role`] || TEAM[i],
    }))
    .filter((m) => m.photo);
  return (
    <>
      <PageHero
        eyebrow="Who we are"
        crumb="About"
        title="Moving Rwanda's goods with precision."
        subtitle="A premier logistics company built in the heart of Magerwa — Kigali's import and export nerve center."
      />

      {/* Story */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-brand-ink shadow-lift">
              <SlotImage
                src={settings.img_about_story}
                alt="Green Logistics Rwanda operations"
                fallback={
                  <>
                    <div className="mesh-green grain absolute inset-0" />
                    <div className="absolute inset-0 grid place-items-center text-center">
                      <div>
                        <MapPin className="mx-auto h-10 w-10 text-brand-glow" />
                        <p className="mt-3 font-display text-xl font-bold text-white">
                          Our operations
                        </p>
                        <p className="mt-1 text-sm text-white/50">
                          Magerwa, Kigali · Rwanda
                        </p>
                      </div>
                    </div>
                  </>
                }
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand">
              Our story
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Premier logistics, rooted in Magerwa.
            </h2>
            <div className="mt-5 space-y-4 text-ash">
              <p>
                Green Logistics Rwanda is a premier logistics company
                headquartered in Magerwa — Kigali&apos;s import/export nerve
                center. We move cargo for businesses and individuals across
                Rwanda and beyond, handling every link in the chain: customs,
                transport, storage, and last-mile delivery.
              </p>
              <p>
                We are dedicated to delivering fast, safe, and reliable
                logistics solutions for businesses and individuals across
                Rwanda. Our purpose is simple: to move your goods with
                precision, professionalism, and care.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-8">
              {[
                { v: "Magerwa", l: "Strategic base" },
                { v: "24/7", l: "Monitoring" },
                { v: "Nationwide", l: "Coverage" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-xl font-bold text-brand">
                    {s.v}
                  </p>
                  <p className="mt-1 text-xs text-ash">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-line bg-paper p-9 shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-mist text-brand">
                  <Target className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display mt-5 text-2xl font-bold text-ink">
                  Our mission
                </h3>
                <p className="mt-3 text-ash">
                  To simplify logistics across Rwanda by delivering timely,
                  reliable, and cost-effective services that drive business
                  growth — and keep the country moving.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mesh-green grain relative h-full overflow-hidden rounded-3xl p-9 text-white shadow-lift">
                <span className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-brand-glow">
                  <Eye className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <h3 className="font-display relative mt-5 text-2xl font-bold">
                  Our vision
                </h3>
                <p className="relative mt-3 text-white/75">
                  To be Rwanda&apos;s most trusted logistics partner — setting
                  new standards in efficiency and customer satisfaction.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Why Magerwa banner */}
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-col items-start gap-5 rounded-3xl border border-line bg-paper p-9 shadow-soft sm:flex-row sm:items-center">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand text-white shadow-glow">
                <MapPin className="h-7 w-7" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold text-ink">
                  Why our location matters
                </h3>
                <p className="mt-2 max-w-3xl text-ash">
                  Located in the heart of Magerwa, Kigali&apos;s logistics hub,
                  we operate at the crossroads of Rwanda&apos;s import and export
                  business. This strategic location enables us to move goods
                  faster, reduce delays, and support businesses of all sizes with
                  seamless logistics services.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="mesh-light py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand">
              What drives us
            </span>
            <h2 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">
              The standards we hold ourselves to.
            </h2>
          </Reveal>
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <RevealItem key={v.t}>
                <div className="h-full rounded-2xl border border-line bg-white p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1.5">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-mist text-brand">
                    <v.icon className="h-6 w-6" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-display mt-5 text-lg font-bold text-ink">
                    {v.t}
                  </h3>
                  <p className="mt-2 text-sm text-ash">{v.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Team — only rendered once real members are added in admin */}
      {team.length > 0 && (
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="max-w-xl">
              <span className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand">
                The team
              </span>
              <h2 className="font-display mt-4 text-3xl font-bold text-ink sm:text-4xl">
                The people who move your cargo.
              </h2>
            </Reveal>
            <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m, i) => (
                <RevealItem key={i}>
                  <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
                    <div className="relative aspect-square bg-brand-ink">
                      <SlotImage
                        src={m.photo}
                        alt={m.name || m.role}
                        fallback={
                          <>
                            <div className="mesh-green grain absolute inset-0" />
                            <div className="absolute inset-0 grid place-items-center">
                              <Users className="h-10 w-10 text-white/60" />
                            </div>
                          </>
                        }
                      />
                    </div>
                    <div className="p-5">
                      <p className="font-display font-bold text-ink">
                        {m.name || "Team Member"}
                      </p>
                      <p className="text-sm text-brand">{m.role}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      {/* Work-with-us CTA */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-bright px-7 py-4 text-base font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Work with us
          </Link>
        </div>
      </section>
    </>
  );
}
