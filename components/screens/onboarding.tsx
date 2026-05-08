"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  HandHelping,
  Wand,
  Lock,
  CircleCheck,
  ChevronRight,
  Smartphone,
  Camera,
  Calendar as CalIcon,
  Cpu,
  Check,
  Shield,
  MapPin,
  ScanFace,
  Mic,
} from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { GlobalHeader } from "@/components/global-header";
import { cn } from "@/lib/cn";
import {
  householdMembers,
  memberPrivacy,
  signalLabels,
  type PrivacySignal,
  type HomeLocation,
  type HouseholdMember,
} from "@/lib/data";

export type Mode = "suggest" | "auto";

const signalIcons: Record<PrivacySignal, typeof MapPin> = {
  location: MapPin,
  face: ScanFace,
  calendar: CalIcon,
  voice: Mic,
};

export function OnboardingScreen({
  mode,
  setMode,
  localOnly,
  setLocalOnly,
  onActivate,
  home,
  me,
  onOpenHomeSwitcher,
  onOpenProfile,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  localOnly: boolean;
  setLocalOnly: (v: boolean) => void;
  onActivate: (m: Mode) => void;
  home: HomeLocation;
  me: HouseholdMember;
  onOpenHomeSwitcher: () => void;
  onOpenProfile: () => void;
}) {
  const [activating, setActivating] = useState(false);

  const activate = () => {
    if (activating) return;
    setActivating(true);
    window.setTimeout(() => {
      onActivate(mode);
      setActivating(false);
    }, 600);
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

      {/* privacy toggle */}
      <div className="mx-4 mt-4 rounded-3xl bg-[#16191c] ring-1 ring-white/5">
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

      {/* who knows what — privacy panel (AMENDMENTS #7e) */}
      <div className="mx-4 mt-4 rounded-3xl bg-[#16191c] p-4 ring-1 ring-white/5">
        <div className="flex items-center gap-2 text-emerald-300">
          <Shield size={14} strokeWidth={2.4} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
            Who knows what
          </p>
        </div>
        <p className="mt-1 text-[12px] leading-snug text-white/55">
          What each person lets Presence AI use about them.
        </p>
        <ul className="mt-3 space-y-2">
          {memberPrivacy.map((mp) => {
            const member = householdMembers.find((m) => m.id === mp.memberId);
            if (!member) return null;
            const enabled = (Object.keys(signalLabels) as PrivacySignal[]).filter(
              (k) => mp.signals[k]
            );
            return (
              <li
                key={mp.memberId}
                className="flex items-start gap-3 rounded-2xl bg-[#1f2327] p-3"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold text-white"
                  style={{ background: member.color }}
                >
                  {member.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-semibold text-white">
                      {member.name}
                    </p>
                    <span className="rounded-full bg-white/8 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/55">
                      {member.role}
                    </span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {(Object.keys(signalLabels) as PrivacySignal[]).map((k) => {
                      const SignalIcon = signalIcons[k];
                      const on = mp.signals[k] === true;
                      return (
                        <span
                          key={k}
                          className={cn(
                            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium",
                            on
                              ? "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/25"
                              : "bg-white/5 text-white/40 line-through decoration-white/30"
                          )}
                        >
                          <SignalIcon size={10} strokeWidth={2.4} />
                          {signalLabels[k]}
                        </span>
                      );
                    })}
                  </div>
                  {enabled.length === 0 && (
                    <p className="mt-1.5 text-[11px] text-white/45">
                      Nothing — guest mode
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* primary CTA */}
      <motion.button
        onClick={activate}
        whileTap={{ scale: 0.98 }}
        disabled={activating}
        className={cn(
          "mx-4 mt-5 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-semibold transition",
          activating ? "bg-emerald-400 text-emerald-950" : "bg-white text-black"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {activating ? (
            <motion.span
              key="check"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2"
            >
              <Check size={16} strokeWidth={3} />
              Activated
            </motion.span>
          ) : (
            <motion.span
              key="label"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-2"
            >
              Activate Presence AI in {mode === "auto" ? "Auto" : "Suggest"} Mode
              <ChevronRight size={16} strokeWidth={2.6} />
            </motion.span>
          )}
        </AnimatePresence>
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
        role="switch"
        aria-checked={on}
        aria-label={title}
        className={cn(
          "relative inline-flex h-[28px] w-[48px] shrink-0 items-center rounded-full p-[3px] transition-colors duration-200",
          on ? "bg-emerald-500" : "bg-white/15"
        )}
      >
        <motion.span
          animate={{ x: on ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="block h-[22px] w-[22px] rounded-full bg-white shadow-md"
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
