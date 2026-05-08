# Appendix — Nest Presence AI Final Project

> Supporting material for [`PR_FAQ.md`](./PR_FAQ.md). Authors: Herui Song & Ethan Duffy · UCLA MGMT 275 · May 2026.
> Required by the assignment: 4–10 pages of supporting material, including the UX study summary.

Sections:
1. [RICE — problem prioritization](#1-rice--problem-prioritization)
2. [UX Study Plan & Interview Guide](#2-ux-study-plan--interview-guide-in-progress)
3. [Variance log — where the prototype diverged](#3-variance-log--where-the-prototype-diverged)
4. [Annotated screenshot reference](#4-annotated-screenshot-reference)
5. [Source materials & references](#5-source-materials--references)

---

## 1. RICE — Problem Prioritization

We considered three problems in the Nest backlog before converging on Presence AI. RICE was applied with the same scoring rubric across all three; numbers below are *normalized 0–1 estimates*, not raw counts.

| Criterion | Definition we used |
|---|---|
| **Reach** | Fraction of the Nest Aware installed base materially affected per quarter (1.0 = all subscribers, 0.5 = half, etc.) |
| **Impact** | Modeled lift on Premium upgrade rate (3 = massive, 2 = high, 1 = medium, 0.5 = low) |
| **Confidence** | Strength of evidence for the impact estimate (1.0 = direct prior data, 0.5 = analogous, 0.25 = guess) |
| **Effort** | Months of cross-functional engineering effort to ship a credible V1 |

| | Reach | Impact | Confidence | Effort (mo) | RICE = R·I·C / E |
|---|---|---|---|---|---|
| **A. Presence AI** (six-state proactive automation) | 1.0 | 3.0 | 0.8 | 6 | **0.40** |
| **B. Matter third-party reliability** (better fallback behavior + per-device health surfacing) | 0.6 | 2.0 | 0.6 | 9 | 0.08 |
| **C. Doorbell-call AI summarizer** (transcribe + summarize who came by while you were out) | 0.4 | 1.0 | 0.7 | 4 | 0.07 |

**Why A wins:** Reach is maximal (every Nest Aware household with 3+ devices), Impact is highest (the eval design models +10pp lift on the Basic→Premium upsell, vs. retention-only impact for B and C), Confidence is strongest (we have direct activation-rate baseline data for the manual Routines comparison). Effort is the only column where A loses, and only modestly — none of A's components are new ML or new hardware.

**Why we did *not* pick B (Matter):** It improves a real pain point but for a smaller subset (households actively using Matter devices). The reliability fixes are valuable but live below the line for the Premium subscription pitch — no one will upgrade for "Matter fallback works better."

**Why we did *not* pick C (Doorbell summarizer):** Genuine WOW moment in demo, but reach is narrowest (active doorbell users only) and the impact ceiling is low — it's a feature, not a category. We'd rather hold this for a Q4 launch under Presence AI's umbrella once the proactive frame is established.

---

## 2. UX Study Plan & Interview Guide *(in progress)*

> **Status as of 2026-05-07:** the 8–12 interviews required by the assignment are **scheduled for the week of 2026-05-12** and have not yet been conducted. This section is a complete plan, not a results summary. The final write-up will replace this section with findings and direct quotes before the 2026-05-14 submission, or — if interviews aren't completed in time — the README's Known Limitations will note the gap explicitly.

### 2.1 Recruiting target — 10 interviews

| # | Segment | Why |
|---|---|---|
| 4 | Nest Aware Premium households, 3+ devices, never built a Routine | Primary target user |
| 2 | Nest Aware Premium households who *do* use Routines | Test if Presence AI conflicts with their setup |
| 2 | Nest Aware Basic, considering Premium | Test the upgrade pitch |
| 1 | Apple Home / HomeKit user, considering switching | Test the privacy/proactivity differentiator |
| 1 | Nest Aware *cancelled* in last 6 months | Surface what *broke* trust before |

Recruit via existing Google research panel + targeted screener; 30 min sessions; remote (Google Meet); $40 gift card incentive.

### 2.2 Interview script — 30 minutes

**Warm-up (5 min)**
- "Walk me through your Nest setup — devices, who lives there, what you typically use it for."
- "Have you ever set up an automation or Routine? Tell me about the last time you tried."

**Problem validation (10 min) — present *no* prototype**
- "When you leave the house, what do you do with your Nest devices? Walk me through last Tuesday."
- "Has Nest ever done something you didn't expect? What was it? How did you feel?"
- "If your home could 'just figure out' one thing for you, what would it be?"

**Concept reaction (10 min) — show the live prototype, scenario picker → Morning Wake → Last Person Left**
- "Walk me through what you think this is doing." *(don't lead)*
- "What feels right? What feels off?"
- "What would have to be true for you to leave this on?"
- "What would make you turn it off after a week?"

**Pricing & trust (5 min)**
- "Nest Aware Premium is $15/mo. If this feature is what's in Premium, would you pay for it?"
- "If it locked you out of your house once, would you turn it off forever, or give it another chance?"

### 2.3 What we expect to learn — and how each finding would change V1

| Hypothesized finding | If confirmed → V1 change |
|---|---|
| Users distrust automatic *security* actions (locking) more than comfort actions (lighting) | Default Suggest Mode for security actions only; Auto for comfort. Currently: Auto for everything. |
| The Suggest→Auto graduation arc feels punitive ("why is the AI grading me?") | Reframe as "Day 3 of getting to know your home" — language test |
| The "Did we get this right?" card is missed because users don't expect to be asked | Move from a tap-pill on the hero card to an inline post-action toast |
| Households with kids over-trigger Guest Detected (kids' friends) | Add a one-tap "this is a regular guest" option that suppresses the state for that face |
| Local-only mode is reassuring to ~30% of users — but they don't *use* it | Surface it earlier in onboarding, not buried in Settings |

### 2.4 Threshold for "validated" vs. "back to drawing board"

We will treat the V1 design as **validated** if at least 7 of 10 interviewees:
- Correctly describe the feature without prompting after seeing the Morning Wake scenario
- Express willingness to leave it on for a week
- Identify the Undo affordance unprompted within 30 seconds of seeing the hero card

If <5 of 10 hit those bars, the trust ramp design is wrong and we go back to the strategy phase. Between 5 and 7 hits, we ship V1 to a 5% rollout with the explicit guardrail watch.

---

## 3. Variance log — where the prototype diverged

Three earlier course artifacts pre-date the prototype: the **Strategy Case Exercise** (Assignment #2, joint with Ethan Duffy), the **Product Breakdown Exercise** (Assignment #1, solo), and the **Experimentation & Eval Exercise** (Assignment #4, solo). Per the user direction recorded in [`AMENDMENTS.md`](./AMENDMENTS.md) §3, those documents are **not retroactively updated**. The prototype represents a V1.1 evolution; this section catalogs the deltas.

| Concept in earlier artifacts | Prototype state | Why it changed |
|---|---|---|
| **Six home states** as the core abstraction | Still the abstraction; **scenario picker** (AMENDMENTS #9) makes two of them switchable on the demo | The original docs describe states; the prototype had to *demo* state-switching from outside the phone — without it, viewers see one state and miss the WOW. |
| **Confidence percentages** (94%, 92%, 90%/75% thresholds) shown to users | Hidden by design (AMENDMENTS #1) | Surfacing model confidence undermines trust on borderline cases. Confidence is internal plumbing for the threshold-gating logic. |
| **48-hour learning-only window** as a first-class user toggle | Removed (AMENDMENTS #9a) | The Suggest Mode 7-day arc already covers "watch and propose, don't act." A second learning toggle was a worse handle on the same idea. |
| **Anomaly surfacing** ("garage open 22 min", "porch light on too long") as a Home tab section | Renamed **Heads up** with a coherent set per scenario (AMENDMENTS #8e) | The original anomaly examples were demo-incoherent for a 7:14 AM Sunday. Heads up scopes the surface to things the user can actually act on now. |
| **Hub Max auto-played briefing** as Morning Wake's third action | Replaced with **Indoor cam off · privacy mode** (AMENDMENTS #8d) | An auto-playing briefing is invasive (especially in a household with someone still asleep). Indoor-cam-off is asymmetric on purpose: the AI *subtracts* surveillance when you're up, not just adds comfort. |
| **One home** (Beverly Hills) | **Two homes** with differentiated data — BH (active) + Tahoe (vacation) (AMENDMENTS #6, #7d) | Multi-property households are a real Nest segment. Showing only one home undersold the multi-home framing in the strategy doc. |
| **Suggest vs Auto modes** described in the eval doc but not interactive | Both modes interactive in Settings; switching re-renders Home tab (AMENDMENTS #5) | The eval is the experiment; the prototype is the artifact of the experiment. The two modes had to be A/B-able in the demo, not just described. |
| **Single device list** | **Full-screen Devices page** with per-capability detail + "Set as default for [active state]" (AMENDMENTS #8b) | Connected device truth — AI mutates and Undo reverts the same store the user manually controls. The original docs treat devices as a list; the prototype treats device state as the single source of truth. |
| **Privacy disclaimer copy** | **Who knows what** panel showing per-member signal permissioning (AMENDMENTS #7e) | The strategy doc said "explicit consent during onboarding"; the prototype makes consent a per-member, per-signal surface that's actually inspectable. |

The complete numbered change log is in [`AMENDMENTS.md`](./AMENDMENTS.md), with each amendment carrying its rationale, scope, and any defaults taken without explicit user confirmation (so they can be corrected).

---

## 4. Annotated screenshot reference

Live demo: **https://nest-presence-ai-app.vercel.app**.

Each scene below maps to a specific surface in the prototype. Walk it in this order for a 2-minute Loom.

| # | Surface | What to point at | Time |
|---|---|---|---|
| 1 | Intro page (desktop, left rail) | The **Try a scenario** cluster — two cards (Morning Wake / Last Person Left). Tapping pivots the phone. | 0:00–0:15 |
| 2 | Phone — Home tab, Morning Wake | Sunrise gradient + greeting "Good morning, Herui." Hero card with three auto-actions, each with **Undo**. Tap Undo on one — row collapses, device reverts in the Quick Controls below. | 0:15–0:50 |
| 3 | Phone — Devices page | Tap the LayoutGrid icon (top-right of greeting). Per-device rows with live state. Tap Bedroom lights → brightness slider. **Set as default for Morning Wake** CTA. | 0:50–1:15 |
| 4 | Intro page → Last Person Left | Tap the second scenario card. Phone gradient shifts cool-blue. New greeting "Have a good one, Herui." Hero card now reads "Front door locked / Thermostat → 78°F eco / Indoor cam armed." Heads up: "Package arriving 12:30 PM." | 1:15–1:40 |
| 5 | Phone — Settings | Suggest Mode pill, Local-only toggle (animates smoothly without flashing the screen — AMENDMENTS #9b). Who knows what panel showing per-member privacy. | 1:40–2:00 |

Static export: not provided (live URL is the canonical artifact, per the assignment).

---

## 5. Source materials & references

### 5.1 Earlier course artifacts (Herui Song)

- **Product Breakdown Exercise** (Assignment #1, solo) — `/Users/hsong/Desktop/275 PM/Product_Breakdown_Exercise_GoogleNest.pdf`
- **Strategy Case Exercise** (Assignment #2, with Ethan Duffy) — `/Users/hsong/Desktop/275 PM/Strategy_Case_Exercise_GoogleNest.pdf`
- **Experimentation & Eval Exercise** (Assignment #4, solo) — `/Users/hsong/Desktop/275 PM/Experimentation_Eval_Exercise_GoogleNest_v2.pdf`
- **Original product brief** — `/Users/hsong/Desktop/275 PM/product_brief.md`, copied verbatim into the repo as [`PROMPT.md`](./PROMPT.md)

### 5.2 Repo documents

- [`README.md`](./README.md) — project overview (rubric items #1, #3, #4, #5, #9)
- [`PROMPT.md`](./PROMPT.md) — source of truth (rubric item #7)
- [`PR_FAQ.md`](./PR_FAQ.md) — press release + FAQs (rubric item #6)
- [`EVAL.md`](./EVAL.md) — eval set summary (rubric item #8)
- [`AMENDMENTS.md`](./AMENDMENTS.md) — internal change log

### 5.3 External factual claims (re-stated from the strategy doc references)

[1] CIRP / Voicebot.ai. "Smart Speaker Market Share," Q4 2023. ~75M+ cumulative U.S. Amazon Echo activations.
[2] Amazon Developer Blog, 2023. Alexa skill count >130,000 in U.S. by 2023.
[3] Grand View Research / MarketsandMarkets / Statista. "Smart Home Market Size," 2024. ~$170B 2025 mid-range estimate; ~20% CAGR.
[4] Loup Ventures. "Voice Assistant IQ Test," 2022–2023. Google Assistant first on open-ended factual queries.
[5] Google Store, Q1 2026. Nest Aware Basic $8/mo, Premium $15/mo.
[6] Patel, Nilay. "Why Voice Assistants Have Failed Us." *The Verge*, 2023; Thompson, Ben. "AI Assistants and the Problem of Reactivity." *Stratechery*, 2023.
