# WIP — Open items before Final Project submission

> Running to-do list for the **2026-05-14 Final Project** submission. Updated 2026-05-07.
> Live URL must remain reachable through 2026-05-25 for grading.

Submission method: a single Google Form. Section 1 fields → demo gallery sheet. Section 2 fields → BruinLearn.

---

## Critical path — must finish before 2026-05-14

### 1. Record the 2-min Loom walkthrough *(rubric §1 #2)*

- [ ] Open the live URL: https://nest-presence-ai-app.vercel.app
- [ ] Follow the 5-scene script in [`APPENDIX.md`](./APPENDIX.md) §4 (intro picker → Morning Wake hero + Undo → Devices page → Last Person Left scenario → Settings privacy panel).
- [ ] Keep total ≤2:00; aim for 1:50 with breathing room.
- [ ] Upload to Loom; copy the share link into the Google Form.

**Owner:** Herui. **Blocker for submission.**

### 2. Run 8–12 UX interviews *(assignment rubric — UX study)*

- [ ] Recruit per [`APPENDIX.md`](./APPENDIX.md) §2.1 (target n=10 across 5 sub-segments).
- [ ] Schedule for **week of 2026-05-12**.
- [ ] Run sessions using the 30-min script in §2.2.
- [ ] Replace `APPENDIX.md` §2 "in progress" content with findings + direct quotes.
- [ ] If <8 interviews complete by 2026-05-13: edit README "Known limitations" from *"study pending"* to *"study not conducted; prototype is PM-led, not user-validated"* — don't fake it.

**Owner:** Herui + Ethan. **Hard requirement of the assignment.**

### 3. Fact-check pricing before PR-FAQ submission

- [ ] Verify **$15/mo Premium** and **$8/mo Basic** are accurate as of submission date (Google Store, Q1 2026 pricing page).
- [ ] If Google has changed tier pricing since the strategy-doc citation, update PR_FAQ §press-release + Internal FAQ #6 + External FAQ #8.

**Owner:** either. **30-second check.** Source: store.google.com/us/category/nest-aware.

### 4. Confirm team byline across three files

I used **Herui Song + Ethan Duffy** from the Strategy Case Exercise co-authorship. If the Final Project team is different (more or fewer members):

- [ ] Update bylines in: [`README.md`](./README.md), [`PR_FAQ.md`](./PR_FAQ.md), [`APPENDIX.md`](./APPENDIX.md), and the *footer* of `README.md`.
- [ ] If the team is different, also update Section 1 #3 (one-liner) framing accordingly.

**Owner:** Herui (call with team). **15-minute fix.**

---

## Flags to resolve — content judgment, not mechanics

### 5. Press-release customer quote is illustrative

- [ ] PR_FAQ press release contains a "Sarah K., Beverly Hills, CA" quote. **It is not a real beta participant.**
- [ ] Options: (a) replace with a real quote from interview #2 once UX interviews run, (b) replace with a composite quote and footnote it as illustrative, (c) remove and rely on the Rishi Chandra exec quote alone.
- [ ] Recommended: (a) if interviews land in time, otherwise (b) with a small italic footnote: *"Composite quote drawn from Strategy-Case research; final PR would carry a real beta participant."*

**Owner:** Herui. **Standard PR-FAQ practice but graders may flag.**

### 6. Confirm V1.1 problem framing matches what the team converged on

The PR-FAQ and APPENDIX assume the **Strategy Case problem statement**:
- *Target user:* Nest Aware subscribers with 3+ devices who never set up Routines
- *Problem:* Google Home app's automation surface is too complex; the "intelligent home" promise goes unrealized
- *Solution category:* proactive ambient automation (the home that acts before you ask)

If your team has converged on a *different* problem since Assignment #2:

- [ ] PR_FAQ press release + External FAQ #1 + Internal FAQ #1 (RICE) need a rewrite, not an edit.
- [ ] APPENDIX §1 RICE table needs the alternatives swapped.
- [ ] Variance log entries in APPENDIX §3 may no longer apply.

**Owner:** team alignment call. **If misaligned, this is a half-day rewrite.**

---

## Nice-to-have — only if time permits

### 7. Replace "Sarah K." with a real beta-style quote

(Subset of #5 — listed separately because it's the most tangible polish.)

### 8. Static-image fallback for Loom

Loom links sometimes fail in submission portals. A 5-screenshot PDF following the same Loom script would be a belt-and-suspenders backup.

- [ ] Capture: intro page (with scenario picker visible) → BH Morning Wake home → Devices detail → BH Last Person Left home → Settings (privacy panel).
- [ ] Bundle as `submission_screenshots.pdf` in repo.

### 9. Annotate one heads-up on the Vercel deployment

Optional QA: in production, verify the indoor-cam-off auto-action and the package-arriving heads-up actually render on a fresh load. Sometimes Turbopack and Vercel Edge cache differ.

---

## Submission checklist (Google Form mapping)

### Section 1 — Demo Gallery (shared sheet)

| Field | Source | Status |
|---|---|---|
| 1. Live Product URL | https://nest-presence-ai-app.vercel.app | ✅ live |
| 2. 2-min Loom walkthrough | from item #1 above | ⏳ TODO |
| 3. One-liner | [`README.md`](./README.md) §One-liner | ✅ |
| 4. Key features to test (3–5 bullets) | [`README.md`](./README.md) §What's testable | ✅ (6 bullets — pick 5 if form caps) |

### Section 2 — Grading materials (BruinLearn)

| Field | Source | Status |
|---|---|---|
| 5. GitHub Repo + README | https://github.com/heruis/nest-presence-ai-app | ✅ |
| 6. PR-FAQ | [`PR_FAQ.md`](./PR_FAQ.md) — also export to PDF for the form | ✅ written; ⏳ export PDF |
| 7. Source of Truth MD | [`PROMPT.md`](./PROMPT.md) | ✅ |
| 8. Eval set summary | [`EVAL.md`](./EVAL.md) — also Google-Doc-able if form requires | ✅ written |
| 9. Known limitations | [`README.md`](./README.md) §Known limitations | ✅ |

---

## Handoff notes for next session

If you (or future-Claude) pick this back up:

1. **Read this file first.** Critical path is items 1–4. Everything else is optional polish.
2. **Latest commit at last save:** `82ef36b` (Apply amendment #10 — align repo with Final Project rubric).
3. **Most-recent pass touched:** README, PR_FAQ, EVAL, APPENDIX, AMENDMENTS. Source code untouched since `12bba27` (amendment #9 — scenario simulator).
4. **Where each rubric item lives:** see Submission checklist above.
5. **Don't write more code unless the assignment changes.** The prototype is feature-complete for V1.1; remaining work is documentation, recording, and interviews.
