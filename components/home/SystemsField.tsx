'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { solutionsBySlug } from '@/content/solutions';

gsap.registerPlugin(ScrollTrigger);

const systemConfig = [
  { slug: 'structured-cabling', label: 'STRUCTURED CABLING', code: 'ACCESS / 01', diagram: 'structured' },
  { slug: 'fiber-backbone', label: 'FIBER BACKBONE', code: 'CORE / 02', diagram: 'fiber' },
  { slug: 'data-rooms', label: 'DATA ROOMS', code: 'ROOM / 03', diagram: 'room' },
  { slug: 'cctv-infrastructure', label: 'CCTV INFRASTRUCTURE', code: 'SECURITY / 04', diagram: 'cctv' },
] as const;

function DiagramState({ type, active }: { type: string; active: boolean }) {
  const className = `hiltech-system-diagram-state ${active ? 'is-active' : ''}`;

  if (type === 'structured') {
    return (
      <g className={className}>
        <rect x="88" y="184" width="162" height="222" rx="4" />
        {Array.from({ length: 6 }).map((_, row) =>
          Array.from({ length: 2 }).map((__, col) => (
            <rect key={`p-${row}-${col}`} x={118 + col * 72} y={215 + row * 29} width="42" height="13" rx="2" />
          )),
        )}
        {[150, 250, 350, 450, 550].map((y, index) => (
          <g key={y}>
            <path d={`M250 ${246 + index * 28} C340 ${246 + index * 28}, 395 ${y}, 520 ${y}`} />
            <rect x="520" y={y - 20} width="110" height="40" rx="3" />
            <circle cx="616" cy={y} r="4" />
          </g>
        ))}
      </g>
    );
  }

  if (type === 'fiber') {
    return (
      <g className={className}>
        <circle cx="150" cy="300" r="72" />
        <circle cx="650" cy="300" r="72" />
        <circle cx="150" cy="300" r="18" />
        <circle cx="650" cy="300" r="18" />
        {[-36, -12, 12, 36].map((offset) => (
          <path key={offset} d={`M168 ${300 + offset} C320 ${245 + offset * 0.35}, 474 ${355 - offset * 0.35}, 632 ${300 + offset}`} />
        ))}
        {[290, 370, 450, 530].map((x, index) => (
          <circle key={x} cx={x} cy={index % 2 ? 325 : 275} r="5" />
        ))}
      </g>
    );
  }

  if (type === 'room') {
    return (
      <g className={className}>
        {[120, 280, 440, 600].map((x, rackIndex) => (
          <g key={x}>
            <rect x={x} y="128" width="112" height="344" rx="3" />
            {Array.from({ length: 8 }).map((_, row) => (
              <line key={row} x1={x + 14} y1={166 + row * 34} x2={x + 98} y2={166 + row * 34} />
            ))}
            <circle cx={x + 88} cy={154 + rackIndex * 8} r="4" />
          </g>
        ))}
        <path d="M84 516 H716" />
        <path d="M176 462 C245 510, 372 510, 496 454 S654 410, 708 430" />
      </g>
    );
  }

  return (
    <g className={className}>
      <rect x="116" y="118" width="568" height="366" rx="4" />
      <path d="M116 250 H684 M320 118 V484 M514 118 V484" />
      {[
        [168, 178],
        [602, 178],
        [168, 416],
        [602, 416],
      ].map(([x, y], index) => (
        <g key={index}>
          <circle cx={x} cy={y} r="24" />
          <path d={`M${x} ${y + 24} L400 304`} />
        </g>
      ))}
      <rect x="352" y="268" width="96" height="72" rx="3" />
      <circle cx="400" cy="304" r="7" />
    </g>
  );
}

export default function SystemsField() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const systems = useMemo(
    () =>
      systemConfig.map((config) => ({
        ...config,
        solution: solutionsBySlug[config.slug],
      })),
    [],
  );

  const validation = solutionsBySlug['network-testing'];
  const supply = solutionsBySlug['project-supply-rfq'];
  const active = systems[activeIndex];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];

    root.querySelectorAll<HTMLElement>('[data-system-row]').forEach((row, index) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: row,
          start: 'top 62%',
          end: 'bottom 38%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        }),
      );
    });

    if (!reduced) {
      gsap.from(root.querySelector('[data-h04-title]'), {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 10,
        duration: 1.05,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 76%',
          once: true,
        },
      });

      gsap.from(root.querySelectorAll('[data-system-row]'), {
        opacity: 0.22,
        xPercent: 3,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root.querySelector('.hiltech-systems-list'),
          start: 'top 82%',
          once: true,
        },
      });
    }

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section id="h04" ref={rootRef} className="hiltech-systems-section">
      <div className="hiltech-systems-shell">
        <div className="hiltech-systems-topline">
          <span>04 / 12</span>
          <span>WHAT WE BUILD</span>
          <span>PHYSICAL SYSTEMS / VERIFIED PATHS</span>
        </div>

        <div className="hiltech-systems-heading">
          <h2 data-h04-title>
            THE PHYSICAL LAYER<br />
            <span>BECOMES THE SITE.</span>
          </h2>
          <p>
            HILTECH turns routes, terminations, rooms, and endpoints into infrastructure that can be operated, changed, and validated.
          </p>
        </div>

        <div className="hiltech-systems-body">
          <div className="hiltech-systems-visual">
            <div className="hiltech-systems-visual-head">
              <span>{active.code}</span>
              <strong>{active.solution.eyebrow}</strong>
            </div>

            <div className="hiltech-systems-diagram" aria-hidden="true">
              <svg viewBox="0 0 800 600" role="presentation">
                <defs>
                  <pattern id="systems-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" className="hiltech-systems-grid-line" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="800" height="600" fill="url(#systems-grid)" />
                {systems.map((system, index) => (
                  <DiagramState key={system.slug} type={system.diagram} active={index === activeIndex} />
                ))}
                <g className="hiltech-system-validation-axis">
                  <path d="M72 532 H728" />
                  <circle cx="402" cy="532" r="5" />
                </g>
              </svg>
            </div>

            <div className="hiltech-systems-visual-copy">
              <span>ACTIVE SYSTEM / {String(activeIndex + 1).padStart(2, '0')}</span>
              <p>{active.solution.intro}</p>
            </div>
          </div>

          <div className="hiltech-systems-list">
            {systems.map((system, index) => (
              <Link
                key={system.slug}
                href={`/solutions/${system.slug}`}
                data-system-row
                className={`hiltech-system-row ${activeIndex === index ? 'is-active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                aria-current={activeIndex === index ? 'true' : undefined}
              >
                <span className="hiltech-system-row-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="hiltech-system-row-copy">
                  <small>{system.solution.eyebrow}</small>
                  <strong>{system.label}</strong>
                </span>
                <span className="hiltech-system-row-arrow" aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/solutions/network-testing" className="hiltech-validation-band">
          <span className="hiltech-validation-band-label">VALIDATION LAYER</span>
          <strong>{validation.shortTitle}</strong>
          <p>{validation.intro}</p>
          <span className="hiltech-validation-band-arrow" aria-hidden="true">↗</span>
          <span className="hiltech-validation-beam" aria-hidden="true"><i /></span>
        </Link>

        <div className="hiltech-supply-bridge">
          <span>PROCUREMENT PATH</span>
          <p>{supply.shortTitle}: BOQ/RFQ structure, compatibility review, availability, and quotation alignment.</p>
          <Link href="/solutions/project-supply-rfq">Open RFQ solution <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
