"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, Code } from "lucide-react";
import { IPhoneFrame } from "@/components/iphone-frame";
import { TabBar, type TabId } from "@/components/tab-bar";
import { HomeScreen } from "@/components/screens/home";
import { PresenceAIScreen } from "@/components/screens/presence-ai";
import { FeedbackScreen } from "@/components/screens/feedback";
import { ReportScreen } from "@/components/screens/report";
import { OnboardingScreen } from "@/components/screens/onboarding";

type ScreenId = TabId | "feedback";

const tabFor: Record<ScreenId, TabId> = {
  home: "home",
  feedback: "home",
  presence: "presence",
  activity: "activity",
  settings: "settings",
};

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const activeTab = tabFor[screen];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050608]">
      {/* ambient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 10%, rgba(138,180,248,0.18) 0%, transparent 60%), radial-gradient(50% 40% at 90% 80%, rgba(255,179,77,0.16) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center px-6 py-10 lg:flex-row lg:items-start lg:gap-12 lg:py-16">
        {/* left: title + meta */}
        <div className="w-full max-w-md text-white lg:flex-1 lg:pt-8">
          <div className="flex items-center gap-2 text-[#8ab4f8]">
            <Sparkles size={16} strokeWidth={2.4} />
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em]">
              Nest Aware Premium · Prototype
            </span>
          </div>
          <h1 className="mt-2 text-balance text-[40px] font-semibold leading-[1.05] tracking-tight">
            The home that
            <br />
            <span className="bg-gradient-to-r from-[#a8c7fa] via-[#fbbf24] to-[#f06292] bg-clip-text text-transparent">
              acts before you ask.
            </span>
          </h1>
          <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-white/65">
            Nest Presence AI fuses phone geofencing, on-device camera ML, your Google
            Calendar, and learned time-of-day patterns into six home states — and runs
            your home automatically. No voice command. No manual routine setup.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 max-w-sm">
            <FeatureChip label="Morning Wake hero" hot />
            <FeatureChip label="6-state inference" />
            <FeatureChip label='"Did we get this right?"' hot />
            <FeatureChip label="Weekly Intelligence Report" />
            <FeatureChip label="Suggest vs Auto modes" />
            <FeatureChip label="On-device + local-only" />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href="https://github.com/heruis/nest-presence-ai-app"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/85 ring-1 ring-white/10 hover:bg-white/10"
            >
              <Code size={14} /> GitHub repo
              <ExternalLink size={12} className="opacity-60" />
            </a>
            <a
              href="https://github.com/heruis/nest-presence-ai-app/blob/main/PROMPT.md"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/85 ring-1 ring-white/10 hover:bg-white/10"
            >
              Source-of-truth spec
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-white/35 max-w-sm">
            UCLA MGMT 275 · Final Project · Herui Song. Mock data only — no live
            account integration. Designed mobile-first; tap a tab below the iPhone to
            navigate.
          </p>
        </div>

        {/* right: phone */}
        <div className="mt-8 flex w-full justify-center lg:mt-0 lg:flex-1">
          <IPhoneFrame>
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  {screen === "home" && (
                    <HomeScreen
                      onOpenPresence={() => setScreen("presence")}
                      onOpenFeedback={() => setScreen("feedback")}
                    />
                  )}
                  {screen === "presence" && <PresenceAIScreen />}
                  {screen === "feedback" && <FeedbackScreen />}
                  {screen === "activity" && <ReportScreen />}
                  {screen === "settings" && <OnboardingScreen />}
                </motion.div>
              </AnimatePresence>

              <TabBar
                active={activeTab}
                onChange={(t) => setScreen(t as ScreenId)}
              />
            </div>
          </IPhoneFrame>
        </div>
      </div>
    </div>
  );
}

function FeatureChip({ label, hot = false }: { label: string; hot?: boolean }) {
  return (
    <span
      className={`rounded-xl px-3 py-2 text-[11px] font-medium ring-1 ${
        hot
          ? "bg-gradient-to-br from-[#fbbf24]/20 to-[#f06292]/15 text-amber-100 ring-amber-400/20"
          : "bg-white/5 text-white/75 ring-white/10"
      }`}
    >
      {label}
    </span>
  );
}
