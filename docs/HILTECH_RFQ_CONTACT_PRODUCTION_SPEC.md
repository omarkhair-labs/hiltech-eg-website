# HILTECH RFQ / Contact Production Contract

Status: **ACTIVE PRODUCTION**  
Date: **2026-08-31**  
Branch: `redesign/creative-system-20260831`

## Lane thesis

> **RFQ = project request control surface.**  
> **Contact = direct human entry point.**

The lane is not a marketing form layer.

RFQ should translate live Product / project scope into a structured request that HILTECH can review.

Contact should help a visitor choose the shortest honest path:
- structured RFQ when scope/references exist,
- direct phone / WhatsApp / email when the project still needs framing.

## Targeted reference recheck — 2026-08-31

### Schneider Electric — Customer Care / Get a Quote

URLs:
- https://www.se.com/eg/en/work/support/customer-care/customer-care-contact/
- https://eshop.se.com/eg/quotation

Principle:
- separate project quote intent from generic support/contact intent,
- ask for project details that materially change a quote,
- pricing / availability remain confirmation states.

HILTECH interpretation:
- RFQ is a dedicated project path,
- Contact is not a duplicate RFQ form,
- basket references + quantities + location + notes remain visible before submission.

### Schneider Electric — Project Builder

URL:
- https://www.se.com/au/en/work/products/project-builder/

Principle:
- project configuration belongs between product selection and ordering / quotation.

HILTECH interpretation:
- preserve Product project-bundle / scope-completion context through RFQ review,
- do not make the user re-enter selected products manually.

### Wesco — project procurement / BoM workflow

Reference:
- project-specific Bill of Materials / release-management workflow.

Principle:
- project procurement improves when exact materials and quantities remain visible and editable,
- duplicated manual entry creates errors.

HILTECH interpretation:
- RFQ item ledger is the source of truth,
- quantity/note editing happens in-place,
- missing-scope suggestions write back into the same basket.

### Shift5 — Contact

URL:
- https://shift5.io/contact/

Principle:
- one direct contact surface can clarify intent and physical presence without becoming a dense sales portal.

HILTECH interpretation:
- Contact remains concise,
- it exposes one verified Cairo location and direct channels,
- RFQ remains the structured path for quotation.

### Existing HILTECH creative thesis retained

Use:
- enterprise discipline from Shift5,
- technical index / ledger language already established in Products,
- restrained field/system tone from Work / Services.

Do not visually imitate Schneider/Wesco ecommerce systems.

## Existing real capability to preserve

RFQ already supports:

- persistent local RFQ basket,
- product references,
- quantities,
- item notes,
- scope-bundle matching,
- missing-scope recommendations,
- full name,
- Egyptian phone validation,
- email validation,
- company,
- project location,
- project notes,
- server-side `/api/rfq` persistence,
- rate limit,
- Supabase-backed request creation,
- item persistence,
- internal notification pipeline,
- generated RFQ request code,
- WhatsApp fallback,
- success state,
- Track-RFQ link.

Do not break or replace this backend truth.

## RFQ production architecture

### Q01 — Request Header

Statement:

> **TURN THE SYSTEM INTO A REQUEST.**

Expose:
- current reference count,
- current unit count,
- request state,
- project path.

No fake pricing total.

### Q02 — Reference Ledger

Replace rounded product cards with an editable technical ledger.

Each line:
- exact code,
- name,
- category / brand,
- quantity controls,
- availability/price confirmation state,
- item note,
- remove.

### Q03 — Scope Signal

When project-bundle matching exists:
- show required coverage,
- missing requirements,
- real suggested products,
- add-to-basket action.

Do not claim the inferred bundle is the customer’s project; label it as a scope signal / best current match.

### Q04 — Project Sheet

Structured fields:
- contact identity,
- phone,
- email,
- company,
- project location,
- project notes.

Validation remains explicit and local.

### Q05 — Submission Gate

Primary:
- persist RFQ through `/api/rfq`.

Secondary:
- WhatsApp.

The page must clearly state:
- reference submission is not final quotation,
- price / availability / compatibility remain confirmed during review.

### Q06 — Receipt

On success:
- large request code,
- saved/received state,
- Track RFQ,
- Products,
- WhatsApp secondary path.

This is a technical receipt, not a green success card.

### Q07 — Empty Request

If basket is empty:
- explain that an itemized RFQ needs references,
- route to Physical Library,
- keep a direct project-only WhatsApp/contact path.

Do not fake-submit an empty RFQ to the API.

## Contact production architecture

### CTC01 — Contact Header

Statement:

> **CHOOSE THE SHORTEST PATH.**

Two intents:
- I have scope / references → RFQ
- I need to frame the project → direct contact

### CTC02 — Direct Channels

Expose only verified:
- WhatsApp
- phone
- email
- one Cairo address

### CTC03 — Prepare the Conversation

Quiet checklist:
- site / facility type,
- physical scope,
- approximate quantities / references,
- location,
- target timing,
- drawings / BOQ if available.

### CTC04 — Project handoff

Link to:
- RFQ,
- Company,
- Work / Evidence.

## Visual law

RFQ / Contact should feel:
- operational,
- precise,
- lower-intensity than Home / Products,
- visually continuous with HILTECH.

Use:
- technical ledger,
- strong typographic hierarchy,
- black / off-white / signal green,
- mono status labels,
- clear focus/error/success states.

Avoid:
- rounded SaaS cards,
- gradient panels,
- decorative WebGL,
- orange legacy CTAs,
- form-in-a-card templates.

## Responsive law

Mobile:
- item ledger stacks without losing exact code or quantity,
- form fields remain large and direct,
- submission action remains reachable,
- no horizontal overflow,
- request code remains readable,
- contact actions remain one tap.

## QA gate

Before lane closure:

- production build green,
- closed Home / Solutions / Services / Products / Work / Company smoke green,
- RFQ empty state reviewed desktop/mobile,
- RFQ populated state reviewed desktop/mobile,
- quantity edit,
- item remove,
- scope suggestion add,
- field validation,
- server success mocked or test-backed without corrupting production data,
- server error/WhatsApp fallback visible,
- request code receipt state covered where safely testable,
- Contact desktop/mobile reviewed,
- verified contact links correct,
- no legacy rounded/gradient shells in English RFQ/Contact,
- reduced motion usable,
- no horizontal clipping.

## Scope boundary

Arabic parity is intentionally deferred.

Final whole-site cross-route closure is intentionally deferred.

PR #183 remains **WIP / DO NOT MERGE**.
