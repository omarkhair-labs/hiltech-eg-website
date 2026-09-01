'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { solutions } from '@/content/solutions';
import { emitRouteContinuity, shouldInterceptRouteClick } from '@/lib/route-continuity';

gsap.registerPlugin(ScrollTrigger);

type DiagramKind = 'structured' | 'fiber' | 'room' | 'cctv' | 'test' | 'rfq';

const profileBySlug: Record<string, { code: string; kind: DiagramKind; mode: string }> = {
  'structured-cabling': { code: 'ACCESS / 01', kind: 'structured', mode: 'ENDPOINT → PATCH → RACK' },
  'fiber-backbone': { code: 'CORE / 02', kind: 'fiber', mode: 'ROUTE → ODF → TRACE' },
  'data-rooms': { code: 'ROOM / 03', kind: 'room', mode: 'RACK → POWER → PATCH' },
  'cctv-infrastructure': { code: 'SECURITY / 04', kind: 'cctv', mode: 'CAMERA → PATH → CONTROL' },
  'network-testing': { code: 'VERIFY / 05', kind: 'test', mode: 'LINK → TEST → REPORT' },
  'project-supply-rfq': { code: 'PROCURE / 06', kind: 'rfq', mode: 'BOQ → MATCH → QUOTE' },
};

function SolutionDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === 'structured') {
    return (
      <svg viewBox="0 0 800 560" aria-hidden="true">
        <g className="hiltech-solutions-diagram-main">
          <rect x="76" y="112" width="156" height="318" rx="4" />
          {Array.from({ length: 7 }).map((_, row) => (
            <g key={row}>
              <rect x="104" y={148 + row * 36} width="98" height="16" rx="2" />
              <circle cx="190" cy={156 + row * 36} r="3.8" />
            </g>
          ))}
          {[132, 238, 344, 450, 556, 662].map((x, i) => (
            <g key={x}>
              <rect x={x} y="458" width="70" height="36" rx="3" />
              <path d={`M202 ${156 + i * 36} C290 ${156 + i * 36}, 340 ${430 - i * 20}, ${x + 35} 458`} />
            </g>
          ))}
        </g>
      </svg>
    );
  }

  if (kind === 'fiber') {
    return (
      <svg viewBox="0 0 800 560" aria-hidden="true">
        <g className="hiltech-solutions-diagram-main">
          <circle cx="130" cy="280" r="72" />
          <circle cx="670" cy="280" r="72" />
          <circle cx="130" cy="280" r="16" />
          <circle cx="670" cy="280" r="16" />
          {[-42, -18, 8, 34].map((offset) => (
            <path key={offset} d={`M148 ${280 + offset} C295 ${210 + offset * 0.25}, 502 ${350 - offset * 0.4}, 652 ${280 + offset}`} />
          ))}
          {[285, 400, 520].map((x, index) => <circle key={x} cx={x} cy={index % 2 ? 305 : 255} r="6" />)}
        </g>
      </svg>
    );
  }

  if (kind === 'room') {
    return (
      <svg viewBox="0 0 800 560" aria-hidden="true">
        <g className="hiltech-solutions-diagram-main">
          {[102, 270, 438, 606].map((x, rack) => (
            <g key={x}>
              <rect x={x} y="96" width="116" height="350" rx="4" />
              {Array.from({ length: 9 }).map((_, row) => <line key={row} x1={x + 16} y1={132 + row * 32} x2={x + 100} y2={132 + row * 32} />)}
              <circle cx={x + 88} cy={120 + rack * 6} r="4" />
            </g>
          ))}
          <path d="M70 486 H732" />
          <path d="M132 446 C232 508 350 466 436 492 S628 518 700 456" />
        </g>
      </svg>
    );
  }

  if (kind === 'cctv') {
    return (
      <svg viewBox="0 0 800 560" aria-hidden="true">
        <g className="hiltech-solutions-diagram-main">
          <rect x="112" y="100" width="576" height="356" rx="4" />
          <path d="M112 230 H688 M310 100 V456 M514 100 V456" />
          {[[168,160],[628,160],[168,396],[628,396],[410,160]].map(([x,y], index) => (
            <g key={index}>
              <circle cx={x} cy={y} r="25" />
              <path d={`M${x} ${y + 25} L400 306`} />
            </g>
          ))}
          <rect x="352" y="270" width="96" height="72" rx="3" />
          <circle cx="400" cy="306" r="7" />
        </g>
      </svg>
    );
  }

  if (kind === 'test') {
    return (
      <svg viewBox="0 0 800 560" aria-hidden="true">
        <g className="hiltech-solutions-diagram-main">
          <rect x="92" y="128" width="126" height="110" rx="4" />
          <rect x="582" y="128" width="126" height="110" rx="4" />
          <path d="M208 184 C340 184 372 128 468 170 C538 202 552 184 592 184" />
          <circle cx="334" cy="172" r="6" />
          <circle cx="468" cy="170" r="6" />
          <path d="M110 414 L212 416 L230 390 L266 438 L322 420 L360 420 L382 366 L410 454 L452 420 L506 420 L528 396 L560 432 L690 424" />
          <line x1="110" y1="454" x2="690" y2="454" />
          <line x1="110" y1="326" x2="110" y2="470" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 800 560" aria-hidden="true">
      <g className="hiltech-solutions-diagram-main">
        <rect x="96" y="96" width="608" height="360" rx="4" />
        <line x1="96" y1="154" x2="704" y2="154" />
        <line x1="284" y1="96" x2="284" y2="456" />
        <line x1="544" y1="96" x2="544" y2="456" />
        {Array.from({ length: 6 }).map((_, row) => (
          <g key={row}>
            <line x1="116" y1={194 + row * 38} x2="684" y2={194 + row * 38} />
            <circle cx="132" cy={194 + row * 38} r="4" />
            <rect x="310" y={183 + row * 38} width="96" height="20" rx="2" />
            <rect x="572" y={183 + row * 38} width="90" height="20" rx="2" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export default function SolutionsIndexExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const entries = useMemo(() => solutions.map((solution) => ({ ...solution, ...profileBySlug[solution.slug] })), []);
  const active = entries[activeIndex];

  const handleSolutionRoute = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    solution: (typeof entries)[number],
    index: number,
  ) => {
    if (!shouldInterceptRouteClick(event)) return;

    event.preventDefault();
    setActiveIndex(index);

    const rowRect = event.currentTarget.getBoundingClientRect();
    window.requestAnimationFrame(() => {
      const source = rootRef.current?.querySelector<HTMLElement>('.hiltech-solutions-index-diagram');
      const svg = source?.querySelector('svg');
      const rect = source?.getBoundingClientRect() ?? rowRect;
      if (source && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        source.dataset.routeCarrySourceActive = 'true';
      }

      emitRouteContinuity({
        kind: 'solution',
        href: `/solutions/${solution.slug}`,
        label: solution.shortTitle,
        targetId: solution.slug,
        markup: svg?.outerHTML ?? '',
        sourceRect: {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
        },
      });
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];

    root.querySelectorAll<HTMLElement>('[data-solution-row]').forEach((row, index) => {
      triggers.push(ScrollTrigger.create({
        trigger: row,
        start: 'top 58%',
        end: 'bottom 42%',
        onEnter: () => setActiveIndex(index),
        onEnterBack: () => setActiveIndex(index),
      }));
    });

    if (!reduced) {
      const context = gsap.context(() => {
        gsap.from('[data-solutions-title]', {
          clipPath: 'inset(0 0 100% 0)',
          yPercent: 8,
          duration: 1,
          ease: 'power4.out',
        });

        gsap.from('[data-solution-row]', {
          opacity: 0.22,
          xPercent: 2,
          stagger: 0.055,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.hiltech-solutions-index-list',
            start: 'top 84%',
            once: true,
          },
        });
      }, root);

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        context.revert();
      };
    }

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <main ref={rootRef} className="hiltech-solutions-index">
      <section className="hiltech-solutions-index-hero">
        <div className="hiltech-solutions-index-shell">
          <div className="hiltech-solutions-index-topline">
            <span>SOLUTIONS / 06 PATHS</span>
            <span>PHYSICAL INFRASTRUCTURE SYSTEMS</span>
            <span>CAIRO / EGYPT</span>
          </div>

          <div className="hiltech-solutions-index-hero-grid">
            <h1 data-solutions-title>
              CHOOSE THE SYSTEM.<br />
              <span>DEFINE THE PATH.</span>
            </h1>
            <p>
              HILTECH solutions are organized by the physical system you need to build, validate, or procure — not by generic IT service labels.
            </p>
          </div>

          <div className="hiltech-solutions-index-axis" aria-hidden="true">
            <span>DISCOVER</span><i /><span>UNDERSTAND</span><i /><span>TRANSACT</span>
          </div>
        </div>
      </section>

      <section className="hiltech-solutions-index-field">
        <div className="hiltech-solutions-index-shell hiltech-solutions-index-layout">
          <aside
            className="hiltech-solutions-index-inspector"
            data-active-solution={active.slug}
          >
            <div className="hiltech-solutions-index-inspector-head">
              <span>{active.code}</span>
              <strong>{active.eyebrow}</strong>
            </div>

            <div key={active.slug} className="hiltech-solutions-index-diagram">
              <SolutionDiagram kind={active.kind} />
            </div>

            <div className="hiltech-solutions-index-inspector-copy">
              <span>{active.mode}</span>
              <p>{active.intro}</p>
            </div>
          </aside>

          <div className="hiltech-solutions-index-list">
            {entries.map((solution, index) => (
              <Link
                key={solution.slug}
                href={`/solutions/${solution.slug}`}
                data-solution-row
                data-solution-carry-link={solution.slug}
                className={activeIndex === index ? 'is-active' : undefined}
                onClick={(event) => handleSolutionRoute(event, solution, index)}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
              >
                <span className="hiltech-solutions-index-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="hiltech-solutions-index-row-copy">
                  <small>{solution.eyebrow}</small>
                  <strong>{solution.shortTitle}</strong>
                  <p>{solution.problemStatement}</p>
                </span>
                <span className="hiltech-solutions-index-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-solutions-index-cta">
        <div className="hiltech-solutions-index-shell">
          <span>DON’T KNOW WHICH PATH FITS?</span>
          <h2>SEND THE SCOPE.<br /><em>WE’LL MAP THE SYSTEM.</em></h2>
          <div>
            <Link href="/rfq">Start RFQ <span aria-hidden="true">↗</span></Link>
            <Link href="/products-partners">Browse products <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
