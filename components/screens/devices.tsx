"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Lightbulb,
  Lock,
  Thermometer,
  Volume2,
  Check,
  Minus,
  Plus,
} from "lucide-react";
import { StatusBar } from "@/components/status-bar";
import { type Device, type DeviceState, type DeviceGroupLabel } from "@/lib/data";
import { cn } from "@/lib/cn";

const groupOrder: DeviceGroupLabel[] = ["Lighting", "Climate", "Security", "Speakers"];
const groupIcons: Record<DeviceGroupLabel, typeof Lightbulb> = {
  Lighting: Lightbulb,
  Climate: Thermometer,
  Security: Lock,
  Speakers: Volume2,
};

export function DevicesScreen({
  devices,
  deviceState,
  activeStateName,
  homeName,
  time,
  selectedDeviceId,
  onSelectDevice,
  onMutateDevice,
  onSetAsDefault,
  onBack,
}: {
  devices: Device[];
  deviceState: Record<string, DeviceState>;
  activeStateName: string;
  homeName: string;
  time: string;
  selectedDeviceId: string | null;
  onSelectDevice: (id: string | null) => void;
  onMutateDevice: (id: string, next: DeviceState) => void;
  onSetAsDefault: (id: string) => void;
  onBack: () => void;
}) {
  const selected = selectedDeviceId
    ? devices.find((d) => d.id === selectedDeviceId)
    : null;
  const selectedState = selected ? deviceState[selected.id] : null;

  const grouped = groupOrder
    .map((group) => ({ group, devices: devices.filter((d) => d.group === group) }))
    .filter((g) => g.devices.length > 0);

  return (
    <div className="aurora h-full w-full overflow-y-auto no-scrollbar pb-32">
      <StatusBar tone="light" time={time} />

      <div className="flex items-center gap-3 px-5 pt-4">
        <button
          onClick={selected ? () => onSelectDevice(null) : onBack}
          aria-label="Back"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white ring-1 ring-white/12"
        >
          <ArrowLeft size={16} strokeWidth={2.4} />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
            {homeName}
          </p>
          <h1 className="text-[20px] font-semibold tracking-tight text-white">
            {selected ? selected.name : "Devices"}
          </h1>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selected && selectedState ? (
          <motion.div
            key={`detail-${selected.id}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.2 }}
            className="mt-5"
          >
            <DeviceDetail
              device={selected}
              state={selectedState}
              activeStateName={activeStateName}
              onMutate={(next) => onMutateDevice(selected.id, next)}
              onSetAsDefault={() => onSetAsDefault(selected.id)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-5 space-y-5 px-4"
          >
            {grouped.map(({ group, devices }) => {
              const GroupIcon = groupIcons[group];
              return (
                <section key={group}>
                  <div className="mb-2 flex items-center gap-2 px-1 text-white/60">
                    <GroupIcon size={13} strokeWidth={2.2} />
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">
                      {group}
                    </p>
                    <span className="text-[11px] font-medium text-white/35">
                      {devices.length}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {devices.map((d) => {
                      const Icon = d.icon;
                      const s = deviceState[d.id];
                      return (
                        <li key={d.id}>
                          <button
                            onClick={() => onSelectDevice(d.id)}
                            className="flex w-full items-center gap-3 rounded-2xl bg-[#16191c] px-3 py-2.5 ring-1 ring-white/5 transition hover:bg-[#1a1d20]"
                          >
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                s.on
                                  ? "bg-emerald-400/15 text-emerald-300"
                                  : "bg-white/5 text-white/55"
                              )}
                            >
                              <Icon size={17} strokeWidth={2.2} />
                            </div>
                            <div className="min-w-0 flex-1 text-left">
                              <p className="truncate text-[13px] font-semibold text-white">
                                {d.name}
                              </p>
                              <p className="truncate text-[11px] text-white/55">
                                {s.label}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "h-2 w-2 shrink-0 rounded-full",
                                s.on ? "bg-emerald-400" : "bg-white/15"
                              )}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DeviceDetail({
  device,
  state,
  activeStateName,
  onMutate,
  onSetAsDefault,
}: {
  device: Device;
  state: DeviceState;
  activeStateName: string;
  onMutate: (next: DeviceState) => void;
  onSetAsDefault: () => void;
}) {
  const [savedToast, setSavedToast] = useState(false);
  const Icon = device.icon;

  const triggerSave = () => {
    onSetAsDefault();
    setSavedToast(true);
    window.setTimeout(() => setSavedToast(false), 2000);
  };

  let control: React.ReactNode = null;
  switch (device.capability) {
    case "brightness":
      control = (
        <BrightnessControl
          state={state}
          onChange={(v) =>
            onMutate({
              on: v > 0,
              value: v,
              label: v > 0 ? `On · ${v}%` : "Off",
            })
          }
        />
      );
      break;
    case "temperature":
      control = (
        <TemperatureControl
          state={state}
          onChange={(v) =>
            onMutate({
              on: state.on,
              value: v,
              label: state.on ? `Heating to ${v}°F` : `${v}°F · idle`,
            })
          }
        />
      );
      break;
    case "lock":
      control = (
        <ToggleControl
          on={state.on}
          onLabel="Locked"
          offLabel="Unlocked"
          onChange={(on) => onMutate({ on, label: on ? "Locked" : "Unlocked" })}
        />
      );
      break;
    case "armed":
      control = (
        <ToggleControl
          on={state.on}
          onLabel="Watching"
          offLabel="Off · privacy mode"
          onChange={(on) =>
            onMutate({ on, label: on ? "Watching" : "Off · privacy mode" })
          }
        />
      );
      break;
    case "playing":
      control = (
        <ToggleControl
          on={state.on}
          onLabel="Playing"
          offLabel="Idle"
          onChange={(on) => onMutate({ on, label: on ? "Playing" : "Idle" })}
        />
      );
      break;
  }

  return (
    <div className="px-4">
      <div className="rounded-3xl bg-[#16191c] p-5 ring-1 ring-white/8">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl",
              state.on
                ? "bg-emerald-400/15 text-emerald-300"
                : "bg-white/5 text-white/55"
            )}
          >
            <Icon size={22} strokeWidth={2.2} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-white">{device.name}</p>
            <p className="text-[11px] text-white/55">{device.product}</p>
          </div>
        </div>
        <div className="mt-4 rounded-2xl bg-[#1f2327] px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50">
            Right now
          </p>
          <p className="mt-1 text-[15px] font-semibold text-white">{state.label}</p>
          {state.detail && (
            <p className="mt-0.5 text-[11px] text-white/55">{state.detail}</p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-3xl bg-[#16191c] p-5 ring-1 ring-white/8">
        {control}
      </div>

      <button
        onClick={triggerSave}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-[13px] font-semibold text-black"
      >
        Set as default for {activeStateName}
      </button>
      <p className="mt-2 text-center text-[10px] leading-snug text-white/45">
        Next time {activeStateName} fires, this is what we'll do.
      </p>

      <AnimatePresence>
        {savedToast && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="pointer-events-none absolute inset-x-0 top-16 z-40 mx-auto flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-[12px] font-semibold text-emerald-950 shadow-lg"
          >
            <Check size={14} strokeWidth={3} />
            Saved · {activeStateName} updated
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BrightnessControl({
  state,
  onChange,
}: {
  state: DeviceState;
  onChange: (v: number) => void;
}) {
  const v = state.value ?? 0;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Brightness
        </p>
        <span className="text-[16px] font-semibold tabular-nums text-white">{v}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        step={5}
        value={v}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-amber-300"
      />
      <div className="mt-1 flex justify-between text-[10px] text-white/35">
        <span>Off</span>
        <span>Full</span>
      </div>
    </div>
  );
}

function TemperatureControl({
  state,
  onChange,
}: {
  state: DeviceState;
  onChange: (v: number) => void;
}) {
  const v = state.value ?? 70;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          Target temperature
        </p>
        <span className="text-[20px] font-semibold tabular-nums text-white">{v}°F</span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(50, v - 1))}
          aria-label="Decrease"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white ring-1 ring-white/10"
        >
          <Minus size={14} strokeWidth={2.4} />
        </button>
        <input
          type="range"
          min={50}
          max={85}
          step={1}
          value={v}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 accent-orange-300"
        />
        <button
          onClick={() => onChange(Math.min(85, v + 1))}
          aria-label="Increase"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-white ring-1 ring-white/10"
        >
          <Plus size={14} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

function ToggleControl({
  on,
  onLabel,
  offLabel,
  onChange,
}: {
  on: boolean;
  onLabel: string;
  offLabel: string;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
          State
        </p>
        <p className="mt-1 text-[15px] font-semibold text-white">
          {on ? onLabel : offLabel}
        </p>
      </div>
      <button
        onClick={() => onChange(!on)}
        className={cn(
          "relative h-8 w-14 shrink-0 rounded-full transition",
          on ? "bg-emerald-500" : "bg-white/12"
        )}
      >
        <motion.span
          animate={{ x: on ? 27 : 3 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="absolute top-[3px] h-[26px] w-[26px] rounded-full bg-white shadow"
        />
      </button>
    </div>
  );
}
