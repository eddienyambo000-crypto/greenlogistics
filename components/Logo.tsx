import Link from "next/link";

/**
 * Brand lockup. No client logo file yet — this is a clean custom mark:
 * a leaf formed from a route/arrow, in brand green. Swap for client PNG later.
 */
export default function Logo({
  variant = "dark",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const text = variant === "light" ? "text-white" : "text-ink";
  const sub = variant === "light" ? "text-white/55" : "text-ash";
  return (
    <Link
      href="/"
      aria-label="Green Logistics Rwanda — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark shadow-glow transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          {/* leaf body */}
          <path
            d="M5 19c0-7 6-13 14-13 0 8-6 14-14 13Z"
            fill="rgba(255,255,255,0.16)"
          />
          {/* route arrow forming the leaf vein */}
          <path
            d="M6 18C9 11 13.5 8 18 6.5"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M13.5 7.2 18 6.3 17.1 10.8"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[15px] font-bold tracking-tight ${text}`}
        >
          GREEN LOGISTICS
        </span>
        <span
          className={`font-mono text-[9.5px] font-medium tracking-[0.28em] ${sub}`}
        >
          RWANDA
        </span>
      </span>
    </Link>
  );
}
