'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const modes = [
  {
    key: 'fiber',
    label: 'FIBER / OTDR-ORIENTED',
    title: 'TRACE THE RETURN.',
    body: 'Fiber validation uses trace behavior, continuity context, and project-specific acceptance criteria to expose events along the physical route.',
  },
  {
    key: 'copper',
    label: 'COPPER / FLUKE-ORIENTED',
    title: 'VERIFY THE LINK.',
    body: 'Copper validation checks installed links against the agreed project criteria before the infrastructure moves into handover.',
  },
] as const;

export default function ValidationField() {
  const rootRef = useRef<HTMLElement>(null);
  const [modeIndex, setModeIndex] = useState(0);
  const mode = modes[modeIndex];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const route = root.querySelector<SVGPathElement>('[data-validation-route]');
    const pulse = root.querySelector<SVGCircleElement>('[data-validation-pulse]');
    const returnPulse = root.querySelector<SVGCircleElement>('[data-validation-return]');
    const trace = root.querySelector<SVGPathElement>('[data-validation-trace]');
    const events = root.querySelectorAll<SVGElement>('[data-validation-event]');

    if (!route || !pulse || !returnPulse || !trace) return;

    gsap.set(route, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(trace, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set([pulse, returnPulse], { opacity: 0 });
    gsap.set(events, { opacity: 0, scale: 0.4, transformOrigin: 'center center' });

    const tl = gsap.timeline({ paused: true });
    tl.to(route, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'power2.inOut',
    })
      .set(pulse, { opacity: 1 })
      .to(pulse, {
        duration: 0.9,
        ease: 'none',
        motionPath: {
          path: route,
          align: route,
          alignOrigin: [0.5, 0.5],
        },
      }, 0.62)
      .to(events, {
        opacity: 1,
        scale: 1,
        duration: 0.28,
        stagger: 0.09,
        ease: 'back.out(1.8)',
      }, 0.9)
      .set(returnPulse, { opacity: 1 }, 1.12)
      .to(returnPulse, {
        duration: 0.78,
        ease: 'none',
        motionPath: {
          path: route,
          align: route,
          alignOrigin: [0.5, 0.5],
          start: 1,
          end: 0,
        },
      }, 1.12)
      .to(trace, {
        strokeDashoffset: 0,
        duration: 0.9,
        ease: 'power2.inOut',
      }, 1.38);

    if (reduced) {
      tl.progress(1);
      return () => tl.kill();
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top 72%',
      once: true,
      onEnter: () => tl.play(),
    });

    const context = gsap.context(() => {
      gsap.from('[data-h10-title]', {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 8,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 80%',
          once: true,
        },
      });
    }, root);

    return () => {
      trigger.kill();
      tl.kill();
      context.revert();
    };
  }, []);

  return (
    <section id="h10" ref={rootRef} className="hiltech-validation-section">
      <div className="hiltech-validation-shell">
        <div className="hiltech-validation-topline">
          <span>10 / 12</span>
          <span>VALIDATION / MEASUREMENT</span>
          <span>ILLUSTRATIVE TEST MODEL</span>
        </div>

        <header className="hiltech-validation-heading">
          <h2 data-h10-title>
            MAKE THE PATH<br />
            <span>MEASURABLE.</span>
          </h2>
          <p>
            Installation is not the end state. HILTECH’s public scope includes Fluke-, OTDR-, power-meter-, and field-testing workflows where applicable before handover.
          </p>
        </header>

        <div className="hiltech-validation-body">
          <div className="hiltech-validation-mode-copy">
            <div className="hiltech-validation-mode-tabs" role="tablist" aria-label="Validation modes">
              {modes.map((item, index) => (
                <button
                  key={item.key}
                  type="button"
                  role="tab"
                  aria-selected={modeIndex === index}
                  className={modeIndex === index ? 'is-active' : undefined}
                  onClick={() => setModeIndex(index)}
                  onFocus={() => setModeIndex(index)}
                  onMouseEnter={() => setModeIndex(index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.label}</strong>
                </button>
              ))}
            </div>

            <div key={mode.key} className="hiltech-validation-mode-swap">
              <small>{mode.label}</small>
              <h3>{mode.title}</h3>
              <p>{mode.body}</p>
            </div>

            <div className="hiltech-validation-acceptance">
              <span>ACCEPTANCE RULE</span>
              <p>Thresholds, standards, report format, and pass/fail criteria are confirmed per project — they are not fabricated here as marketing metrics.</p>
            </div>
          </div>

          <div className="hiltech-validation-visual">
            <div className="hiltech-validation-visual-head">
              <span>SOURCE / LINK</span>
              <span>EVENTS / RETURN</span>
              <span>TRACE / INTERPRETATION</span>
            </div>

            <svg viewBox="0 0 900 620" role="presentation" aria-hidden="true">
              <defs>
                <pattern id="validation-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M40 0H0V40" className="hiltech-validation-grid-path" />
                </pattern>
              </defs>
              <rect width="900" height="620" fill="url(#validation-grid)" />

              <g className="hiltech-validation-route-base">
                <rect x="92" y="176" width="118" height="118" rx="5" />
                <rect x="690" y="176" width="118" height="118" rx="5" />
                <path d="M114 210 H188 M114 230 H188 M114 250 H188" />
                <path d="M712 210 H786 M712 230 H786 M712 250 H786" />
              </g>

              <path
                data-validation-route
                pathLength="1"
                className="hiltech-validation-route"
                d="M198 238 C305 238 300 180 410 210 C510 238 548 292 702 238"
              />
              <circle data-validation-pulse className="hiltech-validation-pulse" r="8" />
              <circle data-validation-return className="hiltech-validation-return" r="6" />

              <g className="hiltech-validation-events">
                <g data-validation-event><circle cx="350" cy="202" r="7" /><line x1="350" y1="216" x2="350" y2="330" /></g>
                <g data-validation-event><circle cx="486" cy="236" r="7" /><line x1="486" y1="250" x2="486" y2="330" /></g>
                <g data-validation-event><circle cx="610" cy="256" r="7" /><line x1="610" y1="270" x2="610" y2="330" /></g>
              </g>

              <g className="hiltech-validation-trace-field">
                <line x1="98" y1="498" x2="808" y2="498" />
                <line x1="98" y1="372" x2="98" y2="524" />
                <path
                  data-validation-trace
                  pathLength="1"
                  className="hiltech-validation-trace"
                  d="M98 398 L228 404 L246 438 L330 442 L348 466 L472 468 L488 486 L598 488 L612 496 L808 498"
                />
                <text x="98" y="552">TRACE / ILLUSTRATIVE — NO PROJECT METRICS</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
