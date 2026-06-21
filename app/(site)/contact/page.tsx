import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { SITE, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Quote",
  description:
    "Request a logistics quote from Green Logistics Rwanda. Call, email, or WhatsApp us — based in Magerwa, Kigali. Mon–Sat 8AM–6PM.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service = "" } = await searchParams;

  const details = [
    {
      icon: MapPin,
      label: "Visit us",
      value: SITE.address,
      href: "https://maps.google.com/?q=Magerwa+Kigali+Rwanda",
    },
    { icon: Phone, label: "Call us", value: SITE.phone, href: `tel:${SITE.phoneRaw}` },
    { icon: Mail, label: "Email us", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: Clock, label: "Working hours", value: SITE.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        crumb="Contact"
        title="Tell us what you're moving."
        subtitle="Share a few details and we'll come back with a clear, competitive quote — fast."
      />

      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          {/* Left: contact details */}
          <div>
            <h2 className="font-display text-2xl font-bold text-ink">
              Reach us directly
            </h2>
            <p className="mt-2 text-ash">
              Prefer to talk? We&apos;re a message away.
            </p>

            <ul className="mt-8 space-y-3">
              {details.map((d) => {
                const inner = (
                  <div className="flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-soft transition-transform duration-300 hover:-translate-y-0.5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-mist text-brand">
                      <d.icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-ash">
                        {d.label}
                      </p>
                      <p className="mt-0.5 font-semibold text-ink break-words">
                        {d.value}
                      </p>
                    </div>
                  </div>
                );
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                      >
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-5 py-4 font-semibold text-white shadow-soft transition-transform duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle className="h-5 w-5" />
              Chat with us on WhatsApp
            </a>

            {/* Live map — Magerwa, Kigali */}
            <div className="mt-4 relative aspect-[16/10] overflow-hidden rounded-2xl border border-line shadow-soft">
              <iframe
                title="Green Logistics Rwanda — Magerwa, Kigali"
                src="https://www.google.com/maps?q=Magerwa%2C%20Kigali%2C%20Rwanda&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>

          {/* Right: form */}
          <div className="rounded-3xl border border-line bg-white p-6 shadow-lift sm:p-9">
            <h2 className="font-display text-2xl font-bold text-ink">
              Request a quote
            </h2>
            <p className="mt-2 text-ash">
              Fields marked <span className="text-brand-bright">*</span> are
              required.
            </p>
            <div className="mt-7">
              <QuoteForm defaultService={service} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
