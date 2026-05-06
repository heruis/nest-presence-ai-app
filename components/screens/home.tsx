"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, ChevronRight } from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { morningWake, devices } from "@/lib/data";
import { cn } from "@/lib/cn";

export function HomeScreen({
  onOpenPresence,
  onOpenFeedback,
}: {
  onOpenPresence: () => void;
  onOpenFeedback: () => void;
}) {
  const state = morningWake;

  return (
    <div className="relative h-full w-full">
      {/* sunrise gradient top half */}
      <div className="sunrise absolute inset-x-0 top-0 h-[420px]" />
      {/* fade to dark */}
      <div className="absolute inset-x-0 top-[260px] h-[200px] bg-gradient-to-b from-transparent to-[#0a0c0e]" />

      {/* sun */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-[120px] h-[180px] w-[180px] -translate-x-1/2 rounded-full pulse-soft"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,236,179,0.95) 0%, rgba(255,179,77,0.55) 35%, rgba(240,98,146,0) 75%)",
        }}
      />

      <div className="relative z-10 h-full w-full overflow-y-auto no-scrollbar pb-32">
        <StatusBar tone="light" />

        {/* greeting */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="px-6 pt-12 text-white"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
            Sunday · May 5
          </p>
          <h1 className="mt-1 text-[34px] font-semibold leading-tight tracking-tight">
            Good morning,
            <br />
            Herui
          </h1>
        </motion.div>

        {/* live state chip */}
        <motion.button
          onClick={onOpenPresence}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-6 mt-5 flex items-center gap-2.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/25 text-white"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-[13px] font-medium">
            Presence AI · {state.name}
          </span>
          <span className="rounded-full bg-white/25 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums">
            {state.confidence}%
          </span>
        </motion.button>

        {/* hero card */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-4 mt-6 overflow-hidden rounded-[28px] bg-[#16191c]/85 ring-1 ring-white/8 backdrop-blur-xl"
        >
          {/* rationale */}
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-2 text-[#fbbf24]">
              <Sparkles size={14} strokeWidth={2.5} />
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                Auto-actioned at {state.inferredAt}
              </span>
            </div>
            <p className="mt-2 text-[15px] leading-snug text-white/90">
              {state.rationale}
            </p>
          </div>

          <div className="mx-5 h-px bg-white/8" />

          {/* action list */}
          <ul className="px-2 py-2">
            {state.actions.map((a, i) => {
              const Icon = a.icon;
              const skipped = a.status === "skipped";
              return (
                <motion.li
                  key={a.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.95 + i * 0.18, duration: 0.5 }}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl px-3 py-2.5",
                    skipped && "opacity-60"
                  )}
                >
                  <div
                    className={cn(
                      "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      skipped ? "bg-white/5 text-white/50" : "bg-[#fbbf24]/15 text-[#fbbf24]"
                    )}
                  >
                    <Icon size={15} strokeWidth={2.4} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-[14px] font-medium text-white">
                        {a.label}
                      </p>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          skipped
                            ? "bg-white/8 text-white/60"
                            : "bg-emerald-500/15 text-emerald-300"
                        )}
                      >
                        {skipped ? "Held" : "Done"}
                      </span>
                    </div>
                    <p className="text-[12px] text-white/55">
                      {a.device} · {a.detail}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          {/* footer actions */}
          <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
            <button
              onClick={onOpenPresence}
              className="flex items-center gap-1 text-[13px] font-medium text-[#8ab4f8]"
            >
              View 4 signals
              <ArrowUpRight size={14} strokeWidth={2.4} />
            </button>
            <button
              onClick={onOpenFeedback}
              className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black"
            >
              Did we get this right?
            </button>
          </div>
        </motion.div>

        {/* devices */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          className="mt-7 px-5"
        >
          <div className="flex items-end justify-between">
            <h2 className="text-[18px] font-semibold tracking-tight text-white">
              Devices
            </h2>
            <button className="flex items-center text-[12px] font-medium text-white/55">
              All rooms
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3">
            {devices.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.55 + i * 0.05, duration: 0.4 }}
                  className={cn(
                    "rounded-2xl p-3.5 ring-1 transition",
                    d.on
                      ? "bg-white text-black ring-white/10"
                      : "bg-[#16191c] text-white ring-white/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        d.on ? "bg-black/8 text-black" : "bg-white/5 text-white/70"
                      )}
                    >
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    {d.metric ? (
                      <span className="text-[16px] font-semibold tabular-nums">
                        {d.metric}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          d.on ? "bg-emerald-500" : "bg-white/20"
                        )}
                      />
                    )}
                  </div>
                  <p className="mt-3 text-[14px] font-semibold tracking-tight">
                    {d.name}
                  </p>
                  <p
                    className={cn(
                      "text-[12px]",
                      d.on ? "text-black/55" : "text-white/45"
                    )}
                  >
                    {d.room} · {d.state}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* trust footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
          className="mx-5 mt-6 rounded-2xl bg-[#16191c] p-4 ring-1 ring-white/5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
            On-device · You're in control
          </p>
          <p className="mt-1 text-[13px] leading-snug text-white/75">
            All presence inference runs locally. Long-press any tile to override —
            we'll learn from it.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
