# HILTECH — AWARD CLOSURE MASTER CONTINUATION HANDOFF

**Date:** 2026-09-01  
**Repository:** `omarkhair-labs/hiltech-eg-website`  
**Current default branch:** `main`  
**Current main HEAD:** `8f9b245a5cb46ae37847e99567759bc935743fb3`  
**Live public target:** `https://hiltech-eg-website.vercel.app/`  
**Important:** `hiltech-eg.com` is the old Wix site for the same company. It is **not** the current creative HILTECH site and must not be treated as the production domain for this codebase unless a future explicit cutover is planned.

---

## 0. READ THIS FIRST — CURRENT TRUTH

This file is the continuation source of truth for the HILTECH award-closure phase.

Do **not** restart from research, redesign from scratch, or re-open already closed product/production issues without new evidence.

The current state is:

- Core public HILTECH creative redesign: **closed and in production**.
- Award Step 1 — site continuity / carry-content: **merged and closed**.
- Award Step 2 — route identity / hero differentiation: **merged, CI green, and production-ready/live**.
- Codex created a separate new step:
  - **PR #186 — “Award Step 3 — interaction with consequence”**
  - branch: `codex/award-step3-interaction`
  - head: `e324a0957bbdee8a1610c1045bf6c79721d26d4e`
  - state: **OPEN / NOT MERGED**
  - Vercel preview: **READY**
  - this is **NOT** the originally planned “Step 3 = Home compression”.
- Original planned Home compression remains **not done**.

For clarity going forward, use this naming:

1. **A1 — Continuity** ✅
2. **A2 — Route Identity** ✅
3. **A3 — Interaction With Consequence (Codex)** ⏳ open PR #186
4. **A4 — Home Compression / Pacing** ⏳ not started
5. **A5 — Original Visual Production** ⏳ external asset-production gap
6. **A6 — Performance / Mobile Benchmark Gate** ⏳ not completed with final Lighthouse/WebPageTest evidence

---

# 1. PRODUCT / CREATIVE THESIS

HILTECH is not being treated as “a nice network-company website”.

The product and creative model is:

> **Infrastructure Company × Technical Commerce**

Core public journey:

> **Home → Systems → Execution → Physical Library → Evidence → Company → RFQ**

Procurement journey:

> **SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ**

Creative thesis:

> **BUILD → ROUTE → TEST → PROVE**

Transformation:

> **CHAOS → STRUCTURE → FLOW → VERIFICATION → CERTAINTY**

Primary design statement:

> **Make the invisible infrastructure visible, then demonstrate its certainty.**

Personality:

- Precise
- Kinetic
- Engineered
- Assured

Rule:

> **HILTECH does not decorate technology. It visualizes engineering.**

Motion primitives:

- Pulse
- Trace
- Route
- Lock
- Scan
- Measure
- Assemble
- Split
- Reroute
- Verify

Motion story:

> **Starts as energy, ends as certainty.**

Green is semantic state, not generic neon decoration.

Avoid repeated card-wall rhythm. Prefer alternation between:

> cinematic field → technical document → spatial system → evidence → precision → quiet state

Evidence rule:

- Do not invent project metrics.
- Do not invent clients.
- Do not invent certifications.
- Do not invent partnerships.
- Do not invent named case studies.
- Catalog brand presence does not imply formal partnership.
- Generated visual concepts are illustrative, not evidence.
- Do not expose fake “Compare” capability without normalized data truth.

---

# 2. OPERATING WORKFLOW

Canonical creative/product workflow:

> **R0 Reality Audit → R1 Brief → R2 Research → R3 Reference Decomposition → R4 Identity Thesis → R5 IA → R6 Visual + Interaction Grammar → R7 Prototype → R8 Browser QA → R9 Production Integration → R10 Closure**

Lane loop:

> **Reality recheck → targeted reference recheck → lane thesis → implementation → browser QA → correction → closure**

Core law:

> **The workflow repeats. The answer must not.**

Source hierarchy:

1. Reality / business truth
2. Creative thesis
3. Research / reference principles
4. IA
5. Visual / type / motion / 3D grammar
6. Static AI concepts

Other laws:

- Code reproduces the creative system, not screenshots.
- Concept chooses the tool.
- No arbitrary ceiling on motion / WebGL.
- Make it as rich as the idea deserves, then engineer weight out.
- Motion explains state change, not decoration.
- Award-level does not mean WebGL everywhere.
- Visual plausibility is not evidence.
- Mobile is not desktop shrunk down.
- Utility surfaces should be quieter and faster.
- Static composition must survive reduced motion / no motion / weak WebGL.
- Browser QA is a design gate.
- Close only after proof.
- Do not copy references.

---

# 3. RESEARCH / REFERENCE SET — DO NOT RESTART FROM ZERO

Primary references already studied:

- NRG — Build Your Data Center
- HackFirst
- Shift5 / Non-Linear
- Integrated Reasoning
- PerimeterWatch
- Google Cloud Infrastructure / Hello Monday
- Effortel / Onion
- Crosswire / Unseen
- Kelvin Zero / Cuberto
- Q Industrial / Thirty7
- Ferrumpipe / Cuberto
- Intrepid Automation / REJOUICE
- Hyperframe / REJOUICE
- Moxion Power / REJOUICE

IA-only / technical organization references:

- Schneider
- DigiKey
- Mouser
- CommScope
- Panduit
- Cisco

Additional continuity / narrative references:

- MERSI
- Podium
- Garden Eight
- Cerebrium
- PX PUSH

Key research takeaways already absorbed:

- Google Cloud: route continuity and adaptive assets.
- Crosswire: WebGL only when conceptually meaningful.
- Integrated Reasoning: visual language derived from internals.
- Kelvin Zero: progressive reveal and product information.
- Ferrumpipe: physical-product cinematic catalog.
- Moxion: hardware-led hero.
- Hyperframe: simplify product-system storytelling.
- Cerebrium: behavior communicates infrastructure.
- MERSI / Podium / Garden Eight: continuity and flexible narrative composition.

Do not “research award websites from scratch” unless a new gap genuinely needs new references.

---

# 4. CORE PUBLIC ROUTES / CURRENT PRODUCT MODEL

Main public creative routes:

- `/`
- `/solutions`
- `/solutions/[slug]`
- `/services`
- `/products-partners`
- `/products-partners/[slug]`
- Product Intelligence routes
- `/work`
- `/company`
- `/rfq`
- `/contact`
- utility/search/track surfaces

Product thesis:

> **HILTECH Products = an explorable physical infrastructure library + procurement system.**

Product path:

> **SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ**

Product Detail:

> **OBJECT → SYSTEM POSITION → DECISION LEDGER → ADJACENT REFERENCES → RFQ**

Closure statement:

> **THE REFERENCE IS NOT THE QUOTE.**

Product Intelligence slugs:

- `fiber-optic-systems`
- `copper-cat6-cabling`
- `patch-cords-connectivity`
- `faceplates-keystone-rj45`
- `cabinets-racks-pdu`
- `cable-management-duct-systems`
- `cctv-security`

---

# 5. PRE-AWARD CLOSURE — IMPORTANT CLOSED FIXES

These are already solved and should not be re-opened casually.

## Mobile H07 product switching
Issue:
- category selector was too far below the active product media on mobile.

Fix:
- selector structurally moved adjacent to media.
- mobile rail became horizontal swipe.
- media → category rail → specs order.
- scroll snap.
- scrollbar hidden.
- QA added.

## Solutions mobile inspector
Issue:
- active solution changed while scrolling but visual inspector left viewport.

Fix:
- inspector has `data-active-solution`.
- sticky compact mobile inspector.
- active visual remains visible while rows change.

## Company mobile operating map
Issue:
- map sometimes stayed hidden until user scrolled deep and returned upward.

Fix:
- map stage no longer depends on generic hidden reveal state.
- visible-by-default fallback.
- viewport-entry animation only.
- mobile trigger earlier.
- ScrollTrigger refresh after frame/fonts.
- QA now tests normal downward scroll only.
- production fix commit in history:
  `0a2a07bd — fix(company): make mobile operating map reveal fail-safe`

## Product Quick Entry focus
Issue:
- “I KNOW THE REFERENCE” moved to Exact Finding but search input did not receive focus.

Fix:
- input explicitly became `type="search"`.
- focused interaction now covered.

## Vercel Git integration
Old problem:
- Vercel backend was still bound to old repo owner `omarkhair70-droid` after repo transfer.

Resolved:
- project was explicitly reconnected to:
  `omarkhair-labs/hiltech-eg-website`
- automatic Git deploys work again.

## Canonical / old Wix domain
Old issue:
- canonical / OG URLs still pointed to old Wix domain `www.hiltech-eg.com`.

Resolved:
- current canonical uses:
  `https://hiltech-eg-website.vercel.app`
- obsolete Wix redirect removed from current creative app configuration.

## Supabase
Project:
- `hiltech-eg-rfq`
- ref: `cajakyginlinenpuvgjm`

It had been inactive and missing applied schema.

Resolved previously:
- restored Supabase project.
- applied schema migrations.
- current public product source synchronized to **48 active references** instead of stale 38-item seed.
- RFQ/admin schema restored.
- sensitive tables have no direct `anon` / `authenticated` grants.
- trigger search paths hardened.
- project became `ACTIVE_HEALTHY`.
- runtime error logs were clean after recovery.

Do not replace this with the stale 38-product seed.

---

# 6. A1 — SITE CONTINUITY / CARRY-CONTENT ✅ CLOSED

Branch:

`award/continuity-step1`

PR:

**#184 — Award Step 1 — site continuity and carry-content routing**

Merged into main.

Merge commit:

`4f0f77f3809d7b38fd87316b90c5f0c3a6c9d4c9`

## What A1 added

### Global creative navigation continuity
Primary navigation now has a lightweight persistent physical-route trace instead of a hard cut.

This is intentionally **not** a giant transition on every link.

Utility routes remain fast / quieter.

### Solutions → Solution Detail carry
The system diagram / route is carried through the transition into the solution detail.

### Home Evidence → Work carry
Evidence image carries from Home into the Work archive.

### Product → Detail
Existing Product Reference → Product Detail authored transition remains independent and preserved.

### Reduced motion
Reduced-motion users get direct navigation without continuity overlay.

## QA / infrastructure changes from A1

- Desktop continuity QA.
- Mobile continuity QA.
- Reduced-motion direct navigation QA.
- Carry screenshots.
- Source ghosting fixed after visual review.
- English synthesis was separated into a dedicated CI job because one giant sequential CI job repeatedly hit the 20-minute ceiling.
- Product Detail synthesis screenshot was bounded to avoid Chromium full-page hang.

Step 1 reached full green before merge.

---

# 7. A2 — ROUTE IDENTITY / HERO DIFFERENTIATION ✅ CLOSED

Branch:

`award/route-identity-step2`

PR:

**#185 — Award Step 2 — route identity and opening composition**

PR state:

**MERGED**

PR head:

`e07d207635bf60cefddcc357cd1beb8f256b3e8a`

Merge commit:

`af25ca1f35fe4ff50c9711b847040dd2bfa5b1e7`

Main later received release commit:

`8f9b245a5cb46ae37847e99567759bc935743fb3 — chore(release): publish award step 2`

## A2 thesis

> **ONE WORLD — DIFFERENT ROOMS**

Each major route should feel like the same HILTECH universe but should not open with the same template grammar.

Current route identities:

- **Solutions = SYSTEM / PATH**
- **Services = FIELD / EXECUTION**
- **Products = OBJECT / INTENT**
- **Work = EVIDENCE / ARCHIVE**
- **Company = OPERATING MAP**
- **RFQ = REQUEST STATE**
- **Contact = DIRECT ENDPOINT**

## What A2 changed

### Solutions
- Opening became system/path-led.
- Route map promoted into the opening.
- Hero is no longer headline-first template repetition.

### Services
- Field media promoted relative to headline.
- Execution image carries more visual weight.

### Products
- Generic metrics panel replaced by physical object/reference dock.
- Object / reference / family / project-fit logic is visually explicit.

### Work
- Contact sheet / evidence archive dominates opening more than headline.

### Company
- Operating map is promoted as primary opening identity.

### RFQ
- Live request state is promoted above generic campaign-style hero behavior.

### Contact
- Shorter, more direct opening.
- Two direct paths are the point, not spectacle.

### Typography
- Reduced meaningless outline-display repetition inside route openings.
- Outline is no longer a default decorative answer everywhere.

## A2 QA

Dedicated script:

`scripts/capture-route-identity-qa.mjs`

Gate covers:

- 7 routes.
- Desktop 1440×1000.
- Mobile 390×844.
- Reduced motion.
- horizontal overflow.
- visual anchor size.
- mobile visual-entry timing.
- desktop visual anchor dominance over title area.

A2 CI:

**Creative Public CI #244 — SUCCESS**

Vercel production currently points to the A2 runtime commit:

`e07d207635bf60cefddcc357cd1beb8f256b3e8a`

Production deployment state:

**READY**

---

# 8. CURRENT MAIN / PRODUCTION STATE

Current main HEAD:

`8f9b245a5cb46ae37847e99567759bc935743fb3`

Message:

`chore(release): publish award step 2`

Current production runtime deployment is based on:

`e07d207635bf60cefddcc357cd1beb8f256b3e8a`

Branch at deployment:

`award/route-identity-step2`

State:

**READY / production**

This is expected because the later main release commit does not materially replace the already-promoted A2 runtime.

Current public URL:

`https://hiltech-eg-website.vercel.app/`

Again:

**Do not treat `hiltech-eg.com` as this site. It is the old Wix site.**

---

# 9. CODEX A3 — “INTERACTION WITH CONSEQUENCE” ⏳ OPEN / NOT ACCEPTED YET

Codex independently created a third award step that is **different from the originally planned Home compression**.

Branch:

`codex/award-step3-interaction`

PR:

**#186 — Award Step 3 — interaction with consequence**

Head:

`e324a0957bbdee8a1610c1045bf6c79721d26d4e`

Base:

current A2 release main:
`8f9b245a5cb46ae37847e99567759bc935743fb3`

PR status:

- open
- mergeable
- **not merged**
- one commit ahead of main
- 10 changed files
- +802 / -90 at inspection time

Vercel preview:

- state: **READY**
- not production

Creative Public CI on this branch:

- workflow run #245 was **SKIPPED** because the branch name is `codex/...` and the current CI condition runs creative QA automatically for the original redesign branch and `award/*` branches.
- therefore do **not** treat the skipped workflow as validation.
- Codex PR body reports its own local validation, but the next chat should independently run/review the canonical CI / browser QA before merge.

## Codex A3 stated scope

From PR #186:

- makes Solutions hero map directly interactive and carries selected system into detail.
- extends route continuity to primary navigation, mobile navigation, RFQ, and project entry points.
- turns Product Dock, Work evidence, Company operating map, and RFQ live state into meaningful stateful controls.
- adds URL-backed Work evidence selection and previous/next navigation.
- expands desktop/mobile/reduced-motion browser smoke coverage.

Changed files:

- `app/globals.css`
- `app/products-partners/page.tsx`
- `app/rfq/rfq-review-client.tsx`
- `components/Header.tsx`
- `components/RouteContinuity.tsx`
- `components/company/CompanyExperience.tsx`
- `components/solutions/SolutionsIndexExperience.tsx`
- `components/work/WorkEvidenceExperience.tsx`
- `lib/route-continuity.ts`
- `scripts/capture-closed-public-smoke.mjs`

## IMPORTANT interpretation

This Codex step is **not automatically approved just because it exists**.

The intended next action is:

1. inspect PR #186 implementation carefully.
2. inspect preview visually on desktop + mobile.
3. ensure it improves A1/A2 instead of overloading interaction.
4. ensure utilities remain fast.
5. ensure it does not make every surface clickable just for novelty.
6. run canonical creative CI on this branch (either extend branch condition or create an `award/*` review branch).
7. only merge if visual + interaction evidence is better than A2 production.

If accepted, A3 becomes part of award closure.

If rejected, close PR #186 and continue from main A2.

---

# 10. ORIGINAL AWARD GAP / WHAT REMAINS AFTER A1 + A2

The original external-style SOTD gap diagnosis was roughly:

1. mobile typography / focus
2. repeated heroes
3. two authored cross-route transitions
4. Home pacing / compression
5. original visual production
6. performance benchmark

Current truth after the work:

## Already materially solved

- Product Quick Entry focus ✅
- major mobile shell / interaction issues ✅
- hero repetition / route identity ✅ A2
- authored continuity / carry transitions ✅ A1
- Company mobile reveal ✅
- Solutions mobile inspector ✅
- H07 mobile product switching ✅
- production parity / canonical / Git integration ✅
- backend / Supabase runtime recovery ✅

## Still real award gaps

### A4 — Home compression / pacing
This remains a real gap.

The Home page is still very long and chapter-dense.

Goal is **not** to redesign Home.

Goal:

- reduce repetition.
- compress repeated thesis text.
- remove or merge secondary proof.
- shorten sections that do not need 100vh-scale presence.
- vary tempo so every chapter does not start like a new campaign hero.
- preserve H04 / H06 / H08 / H10 strength while reducing fatigue.
- target roughly ~15–20% journey compression if supported by visual review, not a blind numeric trim.

### A5 — Original visual production
This is not code-only.

The site would benefit from one intentional HILTECH visual production session:

- macro fiber termination.
- rack choreography.
- cable routing.
- OTDR / Fluke testing.
- handover documents.
- technician movement.
- real technical rooms / corridors.
- field process moments.

Do not fake this with invented case-study claims.

AI-generated visual concepts may support direction, but real evidence is more valuable.

### A6 — Performance / mobile benchmark
Current build / runtime / browser QA is strong, but award-level performance should be proven with dedicated current metrics.

Need final evidence such as:

- Lighthouse mobile.
- Core Web Vitals.
- LCP.
- CLS.
- INP.
- JS transfer / execution cost.
- image weight.
- Three.js / WebGL cost.
- mid-range device simulation.
- constrained network profile / 3G-like conditions where useful.

Do not claim Developer-Award-level performance without measured evidence.

### Maintenance debt
`app/globals.css` remains very large.

This is not a direct SOTD blocker, but after visual closure it should eventually be split by domain:

- shell/shared
- Home
- Solutions
- Services
- Products
- Work
- Company
- RFQ / Contact
- shared motion tokens

Do not refactor it before visual closure merely for cleanliness if that risks regressions.

---

# 11. QA / CI ARCHITECTURE

Workflow:

`.github/workflows/creative-home-ci.yml`

Runner:

`blacksmith-4vcpu-ubuntu-2404`

Important CI change:
- English creative synthesis is now its own job.
- main regression / lane QA is another job.
- this avoids the old single-job 20-minute cancellation.

Important QA scripts include:

- `scripts/capture-closed-public-smoke.mjs`
- `scripts/capture-work-qa.mjs`
- `scripts/capture-company-qa.mjs`
- `scripts/capture-rfq-contact-qa.mjs`
- `scripts/capture-public-utility-qa.mjs`
- `scripts/capture-product-rnd-qa.mjs`
- `scripts/capture-creative-synthesis-qa.mjs`
- `scripts/capture-route-identity-qa.mjs`

Do not replace browser QA with static code inspection.

The visual gate remains:

> implementation → browser run → screenshots → visual inspection → correction → merge

---

# 12. EXISTING WHOLE-SITE QA COVERAGE

Core routes:

- `/`
- `/solutions`
- `/services`
- `/products-partners`
- `/work`
- `/company`
- `/rfq`
- `/contact`

Deep checks also cover:

- Solution details.
- Product Intelligence routes.
- Product Details.
- reduced motion.
- mobile menu.
- overflow.
- image loading.
- route-specific interaction.
- continuity/carry.
- route identity.
- utility/search.

Standard viewport families include:

- Desktop around 1440×1000.
- Mobile around 390×844.
- final mobile coverage includes 360 / 390 / 430 classes.

---

# 13. STEP 2 VISUAL IDENTITY TARGET — DO NOT REGRESS

The following differentiation is intentional and should survive future work:

## Home
**THESIS / MASTER WORLD**

Home remains the canonical benchmark and should not be flattened to match utility routes.

## Solutions
**SYSTEM / PATH**

Map / route / topology is the opening identity.

## Services
**FIELD / EXECUTION**

Field image / execution process leads.

## Products
**OBJECT / INTENT**

Physical object/reference dock + entry intent leads.

## Work
**EVIDENCE / ARCHIVE**

Evidence imagery / contact sheet leads.

## Company
**OPERATING MAP**

Operating map is part of the identity, not a hidden secondary diagram.

## RFQ
**REQUEST STATE**

State / references / units / review logic lead.

## Contact
**DIRECT ENDPOINT**

Shortest path, minimal spectacle.

Do not let a future polish pass collapse these back into:

> black background + giant solid title + giant outline title + paragraph + green line

That repetition was one of the main award-gap findings.

---

# 14. IMPORTANT DESIGN JUDGMENT FOR INTERACTION

A1 introduced continuity carefully.

A3 should follow this rule:

> **Global transitions may be light. Carry-content should only happen when a real semantic object can travel.**

Do not add cinematic transition to every utility action.

Good carry examples:

- Product Reference → Product Detail.
- Solution System → Solution Detail.
- Home Evidence → Work archive.

Potentially good stateful interaction:
- Company map if states clarify operating logic.
- Product dock if it genuinely chooses an entry mode.
- Work archive if URL state is useful and shareable.

Bad interaction:
- clickability with no consequence.
- gratuitous cursor effects.
- generic overlay on every link.
- nav latency that makes the site feel slower.
- scroll hijacking.
- mobile-specific interaction that fights native scroll.

---

# 15. LIVE / DEPLOYMENT FACTS

Vercel project:

`hiltech-eg-website`

Project ID:

`prj_yzLRCqAVMnTG2v4o9FAJ9kEIZyYa`

Team:

`team_yldGt68LygoeKjcxVBQMPE6H`

Current public URL:

`https://hiltech-eg-website.vercel.app/`

Current production runtime:

- commit: `e07d207635bf60cefddcc357cd1beb8f256b3e8a`
- Step 2
- state: READY

Codex A3 preview:

- commit: `e324a0957bbdee8a1610c1045bf6c79721d26d4e`
- preview state: READY
- **not production**

---

# 16. NEXT CHAT — EXACT FIRST ACTIONS

The next chat should **not** ask the user to explain this project again.

Start with this file and perform these actions:

## First: Review Codex PR #186
- inspect changed files.
- compare against current main A2.
- inspect preview visually.
- run canonical creative CI on A3.
- verify Desktop / Mobile / Reduced Motion.
- verify A1 continuity did not become overcomplicated.
- verify A2 route identities remain distinct.
- inspect Work URL state.
- inspect Solutions interactive map.
- inspect Product Dock consequence.
- inspect Company map consequence.
- inspect RFQ state interactions.
- inspect navigation latency.

Decision gate:

> **Does A3 make the site more authored and understandable, or merely more interactive?**

Merge only if the former.

## Second: If A3 is accepted
Merge PR #186 to main and promote/verify production.

Then continue with:

### A4 — Home Compression / Pacing

Do not call A4 “Step 3” in the new chat because Codex already used Step 3 for interaction.

## Third: A5
Plan original visual production.

## Fourth: A6
Final performance/mobile benchmark.

Then do final award submission preparation.

---

# 17. FINAL AWARD POSITION AT THIS HANDOFF

HILTECH is no longer merely “a strong corporate site”.

It already has:

- coherent creative thesis.
- route-specific visual grammar.
- authored continuity.
- Product / RFQ product depth.
- real backend persistence.
- evidence discipline.
- selective motion / WebGL.
- mobile-specific QA.
- reduced-motion support.
- route identity.
- browser QA infrastructure.
- production deployment.

The remaining work is refinement at the level of:

- interaction consequence,
- pacing,
- original visual evidence,
- measured performance.

The site is already a credible award candidate.

Do not promise SOTD.

Do not reduce the work to “add more effects”.

The remaining target is:

> **Make the experience feel authored enough that the jury remembers the logic of HILTECH after closing the tab.**

---

# 18. IMPORTANT FILES TO READ BEFORE IMPLEMENTING MORE

Start with:

- `docs/HILTECH_AWARD_CLOSURE_MASTER_HANDOFF_2026-09-01.md` — this file
- `docs/HILTECH_FINAL_MASTER_CONTINUATION_HANDOFF_2026-08-31.md`
- `docs/HILTECH_CREATIVE_SYSTEM_INDEX.md`
- `docs/HILTECH_REFERENCE_RESEARCH.md`
- `docs/HILTECH_FULL_SITE_CREATIVE_PRODUCT_AUDIT_2026-09-01.md`
- `docs/HILTECH_ENGLISH_CREATIVE_SYNTHESIS_AUDIT_2026-08-31.md`
- `docs/HILTECH_REFERENCE_RECHECK_VISUAL_PRODUCT_IA_2026-08-31.md`
- `docs/HILTECH_VISUAL_EXPERIENCE_RND_2026-08-31.md`
- `docs/HILTECH_PRODUCTION_ARCHITECTURE.md`
- `docs/HILTECH_EVIDENCE_GATE.md`

Then inspect:

- PR #186
- `components/RouteContinuity.tsx`
- `lib/route-continuity.ts`
- `components/solutions/SolutionsIndexExperience.tsx`
- `components/work/WorkEvidenceExperience.tsx`
- `components/company/CompanyExperience.tsx`
- `app/products-partners/page.tsx`
- `app/rfq/rfq-review-client.tsx`
- `app/globals.css`

---

# 19. ONE-LINE CONTINUATION PROMPT FOR A NEW CHAT

Use this exact instruction if needed:

> Read `docs/HILTECH_AWARD_CLOSURE_MASTER_HANDOFF_2026-09-01.md` from `omarkhair-labs/hiltech-eg-website`, verify current main/production/PR #186, then continue HILTECH Award Closure from A3 without restarting research or re-opening closed A1/A2 work. Review Codex PR #186 visually and technically before deciding whether to merge it; after that continue A4 Home Compression.

---

**END OF HANDOFF**
