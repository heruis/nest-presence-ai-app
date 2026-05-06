"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  HandHelping,
  Wand,
  Lock,
  Cpu,
  CircleCheck,
  ChevronRight,
  Smartphone,
  Camera,
  Calendar as CalIcon,
} from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { GlobalHeader } from "@/components/global-header";
import { cn } from "@/lib/cn";
import type { HomeLocation, HouseholdMember } from "@/lib/data";

export type Mode = "suggest" | "auto";

export function OnboardingScreen({
  mode,
  setMode,
  home,
  me,
  onOpenHomeSwitcher,
  onOpenProfile,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  home: HomeLocation;
  me: HouseholdMember;
  onOpenHomeSwitcher: () => void;
  onOpenProfile: () => void;
}) {
  const [learning, setLearning] = useState(true);
  const [localOnly, setLocalOnly] = useState(false);

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
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">Settings</span>
        </div>
        <h1 className="mt-1 text-[24px] font-semibold leading-tight tracking-tight text-white">
          How should Presence AI work for you?
        </h1>
      </div>

      {/* mode picker */}
      <div className="mt-5 space-y-2 px-4">
        <ModeOption
          active={mode === "suggest"}
          onClick={() => setMode("suggest")}
          icon={<HandHelping size={20} strokeWidth={2.2} />}
          title="Suggest Mode"
          body="AI proposes — you tap to confirm."
          badge="Soft start"
        />
        <ModeOption
          active={mode === "auto"}
          onClick={() => setMode("auto")}
          icon={<Wand size={20} strokeWidth={2.2} />}
          title="Auto Mode"
          body="AI acts silently. You can override anything."
          badge="Recommended"
        />
      </div>

      {/* learning toggle */}
      <div className="mx-4 mt-4 rounded-3xl bg-[#16191c] ring-1 ring-white/5">
        <ToggleRow
          icon={<Cpu size={16} strokeWidth={2.2} />}
          tint="amber"
          title="48-hour learning-only window"
          body="Watch and learn before any action fires. Recommended for new homes."
          on={learning}
          onChange={setLearning}
        />
        <div className="mx-4 h-px bg-white/6" />
        <ToggleRow
          icon={<Lock size={16} strokeWidth={2.2} />}
          tint="emerald"
          title="Local-only mode"
          body="On-device inference only. Disables the weekly report and free-text feedback."
          on={localOnly}
          onChange={setLocalOnly}
        />
      </div>

      {/* household readiness */}
      <div className="mx-4 mt-4 rounded-3xl bg-gradient-to-br from-[#1a4a8a]/30 to-[#16191c] p-4 ring-1 ring-[#8ab4f8]/15">
        <div className="flex items-center gap-2 text-[#8ab4f8]">
          <CircleCheck size={14} strokeWidth={2.5} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
            Your household is ready
          </p>
        </div>
        <p className="mt-2 text-[14px] font-semibold text-white">
          4 of 4 signals connected
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <ReadyChip icon={<Smartphone size={13} />} label="2 phones · geofence active" />
          <ReadyChip icon={<Camera size={13} />} label="3 Nest cameras · on-device ML" />
          <ReadyChip icon={<CalIcon size={13} />} label="Google Calendar linked" />
          <ReadyChip icon={<Cpu size={13} />} label="Tensor inference enabled" />
        </div>
      </div>

      {/* primary CTA */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        className="mx-4 mt-5 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-full bg-white py-3.5 text-[14px] font-semibold text-black"
      >
        Activate Presence AI in {mode === "auto" ? "Auto" : "Suggest"} Mode
        <ChevronRight size={16} strokeWidth={2.6} />
      </motion.button>

      <p className="mx-6 mt-3 text-center text-[11px] leading-snug text-white/45">
        Included with Nest Aware Premium ($15/mo). All presence inference runs on-device. No raw video or audio
        leaves your home.
      </p>
    </div>
  );
}

function ModeOption({
  active,
  onClick,
  icon,
  title,
  body,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  body: string;
  badge: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "block w-full rounded-3xl p-4 text-left ring-1 transition",
        active
          ? "bg-gradient-to-br from-[#8ab4f8]/25 to-[#16191c] ring-[#8ab4f8]/40"
          : "bg-[#16191c] ring-white/5"
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl",
            active ? "bg-[#8ab4f8]/25 text-[#8ab4f8]" : "bg-white/5 text-white/65"
          )}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[15px] font-semibold text-white">{title}</p>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                active ? "bg-[#8ab4f8]/25 text-[#8ab4f8]" : "bg-white/8 text-white/55"
              )}
            >
              {badge}
            </span>
          </div>
          <p className="mt-1 text-[12px] leading-snug text-white/65">{body}</p>
        </div>
        <span
          className={cn(
            "mt-1 h-5 w-5 shrink-0 rounded-full ring-2 transition",
            active
              ? "bg-[#8ab4f8] ring-[#8ab4f8]"
              : "bg-transparent ring-white/25"
          )}
        >
          {active && (
            <span className="flex h-full w-full items-center justify-center text-[#0a0c0e]">
              <CircleCheck size={14} strokeWidth={3} />
            </span>
          )}
        </span>
      </div>
    </button>
  );
}

function ToggleRow({
  icon,
  tint,
  title,
  body,
  on,
  onChange,
}: {
  icon: React.ReactNode;
  tint: "amber" | "emerald";
  title: string;
  body: string;
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  const tintCls = tint === "amber" ? "bg-amber-400/15 text-amber-300" : "bg-emerald-400/15 text-emerald-300";
  return (
    <div className="flex items-start gap-3 p-4">
      <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", tintCls)}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-semibold text-white">{title}</p>
        <p className="text-[11px] leading-snug text-white/55">{body}</p>
      </div>
      <button
        onClick={() => onChange(!on)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full transition",
          on ? "bg-emerald-500" : "bg-white/10"
        )}
      >
        <motion.span
          animate={{ x: on ? 23 : 3 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="absolute top-[3px] h-[22px] w-[22px] rounded-full bg-white shadow"
        />
      </button>
    </div>
  );
}

function ReadyChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-white/5 px-2.5 py-1.5 text-white/75 ring-1 ring-white/8">
      <span className="text-[#8ab4f8]">{icon}</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
