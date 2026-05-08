# Eval Set Summary — Nest Presence AI

> Distilled from `Experimentation_Eval_Exercise_GoogleNest_v2` (MGMT 275 Assignment #4) and explicitly cross-walked to what the prototype implements. **This is rubric item #8: validation results from the Experimentation Exercise.**

The exercise is a **pre-launch design** — it specifies what would be measured, the success bar, and how the system would be evaluated. The numbers below are *target metrics and expected directions*, not post-launch readings. The prototype (`lib/data.ts`) implements the surfaces that would carry the data through onboarding, automation, and feedback.

---

## Part I — A/B Experiment: Onboarding Mode Test

The single highest-stakes design call for Presence AI is **how aggressively the AI starts acting** on day one. We test that with a 3-arm comparison.

### 1.1 Arms

| | Control (C) | Treatment 1 (T1) | Treatment 2 (T2) |
|---|---|---|---|
| **Name** | Manual Routines (status quo) | Presence AI — Suggest Mode | Presence AI — Auto Mode |
| **Experience** | User builds automations manually in Google Home app. No AI prompt. | AI detects state and pushes a confirmation card ("Ready to lock your door? Tap to confirm"). User approves each action for 7 days, then graduates to Auto. | 48-hour silent learning window, then AI executes automatically. Each post-action card asks "Did we get this right?" |
| **Where it lives in the prototype** | (out of scope — pre-existing baseline) | Settings → **Suggest Mode**; Home tab renders **Pending suggestions** + **Just done** sections | Settings → **Auto Mode** (default); Home tab renders the **Auto-actioned** hero card with per-row Undo |

### 1.2 Population & duration

- **Eligible:** Nest Aware Basic subscribers, ≥3 Nest devices, Android primary phone, Google Calendar connected.
- **N:** ~180,000 households; ~60,000 per arm at 95% power, MDE = 5pp.
- **Duration:** 28 days. Days 1–7 ramp to 10% traffic with a kill-switch on P0 trust incidents (false security actions); full traffic days 8–28.

### 1.3 Metrics

| Metric | Why it matters | Expected direction |
|---|---|---|
| **Feature activation rate (7-day)** — primary | Baseline for manual routines is ~8%; signal of whether the proactive frame works at all | T1 → +20pp ▲ · T2 → +25pp ▲ |
| **30-day active usage rate** | Distinguishes curiosity from sustained habit | T1 ~55% · T2 ~65% of activated users ▲ |
| **Basic → Premium upgrade rate** — business KPI | Whether the feature drives the subscription upsell | T2 higher lift; silent automation is the Premium differentiator ▲ |
| **User override rate** — guardrail | % of automated actions manually reversed; high = broken trust | Must stay ≤8% in T2; >12% pauses experiment ▼ |
| **Nest Aware churn** — guardrail | Unexpected automations could trigger cancellations | Must not increase >1.5pp vs C ▼ |
| **Automation-error support tickets** — guardrail | False positives (e.g., locked-out residents) are catastrophic | Must not increase >15% vs C ▼ |

### 1.4 Launch criteria

**Main objective:** T1 or T2 must achieve **≥25% feature activation AND ≥10pp lift in Premium upgrades** vs. C, at 95% significance.

**All guardrails must hold to ship:** override rate <8% in the winning arm, Nest Aware churn not >1.5pp vs C, automation-error tickets not >15% vs C.

### 1.5 Risks called out in the design

- **False-positive security action** — T2 could lock a resident out or arm cameras during a guest visit. *Mitigation:* ≥90% confidence required for security-affecting actions; instant voice + app override always available.
- **Novelty effect** — week-1 spike that collapses by week 4. *Mitigation:* week-1 and week-4 retention reported separately.
- **iPhone-degraded geofencing** — *Mitigation:* results segmented by Android vs iOS primary device.

### 1.6 What this drove in the prototype

| Eval design choice | Prototype consequence |
|---|---|
| Two arms (Suggest, Auto) | Settings ships both modes; **Auto is default** (highest expected lift on the business KPI). |
| 7-day Suggest → Auto graduation | Home tab carries a "Suggest Mode · Day 3 of 7 — graduates to Auto on May 9" indicator. |
| Override rate as the ship-blocker | Every auto-action carries an inline **Undo**; Undo is the most-instrumented interaction. |
| Privacy guardrails | Settings → **Local-only mode** disables cloud calls and free-text feedback (suggestion chips remain). Settings → **Who knows what** panel shows per-member signal permissioning. |

---

## Part II — LLM Evaluation: Nest Context Intelligence Engine (NCIE)

The LLM serves three roles in Presence AI:
1. **State explanation generation** — natural-language rationale for each automated action ("Both phones left the geofence within 2 minutes…").
2. **Free-text feedback interpretation** — mapping user corrections ("we were having a party") onto a structured ontology so the model can adjust.
3. **Weekly Home Intelligence Report synthesis** — summary on the Hub display.

Errors in any of these surface directly to users, so LLM reliability is a first-order product quality concern — not a research nice-to-have.

### 2.1 Eval Set design — 500 prompt-output pairs across four strata

| Stratum | N | Source | Ground truth |
|---|---|---|---|
| Standard home-state inference | 200 | Anonymized Nest usage logs | Nest product expert panel |
| Edge cases | 150 | Irregular schedules, parties, overnight guests, conflicting signals (geofence Away + camera motion) | Expert panel consensus |
| Free-text feedback interpretation | 100 | Mapped against a structured correction ontology (false-departure, guest-misclassified-as-resident, Night Wind-Down during a party) | Expert labeling |
| Adversarial | 50 | Voice-command jailbreaks, PII extraction, feedback-field prompt injection | 100% block / safe-response required |

Ground truth is finalized **before** any model output is generated, to prevent label leakage.

### 2.2 Technical metrics

| Metric | Target | Notes |
|---|---|---|
| **Hallucination rate** | <3% overall; **zero** on security-affecting outputs | Detected by deterministic rule-checker against the structured signal tuple (geofence, camera, calendar). |
| **Correctness / accuracy** | ≥92% on standard scenarios, ≥78% on edge cases | 3-point rubric (Correct / Partially / Incorrect), expert ground truth. |
| **Latency** | P50 <180ms end-to-end · P95 <450ms on-device · 500ms budget for non-blocking explanation generation | Automation that fires after the moment has passed feels broken. |
| **Cost** | <$0.0008 per inference; ~$5,800/day cap at 2M Premium households | Gemini Nano on-device for standard states; cloud reserved for edge cases + report generation. |

### 2.3 Business-KPI alignment

| Technical metric | Business KPI | Linkage modeled in the design |
|---|---|---|
| Hallucination rate <3% | Nest Aware churn | One false lock-out is modeled at ~3× churn lift for that household |
| State accuracy ≥92% | Override rate; Premium upgrade conversion | A 5% accuracy drop correlates with ~2.5× override-rate increase and ~40% drop in upgrade intent |
| P95 latency <450ms | Feature activation rate; NPS | Sub-500ms execution is the threshold for users describing automation as "magical" — the key NPS driver in user research |

### 2.4 Evaluation strategy — hybrid

- **Agent-as-a-Judge (≈80% of eval).** GPT-4o grades state-inference outputs against the structured rubric. Chosen for architectural independence from Gemini to avoid correlated failures. Daily accuracy score in CI/CD within 15 min. Calibrated quarterly against human labels on 50 overlapping prompts; agreement must exceed 88% to remain valid.
- **Human-in-the-Loop (mandatory for safety).** All 50 adversarial prompts and any output flagged by the safety filter are reviewed by Trust & Safety within 24 hours. Security-affecting actions undergo monthly red-team exercises with contracted security researchers attempting voice-command and feedback-field jailbreaks.

### 2.5 Success & guardrails (no-ship if breached)

**Main objective:** ≥92% weighted accuracy on the 500-prompt Eval Set, with ≥78% on edge cases and 100% safe-response rate on adversarials.

**Guardrails:**
- Latency P95 ≤450ms on-device, ≤800ms cloud-assisted
- Hallucination: zero on security-affecting outputs, <3% overall
- Safety: 100% of P0 adversarial prompts blocked before user-visible
- Cost: ≤$0.0008/inference; ≤$6,500/day at 2M-household scale

### 2.6 Reliability & safety guardrails

- **Confidence gating.** Security-affecting actions require ≥90% model confidence; comfort actions ≥75%. Below threshold → confirmation card, not auto-execution.
- **PII / biometric filter.** Face-recognition outputs are converted to anonymized household-member IDs on-device; no raw video, audio, or biometrics transit to cloud LLM inference. PII scrubber runs on all free-text feedback.
- **Adversarial input filter.** Voice and feedback inputs screened against known jailbreak patterns; matches → safe-default response + silent security alert to the household's Google Account.
- **Local-only mode.** All cloud calls disabled; on-device Tensor inference only. Reduces accuracy to ~84% but fully isolates data. (Surfaced in the prototype's Settings.)

### 2.7 Risks called out in the design

- **Model drift** — household behavior shifts seasonally. *Mitigation:* weekly automated regression against the full Eval Set; >4pp drop from launch baseline auto-triggers retrain.
- **Judge-LLM correlation risk** — if GPT-4o shares a blind spot with Gemini, Agent-as-a-Judge misses a category. *Mitigation:* quarterly human audit of 50 random judge-evaluated outputs; >12% disagreement → rotate judge.
- **Safety-filter false positives** — over-aggressive filter blocks legitimate homeowner overrides. *Mitigation:* every blocked action is logged with a manual override path; >2% false-positive block rate → recalibrate confidence thresholds.

---

## What the prototype demonstrably exercises (vs. what's still on paper)

| Eval-design concept | In the prototype? | Where |
|---|---|---|
| Two onboarding modes | ✅ | Settings → Suggest / Auto |
| 7-day Suggest → Auto graduation arc | ✅ (visual indicator, no real timer) | Home tab "Day 3 of 7" pill |
| Per-action Undo (override-rate signal) | ✅ | Home hero card; reverts device state to the action's `before` |
| "Did we get this right?" feedback | ✅ | Feedback screen — outcome → chips → free-text → on-device confirmation |
| Local-only mode | ✅ | Settings toggle; Activity tab locks; Feedback screen hides free-text |
| Who-knows-what consent surface | ✅ | Settings → privacy panel |
| Confidence gating | Hidden by design (per AMENDMENTS #1) | Internal — never surfaced to the user |
| Eval set / Agent-as-a-Judge / red-team | ❌ paper only | Pre-launch infrastructure, not user-visible |
| Weekly model-drift regression | ❌ paper only | Same |

---

## Provenance

- Source: `/Users/hsong/Desktop/275 PM/Experimentation_Eval_Exercise_GoogleNest_v2.docx` (Herui Song, MGMT 275 Assignment #4, 2026-04).
- Rubric mapping: this file satisfies **Section 2 Item #8 — Eval set summary** of the Final Project (Prototype and PR-FAQs) assignment.
- Variance from this doc and from the strategy/breakdown is logged in [`AMENDMENTS.md`](./AMENDMENTS.md).
