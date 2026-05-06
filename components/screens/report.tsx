"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  Sparkles,
  Sunrise,
  Moon,
  DoorOpen,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { weeklyMetrics } from "@/lib/data";
import { cn } from "@/lib/cn";

const timeline = [
  { day: "Mon", actions: 11, big: "Last Person Left fired 3×" },
  { day: "Tue", actions: 14, big: "Morning Wake at 7:08" },
  { day: "Wed", actions: 9, big: "Guest Detected — held auto-lock" },
  { day: "Thu", actions: 13, big: "Pre-warmed for 5:42 PM arrival" },
  { day: "Fri", actions: 16, big: "Night Wind-Down at 10:48" },
  { day: "Sat", actions: 8, big: "You corrected 'we were having a party'" },
  { day: "Sun", actions: 13, big: "Morning Wake — today" },
];

const max = Math.max(...timeline.map((d) => d.actions));

export function ReportScreen() {
  return (
    <div className="aurora h-full w-full overflow-y-auto no-scrollbar pb-32">
      <StatusBar tone="light" />

      <div className="px-6 pt-12">
        <div className="flex items-center gap-2 text-[#8ab4f8]">
          <Sparkles size={14} strokeWidth={2.5} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
            Home Intelligence · This week
          </span>
        </div>
        <h1 className="mt-1 text-[28px] font-semibold leading-tight tracking-tight text-white">
          Your home worked
          <br />
          84 times for you.
        </h1>
        <p className="mt-2 text-[13px] leading-snug text-white/60">
          Apr 28 – May 5 · No voice commands. No manual routines. Just you, living in
          your home.
        </p>
      </div>

      {/* hero stat */}
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="mx-4 mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/30 via-[#16191c] to-[#16191c] p-5 ring-1 ring-emerald-400/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300">
            <Zap size={20} strokeWidth={2.2} />
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            +22% vs. last week
          </span>
        </div>
        <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
          Energy saved
        </p>
        <p className="mt-1 text-[44px] font-semibold leading-none tracking-tight text-white tabular-nums">
          14.7
          <span className="ml-1 text-[20px] font-medium text-white/60">kWh</span>
        </p>
        <p className="mt-2 text-[12px] text-white/60">
          About $3.10 trimmed from your utility bill — without you noticing.
        </p>
      </motion.div>

      {/* metric grid */}
      <div className="mt-3 grid grid-cols-2 gap-3 px-4">
        {weeklyMetrics.slice(1).map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
            className="rounded-2xl bg-[#16191c] p-4 ring-1 ring-white/5"
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
              {m.label}
            </p>
            <p className="mt-1.5 text-[24px] font-semibold tabular-nums tracking-tight text-white">
              {m.value}
            </p>
            <p
              className={cn(
                "mt-1 text-[11px] leading-snug",
                m.positive ? "text-emerald-300" : "text-rose-300"
              )}
            >
              {m.delta}
            </p>
          </motion.div>
        ))}
      </div>

      {/* timeline */}
      <div className="mx-4 mt-5 rounded-3xl bg-[#16191c] p-4 ring-1 ring-white/5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
            Daily auto-actions
          </p>
          <p className="text-[10px] text-white/40">tap a day for detail</p>
        </div>
        <div className="mt-4 flex h-[110px] items-end justify-between gap-2">
          {timeline.map((d, i) => {
            const isToday = i === timeline.length - 1;
            return (
              <motion.div
                key={d.day}
                initial={{ height: 0 }}
                animate={{ height: `${(d.actions / max) * 100}%` }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "relative flex w-full origin-bottom flex-col items-center justify-end rounded-t-lg",
                  isToday
                    ? "bg-gradient-to-t from-[#8ab4f8] to-[#a8c7fa]"
                    : "bg-white/15"
                )}
              >
                <span className="absolute -top-5 text-[10px] font-semibold tabular-nums text-white/70">
                  {d.actions}
                </span>
              </motion.div>
            );
          })}
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-white/45">
          {timeline.map((d) => (
            <span key={d.day} className="w-full text-center">
              {d.day}
            </span>
          ))}
        </div>
      </div>

      {/* highlights */}
      <div className="px-5 pt-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Highlights
        </p>
      </div>
      <div className="mt-2 space-y-2 px-4">
        <Highlight
          icon={<ShieldCheck size={18} strokeWidth={2.2} />}
          title="29 security actions"
          body="You left the house 11 times. Doors locked, cameras armed, every time."
          tint="sky"
        />
        <Highlight
          icon={<DoorOpen size={18} strokeWidth={2.2} />}
          title="Saved 4 minutes of door-checking"
          body="No 'did I lock it?' second-guessing all week."
          tint="indigo"
        />
        <Highlight
          icon={<Lightbulb size={18} strokeWidth={2.2} />}
          title="14 lighting auto-actions"
          body="Sunset and sunrise tuned to your real wake/sleep times — not a static schedule."
          tint="amber"
        />
        <Highlight
          icon={<Sunrise size={18} strokeWidth={2.2} />}
          title="Morning Wake fired 6 of 7 days"
          body="Held back Saturday after you flagged 'we were having a party' Friday night."
          tint="rose"
        />
        <Highlight
          icon={<Moon size={18} strokeWidth={2.2} />}
          title="Night Wind-Down accuracy 94%"
          body="One correction, applied. Won't auto-dim Saturdays before midnight anymore."
          tint="violet"
        />
      </div>

      {/* email CTA */}
      <button className="mx-4 mt-6 flex w-[calc(100%-2rem)] items-center justify-between rounded-2xl bg-[#16191c] px-4 py-3.5 ring-1 ring-white/8">
        <div className="text-left">
          <p className="text-[13px] font-semibold text-white">Email this to me weekly</p>
          <p className="text-[11px] text-white/55">Sundays at 8 AM, with one improvement tip</p>
        </div>
        <ChevronRight size={16} className="text-white/40" />
      </button>
    </div>
  );
}

function Highlight({
  icon,
  title,
  body,
  tint,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  tint: "sky" | "indigo" | "amber" | "rose" | "violet";
}) {
  const tints = {
    sky: "bg-sky-400/15 text-sky-300",
    indigo: "bg-indigo-400/15 text-indigo-300",
    amber: "bg-amber-400/15 text-amber-300",
    rose: "bg-rose-400/15 text-rose-300",
    violet: "bg-violet-400/15 text-violet-300",
  } as const;
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-[#16191c] p-3.5 ring-1 ring-white/5">
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", tints[tint])}>
        {icon}
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[11px] leading-snug text-white/60">{body}</p>
      </div>
    </div>
  );
}
