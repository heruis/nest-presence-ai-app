import type { LucideIcon } from "lucide-react";
import {
  Sunrise,
  Home,
  DoorOpen,
  UserPlus,
  UserCheck,
  Moon,
  Lightbulb,
  Lock,
  Camera,
  Thermometer,
  Volume2,
  Calendar,
  MapPin,
  Eye,
  Clock,
} from "lucide-react";

export type StateId =
  | "everyone-home"
  | "last-person-left"
  | "first-person-arriving"
  | "guest-detected"
  | "morning-wake"
  | "night-wind-down";

export type Signal = {
  id: "geofence" | "camera" | "calendar" | "time";
  label: string;
  detail: string;
  icon: LucideIcon;
};

export type HomeState = {
  id: StateId;
  name: string;
  icon: LucideIcon;
  accent: string; // tailwind color class shorthand for chips
  confidence: number; // 0-100
  inferredAt: string; // human-readable e.g. "07:14 AM"
  signals: Signal[];
  rationale: string;
  actions: AutoAction[];
};

export type AutoAction = {
  id: string;
  label: string;
  device: string;
  icon: LucideIcon;
  detail: string;
  status: "executed" | "suggested" | "skipped";
};

export const morningWake: HomeState = {
  id: "morning-wake",
  name: "Morning Wake",
  icon: Sunrise,
  accent: "amber",
  confidence: 94,
  inferredAt: "7:14 AM",
  signals: [
    {
      id: "time",
      label: "Typical wake window",
      detail: "Within usual 6:55–7:30 AM range",
      icon: Clock,
    },
    {
      id: "camera",
      label: "Motion in primary bedroom",
      detail: "On-device detection, 7:13 AM",
      icon: Camera,
    },
    {
      id: "calendar",
      label: "Calendar: Stand-up at 9:00 AM",
      detail: "Commute ETA 24 min via Maps",
      icon: Calendar,
    },
    {
      id: "geofence",
      label: "All phones at home",
      detail: "2 of 2 residents present",
      icon: MapPin,
    },
  ],
  rationale:
    "Motion detected at your usual wake time, with a 9 AM calendar event and a 24-minute commute. Lifting your morning routine.",
  actions: [
    {
      id: "lights-bedroom",
      label: "Bedroom lights → 35%, warm white",
      device: "Nest + Hue",
      icon: Lightbulb,
      detail: "Sunrise-tuned ramp over 4 min",
      status: "executed",
    },
    {
      id: "thermostat",
      label: "Thermostat → 71°F",
      device: "Nest Learning",
      icon: Thermometer,
      detail: "Pre-warmed from 67° eco overnight",
      status: "executed",
    },
    {
      id: "hub-briefing",
      label: "Hub briefing started",
      device: "Nest Hub Max — Kitchen",
      icon: Volume2,
      detail: "Weather, calendar, commute, top headlines",
      status: "executed",
    },
    {
      id: "door-unlock",
      label: "Front door unlock held",
      device: "Nest x Yale Lock",
      icon: Lock,
      detail: "Below 90% confidence threshold for security",
      status: "skipped",
    },
  ],
};

export const allStates: HomeState[] = [
  morningWake,
  {
    id: "everyone-home",
    name: "Everyone Home",
    icon: Home,
    accent: "green",
    confidence: 88,
    inferredAt: "6:42 PM yesterday",
    signals: [
      { id: "geofence", label: "All phones inside geofence", detail: "2 of 2", icon: MapPin },
      { id: "camera", label: "Multiple known faces", detail: "Hub Max kitchen", icon: Camera },
      { id: "time", label: "Family dinner window", detail: "Learned pattern", icon: Clock },
      { id: "calendar", label: "No outgoing events", detail: "Free until 9 PM", icon: Calendar },
    ],
    rationale: "Both residents home; cameras off, comfort temp restored.",
    actions: [
      {
        id: "cams-off",
        label: "Indoor cameras paused",
        device: "Nest Cam (3)",
        icon: Camera,
        detail: "Privacy mode while occupied",
        status: "executed",
      },
      {
        id: "thermo-comfort",
        label: "Thermostat → 72°F comfort",
        device: "Nest Learning",
        icon: Thermometer,
        detail: "Family preset",
        status: "executed",
      },
    ],
  },
  {
    id: "last-person-left",
    name: "Last Person Left",
    icon: DoorOpen,
    accent: "blue",
    confidence: 96,
    inferredAt: "8:47 AM yesterday",
    signals: [
      { id: "geofence", label: "Final phone exited geofence", detail: "350 ft from home", icon: MapPin },
      { id: "camera", label: "No motion 4 min", detail: "All zones quiet", icon: Camera },
      { id: "calendar", label: "Owner: 9 AM stand-up", detail: "Confirms departure", icon: Calendar },
      { id: "time", label: "Within typical leave window", detail: "8:30–9:00 AM", icon: Clock },
    ],
    rationale:
      "Last phone left geofence with calendar context. Securing the home.",
    actions: [
      {
        id: "lock-front",
        label: "Front door locked",
        device: "Nest x Yale Lock",
        icon: Lock,
        detail: "Auto-lock at 96% confidence",
        status: "executed",
      },
      {
        id: "cams-arm",
        label: "Cameras armed (Away)",
        device: "Nest Cam (3)",
        icon: Camera,
        detail: "Activity zones active",
        status: "executed",
      },
      {
        id: "thermo-eco",
        label: "Thermostat → 78°F eco",
        device: "Nest Learning",
        icon: Thermometer,
        detail: "Saves ~2.4 kWh today",
        status: "executed",
      },
    ],
  },
  {
    id: "first-person-arriving",
    name: "First Person Arriving",
    icon: UserCheck,
    accent: "cyan",
    confidence: 91,
    inferredAt: "5:38 PM yesterday",
    signals: [
      { id: "geofence", label: "Phone approaching, 0.8 mi", detail: "ETA 4 min", icon: MapPin },
      { id: "calendar", label: "No conflicting event", detail: "Open evening", icon: Calendar },
      { id: "time", label: "Within typical return window", detail: "5:15–6:30 PM", icon: Clock },
      { id: "camera", label: "No unknown faces home", detail: "Empty", icon: Camera },
    ],
    rationale:
      "Resident inbound — pre-conditioning the home for arrival.",
    actions: [
      {
        id: "thermo-prewarm",
        label: "Thermostat → 71°F",
        device: "Nest Learning",
        icon: Thermometer,
        detail: "Pre-warm from eco mode",
        status: "executed",
      },
      {
        id: "porch",
        label: "Porch light on at dusk",
        device: "Nest Outdoor",
        icon: Lightbulb,
        detail: "Welcome lighting",
        status: "executed",
      },
    ],
  },
  {
    id: "guest-detected",
    name: "Guest Detected",
    icon: UserPlus,
    accent: "violet",
    confidence: 81,
    inferredAt: "Saturday 3:12 PM",
    signals: [
      { id: "camera", label: "Unknown face at front door", detail: "Doorbell, 3:12 PM", icon: Camera },
      { id: "calendar", label: "Calendar: Brunch with M.", detail: "Expected", icon: Calendar },
      { id: "geofence", label: "Owner home", detail: "Phone present", icon: MapPin },
      { id: "time", label: "Daylight hours", detail: "Lower-risk window", icon: Clock },
    ],
    rationale:
      "Calendar suggests an expected guest. Holding security automations and notifying you.",
    actions: [
      {
        id: "notify",
        label: "Notification sent to owner",
        device: "Google Home app",
        icon: Eye,
        detail: "With camera snapshot",
        status: "executed",
      },
      {
        id: "hold-locks",
        label: "Auto-lock paused 30 min",
        device: "Nest x Yale Lock",
        icon: Lock,
        detail: "Don't lock guest out",
        status: "executed",
      },
    ],
  },
  {
    id: "night-wind-down",
    name: "Night Wind-Down",
    icon: Moon,
    accent: "indigo",
    confidence: 92,
    inferredAt: "11:08 PM yesterday",
    signals: [
      { id: "time", label: "Late hour", detail: "After 10:45 PM", icon: Clock },
      { id: "camera", label: "No motion 11 min", detail: "Quiet home", icon: Camera },
      { id: "geofence", label: "All phones idle", detail: "Charging dock", icon: MapPin },
      { id: "calendar", label: "Tomorrow: 9 AM stand-up", detail: "Wake target 7:00 AM", icon: Calendar },
    ],
    rationale:
      "Household settling for the night. Securing and dimming.",
    actions: [
      {
        id: "lights-dim",
        label: "Lights dimmed to 8%",
        device: "Hue + Nest",
        icon: Lightbulb,
        detail: "Hallway nightlight only",
        status: "executed",
      },
      {
        id: "vol-low",
        label: "Hub volume to 20%",
        device: "Nest Hub Max",
        icon: Volume2,
        detail: "Quiet hours",
        status: "executed",
      },
      {
        id: "lock-night",
        label: "All doors locked",
        device: "Nest x Yale Lock",
        icon: Lock,
        detail: "Confirmed via app",
        status: "executed",
      },
    ],
  },
];

export type DeviceTile = {
  id: string;
  name: string;
  room: string;
  state: string;
  icon: LucideIcon;
  on: boolean;
  metric?: string;
};

export const devices: DeviceTile[] = [
  {
    id: "thermo",
    name: "Thermostat",
    room: "Hallway",
    state: "Heating to 71°F",
    icon: Thermometer,
    on: true,
    metric: "71°",
  },
  {
    id: "hub-kitchen",
    name: "Nest Hub Max",
    room: "Kitchen",
    state: "Briefing playing",
    icon: Volume2,
    on: true,
  },
  {
    id: "cam-living",
    name: "Indoor Cam",
    room: "Living Room",
    state: "Paused (home)",
    icon: Camera,
    on: false,
  },
  {
    id: "doorbell",
    name: "Doorbell",
    room: "Front",
    state: "Armed",
    icon: Camera,
    on: true,
  },
  {
    id: "lights-bed",
    name: "Bedroom Lights",
    room: "Primary",
    state: "Sunrise 35%",
    icon: Lightbulb,
    on: true,
    metric: "35%",
  },
  {
    id: "lock-front",
    name: "Front Lock",
    room: "Front",
    state: "Locked",
    icon: Lock,
    on: true,
  },
];

export type WeeklyMetric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
};

export const weeklyMetrics: WeeklyMetric[] = [
  { label: "Energy saved", value: "14.7 kWh", delta: "+22% vs. last week", positive: true },
  { label: "Auto-actions", value: "84", delta: "29 security · 41 comfort · 14 lighting", positive: true },
  { label: "Avg. confidence", value: "92%", delta: "+3 pp vs. launch", positive: true },
  { label: "Override rate", value: "4.1%", delta: "Below 8% guardrail", positive: true },
];

export type FeedbackHistoryItem = {
  id: string;
  state: string;
  outcome: "correct" | "wrong" | "partial";
  note: string;
  appliedTo: string;
  ts: string;
};

export const recentFeedback: FeedbackHistoryItem[] = [
  {
    id: "fb1",
    state: "Last Person Left",
    outcome: "correct",
    note: "—",
    appliedTo: "No change",
    ts: "Yesterday · 8:47 AM",
  },
  {
    id: "fb2",
    state: "Night Wind-Down",
    outcome: "wrong",
    note: "We were having a party",
    appliedTo: "Saturday 9pm–1am will not auto-dim",
    ts: "Sat · 10:14 PM",
  },
  {
    id: "fb3",
    state: "Guest Detected",
    outcome: "partial",
    note: "Recognized, that's my mom",
    appliedTo: "Added to household faces",
    ts: "Sat · 3:12 PM",
  },
];
