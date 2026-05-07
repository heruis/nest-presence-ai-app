"use client";

import { motion } from "framer-motion";
import { Sheet } from "@/components/sheet";
import type { DeviceGroup } from "@/lib/data";
import { cn } from "@/lib/cn";

export function DevicesSheet({
  open,
  onClose,
  groups,
  homeName,
}: {
  open: boolean;
  onClose: () => void;
  groups: DeviceGroup[];
  homeName: string;
}) {
  const total = groups.reduce((n, g) => n + g.devices.length, 0);

  return (
    <Sheet open={open} onClose={onClose}>
      <div className="px-5 pt-2 pb-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
          {homeName}
        </p>
        <h2 className="mt-1 text-[20px] font-semibold tracking-tight text-white">
          {total} devices
        </h2>
      </div>

      <div className="mt-3 space-y-5 px-4 pb-2">
        {groups.map((g) => {
          const GroupIcon = g.icon;
          if (g.devices.length === 0) return null;
          return (
            <section key={g.label}>
              <div className="mb-2 flex items-center gap-2 px-1 text-white/55">
                <GroupIcon size={13} strokeWidth={2.2} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                  {g.label}
                </p>
                <span className="text-[11px] font-medium text-white/35">
                  {g.devices.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {g.devices.map((d, i) => {
                  const Icon = d.icon;
                  return (
                    <motion.li
                      key={d.id}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i, duration: 0.3 }}
                      className="flex items-center gap-3 rounded-2xl bg-[#1f2327] px-3 py-2.5 ring-1 ring-white/5"
                    >
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                          d.on
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "bg-white/5 text-white/55"
                        )}
                      >
                        <Icon size={16} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[13px] font-medium text-white">
                          {d.name}
                        </p>
                        <p className="truncate text-[11px] text-white/55">
                          {d.state}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "h-2 w-2 shrink-0 rounded-full",
                          d.on ? "bg-emerald-400" : "bg-white/15"
                        )}
                      />
                    </motion.li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </Sheet>
  );
}
