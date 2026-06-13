import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Icon from "./Icon";
import type { ServiceKey } from "@/lib/site";

export default function ServiceCard({
  icon,
  title,
  body,
  index,
  href = "/services",
}: {
  icon: string;
  title: string;
  body: string;
  index?: number;
  href?: string;
  key?: ServiceKey;
}) {
  return (
    <Link
      href={href}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-7 shadow-soft transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:shadow-lift focus-visible:-translate-y-1.5"
    >
      {/* hover green wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-mist/0 to-brand-mist/0 opacity-0 transition-opacity duration-300 group-hover:from-brand-mist/40 group-hover:to-transparent group-hover:opacity-100" />

      {typeof index === "number" && (
        <span className="absolute right-6 top-6 font-mono text-xs text-ink/25">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div className="relative">
        <span className="inline-grid h-13 w-13 place-items-center rounded-xl bg-brand-mist text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
          <Icon name={icon} className="h-6 w-6" strokeWidth={1.8} />
        </span>
      </div>

      <h3 className="font-display relative mt-5 text-xl font-bold text-ink">
        {title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-ash">
        {body}
      </p>

      <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
        Learn more
        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}
