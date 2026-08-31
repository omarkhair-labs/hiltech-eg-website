# HILTECH Work / Evidence Production Contract

Status: **ACTIVE PRODUCTION**  
Date: **2026-08-31**  
Branch: `redesign/creative-system-20260831`

## Why Work needs its own lane thesis

Work is not a marketing case-study page and it is not another Services gallery.

Current HILTECH evidence is strongest where the repository contains real field photography:

- racks and data-room organization,
- copper routing and termination,
- fiber distribution / termination / splicing,
- testing instruments and field validation,
- technicians and execution context.

The repository does **not** currently provide enough verified project metadata to safely build named project case studies with client, location, quantity, scale, measured result, or commercial outcome.

Therefore the Work lane must turn real field material into proof without inventing case-study theater.

## Targeted reference recheck — 2026-08-31

### Non-Linear Studio — Work archive

URL:
- https://non-linear.studio/work

Principle:
- an archive can be legible as an index first,
- category / discipline / year can help orientation without turning each item into a card,
- the index itself can carry strong art direction.

HILTECH interpretation:
- Work should read as an evidence archive, not a four-card portfolio grid,
- discipline labels should organize real field records,
- visual authorship comes from sequencing, scale, type, and motion around real evidence.

### Snøhetta — 2023 visual identity / website

URL:
- https://www.snohetta.com/projects/snohetta_visual-identity_web_2023

Principle:
- physical and spatial practice can be translated into digital interaction,
- archive material can receive custom interactive image treatment,
- rich features should reveal spatial/project information rather than decorate it.

HILTECH interpretation:
- real infrastructure photography can become a navigable field archive,
- technical overlays may explain visible routes / termination / organization / validation,
- the photography remains the evidence source.

### Laboratorio Permanente — archive model

Reference:
- published case study describing projects as an archive / book-spine-like index with image-led exploration.

Principle:
- the archive can be read at multiple levels,
- image, title, category, and documentation do not need to become equal cards,
- quiet editorial hierarchy can make a large body of work feel authored.

HILTECH interpretation:
- use an evidence index with a large visual stage and disciplined records,
- allow scan-first reading and deeper field-context reading without inventing project narratives.

### Arup / Ramboll — engineering project evidence architecture

URLs:
- https://www.arup.com/projects/
- https://www.ramboll.com/projects

Principle:
- engineering case evidence is credible when project facts, problem, engineering response, and context are explicit,
- location/client/scale/result fields work only when they are real.

HILTECH interpretation:
- preserve the **structure of evidence** but do not borrow unsupported metadata,
- where HILTECH lacks verified client/location/quantity/result, omit those fields instead of filling them with plausible copy.

### Image-led award portfolio principle

Photography-first award work repeatedly shows the same useful rule:

> Motion should make the evidence more present, not compete with it.

HILTECH interpretation:
- Work uses real field photography as the primary visual layer,
- motion is reveal / sequence / focus / trace,
- no WebGL world is needed to prove that a real rack, route, splice, or tester exists.

## Evidence model

Primary Work thesis:

> **HILTECH Work = a field evidence archive.**

Primary statement:

> **THE WORK LEAVES A TRACE.**

Internal evidence sequence:

> **ROUTE → TERMINATE → ORGANIZE → VERIFY**

Work answers:

> What can we visibly prove about HILTECH field execution from the evidence we actually have?

It does not answer:

> What impressive project story can we manufacture from anonymous images?

## Production architecture

### W01 — Field Record Hero

Statement:

> **THE WORK LEAVES A TRACE.**

Purpose:
- immediately establish that this page is proof, not claims,
- use real field photography at meaningful scale,
- expose the evidence rule in the first viewport.

Visual:
- near-black / industrial white,
- one real image field,
- editorial typography,
- technical record marks / discipline rail,
- no invented project identifier.

Motion:
- controlled image reveal,
- trace line / record-state movement,
- no decorative WebGL.

### W02 — Evidence Index

Primary disciplines:

1. Rack / Data Room
2. Copper Routes
3. Fiber / Termination
4. Testing / Validation

The index is not a card grid.

Desktop:
- compact technical index / record list,
- one large changing evidence stage,
- active record controls the displayed field media,
- image scale / crop changes with record selection.

Mobile:
- records become in-flow evidence chapters,
- media is never hidden behind hover-only behavior.

Each record may include only:
- evidence category,
- visible field context,
- what the image can reasonably demonstrate,
- image source,
- evidence state.

Do not add:
- client,
- location,
- project scale,
- quantity,
- date,
- result,
unless verified separately.

### W03 — Field Sequence

A continuous physical sequence:

> **ROUTE → TERMINATE → ORGANIZE → VERIFY**

Use real imagery to move through field states, for example:

- route / cable path,
- termination / splice / patch,
- rack / organization,
- testing / validation.

Purpose:
- show that HILTECH proof is not a logo wall or isolated finished photo,
- connect physical execution stages without duplicating the Services lifecycle.

Difference from Services:
- Services explains **what HILTECH does**.
- Work exposes **what the available field evidence visibly shows**.

### W04 — Evidence Ledger

A quiet technical ledger separates:

#### Visible / supported
Examples:
- organized rack / patch access,
- physical cable routing,
- fiber termination context,
- field testing instruments,
- execution / technician context.

#### Not claimed from the image alone
Examples:
- client identity,
- location,
- project quantity,
- certification,
- pass rate,
- measured performance,
- final acceptance,
- formal partnership.

Purpose:
- turn the evidence gate into a visible trust behavior,
- make restraint feel intentional rather than like missing content.

### W05 — From Evidence to Scope

Close by connecting real proof to the next project:

- Solutions
- Services / Capabilities
- Start RFQ

Primary action:
- Start Project / RFQ

No false “See full case study” CTA until verified project-level records exist.

## Real media pool

Approved field assets currently available include:

### Execution
- `/field-execution-technician.jpg`

### Copper
- `/copper-cable-pulling.jpg`
- `/copper-cable-tray.jpg`
- `/copper-cabling-closeup.jpg`
- `/copper-ceiling-routing.jpg`
- `/copper-floor-routing.jpg`
- `/copper-patch-panel.jpg`
- `/copper-riser-routing.jpg`

### Fiber
- `/fiber-cable-closeup.jpg`
- `/fiber-connectors-closeup.jpg`
- `/fiber-distribution-panel.jpg`
- `/fiber-patch-panel-closeup.jpg`
- `/fiber-splicing-workbench.jpg`
- `/fiber-termination-box.jpg`

### Rack / Data room
- `/rack-cable-management-blue.jpg`
- `/rack-cable-management-white.jpg`
- `/rack-data-room.jpg`
- `/rack-front-cabling.jpg`
- `/rack-patch-panel-blue.jpg`
- `/rack-terminal-panel.jpg`
- `/rack-yellow-patching.jpg`

### Testing
- `/testing-digital-copper-tester.jpg`
- `/testing-field-device.jpg`
- `/testing-fluke-meter.jpg`
- `/testing-otdr-device.jpg`
- `/testing-power-meter.jpg`

Use real field media before CG.

## Client / partner asset warning

Client-logo and partner-logo files existing in `public/` are **not by themselves evidence** that a public Work page may claim a named project or formal relationship.

Do not infer project case studies from asset filenames.

## Tool decision

Use:
- real HILTECH field images,
- GSAP,
- ScrollTrigger,
- CSS editorial composition,
- SVG / CSS trace marks where they explain evidence state.

Do not use:
- a new WebGL hero,
- AI-generated project scenes,
- fake measurement dashboards,
- decorative 3D.

Reason:

Work earns authority from **actual field evidence**. Replacing that evidence with CG would weaken the product truth.

## Visual rhythm

Work should alternate:

> **large evidence field → indexed record → physical sequence → quiet evidence ledger → action**

Avoid:

> hero → four rounded project cards → metrics strip → CTA

The Work lane should feel more editorial and photographic than Solutions, Services, or Products while staying inside the same HILTECH engineering worldview.

## Responsive law

Mobile must preserve:
- real image priority,
- evidence labels,
- readable long field-context copy,
- no hover-only evidence,
- no horizontal archive overflow,
- direct RFQ path.

## Evidence gates

Never fabricate:
- project/client names,
- project locations,
- dates,
- quantities,
- cable lengths,
- test values,
- measured outcomes,
- project scale,
- certifications,
- partner/distributor claims.

Visible photography may prove only what it visibly proves.

## QA gate

Before Work can close:

- Next production build green,
- Home / Solutions / Services / Products regression smoke green,
- desktop + mobile Work hero reviewed,
- all evidence-index states reviewed,
- real images load and crop correctly,
- Field Sequence reviewed desktop/mobile,
- Evidence Ledger reviewed,
- reduced-motion behavior usable,
- no horizontal clipping,
- CTA destinations correct,
- no fake case-study metadata,
- no generic card-wall regression.

## Merge state

Work is inside PR #183.

PR #183 remains **WIP / DO NOT MERGE** until Work, Company, RFQ / Contact, Arabic parity, and final cross-route QA are closed.
