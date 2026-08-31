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
