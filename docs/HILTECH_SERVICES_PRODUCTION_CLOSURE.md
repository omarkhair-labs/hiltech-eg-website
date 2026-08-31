# HILTECH Services / Capabilities Production Closure

Status: **SERVICES CLOSED — PUBLIC SITE STILL WIP**
Date: **2026-08-31**
Branch: `redesign/creative-system-20260831`
Validated code head: `1675f653ca34f92c9e995b7a6a5de68e1671fce3`

## Scope closed

Production overhaul completed for:

- `/services`
- creative public header treatment on `/services`

## Product model

Services / Capabilities answers:

> **What does HILTECH physically do from scope to handover?**

This remains intentionally distinct from Solutions, which answers what system/problem is being solved.

## Final page sequence

1. Field Hero
2. Execution Lifecycle
3. Real Field Proof
4. Testing & Measurement
5. Handover

Primary statement:

> **THE WORK BETWEEN SCOPE AND HANDOVER.**

## Real execution lifecycle

The production page exposes the current HILTECH delivery model:

1. Site Survey & Scope
2. Product Selection & Supply
3. Structured Installation
4. Cable Management
5. Testing & Validation
6. Handover & Support

Detailed real service scope is nested under the lifecycle:
- Site Inspection & Technical Survey
- Engineering Drawings & Infrastructure Planning
- Fiber Optic Installation & Splicing
- Copper Cabling Extension & Termination
- Rack & Data Room Readiness
- Testing & Measurement Workflows
- Network Infrastructure Implementation
- Maintenance & Operational Support

## Field-proof media

The page uses approved real repository imagery:
- `/field-execution-technician.jpg`
- `/fiber-splicing-workbench.jpg`
- `/rack-cable-management-blue.jpg`
- `/copper-cable-pulling.jpg`
- `/testing-field-device.jpg`
- `/rack-data-room.jpg`

No stock server-room hero became the page identity.

## Motion / tool decision

Used:
- GSAP
- ScrollTrigger
- MotionPathPlugin
- SVG
- real-media parallax / reveal choreography
- vertical execution-state tracking

Not used:
- new Three.js/WebGL scene

Reason:
A second realtime 3D hero did not materially improve understanding of survey/install/test/handover and would have repeated the Home language.

No verified field video exists in the current repository, so no fake/AI field footage was presented as evidence. The media architecture can accept real WebM/AV1 footage later without redesign.

## Validation section

Published testing language includes:
- Fluke Test
- OTDR
- Power Meter
- Digital Copper Tester
- Fiber fusion splice

The SVG trace remains illustrative.

No fabricated:
- thresholds
- loss values
- pass rates
- latency
- uptime
- acceptance results

## Targeted reference recheck

Services was rechecked separately before implementation.

The active principles were:
- lifecycle-first service storytelling
- field credibility before conversion
- commissioning / handover as part of the service story
- technical motion only when it explains execution
- performance discipline over unnecessary realtime effects

The full recheck is recorded in:
`docs/HILTECH_SERVICES_PRODUCTION_SPEC.md`

## QA

Final GitHub Actions:
- Run ID: `33359096935`
- Result: **SUCCESS**
- Validated code head: `1675f653ca34f92c9e995b7a6a5de68e1671fce3`

Services visual QA artifact:
- Artifact ID: `9746150579`
- Name: `hiltech-services-visual-qa`

Validated:
- Next production build
- TypeScript build gate
- production server startup
- Home H01/H12 regression smoke desktop/mobile
- Solutions regression QA
- Services hero desktop/mobile
- lifecycle desktop/mobile
- lifecycle states 01 / 03 / 06
- field-proof section desktop/mobile
- testing section desktop/mobile
- handover desktop/mobile
- no material clipping / horizontal overflow in reviewed captures

## Closure judgment

No visual blocker remains in the reviewed Services surfaces.

The page now feels like field execution and commissioning rather than a generic services-card page, while preserving the HILTECH creative system without copying the Home's WebGL/cinematic structure.

## Next public-site lane

Next:
**Products / Product Detail production overhaul**

Then:
- Work / Evidence
- Company
- RFQ / Contact
- Arabic parity
- final cross-route QA

## Merge state

PR #183 remains **WIP / DO NOT MERGE** until the wider public-site overhaul is complete.
