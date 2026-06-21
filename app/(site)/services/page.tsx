import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import PageHero from "@/components/PageHero";
import Icon from "@/components/Icon";
import SlotImage from "@/components/SlotImage";
import { Reveal } from "@/components/Reveal";
import { getSettings } from "@/lib/settings";
import { SERVICES, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Customs clearance, door-to-door, warehousing & storage, cargo transportation, distribution and custom logistics solutions across Rwanda.",
  alternates: { canonical: "/services" },
};

const HIGHLIGHTS: Record<string, string[]> = {
  custom: ["Cost & time analysis", "Flexible strategy", "Dedicated coordinator"],
  customs: ["Full documentation", "Compliance handled", "Faster clearance"],
  door: ["Pickup to delivery", "Single point of contact", "Proof of delivery"],
  warehousing: ["Climate-controlled", "24/7 monitoring", "Short & long term"],
  transport: ["GPS tracking", "Vetted drivers", "Rwanda & beyond"],
  distribution: ["Last-mile speed", "Accuracy first", "Customer-ready"],
};

export default async function ServicesPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="What we do"
        crumb="Services"
        title="Logistics, handled end to end."
        subtitle="Six services that cover every link in your supply chain — from the border at Magerwa to your customer's doorstep."
      />

      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-5 sm:gap-20 sm:px-8">
          {SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.key}>
                <article
                  id={s.key}
                  className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
                >
                  {/* Visual */}
                  <div
                    className={`relative ${flip ? "lg:order-2" : ""}`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-brand-ink shadow-lift">
                      <SlotImage
                        src={settings[`img_service_${s.key}`]}
                        alt={s.title}
                        fallback={
                          <>
                            <div className="mesh-green grain absolute inset-0" />
                            <div className="absolute inset-0 grid place-items-center">
                              <Icon
                                name={s.icon}
                                className="h-16 w-16 text-white/80"
                                strokeWidth={1.3}
                              />
                            </div>
                            <span className="absolute left-5 top-5 font-mono text-xs text-white/50">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </>
                        }
                      />
                    </div>
                  </div>

                  {/* Copy */}
                  <div className={flip ? "lg:order-1" : ""}>
                    <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-brand-mist text-brand">
                      <Icon name={s.icon} className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <h2 className="font-display mt-5 text-3xl font-bold text-ink sm:text-4xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 max-w-lg text-ash">{s.body}</p>

                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                      {HIGHLIGHTS[s.key].map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-sm font-medium text-ink"
                        >
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-bright/15 text-brand-bright">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={`/contact?service=${encodeURIComponent(s.title)}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-soft transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                      >
                        Get a quote
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </Link>
                      <a
                        href={whatsappLink(
                          `Hi Green Logistics, I'm interested in ${s.title}.`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-brand/20 px-6 py-3 text-sm font-semibold text-brand transition-colors hover:bg-brand-mist"
                      >
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
