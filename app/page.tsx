"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ExternalLink, Code, Check, Sunrise, DoorOpen } from "lucide-react";
import { IPhoneFrame } from "@/components/iphone-frame";
import { TabBar, type TabId } from "@/components/tab-bar";
import { HomeScreen } from "@/components/screens/home";
import { PresenceAIScreen } from "@/components/screens/presence-ai";
import { FeedbackScreen } from "@/components/screens/feedback";
import { ReportScreen } from "@/components/screens/report";
import { OnboardingScreen, type Mode } from "@/components/screens/onboarding";
import { DevicesScreen } from "@/components/screens/devices";
import { HomeSwitcherSheet } from "@/components/home-switcher-sheet";
import { ProfileSheet } from "@/components/profile-sheet";
import {
  homes,
  householdMembers,
  dataForHome,
  type DeviceAction,
  type DeviceState,
  type ScenarioId,
} from "@/lib/data";

type ScreenId = TabId | "feedback" | "devices";

const tabFor: Record<ScreenId, TabId> = {
  home: "home",
  feedback: "home",
  devices: "home",
  presence: "presence",
  activity: "activity",
  settings: "settings",
};

export default function Page() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [mode, setMode] = useState<Mode>("auto");
  const [activeHomeId, setActiveHomeId] = useState(homes[0].id);
  const [scenario, setScenarioState] = useState<ScenarioId>("morning-wake");
  const [homeSwitcherOpen, setHomeSwitcherOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [localOnly, setLocalOnly] = useState(false);
  const [activatedToast, setActivatedToast] = useState<string | null>(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);

  // Per-home device state — single source of truth for AI + manual mutations
  const [deviceStateByHome, setDeviceStateByHome] = useState<
    Record<string, Record<string, DeviceState>>
  >(() =>
    homes.reduce<Record<string, Record<string, DeviceState>>>((acc, h) => {
      acc[h.id] = dataForHome(h.id, "morning-wake").initialDeviceState;
      return acc;
    }, {})
  );

  // When the BH scenario changes, reset BH's device state to that scenario's
  // initial picture so the hero card's "after" matches what the AI just did.
  // Tahoe is single-scenario and untouched.
  const prevScenarioRef = useRef(scenario);
  useEffect(() => {
    if (prevScenarioRef.current === scenario) return;
    prevScenarioRef.current = scenario;
    setDeviceStateByHome((prev) => ({
      ...prev,
      "bh-house": dataForHome("bh-house", scenario).initialDeviceState,
    }));
  }, [scenario]);

  const activeTab = tabFor[screen];
  const home = homes.find((h) => h.id === activeHomeId) ?? homes[0];
  const me = householdMembers[0];
  const homeData = dataForHome(activeHomeId, scenario);
  const deviceState = deviceStateByHome[activeHomeId];

  const headerProps = {
    home,
    me,
    onOpenHomeSwitcher: () => setHomeSwitcherOpen(true),
    onOpenProfile: () => setProfileOpen(true),
  };

  const triggerActivatedToast = (m: Mode) => {
    setActivatedToast(m === "auto" ? "Activated · Auto Mode" : "Activated · Suggest Mode");
    setScreen("home");
    setTimeout(() => setActivatedToast(null), 2400);
  };

  const mutateDevice = (deviceId: string, next: DeviceState) => {
    setDeviceStateByHome((prev) => ({
      ...prev,
      [activeHomeId]: { ...prev[activeHomeId], [deviceId]: next },
    }));
  };

  const undoAction = (action: DeviceAction) => {
    mutateDevice(action.deviceId, action.before);
  };

  const openDevicesList = () => {
    setSelectedDeviceId(null);
    setScreen("devices");
  };
  const openDeviceDetail = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    setScreen("devices");
  };
  const goBackFromDevices = () => {
    setSelectedDeviceId(null);
    setScreen("home");
  };

  // Set as default — for the prototype, the visual confirmation is the contract.
  // The current device state stays put; toast tells the user the AI now treats it as the default.
  const setAsDefault = (_deviceId: string) => {
    // Intentionally a no-op on lib/data.ts — the toast inside DevicesScreen carries the affordance.
  };

  // Scenario picker on the intro side — clicking always pivots the phone to BH
  // with that scenario, since scenarios are BH-only for the prototype.
  const pickScenario = (s: ScenarioId) => {
    if (activeHomeId !== "bh-house") setActiveHomeId("bh-house");
    if (screen !== "home") setScreen("home");
    setSelectedDeviceId(null);
    setScenarioState(s);
  };
  const isScenarioActive = (s: ScenarioId) =>
    activeHomeId === "bh-house" && scenario === s;

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
            <FeatureChip label="Suggest vs Auto modes" hot />
            <FeatureChip label="Connected device truth" hot />
            <FeatureChip label='"Did we get this right?"' />
            <FeatureChip label="Multi-home + profile" />
            <FeatureChip label="Weekly Intelligence Report" />
          </div>

          {/* Scenario picker — drives the phone to a specific BH state (per AMENDMENTS #9c) */}
          <div className="mt-7 max-w-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Try a scenario
            </p>
            <p className="mt-1 text-[12px] leading-snug text-white/45">
              Tap to drop the phone into a different moment in your home.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <ScenarioCard
                active={isScenarioActive("morning-wake")}
                onClick={() => pickScenario("morning-wake")}
                icon={<Sunrise size={15} strokeWidth={2.2} />}
                accent="amber"
                time="7:14 AM · Sunday"
                title="Morning Wake"
                blurb="Lights ramp, briefing waits on the Hub, indoor cam goes private."
              />
              <ScenarioCard
                active={isScenarioActive("last-person-left")}
                onClick={() => pickScenario("last-person-left")}
                icon={<DoorOpen size={15} strokeWidth={2.2} />}
                accent="blue"
                time="11:45 AM · Sunday"
                title="Last Person Left"
                blurb="You and Yuna left for breakfast. House goes to Away on its own."
              />
            </div>
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
            <a
              href="https://github.com/heruis/nest-presence-ai-app/blob/main/AMENDMENTS.md"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[12px] font-medium text-white/85 ring-1 ring-white/10 hover:bg-white/10"
            >
              Amendments log
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>

          <p className="mt-6 text-[11px] leading-relaxed text-white/35 max-w-sm">
            UCLA MGMT 275 · Final Project · Herui Song & Ethan Duffy. Mock data only — no live
            account integration. Tip: try Settings → Suggest Mode to see the
            confirmation flow.
          </p>
        </div>

        {/* right: phone */}
        <div className="mt-8 flex w-full justify-center lg:mt-0 lg:flex-1">
          <IPhoneFrame>
            <div className="relative h-full w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen + activeHomeId + mode + scenario}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0"
                >
                  {screen === "home" && (
                    <HomeScreen
                      mode={mode}
                      homeData={homeData}
                      deviceState={deviceState}
                      onOpenPresence={() => setScreen("presence")}
                      onOpenFeedback={() => setScreen("feedback")}
                      onOpenDevices={openDevicesList}
                      onSelectDevice={openDeviceDetail}
                      onMutateDevice={mutateDevice}
                      onUndoAction={undoAction}
                      {...headerProps}
                    />
                  )}
                  {screen === "presence" && <PresenceAIScreen homeData={homeData} {...headerProps} />}
                  {screen === "feedback" && <FeedbackScreen localOnly={localOnly} {...headerProps} />}
                  {screen === "activity" && (
                    <ReportScreen localOnly={localOnly} homeData={homeData} {...headerProps} />
                  )}
                  {screen === "settings" && (
                    <OnboardingScreen
                      mode={mode}
                      setMode={setMode}
                      localOnly={localOnly}
                      setLocalOnly={setLocalOnly}
                      onActivate={triggerActivatedToast}
                      {...headerProps}
                    />
                  )}
                  {screen === "devices" && (
                    <DevicesScreen
                      devices={homeData.devices}
                      deviceState={deviceState}
                      activeStateName={homeData.activeState.name}
                      homeName={home.shortName}
                      time={homeData.activeStateTime.split(" ")[0]}
                      selectedDeviceId={selectedDeviceId}
                      onSelectDevice={(id) => setSelectedDeviceId(id)}
                      onMutateDevice={mutateDevice}
                      onSetAsDefault={setAsDefault}
                      onBack={goBackFromDevices}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Activation toast */}
              <AnimatePresence>
                {activatedToast && (
                  <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute left-1/2 top-14 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-[12px] font-semibold text-emerald-950 shadow-lg"
                  >
                    <Check size={14} strokeWidth={3} />
                    {activatedToast}
                  </motion.div>
                )}
              </AnimatePresence>

              <TabBar
                active={activeTab}
                onChange={(t) => setScreen(t as ScreenId)}
              />

              <HomeSwitcherSheet
                open={homeSwitcherOpen}
                onClose={() => setHomeSwitcherOpen(false)}
                homes={homes}
                activeId={activeHomeId}
                onSelect={(id) => setActiveHomeId(id)}
              />
              <ProfileSheet
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
                me={me}
                members={householdMembers}
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

function ScenarioCard({
  active,
  onClick,
  icon,
  accent,
  time,
  title,
  blurb,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  accent: "amber" | "blue";
  time: string;
  title: string;
  blurb: string;
}) {
  const accentRing =
    accent === "amber"
      ? "ring-amber-400/40 from-amber-400/15 to-amber-400/0"
      : "ring-[#8ab4f8]/40 from-[#8ab4f8]/15 to-[#8ab4f8]/0";
  const iconBg =
    accent === "amber"
      ? "bg-amber-400/20 text-amber-200"
      : "bg-[#8ab4f8]/20 text-[#a8c7fa]";
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`group relative overflow-hidden rounded-2xl p-3 text-left ring-1 transition ${
        active
          ? `bg-gradient-to-br ${accentRing} text-white`
          : "bg-white/[0.03] ring-white/10 text-white/80 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-lg ${iconBg}`}
        >
          {icon}
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {time}
        </span>
        {active && (
          <span className="ml-auto rounded-full bg-white/85 px-1.5 py-[2px] text-[9px] font-semibold uppercase tracking-wider text-black">
            Viewing
          </span>
        )}
      </div>
      <p className="mt-2 text-[14px] font-semibold tracking-tight">{title}</p>
      <p className="mt-1 text-[11px] leading-snug text-white/55">{blurb}</p>
    </button>
  );
}
