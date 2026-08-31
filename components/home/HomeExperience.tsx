'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignalWorld from '@/components/home/SignalWorld';

gsap.registerPlugin(ScrollTrigger);

const scaleSteps = [
  ['01', 'Component', 'The physical termination point.'],
  ['02', 'Cable', 'The path that carries the signal.'],
  ['03', 'Patch', 'The layer that organizes change.'],
  ['04', 'Rack', 'The system becomes serviceable.'],
  ['05', 'Room', 'Infrastructure becomes an environment.'],
  ['06', 'Data center', 'The environment becomes operational scale.'],
];

export default function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      gsap.from('[data-hero-line]', {
        yPercent: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.09,
        ease: 'power4.out',
      });

      gsap.from('[data-hero-meta]', {
        opacity: 0,
        y: 18,
        duration: 0.8,
        delay: 0.35,
        stagger: 0.08,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 34,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-scale-step]').forEach((element, index) => {
        gsap.from(element, {
          opacity: 0.18,
          x: index % 2 === 0 ? 24 : -24,
          duration: 0.75,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 82%',
            end: 'bottom 62%',
            scrub: 0.5,
          },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div id="hiltech-home-slice-1" ref={rootRef} className="hiltech-home hiltech-slice-root">
      <div className="hiltech-world-sticky">
        <SignalWorld rootId="hiltech-home-slice-1" />
        <div className="hiltech-world-vignette" />
        <div className="hiltech-world-grid" />
      </div>

      <div className="hiltech-slice-content">
        <section id="h01" className="hiltech-chapter hiltech-chapter-hero">
          <div className="hiltech-chapter-inner">
            <div className="hiltech-hero-copy">
              <div data-hero-meta className="hiltech-kicker-row">
                <span className="hiltech-index">01 / 12</span>
                <span className="hiltech-rule" />
                <span className="hiltech-system-label">ENGINEERED SIGNAL</span>
              </div>

              <h1 className="hiltech-hero-title" aria-label="Build it. Route it. Test it. Prove it.">
                <span className="hiltech-line-mask"><span data-hero-line>BUILD IT.</span></span>
                <span className="hiltech-line-mask"><span data-hero-line>ROUTE IT.</span></span>
                <span className="hiltech-line-mask"><span data-hero-line>TEST IT.</span></span>
                <span className="hiltech-line-mask hiltech-signal-line"><span data-hero-line>PROVE IT.</span></span>
              </h1>

              <p data-hero-meta className="hiltech-lede">
                HILTECH engineers the physical layer behind connectivity — from component and route to testing and proof.
              </p>

              <div data-hero-meta className="hiltech-actions">
                <Link href="/solutions" className="hiltech-action hiltech-action-primary">
                  Explore solutions <span aria-hidden="true">↗</span>
                </Link>
                <a href="#h02" className="hiltech-action hiltech-action-quiet">
                  Watch the system <span className="hiltech-play" aria-hidden="true">●</span>
                </a>
              </div>
            </div>

            <div data-hero-meta className="hiltech-status-panel" aria-label="Illustrative system state">
              <div className="hiltech-status-head">
                <span>SYSTEM STATE</span>
                <span className="hiltech-live-dot" />
              </div>
              <strong>ROUTE ACTIVE</strong>
              <dl>
                <div><dt>MODE</dt><dd>ILLUSTRATIVE</dd></div>
                <div><dt>STAGE</dt><dd>BUILD → PROVE</dd></div>
                <div><dt>STATE</dt><dd>CONNECTED</dd></div>
              </dl>
            </div>

            <div data-hero-meta className="hiltech-scroll-cue">
              <span>SCROLL</span>
              <span className="hiltech-scroll-line" />
            </div>
          </div>
        </section>

        <section id="h02" className="hiltech-chapter">
          <div className="hiltech-chapter-inner hiltech-split-layout">
            <div data-reveal className="hiltech-section-copy">
              <div className="hiltech-kicker-row">
                <span className="hiltech-index">02 / 12</span>
                <span className="hiltech-rule" />
                <span className="hiltech-system-label">THE INVISIBLE LAYER</span>
              </div>
              <h2 className="hiltech-section-title">
                CONNECTIVITY<br />
                <span>YOU DON’T SEE.</span>
              </h2>
              <p className="hiltech-lede">
                Every connection has a path. Every path has a physical backbone. HILTECH designs, supplies, builds, and validates the layer that keeps the visible business running.
              </p>
            </div>

            <div data-reveal className="hiltech-trace-card">
              <div className="hiltech-trace-head">
                <span>SIGNAL / ROUTE</span>
                <span>ILLUSTRATIVE VIEW</span>
              </div>
              <div className="hiltech-trace-line" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
              <div className="hiltech-trace-meta">
                <span>PATH ESTABLISHED</span>
                <span>PHYSICAL LAYER</span>
                <span>STATE / ACTIVE</span>
              </div>
            </div>
          </div>
        </section>

        <section id="h03" className="hiltech-chapter hiltech-chapter-scale">
          <div className="hiltech-chapter-inner">
            <div data-reveal className="hiltech-scale-heading">
              <div className="hiltech-kicker-row">
                <span className="hiltech-index">03 / 12</span>
                <span className="hiltech-rule" />
                <span className="hiltech-system-label">COMPONENT → SYSTEM</span>
              </div>
              <h2 className="hiltech-section-title">
                BUILD FOR SCALE.<br />
                <span>ENGINEER FOR REALITY.</span>
              </h2>
              <p className="hiltech-lede">
                The infrastructure changes scale, but the engineering logic stays connected from the first termination point to the operating environment.
              </p>
            </div>

            <ol className="hiltech-scale-steps">
              {scaleSteps.map(([number, title, body]) => (
                <li key={number} data-scale-step className="hiltech-scale-step">
                  <span className="hiltech-step-number">{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div data-reveal className="hiltech-slice-next">
              <span>NEXT LAYER</span>
              <strong>THE SYSTEMS HILTECH BUILDS</strong>
              <p>Networks, fiber, data-center environments, and assurance — engineered as connected infrastructure, not isolated services.</p>
              <Link href="/solutions" className="hiltech-inline-link">Explore solutions <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
