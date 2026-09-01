# HILTECH RFQ / Contact Production Closure

Status: **RFQ / CONTACT CLOSED — PUBLIC SITE STILL WIP**  
Date: **2026-08-31**  
Branch: `redesign/creative-system-20260831`  
Validated implementation head: `1194f9a81f80ed56767b66e95eed6e206d472b5d`

## Scope closed

Production closure covers:

- `/rfq`
- `/contact`
- creative public header integration
- RFQ empty state
- populated technical reference ledger
- quantity editing
- item notes
- item removal
- scope-match signal
- missing-scope recommendation add
- project-detail validation
- structured RFQ API submission path
- WhatsApp fallback path
- success receipt
- Track RFQ handoff
- verified direct-contact routing
- desktop RFQ / Contact QA
- mobile RFQ / Contact QA
- reduced-motion RFQ QA
- legacy rounded/gradient surface removal

## Locked lane model

> **RFQ = project request control surface.**  
> **Contact = direct human entry point.**

RFQ translates selected physical references and project context into a structured request.

Contact routes a visitor to the shortest honest next action.

## Existing backend truth preserved

The production overhaul did not replace the real RFQ backend.

The lane still preserves:

- persistent local RFQ basket
- exact product references
- quantities
- item notes
- project-bundle matching
- missing-scope recommendations
- full-name validation
- Egyptian phone validation
- email validation
- company
- project location
- project notes
- `POST /api/rfq`
- server-side payload validation
- rate limiting
- Supabase-backed RFQ request creation
- RFQ item persistence
- internal notification pipeline
- generated request code
- WhatsApp fallback
- request tracking handoff

## RFQ architecture delivered

### Request Header

Primary statement:

> **TURN THE SYSTEM INTO A REQUEST.**

The header exposes:
- reference count,
- total units,
- current request state,
- review-state truth.

No fake subtotal or unconfirmed project price is displayed.

### Reference Ledger

The old rounded product-card treatment was replaced by a technical request ledger.

Each line exposes:
- exact reference code,
- product name,
- category / brand,
- price-reference state,
- availability-review state,
- quantity controls,
- item note,
- remove action.

### Scope Signal

Where bundle logic finds a meaningful current match, RFQ exposes:
- best current bundle match,
- required coverage,
- completion percentage,
- missing requirements,
- live recommended products,
- add-to-request action.

This is explicitly treated as a scope signal rather than a final customer-project classification.

### Project Sheet

The project context surface includes:
- full name,
- phone,
- email,
- company,
- project location,
- project notes.

Validation remains local and visible before request submission.

### Submission Gate

Primary action:
- persist the structured request through `/api/rfq`.

Secondary action:
- send the current request through WhatsApp.

The page clearly keeps quotation truth separate from request submission:

> final price, availability, and project fit are confirmed during RFQ review.

### Receipt

On successful submission, the UI becomes a technical receipt instead of a generic success card.

It exposes:
- received state,
- generated request code,
- Track RFQ,
- Products return path,
- WhatsApp secondary path.

### Empty Request

An empty basket cannot be fake-submitted as an itemized RFQ.

The user is routed to:
- Products / Physical Library,
- project-only WhatsApp when references are not yet known.

## Contact architecture delivered

Primary statement:

> **CHOOSE THE SHORTEST PATH.**

Two visible intents:

1. I have scope / references → structured RFQ
2. I need to frame the project → direct WhatsApp / contact

Verified contact surface:

- WhatsApp: 01555357807
- Phone: 01000087808
- Email: info@hiltech-eg.com
- Address: D1 Tiba Building, Zahraa El Maadi, Cairo, Egypt

Contact also includes a project-preparation checklist and handoff links to:
- RFQ
- Work / Evidence
- Company

## Visual revalidation findings

Two QA issues were caught and corrected before closure.

### Outline typography

The first visual pass exposed transparent outlined headline lines.

Fixed in:

- `708bca60432d45f88e508860cebc72f995a059ba`
- `fix(creative): restore explicit outline typography ink`

### Receipt capture depth

The first success-state screenshot technically passed but did not reliably frame the actual receipt after the mocked submission transition.

The QA was tightened to:

- scroll the real receipt into view,
- require a meaningful rendered receipt height,
- validate the exact mocked request code,
- capture the actual receipt state.

Fixed in:

- `1194f9a81f80ed56767b66e95eed6e206d472b5d`
- `test(rfq): capture the actual receipt after mocked success`

The final RFQ receipt was then visually reviewed on the validated run.

## Safe success-path QA

Browser QA does **not** write a fake RFQ into production data.

For success-state validation, Playwright intercepts `POST /api/rfq` and returns a deterministic QA response:

- `RFQ-QA-20260831`

This allows validation of:
- submit transition,
- receipt state,
- request-code rendering,
- tracking link handoff,

without corrupting production Supabase data or triggering real RFQ notifications.

The real `/api/rfq` implementation remains unchanged and production-backed.

## Final QA

Creative Public CI:

- Run ID: `33369634165`
- Run #137
- Result: **SUCCESS**
- Validated implementation head: `1194f9a81f80ed56767b66e95eed6e206d472b5d`

RFQ / Contact visual QA:

- Artifact ID: `9749612475`
- Name: `hiltech-rfq-contact-visual-qa`

Closed-public regression smoke:

- Artifact ID: `9749611729`
- Name: `hiltech-closed-public-regression-smoke`

Passed:

- production build
- production server
- closed Home / Solutions / Services / Products / Work / Company regression smoke
- RFQ empty desktop/mobile
- RFQ populated ledger desktop/mobile
- quantity increment interaction
- scope-suggestion add interaction when available
- required-field validation
- mocked safe success submission
- actual receipt rendering
- exact QA request-code validation
- Contact desktop/mobile
- verified phone / WhatsApp / email / Cairo address
- Contact → RFQ route
- creative public header
- legacy rounded/gradient surface gate
- horizontal-overflow gates
- reduced-motion RFQ route

## Closure judgment

RFQ / Contact now completes the English public conversion layer:

- Product references remain precise,
- project context remains explicit,
- submission remains a request rather than a fake quote,
- real backend behavior is preserved,
- WhatsApp remains an honest fallback,
- direct contact remains distinct from structured RFQ.

Therefore **RFQ / Contact is CLOSED as an English production lane**.

## Deferred scope

Not closed by this document:

- Arabic parity
- final whole-site / cross-route closure

## Merge state

PR #183 remains **WIP / DO NOT MERGE**.

RFQ / Contact closure does not authorize merge.
