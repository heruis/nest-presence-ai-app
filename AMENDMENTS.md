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

## #7 — Trust loops, settings consistency, and demo-realism pass

**Decision (2026-05-06):** A single coherent pass to (a) finish removing internal-AI evaluation language from user-facing surfaces, (b) make every interactive button complete a visible loop, (c) reflect Settings toggles consistently across the app, and (d) make the second home credible enough that the home-switcher doesn't undermine prototype trust.

### 7a. Final confidence/accuracy/guardrail purge

Remaining hits found in audit:
- `report.tsx` — "Night Wind-Down accuracy 94%" highlight title
- `lib/data.ts` — Weekly metric `{ "Override rate", "4.1%", "Below 8% guardrail" }`
- `feedback.tsx` — `learningCopy.correct.impact` "confidence will tick up to 96%"
- `feedback.tsx` — `learningCopy.wrong.impact` "Confidence drops to 78%, falls below auto threshold"

**Replacements:**
- "Night Wind-Down accuracy 94%" → "Night Wind-Down ran 6 of 7 nights"
- Override rate metric → `{ "Auto-actions kept", "82 of 84", "Only 2 corrections this week" }` — positive trust framing, no PM language
- Feedback impact lines → user-meaningful consequences ("We'll lock this pattern in for next Sunday" / "We'll ask you first next Sunday at 7 AM")

### 7b. Interaction loops complete with visible state

Buttons that currently look tappable but don't visibly change state — fixed:
- **Undo** (Auto hero card + Suggest "Just done") — collapses the row out, brief "Undone" pill, in Suggest mode the row returns to "Pending suggestions"
- **Anomaly action** (Close garage / Turn off / Reconnect) — row animates into a green confirmation state showing past-tense ("Closed", "Off", "Reconnected"), then dismisses after ~1.4s
- **Activate Presence AI** (onboarding CTA) — animates to ✓, switches to Home tab with a brief "Activated · Auto Mode" / "Activated · Suggest Mode" toast at top
- **All N devices →** — opens a bottom-sheet device list grouped by **Lighting / Climate / Security / Speakers** (per-Q1 decision A — functional, not deferred)

### 7c. Settings → app consistency

`localOnly` and `learning` were trapped inside `OnboardingScreen`. Lifted to `app/page.tsx` so:
- **Local-only mode ON** — Activity tab shows a locked state ("Disabled by Local-only mode · Your data never leaves your home"), free-text textarea on Feedback hides (suggestion chips stay so the loop still works on-device)
- **48-hour learning-only ON** — Home hero card replaced with a "Learning your home · Hour 12 of 48" banner showing what *would* have fired (greyed-out preview list); no actions execute. Both Auto and Suggest defer to this banner.

### 7d. Tahoe Cabin gets real (per Q2 decision A)

Switching to Tahoe now changes:
- **Active state** — "Last Person Left · 47 hr quiet" instead of Morning Wake; vacation-mode actions (cameras armed, thermostat 55°F freeze-protect, anti-burglary random evening lights)
- **Anomalies** — "Doorbell offline 3 hr" + "Front lock battery 14%" (vacation-home-flavored)
- **Quick controls** — Vacation thermostat, armed cameras, locked door, scheduled lights
- **Weekly metrics + timeline** — lower auto-action counts; daily bars reflect a quiet vacation week

This eliminates the "switch to Tahoe but still see Beverly Hills morning data" trust break.

### 7e. Privacy/consent surface (per Q4 decision B)

New "Who knows what" panel in Settings — for each household member shows what Presence AI uses about them (location, face, calendar). Plain-language, non-mandatory. Mom (role: Guest) explicitly shows reduced signals to demonstrate the permissioning model.

### Decisions I deferred / explicitly out of scope

- **Q5: Suggest → Auto graduation toast (Day 7 celebration)** — out of scope. The Day 3-of-7 indicator already communicates the graduation arc.
- **Sheet account actions** ("Switch", "Manage Google Account", "Sign out") — left as visible-but-no-op. They're standard-pattern decoration; wiring them adds nothing demoable.
- **Profile sheet "Switch account" + "Invite household member"** — same. Out of scope.

---

## #8 — Connected device truth + scenario coherence pass

**Decision (2026-05-07):** Close the gap between AI narrative and device truth. The AI says "raised bedroom lights to 35%" but the device list still shows static mock data — Undo doesn't visibly walk anything back, manual control doesn't exist, Quick Controls are decorative. Make device state the single source of truth that the AI mutates, the user mutates, and Undo reverts. Add a full-screen Devices page with per-device detail view + "Set as default for current mode" CTA. Use the same pass to rebuild the 7:14 AM Sunday scene so it actually hangs together — including replacing the auto-played Hub Max briefing with an "indoor cam off · privacy mode" action that earns its slot.

### 8a. Device state lift — single source of truth

- Per-home `Record<deviceId, DeviceState>` lifted to `app/page.tsx`
- AI auto-actions are `DeviceAction` records carrying `before` + `after` so Undo can revert exactly
- Manual adjustment (Quick Controls + Devices page) writes directly to the same store
- Hero card auto-action list, Quick Controls, and Devices page all render from one source

### 8b. Full-screen Devices page (replaces DevicesSheet)

- **New Devices icon** on Home tab, top-right, level with the "Good morning" headline (sits below the profile circle in the global header). Glyph: `LayoutGrid` from lucide-react (2x2 grouped rectangles, Google-Home–style).
- **"All N devices →"** link at the bottom of Home routes to the same page.
- Page lists devices grouped by Lighting / Climate / Security / Speakers, live state.
- Tap a device → detail view with the right control widget per capability (brightness slider, temp slider, lock toggle, cam armed toggle, briefing tap-to-play).
- Detail view CTA: **"Set as default for [active state]"** — saves the user's current adjustment as the new auto-action target for the active state. Confirmation toast.

### 8c. 7-device cut for Beverly Hills (was 13)

| Device | Group | Capability |
|---|---|---|
| Bedroom lights | Lighting | brightness 0–100 |
| Kitchen lights | Lighting | brightness 0–100 |
| Main thermostat | Climate | temp |
| Front door lock | Security | lock toggle |
| Indoor Nest Cam | Security | armed toggle — "Off · privacy mode" by day, "Watching" at night |
| Nest Doorbell | Security | armed toggle (also doubles as outdoor cam, matches actual Nest line) |
| Kitchen Hub Max | Speakers | playing toggle ("Idle · briefing ready · tap to start") |

Tahoe trims to **5 devices**: cabin thermostat, front lock, indoor cam (vacation = always armed), Nest Doorbell (offline 3 hr), living room lights (scheduled 7–10 PM).

### 8d. Scenario coherence — Sunday May 5, 7:14 AM

- **Status bar reads 7:14 AM** on Home tab (was iOS-default 9:41).
- **Three Morning Wake auto-actions** (was four):
  - Raised bedroom lights to 35%
  - Thermostat → 71°F
  - **Indoor cam off · privacy mode** (replaces "Started morning briefing on Hub Max")
- The privacy-mode action faithfully realizes the existing Presence AI screen promise ("Cameras only run when you're away"). Asymmetric on purpose: the AI subtracts surveillance when you're up, not just adds comfort.

### 8e. "Heads up" replaces "Needs your attention"

Section renamed; previous anomaly set was incoherent for a 7:14 AM Sunday (garage open 22 min on a quiet morning, porch light still on after 13 hours, and a "mom's window via camera" item that read as creepy).

**Beverly Hills items:**
- **Doorbell · package delivered 6:32 AM** — action: "View clip" → dismisses on tap
- **Briefing ready on Hub Max** — action: "Tap to start" → mutates Hub Max state to "Playing briefing", dismisses

**Tahoe** keeps its existing two items (doorbell offline + lock battery) — coherent for vacation scenario, both *can't*-fix-remotely.

### 8f. Quick Controls become functional

- Tiles read live state from the device store
- Tapping a tile opens the corresponding device detail view (same surface as from the Devices page)
- Beverly Hills quick controls (4): thermostat, indoor cam, kitchen Hub Max, bedroom lights — most-recently-touched-by-AI

### Defaults taken without explicit confirmation (correctable)

- **Devices icon glyph:** `LayoutGrid` from lucide-react. Will swap to a custom SVG if it doesn't read as Google-Home enough.
- **"Set as default" UX:** confirmation toast, no separate modal.
- **Tab bar on Devices page:** stays visible, no tab marked active; back arrow returns to Home.
- **Status bar time on Tahoe:** unchanged; vacation scene doesn't need a precise wake time.
- **Quick-control selection rule:** most-recently-touched-by-AI (Q1c proposal `b`).

---

## #9 — Scenario simulator + onboarding cleanup

**Decision (2026-05-07):** Three changes in one pass — drop a half-built feature (the 48-hour learning window), fix two latent bugs in the Local-only toggle, and add a state simulator on the desktop intro side so a viewer can drive the phone into a second scenario without clicking around inside the mobile mock. The simulator is the headline change; the other two are cleanup blocking it.

### 9a. Strip the 48-hour learning window

The "Learning your home · Hour 12 of 48" banner replaced the hero card when the toggle was on, but it told the user nothing the rest of the app didn't already tell them — and the toggle was the wrong handle on the underlying idea (Suggest Mode already covers "watch and propose, don't act"). Removed:

- `learning` / `setLearning` state in `app/page.tsx`
- `learning` props through `HomeScreen` and `OnboardingScreen`
- The Learning banner block in `home.tsx` (was conditional on `learning`)
- The "48-hour learning-only window" `ToggleRow` in `onboarding.tsx`
- `learning` segment of the `AnimatePresence` key

### 9b. Local-only toggle fixes

Two bugs, one root cause and one geometry:

- **Phone-screen flash on toggle.** The `<motion.div>` wrapping the screen in `app/page.tsx` keyed on `screen + activeHomeId + mode + (learning ? "L" : "") + (localOnly ? "P" : "")`. Toggling `localOnly` changed the key, AnimatePresence treated it as a new screen, and the entire phone faded out and back in for what should have been an inline state change. Key now reads `screen + activeHomeId + mode + scenario` — `localOnly` is gone, scene-changing scenario is in.
- **White dot escaping the track.** The old `ToggleRow` used absolute positioning (`top-[3px]`, `x: 23 / 3`) which was geometrically borderline and could render the knob outside the track depending on box-sizing. Rebuilt as an `inline-flex` track with `p-[3px]` padding; the knob is `block h-[22px] w-[22px]` and travels `x: 0 → 20`, all inside the padded inner area. The padding bounds the knob on every side; it cannot escape.

### 9c. Scenario simulator on the intro page

Until now the prototype shipped one BH scenario (Sunday 7:14 AM Morning Wake). The phone home-switcher could swap to Tahoe, but a viewer couldn't see two BH states side-by-side — the most-impressive thing about Presence AI (it changes states automatically as the day evolves) was the thing the prototype demonstrated worst.

**Mechanic:** Two scenario cards in a "Try a scenario" cluster on the desktop left column, below the feature chips. Tapping a card pivots the phone to BH at that scenario. Cards show time + state name + one-liner blurb; the active card is highlighted with a "Viewing" badge.

**Phone-side changes per scenario:**

| | Morning Wake (default) | Last Person Left (new) |
|---|---|---|
| Time | 7:14 AM Sunday | 11:45 AM Sunday |
| Greeting | "Good morning, Herui" | "Have a good one, Herui" |
| Scene | Sunrise gradient + warm orb | Cool blue gradient + soft glow orb |
| Hero rationale | Motion + 9 AM standup + commute | Both phones left geofence within 2 min |
| Auto-actions | Lights → 35%, thermo → 71°F, indoor cam → privacy | Front door locked, thermo → 78°F eco, indoor cam armed |
| Heads up | Package delivered + briefing ready | Package arriving 12:30 PM (info) |
| Initial device state | Reflects Morning Wake "after" | Reflects Last Person Left "after" |

**Implementation:**

- `ScenarioId` union (`"morning-wake" | "last-person-left"`) added to `lib/data.ts`
- `dataForHome(homeId, scenarioId?)` extended; Tahoe ignores `scenarioId`
- New `beverlyHillsAwayState`, `beverlyHillsAwayInitialState`, `beverlyHillsAwayActions`, `beverlyHillsAwayHeadsUp`, `beverlyHillsAwayQuickControlIds`, `beverlyHillsAwayData`
- `HomeDataSet` gains `greeting: string` + `scene: "morning" | "away"` so the home screen reads its own visual treatment from data
- On scenario change, BH device state resets to that scenario's `initialDeviceState` (so Undo and Quick Controls are coherent with the visible "after" picture); Tahoe state never resets
- Scenario also feeds the AnimatePresence key, so a switch animates the phone screen in/out (sells the demo)

### Defaults taken without explicit confirmation (correctable)

- **Away greeting copy:** "Have a good one, Herui." Tested against "House is all set," "All locked up," "Take care" — picked the warmest, most consumer-Google.
- **Away scene visual:** cool blue radial gradient with a soft glow orb (no icon) instead of the morning sun. Reads as "secured / on autopilot." (User pulled the ShieldCheck badge mid-review — too literal; the gradient alone carries the mood.)
- **Heads up for Away:** single info-tone "Package arriving 12:30 PM" item. Two would have over-loaded the screen given the scenario is supposed to feel *settled*, not noisy.
- **Quick controls for Away:** thermostat, front lock, indoor cam, bedroom lights — same most-recently-touched-by-AI rule from #8f.
- **Scenario picker placement:** below feature chips, above link buttons, within the existing left-column max-w-sm rail. Two-up grid on `sm:` and above, single column on narrow.
- **Tahoe + scenario interaction:** clicking a scenario card from the Tahoe view auto-switches `activeHomeId` back to BH. Scenarios are BH-only.

---

## #10 — Repo aligned with Final Project rubric

**Decision (2026-05-07):** Bring the repo into 1:1 alignment with the Final Project (Prototype + PR-FAQs) submission requirements. The prototype was strong; the supporting documentation was either stale (README) or missing (PR-FAQ, eval summary, appendix). This pass closes those gaps so a grader landing on the GitHub repo finds every rubric item from the assignment in one place.

### 10a. README rewrite

Stripped references to features that were removed across #1–#9 (confidence percentages, the 90%/75% trust thresholds, the 48-hour learning toggle, "Hub briefing started" as Morning Wake's third action). Replaced the 5-bullet "What's testable" with the post-#9 surfaces: scenario picker, connected device truth, Suggest vs Auto, "Did we get this right?" loop, multi-home + privacy. Updated the repository tree, added a documents map, and rewrote Known Limitations to reflect current state (the "second home is cosmetic" line is no longer accurate after #7d). Added team-of-two byline (Herui Song + Ethan Duffy).

### 10b. New `EVAL.md` — rubric item #8

Distilled `Experimentation_Eval_Exercise_GoogleNest_v2.docx` into a repo-readable summary that explicitly cross-walks each eval-design choice to its prototype implementation. The doc is structured to mirror the original (Part I A/B experiment + Part II LLM eval) so a grader holding the source PDF can locate every section. Added a final table that calls out which eval concepts the prototype exercises vs. which remain on paper (eval set, Agent-as-a-Judge, weekly drift regression).

### 10c. New `PR_FAQ.md` — rubric item #6

Working-backwards launch document. **Press release** ≤1.5pp with two embedded customer/exec quotes per the assignment template. **8 External FAQs** scoped to what a real Nest customer would push back on (devices required, mistakes, privacy, iPhone, vs Routines, pricing). **14 Internal FAQs** carrying the heavy PM lift: RICE table, North Star Metric, full SMART criteria with launch + guardrail bars, growth lever, monetization defense, eng feasibility, three-layer privacy/consent model, Trust & Safety controls, iPhone strategy, Matter scope, cannibalization analysis, org dependencies, kill criteria.

### 10d. New `APPENDIX.md` — rubric "appendix 4–10pp"

Five sections:
1. **RICE prioritization** — three problem candidates (Presence AI, Matter reliability, Doorbell summarizer) with full math and "why each loses."
2. **UX Study Plan** — 10-interview recruiting target, full 30-min script, hypothesized findings → V1 changes table, validation thresholds. Marked **in progress** with a 2026-05-12 conduct date.
3. **Variance log** — 9-row table catalogging exactly where the prototype diverged from the strategy/breakdown/eval artifacts, with the AMENDMENTS pointer for each.
4. **Annotated screenshot reference** — 5-scene 2-minute Loom walkthrough script.
5. **Source materials & references** — paths to all earlier course artifacts and the external citations re-stated.

### Defaults taken without explicit confirmation (correctable)

- **Team byline:** Herui Song + Ethan Duffy, derived from the Strategy Case Exercise co-authorship. If the team for the Final Project is different, the bylines on README, PR_FAQ, APPENDIX need to be updated in three places.
- **UX study status as a TODO:** appendix lists the study as scheduled-not-conducted with a 2026-05-12 conduct date. If interviews aren't completed in time for the 2026-05-14 submission, the README's Known Limitations line will need to be promoted from "study pending" to "study not conducted; prototype is PM-led."
- **PR-FAQ pricing pin:** $15/mo Premium tier with $8/mo Basic, per the strategy doc citation. Will need a fact-check before submission since pricing is the kind of number a grader can verify.
- **External-FAQ count:** 8 (within the assignment's 7–10 range, picked the lower-middle to keep tightness).
- **Internal-FAQ count:** 14 (within the 10–20 range, biased high — RICE / SMART / kill criteria each earn their own slot rather than being smushed together).


