'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SolutionItem } from '@/content/solutions';
import { productIntelligenceBySlug } from '@/content/product-intelligence';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  solution: SolutionItem;
};

const profileBySlug: Record<string, {
  code: string;
  className: string;
  thesis: string;
  routeLabel: string;
}> = {
  'structured-cabling': {
    code: 'ACCESS / 01',
    className: 'is-structured',
    thesis: 'ENDPOINTS BECOME A MAINTAINABLE SYSTEM.',
    routeLabel: 'ENDPOINT → PATCH → RACK',
  },
  'fiber-backbone': {
    code: 'CORE / 02',
    className: 'is-fiber',
    thesis: 'DISTANCE BECOMES A CONTROLLED OPTICAL PATH.',
    routeLabel: 'ROUTE → ODF → TRACE',
  },
  'data-rooms': {
    code: 'ROOM / 03',
    className: 'is-room',
    thesis: 'PATCHING, POWER, AND ACCESS BECOME ONE ROOM.',
    routeLabel: 'RACK → POWER → PATCH',
  },
  'cctv-infrastructure': {
    code: 'SECURITY / 04',
    className: 'is-cctv',
    thesis: 'CAMERAS ONLY WORK WHEN THE PHYSICAL PATH DOES.',
    routeLabel: 'CAMERA → PATH → CONTROL',
  },
  'network-testing': {
    code: 'VERIFY / 05',
    className: 'is-test',
    thesis: 'AN INSTALLED LINK IS NOT YET A VERIFIED LINK.',
    routeLabel: 'LINK → TEST → REPORT',
  },
  'project-supply-rfq': {
    code: 'PROCURE / 06',
    className: 'is-rfq',
    thesis: 'A BOQ BECOMES USEFUL WHEN EVERY LINE CAN BE CONFIRMED.',
    routeLabel: 'BOQ → MATCH → QUOTE',
  },
};

function DetailDiagram({ slug }: { slug: string }) {
  if (slug === 'structured-cabling') {
    return (
      <svg viewBox="0 0 900 620" aria-hidden="true">
        <g className="hiltech-solution-hero-diagram-main">
          <rect x="74" y="124" width="170" height="338" rx="5" />
          {Array.from({ length: 8 }).map((_, row) => (
            <g key={row}>
              <rect x="104" y={164 + row * 35} width="104" height="15" rx="2" />
              <circle cx="198" cy={171 + row * 35} r="3.5" />
            </g>
          ))}
          {[160, 278, 396, 514, 632, 750].map((x, i) => (
            <g key={x}>
              <rect x={x} y="502" width="76" height="38" rx="3" />
              <path d={`M210 ${171 + i * 35} C300 ${171 + i * 35}, 350 ${455 - i * 17}, ${x + 38} 502`} />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  if (slug === 'fiber-backbone') {
    return (
      <svg viewBox="0 0 900 620" aria-hidden="true">
        <g className="hiltech-solution-hero-diagram-main">
          <circle cx="150" cy="310" r="84" />
          <circle cx="750" cy="310" r="84" />
          <circle cx="150" cy="310" r="18" />
          <circle cx="750" cy="310" r="18" />
          {[-48,-20,8,36].map((offset) => (
            <path key={offset} d={`M170 ${310 + offset} C330 ${228 + offset * 0.25}, 560 ${390 - offset * 0.42}, 730 ${310 + offset}`} />
          ))}
          {[322, 456, 594].map((x, i) => <circle key={x} cx={x} cy={i % 2 ? 340 : 280} r="7" />)}
        </g>
      </svg>
    );
  }

  if (slug === 'data-rooms') {
    return (
      <svg viewBox="0 0 900 620" aria-hidden="true">
        <g className="hiltech-solution-hero-diagram-main">
          {[96, 276, 456, 636].map((x, rack) => (
            <g key={x}>
              <rect x={x} y="96" width="128" height="390" rx="5" />
              {Array.from({ length: 10 }).map((_, row) => <line key={row} x1={x + 18} y1={136 + row * 33} x2={x + 110} y2={136 + row * 33} />)}
              <circle cx={x + 98} cy={121 + rack * 8} r="4" />
            </g>
          ))}
          <path d="M70 528 H820" />
          <path d="M128 486 C238 548 360 504 460 532 S680 550 790 490" />
        </g>
      </svg>
    );
  }

  if (slug === 'cctv-infrastructure') {
    return (
      <svg viewBox="0 0 900 620" aria-hidden="true">
        <g className="hiltech-solution-hero-diagram-main">
          <rect x="100" y="90" width="700" height="430" rx="5" />
          <path d="M100 245 H800 M330 90 V520 M570 90 V520" />
          {[[160,160],[740,160],[160,448],[740,448],[450,160]].map(([x,y], index) => (
            <g key={index}>
              <circle cx={x} cy={y} r="29" />
              <path d={`M${x} ${y + 29} L450 330`} />
            </g>
          ))}
          <rect x="395" y="292" width="110" height="76" rx="4" />
          <circle cx="450" cy="330" r="8" />
        </g>
      </svg>
    );
  }

  if (slug === 'network-testing') {
    return (
      <svg viewBox="0 0 900 620" aria-hidden="true">
        <g className="hiltech-solution-hero-diagram-main">
          <rect x="92" y="126" width="140" height="118" rx="4" />
          <rect x="668" y="126" width="140" height="118" rx="4" />
          <path d="M220 186 C360 186 402 126 512 174 C578 204 610 186 680 186" />
          <circle cx="370" cy="174" r="7" />
          <circle cx="512" cy="174" r="7" />
          <path d="M118 452 L232 454 L250 420 L286 478 L346 458 L392 458 L414 388 L446 494 L498 458 L552 458 L578 430 L610 474 L780 462" />
          <line x1="118" y1="500" x2="780" y2="500" />
          <line x1="118" y1="352" x2="118" y2="518" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 900 620" aria-hidden="true">
      <g className="hiltech-solution-hero-diagram-main">
        <rect x="90" y="96" width="720" height="420" rx="5" />
        <line x1="90" y1="164" x2="810" y2="164" />
        <line x1="312" y1="96" x2="312" y2="516" />
        <line x1="620" y1="96" x2="620" y2="516" />
        {Array.from({ length: 7 }).map((_, row) => (
          <g key={row}>
            <line x1="114" y1={210 + row * 41} x2="786" y2={210 + row * 41} />
            <circle cx="134" cy={210 + row * 41} r="4" />
            <rect x="344" y={198 + row * 41} width="118" height="22" rx="2" />
            <rect x="658" y={198 + row * 41} width="104" height="22" rx="2" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function SolutionDetailExperience({ solution }: Props) {
  const rootRef = useRef<HTMLElement>(null);
  const profile = profileBySlug[solution.slug];

  const related = useMemo(
    () =>
      solution.relatedProductIntelligenceSlugs
        .map((slug) => productIntelligenceBySlug[slug])
        .filter(Boolean),
    [solution.relatedProductIntelligenceSlugs],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-solution-detail-title]', {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 8,
        duration: 1,
        ease: 'power4.out',
      });

      gsap.from('.hiltech-solution-detail-diagram', {
        opacity: 0,
        scale: 0.97,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('[data-solution-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 22,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 86%',
            once: true,
          },
        });
      });

      gsap.from('[data-solution-route-progress]', {
        scaleX: 0,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hiltech-solution-route',
          start: 'top 82%',
          end: 'bottom 62%',
          scrub: 0.45,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <main ref={rootRef} className={`hiltech-solution-detail ${profile.className}`}>
      <section className="hiltech-solution-detail-hero">
        <div className="hiltech-solution-detail-shell">
          <div className="hiltech-solution-detail-topline">
            <Link href="/solutions">SOLUTIONS</Link>
            <span>{profile.code}</span>
            <span>{solution.eyebrow}</span>
          </div>

          <div className="hiltech-solution-detail-hero-grid">
            <div>
              <span className="hiltech-solution-detail-kicker">{profile.routeLabel}</span>
              <h1 data-solution-detail-title>{solution.title}</h1>
              <p>{solution.intro}</p>
            </div>

            <div className="hiltech-solution-detail-diagram" data-solution-carry-target={solution.slug}>
              <div className="hiltech-solution-detail-diagram-head">
                <span>SYSTEM MODEL / ILLUSTRATIVE</span>
                <strong>{profile.code}</strong>
              </div>
              <DetailDiagram slug={solution.slug} />
            </div>
          </div>

          <div className="hiltech-solution-detail-thesis">
            <span>THE SYSTEM IDEA</span>
            <strong>{profile.thesis}</strong>
          </div>
        </div>
      </section>

      <section className="hiltech-solution-detail-problem">
        <div className="hiltech-solution-detail-shell">
          <div data-solution-reveal className="hiltech-solution-problem-grid">
            <div>
              <span>01 / THE FAILURE MODE</span>
              <h2>WHAT BREAKS<br /><em>WITHOUT A SYSTEM?</em></h2>
              <p>{solution.problemStatement}</p>
            </div>
            <div>
              <span>02 / HILTECH RESPONSE</span>
              <h3>{solution.shortTitle}</h3>
              <p>{solution.solutionSummary}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-solution-detail-outcomes">
        <div className="hiltech-solution-detail-shell">
          <div className="hiltech-solution-section-label">
            <span>03 / OUTCOME MODEL</span>
            <strong>WHAT CHANGES WHEN THE PATH IS ENGINEERED?</strong>
          </div>

          <div className="hiltech-solution-outcome-list">
            {solution.keyOutcomes.map((outcome, index) => (
              <article key={outcome} data-solution-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{outcome}</strong>
                <i aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-solution-detail-route">
        <div className="hiltech-solution-detail-shell">
          <div className="hiltech-solution-section-label is-dark">
            <span>04 / DELIVERY PATH</span>
            <strong>{profile.routeLabel}</strong>
          </div>

          <div className="hiltech-solution-route">
            <span data-solution-route-progress className="hiltech-solution-route-progress" aria-hidden="true" />
            {solution.implementationFlow.map((step, index) => (
              <article key={step} data-solution-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-solution-detail-scope">
        <div className="hiltech-solution-detail-shell">
          <div className="hiltech-solution-section-label">
            <span>05 / SCOPE & MATERIAL</span>
            <strong>WHAT HILTECH DELIVERS / WHAT THE SYSTEM USES</strong>
          </div>

          <div className="hiltech-solution-scope-grid">
            <div>
              <h2>DELIVERY SCOPE</h2>
              {solution.deliveryScope.map((item, index) => (
                <div key={item} data-solution-reveal>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>

            <div>
              <h2>TYPICAL COMPONENTS</h2>
              {solution.typicalComponents.map((item, index) => (
                <div key={item} data-solution-reveal>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-solution-detail-products">
        <div className="hiltech-solution-detail-shell">
          <div className="hiltech-solution-section-label is-dark">
            <span>06 / PRODUCT CONTEXT</span>
            <strong>MOVE FROM SYSTEM TO REFERENCE.</strong>
          </div>

          <div className="hiltech-solution-related-grid">
            {related.map((item, index) => (
              <Link key={item.slug} href={`/products-partners/intelligence/${item.slug}`} data-solution-reveal>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>PRODUCT INTELLIGENCE</small>
                <strong>{item.shortTitle}</strong>
                <em aria-hidden="true">↗</em>
              </Link>
            ))}
          </div>

          <div className="hiltech-solution-product-actions">
            <Link href="/products-partners">Browse current catalog <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>

      <section className="hiltech-solution-detail-rfq">
        <div className="hiltech-solution-detail-shell">
          <div className="hiltech-solution-rfq-grid">
            <div>
              <span>07 / BEFORE THE RFQ</span>
              <h2>DEFINE WHAT<br /><em>THE PROJECT NEEDS.</em></h2>
              <p>{solution.disclaimer}</p>
            </div>

            <div className="hiltech-solution-rfq-checklist">
              {solution.rfqChecklist.map((item, index) => (
                <div key={item} data-solution-reveal>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hiltech-solution-assurance">
            {solution.assuranceNotes.map((note) => <p key={note}>{note}</p>)}
          </div>

          <div className="hiltech-solution-final-actions">
            <Link href="/rfq">Start this RFQ <span aria-hidden="true">↗</span></Link>
            <Link href="/work">Inspect field evidence <span aria-hidden="true">↗</span></Link>
            <Link href="/contact">Contact HILTECH <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
