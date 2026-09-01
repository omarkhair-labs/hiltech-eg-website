# HILTECH Production Architecture

Status: **LOCKED PRE-IMPLEMENTATION CONTRACT**
Date: **2026-08-31**

The production site will be built incrementally. There is no throwaway prototype phase.

## Delivery model

Wrong:
`prototype → discard → rebuild production`

Correct:
`production slice → browser review → refine → extend → full production`

The first implementation slice is H01–H03, but it is part of the final homepage and stays in production code.

## Current repo baseline

At lock time:
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

Current dependencies are intentionally minimal. New creative libraries should be added only when used.

## Preferred creative stack

### Foundation
- Next.js
- React
- TypeScript

### Motion
- GSAP
- ScrollTrigger
- SplitText when licensing/availability is appropriate
- GSAP Flip where useful
- Lenis only if it materially improves scroll choreography

### Realtime 3D
Preferred default for the master cinematic canvas:
- Three.js direct

Reason:
- one tightly coordinated render loop
- precise GSAP/scroll integration
- explicit lifecycle/resource control
- no requirement to force every scene through React abstractions

React Three Fiber is allowed for isolated components where it clearly improves development.

### 3D production
- Blender
- glTF / GLB
- Meshopt or Draco where appropriate
- baked light/shadow where real-time calculation adds no value
- instancing for repeated network/rack/node elements

### Shader layer
- GLSL for signal, route, field, and data effects
- effects must be semantic, not decorative

### Diagrams
- SVG + GSAP for simple explanatory motion
- Rive for interactive technical diagrams
- Three.js/WebGL only when spatial interaction adds meaningful understanding

### Video / CG
Use pre-rendered AV1/WebM/optimized video for:
- atmospheric loops
- fixed cinematic sequences
- scenes where user interaction adds no value

Rule:
If a scene does not need to be realtime, do not force it to be realtime.

## Asset strategy

Three levels of 3D representation:

### A — Macro / Abstract
Examples:
- fiber core
- connector detail
- optical/signal landscapes

Use:
- hero
- cinematic transitions

### B — Systemic
Examples:
- rack
- topology
- network room
- data-center system
- building/infrastructure scale

Use:
- explanation and spatial journeys

### C — Product Accurate
Examples:
- specific components/SKUs
- technical product views

Use:
- product and capability contexts

Never use AI-generated fake products as accurate commerce media.

## Material language

Prefer:
- dark engineered polymer
- powder-coated metal
- matte surfaces
- controlled optical/emissive light
- translucent fiber-core materials

Avoid:
- random chrome blobs
- generic glassmorphism
- AI-startup liquid-metal aesthetic

## Visual system

Core concept:
**ENGINEERED SIGNAL**

State progression:
`DORMANT → SIGNAL → ROUTE → STRUCTURE → LOAD → TEST → VERIFIED`

Color is a state, not decoration.

Base:
- near-black / graphite
- technical white / industrial light

Accent:
- active signal/route
- warning/stress
- verified state

The green direction explored in static concepts is provisional as a signal accent and should be tuned during live browser review. It should not flood the interface.

## Graphic language

Reusable HILTECH primitives:
- Paths
- Nodes
- Traces
- Port fields
- Fiber bundles
- Rack geometry
- Coverage/signal fields
- Measurements/ticks
- Routing guides
- Technical coordinates

Rule:
Every line is a route.
Every glow is a signal.
Every motion changes state.
Every number proves something.
Every 3D object belongs to the infrastructure.

## Motion tokens

- Pulse
- Trace
- Route
- Lock
- Scan
- Measure
- Assemble
- Split
- Reroute
- Verify

Primary motion rule:

> Motion starts as energy and resolves as certainty.

## Performance architecture

Rich is allowed; waste is not.

### Adaptive quality
High-end desktop:
- full realtime scene
- full supported effects

Normal desktop:
- lower DPR
- reduced post-processing
- same art direction

Strong mobile:
- simplified realtime scene

Mid/low mobile:
- pre-rendered CG/video fallback for equivalent visual moment

Users should experience the same direction through different technical implementations.

### Performance tactics
- progressive scene loading
- route/code splitting
- compressed textures/models
- instancing
- baked lighting
- avoid redundant render loops
- reduced DPR when needed
- media posters
- responsive media
- lazy-load H07+ heavy content
- do not preload catalog/work assets into H01

### Priority rule
Prefer stable responsive interaction over an extra shader the user will not notice.

Target direction:
- LCP near/below 2.5s on reasonable conditions
- near-zero CLS
- no scroll jank caused by WebGL
- maintain accessibility/reduced-motion behavior

## Mobile contract

Mobile is not desktop scaled down.

Examples:
- H01: controlled camera, fewer degrees of freedom
- H03: discrete scene states instead of an excessively long continuous camera path if needed
- H05: shorter Build→Route→Test→Prove sequence
- H07: shift quickly into native vertical catalog behavior
- H09: real evidence gets priority
- H10: lighter validation animation
- reduce tiny HUD labels that become unreadable

## Accessibility / reduced motion

Must provide:
- prefers-reduced-motion behavior
- readable content without WebGL
- meaningful fallback frames
- keyboard-accessible navigation/actions
- sufficient contrast
- no essential information available only through motion

## Production slices

### Slice 1 — H01–H03
Build final production structure:
- navigation integration
- hero
- master canvas/render architecture
- H01 signal activation
- H01→H02 scale transition
- H02 fiber visual
- H02→H03 transition
- H03 component→system spatial journey
- mobile/reduced-motion fallback

Gate:
- static composition strong
- desktop browser visual review
- mobile visual review
- no WebGL lifecycle leaks
- acceptable scroll smoothness

### Slice 2 — H04–H06
- solution environments
- signature Build→Route→Test→Prove
- capability lifecycle

### Slice 3 — H07–H09
- product bridge
- technology/partners
- real work/evidence

### Slice 4 — H10–H12
- validation
- certainty
- final conversion

### Slice 5 — public routes
Continue the same production system across:
- Solutions
- Capabilities
- Products
- Work
- Company
- Start-a-Project / RFQ

## Browser review rule

Every slice must be reviewed in a real browser, not judged only from code or static screenshots.

Check:
- composition
- motion rhythm
- section transitions
- scroll feel
- content clarity
- performance
- mobile behavior
- reduced-motion fallback
- whether implementation still matches the creative thesis

## Final production hierarchy

When implementation choices conflict:

1. Real HILTECH truth
2. Creative thesis
3. Reference principles
4. IA / experience architecture
5. Visual + motion grammar
6. Static concept images

Do not build AI screenshots pixel-for-pixel.
