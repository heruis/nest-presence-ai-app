# Product Brief: Google Nest — Nest Presence AI

> This document serves as the high-level product vision for the **Nest Presence AI** feature,
> distilled from the MGMT 276 Assignment #2 strategy analysis. It is written for an agent partner
> who needs to understand the *why* before building.

---

## Company & Mission

**Google Nest** is Google's family of smart home hardware (speakers, displays, thermostat,
cameras, doorbells, locks), unified under the Google Home app and powered by Google Assistant.

**Google's mission:** "Organize the world's information and make it universally accessible and
useful." For Nest, this means extending Google's AI into the home as an ambient computing layer —
a home that knows you and acts for you, rather than waiting to be asked.

---

## The Problem We Are Solving

Even committed Nest users rarely set up automations. The Google Home app is too complex for
non-technical users, so the "intelligent home" promise goes unrealized. The home is **reactive**:
users still manually arm cameras, adjust thermostats, and lock doors — every day.

This is the #1 UX gap in the current product and the single biggest opportunity to create a
genuine WOW moment that differentiates Nest from Amazon Alexa.

---

## Target User

**Nest Aware subscribers with 3+ Nest devices** — tech-forward homeowners aged 28–42,
often with children, who have already paid for the ecosystem but haven't unlocked its potential.
They want the home to "just work" without programming it.

---

## The Feature: Nest Presence AI

A proactive home intelligence layer that **automatically detects household context states and
executes home actions — no voice command, no manual routine setup required.**

### How it works

The system fuses four existing Google data signals:

1. **Phone geofencing** — Google Home's existing Home/Away Assist (who is home, who just left)
2. **Nest camera on-device ML** — motion detection and face recognition (already exists on Nest Hub Max / Nest Cam)
3. **Google Calendar integration** — "meeting at 9am", "guests arriving Saturday"
4. **Time-of-day behavioral history** — learned patterns from prior household activity

These signals are combined to infer **six home states**:

| State | Trigger example | Auto-action example |
|---|---|---|
| Everyone Home | All phones on geofence | Disarm cameras, set comfort temp |
| Last Person Left | Final phone exits geofence | Lock doors, arm cameras, eco temp |
| First Person Arriving | Phone approaching home | Unlock door, pre-heat/cool to comfort |
| Guest Detected | Unknown face at camera | Notify owner, hold automations |
| Morning Wake | Motion detected + typical wake time | Raise lights, morning briefing on Hub |
| Night Wind-Down | No motion + late hour + phones idle | Dim lights, lower volume, lock doors |

### Learning loop

A lightweight **"Did we get this right?"** feedback card in the Google Home app lets users
correct misdetections. This is the same UX pattern already used in Google Assistant suggestions.

### Ambient reporting

A weekly **Home Intelligence Report** surfaces on the Nest Hub ambient display:
energy saved, security events, number of automations executed — making the invisible value visible.

---

## Why Only Google Can Build This

| Capability | Google | Amazon | Apple |
|---|---|---|---|
| Calendar-aware context | ✅ Native | ❌ Third-party only | ⚠️ Limited |
| Maps/commute ETA | ✅ Native | ❌ | ❌ |
| On-device face recognition | ✅ Nest Hub Max | ❌ | ⚠️ HomeKit Secure Video |
| Cross-device NLU (BERT-class) | ✅ Tensor chips | ⚠️ Inferior NLU | ⚠️ Siri limited |
| Open ecosystem (Matter) | ✅ Co-author | ✅ Supported | ✅ Supported |

Google's context stack is **structurally un-copyable** in the short term. This is the moat.

---

## Monetization

- **Nest Aware Premium tier** at $15/month (vs. current $12/month Basic)
- Nest Presence AI is the anchor feature that justifies the upgrade
- Target: 25% Basic → Premium upgrade rate within Q1 post-launch

---

## Success Definition (Beyond a Single Metric)

- 40% of Nest Aware users activate AI Home Mode within 60 days of launch
- Nest Presence AI becomes the #1 cited reason for upgrading to Premium
- 1-star Google Home app reviews citing "too complex" decline by ≥30%
- Multi-device household churn rate measurably lower vs. single-device owners
- NPS increases among families with children (highest-value retention segment)

---

## Key Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Privacy backlash (presence monitoring) | High | On-device inference only; explicit consent; local-only mode |
| False positives (lock doors while someone is home) | High | 90%+ confidence threshold; 48-hr learning-only mode; instant override |
| iPhone / limited-Nest households get degraded experience | Medium | Graceful degradation messaging; device upsell guide at onboarding |
| Matter third-party device reliability | Medium | Prioritize native Nest devices in V1; Matter expansion in V2 |

---

## What This Feature Does NOT Do

- It does **not** replace existing manual Routines — it complements them (manual routines take priority)
- It does **not** require any new hardware — all building blocks exist today
- It does **not** send raw video or audio to the cloud — all presence inference runs on-device

---

## Build Guidance for Agent Partner

When implementing or prototyping this feature, keep these principles front of mind:

1. **Trust is the product.** Every decision that affects security (locking, cameras) requires conservative confidence thresholds and visible user control. A single bad experience destroys the feature.
2. **Invisible is the goal.** Success looks like users forgetting they set anything up — not noticing a feature, just noticing their home works better.
3. **Start with the Last Person Left state.** It has the clearest signal (all phones off geofence), the highest impact (security), and the most user tolerance for latency. Ship this state first.
4. **The feedback card is critical.** Personalization only compounds if users correct errors. Make the feedback card a first-class surface, not an afterthought.
5. **Respect the existing Routines hierarchy.** If a user has a manual Routine that conflicts, their manual setting always wins. This is non-negotiable for trust.
