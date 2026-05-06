"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import type { HomeLocation, HouseholdMember } from "@/lib/data";

export function GlobalHeader({
  home,
  me,
  tone = "light",
  onOpenHomeSwitcher,
  onOpenProfile,
}: {
  home: HomeLocation;
  me: HouseholdMember;
  tone?: "light" | "dark";
  onOpenHomeSwitcher: () => void;
  onOpenProfile: () => void;
}) {
  const text = tone === "light" ? "text-white" : "text-black";
  const subtle = tone === "light" ? "text-white/60" : "text-black/60";

  return (
    <div className="flex items-center justify-between px-4 pt-3">
      <button
        onClick={onOpenHomeSwitcher}
        className={cn(
          "flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 ring-1 ring-white/15 backdrop-blur-md",
          tone === "dark" && "bg-black/5 ring-black/10"
        )}
      >
        <span className={cn("text-[13px] font-semibold tracking-tight", text)}>
          {home.shortName}
        </span>
        <ChevronDown size={14} strokeWidth={2.4} className={subtle} />
      </button>

      <button
        onClick={onOpenProfile}
        className="relative flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold text-black ring-2 ring-white/30"
        style={{ background: me.color }}
      >
        {me.initial}
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0a0c0e]" />
      </button>
    </div>
  );
}
