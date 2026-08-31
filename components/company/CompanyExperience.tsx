'use client';

import Image from 'next/image';
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
    image: '/copper-cable-tray.jpg',
    href: '/services',
    link: 'CAPABILITIES',
  },
  {
    code: 'TERMINATE / 02',
    title: 'TERMINATIONS',
    body: 'Fiber, copper, patching, and endpoint interfaces turn routes into usable network connections.',
    image: '/fiber-splicing-workbench.jpg',
    href: '/solutions',
    link: 'SOLUTIONS',
  },
  {
    code: 'SPACE / 03',
    title: 'TECHNICAL SPACES',
    body: 'Racks, power, patching, cable management, and access discipline determine whether the system remains serviceable.',
    image: '/rack-data-room.jpg',
    href: '/products-partners',
    link: 'PRODUCTS',
  },
  {
    code: 'VERIFY / 04',
    title: 'VERIFICATION',
    body: 'Testing tools and field checks make the transition from installed infrastructure toward a documented handover.',
    image: '/testing-field-device.jpg',
    href: '/work',
    link: 'FIELD EVIDENCE',
  },
] as const;

export default function CompanyExperience() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-company-hero-kicker], [data-company-hero-title], [data-company-hero-copy]', {
        opacity: 0,
        y: 20,
        duration: 0.82,
        stagger: 0.09,
        ease: 'power3.out',
      });

      gsap.from('[data-company-hero-media]', {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.035,
        duration: 1.08,
        delay: 0.14,
        ease: 'power4.out',
      });

      gsap.utils.toArray<HTMLElement>('[data-company-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 24,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-company-truth-media]').forEach((element) => {
        gsap.from(element, {
          clipPath: 'inset(12% 0 12% 0)',
          scale: 1.03,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            end: 'center 55%',
            scrub: 0.45,
          },
        });
      });

      gsap.to('[data-company-route-line]', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-company-position]',
          start: 'top 72%',
          end: 'bottom 74%',
          scrub: 0.4,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <main className="hiltech-company-page">
      <section className="hiltech-company-hero">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-topline">
            <span>COMPANY / OPERATING IDENTITY</span>
            <span>CAIRO / EGYPT</span>
          </div>

          <div className="hiltech-company-hero-grid">
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

            <div className="hiltech-company-hero-media" data-company-hero-media>
              <Image
                src="/rack-front-cabling.jpg"
                alt="Network rack and structured cabling field context."
                fill
                priority
                sizes="(max-width: 900px) 92vw, 48vw"
                className="object-cover"
              />
              <div>
                <span>OFFICIAL NAME</span>
                <strong>{site.officialName}</strong>
              </div>
            </div>
          </div>

          <div className="hiltech-company-route">
            <span>PROJECT REQUIREMENT</span><i />
            <span>PHYSICAL SYSTEM</span><i />
            <span>FIELD EXECUTION</span><i />
            <span>HANDOVER</span>
          </div>
        </div>
      </section>

      <section className="hiltech-company-position" data-company-position>
        <div className="hiltech-company-shell">
          <div className="hiltech-company-section-label">
            <span>01 / OPERATING POSITION</span>
            <strong>WHERE HILTECH SITS IN THE PROJECT.</strong>
          </div>

          <div className="hiltech-company-position-intro" data-company-reveal>
            <h2>
              BETWEEN THE DRAWING<br />
              <em>AND THE HANDOVER.</em>
            </h2>
            <p>
              Company identity is not a list of departments. It is the set of interfaces HILTECH stays accountable to while infrastructure moves from requirement to physical delivery.
            </p>
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
            <strong>WHAT THE COMPANY STAYS CLOSE TO.</strong>
          </div>

          <div className="hiltech-company-truths-intro" data-company-reveal>
            <h2>
              THE COMPANY IS<br />
              <em>WHERE THE SYSTEM BECOMES REAL.</em>
            </h2>
            <p>
              Detailed capability, solution, product, and evidence pages carry the depth. Company keeps the operating worldview visible without duplicating them.
            </p>
          </div>

          <div className="hiltech-company-truth-list">
            {technicalTruths.map((item, index) => (
              <article key={item.code} className={index % 2 ? 'is-reverse' : undefined} data-company-reveal>
                <div className="hiltech-company-truth-media" data-company-truth-media>
                  <Image
                    src={item.image}
                    alt={item.title.toLowerCase() + ' field context.'}
                    fill
                    sizes="(max-width: 900px) 92vw, 55vw"
                    className="object-cover"
                  />
                  <span>{item.code}</span>
                </div>

                <div className="hiltech-company-truth-copy">
                  <span>{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link href={item.href}>{item.link} <b aria-hidden="true">↗</b></Link>
                </div>
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

          <div className="hiltech-company-presence-grid">
            <div data-company-reveal>
              <span>CAIRO / EGYPT</span>
              <h2>
                ONE VERIFIED<br />
                <em>POINT OF CONTACT.</em>
              </h2>
              <p>
                HILTECH currently publishes one physical Cairo address. The site does not create a Locations network or branch count that the available company data does not support.
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
            <strong>THE COMPANY PAGE DOES NOT REPEAT THE WHOLE SITE.</strong>
          </div>

          <div className="hiltech-company-proof-grid">
            <div data-company-reveal>
              <h2>
                FOLLOW THE<br />
                <em>ACTUAL PROOF.</em>
              </h2>
            </div>

            <nav aria-label="Company proof routes" data-company-reveal>
              <Link href="/work"><span>01</span><strong>Work / Field Evidence</strong><em>↗</em></Link>
              <Link href="/solutions"><span>02</span><strong>Solutions / System Context</strong><em>↗</em></Link>
              <Link href="/services"><span>03</span><strong>Capabilities / Field Execution</strong><em>↗</em></Link>
              <Link href="/products-partners"><span>04</span><strong>Products / Physical Library</strong><em>↗</em></Link>
            </nav>
          </div>
        </div>
      </section>

      <section className="hiltech-company-close">
        <div className="hiltech-company-shell">
          <div className="hiltech-company-close-grid">
            <div data-company-reveal>
              <span>05 / START A PROJECT</span>
              <h2>
                DEFINE THE SCOPE.<br />
                <em>MAKE CONTACT DIRECT.</em>
              </h2>
            </div>
            <div data-company-reveal>
              <p>
                Start with a structured RFQ when the project already has references or quantities. Use direct contact when the scope still needs to be framed.
              </p>
              <div>
                <Link href="/rfq">START RFQ <span aria-hidden="true">↗</span></Link>
                <Link href="/contact">CONTACT HILTECH <span aria-hidden="true">↗</span></Link>
                <a href="/hiltech-company-profile.pdf" target="_blank" rel="noreferrer">COMPANY PROFILE <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
