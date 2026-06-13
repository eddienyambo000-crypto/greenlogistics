import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE, SERVICES, whatsappLink } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mesh-green grain relative overflow-hidden text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* CTA strip */}
        <div className="grid gap-6 border-b border-white/10 py-14 md:grid-cols-[1.3fr_1fr] md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
              Ready to move your cargo with{" "}
              <span className="text-grad-green">confidence?</span>
            </h2>
            <p className="mt-3 max-w-md text-white/65">
              Tell us what you&apos;re shipping. We&apos;ll get you a clear,
              competitive quote — fast.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 md:justify-end">
            <Link
              href="/contact"
              className="rounded-full bg-brand-bright px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              Get a Quote
            </Link>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Premier logistics from the heart of Magerwa — moving Rwanda&apos;s
              goods with precision, professionalism, and care.
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand-glow">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand-glow">
              Services
            </h3>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.key}>
                  <Link
                    href="/services"
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <address className="not-italic">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-brand-glow">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-glow" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-glow" />
                <a href={`tel:${SITE.phoneRaw}`} className="hover:text-white">
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-glow" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white break-all">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-glow" />
                <span>{SITE.hours}</span>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>
            Developed by{" "}
            <a
              href={SITE.developer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/80 underline decoration-brand-glow/60 underline-offset-4 transition-colors hover:text-brand-glow"
            >
              {SITE.developer.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
