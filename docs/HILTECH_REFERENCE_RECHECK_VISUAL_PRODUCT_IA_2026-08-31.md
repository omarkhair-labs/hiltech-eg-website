# HILTECH — 2026 Reference Recheck / Visual Experience & Product IA

Status: **ACTIVE RESEARCH GATE — DO NOT MERGE PR #183 YET**  
Date: **2026-08-31**  
Branch: `redesign/creative-system-20260831`

## Why this recheck exists

The English production lanes are no longer being judged page-by-page only.

The new question is:

> Does HILTECH, as one complete website, reach the reference bar in visual system, motion, navigation, page hierarchy, hero behavior, product finding, and technical credibility — without turning into a generic award-site imitation?

This pass combines:
- the original HILTECH reference research and briefs,
- the current implementation,
- current 2026 creative-web case studies,
- current industrial / network-infrastructure catalogs,
- current product-finding research.

The goal is **not** to rebuild the site because another site uses more WebGL.

The goal is to identify where HILTECH should become more experiential, and where it should become faster and more direct.

---

# 1. Current HILTECH technical stack

Current repo truth:

- Next.js 14.2
- React 18.3
- TypeScript
- GSAP 3.15 + ScrollTrigger
- Three.js 0.185
- CSS / Tailwind foundation
- Playwright visual + interaction QA

This is already enough to build the target experience.

## Tool conclusion

Do **not** add libraries merely because references use them.

### Keep

- GSAP for choreography, scroll-linked state, transitions inside routes
- Three.js where 3D explains a physical system
- CSS for typography, grids, masks, index systems, responsive composition
- native mobile scrolling
- Playwright gates

### Not required now

- Lenis
- Barba / Taxi / Swup
- WebGPU migration
- a second animation framework
- a canvas library on every page

Why:

- PX PUSH uses Lenis but explicitly disables it on mobile.
- MERSI uses GSAP + Lenis + Taxi because its project-to-case-study transition is a core navigation mechanic.
- Cerebrium tested newer GPU architecture and reverted to WebGL when startup cost became unacceptable.
- HILTECH already has a working Three.js + GSAP system and reduced-motion / compact-render logic.

The stronger layer should come from **behavior and continuity**, not dependency count.

---

# 2. New 2026 creative references

## Cerebrium — Making Serverless Infrastructure Tangible

Reference:
https://tympanus.net/codrops/2026/07/23/building-cerebrium-making-serverless-infrastructure-tangible/

Primary lesson:

> Invisible infrastructure can be explained by interaction itself.

Cerebrium does not rely on long explanatory diagrams alone. Network paths, pulses, environments, and interaction make the infrastructure feel tangible.

HILTECH translation:

- signal paths should visibly behave like paths,
- route changes should feel like system changes,
- testing / verification can use state changes rather than more paragraphs,
- 3D should explain connectivity, not decorate a section.

This strongly validates the HILTECH Home and Product World direction.

## PX PUSH — One governing idea across the entire website

Reference:
https://tympanus.net/codrops/2026/08/07/the-department-is-open-building-the-px-push-website/

Primary lesson:

One governing concept controls:
- navigation,
- UI framing,
- 3D scenes,
- copy tone,
- page transitions,
- object selection.

HILTECH governing concept:

> **THE PHYSICAL LAYER**
>
> BUILD → ROUTE → TEST → PROVE

The site should become more consistent because every behavior comes from this idea — not because every page shares the same layout.

## MERSI — Composed pages, not repeated templates

Reference:
https://tympanus.net/codrops/2026/07/27/between-print-and-digital-the-making-of-mersis-website/

Primary lessons:

- pages are composed rather than filled,
- typography is structural,
- imagery is material,
- project transitions can become physical objects,
- the same system can produce different page compositions.

HILTECH translation:

- keep lane-specific compositions,
- avoid returning to repeated “big heading + media + copy” chapters,
- page transitions may become a later enhancement if they reinforce physical-layer continuity.

## Chems.Studio — Archive, not portfolio template

Reference:
https://tympanus.net/codrops/2026/08/08/designing-a-flexible-digital-archive-for-chems-studios-creative-practice/

Primary lesson:

The underlying structure stays recognizable while its tempo changes.

This confirms the recent Work correction:
- Work should be an evidence archive,
- not another Services page,
- motion should support scanning and discovery,
- not demand attention on every transition.

## Garden Eight — Motion, interaction, WebGL and IA are one design problem

Reference:
https://tympanus.net/codrops/2026/07/24/the-art-of-continuous-transformation-how-garden-eight-blends-integrity-with-play/

Primary lessons:

- motion is not decoration,
- user flow must remain uninterrupted,
- WebGL is chosen according to project purpose,
- design and implementation are refined together,
- continuity between index and detail can be stronger than a conventional page cut.

HILTECH translation:

The next visual layer should be judged by:
- does it improve orientation?
- does it explain the physical system?
- does it create continuity?
- does it remain usable and performant?

If not, do not add it.

---

# 3. Original references remain valid

## HackFirst

https://hackfirst.io/

Keep influence:
- cinematic opening,
- aggressive scale,
- controlled visual world,
- section pacing,
- non-generic corporate presence.

Do not copy:
- cybersecurity threat aesthetic,
- darkness on every route,
- long marketing repetition.

Important finding:

HackFirst itself has distinct Services, About, and Contact routes. Its strong home does not mean every route repeats the same home grammar.

## Crosswire / Unseen

https://unseen.co/projects/crosswire/

Keep influence:

A complex technical service is represented by one spatial system derived from the brand.

HILTECH interpretation:

3D is strongest when:
- the visual object represents a system,
- animation represents a feature or state,
- the metaphor remains legible.

## PerimeterWatch / Non-Linear

https://non-linear.studio/work/perimeterwatch/

Keep influence:

Strong technical identity without needing a large corporate photo library.

HILTECH interpretation:

Use:
- route graphics,
- topology,
- system objects,
- typography,
- controlled 3D.

Do not compensate for weak photography by repeating the same field images.

## Integrated Reasoning / Non-Linear

https://non-linear.studio/work/integrated-reasoning

Keep influence:

The technology itself produces the visual language.

For HILTECH:
- line,
- path,
- port,
- termination,
- wavelength,
- rack unit,
- endpoint,
- test trace,
- continuity state

should remain the primary visual primitives.

---

# 4. Industrial / product references — the important new answer

The key research question:

> Is it realistic for a Products experience to have multiple layers before an exact product?

**Yes — especially in technical / industrial catalogs.**

But there is an important distinction:

> Multiple information layers are valid.  
> Forcing every user through every layer is not.

## Corning Optical Communications

Products:
https://www.corning.com/optical-communications/worldwide/en/home/products.html

Example hierarchy:

1. Products
2. Fiber Optic
3. Connectivity
4. Field Installable
5. UniCam family
6. exact product number

Corning therefore proves that technical products often need several semantic levels before an exact code.

The user can also enter deep through:
- search,
- direct URLs,
- known product families,
- product numbers.

## Panduit

https://www.panduit.com/en/products/fiber-optic-systems.html

Typical hierarchy:

1. Fiber Optic Systems
2. Product Category
3. subcategory / system
4. exact reference

Again: system context comes before exact SKUs.

## Leviton Network Solutions

https://leviton.com/products/network-solutions

Typical hierarchy:

1. Network Solutions
2. Copper / Fiber / AV systems
3. product type
4. family
5. exact product

The site also exposes:
- quick product links,
- all-products index,
- configurators,
- technical resources.

This is the right model for HILTECH conceptually:
**exploration + exact finding + project configuration**.

## Belden Global Catalog

https://catalog.belden.com/

Belden starts with major technical families:
- Wire & Cable
- Connectors & Outlets
- Assemblies / Cordsets
- etc.

Each then branches further before the exact product.

This is normal for a large technical catalog.

## Q-Industrial

https://www.q-industrial.com/en-de
https://www.q-industrial.com/en-de/catalog

Q-Industrial shows the other valid model:

- strong industrial brand experience,
- then a relatively direct catalog.

Meaning:

There is no rule saying a product site must always be deep.

Catalog depth should match:
- catalog size,
- technical complexity,
- how much context users need before choosing.

---

# 5. Product-finding research — where the limit is

Baymard references:

https://baymard.com/learn/ecommerce-category-page
https://baymard.com/blog/mobile-ecommerce-search-and-navigation
https://baymard.com/blog/main-navigation-product-categories

Relevant research findings:

- intermediary category pages can legitimately occupy the first **1–3 hierarchy levels** of large catalogs,
- category pages are useful when users do not yet know the exact product,
- overly deep category hierarchies become harmful when users must repeatedly choose categories before seeing products,
- 5–7 mandatory category selections produced serious navigation problems in testing,
- mobile users need obvious product/category entry paths,
- search and direct navigation must coexist with browsing.

Important limitation:

Baymard research is primarily ecommerce research, not network-infrastructure RFQ procurement.

We use it for product-finding principles, not as a literal template for HILTECH.

---

# 6. HILTECH current Product architecture — actual repo truth

Current route:

`/products-partners`

Current Product page is **not** three forced page loads before a product.

It currently contains:

1. Hero — Physical Library / procurement model
2. Procurement mode switch
3. Product World — family / system context
4. Exact Finding — code / spec / brand search
5. Technical Reference Index — current exact references
6. Technical Intelligence — optional deep guides
7. RFQ / project-building route

Exact product links already exist directly in the Technical Reference Index:

- image → Product Detail
- title → Product Detail
- DETAIL → Product Detail

Technical Intelligence is optional.

So current architecture is:

> **SYSTEM → FAMILY → REFERENCE → PROJECT FIT → RFQ**

but users who already know the reference can go directly:

> **SEARCH / CODE → REFERENCE → DETAIL / RFQ**

This is fundamentally sound.

---

# 7. Product decision after research

## Keep the layered Product experience

Do **not** flatten Products into a generic card grid at the top.

Why:

- HILTECH sells technical context and project supply, not impulse retail.
- Corning / Panduit / Leviton / Belden all use system/category layers.
- Product World gives HILTECH a differentiated physical-infrastructure identity.
- the 3D world has an explanatory job.

## But do not force the cinematic path

The Products hero should continue to introduce the physical library.

Immediately after / within the opening, the visitor must have a clear fast lane:

- **I KNOW THE CODE → EXACT FINDING**
- **I KNOW THE SYSTEM → PRODUCT WORLD**
- **I KNOW THE PROJECT → BUILD BY PROJECT**

A user with `CAT6`, `ODF`, a brand, or an exact part code should not need to consume the Product World before reaching the finder.

### Required Product enhancement

Add an early “entry mode” / quick-route control before the long exploration begins.

This is not a new page.

It is a choice of path into the same Product system.

---

# 8. Navigation / Header conclusion

Current creative desktop navigation:

- Solutions
- Capabilities
- Products
- Work
- Company
- Search
- RFQ
- Start a Project

This is structurally strong.

## Do not move Products to the first visual position just because it contains products

The references do not support that rule.

Examples:
- HackFirst leads with the company proposition / solution, not a catalog.
- Hyperframe leads with the system and how it changes construction.
- Effortel leads with platform / business outcome.
- Q-Industrial leads with industry proposition and then offers catalog exploration.
- network manufacturers expose Products prominently, but still organize them through technical families.

HILTECH is both:
- infrastructure delivery company,
- project supply / procurement surface.

Therefore Products being one primary top-level route is correct.

What matters is **findability**, not first position.

---

# 9. Hero conclusion

HILTECH Home hero remains strong conceptually:

> EVERY SIGNAL NEEDS A PHYSICAL PATH.

It is more ownable than a generic:
- “network solutions”
- “connected future”
- “engineering excellence”

Do not replace it.

Potential next-level improvement should be:
- a stronger relationship between the signal route and user movement,
- not simply more particles,
- not another background loop.

The user should feel that the route is an actual system state.

---

# 10. Stronger visual-experience layer — YES, but targeted

The research supports a stronger experience layer.

It does **not** support making every route heavier.

## Layer A — Cross-route continuity

Potential later experiment:

When leaving:
- Solutions → Product family
- Product family → Product detail
- Work index → evidence state

carry a visual primitive across the transition:
- route line,
- node,
- selected object,
- evidence frame.

This would create continuity similar in principle to:
- MERSI’s project-cover transition,
- Garden Eight’s continuous state changes.

Do not implement globally until performance and routing behavior are tested.

## Layer B — Product World state change

High-value experiment:

Selecting a family should feel like the **same physical system reconfiguring**, not eight unrelated mini-scenes.

Current Three.js implementation already changes family scenes.

Next visual R&D can improve:
- continuity between family states,
- camera relationship,
- object morph / route persistence,
- transition from semantic world to reference index.

## Layer C — System state instead of explanation

Use interaction to replace some text:

Examples:
- ROUTE state
- TERMINATED state
- VERIFIED state
- FAILURE / UNVERIFIED state

This follows Cerebrium more closely than adding decorative animation.

## Layer D — Navigation as physical routing

The header/footer are now flatter and more engineered.

Potential improvement:
- active route can be treated like an active signal / line,
- page changes can update that route,
- without turning navigation into a game.

## Layer E — Mobile stays native-first

Do not force desktop cinematic behavior onto phone.

Keep:
- native scrolling,
- reduced Three.js pixel ratio,
- simplified state,
- touch-friendly rails,
- reduced motion support.

---

# 11. Site comparison — current position

## Already strong

- unique governing idea: physical layer
- Home art direction
- Product semantic 3D
- exact product finder + RFQ path
- Work evidence discipline
- Company systemic direction
- evidence-safe claims
- visual distinction between major lanes
- responsive QA becoming unusually strict

## Still below strongest references

### 1. Cross-page continuity

References like MERSI / Garden Eight make page entry feel like a continuation of the previous state.

HILTECH currently still relies mostly on conventional route changes.

### 2. Motion language is strong locally but not yet one full-site choreography

Home has the clearest motion language.

Other routes have lane-specific motion, but the whole website can become more coherent through state transitions.

### 3. Product opening needs a faster expert path

The layered IA is valid.

But exact-code users should see the shortcut immediately.

### 4. Some long explanatory copy can become behavior

Cerebrium is the strongest reminder here.

The next visual improvement should often remove explanation rather than add effects.

---

# 12. Final direction from this research

Do not redesign HILTECH from zero.

Do not flatten Products.

Do not chase a new animation library.

Do not make Products the first thing on every page.

Do not force users through three cinematic gates.

### Do

1. Finish Mobile QA.
2. Lock this reference recheck.
3. Add Product quick-entry path:
   - exact reference,
   - system family,
   - project scope.
4. Run a focused visual R&D pass for:
   - Product World continuity,
   - cross-route object / route continuity,
   - interaction-as-explanation.
5. Compare full-page screenshots again against:
   - HackFirst
   - Integrated Reasoning
   - PerimeterWatch
   - Crosswire
   - Cerebrium
   - PX PUSH
   - MERSI
   - Chems.Studio
   - Garden Eight
   - Hyperframe
   - Q-Industrial
   - Effortel
6. Keep industrial catalog IA grounded against:
   - Corning
   - Panduit
   - Leviton
   - Belden
7. Only promote experiments that survive:
   - mobile,
   - reduced motion,
   - performance,
   - navigation clarity,
   - evidence rules.

PR #183 remains **WIP / DO NOT MERGE** until this synthesis pass and deferred gates are complete.
