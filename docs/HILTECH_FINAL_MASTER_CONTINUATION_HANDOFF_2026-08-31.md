# HILTECH — FINAL MASTER CONTINUATION HANDOFF

**READ THIS FIRST IN THE NEXT CHAT.**

Status: **ACTIVE / FINAL PUBLIC-SITE CLOSURE — DO NOT MERGE YET**  
Handoff timestamp: **2026-08-31 23:11 Africa/Cairo**  
Repository: \`omarkhair70-droid/hiltech-eg-website\`  
Branch: \`redesign/creative-system-20260831\`  
PR: **#183 — WIP / DO NOT MERGE**  
PR base: \`main\`  
Implementation HEAD immediately before this handoff documentation:  
\`56ef8f1d4d2cc899a9933f88e8d8c140d599701b\`

> Important: this file itself is committed after the implementation HEAD above. Re-verify the current branch HEAD before doing any implementation work.

This is the authoritative continuation file for the next chat. It supersedes the old continuation state in \`HILTECH_MASTER_HANDOFF_2026-08-31.md\` where that older file is stale.

---

# 0. ONE-SENTENCE MISSION

Finish HILTECH as one coherent, production-ready English public site on desktop and mobile, remove every remaining legacy visual/system surface, perform real browser/image QA, compare the whole result against the original + new reference research, test only justified stronger visual/interaction R&D, and prepare PR #183 for merge **only after the complete public-site closure genuinely passes**.

Do not restart from zero.

Do not treat “build green” as visual closure.

Do not ask the user to repeat the project history.

---

# 1. CURRENT TRUTH — START HERE

The project has moved far beyond the stale PR body.

The PR body still says H04-H12 are not closed. That is outdated.

Current actual state is much later:

- Home — CLOSED
- Solutions — CLOSED
- Services / Capabilities — CLOSED
- Products — CLOSED as a production lane, then rechecked deeply
- Work / Evidence — CLOSED
- Company — CLOSED
- RFQ / Contact — CLOSED, then RFQ interaction placement was refined again
- cross-lane creative synthesis — performed
- Footer — legacy footer removed from current English creative surfaces
- Header — current engineered creative shell
- mobile QA — expanded to 360 / 390 / 430 and deep routes
- Product hierarchy / IA — re-researched in 2026 and documented
- stronger visual-experience R&D — researched and documented
- final forgotten-public-surface sweep — in progress and largely implemented
- current blocker — **latest CI fails in the new public utility/Search QA at mobile navigation validation**

Do not merge PR #183 yet.

---

# 2. CURRENT CI BLOCKER — EXACTLY WHERE TO CONTINUE

Latest implementation HEAD before this handoff:

\`56ef8f1d4d2cc899a9933f88e8d8c140d599701b\`

Latest workflow for that implementation:

- Workflow: **Creative Public CI**
- Run ID: \`33431292227\`
- Run number: **#198**
- Result: **FAILURE**

What passed in #198:

- Build ✅
- closed public regression smoke ✅
- Work visual/interaction QA ✅
- Company visual/interaction QA ✅
- RFQ/Contact visual/interaction QA ✅

What failed:

- **Capture public utility and Search QA ❌**

Exact failure:

\`Error: mobile creative navigation missing primary route: Solutions\`

Failure came from:

\`scripts/capture-public-utility-qa.mjs\`

around the mobile creative navigation assertion.

Because that step failed:

- English creative synthesis QA was skipped
- artifacts after that point were skipped

### Immediate next action

1. Re-verify branch HEAD and latest workflow after this docs commit.
2. Inspect current \`components/Header.tsx\` mobile menu and \`scripts/capture-public-utility-qa.mjs\`.
3. Determine whether the failure is:
   - a real mobile nav regression, OR
   - a stale/incorrect selector/assertion caused by the newest nav hierarchy.
4. Fix the **real** problem only.
5. Rerun Creative Public CI.
6. Do not stop at green:
   - download/review utility + Search screenshots,
   - review desktop and mobile full-page results,
   - then rerun/inspect English creative synthesis.

This is the exact continuation point.

---

# 3. LAST KNOWN GREEN BEFORE THE FINAL PUBLIC-SURFACE SWEEP

Before the final forgotten-surface redesign, the deep mobile / creative synthesis pass did reach green.

Relevant previous run:

- Creative Public CI run ID: \`33428239370\`
- Result: **SUCCESS**
- Build / regression / Work / Company / RFQ-Contact / English creative synthesis all passed.

That green state was before the latest large sweep covering Search + utility routes + final navigation alignment.

Therefore:

> Do not use that earlier green run as proof that the current HEAD is closed.

---

# 4. WHY THE FINAL SWEEP REOPENED THE SITE

The user manually opened the new Company / RFQ experience and spotted two important problems:

## A. Search was completely legacy

The old Search modal was visibly from the previous website:

- white rounded modal
- rounded cards
- pills
- slate UI
- orange focus language
- generic search-result cards

It looked unrelated to:
- Company
- Home
- Products
- Work
- the new creative shell

This was correctly treated as a **real closure gap**, not a minor cosmetic detail.

## B. RFQ submit placement felt wrong

The user showed the Project Sheet / RFQ form and asked about the actual Send / Submit action underneath.

The primary submission action existed, but the interaction hierarchy made it feel too disconnected from the form.

That was reopened so the primary submit action sits directly under the project form / project sheet.

## C. Forgotten public routes still contained the old visual system

A repo-wide public route audit exposed legacy UI in routes that were not part of the first major creative lanes:

- \`/about\`
- \`/resources\`
- \`/resources/company-profile\`
- \`/resources/rfq-guide\`
- \`/resources/launch-copy\`
- \`/resources/one-pagers/[slug]\`
- \`/track\`
- \`/scope-finder\`
- \`/privacy-policy\`
- \`/accessibility-statement\`

Legacy patterns included:

- navy / slate / orange
- rounded cards
- glass / gradient cards
- old buttons
- generic utility dashboards
- old corporate resource styling

The user explicitly asked:

> close HILTECH to the end — mobile, desktop, anything old, forgotten, or missed.

That is now the operating mission.

---

# 5. FINAL PUBLIC-SURFACE SWEEP — WHAT HAS ALREADY BEEN IMPLEMENTED

Recent commits on the branch, newest first:

\`\`\`
56ef8f1d  chore(public): remove obsolete legacy contact RFQ surface
a47489e3  fix(search): portal command surface above sticky shell
6ee1f002  test(nav): lock mobile creative route hierarchy in final sweep
391ad63b  refactor(nav): align desktop and mobile creative route hierarchy
b6786cc2  test(rfq): lock primary submit action directly under project form
61f6384f  ci: cover Search and forgotten public utility routes
23455526  test(public): add final Search and utility-route visual QA
98db9e5d  refactor(search): align search index with current public architecture
b57d74e0  refactor(legal): move Accessibility into quiet engineering layout
ed07c92f  refactor(legal): move Privacy into quiet engineering layout
b248ac50  style(resources): add flat communication copy archive
83f12e45  refactor(resources): turn communication templates into flat copy archive
473029ac  refactor(resources): rebuild solution one-pagers as scope ledgers
626dc75b  refactor(resources): rebuild RFQ guide as request-input ledger
29387173  refactor(resources): turn Company Profile into engineering ledger
c2cfb68f  style(scope): build flat technical scope sequence
0c80c86a  refactor(scope): replace legacy wizard cards with scope sequence
b9a89a6a  refactor(scope): move Scope Finder into public utility system
7cf0ee69  refactor(track): replace legacy cards with request-state ledger
a6718660  refactor(track): move RFQ tracking into utility system
e7e9ce5f  refactor(resources): replace legacy card hub with project intelligence index
20846fe8  style(public): add unified utility route visual system
1ae49757  refactor(company): retire legacy About route into canonical Company
9ded18fb  style(rfq): attach submission action to project sheet
04f20281  refactor(rfq): put primary submit action directly under project form
9aa955de  style(search): build full-screen HILTECH search command surface
ce6960e1  refactor(search): replace legacy modal with engineering search index
c7cb7b8d  refactor(shell): extend system footer across English utility routes
1045e51c  refactor(shell): extend creative header across all English public routes
\`\`\`

### Search current direction

Search is no longer supposed to be a white modal/card UI.

Current target model:

> **HILTECH / SEARCH INDEX**

Search should feel like a technical command/index surface:

- full-screen / portal above sticky shell
- dark physical-layer system
- large query field
- grouped results as indexed rows
- no rounded result cards
- no colored type pills
- no orange legacy accent
- product / system / RFQ aware
- close state
- keyboard Escape
- mobile full-screen behavior
- body scroll lock

Search should remain fast, not cinematic.

### RFQ current refinement

Primary submit action is now attached to the Project Sheet rather than feeling like a separate disconnected chapter.

Important truth remains:

> **THE REQUEST IS NOT THE QUOTE.**

Do not turn the submit control into a fake purchase / checkout button.

The request:
- records references
- quantities
- context
- sends through real RFQ backend
- commercial confirmation happens later

### /about

Legacy \`/about\` should not remain as a second old Company page.

Current decision:

\`/about → redirect('/company')\`

This avoids:
- duplicate Company architecture
- old rounded orange corporate page
- contradictory public identity

### Resources

\`/resources\` was rebuilt from generic PremiumCard resource hub into:

> **Project Intelligence Index**

Role:
- Company Profile
- RFQ Preparation
- Scope Finder
- Track RFQ
- solution one-pagers
- communication templates as optional utility

It must remain quieter than Home/Products.

### Company Profile resource

Rebuilt as an engineering ledger, not a card-based PDF-preview microsite.

### RFQ Guide

Rebuilt as request-input ledger.

### One-Pagers

Rebuilt as scope ledgers.

### Communication Templates

Rebuilt as a flat copy archive.

This route is optional/outreach utility, not a hero discovery page.

### Track RFQ

Rebuilt from rounded cards into request-state ledger.

### Scope Finder

Rebuilt from generic wizard cards into a technical scope sequence:

project input → system direction

It must remain explicit that it does NOT generate:
- final scope
- final compatibility
- final price
- final quotation

### Privacy / Accessibility

Rebuilt as quiet engineering/legal layouts.

Do not over-design legal pages.

---

# 6. THE CORE CREATIVE SYSTEM — DO NOT LOSE THIS

## Product/business model

HILTECH is:

> **Infrastructure Company × Technical Commerce**

Two journeys coexist.

### Project journey

Home  
→ Solution  
→ Capability / Services  
→ Evidence / Work  
→ Start a Project / RFQ

### Procurement journey

Products  
→ System / Family  
→ Exact Reference  
→ Project Fit / Technical Context  
→ RFQ

Technical users must never be forced through cinema before exact finding.

---

# 7. LOCKED CREATIVE THESIS

> **HILTECH engineers the physical layer behind connectivity — from component and route to test and proof.**

Internal mantra:

> **BUILD → ROUTE → TEST → PROVE**

State transformation:

> **CHAOS → STRUCTURE → FLOW → VERIFICATION → CERTAINTY**

Visual idea:

> **Make the invisible infrastructure visible, then demonstrate its certainty.**

Constitution:

> **HILTECH does not decorate technology. It visualizes engineering.**

This is more important than copying any reference site.

---

# 8. SOURCE-OF-TRUTH ORDER

When any design decision conflicts:

1. HILTECH business / reality truth
2. Creative thesis
3. Reference research principles
4. Information / experience architecture
5. Typography / motion / 3D grammar
6. Static AI concept images

Important historical correction:

The first Home pass followed concept images too literally and became generic premium-tech.

The project improved when the team returned to:

- briefs
- reference analysis
- business truth
- system language

The screenshots are checkpoints, not the design constitution.

---

# 9. GLOBAL RULE THAT MUST SURVIVE

> **The workflow repeats. The answer must not.**

This was one of the most important user corrections.

Do NOT make every page:

- dark hero
- giant uppercase title
- image
- text
- another giant title
- another image
- CTA

Every lane must belong to the same engineering worldview but have a different grammar.

---

# 10. LANE STATUS / LOCKED ROLES

## Home — CLOSED

Primary statement:

> **EVERY SIGNAL NEEDS A PHYSICAL PATH.**

Canonical H01-H12:

1. Engineered Signal
2. Invisible Layer
3. Component → System
4. What We Build
5. Build → Route → Test → Prove
6. Capabilities
7. Components / Products
8. Technology Ecosystem
9. Work / Evidence
10. Validation
11. Certainty
12. Start the Build

Home remains one of the strongest pages.

Do not reopen its thesis merely because another route needs a different grammar.

## Solutions — CLOSED

Model:

> **CHOOSE THE SYSTEM. DEFINE THE PATH.**

Solutions owns:
- system selection
- system explanation
- failure / response
- outcome
- delivery path
- material/scope context
- product context
- RFQ readiness

Do not turn Solutions into Services or Products.

## Services / Capabilities — CLOSED

Model:

> **THE WORK BETWEEN SCOPE AND HANDOVER.**

Services owns the strongest field-execution photography.

Lifecycle:

Site Survey & Scope  
→ Product Selection & Supply  
→ Structured Installation  
→ Cable Management  
→ Testing & Validation  
→ Handover & Support

Do not add WebGL simply to make Services “award-level.”

## Products — CLOSED AS PRODUCTION LANE

Locked model:

> **HILTECH Products = an explorable physical infrastructure library + procurement system.**

Primary statement:

> **ENTER THE PHYSICAL LIBRARY.**

Journey:

> **SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ**

Product World uses semantic Three.js scenes.

Exact finding supports:
- code
- name
- brand
- category
- specification context
- use case
- Arabic query aliases
- URL state

Product Detail architecture:

> **OBJECT → SYSTEM POSITION → DECISION LEDGER → ADJACENT REFERENCES → RFQ**

Primary truth:

> **THE REFERENCE IS NOT THE QUOTE.**

Product Intelligence exists for:
- Fiber
- Copper/CAT6
- Patch/Connectivity
- Faceplates/Keystone/RJ45
- Cabinets/Racks/PDU
- Cable Management/Duct
- CCTV/Security

Products was deeply reopened once after lower nested intelligence surfaces retained legacy UI. Do not assume nested pages are closed just because the main Products page looks good.

## Work / Evidence — CLOSED

Model:

> **HILTECH Work = a field evidence archive.**

Primary statement:

> **THE WORK LEAVES A TRACE.**

Evidence sequence:

> **ROUTE → TERMINATE → ORGANIZE → VERIFY**

Work must NOT become:
- fake project case studies
- invented client archive
- duplicate Services page

Use real field evidence only.

## Company — CLOSED, THEN CREATIVE SYNTHESIS REFINED

Model:

> **HILTECH Company = the operating identity behind the physical infrastructure.**

Primary statement:

> **BUILT AROUND THE PHYSICAL LAYER.**

Company should answer:
- who HILTECH is
- where it sits in project delivery
- what it remains accountable to
- where it is reachable

Company must remain quieter/systemic and less photographic than Services/Work.

Verified public contact facts already used:

- Hiltech Network System - H.N.S
- Cairo, Egypt
- D1 Tiba Building, Zahraa El Maadi, Cairo, Egypt
- 01000087808
- WhatsApp 01555357807
- info@hiltech-eg.com

Do not invent history/team size/branches/awards/certs.

## RFQ / Contact — CLOSED, THEN RFQ ACTION PLACEMENT REFINED

RFQ:

> **project request control surface**

Contact:

> **direct human entry point**

RFQ real backend truth must remain intact:
- persistent basket
- exact references
- quantities
- notes
- bundle/scope matching
- recommendations
- validation
- POST /api/rfq
- server validation
- persistence
- request code
- WhatsApp fallback
- Track handoff

The user specifically requested that the real submit/send interaction be visually obvious underneath the form.

## Search — REOPENED / REBUILT

Search was a missed legacy system.

New model:
- engineering index
- direct finding
- no card wall
- no colorful pills
- no old modal
- mobile full-screen
- desktop overlay/portal
- Search remains utility-first

Current QA around Search is part of the final blocker.

---

# 11. CROSS-LANE CREATIVE SYNTHESIS — IMPORTANT

After individual lanes were closed, the user correctly noticed that:

Services → Work → Company

started learning the same page grammar.

This triggered:

\`docs/HILTECH_ENGLISH_CREATIVE_SYNTHESIS_AUDIT_2026-08-31.md\`

Key correction:

- Services owns field-execution story / photography
- Products owns semantic 3D / physical objects / exact references
- Work owns evidence archive
- Company owns operating/system identity
- RFQ / Contact / Search own utility
- Resources own project intelligence
- legal pages stay quiet

The website must be:

> **one engineering worldview expressed at different intensities, not one repeated template**

---

# 12. FOOTER / HEADER CORRECTION

The original global footer was a real legacy surface:

- slate
- orange
- rounded logo wrapper
- rounded quote button
- generic corporate four-column footer

It was replaced on current English creative surfaces with a system endplate.

Header was also progressively flattened and aligned on desktop/mobile.

Recent mobile corrections removed:
- rounded Menu/Search controls
- rounded mobile project actions
- rounded secondary route controls

Current final sweep also aligns primary route hierarchy across desktop/mobile.

The current CI failure is specifically related to the new mobile nav validation, so inspect this carefully rather than assuming the newest nav commit is correct.

---

# 13. MOBILE QA — WHAT WAS DONE

Mobile QA was upgraded from a single 390px screenshot to real multi-viewport checks:

- 360 × 800
- 390 × 844
- 430 × 932

It covers:
- main routes
- Solutions deep routes
- Product Intelligence deep routes
- Product Details
- images after actual lazy-load scroll
- document width
- text clipping
- hero clipping
- real vs intentional horizontal scrollers
- mobile menu
- full-page screenshots

Real issues previously caught and fixed include:

### Home

On compact phones:
- Hero text overflow
- CARRIES EVERYTHING
- FROM ONE TERMINATION TO THE FACILITY
- STRUCTURED INSTALLATION
- CABLE MANAGEMENT

No-clip rules were later extended through 430px.

### Solutions

- CCTV Infrastructure compact title / detail copy overflow
- outcome-line measure issues

### Product Intelligence

- compatibility copy clipping
- mobile product / brand scrollers
- exact distinction between intentional swipe rail and true viewport clipping

### Media loading

A false-positive test was found:

lazy images outside the viewport were being treated as broken.

QA was corrected to scroll the page and prime lazy media before deciding an image is broken.

### QA philosophy

Do not weaken QA to make CI green.

But also do not “fix” a design because the QA itself is stale.

Classify every failure:

- true defect
- intended overflow / swipe behavior
- stale test assumption
- lazy-load timing issue
- real navigation regression

---

# 14. PRODUCT HIERARCHY QUESTION — RESEARCH VERDICT

The user explicitly asked:

> Is it realistic that a technical Products experience may have ~3 semantic layers before the exact product?

Answer from research:

**Yes.**

Especially in industrial / technical / B2B catalogs.

Examples studied:

- Corning
- Panduit
- Leviton
- Belden

Common patterns:

System  
→ Category  
→ Subcategory / Family  
→ Product family  
→ Exact reference / code

However:

> **Context may be deep. Access must remain shallow.**

Do not force expert users through every layer.

Baymard-derived finding used carefully:
- first 1–3 intermediary levels can be normal for large catalogs
- 5–7 mandatory category choices create detours

HILTECH is not consumer ecommerce, so this is a principle, not a template.

---

# 15. CURRENT PRODUCT IA DECISION

Do not flatten Products into a generic card grid at the top.

Do not force the cinematic path.

The Product page should support three clear intentions:

### I KNOW THE REFERENCE
→ Exact Finding

### I KNOW THE SYSTEM
→ Product World

### I KNOW THE PROJECT
→ Build / Project Scope

This is documented in:

\`docs/HILTECH_REFERENCE_RECHECK_VISUAL_PRODUCT_IA_2026-08-31.md\`

and:

\`docs/HILTECH_VISUAL_EXPERIENCE_RND_2026-08-31.md\`

Important:

The quick-entry concept is a **required Product refinement candidate** from the research, but do not assume every R&D item below must be implemented.

---

# 16. ORIGINAL / IMPORTANT CREATIVE REFERENCES

These are not visual templates.

Each has a role.

## NRG — Build Your Data Center
Role:
- infrastructure storytelling
- navigable complexity
- spatial chapters

## HackFirst
https://hackfirst.io/

Role:
- cinematic opening
- atmosphere
- active media
- pacing

Do not copy cybersecurity aesthetics.

## Shift5 / Non-Linear
Role:
- enterprise authority
- disciplined technical visual system

## Integrated Reasoning / Non-Linear
Role:
- technical truth generating the visual language

## PerimeterWatch / Non-Linear
Role:
- system graphics without relying on a huge photography library

## Crosswire / Unseen
https://unseen.co/projects/crosswire/

Role:
- system-derived spatial / 3D metaphor

## Google Cloud Infrastructure / Hello Monday
Role:
- invisible infrastructure → interactive spatial explanation
- glTF optimization
- instancing
- shaders
- adaptive quality

## Effortel
Role:
- telecom motion that explains

## Kelvin Zero / Cuberto
Role:
- cinematic Product Detail / product storytelling

---

# 17. PRODUCT-SPECIFIC CREATIVE REFERENCES

## Q Industrial
Industrial art direction and custom 3D.

## Ferrumpipe / Cuberto
https://cuberto.com/projects/ferrumpipe/

Very important analogy:

Physical industrial products themselves can be visual material.

3D is used because it helps inspect/understand the product.

Also important:
- mobile may deserve a lighter dedicated visual treatment

## Intrepid Automation / REJOUICE
Complex manufacturing hardware/software treated as product experience.

## Hyperframe / REJOUICE
Construction hardware/software simplified through motion / 3D / product system.

## Moxion Power / REJOUICE
Industrial hardware used as hero visual material.

---

# 18. NEW 2026 REFERENCE RECHECK

The user asked for a deeper fresh search after the site started converging toward repeated patterns.

The recheck is documented in:

\`docs/HILTECH_REFERENCE_RECHECK_VISUAL_PRODUCT_IA_2026-08-31.md\`

Key new references:

## Cerebrium
https://tympanus.net/codrops/2026/07/23/building-cerebrium-making-serverless-infrastructure-tangible/

Lesson:

> interaction itself can explain invisible infrastructure

HILTECH translation:
- route
- termination
- verification
- state

should behave visibly, not only be described.

## PX PUSH
https://tympanus.net/codrops/2026/08/07/the-department-is-open-building-the-px-push-website/

Lesson:
one governing concept can control:
- navigation
- UI
- 3D
- copy
- transitions

HILTECH governing concept:
> THE PHYSICAL LAYER

## MERSI
https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/

Lesson:
- composed pages, not filled templates
- typography is structural
- same system can produce different page tempos

## Chems.Studio
Flexible archive / rhythm without repeated templates.

## Garden Eight
https://tympanus.net/codrops/2026/07/24/the-art-of-continuous-transformation-how-garden-eight-blends-integrity-with-play/

Lesson:
motion / IA / interaction / WebGL are one design problem.

## Podium
https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/

Lesson:
selected media/content can become the transition object.

## The Spark
https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/

Lesson:
- story first
- heavy scenes only active when needed
- loading architecture is part of art direction

---

# 19. STRONGER VISUAL EXPERIENCE — R&D CONTRACT

Full contract:

\`docs/HILTECH_VISUAL_EXPERIENCE_RND_2026-08-31.md\`

The research supports a stronger layer.

It does **NOT** support:
- WebGL everywhere
- more particles
- more giant text
- another animation library
- mandatory smooth scrolling
- effect-driven transitions

The target is:

> **Continuity + semantic state change + interaction-as-explanation**

Priority R&D ideas:

## R&D 01 — Product Quick Entry
High priority UX.

## R&D 02 — Product World continuity
Make family changes feel like one physical system being inspected at different scales, not separate 3D demos.

## R&D 03 — Product World → exact reference collapse
Prototype one family.

## R&D 04 — one cross-route continuity prototype
Strong candidate:
Product reference → Product Detail

## R&D 05 — Header route as signal
Active route as signal/path state, without turning nav into a game.

## R&D 06 — State replaces copy
Candidate states:
- UNROUTED
- ROUTED
- TERMINATED
- ORGANIZED
- UNVERIFIED
- TESTED
- VERIFIED
- RFQ READY

## R&D 07 — Mobile law
Mobile is not a reduced desktop screenshot.

Keep:
- native scroll
- touch-native rails
- lower Three.js intensity
- reduced motion
- direct finding

Reject:
- scroll hijacking
- long loaders
- desktop hover logic on phone

### Promotion gate

Do NOT implement every R&D idea.

Promote only experiments that:
- improve meaning / orientation
- survive reduced motion
- survive mobile
- preserve performance
- preserve deep links
- preserve procurement speed
- preserve evidence truth

---

# 20. TOOL / LIBRARY DECISIONS

Current stack is already sufficient:

- Next.js
- React
- TypeScript
- GSAP
- ScrollTrigger
- Three.js
- Playwright

Do not add libraries for status.

### Lenis

Do not add by default.

Research did not justify it for HILTECH.

Mobile should remain native-first.

### GSAP Flip

Allowed only if a real Product → Product Detail continuity prototype needs it.

### R3F / Drei

Do not add merely because the site uses Three.js.

### WebGPU

No migration for fashion.

### CSS / SVG

First choice for:
- route lines
- nodes
- active paths
- verification state
- diagrams
- masks

---

# 21. EVIDENCE GATE — NON-NEGOTIABLE

Do not invent:

- years in business
- team size
- deployment count
- client count
- 99.99%
- 24/7
- fake project names
- fake locations
- fake technical measurements
- fake project outcomes
- certifications
- awards
- partnerships
- distributor status

unless independently verified.

Brand presence in a catalog does NOT prove formal partnership.

AI product visuals are illustrative unless explicitly sourced as official product photography.

Real field media must not be assigned fake client/project metadata.

---

# 22. SEARCH — FINAL PRODUCT PRINCIPLE

Search should support:
- exact reference
- product
- system
- solution
- RFQ
- resource
- guide
- public route

It should not look like:
- ecommerce autocomplete
- SaaS admin command palette
- generic white modal
- card gallery

Its visual role is:

> **technical route index / command surface**

Functional speed is more important than spectacle.

---

# 23. RESOURCES / UTILITY ROUTES — FINAL PRINCIPLE

Resources, Track, Scope Finder, legal routes do not need to become mini-homepages.

They should feel like:

> **quiet technical instruments inside the same HILTECH system**

Use:
- indexed rows
- ledgers
- flat fields
- real state
- mono metadata
- restrained green semantic accent

Avoid:
- rounded card walls
- gradients for decoration
- orange buttons
- fake dashboards
- giant imagery when no image job exists

---

# 24. CURRENT PUBLIC ROUTES THAT MUST BE INCLUDED IN FINAL QA

## Primary English routes

- \`/\`
- \`/solutions\`
- all live \`/solutions/[slug]\`
- \`/services\`
- \`/products-partners\`
- live \`/products-partners/[productCode]\`
- all \`/products-partners/intelligence/[slug]\`
- \`/work\`
- \`/company\`
- \`/contact\`
- \`/rfq\`

## Secondary English public routes

- \`/resources\`
- \`/resources/company-profile\`
- \`/resources/rfq-guide\`
- \`/resources/launch-copy\`
- all live \`/resources/one-pagers/[slug]\`
- \`/track\`
- \`/scope-finder\`
- \`/privacy-policy\`
- \`/accessibility-statement\`

## Alias / retired route

- \`/about\` → should redirect to \`/company\`

## Arabic

Arabic routes exist.

Full Arabic creative parity has historically been deferred.

Do NOT silently claim Arabic is creatively closed unless it is actually reviewed.

The user’s most recent closure request focused on finishing the current HILTECH desktop/mobile surface and removing forgotten legacy English public UI.

If the next chat continues beyond English closure into Arabic, treat that as a real new closure lane with visual QA.

---

# 25. FINAL QA REQUIREMENTS

Do not finish with a checklist-only claim.

Need real evidence.

## Desktop

At minimum review:
- full-page screenshots
- hero
- mid-page rhythm
- footer
- open Search
- RFQ empty
- RFQ populated
- Project Sheet
- actual Submit action
- receipt/success where QA can simulate
- Track
- Scope Finder question/result
- Resources
- legal layouts

## Mobile

At minimum:
- 360
- 390
- 430
- mobile menu open
- Search open
- Product swipe rails
- long titles
- deep Product Intelligence
- deep Solutions
- Product Detail
- RFQ form + submit
- Scope Finder
- Track
- footer

## Reduced motion

Ensure:
- meaning exists without motion
- no information depends on animation
- 3D fallback / simplified state remains coherent

## Functional

Test:
- navigation
- search links
- exact product links
- RFQ basket
- quantity
- form validation
- submit
- receipt
- Track
- Scope Finder starter items
- WhatsApp routes
- About redirect

## Visual regression / forgotten UI

Search the code for legacy signals in English public routes:

- \`rounded-xl\`
- \`rounded-2xl\`
- \`bg-slate-950\`
- \`bg-white/5\`
- \`text-orange-\`
- old PremiumCard
- old CTAButton
- old gradient/glass containers

Do not mechanically ban every rounded corner globally.

Classify:
- intentional modern current component?
- Arabic deferred surface?
- admin/private?
- legacy public surface?

The goal is not regex purity.

The goal is no accidental old website inside the new public site.

---

# 26. FINAL REFERENCE COMPARISON — DO THIS AFTER QA

The user explicitly asked to compare the finished HILTECH against both:

- original research
- newer deeper 2026 research

Do this at **whole-site level**, not page-by-page only.

Compare:

### Governing concept
Does the physical-layer idea control the whole site?

### Navigation
Does it feel authored but obvious?

### Hero
Is the Home hero still distinctive?

### Motion
Does motion communicate state or only decorate?

### Products
Does Product World add useful spatial understanding?
Can expert users reach exact finding immediately?

### Cross-route rhythm
Do pages feel like different answers inside the same world?

### Work / Company separation
Does Work remain evidence archive?
Does Company remain operating identity?

### Utilities
Do Search/RFQ/Track/Scope/resources feel intentional without becoming cinematic?

### Mobile
Does phone feel designed, not shrunk?

### Footer / end states
Does the site close coherently?

---

# 27. WHAT NOT TO DO IN THE NEXT CHAT

Do not:

- merge #183 immediately
- restart Home
- rebuild closed lanes blindly
- copy references visually
- assume static AI concepts are specs
- make every route dark + green
- reintroduce card walls
- add decorative WebGL
- add Lenis because award sites use it
- invent proof
- call brands partners without evidence
- force product users through cinematic gates
- weaken QA just to get green
- call current CI green — it is not
- call current public sweep closed before utility/Search QA passes
- ignore utility routes because they are not primary nav pages
- silently ignore mobile
- silently ignore the actual Search-open visual state
- forget RFQ submission placement
- rely only on code inspection instead of browser screenshots

---

# 28. IMPORTANT USER EXPECTATION / WORKING STYLE

The user does not want a design discussion that ends in suggestions only.

The user expects actual repository work and wants the assistant to continue to closure.

When the user says:

> “كمل هيلتك”

continue from the current repo state.

Do not ask them to repeat:
- repo
- branch
- references
- Product rationale
- Home structure
- why Work/Company were separated
- why Search was reopened

Only ask a clarifying question if a genuinely new product decision cannot be safely inferred.

---

# 29. EXACT NEXT-CHAT KICKOFF

Paste / tell the next chat:

> Read \`docs/HILTECH_FINAL_MASTER_CONTINUATION_HANDOFF_2026-08-31.md\` first.  
> Verify branch \`redesign/creative-system-20260831\` and PR #183.  
> The implementation HEAD before the handoff docs was \`56ef8f1d4d2cc899a9933f88e8d8c140d599701b\`.  
> Latest Creative Public CI #198 / run ID \`33431292227\` failed only at \`Capture public utility and Search QA\` with \`mobile creative navigation missing primary route: Solutions\`.  
> Start by classifying/fixing that exact mobile-nav QA blocker, rerun, review the resulting Search + utility desktop/mobile artifacts visually, then run the English creative synthesis.  
> After the final public-surface sweep is truly green, compare the whole site against the original + 2026 reference research, evaluate Product Quick Entry + the targeted visual R&D contract, promote only justified experiments, rerun full desktop/mobile/reduced-motion QA, and do not prepare #183 for merge until there is no known legacy public surface or material visual blocker left.

---

# 30. CANONICAL DOCS TO READ AFTER THIS FILE

Read these in this order when details are needed:

1. \`docs/HILTECH_CREATIVE_SYSTEM_INDEX.md\`
2. \`docs/HILTECH_MASTER_HANDOFF_2026-08-31.md\` — historical lane reasoning; some status fields are stale
3. \`docs/HILTECH_REFERENCE_RESEARCH.md\`
4. \`docs/HILTECH_ENGLISH_CREATIVE_SYNTHESIS_AUDIT_2026-08-31.md\`
5. \`docs/HILTECH_REFERENCE_RECHECK_VISUAL_PRODUCT_IA_2026-08-31.md\`
6. \`docs/HILTECH_VISUAL_EXPERIENCE_RND_2026-08-31.md\`
7. lane closure docs:
   - \`HILTECH_HOME_PRODUCTION_CLOSURE.md\`
   - \`HILTECH_SOLUTIONS_PRODUCTION_CLOSURE.md\`
   - \`HILTECH_SERVICES_PRODUCTION_CLOSURE.md\`
   - \`HILTECH_PRODUCTS_PRODUCTION_CLOSURE.md\`
   - \`HILTECH_WORK_PRODUCTION_CLOSURE.md\`
   - \`HILTECH_COMPANY_PRODUCTION_CLOSURE.md\`
   - \`HILTECH_RFQ_CONTACT_PRODUCTION_CLOSURE.md\`

---

# 31. FINAL DEFINITION OF DONE

PR #183 can move out of WIP only when all of the following are true:

- current branch build passes
- public regression passes
- Search utility QA passes
- Work QA passes
- Company QA passes
- RFQ/Contact QA passes
- English creative synthesis passes
- desktop full-page review passes
- mobile 360/390/430 review passes
- open mobile navigation review passes
- open Search review passes
- RFQ form + real submit placement review passes
- secondary public routes have no accidental legacy visual system
- /about is not a duplicate legacy Company
- reduced-motion path is coherent
- product procurement remains direct
- evidence gate remains intact
- whole-site rhythm does not collapse into one repeated template
- stronger R&D is either:
  - promoted because it materially improves the experience and passes all gates, OR
  - explicitly rejected/deferred because current site is stronger without it
- final reference comparison is recorded
- final closure document is written
- only then should merge readiness be evaluated

---

# 32. PROJECT IN ONE PARAGRAPH

HILTECH turns the physical infrastructure behind connectivity into the visual material of the public site: fiber, routes, ports, racks, endpoints, signal, termination, testing, verification, exact references, and project proof. Home expresses the invisible physical layer as a cinematic system; Solutions organizes system choices; Services expresses field execution; Products turns technical inventory into a semantic physical library plus exact procurement; Work is a field-evidence archive; Company is the operating identity; RFQ/Contact/Search/Track/Scope/Resources are instruments. The final website must feel like one engineering worldview expressed through different page grammars, not a repeated dark-tech template and not a legacy corporate site with a new hero.

---

**END OF MASTER CONTINUATION HANDOFF**
