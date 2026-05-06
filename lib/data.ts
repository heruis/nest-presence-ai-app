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
  Warehouse,
  AlertTriangle,
  WifiOff,
  Battery,
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
  accent: string;
  confidence: number;
  inferredAt: string;
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
    "Motion at your usual wake time, with a 9 AM calendar event and a 24-minute commute.",
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
      detail: "Weather, calendar, commute",
      status: "executed",
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
    rationale: "Last phone left geofence with calendar context. Securing the home.",
    actions: [
      {
        id: "lock-front",
        label: "Front door locked",
        device: "Nest x Yale Lock",
        icon: Lock,
        detail: "Auto-lock confirmed",
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
    rationale: "Resident inbound — pre-conditioning the home for arrival.",
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
    rationale: "Calendar suggests an expected guest. Holding security automations and notifying you.",
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
    rationale: "Household settling for the night. Securing and dimming.",
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

// =============================================================================
// Pending suggestions (Suggest Mode — Treatment 1 from the eval doc)
// =============================================================================

export type PendingSuggestion = {
  id: string;
  label: string;
  device: string;
  icon: LucideIcon;
  rationale: string;
  signalCount: string;
};

export const pendingSuggestions: PendingSuggestion[] = [
  {
    id: "ps-lights",
    label: "Raise bedroom lights to 35%",
    device: "Nest + Hue · Bedroom",
    icon: Lightbulb,
    rationale: "Motion at your usual wake time + 9 AM stand-up on calendar",
    signalCount: "4 of 4 sources agree",
  },
  {
    id: "ps-thermo",
    label: "Pre-warm thermostat to 71°F",
    device: "Nest Learning · Hallway",
    icon: Thermometer,
    rationale: "Sunday morning + 24-min commute to office",
    signalCount: "4 of 4 sources agree",
  },
  {
    id: "ps-hub",
    label: "Start morning briefing on Hub",
    device: "Nest Hub Max · Kitchen",
    icon: Volume2,
    rationale: "Weather, calendar, and commute ready when you reach the kitchen",
    signalCount: "3 of 4 sources agree",
  },
];

// =============================================================================
// Anomalies — "Needs your attention" (V1.1 scope expansion, see AMENDMENTS.md)
// =============================================================================

export type Anomaly = {
  id: string;
  title: string;
  detail: string;
  icon: LucideIcon;
  actionLabel: string;
  tone: "warn" | "info";
};

export const anomalies: Anomaly[] = [
  {
    id: "garage-open",
    title: "Garage door has been open 22 min",
    detail: "Usually closed by 7 AM on weekday mornings",
    icon: Warehouse,
    actionLabel: "Close garage",
    tone: "warn",
  },
  {
    id: "porch-on",
    title: "Porch light still on",
    detail: "Has been on since 6:14 PM — sunrise was at 6:02 AM",
    icon: Lightbulb,
    actionLabel: "Turn off",
    tone: "info",
  },
];

// =============================================================================
// Quick controls — contextual subset of devices on the Home tab
// =============================================================================

export type QuickControl = {
  id: string;
  name: string;
  state: string;
  icon: LucideIcon;
  primaryMetric?: string;
  on: boolean;
  why: string; // why this is in quick controls right now
};

export const quickControls: QuickControl[] = [
  {
    id: "thermo",
    name: "Thermostat",
    state: "Heating to 71°",
    icon: Thermometer,
    primaryMetric: "71°",
    on: true,
    why: "Actively heating",
  },
  {
    id: "hub-kitchen",
    name: "Kitchen Hub",
    state: "Briefing playing",
    icon: Volume2,
    on: true,
    why: "Just started",
  },
  {
    id: "lights-bed",
    name: "Bedroom Lights",
    state: "Sunrise · 35%",
    icon: Lightbulb,
    primaryMetric: "35%",
    on: true,
    why: "Just raised",
  },
  {
    id: "lock-front",
    name: "Front Lock",
    state: "Locked overnight",
    icon: Lock,
    on: true,
    why: "Touched at wind-down",
  },
];

// =============================================================================
// Homes & household members (V1.1 scope — global header)
// =============================================================================

export type HomeLocation = {
  id: string;
  name: string;
  shortName: string;
  address: string;
  deviceCount: number;
  isPrimary: boolean;
  state: string; // current presence-ai state for this home
};

export const homes: HomeLocation[] = [
  {
    id: "bh-house",
    name: "Beverly Hills House",
    shortName: "Beverly Hills",
    address: "Westwood, CA",
    deviceCount: 12,
    isPrimary: true,
    state: "Morning Wake",
  },
  {
    id: "tahoe-cabin",
    name: "Tahoe Cabin",
    shortName: "Tahoe",
    address: "South Lake Tahoe, CA",
    deviceCount: 4,
    isPrimary: false,
    state: "Empty · Watching",
  },
];

export type HouseholdMember = {
  id: string;
  name: string;
  role: "Owner" | "Member" | "Guest";
  initial: string;
  presence: "Home" | "Away" | "Approaching";
  presenceDetail: string;
  color: string; // hex bg for avatar
};

export const householdMembers: HouseholdMember[] = [
  {
    id: "you",
    name: "Herui",
    role: "Owner",
    initial: "H",
    presence: "Home",
    presenceDetail: "Bedroom · 7:14 AM",
    color: "#fbbf24",
  },
  {
    id: "yuna",
    name: "Yuna",
    role: "Member",
    initial: "Y",
    presence: "Home",
    presenceDetail: "Kitchen · 7:08 AM",
    color: "#8ab4f8",
  },
  {
    id: "mom",
    name: "Mom",
    role: "Guest",
    initial: "M",
    presence: "Away",
    presenceDetail: "Last seen Saturday",
    color: "#f06292",
  },
];

// =============================================================================
// Weekly Report metrics — replaces the confidence-based metric (per AMENDMENTS #1)
// =============================================================================

export type WeeklyMetric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
};

export const weeklyMetrics: WeeklyMetric[] = [
  { label: "Energy saved", value: "14.7 kWh", delta: "+22% vs. last week", positive: true },
  { label: "Auto-actions", value: "84", delta: "29 security · 41 comfort · 14 lighting", positive: true },
  { label: "Times we asked you first", value: "11", delta: "Down from 18 last week", positive: true },
  { label: "Override rate", value: "4.1%", delta: "Below 8% guardrail", positive: true },
];

// =============================================================================
// Feedback history (used on Feedback screen — confidence display dropped)
// =============================================================================

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
