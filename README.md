# Nest Presence AI — Prototype

> The home that acts before you ask.

A functional mobile-first prototype for **Nest Presence AI**, a proposed Nest Aware Premium feature that fuses phone geofencing, on-device camera ML, Google Calendar, and learned time-of-day patterns into six home states — and runs your home automatically.

Built for **UCLA MGMT 275 — Final Project (Prototype + PR-FAQs)**, due 2026-05-14.
**Team:** Herui Song · Ethan Duffy.

## One-liner

For Nest Aware subscribers with 3+ Nest devices who never set up Routines, **Presence AI infers six home states from existing Google signals and runs the right device actions automatically — no voice command, no manual routine setup.** A "Did we get this right?" feedback loop trains personalization without breaking trust.

## Live demo

→ **https://nest-presence-ai-app.vercel.app**

The intro page on the desktop side has a **scenario picker** with two timepoints from the same household — drop the phone into either and watch the home adapt:

- **Morning Wake** — Sunday 7:14 AM. Lights ramp, indoor cam goes private, the Hub briefing waits to be tapped.
- **Last Person Left** — Sunday 11:45 AM. Both phones leave the geofence; the home auto-locks, eases the thermostat, and arms the indoor cam.

## What's testable in the prototype

1. **Scenario picker (intro page).** Tap either of the two cards on the desktop side; the phone screen swaps gradient, greeting, and auto-actions for that scenario. Sells the core promise: *the home changes states automatically*.
2. **Auto Mode hero card on Home tab.** Three executed auto-actions with rationale and per-row **Undo** — Undo collapses the row and reverts the device's state in real time (single source of truth).
3. **Connected device truth.** Tap the **Devices** glyph (top-right of the Home greeting) or the "All N devices →" link to open a full-screen Devices page. Per-capability detail views (brightness slider, temperature slider, lock/cam/playing toggles) and a **"Set as default for [active state]"** CTA.
4. **Suggest vs Auto modes (Settings tab).** The eval-doc's A/B made interactive — Suggest renders pending suggestion cards with **Confirm / Skip-with-reason**; Confirm slides into "Just done" with Undo. Activating the mode triggers a confirmation toast on the Home tab.
5. **"Did we get this right?" feedback loop.** Tap the white pill on the Home hero card → pick *Got it right / Almost / Wrong call* → suggestion chips → free-text note → live "What we'll learn" preview → on-device confirmation animation. Free-text disables when **Local-only mode** (Settings) is on.
6. **Multi-home + household profile.** Top-of-screen home switcher (Beverly Hills House ↔ Tahoe Cabin) — switching to Tahoe shows a "Last Person Left · 47 hr quiet" vacation scene with its own devices, Heads up, and weekly metrics. Profile sheet shows household members + a **Who knows what** privacy panel.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- Tailwind CSS v4
- Framer Motion — screen transitions, sunrise reveal, action-stagger, undo collapse
- lucide-react icons
- Deployed on Vercel

This is a **functional, mock-data prototype** — no backend, no real device control, no cloud calls. All scenario data lives in `lib/data.ts`. Device state is lifted to a single source of truth in `app/page.tsx` so AI auto-actions, manual mutations, and Undo all read/write the same store.

## Repository contents

```
app/
  layout.tsx, page.tsx, globals.css
components/
  iphone-frame.tsx          — iPhone 15 Pro bezel + Dynamic Island shell
  status-bar.tsx            — Status bar (lockable time per scenario)
  tab-bar.tsx               — 4-tab nav (Home / Presence / Activity / Settings)
  global-header.tsx         — Home switcher + profile circle
  home-switcher-sheet.tsx   — BH ↔ Tahoe sheet
  profile-sheet.tsx         — Household members + privacy
  sheet.tsx                 — Reusable bottom sheet
  screens/
    home.tsx                — Hero card, Heads up, Quick Controls, scene-aware bg
    presence-ai.tsx         — 6-state detail with signal fusion
    feedback.tsx            — "Did we get this right?" loop
    report.tsx              — Weekly Home Intelligence Report
    onboarding.tsx          — Mode picker + Local-only toggle + Who-knows-what
    devices.tsx             — Full-screen Devices page + per-device detail
lib/
  data.ts                   — Scenarios, devices, actions, headsUp, weekly metrics
  cn.ts                     — clsx wrapper
```

## Project documents

| File | What it is |
|---|---|
| [`PROMPT.md`](./PROMPT.md) | **Source of truth.** The product brief that guided the build (rubric item #7). |
| [`PR_FAQ.md`](./PR_FAQ.md) | Press release + External & Internal FAQs (rubric item #6). |
| [`EVAL.md`](./EVAL.md) | Experimentation & eval set summary — A/B design, technical metrics, business KPI alignment (rubric item #8). |
| [`APPENDIX.md`](./APPENDIX.md) | RICE problem prioritization, variance vs. earlier course artifacts, UX study (in progress). |
| [`AMENDMENTS.md`](./AMENDMENTS.md) | Internal change log — every design decision since the original brief, numbered #1–#10. |
| [`WIP.md`](./WIP.md) | **Pre-submission to-do list.** Open items for 2026-05-14 — start here on the next session. |

## Known limitations

- **Mock data only.** No real device integration, no real Google account, no real geofence, no real camera ML. Scenario state and device state live in memory.
- **No persistence.** Feedback you give in the demo doesn't survive a reload. Scenario switches reset BH device state to that scenario's "after" picture.
- **iPhone-frame on desktop only.** The phone frame is a fixed 400×844 shell; on narrow viewports the layout reflows but the bezel does not shrink.
- **UX study pending.** The 8–12 interviews required by the assignment are scheduled for the week of 2026-05-12; placeholder section in [`APPENDIX.md`](./APPENDIX.md). All design judgments to date are PM-led, not user-validated.
- **Internal model judgment hidden by design.** Per AMENDMENTS #1, model confidence (the 92%/94% numbers from the eval write-up) is treated as internal plumbing and never surfaced to the user — only "X of Y signals agree" appears in-product.
- **V1.1 scope vs. earlier course artifacts.** The prototype represents an evolved V1.1 vision that goes beyond the originally-submitted strategy doc, product breakdown, and eval write-up — chiefly the connected-device-truth pass (full Devices page, single-source state, Set-as-default), the Heads up surface, and the multi-home framing. Variance is logged in [`AMENDMENTS.md`](./AMENDMENTS.md) and explained in [`APPENDIX.md`](./APPENDIX.md). Earlier-assignment documents were not retroactively updated.

## Run locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

---

UCLA MGMT 275 · Final Project · Herui Song & Ethan Duffy · May 2026
