'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const principles = [
  ['01', 'SCOPE BEFORE EXECUTION', 'Site conditions, routes, quantities, and project priorities are aligned before implementation decisions settle.'],
  ['02', 'PRODUCTS BEFORE PROMISES', 'Availability, compatibility, and final references are confirmed through the RFQ and procurement workflow.'],
  ['03', 'TEST BEFORE HANDOVER', 'Validation criteria and field-testing expectations remain part of the delivery path before operational handover.'],
  ['04', 'SERVICE AFTER INSTALLATION', 'Maintenance and operational support remain part of HILTECH’s published service scope where agreed for the project.'],
] as const;

export default function CertaintyField() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-h11-title]', {
        opacity: 0,
        y: 18,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from('[data-certainty-row]', {
        opacity: 0,
        y: 16,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hiltech-certainty-principles',
          start: 'top 84%',
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="h11" ref={rootRef} className="hiltech-certainty-section">
      <div className="hiltech-certainty-shell">
        <div className="hiltech-certainty-topline">
          <span>11 / 12</span>
          <span>CERTAINTY / RELEASE</span>
          <span>PROCESS OVER DECORATIVE BADGES</span>
        </div>

        <header className="hiltech-certainty-heading">
          <p>THE SYSTEM QUIETS DOWN HERE.</p>
          <h2 data-h11-title>
            CERTAINTY<br />
            <span>IS A PROCESS.</span>
          </h2>
        </header>

        <div className="hiltech-certainty-statement">
          <p>
            HILTECH does not need an invented certification wall to communicate confidence. The verifiable public story is simpler: scope clearly, select carefully, install cleanly, test deliberately, and hand over with context.
          </p>
        </div>

        <div className="hiltech-certainty-principles">
          {principles.map(([index, title, body]) => (
            <article key={index} data-certainty-row>
              <span>{index}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

        <div className="hiltech-certainty-foot">
          <span>STATE</span>
          <strong>READY FOR THE NEXT PROJECT.</strong>
        </div>
      </div>
    </section>
  );
}
