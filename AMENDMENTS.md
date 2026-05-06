# Prototype Amendments

Running list of design changes from feedback discussions, to be implemented in the next code pass. Discussion-only; do not implement until the user explicitly requests it.

---

## Design Principles (apply to all amendments)

These are persistent rules that should govern every future copy and UX decision in the prototype, not one-off edits.

### DP-1 — Consumer-grade copy minimalism

When in doubt, delete. Headline + at most one supporting line, not three. Numbers speak for themselves — don't dollar-translate them as flavor text. Avoid meta-narration ("six states, four signals…" describes the product to the user; the UI should *be* the product). Cut "isn't this clever" copy in favor of plain user-value statements. PMs over-write because we're trained to explain; consumer apps under-write because the UI *is* the explanation.

---

## #1 — Hide model confidence from user-facing surfaces

**Decision:** Confidence is internal model plumbing for the threshold-gating logic, not a customer-facing concept. Surfacing "94%" risks undermining trust on borderline cases (a la Apple's privacy-first communication style — never expose probabilities to the user).

**Touches:**
- Home tab — live state chip: drop the `94%` pill
- Home tab — feedback button card subtitle: drop "94% confidence"
- Presence AI tab — active-state hero card: replace the big right-side number with something user-meaningful (e.g., "Auto-fired at 7:14 AM" or "Sources: 4 of 4 agree")
- Presence AI tab — state list rows: remove the per-row `%` and the confidence bar fill
- Presence AI tab — bottom "Trust thresholds" explainer: rephrase as privacy-first marketing copy in Apple's tone (drop the 90%/75% numbers)
- Activity / Weekly Report — "Avg. confidence 92%" stat tile: replace with a user-meaningful trust metric (proposed: "Times we asked you first")

**Open sub-decisions:**
- **Trust-threshold rephrase tone** — User wants Apple-style privacy-first advertising voice. Will draft when requested. Tentative direction: lead with what we *don't* do (auto-lock when unsure), not what we measure.
- **Weekly Report metric replacement** — Proposed "Times we asked you first" as a positive trust signal. Open to alternatives (e.g., "Auto-actions you didn't override," "Days the home ran itself").
- **Internal model judgment surface** — Confirmed it stays internal. No "advanced/diagnostic" view exposing confidence to power users.

---

## #2 — Fix toggle knob misalignment in Settings

**Bug:** On the Settings screen, the white knob inside the 48-hour learning-only and local-only-mode toggles is misaligned with the track — looks like it "goes out of" the slider.

**Root cause:** Knob (20×20) inside track (28×48) with `top-[3px]` and `x: 2 / 22` produces asymmetric gaps — 2px left in OFF, 6px right in ON, 3px top vs 5px bottom. The knob visually hugs the top-left edge in OFF and floats off-center in ON.

**Proposed fix:** Either bump knob to 22×22 with `top-[3px]` and `x: 3 / 23` for a uniform 3px inset on all sides, or keep 20×20 and use `top-[4px]` with `x: 4 / 24`. Either gives a symmetric iOS-style toggle.

**Where:** `components/screens/onboarding.tsx` — `ToggleRow` component.

---

## #3 — Replace Home tab device grid with three contextual sections

**Decision:** The current 2×3 device tile grid on the Home tab is decoration, not device management — it treats every device as equal and adds nothing Google Home doesn't already do badly. Replace with a three-section contextual layout that uses Presence AI's context model to organize what the user sees.

**New Home tab structure (top to bottom, below the Morning Wake hero):**
1. **Just done by Presence AI** — Compact list of what auto-fired in the current state, each with an inline **Undo** affordance. (This already exists in the hero card; consider whether to merge or keep separate.)
2. **Needs your attention** — Anomaly surfacing: deviations from household baseline that are worth a human glance. Examples: "Garage door has been open 22 min," "Porch light has been on since 2 PM," "Front door locked but back door unlocked," "Doorbell offline 3 hr." Each item has a one-tap action ("Close garage" / "Turn off" / "Reconnect").
3. **Quick controls** — A small, contextual set of manual controls — *not* a full device list. Selection is dynamic: e.g., the thermostat slider when it's actively heating, the lock when you're near home, the doorbell tile when motion was just detected. Defaults to 3–4 tiles.
4. **All devices →** thin link at the bottom that routes to a separate full device list (organized by function: Lighting / Climate / Security / Speakers — *not* by room or by device type — since function is what users actually want to control). Out of scope for V1 prototype unless time allows.

**Scope-expansion acknowledgment:**
- The "Needs your attention" anomaly-surfacing capability is **net-new scope** beyond the original brief/strategy/eval write-ups, which were defined around the six home states (Everyone Home, Last Person Left, First Person Arriving, Guest Detected, Morning Wake, Night Wind-Down) and their action sets.
- **Per user direction (2026-05-06):** prior course documents (strategy doc, product breakdown, PR-FAQ draft, eval write-up) will **not** be retroactively updated. The prototype represents an evolved V1.1 vision; AMENDMENTS.md is the canonical record of where the prototype diverges from prior write-ups.
- Implication: this divergence should probably be acknowledged in the final-project README's "Known limitations" section so a grader reading the eval doc and the live prototype side-by-side isn't confused.

**Open sub-decisions:**
- **Anomaly tone — aggressive vs conservative.** Aggressive surfaces anything statistically unusual (more demo-impressive but risks notification fatigue and "boy who cried wolf" trust loss). Conservative only surfaces things the user can act on right now and that are likely *actually* problems (more trustworthy, less impressive in a 2-min Loom). User to pick.
- **Anomaly examples to seed in mock data.** Need 3–5 concrete anomalies for the prototype. Candidates: garage left open, porch light on too long, door state mismatch (front locked / back unlocked), low device battery, device offline, motion in unexpected zone. Pick the ones that best sell the moat ("only Google can do this because of the context stack").
- **Quick controls selection logic.** What's the rule for which 3–4 controls show by default? Options: (a) "currently active" devices, (b) the devices Presence AI most-recently touched, (c) the devices the user has overridden most often historically. Probably (b) for V1.

---

## #4 — Copy minimization pass (applies DP-1)

**Decision:** Cut over-written and meta-narrative copy across the prototype. The UI *is* the product; we don't need to describe it.

**Specific edits:**

| Surface | From | To |
|---|---|---|
| Presence tab title | "Six states, four signals, one home that knows you." | "One home that knows you." |
| Presence tab subtitle | "Presence AI fuses geofencing, on-device camera ML, your Calendar, and learned time-of-day patterns to decide what your home should do next." | Cut entirely (or one line max — open) |
| Activity hero card line 2 | "About \$3.10 trimmed from your utility bill — without you noticing." | Cut entirely. The kWh stands alone. |
| Home tab — trust footer block | "On-device · You're in control / All presence inference runs locally. Long-press any tile to override — we'll learn from it." | Cut the whole footer. Trust gets communicated by the product working, not by reassuring copy. |
| Activity tab subtitle | "Apr 28 – May 5 · No voice commands. No manual routines. Just you, living in your home." | "Apr 28 – May 5 · No voice commands. No manual routines." (drop the cute closer) |
| Onboarding — Suggest/Auto mode descriptions | Each has a 2-line philosophical body | Shrink to one line each. Probably "Best for the first week" / "The full ambient experience" is enough. |
| Feedback page subtitle | "Your correction trains Presence AI for your household — on-device, never shared." | Defer to #1's Apple-style trust voice; don't duplicate inline reassurance here. |

**Where:** `components/screens/presence-ai.tsx`, `report.tsx`, `home.tsx`, `onboarding.tsx`, `feedback.tsx`.

---

## #5 — Build out Suggest Mode interactions

**Decision:** Settings has a Suggest vs Auto toggle but no actual Suggest Mode UX exists in the prototype. Per the eval doc Treatment 1, Suggest Mode is: AI detects state → pushes a confirmation card → user taps to confirm or skip each action → action fires (or doesn't). Build this so the A/B from the eval write-up is actually demoable.

**Proposed UX:**
- When Suggest Mode is active (Settings), the Home tab's "Just done by Presence AI" section becomes "Pending suggestions" instead.
- Each pending suggestion is a card with: proposed action, the signals that triggered it, two buttons — **Confirm** (green) and **Skip** (subtle).
- Tapping Confirm → card animates into the "Just done" state with an undo affordance.
- Tapping Skip → card asks one quick reason ("Wrong time" / "Wrong action" / "Just not now") then dismisses. Reason logs to feedback history.
- A small mode indicator at the top of the Home tab shows "Suggest Mode · Day 3 of 7" (graduating to Auto after 7 days, per the eval doc).
- The Settings → Mode picker becomes the entry point for swapping between modes; in the prototype, swapping refreshes the Home tab to show the corresponding UX.

**Where:** new `components/screens/home-suggest.tsx` (or modify `home.tsx` to take a `mode` prop), updates to `lib/data.ts` for pending-suggestion mock data, state lifted to `app/page.tsx`.

**Open sub-decisions:**
- **Suggestion surface** — Inline cards on Home (proposed) vs iOS-style notification overlays vs a separate "Inbox" tab. Inline is simplest and matches the eval-doc description ("notification card with Confirm").
- **Skip flow** — Just dismiss vs always ask why. Always-ask is more honest for the personalization loop but adds a tap. Probably ask only on Skip, not on Confirm.
- **7-day graduation** — Show the day counter in the prototype (more authentic, more demo-able) or keep it implicit. Counter is more impressive.
- **Mock data** — Need 2–3 pending suggestions to seed for the demo. Candidates: "Lock front door — last person left 3 min ago," "Lower thermostat for night — usual wind-down time," "Pre-warm bedroom — 9 AM calendar event in 22 min."

---

## #6 — Add global header: profile circle + home switcher

**Decision:** Both are standard expectations for a Google/smart-home consumer app and currently absent from the prototype. The home switcher in particular is **necessary** — multi-property households (vacation home, parents' house, rental) are a real Nest user segment, and ignoring them undersells the product. The profile circle pattern is also how Google reinforces account/identity across surfaces.

**Proposed UX:**
- A thin global header above each screen's content (sits between the status bar and the page content).
- **Top-left: home switcher.** Current home name + chevron-down. Tap → bottom sheet with 2–3 mock homes (e.g., "Beverly Hills House," "Tahoe Cabin," "Mom's Place") + an "Add a home" row at bottom. Selecting a home re-renders the screen with that home's mock data.
- **Top-right: Google profile circle.** Standard Google avatar circle (initial or photo). Tap → bottom sheet with: current account name + email, household members (with their own avatars and presence status — "Home" / "Away"), "Switch account," "Manage Google Account," "Sign out."
- The profile sheet is also where household members are visible — which doubles as a way to show how Presence AI knows who's home.

**Where:** new `components/global-header.tsx`, two new sheet components (`home-switcher-sheet.tsx`, `profile-sheet.tsx`), state in `app/page.tsx`.

**Open sub-decisions:**
- **Home-switcher functional vs cosmetic.** Functional = each home has its own state, devices, activity (more impressive, more mock data). Cosmetic = UI exists but switching does nothing (faster to build, weaker demo). Probably functional for at least 2 homes — the primary one fully fleshed out, a second one with minimal data to show the contrast.
- **Profile data realism.** Use a real-looking household (e.g., "Herui · Owner" + "Yuna · Member" + "Mom · Guest") with mock avatars vs single-user. Multi-member is more authentic and ties to Guest Detected state.
- **Header presence on all tabs vs only Home.** Consistent (every tab has the header) vs Home-only (cleaner on detail pages). Consistent is the standard pattern.

---

<!-- Add new amendments below -->
