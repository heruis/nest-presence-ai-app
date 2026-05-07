"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronRight,
  RotateCcw,
  Check,
  X as XIcon,
  Cpu,
} from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { GlobalHeader } from "@/components/global-header";
import {
  type HomeLocation,
  type HouseholdMember,
  type PendingSuggestion,
  type HomeDataSet,
} from "@/lib/data";
import { cn } from "@/lib/cn";

type Mode = "auto" | "suggest";

const skipReasons = ["Wrong time", "Wrong action", "Just not now"];

const pastTense: Record<string, string> = {
  "Close garage": "Closed",
  "Turn off": "Off",
  "Reconnect": "Reconnected",
  "Remind me": "Reminder set",
};

export function HomeScreen({
  mode,
  learning,
  homeData,
  home,
  me,
  onOpenPresence,
  onOpenFeedback,
  onOpenAllDevices,
  onOpenHomeSwitcher,
  onOpenProfile,
}: {
  mode: Mode;
  learning: boolean;
  homeData: HomeDataSet;
  home: HomeLocation;
  me: HouseholdMember;
  onOpenPresence: () => void;
  onOpenFeedback: () => void;
  onOpenAllDevices: () => void;
  onOpenHomeSwitcher: () => void;
  onOpenProfile: () => void;
}) {
  const state = homeData.activeState;

  // Suggest-mode pending vs confirmed
  const [pending, setPending] = useState<PendingSuggestion[]>(
    homeData.pendingSuggestions
  );
  const [confirmed, setConfirmed] = useState<PendingSuggestion[]>([]);
  const [skippedFor, setSkippedFor] = useState<string | null>(null);

  // Undo loops
  const [undoneAuto, setUndoneAuto] = useState<Set<string>>(new Set());
  const [undoPill, setUndoPill] = useState(false);

  // Anomaly action lifecycle: id -> "acted" once tapped; row removed shortly after
  const [anomalyActed, setAnomalyActed] = useState<Set<string>>(new Set());
  const [anomalyDismissed, setAnomalyDismissed] = useState<Set<string>>(new Set());

  const showUndoPill = () => {
    setUndoPill(true);
    window.setTimeout(() => setUndoPill(false), 1400);
  };

  const undoAuto = (id: string) => {
    setUndoneAuto((s) => new Set(s).add(id));
    showUndoPill();
  };

  const undoConfirmed = (s: PendingSuggestion) => {
    setConfirmed((c) => c.filter((x) => x.id !== s.id));
    setPending((p) => [s, ...p]);
    showUndoPill();
  };

  const confirm = (s: PendingSuggestion) => {
    setPending((p) => p.filter((x) => x.id !== s.id));
    setConfirmed((c) => [s, ...c]);
  };
  const skipWithReason = (id: string, _reason: string) => {
    setPending((p) => p.filter((x) => x.id !== id));
    setSkippedFor(null);
  };

  const actOnAnomaly = (id: string) => {
    setAnomalyActed((s) => new Set(s).add(id));
    window.setTimeout(() => {
      setAnomalyDismissed((s) => new Set(s).add(id));
    }, 1400);
  };

  const visibleActions = state.actions.filter((a) => !undoneAuto.has(a.id));
  const visibleAnomalies = homeData.anomalies.filter(
    (a) => !anomalyDismissed.has(a.id)
  );

  return (
    <div className="relative h-full w-full">
      {/* sunrise gradient top half */}
      <div className="sunrise absolute inset-x-0 top-0 h-[420px]" />
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
        <GlobalHeader
          home={home}
          me={me}
          tone="light"
          onOpenHomeSwitcher={onOpenHomeSwitcher}
          onOpenProfile={onOpenProfile}
        />

        {/* greeting */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="px-6 pt-7 text-white"
        >
          <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
            Sunday · May 5
          </p>
          <h1 className="mt-1 text-[34px] font-semibold leading-tight tracking-tight">
            Good morning,
            <br />
            {me.name}
          </h1>
        </motion.div>

        {/* state badge */}
        <motion.button
          onClick={onOpenPresence}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mx-6 mt-5 flex items-center gap-2.5 rounded-full bg-white/15 px-3 py-1.5 text-white ring-1 ring-white/25 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-white opacity-60" />
            <span className="relative h-2 w-2 rounded-full bg-white" />
          </span>
          <span className="text-[13px] font-medium">
            Presence AI · {state.name}
          </span>
        </motion.button>

        {/* mode indicator (Suggest only, hidden when learning) */}
        {mode === "suggest" && !learning && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mx-6 mt-2 flex items-center gap-1.5 text-[11px] text-white/70"
          >
            <Sparkles size={11} strokeWidth={2.4} />
            <span>Suggest Mode · Day 3 of 7</span>
            <span className="text-white/40">— graduates to Auto on May 9</span>
          </motion.div>
        )}

        {/* LEARNING BANNER — replaces hero when 48-hour learning is on */}
        {learning ? (
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-6 overflow-hidden rounded-[28px] bg-[#16191c]/85 ring-1 ring-amber-400/25 backdrop-blur-xl"
          >
            <div className="px-5 pt-5 pb-3">
              <div className="flex items-center gap-2 text-amber-300">
                <Cpu size={14} strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                  Learning your home · Hour 12 of 48
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-white/85">
                Watching, not acting yet. Here's what we'd have done.
              </p>
            </div>
            <div className="mx-5 h-px bg-white/8" />
            <ul className="px-2 py-2">
              {state.actions.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.li
                    key={a.id}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 0.55 }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.5 }}
                    className="flex items-start gap-3 rounded-2xl px-3 py-2.5"
                  >
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/8 text-white/50">
                      <Icon size={15} strokeWidth={2.2} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14px] font-medium text-white/65 line-through decoration-white/20">
                        {a.label}
                      </p>
                      <p className="text-[12px] text-white/40">{a.device}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ) : (
          /* hero card */
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-6 overflow-hidden rounded-[28px] bg-[#16191c]/85 ring-1 ring-white/8 backdrop-blur-xl"
          >
            <div className="px-5 pt-5 pb-4">
              <div className="flex items-center gap-2 text-[#fbbf24]">
                <Sparkles size={14} strokeWidth={2.5} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                  {mode === "auto"
                    ? `Auto-actioned at ${state.inferredAt}`
                    : `Detected at ${state.inferredAt}`}
                </span>
              </div>
              <p className="mt-2 text-[15px] leading-snug text-white/90">
                {state.rationale}
              </p>
            </div>

            {/* Auto: action list with undo */}
            {mode === "auto" && visibleActions.length > 0 && (
              <>
                <div className="mx-5 h-px bg-white/8" />
                <ul className="px-2 py-2">
                  <AnimatePresence initial={false}>
                    {visibleActions.map((a, i) => {
                      const Icon = a.icon;
                      return (
                        <motion.li
                          key={a.id}
                          layout
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0, marginBottom: 0 }}
                          transition={{ delay: i === 0 ? 0.95 : 0, duration: 0.35 }}
                          className="flex items-start gap-3 rounded-2xl px-3 py-2.5"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fbbf24]/15 text-[#fbbf24]">
                            <Icon size={15} strokeWidth={2.4} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-medium text-white">
                              {a.label}
                            </p>
                            <p className="text-[12px] text-white/55">{a.device}</p>
                          </div>
                          <button
                            onClick={() => undoAuto(a.id)}
                            className="flex shrink-0 items-center gap-1 rounded-full bg-white/8 px-2.5 py-1 text-[11px] font-medium text-white/70 ring-1 ring-white/10"
                          >
                            <RotateCcw size={11} strokeWidth={2.4} />
                            Undo
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </>
            )}

            <div className="flex items-center justify-between border-t border-white/8 px-5 py-3">
              <button
                onClick={onOpenPresence}
                className="text-[13px] font-medium text-[#8ab4f8]"
              >
                See how I knew →
              </button>
              <button
                onClick={onOpenFeedback}
                className="rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black"
              >
                Did we get this right?
              </button>
            </div>
          </motion.div>
        )}

        {/* Undone pill */}
        <AnimatePresence>
          {undoPill && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mx-auto mt-3 flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 ring-1 ring-white/10 backdrop-blur"
            >
              <RotateCcw size={11} strokeWidth={2.4} />
              Undone
            </motion.div>
          )}
        </AnimatePresence>

        {/* PENDING SUGGESTIONS — Suggest Mode only, not while learning */}
        {mode === "suggest" && !learning && pending.length > 0 && (
          <Section
            title="Pending suggestions"
            count={pending.length}
            delay={1.0}
          >
            <div className="space-y-2 px-4">
              <AnimatePresence>
                {pending.map((s) => (
                  <motion.div
                    key={s.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -12, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden rounded-2xl bg-[#16191c] ring-1 ring-white/8"
                  >
                    <div className="flex items-start gap-3 px-3 py-3">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-[#8ab4f8]/15 text-[#8ab4f8]">
                        <s.icon size={17} strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14px] font-semibold text-white">
                          {s.label}
                        </p>
                        <p className="mt-0.5 text-[11px] text-white/55">
                          {s.device}
                        </p>
                        <p className="mt-1.5 text-[12px] leading-snug text-white/70">
                          {s.rationale}
                        </p>
                      </div>
                    </div>

                    {skippedFor === s.id ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-wrap gap-1.5 border-t border-white/6 px-3 py-2.5"
                      >
                        <p className="w-full pb-1 text-[10px] font-semibold uppercase tracking-wider text-white/45">
                          Why?
                        </p>
                        {skipReasons.map((r) => (
                          <button
                            key={r}
                            onClick={() => skipWithReason(s.id, r)}
                            className="rounded-full bg-white/8 px-2.5 py-1 text-[11px] text-white/80 ring-1 ring-white/10"
                          >
                            {r}
                          </button>
                        ))}
                        <button
                          onClick={() => setSkippedFor(null)}
                          className="rounded-full px-2.5 py-1 text-[11px] text-white/45"
                        >
                          Cancel
                        </button>
                      </motion.div>
                    ) : (
                      <div className="flex gap-2 border-t border-white/6 px-3 py-2.5">
                        <button
                          onClick={() => setSkippedFor(s.id)}
                          className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-white/6 py-2 text-[12px] font-medium text-white/75 ring-1 ring-white/8"
                        >
                          <XIcon size={13} strokeWidth={2.4} />
                          Skip
                        </button>
                        <button
                          onClick={() => confirm(s)}
                          className="flex flex-[2] items-center justify-center gap-1.5 rounded-full bg-emerald-500 py-2 text-[12px] font-semibold text-emerald-950"
                        >
                          <Check size={13} strokeWidth={3} />
                          Confirm
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Section>
        )}

        {/* JUST DONE — Suggest Mode only (auto mode shows actions in hero card) */}
        {mode === "suggest" && !learning && confirmed.length > 0 && (
          <Section title="Just done" count={confirmed.length} delay={1.1}>
            <ul className="space-y-1.5 px-4">
              <AnimatePresence initial={false}>
                {confirmed.map((s) => (
                  <motion.li
                    key={s.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 px-3 py-2.5 ring-1 ring-emerald-400/25"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
                      <s.icon size={15} strokeWidth={2.4} />
                    </div>
                    <p className="flex-1 truncate text-[13px] font-medium text-white">
                      {s.label}
                    </p>
                    <button
                      onClick={() => undoConfirmed(s)}
                      className="flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5 text-[11px] text-white/70"
                    >
                      <RotateCcw size={10} strokeWidth={2.4} />
                      Undo
                    </button>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </Section>
        )}

        {/* NEEDS YOUR ATTENTION */}
        {visibleAnomalies.length > 0 && (
          <Section
            title="Needs your attention"
            count={visibleAnomalies.length}
            delay={1.4}
          >
            <div className="space-y-2 px-4">
              <AnimatePresence initial={false}>
                {visibleAnomalies.map((a, i) => {
                  const Icon = a.icon;
                  const acted = anomalyActed.has(a.id);
                  const tint =
                    a.tone === "warn"
                      ? "bg-rose-500/12 text-rose-300 ring-rose-400/25"
                      : "bg-amber-400/12 text-amber-300 ring-amber-400/25";
                  return (
                    <motion.div
                      key={a.id}
                      layout
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ delay: 1.5 + i * 0.08, duration: 0.4 }}
                      className={cn(
                        "flex items-start gap-3 rounded-2xl p-3 ring-1 transition",
                        acted
                          ? "bg-emerald-500/10 ring-emerald-400/30"
                          : "bg-[#16191c] ring-white/5"
                      )}
                    >
                      <div
                        className={cn(
                          "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl ring-1",
                          acted
                            ? "bg-emerald-500/20 text-emerald-300 ring-emerald-400/30"
                            : tint
                        )}
                      >
                        {acted ? (
                          <Check size={16} strokeWidth={2.6} />
                        ) : (
                          <Icon size={16} strokeWidth={2.2} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-white">
                          {a.title}
                        </p>
                        <p className="text-[11px] text-white/55">{a.detail}</p>
                      </div>
                      {acted ? (
                        <span className="shrink-0 self-center rounded-full bg-emerald-500/20 px-3 py-1.5 text-[12px] font-semibold text-emerald-300 ring-1 ring-emerald-400/30">
                          {pastTense[a.actionLabel] ?? "Done"}
                        </span>
                      ) : (
                        <button
                          onClick={() => actOnAnomaly(a.id)}
                          className="shrink-0 self-center rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-black"
                        >
                          {a.actionLabel}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </Section>
        )}

        {/* QUICK CONTROLS */}
        <Section title="Quick controls" delay={1.6}>
          <div className="grid grid-cols-2 gap-3 px-4">
            {homeData.quickControls.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={c.id}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.7 + i * 0.05, duration: 0.4 }}
                  className={cn(
                    "rounded-2xl p-3.5 ring-1 transition",
                    c.on
                      ? "bg-white text-black ring-white/10"
                      : "bg-[#16191c] text-white ring-white/5"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        c.on ? "bg-black/8 text-black" : "bg-white/5 text-white/70"
                      )}
                    >
                      <Icon size={18} strokeWidth={2.2} />
                    </div>
                    {c.primaryMetric ? (
                      <span className="text-[16px] font-semibold tabular-nums">
                        {c.primaryMetric}
                      </span>
                    ) : (
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          c.on ? "bg-emerald-500" : "bg-white/20"
                        )}
                      />
                    )}
                  </div>
                  <p className="mt-3 text-[14px] font-semibold tracking-tight">
                    {c.name}
                  </p>
                  <p
                    className={cn(
                      "text-[12px]",
                      c.on ? "text-black/55" : "text-white/45"
                    )}
                  >
                    {c.state}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-[10px] font-medium uppercase tracking-wider",
                      c.on ? "text-black/40" : "text-white/35"
                    )}
                  >
                    {c.why}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </Section>

        {/* All devices link */}
        <button
          onClick={onOpenAllDevices}
          className="mx-4 mt-4 flex w-[calc(100%-2rem)] items-center justify-between rounded-2xl bg-[#16191c] px-4 py-3 ring-1 ring-white/5"
        >
          <span className="text-[13px] font-medium text-white/85">
            All {home.deviceCount} devices
          </span>
          <ChevronRight size={16} className="text-white/40" />
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  count,
  delay = 1.0,
  children,
}: {
  title: string;
  count?: number;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="mt-6"
    >
      <div className="mb-2 flex items-end justify-between px-5">
        <h2 className="text-[16px] font-semibold tracking-tight text-white">
          {title}
        </h2>
        {typeof count === "number" && (
          <span className="text-[11px] font-medium text-white/45">
            {count}
          </span>
        )}
      </div>
      {children}
    </motion.section>
  );
}
