# HILTECH — Visual Experience R&D Layer / 2026

Status: **R&D CONTRACT — NOT YET A SITE-WIDE IMPLEMENTATION**
Date: **2026-08-31**
Branch: `redesign/creative-system-20260831`
PR: **#183 WIP / DO NOT MERGE**

## Purpose

This document defines the stronger visual/interaction layer that may follow the final English mobile QA.

It is intentionally an **R&D gate**, not permission to add effects everywhere.

The question is:

> What can make HILTECH feel one level more authored, continuous, and memorable without reducing technical clarity, procurement speed, mobile performance, or evidence integrity?

The answer from the original research + 2026 recheck is:

> **Continuity + semantic state change + interaction-as-explanation.**

Not:
- more particles,
- more giant type,
- another animation framework,
- smooth scroll for its own sake,
- WebGL on every route.

---

# Reference synthesis

## Cerebrium

https://tympanus.net/codrops/2026/07/23/building-cerebrium-making-serverless-infrastructure-tangible/

Principle:
- the behavior of the experience communicates the infrastructure,
- paths and interaction replace some explanation,
- 3D is the product story, not decoration.

HILTECH application:
- route / termination / verification states should visibly behave differently.

## PX PUSH

https://tympanus.net/codrops/2026/08/07/the-department-is-open-building-the-px-push-website/

Principle:
- one governing idea controls UI, navigation, objects, transitions, and 3D.

HILTECH application:
- every new interaction should come from **THE PHYSICAL LAYER**.

## MERSI / Podium

https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/
https://tympanus.net/codrops/2026/06/23/podium-building-a-website-where-running-becomes-storytelling/

Principle:
- a selected object/media can become the transition object,
- continuity is stronger when the content itself carries the transition.

HILTECH application:
- Product family/object or Solution route can persist into the next state.

## Crosswire

https://unseen.co/projects/crosswire/

Principle:
- spatial metaphor comes from product/service logic.

HILTECH application:
- a route, port, rack, endpoint, or signal is a better transition primitive than an unrelated shader effect.

## Ferrumpipe

https://cuberto.com/projects/ferrumpipe/

Principle:
- physical industrial products themselves can become the visual language,
- 3D helps inspect details,
- mobile may need a deliberately lighter treatment.

HILTECH application:
- Product World remains valid,
- exact finding remains fast,
- desktop/mobile need not render identical scene weight.

## The Spark

https://tympanus.net/codrops/2026/01/09/the-spark-engineering-an-immersive-story-first-web-experience/

Principle:
- activate only the scene required for the current beat,
- loading/performance decisions are part of storytelling.

HILTECH application:
- do not keep expensive scenes running simply because the user has passed them.

---

# Existing HILTECH stack is enough

Current repo:

- Next.js
- React
- TypeScript
- GSAP + ScrollTrigger
- Three.js
- Playwright

## R&D tools allowed

### GSAP Flip

Allowed if a real DOM/object continuity experiment needs it.

Use case:
- clicked Product visual expands/repositions into Product Detail opening state.

Do not add Flip merely to animate layout changes.

### Shared route-transition state

A minimal React context / state bridge may be sufficient for an experiment.

Do not introduce Zustand until the interaction graph genuinely needs shared transition state across multiple unrelated components.

### Three.js

Reuse current renderer principles.

Do not add React Three Fiber only for fashion.

### CSS / SVG

First choice for:
- route lines,
- nodes,
- active-path navigation,
- diagram state,
- masks,
- verification state.

---

# R&D 01 — Product quick entry

Priority: **HIGH / PRODUCT UX**

The Product page should expose three intentions immediately:

### I KNOW THE REFERENCE

Action:
- focus Exact Finding,
- do not force Product World consumption.

Target:
`#exact-finding`

### I KNOW THE SYSTEM

Action:
- enter Product World / family exploration.

Target:
`#physical-library`

### I KNOW THE PROJECT

Action:
- switch to Project Scope mode and move to project builder.

Target:
`PROJECT SCOPE`

This is the research-backed answer to Product hierarchy depth.

> Context may be deep. Access must remain shallow.

---

# R&D 02 — Product World continuity

Priority: **HIGH / VISUAL**

Current:
- each selected family changes to a semantic Three.js world.

Next experiment:
- preserve one route/path primitive between family changes,
- move camera / object configuration around that persistent route,
- avoid the feeling of eight unrelated demos.

Example state:

`ALL SYSTEMS`
→ route line persists
→ `FIBER` amplifies optical path
→ `CONNECTIVITY` resolves the route into ports
→ `RACK + POWER` resolves the route into organized equipment.

Success condition:

The visitor feels one physical system being inspected at different scales.

Failure condition:

It looks like an animated carousel of 3D illustrations.

---

# R&D 03 — Product World → exact reference collapse

Priority: **HIGH / EXPERIMENT**

Prototype one family only.

Example:

1. Fiber semantic world active.
2. User chooses “Exact references”.
3. world camera resolves toward connector/termination plane.
4. selected semantic object becomes / aligns with the reference-index media region.
5. DOM reference rows appear.

This should be short.

No long cinematic transition before procurement.

Reduced-motion:
- immediate anchor jump / simple fade.

Mobile:
- direct transition or no spatial morph if it costs clarity/performance.

---

# R&D 04 — One cross-route continuity prototype

Priority: **MEDIUM / TEST FIRST**

Do not implement all route transitions.

Prototype one:

### Option A — Product reference → Product Detail

Strongest candidate because the exact object is already the subject.

Clicked product media:
- capture rect,
- create transition proxy,
- navigate,
- resolve proxy into Product Detail object stage.

### Option B — Solution → related Product family

Selected route line:
- persists as a short overlay,
- resolves into Product World signal path.

Do not prototype Work first.
Its archive grammar is intentionally quieter.

---

# R&D 05 — Header route as signal

Priority: **MEDIUM / LOW COST**

Current creative header is flat and restrained.

Potential enhancement:

- active page = lit segment,
- transition between top-level routes = trace line moves to next node,
- mobile remains simple.

Constraints:
- no fake technical values,
- no HUD theater,
- no delay to navigation,
- active state remains accessible without animation.

---

# R&D 06 — State replaces copy

Priority: **HIGH / SELECTIVE**

Find text that explains a state which interaction could show.

Candidate vocabulary:

- UNROUTED
- ROUTED
- TERMINATED
- ORGANIZED
- UNVERIFIED
- TESTED
- VERIFIED
- RFQ READY

Examples:

### Solutions
Instead of another explanatory paragraph:
- show route broken,
- user/state progresses,
- route resolves.

### Testing
- unverified trace,
- measurement state,
- verified lock.

### Products
- semantic system,
- exact reference,
- compatibility unknown,
- RFQ confirmation required.

Never animate a “pass” or “certified” state as if it were a factual project result unless evidence supports it.

---

# R&D 07 — Mobile law

The mobile site is not a reduced desktop screenshot.

Keep:

- native browser scroll,
- touch-native horizontal rails,
- lighter Three.js renderer settings,
- reduced scene density,
- reduced-motion path,
- direct finding before spectacle.

Allowed:

- simplified state morph,
- one persistent line/node,
- compact transition proxy.

Reject:

- scroll hijacking,
- mandatory smooth-scroll library,
- long intro/loaders,
- precision cursor interactions,
- desktop-only hover logic masquerading as mobile interaction.

---

# Evaluation gates

Every experiment must pass all of these:

## 1. Static gate

With motion disabled:
- composition still works,
- meaning still exists.

## 2. UX gate

The interaction:
- reduces confusion,
- improves continuity,
- or explains system behavior.

If it only “looks cool”, reject.

## 3. Product speed gate

A known-reference user remains one action away from exact finding.

## 4. Performance gate

No meaningful regression in:
- mobile response,
- scene startup,
- route navigation.

## 5. Reduced-motion gate

No information depends exclusively on motion.

## 6. Deep-link gate

Direct Product/Solution URLs still make sense without the transition that led to them.

## 7. Evidence gate

Visual state cannot imply:
- certification,
- performance result,
- client relationship,
- formal partnership,
- measured success

without verified evidence.

---

# Promotion order

After final mobile QA:

1. Product Quick Entry
2. Product World continuity prototype
3. Product World → Reference collapse prototype
4. browser / mobile / reduced-motion review
5. one cross-route continuity prototype
6. compare against references again
7. promote only what materially improves the site

Do not implement all R&D items by default.

The site should become **more coherent**, not merely more animated.
