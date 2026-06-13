const ITEMS = [
  "Customs Clearance",
  "Door-to-Door",
  "Warehousing",
  "Cargo Transport",
  "Distribution",
  "GPS-Tracked Fleet",
  "Import & Export",
  "24/7 Monitoring",
];

export default function Marquee() {
  return (
    <div className="border-y border-line bg-white py-4">
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee items-center">
          {[...ITEMS, ...ITEMS].map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="px-6 font-display text-sm font-medium uppercase tracking-wide text-ink/70">
                {item}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-bright/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
