'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignalWorld from '@/components/home/SignalWorld';
import SystemsField from '@/components/home/SystemsField';
import ProcessSequence from '@/components/home/ProcessSequence';
import CapabilitiesFlow from '@/components/home/CapabilitiesFlow';
import CatalogBridge from '@/components/home/CatalogBridge';

gsap.registerPlugin(ScrollTrigger);

const lifecycle = [
  ['01', 'BUILD'],
  ['02', 'ROUTE'],
  ['03', 'TEST'],
  ['04', 'PROVE'],
] as const;

const scaleSteps = [
  ['01', 'Termination', 'The point where a physical link begins or ends.'],
  ['02', 'Cable', 'The route that carries the signal through the site.'],
  ['03', 'Patch', 'The layer that keeps change organized and serviceable.'],
  ['04', 'Rack', 'Connectivity becomes an engineered operating system.'],
  ['05', 'Room', 'Power, routing, labeling and access become one environment.'],
  ['06', 'Facility', 'The physical layer scales across the business.'],
] as const;

export default function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const context = gsap.context(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) return;

      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });

      intro
        .from('[data-hero-coordinate]', {
          opacity: 0,
          duration: 0.45,
          stagger: 0.04,
        })
        .from('[data-hero-word]', {
          clipPath: 'inset(0 100% 0 0)',
          xPercent: -4,
          duration: 0.95,
          stagger: 0.08,
        }, '-=0.18')
        .from('[data-hero-word] > span', {
          scaleX: 0.78,
          letterSpacing: '0.035em',
          transformOrigin: 'left center',
          duration: 1.1,
          stagger: 0.07,
        }, '<')
        .from('.hiltech-hero-route', {
          scaleX: 0,
          duration: 1.1,
          transformOrigin: 'left center',
        }, '-=0.72')
        .from('[data-hero-support]', {
          opacity: 0,
          y: 16,
          duration: 0.72,
          stagger: 0.06,
        }, '-=0.45')
        .from('[data-phase]', {
          opacity: 0,
          x: -12,
          duration: 0.55,
          stagger: 0.08,
        }, '-=0.52');

      gsap.to('[data-hero-statement]', {
        yPercent: -9,
        opacity: 0.35,
        ease: 'none',
        scrollTrigger: {
          trigger: '#h01',
          start: 'top top+=64',
          end: 'bottom top+=64',
          scrub: 0.7,
        },
      });

      gsap.to('.hiltech-hero-route', {
        scaleX: 1.18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: {
          trigger: '#h01',
          start: 'top top+=64',
          end: 'bottom top+=64',
          scrub: 0.7,
        },
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          clipPath: 'inset(0 0 18% 0)',
          y: 26,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-scale-step]').forEach((element, index) => {
        gsap.from(element, {
          opacity: 0.16,
          y: index % 2 === 0 ? 22 : -22,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            end: 'bottom 64%',
            scrub: 0.55,
          },
        });
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div id="hiltech-home" ref={rootRef} className="hiltech-home hiltech-slice-root">
      <div id="hiltech-opening-world" className="hiltech-opening-world-root">
      <div className="hiltech-world-sticky">
        <SignalWorld rootId="hiltech-opening-world" />
        <div className="hiltech-world-vignette" />
        <div className="hiltech-world-grid" />
      </div>

      <div className="hiltech-slice-content">
        <section id="h01" className="hiltech-chapter hiltech-chapter-hero-v2">
          <div className="hiltech-hero-frame">
            <div className="hiltech-hero-coordinates" aria-label="HILTECH network infrastructure">
              <span data-hero-coordinate>HNS / PUBLIC SYSTEM</span>
              <span data-hero-coordinate>CAIRO / EGYPT</span>
              <span data-hero-coordinate>PHYSICAL NETWORK INFRASTRUCTURE</span>
              <span data-hero-coordinate>01 / 12</span>
            </div>

            <div className="hiltech-hero-route" aria-hidden="true">
              <span className="hiltech-hero-route-node" />
            </div>

            <h1 data-hero-statement className="hiltech-hero-statement" aria-label="Every signal needs a physical path.">
              <span data-hero-word className="hiltech-hero-word hiltech-hero-word-a">
                <span>EVERY SIGNAL</span>
              </span>
              <span data-hero-word className="hiltech-hero-word hiltech-hero-word-bridge">
                <span>NEEDS A</span>
              </span>
              <span data-hero-word className="hiltech-hero-word hiltech-hero-word-outline">
                <span>PHYSICAL</span>
              </span>
              <span data-hero-word className="hiltech-hero-word hiltech-hero-word-signal">
                <span>PATH.</span>
              </span>
            </h1>

            <div className="hiltech-hero-lower">
              <p data-hero-support className="hiltech-hero-description">
                HILTECH engineers fiber, structured cabling, racks, data-room infrastructure, and validation from first termination to verified handover.
              </p>

              <div className="hiltech-hero-actions">
                <Link data-hero-support href="/solutions" className="hiltech-action-v2 hiltech-action-v2-primary">
                  Explore infrastructure <span aria-hidden="true">↗</span>
                </Link>
                <a data-hero-support href="#h02" className="hiltech-action-v2 hiltech-action-v2-quiet">
                  Follow the signal <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <ol className="hiltech-phase-rail" aria-label="HILTECH delivery lifecycle">
              {lifecycle.map(([number, label], index) => (
                <li key={label} data-phase className={index === 0 ? 'is-active' : undefined}>
                  <span>{number}</span>
                  <strong>{label}</strong>
                </li>
              ))}
            </ol>

            <div data-hero-support className="hiltech-hero-axis" aria-hidden="true">
              <span>0</span>
              <i />
              <span>PATH / ACTIVE</span>
              <i />
              <span>1</span>
            </div>
          </div>
        </section>

        <section id="h02" className="hiltech-chapter hiltech-chapter-layer">
          <div className="hiltech-layer-frame">
            <div data-reveal className="hiltech-layer-index">
              <span>02 / 12</span>
              <strong>THE INVISIBLE LAYER</strong>
            </div>

            <div data-reveal className="hiltech-layer-statement">
              <span className="hiltech-layer-small">WHAT YOU DON’T SEE</span>
              <h2>
                CARRIES<br />
                <em>EVERYTHING.</em>
              </h2>
            </div>

            <p data-reveal className="hiltech-layer-copy">
              Every digital service still depends on a physical route: fiber, copper, termination, patching, containment, rack space, labeling, and a test that confirms the path works.
            </p>

            <div data-reveal className="hiltech-route-field" aria-label="Illustrative physical route">
              <div className="hiltech-route-field-top">
                <span>SOURCE / TERMINATION</span>
                <span>PHYSICAL ROUTE</span>
                <span>DESTINATION / SYSTEM</span>
              </div>
              <div className="hiltech-route-field-line" aria-hidden="true">
                <span className="hiltech-route-field-pulse" />
                <i className="n1" />
                <i className="n2" />
                <i className="n3" />
                <i className="n4" />
              </div>
              <div className="hiltech-route-field-bottom">
                <span>FIBER</span>
                <span>COPPER</span>
                <span>PATCH</span>
                <span>ROUTE</span>
                <span>TEST</span>
              </div>
            </div>
          </div>
        </section>

        <section id="h03" className="hiltech-chapter hiltech-chapter-scale-v2">
          <div className="hiltech-scale-frame">
            <div data-reveal className="hiltech-scale-intro">
              <div className="hiltech-scale-index">
                <span>03 / 12</span>
                <strong>COMPONENT → SYSTEM</strong>
              </div>
              <h2>
                FROM ONE<br />
                <span>TERMINATION</span><br />
                TO THE FACILITY.
              </h2>
              <p>
                Scale changes the object, not the discipline. The path must remain organized, serviceable, measurable, and ready for the next change.
              </p>
            </div>

            <ol className="hiltech-scale-ladder">
              {scaleSteps.map(([number, title, body]) => (
                <li key={number} data-scale-step>
                  <span className="hiltech-scale-ladder-number">{number}</span>
                  <div className="hiltech-scale-ladder-copy">
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                  <span className="hiltech-scale-ladder-tick" aria-hidden="true" />
                </li>
              ))}
            </ol>

            <div data-reveal className="hiltech-h03-next">
              <span>THE NEXT QUESTION</span>
              <strong>WHAT DOES HILTECH BUILD WITH THIS PHYSICAL LAYER?</strong>
              <Link href="/solutions">Explore systems <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
      </div>
      </div>

      <SystemsField />
      <ProcessSequence />
      <CapabilitiesFlow />
      <CatalogBridge />
    </div>
  );
}
