"use client";

import { useState } from "react";
import { LayoutDashboard, ImagePlus } from "lucide-react";

export default function AdminTabs({
  operations,
  content,
}: {
  operations: React.ReactNode;
  content: React.ReactNode;
}) {
  const [tab, setTab] = useState<"ops" | "content">("ops");

  const tabBtn = (active: boolean) =>
    `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-brand-bright text-white"
        : "bg-white/5 text-white/60 hover:bg-white/10"
    }`;

  return (
    <div>
      <div className="mt-7 flex flex-wrap gap-2">
        <button onClick={() => setTab("ops")} className={tabBtn(tab === "ops")}>
          <LayoutDashboard className="h-4 w-4" />
          Operations
        </button>
        <button
          onClick={() => setTab("content")}
          className={tabBtn(tab === "content")}
        >
          <ImagePlus className="h-4 w-4" />
          Site content
        </button>
      </div>

      <div className="mt-6">
        <div className={tab === "ops" ? "block" : "hidden"}>{operations}</div>
        <div className={tab === "content" ? "block" : "hidden"}>{content}</div>
      </div>
    </div>
  );
}
