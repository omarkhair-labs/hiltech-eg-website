'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/content/site';

gsap.registerPlugin(ScrollTrigger);

const operatingInterfaces = [
  {
    index: '01',
    label: 'SCOPE',
    statement: 'Translate the project into a physical infrastructure requirement.',
    note: 'Routes, rooms, endpoints, media, constraints, and the information needed before supply or execution.',
  },
  {
    index: '02',
    label: 'SYSTEM',
    statement: 'Keep the parts connected to the system they belong to.',
    note: 'Fiber, copper, racks, pathways, endpoints, CCTV connectivity, and project supply are treated as one physical layer.',
  },
  {
    index: '03',
    label: 'FIELD',
    statement: 'Stay close to what must be routed, terminated, organized, and installed.',
    note: 'The company identity is tied to execution conditions, not only drawings or product lists.',
  },
  {
    index: '04',
    label: 'VERIFY',
    statement: 'Leave a path toward testing, documentation, and handover.',
    note: 'Final acceptance remains project-specific, but validation is part of the delivery logic from the start.',
  },
] as const;

const technicalTruths = [
  {
    code: 'ROUTE / 01',
    title: 'ROUTES',
    body: 'Infrastructure begins as a physical path through ceilings, risers, rooms, pathways, cabinets, and endpoint zones.',
    href: '/services',
    link: 'CAPABILITIES',
  },
  {
    code: 'TERMINATE / 02',
    title: 'TERMINATIONS',
    body: 'Fiber, copper, patching, and endpoint interfaces turn routes into usable network connections.',
    href: '/solutions',
    link: 'SOLUTIONS',
  },
  {
    code: 'SPACE / 03',
    title: 'TECHNICAL SPACES',
    body: 'Racks, power, patching, cable management, and access discipline determine whether the system remains serviceable.',
    href: '/products-partners',
    link: 'PRODUCTS',
  },
  {
    code: 'VERIFY / 04',
    title: 'VERIFICATION',
    body: 'Testing tools and field checks make the transition from installed infrastructure toward a documented handover.',
    href: '/work',
    link: 'FIELD EVIDENCE',
  },
] as const;

function CompanySystemMap() {
  return (
    <svg
      className="hiltech-company-system-map"
      viewBox="0 0 760 520"
      role="img"
      aria-label="Illustrative HILTECH operating map from project scope through handover"
    >
      <rect width="760" height="520" fill="#08100a" />
      <path d="M0 104H760M0 260H760M0 416H760M152 0V520M380 0V520M608 0V520" stroke="#dce8df" strokeOpacity=".05" />
      <g className="hiltech-company-map-route">
        <path data-company-system-line d="M74 122 H224 V218 H380 V154 H548 V286 H690" fill="none" stroke="#8ff257" strokeWidth="2.5" />
        <path d="M224 218 V356 H420" fill="none" stroke="#405347" strokeWidth="1.5" />
        <path d="M548 286 V390 H670" fill="none" stroke="#405347" strokeWidth="1.5" />
      </g>

      {[
        [74, 122, 'SCOPE', '01'],
        [224, 218, 'ROUTE', '02'],
        [380, 154, 'TERMINATE', '03'],
        [548, 286, 'SPACE', '04'],
        [690, 286, 'VERIFY', '05'],
        [420, 356, 'FIELD', '06'],
        [670, 390, 'HANDOVER', '07'],
      ].map(([x, y, label, index]) => (
        <g
          key={String(label)}
          data-company-system-node
          transform={'translate(' + x + ' ' + y + ')'}
        >
          <circle r="8" fill={label === 'VERIFY' ? '#8ff257' : '#0b140d'} stroke="#8ff257" strokeWidth="1.4" />
          <circle r="2.5" fill={label === 'VERIFY' ? '#071006' : '#8ff257'} />
          <text x="14" y="-7" fill="#8ff257" fontSize="9" fontFamily="monospace" letterSpacing="1">{index}</text>
          <text x="14" y="9" fill="#b9c5bd" fontSize="10" fontFamily="monospace" letterSpacing="1">{label}</text>
        </g>
      ))}

      <text x="34" y="482" fill="#6f7e74" fontSize="9" fontFamily="monospace" letterSpacing="1.2">
        PROJECT REQUIREMENT → PHYSICAL SYSTEM → FIELD CONDITION → VERIFICATION
      </text>
    </svg>
  );
}

export default function CompanyExperience() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-company-hero-kicker], [data-company-hero-title], [data-company-hero-copy]', {
        opacity: 0,
        y: 18,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      });

      const systemStage = document.querySelector<HTMLElement>('.hiltech-company-system-stage');

      if (systemStage) {
        const playSystemMap = () => {
          if (systemStage.dataset.companyMapAnimated === 'true') return;
          systemStage.dataset.companyMapAnimated = 'true';

          const line = systemStage.querySelector<SVGPathElement>('[data-company-system-line]');
          const nodes = systemStage.querySelectorAll<SVGGElement>('[data-company-system-node]');
          const timeline = gsap.timeline();

          if (line) {
            timeline.fromTo(
              line,
              { strokeDasharray: 900, strokeDashoffset: 900 },
              { strokeDasharray: 900, strokeDashoffset: 0, duration: 1.35, ease: 'power2.out' },
            );
          }

          if (nodes.length) {
            timeline.fromTo(
              nodes,
              { opacity: 0 },
              { opacity: 1, duration: 0.3, stagger: 0.065, ease: 'power2.out' },
              line ? '-=0.72' : 0,
            );
          }
        };

        ScrollTrigger.create({
          trigger: systemStage,
          start: () => window.matchMedia('(max-width: 639px)').matches ? 'top 92%' : 'top 72%',
          once: true,
          invalidateOnRefresh: true,
          onEnter: playSystemMap,
        });

        window.requestAnimationFrame(() => ScrollTrigger.refresh());
        document.fonts?.ready.then(() => ScrollTrigger.refresh()).catch(() => undefined);
      }

      gsap.utils.toArray<HTMLElement>('[data-company-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 18,
          duration: 0.62,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        });
      });

      gsap.to('[data-company-route-line]', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-company-position]',
          start: 'top 76%',
          end: 'bottom 76%',
          scrub: 0.35,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <main className="hiltech-company-page">
      <section className="hiltech-company-hero" data-route-identity="operating-map">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-topline">
            <span>COMPANY / OPERATING IDENTITY</span>
            <span>CAIRO / EGYPT</span>
          </div>

          <div className="hiltech-company-hero-system">
            <div>
              <span data-company-hero-kicker>HILTECH / H.N.S</span>
              <h1 data-company-hero-title>
                BUILT AROUND<br />
                <em>THE PHYSICAL LAYER.</em>
              </h1>
              <p data-company-hero-copy>
                HILTECH is an Egypt-based network infrastructure delivery team working between project requirements and the physical systems that must be routed, terminated, organized, tested, and handed over.
              </p>
            </div>

            <div className="hiltech-company-system-stage">
              <div>
                <span>OPERATING MAP / ILLUSTRATIVE</span>
                <strong>{site.officialName}</strong>
              </div>
              <CompanySystemMap />
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-company-position" data-company-position>
        <div className="hiltech-company-shell">
          <div className="hiltech-company-section-label">
            <span>01 / OPERATING POSITION</span>
            <strong>BETWEEN THE DRAWING AND THE HANDOVER.</strong>
          </div>

          <div className="hiltech-company-position-note" data-company-reveal>
            <span>POSITION</span>
            <strong>
              Company identity is the set of interfaces HILTECH stays accountable to while infrastructure moves from requirement to physical delivery.
            </strong>
          </div>

          <div className="hiltech-company-route-track">
            <i data-company-route-line />
          </div>

          <div className="hiltech-company-interface-index">
            {operatingInterfaces.map((item) => (
              <article key={item.index} data-company-reveal>
                <span>{item.index}</span>
                <div>
                  <small>{item.label}</small>
                  <h3>{item.statement}</h3>
                </div>
                <p>{item.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-company-truths">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-section-label is-dark">
            <span>02 / TECHNICAL TRUTHS</span>
            <strong>THE COMPANY STAYS CLOSE TO FOUR PHYSICAL CONDITIONS.</strong>
          </div>

          <div className="hiltech-company-truth-index">
            {technicalTruths.map((item) => (
              <article key={item.code} data-company-reveal>
                <span>{item.code}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
                <Link href={item.href}>{item.link} <b aria-hidden="true">↗</b></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-company-presence">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-section-label">
            <span>03 / VERIFIED PRESENCE</span>
            <strong>ONE PUBLISHED LOCATION / DIRECT CHANNELS</strong>
          </div>

          <div className="hiltech-company-presence-endpoint">
            <div data-company-reveal>
              <span>CAIRO / ENDPOINT 01</span>
              <strong>ONE VERIFIED POINT OF CONTACT.</strong>
              <p>
                HILTECH currently publishes one physical Cairo address. The site does not create a branch network that the available company data does not support.
              </p>
            </div>

            <address data-company-reveal>
              <div>
                <span>ADDRESS</span>
                <strong>{site.contact.addressEn}</strong>
              </div>
              <div>
                <span>PHONE</span>
                <a href={'tel:' + site.contact.phone}>{site.contact.phone}</a>
              </div>
              <div>
                <span>WHATSAPP / RFQ</span>
                <a href={site.contact.whatsappGeneralLink} target="_blank" rel="noreferrer">{site.contact.whatsappLocal}</a>
              </div>
              <div>
                <span>EMAIL</span>
                <a href={'mailto:' + site.contact.email}>{site.contact.email}</a>
              </div>
            </address>
          </div>
        </div>
      </section>

      <section className="hiltech-company-proof">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-section-label is-dark">
            <span>04 / PROOF NETWORK</span>
            <strong>FOLLOW THE DEEPER SYSTEM INSTEAD OF REPEATING IT HERE.</strong>
          </div>

          <nav className="hiltech-company-proof-index" aria-label="Company proof routes" data-company-reveal>
            <Link href="/work"><span>01</span><strong>Work / Field Evidence</strong><em>PROOF ↗</em></Link>
            <Link href="/solutions"><span>02</span><strong>Solutions / System Context</strong><em>PATH ↗</em></Link>
            <Link href="/services"><span>03</span><strong>Capabilities / Field Execution</strong><em>FIELD ↗</em></Link>
            <Link href="/products-partners"><span>04</span><strong>Products / Physical Library</strong><em>OBJECT ↗</em></Link>
          </nav>
        </div>
      </section>

      <section className="hiltech-company-close">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-close-row" data-company-reveal>
            <div>
              <span>05 / PROJECT ENTRY</span>
              <strong>DEFINED REFERENCES → RFQ. UNDEFINED SCOPE → DIRECT CONTACT.</strong>
            </div>
            <nav>
              <Link href="/rfq">START RFQ <span aria-hidden="true">↗</span></Link>
              <Link href="/contact">CONTACT HILTECH <span aria-hidden="true">↗</span></Link>
              <a href="https://raw.githubusercontent.com/omarkhair-labs/hiltech-eg-website/main/public/hiltech-company-profile.pdf" target="_blank" rel="noreferrer">COMPANY PROFILE <span aria-hidden="true">↗</span></a>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
