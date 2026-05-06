# Nest Presence AI — Prototype

> The home that acts before you ask.

A functional mobile-first prototype for **Nest Presence AI**, a proposed Nest Aware Premium feature that fuses phone geofencing, on-device camera ML, Google Calendar, and learned time-of-day patterns into six home states — and runs your home automatically.

Built for **UCLA MGMT 275 — Final Project (Prototype + PR-FAQs)**.

## One-liner

For Nest Aware subscribers with 3+ Nest devices who never set up Routines, Presence AI eliminates the Google Home app's complexity by inferring six home states (Everyone Home, Last Person Left, First Person Arriving, Guest Detected, Morning Wake, Night Wind-Down) and auto-executing the right device actions — with a "Did we get this right?" feedback loop that trains personalization.

## Live demo

Deployed on Vercel. The walkthrough opens on **Morning Wake** — the visually-rich hero state — with Presence AI detecting motion at your typical wake time, calendar context, and household geofence presence, then auto-raising lights, pre-warming the thermostat, and starting a kitchen Hub briefing.

## What's testable in the prototype

Tap the bottom tabs and the in-card actions to navigate.

1. **Morning Wake hero on the Home tab** — Sunrise-tuned animation, the live state chip with confidence %, the auto-actioned card with rationale and three executed actions (plus one *held* below the security threshold), device tiles in light/dark "active" state.
2. **Presence AI detail (Presence tab)** — All six states with confidence bars, signal-fusion visualization (geofence + camera + calendar + time), and trust-threshold copy (90% security, 75% comfort).
3. **"Did we get this right?" feedback card** — Tap the white pill on the Home card. Pick *Got it right / Almost / Wrong call* → quick-suggestion chips → free-text note → live "What we'll learn" preview → submit → on-device confirmation animation.
4. **Weekly Home Intelligence Report (Activity tab)** — Hero kWh-saved stat, daily auto-actions chart, five highlights including the correction the model already learned from.
5. **Onboarding mode picker (Settings tab)** — Suggest vs Auto mode (the A/B from the eval doc), 48-hour learning-only toggle, local-only privacy mode, household readiness checklist.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion for screen transitions, the Morning Wake sunrise reveal, the action-stagger, and the feedback-loop micro-interactions
- Lucide icons
- Deployed on Vercel

This is a **functional, mock-data prototype** — no backend, no real device control, no cloud calls. All data lives in `lib/data.ts` and is meant to communicate the design intent.

## Repository contents

```
app/
  layout.tsx, page.tsx, globals.css
components/
  iphone-frame.tsx       — iPhone 15 Pro bezel + Dynamic Island shell
  status-bar.tsx         — Live time + status icons
  tab-bar.tsx            — 4-tab nav (Home / Presence / Activity / Settings)
  screens/
    home.tsx             — Morning Wake hero (deep polish)
    presence-ai.tsx      — 6-state detail with signal fusion
    feedback.tsx         — "Did we get this right?" loop (deep polish)
    report.tsx           — Weekly Home Intelligence Report
    onboarding.tsx       — Mode picker + privacy controls
lib/
  data.ts                — All six home states, devices, weekly metrics
  cn.ts                  — clsx wrapper
PROMPT.md                — Source-of-truth product brief (the spec used to guide the AI build)
```

## Source of truth

The product brief that guided the design and copy is at [`PROMPT.md`](./PROMPT.md). It defines the user, the problem, the six home states, the trust thresholds, and what the feature explicitly does *not* do.

## Known limitations

- **Mock data only.** No real device integration, no real Google account, no real geofence, no real camera ML.
- **No persistence.** Feedback you give in the demo doesn't persist across reloads.
- **iPhone-frame on desktop only.** The phone frame is a fixed 400×844 shell. On narrow viewports the layout reflows but the bezel does not shrink.
- **Two screens are deep, three are flat.** Per the depth-over-breadth design choice, the Home screen and the Feedback flow have full motion and micro-interactions; the other three are static-but-polished.
- **Some trust UX is illustrative only.** The "long-press to override" hint on the Home tile is copy, not a working gesture, in this prototype.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

UCLA MGMT 275 · Final Project · Herui Song · May 2026
