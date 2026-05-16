# Nest Presence AI — Press Release & FAQ

> Working-backwards launch document for **Nest Presence AI**, a proposed Nest Aware Premium feature.
> Authors: Herui Song & Ethan Duffy · UCLA MGMT 275 · Final Project · May 2026.
> This is rubric item #6. Companion files: [`PROMPT.md`](./PROMPT.md), [`EVAL.md`](./EVAL.md), [`APPENDIX.md`](./APPENDIX.md), [`AMENDMENTS.md`](./AMENDMENTS.md).

---

## Press Release

**FOR IMMEDIATE RELEASE**

### Google Nest introduces Nest Presence AI — the home that acts before you ask

*A new Nest Aware Premium feature infers six household states from existing Google signals and runs the home automatically — no voice commands, no manual routines.*

**Mountain View, CA — May 14, 2026** — Google Nest today announced **Nest Presence AI**, a proactive home intelligence layer that automatically detects what's happening at home and runs the right device actions on its own. Available as part of **Nest Aware Premium** at $20/month, Presence AI fuses four signals customers already share with Google — phone geofencing, on-device camera ML, Google Calendar, and learned time-of-day patterns — to infer one of six household states (Morning Wake, Last Person Left, First Person Arriving, Everyone Home, Guest Detected, Night Wind-Down) and execute the right actions across lights, locks, cameras, the thermostat, and Hub displays.

The problem Presence AI solves is one Nest customers have lived with for a decade: the Google Home app's automation surface — Routines — is powerful, but most households never set them up. The "intelligent home" was always one configuration screen away. Presence AI removes that screen entirely. The home runs itself; the user only intervenes when something feels wrong, and a built-in **"Did we get this right?"** card turns every correction into a personalization signal.

> "I've owned Nest cameras and a thermostat for three years and never built a single Routine. With Presence AI on, the lights came up at 7:14 the way I'd have set them — except I didn't set anything. The doors locked when we left for breakfast. I'm not sure when it learned us, but it did." — *Sarah K., Nest Aware Premium beta participant, Beverly Hills, CA*[^1]

[^1]: Composite quote drawn from the project's concept-review interviews; the final press release would carry a verified beta participant.

> "Ambient computing was always the destination. Presence AI is the first time the home moves before you do." — *Rishi Chandra, VP & GM, Google Nest*

**Two ways to start.** New subscribers choose between **Suggest Mode** — the AI proposes each action via a tap-to-confirm card for the first seven days — and **Auto Mode**, which begins acting silently after a 48-hour silent learning window, with every auto-action wearing an inline **Undo**. Both modes share the same engine; the difference is how aggressively the home delegates.

**Privacy is the contract.** All presence inference runs on-device, accelerated by Google's Tensor chip. No raw video or audio leaves the home. A **Local-only mode** disables every cloud call, including the Weekly Home Intelligence Report, for households that want zero off-device processing. A **Who Knows What** panel in Settings shows exactly which signals each household member contributes — and lets each member revoke any of them.

**Availability.** Nest Presence AI rolls out to Nest Aware Premium subscribers on Android, beginning May 14, 2026. iPhone users with at least three Nest devices receive the feature with degraded geofencing reliability, and a one-time onboarding screen explains the gap. Households with fewer than three Nest devices receive a tailored upgrade guide rather than an active feature flag. Pricing: **$20/month** — no change from the existing Premium tier.

**Learn more:** g.co/nest/presence-ai

---

## External FAQ

> 8 questions a Nest customer or prospective subscriber would actually ask.

### 1. What is Nest Presence AI?

It's a feature in Nest Aware Premium that figures out what's going on at home — who's around, when you usually wake up, whether your calendar says you're heading out — and runs the right actions across your Nest devices automatically. Lights ramp at your usual wake time. Doors lock when the last phone leaves the geofence. The thermostat eases into Eco when no one's home. You don't set up Routines. The home just runs.

### 2. What devices do I need?

Presence AI is built for households with **three or more Nest devices**, an **Android primary phone** with Google Calendar connected, and an active **Nest Aware Premium** subscription. It works best with Nest Cam (indoor or doorbell), a Nest x Yale Lock, and a Nest Learning Thermostat in the mix. iPhone users get the feature with reduced geofencing reliability, and we tell you that up front.

### 3. What if it makes a mistake?

Every automatic action shows up on your Home tab with an **Undo** button next to it. Tap Undo and the device goes back to where it was before — the lock unlocks, the lights drop back, the cam returns to its prior mode. We also surface a **"Did we get this right?"** card after meaningful actions; *Got it right* / *Almost* / *Wrong call* takes one tap, and you can add a note if you want. Over time, that's how the home learns your household specifically. We never punish you for correcting us.

### 4. How does it know when I'm home?

By combining four things you already share with Google: where your phone is (the same Home/Away signal that's been in Google Home for years), motion and faces from your Nest cameras (processed on-device), Google Calendar events, and the time-of-day patterns we've learned from your household. No single signal decides anything — Presence AI requires multiple sources to agree before it acts on anything security-related.

### 5. Is this monitoring me? What about privacy?

All presence inference runs **on your device**, on Google's Tensor chip. **No raw video or audio leaves your home** — we work with the same anonymized motion and face-ID signals that Nest cameras already produce locally. If you want zero cloud calls of any kind, **Local-only mode** in Settings turns them all off; you'll lose the Weekly Home Intelligence Report and free-text feedback (the suggestion chips still work), and accuracy drops a little, but no data ever leaves the household. Settings also shows a **Who Knows What** panel where every member can see and revoke each signal individually.

### 6. What if I have an iPhone?

Presence AI works on iPhone, but **geofencing is less reliable** because of how iOS handles background location. We tell you this when you turn the feature on, and we'd rather under-promise here than have you locked out of your house at 6 AM. iPhone households that already have at least one Android phone in the family see no degradation — Presence AI uses every phone in the household together.

### 7. How does this compare to Routines or Alexa Routines?

Routines (and Alexa Routines) are reactive: they wait for you to either say something or hit a trigger you set up. Presence AI is proactive: it reads household context and acts on its own. If you already have a manual Routine, **your Routine always wins** — we never override something you've configured.

### 8. How much does it cost? Is it included with Nest Aware?

Presence AI is part of **Nest Aware Premium at $20/month**. If you're on Nest Aware Basic ($10/month), upgrading gets you Presence AI plus everything Premium already includes (60-day video event history, unlimited cameras). There's no separate purchase, no add-on cart, and no per-device pricing.

---

## Internal FAQ

> 14 questions our exec, partner, eng, and legal stakeholders would actually push back on.

### 1. Why are we solving this problem and not the other 30 in the Nest backlog?

Two reasons. First, **RICE math**: the addressable population (Nest Aware households with 3+ devices) is large, the per-household reach is daily, the impact on the Premium upsell is direct, and the engineering is orchestration of components we already ship. Detail in [`APPENDIX.md`](./APPENDIX.md). Second, **strategic positioning**: we cannot beat Alexa on the breadth-of-skills war Amazon already won. The single category we can win uncopyably is *the proactive home* — Calendar, Maps, Photos, and on-device ML are structurally hard for Amazon and Apple to assemble. Every quarter we don't claim it, the moat erodes.

### 2. What's the North Star Metric?

**Weekly active households running ≥1 Presence AI auto-action.** It captures the only thing that matters: are real households letting the home act on its own, week over week? Subscription revenue, NPS, and Premium upgrade are downstream of that single behavior.

### 3. What are the SMART success criteria for V1?

- **Specific:** ≥40% of Nest Aware households with 3+ devices have run ≥1 Presence AI auto-action in the past 7 days.
- **Measurable:** Telemetry from the existing Nest Aware backend; daily dashboard.
- **Achievable:** Baseline activation for manual Routines is ~8%. The eval-design expected lift is +20pp (Suggest) to +25pp (Auto), putting Day-7 activation at ~33%. The Day-60 step from 33 → 40% comes from the trust ramp itself — Suggest-to-Auto graduation and the household-network flywheel — which the eval's 28-day window can't capture but the strategy-doc target accounts for.
- **Relevant:** Direct upstream of the Premium upgrade and churn KPIs.
- **Time-bound:** 60 days post-GA (so by **2026-07-14**, given a 2026-05-14 launch).

Guardrails, all of which must hold to keep the feature live: **override rate ≤8%**, **Nest Aware churn delta ≤+1.5pp vs. control**, **automation-error support ticket delta ≤+15% vs. control**, **zero hallucinated security actions** in eval and production.

### 4. RICE — why this problem over the alternatives we considered?

Top three problem candidates we ranked (full table in [`APPENDIX.md`](./APPENDIX.md)):

| | Reach | Impact | Confidence | Effort | RICE |
|---|---|---|---|---|---|
| **Presence AI** (this) | 1.0 | 3.0 | 0.8 | 6 mo | **0.40** |
| Matter third-party reliability fixes | 0.6 | 2.0 | 0.6 | 9 mo | 0.08 |
| Doorbell-call AI summarizer | 0.4 | 1.0 | 0.7 | 4 mo | 0.07 |

Presence AI wins on reach (every Nest Aware household with 3+ devices), impact (it's the one feature that materially moves the Basic→Premium upgrade), and confidence (eval-design predicts +20–25pp activation lift). It loses on effort, but only modestly — we're orchestrating components that already exist.

### 5. What's the growth lever — what would move the North Star fastest?

The **Suggest → Auto graduation arc**. Households who graduate from Suggest to Auto have an order-of-magnitude higher 30-day active usage rate than households who never leave Suggest. The lever isn't acquiring more households into the feature; it's accelerating the trust ramp inside the household. Two follow-ons gated by the V1 launch numbers: (a) per-action graduation (let users move single auto-actions to Auto without graduating the whole feature), (b) "We were having a party" night-mode opt-out, surfaced contextually rather than buried in settings.

### 6. Why $20/month, and why isn't this in Basic?

Basic is positioned as **video event history**; Premium is positioned as **the home that acts on its own**. Pricing the proactive layer into Basic dilutes both tiers. The $20 price point is the existing Premium tier — we're not raising it; we're giving subscribers a dramatically better reason to be on it. Modeled break-even at ~12 months on incremental Basic→Premium upgrades alone, before any reduction in churn.

### 7. Is the 6–12 month engineering timeline real?

Yes — and this is what eats most of the internal pushback. **Every building block already ships in production**: phone geofencing (Home/Away Assist), on-device face/motion detection (Nest Cam, Nest Hub Max), Google Calendar API, the Routines execution engine, Tensor on-device inference. We are not training a new model from scratch and we are not shipping new hardware. We are **orchestrating** existing components into the six-state inference layer (Nest Context Intelligence Engine — see [`EVAL.md`](./EVAL.md) §2). Risk areas are eval set curation, the on-device confidence-gating pipeline, and the personalization loop wiring — not foundational ML.

### 8. Privacy / legal — what's the consent model?

Three-layer. **(1) Activation consent** — you explicitly opt in during a Settings screen that names every signal the feature uses (location, face recognition, calendar, learned time-of-day) and what each one does. **(2) Per-member privacy** — every household member can revoke any signal individually via the Who Knows What panel; revocations apply within a single inference cycle. **(3) Local-only mode** — a single toggle that disables all cloud calls including the Weekly Home Intelligence Report and free-text feedback, leaving the feature running on-device only at slightly reduced accuracy. We've kept the legal review tight on three things: (a) no raw video/audio leaves the home, ever; (b) face recognition outputs are converted to anonymized member IDs on-device; (c) presence inference is never used for advertising surfaces — it does not feed Google Ads.

### 9. Trust & Safety — how do we prevent catastrophic false positives?

**Confidence gating is the primary control.** Security-affecting actions (locks, alarms, camera-arming) require ≥90% model confidence. Comfort actions (lights, thermostat) require ≥75%. Below threshold, the system surfaces a confirmation card rather than auto-executing. **Adversarial prompts** (voice-command jailbreaks, feedback-field prompt injection, PII extraction attempts) are screened pre-output; matches trigger a safe-default and a silent security alert. **Human-in-the-loop** for all 50 adversarial eval prompts and any safety-flagged production output, reviewed within 24 hours by Trust & Safety. **Monthly red-team** by contracted security researchers. Detailed in [`EVAL.md`](./EVAL.md) §2.6.

### 10. What's the iPhone strategy? Are we genuinely OK with a degraded experience for ~50% of US smartphones?

Yes, with telegraphing. iPhone-primary households see the feature with **reduced geofencing reliability**, and we tell them so during onboarding. Internally we report results segmented by Android vs iOS so we don't conflate platform issues with feature issues. We expect this gap to narrow as iOS background-location APIs improve, and we explicitly do not intend to invest in an Apple-specific workaround that would compromise on-device privacy guarantees.

### 11. Matter ecosystem — what about non-Nest devices?

V1 ships with **native Nest devices only**: Nest Cam (indoor + doorbell), Nest Learning Thermostat, Nest x Yale Lock, Nest Hub / Hub Max, and Hue lights via the existing Hue integration. Matter third-party devices are V2 (target Q4 2026). The reason is reliability — Matter device behavior varies enough that auto-actions against them would inflate the override rate and we'd fail the launch guardrail. We'd rather ship narrow and trustworthy.

### 12. Cannibalization — does Presence AI eat Routines? Eat Basic?

**Routines:** No. Manual Routines always take priority over Presence AI when they conflict. Presence AI fills the empty space — the ~92% of households that never set up a Routine — not the ~8% that did. **Basic:** Yes, deliberately. Presence AI is Premium's reason to exist. We are making Basic a relatively worse value to drive upgrade revenue. The eval-design forecast: Premium upgrade rate +10pp vs control, with an acceptable churn delta ≤+1.5pp.

### 13. Org dependencies — who are the blockers?

Three teams plus Trust & Safety. **Search ML / Tensor Inference** owns the on-device pipeline; this is the longest pole. **Google Home App eng** owns the Settings + onboarding surfaces and the inline Undo/Heads-up affordances. **Nest Aware backend** owns the activation telemetry, the Suggest→Auto graduation timer, and the Weekly Report synthesis. T&S is on every release branch as a required reviewer. Notable non-blockers: Pixel hardware (we use existing Tensor chips), Google Cloud (no new model serving infra), and Maps (only commute ETAs, already a public API).

### 14. Kill criteria — when do we shut this down?

Any one of these in production triggers a feature-flag rollback within 24 hours:
- Override rate >12% sustained over 7 days in any cohort
- Any **single** hallucinated security action that resulted in a household lockout, regardless of total volume
- Nest Aware churn delta >+1.5pp vs. control sustained over 14 days
- Automation-error support ticket delta >+15% vs. control sustained over 14 days
- Privacy incident involving raw video/audio leaving the household, of any size

A rollback isn't a kill — we go back to Suggest-only for everyone, fix, re-eval, and re-ship. A genuine kill requires two consecutive rollbacks for the same root cause without a credible fix path; in that case, Presence AI drops back to Manual Routines parity until we redesign.

---

## Appendix — what's in [`APPENDIX.md`](./APPENDIX.md)

- Full RICE prioritization table (3 candidate problems × full criteria)
- UX study summary (prototype interview findings and trust-ramp interpretation)
- Variance log: where the prototype diverged from the original strategy doc / breakdown / eval write-up
- Annotated screenshot reference list
- Source materials & references
