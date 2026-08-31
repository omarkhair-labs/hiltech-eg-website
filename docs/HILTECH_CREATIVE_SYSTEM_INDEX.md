# HILTECH Creative System — Source of Truth

Status: **ACTIVE**
Date locked: **2026-08-31**
Branch: `redesign/creative-system-20260831`

This document is the entry point for the 2026 HILTECH public-site redesign direction.

## Authority order

When implementation choices conflict, use this order:

1. HILTECH business/reality truth
2. Creative thesis
3. Research/reference principles
4. Information + experience architecture
5. Visual/motion/3D grammar
6. Static AI concept images

Static concept images are **visual checkpoints, not pixel-perfect implementation specs**.

## Supersession

This direction supersedes the older public redesign direction in `docs/HILTECH_PUBLIC_REDESIGN_AUDIT.md` where it conflicts, especially:
- procurement-first homepage framing
- navy/orange as the primary visual direction
- field-photo-first art direction
- short six-section homepage as the final target
- avoiding advanced 3D/WebGL because of implementation cost

The new direction preserves real HILTECH commerce/RFQ behavior while raising the public experience to an award-level infrastructure/technology standard.

## Creative operating system

The workflow used for this redesign is:

`Reality Audit → Research → Reference Decomposition → Identity Thesis → IA/Experience Architecture → Visual/Motion Grammar → Static Exploration → Visual QA → Motion/3D Architecture → Production Integration → Closure`

Core rule:

> The workflow repeats. The answer must not.

## Locked creative thesis

HILTECH engineers the physical layer behind connectivity — from component and route to test and proof.

Internal mantra:

> **BUILD → ROUTE → TEST → PROVE**

Motion transformation:

> **CHAOS → STRUCTURE → FLOW → VERIFICATION → CERTAINTY**

Core visual idea:

> **Make the invisible infrastructure visible, then demonstrate its certainty.**

## Product/business model

HILTECH is treated as:

> **Infrastructure Company × Technical Commerce**

Two primary journeys coexist:

- Project journey: Home → Solution → Capability → Evidence → Start a Project / RFQ
- Procurement journey: Products → System / Family → Exact Reference → Project Fit → RFQ

The site must never force a procurement user through cinematic interactions before reaching a product.

## Master continuation

- `HILTECH_MASTER_HANDOFF_2026-08-31.md` — full current cross-lane continuation state, Product V2 reset, QA state, research buckets, mistakes/lessons, and exact next action.

## Required companion docs

- `HILTECH_REFERENCE_RESEARCH.md`
- `HILTECH_HOME_EXPERIENCE_SPEC.md`
- `HILTECH_TYPOGRAPHY_HERO_DIRECTION.md`
- `HILTECH_PRODUCTION_ARCHITECTURE.md`
- `HILTECH_EVIDENCE_GATE.md`
- `HILTECH_HOME_PRODUCTION_CLOSURE.md`
- `HILTECH_SOLUTIONS_PRODUCTION_SPEC.md`
- `HILTECH_SOLUTIONS_PRODUCTION_CLOSURE.md`
- `HILTECH_SERVICES_PRODUCTION_SPEC.md`
- `HILTECH_SERVICES_PRODUCTION_CLOSURE.md`
- `HILTECH_PRODUCTS_PRODUCTION_SPEC.md`
- `HILTECH_PRODUCTS_PRODUCTION_CLOSURE.md`
- `HILTECH_WORK_PRODUCTION_CLOSURE.md`
- `HILTECH_COMPANY_PRODUCTION_SPEC.md`
- `HILTECH_COMPANY_PRODUCTION_CLOSURE.md`
- `HILTECH_RFQ_CONTACT_PRODUCTION_SPEC.md`
- `HILTECH_RFQ_CONTACT_PRODUCTION_CLOSURE.md`
- `HILTECH_ENGLISH_CREATIVE_SYNTHESIS_AUDIT_2026-08-31.md`
- `HILTECH_REFERENCE_RECHECK_VISUAL_PRODUCT_IA_2026-08-31.md`
- `HILTECH_VISUAL_EXPERIENCE_RND_2026-08-31.md`

These files form one system and must be read before major public-site implementation work.


## Current English production-lane state

Closed:

- Home
- Solutions
- Services / Capabilities
- Products / Partners, including full-depth Product Intelligence revalidation
- Work / Evidence
- Company
- RFQ / Contact

Validated implementation head before documentation-only closure commits:

- `1194f9a81f80ed56767b66e95eed6e206d472b5d`

Final implementation QA run for Company + RFQ / Contact:

- Creative Public CI #137
- Run ID: `33369634165`
- Result: **SUCCESS**

Still intentionally deferred:

- Arabic parity
- final whole-site / cross-route closure

PR #183 remains **WIP / DO NOT MERGE** until deferred closure work is explicitly resumed and completed.


## Active synthesis reopening

The individual English lane closures remain valid for their business logic, evidence rules, and functional architecture.

A later whole-English visual read exposed a cross-lane composition problem that individual lane QA could not detect:

- Services, Work, and Company were beginning to reuse too much of the same photo / giant-type / alternating-section grammar.
- the global creative-route footer was still the pre-redesign slate/orange corporate footer.
- the creative header still retained several generic rounded utility-control patterns.

Therefore **Work and Company are reopened for composition only**, and the English creative shell is reopened for visual synthesis.

This does not reopen:
- Home architecture,
- Solutions architecture,
- Products architecture,
- RFQ backend behavior,
- evidence gates.

Current active audit:

- `HILTECH_ENGLISH_CREATIVE_SYNTHESIS_AUDIT_2026-08-31.md`

Current synthesis order:

1. global Footer / shell endplate
2. Work composition differentiation
3. Company composition differentiation
4. Header shell refinement
5. targeted English creative-synthesis browser QA
6. stop

Arabic parity and final whole-site closure remain intentionally deferred.

PR #183 remains **WIP / DO NOT MERGE**.


## 2026 reference recheck / Product IA verdict

Current research record:

- `HILTECH_REFERENCE_RECHECK_VISUAL_PRODUCT_IA_2026-08-31.md`

Locked findings:

- technical Product hierarchy may legitimately be several semantic layers deep;
- HILTECH must not force an expert user through every layer;
- current Product architecture remains `SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ`;
- exact reference finding must remain a fast lane;
- next Product refinement should make three entry intents explicit:
  - known reference,
  - known system,
  - known project;
- stronger visual R&D should focus on continuity and interaction-as-explanation, not indiscriminate WebGL or new animation dependencies;
- current GSAP + Three.js stack is sufficient for the next experiment.

This research does not reopen Product business logic or justify rebuilding the site from zero.

PR #183 remains **WIP / DO NOT MERGE**.
