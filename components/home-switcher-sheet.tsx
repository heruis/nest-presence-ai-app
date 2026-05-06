"use client";

import { Plus, House, Check } from "lucide-react";
import { Sheet } from "./sheet";
import { cn } from "@/lib/cn";
import type { HomeLocation } from "@/lib/data";

export function HomeSwitcherSheet({
  open,
  onClose,
  homes,
  activeId,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  homes: HomeLocation[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-5 pt-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
          Your homes
        </p>
        <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-white">
          Switch home
        </h2>
      </div>

      <div className="mt-4 space-y-2 px-3">
        {homes.map((h) => {
          const active = h.id === activeId;
          return (
            <button
              key={h.id}
              onClick={() => {
                onSelect(h.id);
                onClose();
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left ring-1 transition",
                active
                  ? "bg-gradient-to-br from-[#8ab4f8]/20 to-[#16191c] ring-[#8ab4f8]/40"
                  : "bg-[#1f2327] ring-white/5"
              )}
            >
              <div
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl",
                  active ? "bg-[#8ab4f8]/25 text-[#8ab4f8]" : "bg-white/8 text-white/70"
                )}
              >
                <House size={20} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-[14px] font-semibold text-white">{h.name}</p>
                  {h.isPrimary && (
                    <span className="rounded-full bg-white/8 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/55">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-white/50">
                  {h.address} · {h.deviceCount} devices
                </p>
                <p className="mt-0.5 text-[11px] text-[#8ab4f8]">Now: {h.state}</p>
              </div>
              {active && (
                <Check size={18} strokeWidth={2.6} className="text-[#8ab4f8]" />
              )}
            </button>
          );
        })}

        <button className="flex w-full items-center gap-3 rounded-2xl bg-[#1f2327] px-3 py-3 text-left ring-1 ring-white/5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/8 text-white/70">
            <Plus size={20} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-white">Add a home</p>
            <p className="text-[11px] text-white/50">Vacation rental, parents' place, office</p>
          </div>
        </button>
      </div>
    </Sheet>
  );
}
