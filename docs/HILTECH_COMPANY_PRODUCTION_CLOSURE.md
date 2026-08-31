# HILTECH Company Production Closure

Status: **COMPANY CLOSED — PUBLIC SITE STILL WIP**  
Date: **2026-08-31**  
Branch: `redesign/creative-system-20260831`  
Validated implementation head: `1194f9a81f80ed56767b66e95eed6e206d472b5d`

## Scope closed

Production closure covers:

- `/company`
- creative public header integration
- operating-identity hero
- project operating-position sequence
- four technical-truth sections
- verified Cairo presence
- proof-network routing
- RFQ / Contact / Company Profile close
- desktop Company QA
- mobile Company QA
- reduced-motion Company QA
- legacy corporate-surface removal

## Locked Company model

> **HILTECH Company = the operating identity behind the physical infrastructure.**

Primary statement:

> **BUILT AROUND THE PHYSICAL LAYER.**

Company now answers:

> Who is HILTECH, where does it sit in a project, what does it stay accountable to, and where is it physically reachable?

It does not duplicate Services, Solutions, Products, or Work.

It also does not invent:
- company history,
- founding year,
- team size,
- branch count,
- client count,
- awards,
- certifications,
- leadership identities,
- partnership claims.

## Production architecture delivered

### Identity Hero

The legacy generic About hero was replaced with a field-grounded operating statement.

The first viewport establishes:
- HILTECH / H.N.S identity,
- Egypt-based network infrastructure delivery,
- physical-layer positioning,
- one real field image,
- the project path from requirement toward handover.

### Operating Position

Company is explained through four interfaces:

1. Scope
2. Physical System
3. Field Execution
4. Verification / Handover

This keeps Company distinct from the Services process model.

### Technical Truths

Four operating truths connect Company to the rest of the public system:

- Routes
- Terminations
- Technical Spaces
- Verification

Each routes toward the relevant deeper public surface instead of reproducing it inside Company.

### Verified Presence

Only repository-supported contact facts are published:

- Official name: Hiltech Network System - H.N.S
- Cairo, Egypt
- D1 Tiba Building, Zahraa El Maadi, Cairo, Egypt
- Phone: 01000087808
- WhatsApp: 01555357807
- Email: info@hiltech-eg.com

The page intentionally does not construct a fake multi-location architecture.

### Proof Network

Company hands deeper proof to:

- Work / Field Evidence
- Solutions
- Capabilities
- Products

### Project Close

Primary:
- RFQ

Secondary:
- Contact
- Company Profile PDF

The repository contains the referenced `/hiltech-company-profile.pdf` public asset.

## Tool decision

Company uses:
- real field imagery,
- GSAP,
- ScrollTrigger,
- CSS editorial / engineering composition,
- route-trace language.

Company does not use:
- decorative WebGL,
- fabricated office/team photography,
- fake timelines,
- invented company metrics.

## Visual revalidation finding

The first full QA run exposed a real visual defect that the structural tests did not catch:

- outlined headline lines were effectively invisible because the text fill was transparent while `text-stroke` inherited `currentColor`.

This affected the intended outlined typography on Company and also the new RFQ / Contact surfaces.

The issue was fixed in:

- `708bca60432d45f88e508860cebc72f995a059ba`
- `fix(creative): restore explicit outline typography ink`

Company was then rebuilt and visually revalidated again before closure.

## Final QA

Creative Public CI:

- Run ID: `33369634165`
- Run #137
- Result: **SUCCESS**
- Validated implementation head: `1194f9a81f80ed56767b66e95eed6e206d472b5d`

Company visual QA:

- Artifact ID: `9749612124`
- Name: `hiltech-company-visual-qa`

Closed-public regression smoke:

- Artifact ID: `9749611729`
- Name: `hiltech-closed-public-regression-smoke`

Passed:

- production build
- production server
- closed Home / Solutions / Services / Products / Work regression smoke
- creative public header on Company
- desktop Company route
- mobile Company route
- hero
- operating position
- technical truths
- verified presence
- proof network
- close
- field-image loading
- verified Cairo address / phone / email presence
- RFQ primary CTA target
- legacy rounded corporate-surface gate
- horizontal-overflow gate
- reduced-motion route

## Closure judgment

Company now has a specific role inside the HILTECH public system:

- Home = cinema / system / proof
- Solutions = system choice / explanation
- Services = field execution
- Products = physical library + procurement
- Work = field evidence archive
- Company = operating identity + verified presence

Therefore **Company is CLOSED as an English production lane**.

## Deferred scope

Not closed by this document:

- Arabic parity
- final whole-site / cross-route closure

## Merge state

PR #183 remains **WIP / DO NOT MERGE**.

Company closure does not authorize merge.
