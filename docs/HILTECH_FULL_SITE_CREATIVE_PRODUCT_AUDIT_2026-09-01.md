# HILTECH — FULL-SITE CREATIVE / PRODUCT AUDIT — 2026-09-01

Status: **FULL-SITE REVIEW COMPLETE / GLOBAL REFINEMENT REQUIRED / PR #183 DO NOT MERGE**
Branch: `redesign/creative-system-20260831`
Audit baseline commit: `3759195ba6128326bede648f7aca1d7c8c8c1871`
Validated CI: **Creative Public CI #199 / 33445768080 — SUCCESS**
Primary synthesis artifact: `9778160885 — hiltech-creative-synthesis-visual-qa`

## 0. Scope reviewed

This audit treats HILTECH as one product, not a set of individually closed lanes.

Reviewed:
- Home
- Solutions index
- all six Solutions detail routes through current QA coverage
- Services / Capabilities
- Products catalog / Product World / exact finding / RFQ
- Product Detail
- all seven Product Intelligence families
- Work / Evidence
- Company
- RFQ
- Contact
- Search
- Resources
- Company Profile
- RFQ Guide
- Launch Copy
- all six one-pager routes
- Track RFQ
- Scope Finder
- Privacy
- Accessibility
- /about redirect
- global desktop header
- global mobile navigation
- global footer
- 360 / 390 / 430 mobile behavior
- reduced-motion coverage
- deep product / solution routes

Evidence used:
- latest CI #199 artifacts
- earlier Product visual QA artifact `9747353837`
- current repo implementation and CSS
- original HILTECH research
- 2026 reference recheck
- 2026 Visual Experience R&D contract
- fresh recheck of Ferrumpipe, Hyperframe, Integrated Reasoning, Crosswire, Shift5, Cerebrium, PX PUSH, MERSI, Garden Eight, Podium, Google Cloud Infrastructure and current technical catalog references.

---

# 1. Overall verdict

The site is no longer a generic infrastructure website.

The strongest parts are real:
- the Physical Layer thesis is ownable,
- Home remains the creative benchmark,
- Products has a differentiated physical-library model,
- Product Detail is materially stronger than a standard SKU page,
- Work is evidence-safe,
- Company is truth-safe,
- RFQ is connected to real backend behavior,
- Search and forgotten utility routes have been successfully brought into the new visual system,
- mobile QA is unusually strict and currently green.

However, **green CI is not final creative closure**.

The full-site comparison exposes four remaining site-wide gaps:

1. **The same solid + outline giant-title grammar is now overused across too many routes.**
2. **The black / industrial-white alternation has become a repeated page cadence rather than a lane-specific rhythm.**
3. **The site still changes pages conventionally; the Physical Layer does not yet govern route continuity.**
4. **Products still lacks the research-approved immediate expert-entry layer.**

A fifth concrete implementation residual also remains:

5. **The current creative shell still inherits the legacy orange selection / keyboard-focus color from global CSS.**

The correct response is **not a redesign from zero**.

The correct response is a focused global refinement pass.

---

# 2. The biggest creative issue — identity has started becoming template

The governing law remains:

> **The workflow repeats. The answer must not.**

The latest full-page review shows that the site now risks breaking that law.

Across the primary routes, many openings rely on the same formula:

- dark field
- mono eyebrow
- large filled uppercase words
- large outlined uppercase words
- short body copy
- thin rule / technical labels
- then industrial-white chapter

Examples:
- Home — EVERY SIGNAL NEEDS A PHYSICAL PATH.
- Solutions — CHOOSE THE SYSTEM. DEFINE THE PATH.
- Services — THE WORK BETWEEN SCOPE AND HANDOVER.
- Products — ENTER THE PHYSICAL LIBRARY.
- Work — THE WORK LEAVES A TRACE.
- Company — BUILT AROUND THE PHYSICAL LAYER.
- RFQ — TURN THE SYSTEM INTO A REQUEST.
- Contact — CHOOSE THE SHORTEST PATH.

Individually these compositions are strong.

Seen together, they become recognizable as one template.

## Decision

**Keep Home as canonical. Do not weaken it.**

Do not remove the shared display language entirely.

Instead, reduce its dominance on routes where another lane primitive should lead.

### Lane-specific correction target

- **Home:** keep current hero thesis and intensity.
- **Solutions:** system path / diagram should increasingly lead the opening; title should support the system navigator.
- **Services:** real field media and execution sequence should lead; keep photography as its strongest differentiator.
- **Products:** Product World / quick intent / physical object should lead more strongly than another pure typographic chapter.
- **Work:** evidence mosaic / archive frame should remain primary; typography should act like an archive stamp, not another Home clone.
- **Company:** operating map / interface model should lead; lower display intensity.
- **RFQ:** utility/control state should lead; compress campaign-style display chapters.
- **Contact:** direct contact paths should lead; keep the proposition but reduce repeated ghost-display behavior.

---

# 3. Outline typography must become semantic, not decorative

The outlined display treatment is currently one of the clearest HILTECH visual signatures.

It is also overused.

This creates an opportunity to make it more truthful to the thesis.

## Proposed semantic rule

Use outline / ghost typography for states such as:
- UNROUTED
- UNVERIFIED
- UNKNOWN
- PENDING
- NOT YET CONFIRMED

Use filled typography for:
- ACTIVE
- ROUTED
- TERMINATED
- ORGANIZED
- TESTED
- VERIFIED
- READY

This turns the type system into engineering state.

It also reduces the feeling that outline words are decorative placeholders repeated across every hero.

This is directly aligned with:
- BUILD → ROUTE → TEST → PROVE
- CHAOS → STRUCTURE → FLOW → VERIFICATION → CERTAINTY
- the R&D rule: **state replaces copy**

Do not imply a factual PASS / VERIFIED result where evidence does not support it.

---

# 4. Global rhythm — black / white alternation is now too predictable

The primary routes repeatedly cycle:

`dark authored chapter → light technical ledger → dark authored chapter → light technical ledger → footer`

This is clean but, across the full site, increasingly predictable.

## Corrective direction

Do not add random colors.

Keep the HILTECH palette.

Change the **tempo**, not the identity.

Examples:
- Services can hold longer dark / media sequences.
- Products can move from dark spatial world into a longer light reference environment.
- Company can spend more time in quiet light/systemic space.
- RFQ can become predominantly utility-led rather than alternating campaign chapters.
- Contact can surface channels earlier and shorten the authored interstitial sections.
- Work can retain a darker evidence/archive bias.
- Solutions can stay closer to technical document / system navigator rhythm.

The goal is:

> one engineering worldview, different route tempo.

---

# 5. Header / navigation

## Structural IA — KEEP

Current English primary hierarchy is correct:

- Solutions
- Capabilities
- Products
- Work
- Company
- Search
- Arabic
- RFQ
- Start a Project

Do not move Products to the first position merely because it contains catalog items.

The site has two journeys:
- project delivery
- technical procurement

The current top-level order supports both.

## Real problem — visual legibility

Current CSS uses approximately:
- desktop primary nav: `.42rem`
- desktop utility nav: `.42rem`
- desktop RFQ count: `.4rem`
- mobile primary nav: `.48rem`
- mobile Menu/Search: `.44rem`

With the normal root size, these are visually micro-scale.

The click / touch areas are acceptable, but the text itself is underpowered against the large display system.

## Decision

Increase navigation text presence while keeping:
- mono type
- uppercase logic
- thin engineering shell
- no pills
- no rounded legacy UI

Do not make the header visually heavy.

## R&D candidate — active route as signal

Promote the current active underline into a restrained route-trace concept:
- active route = lit segment / node
- route change = trace shifts
- zero navigation delay
- reduced motion = static state
- mobile remains simple

Prototype first. Do not gameify navigation.

---

# 6. Residual legacy visual state — real defect

Current global CSS still contains:

- orange text selection
- orange `:focus-visible` outline

Specifically:
- `rgba(249, 115, 22, ...)`
- `#fb923c`

This means keyboard navigation on the rebuilt English creative site can still reveal the old orange system.

## Decision

Replace the global creative-public focus/selection behavior with the current semantic green or a neutral high-contrast engineered focus token.

Do not reduce focus visibility.

This is a real remaining legacy-system leak.

---

# 7. Products — strongest opportunity for the next pass

Products remains one of the strongest concepts on the site.

The current architecture is sound:

> SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ

Exact finding already exists.

Product Intelligence remains optional.

Product Detail remains:

> OBJECT → SYSTEM POSITION → DECISION LEDGER → ADJACENT REFERENCES → RFQ

## Gap A — Quick Entry is still missing

The R&D contract already approved:

- I KNOW THE REFERENCE
- I KNOW THE SYSTEM
- I KNOW THE PROJECT

Current `ProductsClient.tsx` still opens with a Browse References / Build by Project mode switch and then Product World.

The explicit three-intent quick entry is not implemented.

## Required refinement

Expose expert intent immediately in or directly after the Products opening:

### I KNOW THE REFERENCE
Focus Exact Finding.

### I KNOW THE SYSTEM
Enter Product World.

### I KNOW THE PROJECT
Enter Project Scope.

Core law:

> **Context may be deep. Access must remain shallow.**

## Gap B — Product World continuity

Current family scenes are semantically different and visually successful.

But the family-state screenshots still read as separate technical mini-worlds inside the same frame.

The next prototype should preserve one route/path primitive across states so the visitor feels:

> one physical system being inspected at different scales

not:

> a carousel of separate 3D diagrams.

## Gap C — Product World → Reference transition

High-value prototype:

- one family only,
- short transition,
- spatial world resolves into the exact-reference index,
- no cinematic delay to procurement,
- reduced motion = immediate state change,
- mobile may skip the spatial morph.

## Gap D — Product Detail long mixed-language references

The current Product Detail object-first direction is strong.

For very long Arabic / English mixed reference names, the display title can visually dominate the physical object.

Keep long names intact, but use content-sensitive title scaling / measure so:
- exact reference remains readable,
- object remains the visual subject,
- mixed-script lines do not become visual noise.

---

# 8. Cross-route continuity — current largest experiential gap vs references

The latest implementation still relies on conventional route changes.

This is the clearest remaining difference versus the strongest continuity references.

Relevant principles:
- MERSI: content is composed as a continuous editorial object.
- Podium: avoid flattening a strong narrative into disconnected page cuts.
- Garden Eight / aircord: selected media becomes the state that transforms into detail.
- Crosswire: the spatial system is derived from the service logic.
- Cerebrium: behavior communicates the infrastructure itself.
- PX PUSH: one governing idea controls UI, navigation, objects and transitions.

## First prototype only

### Product Reference → Product Detail

Best first experiment because:
- the product object already exists on both surfaces,
- meaning is obvious,
- deep links still work without transition,
- mobile can fall back cleanly,
- procurement context is preserved.

Potential method:
- capture selected media rect,
- transition proxy / GSAP Flip if justified,
- navigate,
- resolve into Product Detail object stage.

Do **not** implement a global transition framework before this prototype survives:
- desktop
- mobile
- reduced motion
- direct-link behavior
- performance

Second candidate only if the first works:

### Solution → related Product family

---

# 9. Route-by-route verdict

## Home

Status: **KEEP / BENCHMARK**

Strengths:
- strongest thesis expression,
- best authored opening,
- governing signal/path concept,
- strongest motion identity.

Do not redesign Home merely to make other pages different.

Only consider deeper signal behavior if it explains real route/state logic.

## Solutions

Status: **KEEP STRUCTURE / REFINE OPENING DISTINCTNESS**

Strengths:
- system navigator is correct,
- detail anatomy is strong,
- route-specific diagrams are useful.

Gap:
- top-level opening still shares too much Home-style display grammar.

Direction:
- let the system map/path become more visually dominant.

## Services / Capabilities

Status: **STRONG / SMALL REFINEMENT**

Strengths:
- real field imagery,
- delivery lifecycle,
- correct use of GSAP/SVG instead of automatic WebGL.

Gap:
- some large outline typography still competes with the field-media role.

Direction:
- preserve Services as the field-execution chapter.
- do not add 3D unless a specific state genuinely benefits.

## Products

Status: **REOPEN FOR APPROVED R&D**

Required:
- Quick Entry
- Product World continuity prototype
- World → Reference collapse prototype
- long mixed-script title tuning

Do not flatten the catalog.

## Work / Evidence

Status: **KEEP**

Strengths:
- evidence archive feels distinct,
- real field media,
- no fake case-study theater.

Potential refinement:
- make archive/evidence-frame logic even more dominant than large display text.
- use motion for scan / reveal, not spectacle.

## Company

Status: **KEEP CONTENT / LOWER DISPLAY INTENSITY**

Strengths:
- truth-safe,
- operating-position model,
- strong topology/route logic,
- verified contact data only.

Gap:
- opening still participates in the same giant display pattern.

Direction:
- system map / operating identity should lead,
- quieter typography.

## RFQ

Status: **FUNCTIONALLY STRONG / VISUAL UTILITY REFINEMENT**

Strengths:
- real basket truth,
- project context,
- backend submission,
- action placement fixed,
- request ≠ quote truth.

Gap:
- too much campaign-scale display treatment for one of the site’s quietest utility surfaces.

Direction:
- compress authored chapters,
- bring request state / project sheet / context higher,
- keep clarity over cinema.

## Contact

Status: **STRONG / MINOR COMPRESSION**

Strengths:
- direct contact paths are real,
- phone / WhatsApp / email / address are visible,
- Start Structured RFQ and WhatsApp paths are clear.

Gap:
- repeated giant outline treatment makes Contact feel more like another campaign route than the direct human endpoint.

Direction:
- keep “Choose the shortest path” idea,
- shorten the visual runway.

---

# 10. Utility / forgotten-route verdict

## Search

Status: **KEEP**

The new full-screen engineering index is a successful correction.

Do not reintroduce:
- white modal,
- rounded results,
- colored pills.

Potential future improvement:
- active result preview / keyboard path only if it stays fast.

## Resources / Company Profile / RFQ Guide / One-Pagers / Launch Copy

Status: **KEEP UTILITY SYSTEM**

The flat ledger/index treatment is correct.

Uniformity here is acceptable because these are one utility family.

Do not make every resource route cinematic.

## Track RFQ

Status: **KEEP**

Request-state ledger is appropriate.

## Scope Finder

Status: **KEEP**

Technical sequence is appropriate.

Maintain the explicit limitation that it does not generate final:
- scope
- compatibility
- price
- quote

## Privacy / Accessibility

Status: **KEEP / DO NOT OVERDESIGN**

The quiet light legal treatment is correct.

## /about

Status: **KEEP REDIRECT**

Do not rebuild a duplicate Company route.

---

# 11. Mobile verdict

Current QA is technically strong:
- 360
- 390
- 430
- deep solution routes
- Product Intelligence
- Product Detail
- media loading
- text clipping
- overflow
- reduced motion

No major layout blocker is visible in the latest green artifacts.

## Remaining mobile design issue

The global navigation text is visually too small.

Increase text presence without increasing menu complexity.

Keep:
- native scroll,
- no scroll hijack,
- lighter Product World,
- direct exact finding,
- no mandatory long transitions,
- reduced-motion path.

Cross-route continuity on mobile may be simplified or skipped if it compromises speed.

---

# 12. Reference comparison — what HILTECH should take now

## Ferrumpipe

Keep:
- physical product as the visual language,
- 3D used to inspect form,
- separate lightweight mobile treatment.

HILTECH implication:
- keep Product World,
- deepen product continuity,
- do not delay exact finding.

## Integrated Reasoning

Keep:
- visual language derived from actual technical logic.

HILTECH implication:
- line / path / node / port / termination / trace should control more of typography and transitions.
- generic outline type should become semantic state.

## Crosswire

Keep:
- one persistent system/metaphor explains a complex service.

HILTECH implication:
- Product family changes should feel like one system transforming.

## Hyperframe

Keep:
- physical components and assembly logic become the product story.

HILTECH implication:
- interaction can show route / termination / organization states instead of adding explanatory copy.

## Shift5

Keep:
- disciplined typography,
- technical authority,
- motion used with restraint,
- clear enterprise shell.

HILTECH implication:
- improve nav legibility and confidence without increasing decorative noise.

## Cerebrium

Keep:
- behavior communicates infrastructure.

HILTECH implication:
- route / test / verification states should visibly behave differently.

## PX PUSH

Keep:
- one governing idea controls UI, navigation, 3D and interaction.

HILTECH implication:
- THE PHYSICAL LAYER should govern more than hero art direction.

## MERSI / Podium / Garden Eight

Keep:
- continuity,
- different tempo within one system,
- transitions carried by actual content,
- restraint.

HILTECH implication:
- stop solving every route opening with the same giant-type formula.
- prototype one meaningful cross-route continuity first.

---

# 13. What must NOT be reopened

Do not:
- replace the Home thesis,
- flatten Products into ecommerce cards,
- add WebGL to Services just to increase spectacle,
- invent case studies,
- invent metrics,
- invent certifications,
- invent partner status,
- invent project outcomes,
- replace real field evidence with AI media,
- make legal/utility pages cinematic,
- add a global animation framework before the first transition prototype proves value.

---

# 14. Implementation order after this audit

## PASS A — Global shell truth

1. remove orange focus / selection residual from creative public system
2. increase header / mobile-nav text presence
3. prototype active route as physical signal only if it stays restrained

## PASS B — Break template repetition

4. keep Home unchanged
5. reduce repeated giant-outline hero dominance on Company / RFQ / Contact first
6. refine Solutions / Products openings so system/object/intent leads
7. reduce decorative outline repetition inside Services / Work where it competes with lane-specific material
8. recheck full-site dark/light cadence

## PASS C — Products R&D

9. Product Quick Entry
10. Product World persistent-route continuity
11. Product World → exact reference collapse
12. mixed-language Product Detail title scaling

## PASS D — One continuity prototype

13. Product reference → Product Detail
14. test desktop/mobile/reduced motion/deep link/performance
15. only then decide whether a second route transition is justified

## PASS E — Final comparison and closure

16. rerun full creative synthesis QA
17. review full-size artifacts
18. compare against references again
19. run final evidence / CTA / SEO / keyboard / mobile gate
20. only then prepare PR #183 for merge

---

# 15. Final decision

HILTECH is **not** in redesign-from-zero territory.

It is in the much narrower but important phase where a strong creative system must stop turning into a repeated template.

The next level is not “more effects.”

It is:

> **make the Physical Layer govern state, continuity, hierarchy and route behavior — while allowing every lane to keep its own tempo.**

PR #183 remains **WIP / DO NOT MERGE** until the global refinement + R&D promotion gates are complete.
