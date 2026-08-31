# HILTECH Products Production Contract

Status: **PRODUCTS CLOSED CONTRACT — PUBLIC SITE STILL WIP**  
Date: **2026-08-31**  
Branch: `redesign/creative-system-20260831`

## Why Products required a reset

The first Products production pass improved real catalog finding, Product Detail, RFQ behavior, and technical intelligence, but its creative center was still too close to a conventional technical-commerce UI:

- rounded filter/pill patterns,
- equal product-card grids,
- familiar ecommerce hierarchy,
- technical-note cards,
- project-bundle cards.

That structure was useful, but it did not fully express the locked HILTECH creative thesis.

Products was therefore reopened instead of visually polishing the existing catalog shell.

## Locked Product thesis

> **HILTECH Products = an explorable physical infrastructure library + procurement system.**

Primary page statement:

> **ENTER THE PHYSICAL LIBRARY.**

Primary journey:

> **SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ**

Products is not a shop and not a conventional catalog. It must make the physical infrastructure itself legible while keeping exact-reference procurement fast.

## Product-specific creative reference reset

### Q Industrial — The Thirty7

Principle:
- an industrial technical portfolio can be strongly art-directed without becoming consumer ecommerce.

HILTECH interpretation:
- product/technology/application information can coexist with authored spatial composition.

### Ferrumpipe — Cuberto

Principle:
- physical industrial products can become the visual language themselves.
- 3D is justified when it reveals the physical object or family.
- mobile may use cheaper rendering without lowering the visual thesis.

HILTECH interpretation:
- category families become physical worlds instead of card categories.

### Intrepid Automation — REJOUICE

Principle:
- complex manufacturing hardware/software can be presented as a product/system experience rather than an equipment database.

HILTECH interpretation:
- Product World should explain physical relationships, not merely list inventory.

### Hyperframe — REJOUICE

Principle:
- a complex construction component can become understandable through system position, motion, and 3D.

HILTECH interpretation:
- Product Detail must show where the reference sits inside infrastructure.

### Moxion Power — REJOUICE

Principle:
- industrial hardware can act as a brand hero object.

HILTECH interpretation:
- the product object receives real visual authority before procurement close.

### Existing Product Tier 1 retained

- Integrated Reasoning → derive imagery from technical truth.
- Kelvin Zero → progressive product-information storytelling.
- Crosswire → spatial/system explanation instead of decorative WebGL.

## Functional references — not visual direction

Schneider Electric, DigiKey, Mouser, CommScope, Panduit, and Cisco remain useful for:

- exact reference finding,
- brand/category filtering,
- technical documentation structure,
- compatibility context,
- procurement/RFQ behavior,
- normalized comparison patterns when real data exists.

They must not become the HILTECH art direction.

Important rule:

> Do not ship fake Compare until the catalog has genuinely normalized comparable parameters.

## Preserved business logic

The creative reset must preserve:

- live public catalog source,
- exact product-code search,
- name / brand / category / spec / use-case search,
- Arabic query aliases,
- URL filter state,
- RFQ basket persistence,
- quantities and notes,
- companion recommendations,
- real project bundles,
- scope completion / missing-item logic,
- WhatsApp RFQ path,
- SEO / metadata / Product JSON-LD,
- Unicode-safe Product Detail routing,
- live/fallback catalog behavior.

## Production architecture

### P01 — Product Hero

Purpose:
- establish physical infrastructure + procurement,
- expose live catalog truth,
- establish the journey from system to RFQ.

Statement:

> **ENTER THE PHYSICAL LIBRARY.**

No fake metrics. Current reference/family counts come from the live catalog.

### P02 — Physical Library / Semantic Category Worlds

Implementation:
- `components/products/ProductWorldScene.tsx`
- Three.js / WebGL

Worlds:
- All Systems → connected physical-layer overview
- Fiber → optical route / strands / termination
- Copper → twisted-pair / cable interior
- Connectivity → panel / ports / patch paths
- Endpoints → faceplate / module / outlet
- Rack + Power → rack-unit / power / organization
- latent Pathways / CCTV worlds remain ready but are not exposed when the live catalog family is empty

Runtime law:

> The visual model may know more families than the current catalog, but public navigation exposes only populated live families.

The All Systems state must render an All Systems overview. It must never visually claim “All Systems” while silently showing a single Fiber world.

### P03 — Exact Finder

Supports:
- exact reference/product code,
- name,
- brand,
- category,
- specification context,
- use case,
- Arabic aliases.

Procurement finding remains fast and literal.

### P04 — Technical Reference Index

The primary results experience is an engineering reference index, not a three-column promotional card wall.

Each reference exposes:
- exact code,
- visual / neutral media state,
- product name,
- use case,
- brand,
- specification context,
- availability context,
- Add to RFQ,
- Product Detail,
- Technical Guide,
- companion references when supported.

### P05 — Project Scope Mode

Uses real project bundles and the same RFQ state.

Current starter models include:
- Office Network Setup Starter
- Rack Room Preparation Starter
- Fiber Backbone Scope Starter when supported by live inventory

Project mode is procurement acceleration, not a marketing mini-site.

### P06 — RFQ Dock / Drawer

Utility-first.

Exposes:
- reference/unit count,
- quantities,
- notes,
- missing-scope suggestions,
- scope completion,
- structured RFQ review,
- WhatsApp secondary path,
- clear request.

## Product Detail V2

Primary story:

> **OBJECT → SYSTEM POSITION → DECISION LEDGER → ADJACENT REFERENCES → RFQ**

### Object

Exposes:
- brand,
- category,
- exact reference,
- spec context,
- use case,
- price context,
- availability context,
- Product visual / evidence status,
- Add to RFQ,
- Technical Guide.

### System Position

The reference is shown inside a category-relevant infrastructure diagram.

### Decision Ledger

Separates:
- known catalog facts,
- contextual project information,
- commercial/specification details still requiring confirmation.

### Adjacent References

Related references use a technical index rather than a generic carousel.

### Procurement close

Statement:

> **THE REFERENCE IS NOT THE QUOTE.**

Final specification, compatibility, quantity, price, and availability remain subject to RFQ review.

## Product visuals evidence rule

`content/product-visuals.ts` includes realistic illustrative/AI-generated technical visuals.

They are:
- not official brand photography,
- not official packaging,
- not evidence of exact appearance,
- not allowed to invent logos.

Prefer accurate real listing media where available. Otherwise preserve the illustrative/missing-media state explicitly.

## Product Intelligence

Current category-guide routes cover:
- fiber-optic-systems
- copper-cat6-cabling
- patch-cords-connectivity
- faceplates-keystone-rj45
- cabinets-racks-pdu
- cable-management-duct-systems
- cctv-security

Each guide may expose:
- system context,
- typical components,
- use cases,
- RFQ inputs,
- compatibility notes,
- handover notes,
- related Solutions / capabilities,
- matching live references.

Product Intelligence is technical context, not a second catalog.

## Motion / 3D law

Products justifies WebGL because physical families benefit from spatial understanding.

Rules:
- 3D must represent physical/system meaning,
- no decorative particle field,
- category worlds must visibly differ,
- procurement controls remain low-friction,
- reduced motion remains usable,
- mobile rendering is lighter where needed.

## Responsive law

Mobile must preserve:
- category/world hierarchy,
- exact-reference finding,
- technical reference density without clipping,
- mixed-language reference names,
- Product Detail object/system sequence,
- RFQ access.

Long Product Intelligence titles and summaries must stay inside the viewport. Hiding overflow is not an acceptable substitute for correct composition.

## Evidence gates

Do not invent:
- product specification,
- compatibility,
- official photography,
- partner/distributor status,
- price,
- availability,
- project claims,
- normalized comparison data.

## QA / closure gate

Before Products can be called CLOSED:

- Next production build green,
- closed Home/Solutions/Services regression smoke green,
- desktop + mobile Product Hero reviewed,
- All Systems and multiple family worlds reviewed,
- exact finder / code search / brand filter reviewed,
- technical reference index reviewed,
- RFQ drawer reviewed,
- project mode reviewed,
- multiple real Product Detail routes reviewed,
- mixed Arabic/English long reference names reviewed,
- Product Detail position / ledger / related / procurement reviewed,
- all Product Intelligence routes reviewed,
- mobile intelligence text containment validated,
- no known material visual/interaction blocker.

## Merge state

Products may close as a lane while PR #183 remains **WIP / DO NOT MERGE** until Work / Evidence, Company, RFQ / Contact, Arabic parity, and final public-site QA are closed.
