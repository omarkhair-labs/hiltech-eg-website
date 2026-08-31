# HILTECH Typography & Hero Direction

Status: **LOCKED FOR HOME REBUILD**
Date: **2026-08-31**

This document corrects the first H01–H03 implementation pass, which followed the static concept imagery too literally and produced a generic premium-tech composition.

## Reference recalibration

The live references were re-read with emphasis on typography and composition rather than screenshots.

### Shift5 / Non-Linear Studio
Reference principle:
- oversized typography carries authority
- typography is structural, not decorative
- supporting technical copy stays small and disciplined
- large type and small system labels coexist without card-heavy framing

HILTECH translation:
- giant display typography should establish the page before UI chrome
- typography must occupy space like infrastructure
- system labels should behave like engineering annotations

### Integrated Reasoning / Non-Linear Studio
Reference principle:
- the visual system comes from the underlying technical subject
- geometry, line art, typography, and 3D belong to one system
- composition is asymmetrical and editorial rather than “hero copy + image”

HILTECH translation:
- route lines, traces, nodes, and typography must interlock
- text can be crossed, measured, masked, or activated by a signal path
- 3D and type should share the same coordinate system

### HackFirst
Reference principle:
- cinematic moving media is part of page structure
- typography lives inside an active atmosphere
- strong transitions and media moments create one continuous experience

HILTECH translation:
- the WebGL/CG world must interact with typography rather than sit behind it
- transitions should carry the signal from one chapter into the next
- no isolated “hero animation” followed by conventional sections

### NRG / Build Your Data Center
Reference principle:
- complex infrastructure becomes understandable through spatial choreography and authored scenes
- education can be cinematic without becoming vague

HILTECH translation:
- H01–H03 should move from signal → physical path → system scale
- every camera move must reveal real infrastructure logic

## Correction to first implementation

The internal mantra:

> BUILD → ROUTE → TEST → PROVE

is **not the primary hero headline**.

It is the lifecycle logic that can appear as:
- navigation/state rail
- motion phases
- section transitions
- system labels
- active-state indicators

The first implementation used it as giant headline copy and became too generic.

## Hero thesis

Primary H01 statement:

> **EVERY SIGNAL NEEDS A PHYSICAL PATH.**

Supporting statement:

> HILTECH engineers fiber, structured cabling, racks, data-room infrastructure, and validation from first termination to verified handover.

The line is specific to HILTECH’s reality and directly connects the abstract “signal” world to physical engineering.

## Type roles

### 1. Display / Structural Type
Use:
- hero statements
- chapter declarations
- large spatial words

Behavior:
- very large
- tight leading
- controlled width changes
- asymmetric placement
- allowed to crop against viewport
- can interact with route lines and 3D

Do not:
- center everything
- use generic SaaS headline sizing
- place every headline inside a neat content column

### 2. Editorial / Reading Type
Use:
- explanatory copy
- capability descriptions
- case-study narrative

Behavior:
- quiet
- generous line-height
- clear contrast against display scale

### 3. Machine / Technical Type
Use:
- coordinates
- route state
- port/link labels
- measurements
- section numbers
- trace metadata

Behavior:
- mono
- uppercase where appropriate
- compact
- functional

Rule:
Machine text must never contain fake company claims disguised as telemetry.

## Typographic composition rules

1. Each major section gets one dominant type gesture.
2. Do not repeat the same left-aligned heading/subcopy/CTA stack across sections.
3. Display type should sometimes function as spatial architecture.
4. Signal paths may cross behind/in front of type only when readability remains controlled.
5. Small technical labels must create rhythm, not clutter.
6. Avoid card boxes around type unless a functional control requires a container.
7. Do not use glow on typography as a default style.
8. Accent color is a state marker, not a text-highlighter applied to every headline.

## H01 composition

The H01 viewport should contain:
- quiet top system coordinate/identifier layer
- giant statement: EVERY SIGNAL / NEEDS A / PHYSICAL PATH.
- a small BUILD / ROUTE / TEST / PROVE state rail
- one authored 3D fiber/termination scene
- one primary business action and one quiet exploratory action
- no status “dashboard card”

The active signal should physically cross the composition and influence the transition into H02.

## H01 motion language

Opening:
- type appears through controlled clipping/width/track behavior, not generic fade-up
- signal trace draws through the type composition
- selected words lock into final width/position as the route becomes active

Scroll:
- signal leaves the H01 composition
- H01 type becomes a spatial mask/foreground layer while the camera follows the route into H02

## Static test

With JavaScript disabled / motion stopped, H01 must still look authored and distinctive.

If the page only becomes impressive when WebGL is moving, the composition is not finished.
