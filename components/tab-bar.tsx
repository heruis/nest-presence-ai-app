"use client";

import { House as HomeIcon, Sparkles, Activity, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

export type TabId = "home" | "presence" | "activity" | "settings";

const tabs: { id: TabId; label: string; icon: typeof HomeIcon }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "presence", label: "Presence", icon: Sparkles },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: Settings },
];

export function TabBar({
  active,
  onChange,
}: {
  active: TabId;
  onChange: (id: TabId) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 px-3 pt-2 pb-7 bg-gradient-to-t from-black/85 via-black/60 to-transparent backdrop-blur-md">
      <div className="mx-auto flex max-w-sm justify-between rounded-2xl bg-[#16191c]/90 px-2 py-2 ring-1 ring-white/5">
        {tabs.map((t) => {
          const Icon = t.icon;
          const on = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={cn(
                "flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-colors",
                on ? "text-[#8ab4f8]" : "text-[#9aa0a6] hover:text-white"
              )}
            >
              <Icon size={20} strokeWidth={on ? 2.4 : 2} />
              <span className="tracking-tight">{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
