# HILTECH Services / Capabilities Production Contract

Status: **ACTIVE PRODUCTION**
Date: **2026-08-31**
Branch: `redesign/creative-system-20260831`

## Targeted reference recheck — 2026-08-31

The Services lane was rechecked before implementation so the Home/solutions quality bar would not decay.

### New reference principles

#### Global Services — 2025 infrastructure website case
Principle:
- services should open with the delivery lifecycle
- capability should be legible through structure, not jargon
- field credibility and conversion should appear in the order buyers expect

HILTECH interpretation:
- Services becomes a field-execution journey, not a card grid
- real delivery stages lead the page
- field media follows as proof

#### CBRE Data Center Project Services
Principle:
- enterprise infrastructure services are credible when the path is clear from planning through installation, commissioning, transition, and operations

HILTECH interpretation:
- lifecycle must visibly reach handover/support
- procurement and testing remain part of the delivery model

#### First Call Group / mission-critical delivery
Principle:
- deployment, commissioning, integrated testing, documentation, and maintenance belong to one operational story

HILTECH interpretation:
- testing is not a decorative badge
- handover is not the end of the visual page; it is the resolved system state

#### El Sewedy Digital case study
Principle:
- technical infrastructure can justify 3D/motion, but performance discipline matters as much as appearance

HILTECH interpretation:
- no second WebGL hero simply to repeat Home
- use the lightest tool that expresses the field idea
- rich motion remains allowed when semantically justified

### Reference conclusion

Services should feel like:

`FIELD EXECUTION × PROCESS CLARITY × REAL PROOF × VALIDATION`

Not:

`8 service cards + icons + CTA`

## Business distinction

Solutions answers:

> What system/problem are we solving?

Services / Capabilities answers:

> What does HILTECH physically do from scope to handover?

Do not collapse these two routes back together.

## Production architecture

### S01 — Field Hero

Statement:

> **THE WORK BETWEEN SCOPE AND HANDOVER.**

Purpose:
- establish execution rather than abstract consulting
- use a real field image, not a stock server-room identity
- communicate the lifecycle in the first viewport

Motion:
- restrained entry reveal
- active signal rail
- real-media composition

### S02 — Execution Lifecycle

Reality-backed stages:

1. Site Survey & Scope
2. Product Selection & Supply
3. Structured Installation
4. Cable Management
5. Testing & Validation
6. Handover & Support

Detailed service evidence underneath:
- Site Inspection & Technical Survey
- Engineering Drawings & Infrastructure Planning
- Fiber Optic Installation & Splicing
- Copper Cabling Extension & Termination
- Rack & Data Room Readiness
- Testing & Measurement Workflows
- Network Infrastructure Implementation
- Maintenance & Operational Support

Visual:
- sticky real-media inspector
- continuous execution spine
- active stage follows scroll
- technical service lines instead of cards

### S03 — Field Proof

Approved real imagery:
- `/fiber-splicing-workbench.jpg`
- `/rack-cable-management-blue.jpg`
- `/copper-cable-pulling.jpg`
- `/testing-field-device.jpg`

Rule:
- real field media is primary
- no invented project names or client claims
- motion may create a cinematic sequence from still evidence, but must never imply video footage exists when it does not

### S04 — Testing / Measurement

Published tools:
- Fluke Test
- OTDR
- Power Meter
- Digital Copper Tester
- Fiber fusion splice

Visual:
- SVG + GSAP + MotionPathPlugin
- source → route → pulse → trace
- illustrative measurement only

Rule:
- no fake thresholds
- no fake pass rate
- no fake attenuation/loss/latency values

### S05 — Handover

Purpose:
- resolve the page into operational usability
- clarify that quantities, materials, criteria, documentation, and support scope remain project-specific

Actions:
- Solutions
- Work / field evidence
- RFQ

## Tool decision

Used:
- GSAP
- ScrollTrigger
- MotionPathPlugin
- SVG
- real field images

Not used:
- second Three.js/WebGL scene

Reason:
A realtime 3D scene does not materially improve understanding of field survey/install/test/handover. Reusing WebGL here would reduce conceptual discipline and make the site feel repetitive.

## Video strategy

There is currently no verified field video asset in the repository.

Therefore:
- do not fabricate a video layer
- do not use AI-generated footage as field proof
- current cinematic motion is built from real approved imagery
- future real WebM/AV1 field footage can replace the media layer without changing the page architecture

## Responsive law

Mobile:
- lifecycle inspector becomes in-flow
- execution path becomes vertical
- field proof becomes single-column
- testing visual remains legible
- no horizontal overflow
- all CTAs remain native and immediately usable

## Evidence gates

Do not fabricate:
- project names
- clients
- locations
- deployment quantities
- testing results
- certifications
- formal partner status
- 24/7/support SLA beyond verified content

## QA gate

Before closure:
- Next production build green
- Home regression smoke green
- Solutions regression QA green
- Services hero desktop/mobile reviewed
- lifecycle desktop/mobile reviewed
- multiple lifecycle states reviewed
- field proof desktop/mobile reviewed
- testing desktop/mobile reviewed
- handover desktop/mobile reviewed
- no clipping/horizontal overflow
- no generic card-wall regression

## Merge state

This lane remains in PR #183.
PR #183 remains WIP / DO NOT MERGE until the wider public-site overhaul is complete.
