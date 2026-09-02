'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { infrastructureStack, services } from '@/content/site';

gsap.registerPlugin(ScrollTrigger);

const serviceMap = [
  [0, 1],
  [],
  [2, 3, 6],
  [4],
  [5],
  [7],
] as const;

export default function CapabilitiesFlow() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const stages = infrastructureStack.map((stage, index) => ({
    ...stage,
    services: serviceMap[index].map((serviceIndex) => services[serviceIndex]),
  }));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];

    if (!reduced) {
      gsap.set(root.querySelector('[data-capability-progress]'), {
        scaleY: 0,
        transformOrigin: 'top center',
      });

      gsap.to(root.querySelector('[data-capability-progress]'), {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.querySelector('.hiltech-capabilities-rows'),
          start: 'top 72%',
          end: 'bottom 55%',
          scrub: 0.5,
        },
      });
    }

    root.querySelectorAll<HTMLElement>('[data-capability-stage]').forEach((row, index) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: row,
          start: 'top 58%',
          end: 'bottom 42%',
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
        }),
      );

      if (!reduced) {
        gsap.from(row.querySelector('[data-capability-title]'), {
          xPercent: -3,
          immediateRender: false,
          duration: 0.78,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 82%',
            once: true,
          },
        });

        gsap.from(row.querySelectorAll('[data-capability-detail]'), {
          y: 14,
          immediateRender: false,
          duration: 0.55,
          stagger: 0.055,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 78%',
            once: true,
          },
        });
      }
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section id="h06" ref={rootRef} className="hiltech-capabilities-section">
      <div className="hiltech-capabilities-shell">
        <div className="hiltech-capabilities-topline">
          <span>06 / 12</span>
          <span>CAPABILITIES / EXECUTION MAP</span>
          <span>REAL DELIVERY SCOPE</span>
        </div>

        <header className="hiltech-capabilities-heading">
          <h2>
            FROM SITE<br />
            <span>TO HANDOVER.</span>
          </h2>
          <div>
            <strong>{String(activeStage + 1).padStart(2, '0')} / 06</strong>
            <p>
              HILTECH’s field work moves through survey, supply, installation, organization, validation, and support as one connected delivery path.
            </p>
          </div>
        </header>

        <div className="hiltech-capabilities-map">
          <div className="hiltech-capabilities-route" aria-hidden="true">
            <span className="hiltech-capabilities-route-base" />
            <span data-capability-progress className="hiltech-capabilities-route-progress" />
            {stages.map((_, index) => (
              <i
                key={index}
                className={activeStage >= index ? 'is-passed' : undefined}
                style={{ top: `${((index + 0.5) / stages.length) * 100}%` }}
              />
            ))}
          </div>

          <div className="hiltech-capabilities-rows">
            {stages.map((stage, index) => (
              <article
                key={stage.title}
                data-capability-stage
                className={`hiltech-capability-stage ${activeStage === index ? 'is-active' : ''}`}
              >
                <div className="hiltech-capability-stage-index">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{activeStage > index ? 'PASSED' : activeStage === index ? 'ACTIVE' : 'QUEUED'}</small>
                </div>

                <div className="hiltech-capability-stage-main">
                  <h3 data-capability-title>{stage.title}</h3>
                  <p data-capability-detail>{stage.description}</p>
                </div>

                <div className="hiltech-capability-stage-services">
                  {stage.services.length ? (
                    stage.services.map((service) => (
                      <div key={service.title} data-capability-detail>
                        <span>{service.label}</span>
                        <strong>{service.title}</strong>
                      </div>
                    ))
                  ) : (
                    <div data-capability-detail>
                      <span>PROCUREMENT</span>
                      <strong>Product selection, compatibility, availability & project supply alignment</strong>
                    </div>
                  )}
                </div>

                <span className="hiltech-capability-stage-tick" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>

        <div className="hiltech-capabilities-foot">
          <span>DELIVERY PRINCIPLE</span>
          <strong>SCOPE → SUPPLY → INSTALL → ORGANIZE → VALIDATE → HANDOVER</strong>
          <p>Stages are project-dependent; final quantities, products, testing criteria, and support scope are confirmed per RFQ and site conditions.</p>
        </div>
      </div>
    </section>
  );
}
