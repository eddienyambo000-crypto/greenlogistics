"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Search, ShieldCheck, MapPin } from "lucide-react";
import { whatsappLink } from "@/lib/site";

const headline = ["Rwanda's", "Goods,", "Moving", "Faster."];

export default function Hero({
  videoUrl,
  posterUrl,
}: {
  videoUrl?: string;
  posterUrl?: string;
}) {
  return (
    <section className="mesh-green grain relative flex min-h-dvh items-center overflow-hidden pt-[68px] text-white">
      {/* Video set from the admin panel (or /public/video/hero.mp4) — covers the mesh */}
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
        autoPlay
        muted
        loop
        playsInline
        poster={posterUrl || "/placeholders/hero-poster.jpg"}
        aria-hidden
      >
        <source src={videoUrl || "/video/hero.mp4"} type="video/mp4" />
      </video>

      {/* Legibility overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-brand-ink via-brand-ink/55 to-brand-ink/30" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-brand-ink/70 to-transparent" />

      {/* Floating accent orbs */}
      <div className="pointer-events-none absolute -left-20 top-1/4 z-[3] h-72 w-72 rounded-full bg-brand-bright/20 blur-3xl animate-float" />
      <div className="pointer-events-none absolute -right-10 bottom-10 z-[3] h-80 w-80 rounded-full bg-brand-glow/15 blur-3xl animate-float [animation-delay:1.5s]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-white/90"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-glow opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-glow" />
          </span>
          Based in Magerwa · Kigali&apos;s logistics hub
        </motion.div>

        {/* Headline with word-by-word reveal */}
        <h1 className="font-display mt-6 max-w-4xl text-5xl font-bold leading-[0.98] sm:text-6xl lg:text-7xl">
          {headline.map((word, i) => (
            <span key={word} className="mr-[0.25em] inline-block overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`inline-block ${
                  word === "Faster." ? "text-grad-green" : ""
                }`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
        >
          From customs to the final doorstep, we move your goods across Rwanda
          with speed, security, and absolute reliability — so you can focus on
          growing your business.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.68 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-bright px-7 py-4 text-base font-semibold text-white shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          >
            Get a Quote
            <ArrowRight className="h-4.5 w-4.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-4 text-base font-semibold text-white backdrop-blur transition-colors hover:bg-white/12"
          >
            Chat on WhatsApp
          </a>
        </motion.div>

        {/* Inline track pill */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Link
            href="/track"
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/80 backdrop-blur transition-colors hover:bg-white/10"
          >
            <Search className="h-4 w-4 text-brand-glow" />
            Track your shipment
            <span className="font-mono text-xs text-white/50">GLR-…</span>
          </Link>
        </motion.div>

        {/* Trust stat bar */}
        <motion.dl
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-white/10 pt-8 sm:grid-cols-4"
        >
          {[
            { v: "24/7", l: "Cargo monitoring" },
            { v: "GPS", l: "Tracked fleet" },
            { v: "100%", l: "Customs handled" },
            { v: "1", l: "Strategic hub" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="font-display text-3xl font-bold text-white">
                {s.v}
              </dt>
              <dd className="mt-1 text-xs text-white/60">{s.l}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      {/* trust chips bottom-right (desktop) */}
      <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-end gap-2 lg:flex">
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white/80">
          <ShieldCheck className="h-3.5 w-3.5 text-brand-glow" /> Licensed &
          insured
        </span>
        <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs text-white/80">
          <MapPin className="h-3.5 w-3.5 text-brand-glow" /> Magerwa, Kigali
        </span>
      </div>
    </section>
  );
}
