import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  crumb,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  crumb: string;
}) {
  return (
    <section className="mesh-green grain relative overflow-hidden pb-16 pt-[120px] text-white sm:pb-20 sm:pt-[140px]">
      <div className="pointer-events-none absolute -right-16 top-10 h-72 w-72 rounded-full bg-brand-glow/15 blur-3xl" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-white/55"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-brand-glow">{crumb}</span>
        </nav>

        <span className="mt-6 inline-block font-mono text-xs font-medium uppercase tracking-[0.22em] text-brand-glow">
          {eyebrow}
        </span>
        <h1 className="font-display mt-3 max-w-3xl text-4xl font-bold leading-[1.04] text-balance sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
