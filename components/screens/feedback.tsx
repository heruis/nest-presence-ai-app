"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ThumbsUp,
  ThumbsDown,
  CircleQuestionMark,
  Sparkles,
  Check,
  Sunrise,
  Brain,
  ArrowRight,
} from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { GlobalHeader } from "@/components/global-header";
import { morningWake, recentFeedback, type HomeLocation, type HouseholdMember } from "@/lib/data";
import { cn } from "@/lib/cn";

type Outcome = "correct" | "partial" | "wrong";

const suggestions: Record<Outcome, string[]> = {
  correct: ["Perfect timing", "Lights too bright", "Briefing too loud"],
  partial: ["Right state, wrong actions", "Wrong wake time today", "Skip briefing on weekends"],
  wrong: ["I wasn't actually awake", "Working from home today", "We had a guest stay over"],
};

const learningCopy: Record<Outcome, { title: string; rule: string; impact: string }> = {
  correct: {
    title: "Locking it in",
    rule: "Sunday 7:00–7:20 AM wake remains the strong default",
    impact: "Morning Wake confidence will tick up to 96%.",
  },
  partial: {
    title: "Tuning the action set",
    rule: "We'll keep detecting Morning Wake but adjust which actions auto-fire",
    impact: "Confidence holds; only flagged actions retrain.",
  },
  wrong: {
    title: "Holding back next Sunday",
    rule: "Sunday 7 AM Morning Wake will require a second signal to fire",
    impact: "Confidence drops to 78%, falls below auto threshold.",
  },
};

export function FeedbackScreen({
  home,
  me,
  onOpenHomeSwitcher,
  onOpenProfile,
}: {
  home: HomeLocation;
  me: HouseholdMember;
  onOpenHomeSwitcher: () => void;
  onOpenProfile: () => void;
}) {
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reset = () => {
    setOutcome(null);
    setNote("");
    setSubmitted(false);
  };

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
        <h1 className="text-[26px] font-semibold leading-tight tracking-tight text-white">
          Did we get this right?
        </h1>
        <p className="mt-2 text-[12px] leading-snug text-white/60">
          Your correction trains Presence AI for your household.
        </p>
      </div>

      {/* automation summary */}
      <div className="mx-4 mt-5 rounded-3xl bg-gradient-to-br from-[#3a1d4a]/60 via-[#16191c] to-[#16191c] p-4 ring-1 ring-white/8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400/15 text-amber-300">
            <Sunrise size={20} strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-white">Morning Wake · 7:14 AM</p>
            <p className="text-[11px] text-white/55">{morningWake.actions.length} actions auto-fired</p>
          </div>
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
            Auto-fired
          </span>
        </div>
        <p className="mt-3 text-[12px] leading-snug text-white/70">
          Lights raised to 35%, thermostat to 71°, kitchen Hub started a briefing. Front
          door unlock was held below threshold.
        </p>
      </div>

      {/* outcome buttons */}
      <AnimatePresence mode="wait">
        {!submitted && (
          <motion.div
            key="picker"
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mt-6 px-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                How'd we do?
              </p>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 px-4">
              <OutcomeButton
                active={outcome === "correct"}
                onClick={() => setOutcome("correct")}
                tint="emerald"
                icon={<ThumbsUp size={20} strokeWidth={2.2} />}
                label="Got it right"
              />
              <OutcomeButton
                active={outcome === "partial"}
                onClick={() => setOutcome("partial")}
                tint="amber"
                icon={<CircleQuestionMark size={20} strokeWidth={2.2} />}
                label="Almost"
              />
              <OutcomeButton
                active={outcome === "wrong"}
                onClick={() => setOutcome("wrong")}
                tint="rose"
                icon={<ThumbsDown size={20} strokeWidth={2.2} />}
                label="Wrong call"
              />
            </div>

            <AnimatePresence>
              {outcome && (
                <motion.div
                  key={outcome}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* note + suggestions */}
                  <div className="mx-4 mt-5 rounded-3xl bg-[#16191c] p-4 ring-1 ring-white/6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      Add a quick note (optional)
                    </p>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder='e.g. "We were hosting a guest"'
                      className="mt-2 h-20 w-full resize-none rounded-2xl bg-[#1f2327] px-3 py-2.5 text-[13px] text-white placeholder:text-white/30 outline-none ring-1 ring-white/5 focus:ring-[#8ab4f8]/50"
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {suggestions[outcome].map((s) => (
                        <button
                          key={s}
                          onClick={() => setNote(s)}
                          className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/70 ring-1 ring-white/8 hover:bg-white/10"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* learning preview */}
                  <div className="mx-4 mt-3 rounded-3xl bg-gradient-to-br from-[#1a4a8a]/35 to-[#16191c] p-4 ring-1 ring-[#8ab4f8]/20">
                    <div className="flex items-center gap-2 text-[#8ab4f8]">
                      <Brain size={14} strokeWidth={2.4} />
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                        What we'll learn
                      </p>
                    </div>
                    <p className="mt-2 text-[14px] font-semibold text-white">
                      {learningCopy[outcome].title}
                    </p>
                    <p className="mt-1 text-[12px] leading-snug text-white/70">
                      {learningCopy[outcome].rule}
                    </p>
                    <p className="mt-2 text-[11px] text-[#8ab4f8]">
                      {learningCopy[outcome].impact}
                    </p>
                  </div>

                  <button
                    onClick={() => setSubmitted(true)}
                    className="mx-4 mt-4 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-full bg-white py-3 text-[14px] font-semibold text-black"
                  >
                    Send feedback
                    <ArrowRight size={16} strokeWidth={2.4} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {submitted && (
          <motion.div
            key="thanks"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mx-4 mt-6 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/30 via-[#16191c] to-[#16191c] p-5 ring-1 ring-emerald-400/30"
          >
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 320, damping: 14 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-300"
              >
                <Check size={26} strokeWidth={3} />
              </motion.div>
              <div>
                <p className="text-[16px] font-semibold text-white">Thanks — model updated.</p>
                <p className="text-[12px] text-white/65">On-device, in 1.4 seconds.</p>
              </div>
            </div>

            {outcome && (
              <div className="mt-4 rounded-2xl bg-black/30 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
                  Applied
                </p>
                <p className="mt-1 text-[13px] leading-snug text-white/85">
                  {learningCopy[outcome].rule}
                </p>
              </div>
            )}

            <button
              onClick={reset}
              className="mt-4 w-full rounded-full bg-white/10 py-2.5 text-[13px] font-medium text-white ring-1 ring-white/15"
            >
              Give more feedback
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* history */}
      <div className="mt-7 px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Your last corrections
        </p>
      </div>
      <div className="mt-2 space-y-2 px-4">
        {recentFeedback.map((f) => {
          const tone =
            f.outcome === "correct"
              ? "bg-emerald-500/15 text-emerald-300"
              : f.outcome === "partial"
                ? "bg-amber-400/15 text-amber-300"
                : "bg-rose-500/15 text-rose-300";
          const label =
            f.outcome === "correct" ? "Correct" : f.outcome === "partial" ? "Almost" : "Wrong";
          return (
            <div
              key={f.id}
              className="rounded-2xl bg-[#16191c] px-4 py-3 ring-1 ring-white/5"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-white">{f.state}</p>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    tone
                  )}
                >
                  {label}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-white/55">{f.ts}</p>
              {f.note !== "—" && (
                <p className="mt-2 text-[12px] italic text-white/70">"{f.note}"</p>
              )}
              <p className="mt-2 text-[11px] text-[#8ab4f8]">→ {f.appliedTo}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OutcomeButton({
  active,
  onClick,
  tint,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  tint: "emerald" | "amber" | "rose";
  icon: React.ReactNode;
  label: string;
}) {
  const tints = {
    emerald: "from-emerald-400/40 to-emerald-500/10 ring-emerald-400/40 text-emerald-300",
    amber: "from-amber-400/40 to-amber-500/10 ring-amber-400/40 text-amber-300",
    rose: "from-rose-500/40 to-rose-500/10 ring-rose-400/40 text-rose-300",
  } as const;

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex aspect-square flex-col items-center justify-center gap-2 rounded-3xl ring-1 transition",
        active
          ? `bg-gradient-to-b ${tints[tint]}`
          : "bg-[#16191c] ring-white/5 text-white/65"
      )}
    >
      <motion.div animate={{ scale: active ? 1.15 : 1 }} transition={{ type: "spring", stiffness: 320, damping: 16 }}>
        {icon}
      </motion.div>
      <span className="text-[11px] font-semibold tracking-tight">{label}</span>
    </button>
  );
}
