"use client";

import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { GlobalHeader } from "@/components/global-header";
import {
  allStates,
  type HomeState,
  type HomeLocation,
  type HouseholdMember,
  type HomeDataSet,
} from "@/lib/data";
import { cn } from "@/lib/cn";

const accentMap: Record<string, { ring: string; bg: string; text: string }> = {
  amber: { ring: "ring-amber-400/30", bg: "bg-amber-400/10", text: "text-amber-300" },
  green: { ring: "ring-emerald-400/30", bg: "bg-emerald-400/10", text: "text-emerald-300" },
  blue: { ring: "ring-sky-400/30", bg: "bg-sky-400/10", text: "text-sky-300" },
  cyan: { ring: "ring-cyan-400/30", bg: "bg-cyan-400/10", text: "text-cyan-300" },
  violet: { ring: "ring-violet-400/30", bg: "bg-violet-400/10", text: "text-violet-300" },
  indigo: { ring: "ring-indigo-400/30", bg: "bg-indigo-400/10", text: "text-indigo-300" },
};

function ActiveStateCard({ state }: { state: HomeState }) {
  const Icon = state.icon;
  const a = accentMap[state.accent];
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={cn("mx-4 mt-4 overflow-hidden rounded-3xl bg-[#16191c] ring-1", a.ring)}
    >
      <div className="px-5 pt-5">
        <div className="flex items-center gap-3">
          <div className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", a.bg, a.text)}>
            <Icon size={22} strokeWidth={2.2} />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Right now</p>
            <p className="text-[18px] font-semibold tracking-tight text-white">{state.name}</p>
          </div>
        </div>

        <p className="mt-4 text-[13px] leading-snug text-white/75">{state.rationale}</p>
      </div>

      <div className="mt-4 border-t border-white/6 px-3 py-3">
        <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          {state.signals.length} of {state.signals.length} sources agree
        </p>
        <div className="grid grid-cols-2 gap-2">
          {state.signals.map((s, i) => {
            const SI = s.icon;
            return (
              <motion.div
                key={s.id}
                initial={{ y: 6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="rounded-2xl bg-[#1f2327] p-3"
              >
                <div className="flex items-center gap-2 text-white/70">
                  <SI size={14} strokeWidth={2.2} />
                  <span className="text-[11px] font-semibold uppercase tracking-wide">{s.id}</span>
                </div>
                <p className="mt-1.5 text-[12px] font-medium leading-tight text-white">{s.label}</p>
                <p className="text-[11px] text-white/50">{s.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

function StateRow({ state, index }: { state: HomeState; index: number }) {
  const Icon = state.icon;
  const a = accentMap[state.accent];
  return (
    <motion.div
      initial={{ x: -8, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.2 + index * 0.06, duration: 0.4 }}
      className="flex items-center gap-3 rounded-2xl bg-[#16191c] px-4 py-3 ring-1 ring-white/5"
    >
      <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl", a.bg, a.text)}>
        <Icon size={18} strokeWidth={2.2} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[14px] font-semibold text-white">{state.name}</p>
        <p className="text-[11px] text-white/50">Last fired · {state.inferredAt}</p>
      </div>
      <ChevronRight size={16} className="text-white/30" />
    </motion.div>
  );
}

export function PresenceAIScreen({
  homeData,
  home,
  me,
  onOpenHomeSwitcher,
  onOpenProfile,
}: {
  homeData: HomeDataSet;
  home: HomeLocation;
  me: HouseholdMember;
  onOpenHomeSwitcher: () => void;
  onOpenProfile: () => void;
}) {
  const active = homeData.activeState;
  const others = allStates.filter((s) => s.id !== active.id);

  return (
    <div className="aurora h-full w-full overflow-y-auto no-scrollbar pb-32">
      <StatusBar tone="light" />
      <GlobalHeader
        home={home}
        me={me}
        onOpenHomeSwitcher={onOpenHomeSwitcher}
        onOpenProfile={onOpenProfile}
      />

      <div className="px-6 pt-7">
        <div className="flex items-center gap-2 text-[#8ab4f8]">
          <Sparkles size={14} strokeWidth={2.5} />
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Presence AI</span>
        </div>
        <h1 className="mt-1 text-[34px] font-semibold leading-tight tracking-tight text-white">
          One home that
          <br />
          knows you.
        </h1>
      </div>

      <ActiveStateCard state={active} />

      <div className="mt-6 px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">All states</p>
      </div>

      <div className="mt-2 space-y-2 px-4">
        {others.map((s, i) => (
          <StateRow key={s.id} state={s} index={i} />
        ))}
      </div>

      {/* Apple-style trust voice (replaces Trust thresholds explainer) */}
      <div className="mx-4 mt-5 rounded-3xl bg-gradient-to-br from-[#1a4a8a]/30 to-[#16191c] p-5 ring-1 ring-white/8">
        <p className="text-[18px] font-semibold leading-tight tracking-tight text-white">
          What your home learns,
          <br />
          stays in your home.
        </p>
        <ul className="mt-3 space-y-1.5 text-[12px] text-white/70">
          <li>· We never auto-lock unless we're sure</li>
          <li>· Cameras only run when you're away</li>
          <li>· If we're not sure, we ask you first</li>
        </ul>
      </div>
    </div>
  );
}
