'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { emitRouteContinuity, shouldInterceptRouteClick } from '@/lib/route-continuity';

gsap.registerPlugin(ScrollTrigger);

const evidence = [
  {
    id: 'rack',
    index: '01',
    label: 'RACK / DATA ROOM',
    title: 'ORGANIZED FOR SERVICE.',
    image: '/rack-data-room.jpg',
    scope: 'Rack organization, patching, cable routing, and readiness checks for business network rooms.',
    proof: 'Maintainable infrastructure / handover context',
    targetId: 'rack-data-room',
  },
  {
    id: 'copper',
    index: '02',
    label: 'STRUCTURED CABLING',
    title: 'ROUTES YOU CAN TRACE.',
    image: '/copper-patch-panel.jpg',
    scope: 'Organized copper pathways, patch-panel termination, and routing discipline across technical spaces.',
    proof: 'Path clarity / patching discipline',
    targetId: 'copper-route',
  },
  {
    id: 'fiber',
    index: '03',
    label: 'FIBER / ODF',
    title: 'TERMINATED WITH INTENT.',
    image: '/fiber-distribution-panel.jpg',
    scope: 'Fiber routing context, ODF organization, and connector preparation aligned with field execution.',
    proof: 'ODF organization / serviceability',
    targetId: 'fiber-termination',
  },
  {
    id: 'test',
    index: '04',
    label: 'TESTING / HANDOVER',
    title: 'VALIDATE BEFORE GO-LIVE.',
    image: '/testing-otdr-device.jpg',
    scope: 'Field testing tools and validation checks used before operational handover.',
    proof: 'Testing context / acceptance readiness',
    targetId: 'testing-validation',
  },
] as const;

export default function WorkEvidence() {
  const rootRef = useRef<HTMLElement>(null);

  const handleEvidenceRoute = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    item: (typeof evidence)[number],
  ) => {
    if (!shouldInterceptRouteClick(event)) return;

    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      event.currentTarget.dataset.routeCarrySourceActive = 'true';
    }

    emitRouteContinuity({
      kind: 'work',
      href: '/work',
      label: item.label,
      targetId: item.targetId,
      src: item.image,
      alt: item.scope,
      sourceRect: {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      },
    });
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const context = gsap.context(() => {
      gsap.from('[data-h09-title]', {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 8,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-evidence-strip]').forEach((strip, index) => {
        gsap.from(strip, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: strip,
            start: 'top 86%',
            once: true,
          },
        });

        const image = strip.querySelector('[data-evidence-image]');
        if (image) {
          gsap.fromTo(image,
            { scale: 1.055, yPercent: index % 2 === 0 ? -2 : 2 },
            {
              scale: 1,
              yPercent: index % 2 === 0 ? 2 : -2,
              ease: 'none',
              scrollTrigger: {
                trigger: strip,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            },
          );
        }
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="h09" ref={rootRef} className="hiltech-work-section">
      <div className="hiltech-work-shell">
        <div className="hiltech-work-topline">
          <span>09 / 12</span>
          <span>FIELD EVIDENCE</span>
          <span>APPROVED VISUALS / NO INVENTED PROJECT CLAIMS</span>
        </div>

        <header className="hiltech-work-heading">
          <h2 data-h09-title>
            REAL FIELD WORK.<br />
            <span>VISIBLE DISCIPLINE.</span>
          </h2>
          <div>
            <p>
              The public evidence currently supports delivery disciplines, not named client case studies. The Home shows what can be verified from approved field visuals — nothing more.
            </p>
            <Link href="/work">Inspect all field evidence <span aria-hidden="true">↗</span></Link>
          </div>
        </header>

        <div className="hiltech-work-evidence">
          {evidence.map((item, index) => (
            <article
              key={item.id}
              data-evidence-strip
              className={`hiltech-evidence-strip ${index % 2 ? 'is-reversed' : ''}`}
            >
              <Link
                href="/work"
                className="hiltech-evidence-media"
                data-work-carry-link={item.targetId}
                aria-label={`Open field evidence archive: ${item.label}`}
                onClick={(event) => handleEvidenceRoute(event, item)}
              >
                <Image
                  data-evidence-image
                  src={item.image}
                  alt={item.scope}
                  fill
                  sizes="(max-width: 700px) 92vw, 70vw"
                  className="object-cover"
                />
                <span className="hiltech-evidence-corner hiltech-evidence-corner-a" />
                <span className="hiltech-evidence-corner hiltech-evidence-corner-b" />
                <span className="hiltech-evidence-open">OPEN EVIDENCE ↗</span>
              </Link>

              <div className="hiltech-evidence-copy">
                <div>
                  <span>{item.index}</span>
                  <small>{item.label}</small>
                </div>
                <h3>{item.title}</h3>
                <p>{item.scope}</p>
                <strong>{item.proof}</strong>
              </div>
            </article>
          ))}
        </div>

        <div className="hiltech-work-foot">
          <span>EVIDENCE RULE</span>
          <strong>NO CLIENT NAME. NO LOCATION. NO METRIC. UNLESS VERIFIED.</strong>
          <p>Future named case studies can replace or extend these discipline-level proof modules when approved project evidence exists.</p>
        </div>
      </div>
    </section>
  );
}
