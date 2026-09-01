'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { infrastructureStack, services } from '@/content/site';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const lifecycleMap = [
  { serviceIndexes: [0, 1], image: '/field-execution-technician.jpg', code: 'FIELD / 01' },
  { serviceIndexes: [], image: '/infrastructure-network-detail.jpg', code: 'SUPPLY / 02' },
  { serviceIndexes: [2, 3, 6], image: '/copper-cable-pulling.jpg', code: 'INSTALL / 03' },
  { serviceIndexes: [4], image: '/rack-cable-management-blue.jpg', code: 'ORGANIZE / 04' },
  { serviceIndexes: [5], image: '/testing-field-device.jpg', code: 'VERIFY / 05' },
  { serviceIndexes: [7], image: '/rack-data-room.jpg', code: 'HANDOVER / 06' },
] as const;

const fieldFrames = [
  {
    label: 'FIBER INSTALLATION',
    image: '/fiber-splicing-workbench.jpg',
    caption: 'Fiber extension, splicing, termination, and field testing support.',
  },
  {
    label: 'RACK READINESS',
    image: '/rack-cable-management-blue.jpg',
    caption: 'Rack preparation, patching, routing, and cable-management discipline.',
  },
  {
    label: 'COPPER EXECUTION',
    image: '/copper-cable-pulling.jpg',
    caption: 'Structured copper routing, termination, and endpoint delivery.',
  },
  {
    label: 'TESTING WORKFLOW',
    image: '/testing-field-device.jpg',
    caption: 'Field validation with project-appropriate testing tools and acceptance criteria.',
  },
] as const;

const testingTools = ['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester', 'Fiber fusion splice'];

export default function ServicesExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const stages = useMemo(
    () =>
      infrastructureStack.map((stage, index) => ({
        ...stage,
        ...lifecycleMap[index],
        linkedServices: lifecycleMap[index].serviceIndexes.map((serviceIndex) => services[serviceIndex]),
      })),
    [],
  );

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const triggers: ScrollTrigger[] = [];
    const contexts: gsap.Context[] = [];

    root.querySelectorAll<HTMLElement>('[data-service-stage]').forEach((row, index) => {
      triggers.push(
        ScrollTrigger.create({
          trigger: row,
          start: 'top 58%',
          end: 'bottom 42%',
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
        }),
      );
    });

    if (!reduced) {
      const intro = gsap.context(() => {
        gsap.from('[data-services-title]', {
          clipPath: 'inset(0 0 100% 0)',
          yPercent: 8,
          duration: 1,
          ease: 'power4.out',
        });

        gsap.from('.hiltech-services-hero-media', {
          opacity: 0,
          scale: 0.97,
          duration: 1.05,
          delay: 0.12,
          ease: 'power3.out',
        });

        gsap.to('[data-services-signal]', {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hiltech-services-lifecycle',
            start: 'top 76%',
            end: 'bottom 52%',
            scrub: 0.45,
          },
        });
      }, root);
      contexts.push(intro);

      const stageContext = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-service-stage]').forEach((stage) => {
          gsap.from(stage.querySelector('[data-service-stage-title]'), {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stage,
              start: 'top 84%',
              once: true,
            },
          });

          gsap.from(stage.querySelectorAll('[data-service-stage-detail]'), {
            opacity: 0,
            y: 14,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stage,
              start: 'top 79%',
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>('[data-field-frame]').forEach((frame, index) => {
          const image = frame.querySelector('[data-field-image]');
          gsap.from(frame, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: frame,
              start: 'top 86%',
              once: true,
            },
          });

          if (image) {
            gsap.fromTo(
              image,
              { scale: 1.07, yPercent: index % 2 ? 2 : -2 },
              {
                scale: 1,
                yPercent: index % 2 ? -2 : 2,
                ease: 'none',
                scrollTrigger: {
                  trigger: frame,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.45,
                },
              },
            );
          }
        });
      }, root);
      contexts.push(stageContext);

      const trace = root.querySelector<SVGPathElement>('[data-service-test-trace]');
      const pulsePath = root.querySelector<SVGPathElement>('[data-service-test-path]');
      const pulse = root.querySelector<SVGCircleElement>('[data-service-test-pulse]');

      if (trace && pulsePath && pulse) {
        gsap.set(trace, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(pulsePath, { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(pulse, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '.hiltech-services-testing',
            start: 'top 72%',
            once: true,
          },
        });

        tl.to(pulsePath, {
          strokeDashoffset: 0,
          duration: 0.7,
          ease: 'power2.inOut',
        })
          .set(pulse, { opacity: 1 })
          .to(pulse, {
            duration: 0.9,
            ease: 'none',
            motionPath: {
              path: pulsePath,
              align: pulsePath,
              alignOrigin: [0.5, 0.5],
            },
          }, 0.55)
          .to(trace, {
            strokeDashoffset: 0,
            duration: 0.95,
            ease: 'power2.inOut',
          }, 0.95);
      }
    }

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      contexts.forEach((context) => context.revert());
    };
  }, []);

  const active = stages[activeStage];

  return (
    <main ref={rootRef} className="hiltech-services">
      <section className="hiltech-services-hero" data-route-identity="field-execution">
        <div className="hiltech-services-shell">
          <div className="hiltech-services-topline">
            <span>CAPABILITIES / FIELD DELIVERY</span>
            <span>SCOPE → HANDOVER</span>
            <span>CAIRO / EGYPT</span>
          </div>

          <div className="hiltech-services-hero-grid">
            <div>
              <span className="hiltech-services-kicker">THE EXECUTION LAYER</span>
              <h1 data-services-title>
                THE WORK BETWEEN<br />
                <em>SCOPE AND HANDOVER.</em>
              </h1>
              <p>
                HILTECH’s capabilities live in the field: inspect, plan, install, organize, test, deliver, and support the physical infrastructure behind connectivity.
              </p>
            </div>

            <div className="hiltech-services-hero-media">
              <Image
                src="/field-execution-technician.jpg"
                alt="HILTECH field execution technician working on network infrastructure"
                fill
                priority
                sizes="(max-width: 800px) 90vw, 44vw"
                className="object-cover"
              />
              <div className="hiltech-services-hero-media-overlay" aria-hidden="true">
                <span>FIELD EXECUTION / REAL VISUAL</span>
                <i />
                <b />
              </div>
            </div>
          </div>

          <div className="hiltech-services-hero-rail">
            <span>SURVEY</span><i />
            <span>PLAN</span><i />
            <span>INSTALL</span><i />
            <span>TEST</span><i />
            <span>HANDOVER</span>
          </div>
        </div>
      </section>

      <section className="hiltech-services-lifecycle">
        <div className="hiltech-services-shell">
          <div className="hiltech-services-section-label">
            <span>01 / EXECUTION LIFECYCLE</span>
            <strong>CAPABILITY IS A SEQUENCE, NOT A LIST.</strong>
          </div>

          <div className="hiltech-services-lifecycle-layout">
            <aside className="hiltech-services-stage-inspector">
              <div className="hiltech-services-stage-inspector-head">
                <span>{active.code}</span>
                <strong>{String(activeStage + 1).padStart(2, '0')} / 06</strong>
              </div>

              <div className="hiltech-services-stage-image">
                <Image
                  key={active.image}
                  src={active.image}
                  alt={active.title}
                  fill
                  sizes="(max-width: 700px) 90vw, 36vw"
                  className="object-cover"
                />
              </div>

              <div className="hiltech-services-stage-inspector-copy">
                <strong>{active.title}</strong>
                <p>{active.description}</p>
              </div>
            </aside>

            <div className="hiltech-services-stage-list">
              <span className="hiltech-services-stage-signal" aria-hidden="true">
                <i data-services-signal />
              </span>

              {stages.map((stage, index) => (
                <article
                  key={stage.title}
                  data-service-stage
                  className={activeStage === index ? 'is-active' : undefined}
                >
                  <div className="hiltech-services-stage-index">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <small>{stage.code}</small>
                  </div>

                  <div className="hiltech-services-stage-main">
                    <h2 data-service-stage-title>{stage.title}</h2>
                    <p data-service-stage-detail>{stage.description}</p>
                  </div>

                  <div className="hiltech-services-stage-capabilities">
                    {stage.linkedServices.length ? (
                      stage.linkedServices.map((service) => (
                        <div key={service.title} data-service-stage-detail>
                          <span>{service.label}</span>
                          <strong>{service.title}</strong>
                        </div>
                      ))
                    ) : (
                      <div data-service-stage-detail>
                        <span>PROCUREMENT</span>
                        <strong>Product selection, compatibility, availability, and project supply alignment</strong>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-services-field">
        <div className="hiltech-services-shell">
          <div className="hiltech-services-section-label is-dark">
            <span>02 / FIELD PROOF</span>
            <strong>REAL EXECUTION VISUALS / NO STOCK IDENTITY</strong>
          </div>

          <header className="hiltech-services-field-heading">
            <h2>THE FIELD<br /><em>IS THE MEDIA.</em></h2>
            <p>
              The services page does not need invented cinematic footage to feel alive. Real field work becomes the visual sequence, with motion used to reveal process and detail.
            </p>
          </header>

          <div className="hiltech-services-field-frames">
            {fieldFrames.map((frame, index) => (
              <article key={frame.label} data-field-frame className={index % 2 ? 'is-reversed' : undefined}>
                <div className="hiltech-services-field-media">
                  <Image
                    data-field-image
                    src={frame.image}
                    alt={frame.caption}
                    fill
                    sizes="(max-width: 700px) 90vw, 68vw"
                    className="object-cover"
                  />
                  <span>{String(index + 1).padStart(2, '0')} / 04</span>
                </div>

                <div className="hiltech-services-field-copy">
                  <small>{frame.label}</small>
                  <h3>{frame.caption}</h3>
                  <i aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-services-testing">
        <div className="hiltech-services-shell">
          <div className="hiltech-services-section-label is-dark">
            <span>03 / TESTING & MEASUREMENT</span>
            <strong>INSTALLATION BECOMES HANDOVER ONLY AFTER VALIDATION.</strong>
          </div>

          <div className="hiltech-services-testing-grid">
            <div>
              <span>FIELD VALIDATION</span>
              <h2>MEASURE<br /><em>BEFORE RELEASE.</em></h2>
              <p>
                Testing workflows use project-appropriate tools and criteria. The visual below is illustrative; thresholds and acceptance remain project-specific.
              </p>

              <div className="hiltech-services-testing-tools">
                {testingTools.map((tool, index) => (
                  <div key={tool}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{tool}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="hiltech-services-testing-visual">
              <div className="hiltech-services-testing-visual-head">
                <span>LINK / SOURCE</span>
                <span>FIELD EVENTS</span>
                <span>TRACE / HANDOVER</span>
              </div>

              <svg viewBox="0 0 900 620" aria-hidden="true">
                <defs>
                  <pattern id="services-test-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M40 0H0V40" className="hiltech-services-test-grid-path" />
                  </pattern>
                </defs>
                <rect width="900" height="620" fill="url(#services-test-grid)" />

                <g className="hiltech-services-test-terminals">
                  <rect x="90" y="132" width="136" height="114" rx="4" />
                  <rect x="674" y="132" width="136" height="114" rx="4" />
                  <path d="M114 166 H202 M114 188 H202 M114 210 H202" />
                  <path d="M698 166 H786 M698 188 H786 M698 210 H786" />
                </g>

                <path
                  data-service-test-path
                  pathLength="1"
                  className="hiltech-services-test-path"
                  d="M216 190 C344 190 378 134 486 176 C566 206 608 190 686 190"
                />
                <circle data-service-test-pulse className="hiltech-services-test-pulse" r="8" />

                <g className="hiltech-services-test-events">
                  <circle cx="350" cy="176" r="6" />
                  <circle cx="486" cy="176" r="6" />
                  <circle cx="610" cy="190" r="6" />
                </g>

                <g className="hiltech-services-test-trace-field">
                  <line x1="112" y1="500" x2="788" y2="500" />
                  <line x1="112" y1="362" x2="112" y2="522" />
                  <path
                    data-service-test-trace
                    pathLength="1"
                    className="hiltech-services-test-trace"
                    d="M112 400 L238 406 L258 432 L326 440 L346 468 L462 470 L482 492 L562 492 L590 478 L622 496 L788 500"
                  />
                  <text x="112" y="548">ILLUSTRATIVE TRACE / PROJECT-SPECIFIC ACCEPTANCE</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-services-handover">
        <div className="hiltech-services-shell">
          <div className="hiltech-services-handover-grid">
            <div>
              <span>04 / HANDOVER</span>
              <h2>CAPABILITY ENDS<br /><em>IN A USABLE STATE.</em></h2>
            </div>

            <div>
              <p>
                Final quantities, materials, testing criteria, documentation, and support scope are confirmed per project. HILTECH’s published capability is the path from field reality to an operationally usable handover.
              </p>

              <div className="hiltech-services-handover-actions">
                <Link href="/solutions">Choose a solution <span aria-hidden="true">↗</span></Link>
                <Link href="/work">Inspect field evidence <span aria-hidden="true">↗</span></Link>
                <Link href="/rfq">Start RFQ <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
