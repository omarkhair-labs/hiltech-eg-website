'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type EvidenceRecord = {
  id: string;
  index: string;
  discipline: string;
  title: string;
  visible: string;
  image: string;
  alt: string;
  trace: string;
};

const evidenceRecords: EvidenceRecord[] = [
  {
    id: 'rack-data-room',
    index: '01',
    discipline: 'RACK / DATA ROOM',
    title: 'ORGANIZED FOR ACCESS.',
    visible: 'Rack layout, patch access, routing discipline, and a maintainable technical-space condition are visible in the field record.',
    image: '/rack-data-room.jpg',
    alt: 'HILTECH field evidence showing rack and data room organization.',
    trace: 'ENCLOSURE → PATCH → ROUTE → ACCESS',
  },
  {
    id: 'copper-route',
    index: '02',
    discipline: 'COPPER / ROUTE',
    title: 'THE PATH IS PHYSICAL.',
    visible: 'Cable routing, containment, pulling, and patching context show the physical path behind structured copper connectivity.',
    image: '/copper-cable-tray.jpg',
    alt: 'HILTECH field evidence showing copper cable routing in a technical pathway.',
    trace: 'PATH → PULL → TERMINATE → LABEL',
  },
  {
    id: 'fiber-termination',
    index: '03',
    discipline: 'FIBER / TERMINATION',
    title: 'THE SIGNAL ENDS SOMEWHERE.',
    visible: 'Distribution, termination, splice, connector, and ODF context can be inspected without inventing a named project around the image.',
    image: '/fiber-splicing-workbench.jpg',
    alt: 'HILTECH field evidence showing fiber splicing and termination work.',
    trace: 'FIBER → SPLICE → ODF → CONNECT',
  },
  {
    id: 'testing-validation',
    index: '04',
    discipline: 'TESTING / VALIDATION',
    title: 'PROOF NEEDS A MEASUREMENT STEP.',
    visible: 'Real field testing instruments demonstrate that validation belongs to delivery; the image alone does not claim a pass rate or measured result.',
    image: '/testing-field-device.jpg',
    alt: 'HILTECH field evidence showing a testing device used during infrastructure validation.',
    trace: 'LINK → TEST → READ → HANDOVER',
  },
];

const sequence = [
  {
    code: '01 / ROUTE',
    title: 'MAKE THE PATH VISIBLE.',
    body: 'The first proof is physical: where cable travels, how routes are protected, and whether the path can be followed later.',
    image: '/copper-riser-routing.jpg',
    alt: 'Structured cable routing through a field pathway.',
  },
  {
    code: '02 / TERMINATE',
    title: 'RESOLVE THE CONNECTION.',
    body: 'A route becomes usable at the termination point. Fiber, patching, and endpoint work make the abstract network physically inspectable.',
    image: '/fiber-distribution-panel.jpg',
    alt: 'Fiber distribution and termination field evidence.',
  },
  {
    code: '03 / ORGANIZE',
    title: 'LEAVE THE SYSTEM SERVICEABLE.',
    body: 'Rack and patch organization are part of delivery because the system must remain traceable after installation, not only on day one.',
    image: '/rack-cable-management-blue.jpg',
    alt: 'Rack cable management and patching field evidence.',
  },
  {
    code: '04 / VERIFY',
    title: 'END WITH A CHECK.',
    body: 'Testing tools and field validation belong to the evidence chain. Exact thresholds and acceptance results stay project-specific unless verified.',
    image: '/testing-otdr-device.jpg',
    alt: 'OTDR field testing instrument used for validation context.',
  },
] as const;

const supported = [
  'Physical cable routing and pathway context',
  'Rack / patch access and organization',
  'Fiber distribution, splice, and termination context',
  'Testing instruments present in field validation',
  'Technician / execution context where photographed',
];

const notClaimed = [
  'Client identity or project location',
  'Cable quantities, lengths, or project scale',
  'Measured loss, pass rate, latency, or acceptance result',
  'Certification or formal partnership status',
  'Final commercial outcome inferred from a photo',
];

export default function WorkEvidenceExperience() {
  const [activeId, setActiveId] = useState(evidenceRecords[0].id);
  const activeRecord = useMemo(
    () => evidenceRecords.find((record) => record.id === activeId) ?? evidenceRecords[0],
    [activeId],
  );

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-work-hero-kicker], [data-work-hero-title], [data-work-hero-copy]', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.09,
        ease: 'power3.out',
      });

      gsap.from('[data-work-hero-media]', {
        clipPath: 'inset(0 0 100% 0)',
        scale: 1.035,
        duration: 1.1,
        delay: 0.15,
        ease: 'power4.out',
      });

      gsap.utils.toArray<HTMLElement>('[data-work-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 24,
          duration: 0.72,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-work-sequence-media]').forEach((element) => {
        gsap.from(element, {
          clipPath: 'inset(12% 0 12% 0)',
          scale: 1.035,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            end: 'center 54%',
            scrub: 0.45,
          },
        });
      });

      gsap.to('[data-work-trace-line]', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-work-sequence]',
          start: 'top 72%',
          end: 'bottom 70%',
          scrub: 0.45,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <main className="hiltech-work-page">
      <section className="hiltech-work-hero">
        <div className="hiltech-work-shell">
          <div className="hiltech-work-hero-topline">
            <span>WORK / FIELD EVIDENCE</span>
            <span>REAL MEDIA / CONTROLLED CLAIMS</span>
          </div>

          <div className="hiltech-work-hero-grid">
            <div className="hiltech-work-hero-copy">
              <span data-work-hero-kicker>FIELD RECORD / PROOF</span>
              <h1 data-work-hero-title>
                THE WORK<br />
                <em>LEAVES A TRACE.</em>
              </h1>
              <p data-work-hero-copy>
                HILTECH field work is presented as evidence: routes, terminations, racks, testing, and execution context that can be inspected without inventing a case-study story around it.
              </p>
            </div>

            <div className="hiltech-work-hero-media" data-work-hero-media>
              <Image
                src="/field-execution-technician.jpg"
                alt="HILTECH technician working on network infrastructure in the field."
                fill
                priority
                sizes="(max-width: 900px) 92vw, 48vw"
                className="object-cover"
              />
              <div className="hiltech-work-hero-media-label">
                <span>FIELD EVIDENCE / EXECUTION</span>
                <strong>IMAGE ≠ PROJECT CLAIM</strong>
              </div>
            </div>
          </div>

          <div className="hiltech-work-hero-rail">
            <span>ROUTE</span><i />
            <span>TERMINATE</span><i />
            <span>ORGANIZE</span><i />
            <span>VERIFY</span>
          </div>
        </div>
      </section>

      <section className="hiltech-work-index" data-work-reveal>
        <div className="hiltech-work-shell">
          <div className="hiltech-work-section-label">
            <span>01 / EVIDENCE INDEX</span>
            <strong>WHAT THE FIELD RECORD CAN ACTUALLY SHOW.</strong>
          </div>

          <div className="hiltech-work-index-layout">
            <div className="hiltech-work-record-list" role="group" aria-label="Field evidence disciplines">
              {evidenceRecords.map((record) => {
                const active = record.id === activeId;
                return (
                  <button
                    key={record.id}
                    type="button"
                    className={active ? 'is-active' : undefined}
                    aria-pressed={active}
                    onClick={() => setActiveId(record.id)}
                    onMouseEnter={() => setActiveId(record.id)}
                    onFocus={() => setActiveId(record.id)}
                  >
                    <span>{record.index}</span>
                    <div>
                      <small>{record.discipline}</small>
                      <strong>{record.title}</strong>
                    </div>
                    <em>{active ? 'VIEWING' : 'VIEW'}</em>
                  </button>
                );
              })}
            </div>

            <div className="hiltech-work-record-stage" aria-live="polite">
              <div className="hiltech-work-record-media" key={activeRecord.id}>
                <Image
                  src={activeRecord.image}
                  alt={activeRecord.alt}
                  fill
                  sizes="(max-width: 900px) 92vw, 55vw"
                  className="object-cover"
                />
                <span className="hiltech-work-record-scan" aria-hidden="true" />
              </div>
              <div className="hiltech-work-record-context">
                <div>
                  <span>VISIBLE / SUPPORTED</span>
                  <strong>{activeRecord.discipline}</strong>
                </div>
                <p>{activeRecord.visible}</p>
                <div className="hiltech-work-record-trace">
                  <span>{activeRecord.trace}</span>
                  <i />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-work-sequence" data-work-sequence>
        <div className="hiltech-work-shell">
          <div className="hiltech-work-section-label is-dark">
            <span>02 / FIELD SEQUENCE</span>
            <strong>ROUTE → TERMINATE → ORGANIZE → VERIFY</strong>
          </div>

          <div className="hiltech-work-sequence-intro" data-work-reveal>
            <h2>
              PROOF IS NOT<br />
              <em>ONE FINISHED PHOTO.</em>
            </h2>
            <p>
              The record becomes more useful when the physical stages can be read together. These images show different field conditions; they are not presented as one invented project timeline.
            </p>
          </div>

          <div className="hiltech-work-trace">
            <i data-work-trace-line />
          </div>

          <div className="hiltech-work-sequence-list">
            {sequence.map((item, index) => (
              <article key={item.code} data-work-reveal className={index % 2 ? 'is-reverse' : undefined}>
                <div className="hiltech-work-sequence-media" data-work-sequence-media>
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 92vw, 56vw"
                    className="object-cover"
                  />
                  <span>{item.code}</span>
                </div>
                <div className="hiltech-work-sequence-copy">
                  <span>{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="hiltech-work-ledger">
        <div className="hiltech-work-shell">
          <div className="hiltech-work-section-label">
            <span>03 / EVIDENCE LEDGER</span>
            <strong>VISIBLE PROOF / CONTROLLED CLAIMS</strong>
          </div>

          <div className="hiltech-work-ledger-intro" data-work-reveal>
            <div>
              <span>EVIDENCE RULE</span>
              <h2>SHOW WHAT IS THERE.<br /><em>STOP WHERE THE EVIDENCE STOPS.</em></h2>
            </div>
            <p>
              A field image can prove a physical condition. It cannot prove a client, quantity, pass rate, certification, or project result unless that fact is independently verified.
            </p>
          </div>

          <div className="hiltech-work-ledger-grid">
            <article data-work-reveal>
              <div className="hiltech-work-ledger-head">
                <span>SUPPORTED / VISIBLE</span>
                <strong>USE</strong>
              </div>
              {supported.map((item, index) => (
                <div key={item}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </article>

            <article data-work-reveal className="is-restrained">
              <div className="hiltech-work-ledger-head">
                <span>NOT CLAIMED FROM IMAGE ALONE</span>
                <strong>HOLD</strong>
              </div>
              {notClaimed.map((item, index) => (
                <div key={item}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="hiltech-work-close">
        <div className="hiltech-work-shell">
          <div className="hiltech-work-close-grid">
            <div data-work-reveal>
              <span>04 / FROM EVIDENCE TO SCOPE</span>
              <h2>
                SEE THE WORK.<br />
                <em>DEFINE THE NEXT PATH.</em>
              </h2>
            </div>
            <div data-work-reveal>
              <p>
                Use the field record to understand execution quality, then define the actual project scope through Solutions, Capabilities, or a structured RFQ.
              </p>
              <div>
                <Link href="/rfq">Start a Project <span aria-hidden="true">↗</span></Link>
                <Link href="/solutions">Explore Solutions <span aria-hidden="true">↗</span></Link>
                <Link href="/services">Capabilities <span aria-hidden="true">↗</span></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
