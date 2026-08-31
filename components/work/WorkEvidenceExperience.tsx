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
    image: '/copper-riser-routing.jpg',
    alt: 'Structured cable routing through a field pathway.',
  },
  {
    code: '02 / TERMINATE',
    title: 'RESOLVE THE CONNECTION.',
    image: '/fiber-distribution-panel.jpg',
    alt: 'Fiber distribution and termination field evidence.',
  },
  {
    code: '03 / ORGANIZE',
    title: 'LEAVE IT SERVICEABLE.',
    image: '/rack-cable-management-blue.jpg',
    alt: 'Rack cable management and patching field evidence.',
  },
  {
    code: '04 / VERIFY',
    title: 'END WITH A CHECK.',
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
        y: 18,
        duration: 0.75,
        stagger: 0.08,
        ease: 'power3.out',
      });

      gsap.from('[data-work-contact-sheet] > *', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.07,
        delay: 0.16,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('[data-work-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 18,
          duration: 0.62,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            once: true,
          },
        });
      });

      gsap.to('[data-work-trace-line]', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '[data-work-sequence]',
          start: 'top 82%',
          end: 'bottom 74%',
          scrub: 0.35,
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
            <span>ARCHIVE / NOT CASE-STUDY THEATER</span>
          </div>

          <div className="hiltech-work-hero-archive">
            <div className="hiltech-work-hero-copy">
              <span data-work-hero-kicker>FIELD RECORD / PROOF</span>
              <h1 data-work-hero-title>
                THE WORK<br />
                <em>LEAVES A TRACE.</em>
              </h1>
              <p data-work-hero-copy>
                The archive shows what the field record can actually support: route, termination, technical-space organization, testing, and execution context.
              </p>
            </div>

            <div className="hiltech-work-contact-sheet" data-work-contact-sheet>
              {evidenceRecords.map((record) => (
                <div key={record.id}>
                  <div>
                    <Image
                      src={record.image}
                      alt={record.alt}
                      fill
                      sizes="(max-width: 900px) 45vw, 22vw"
                      className="object-cover"
                    />
                  </div>
                  <span>{record.index} / {record.discipline}</span>
                </div>
              ))}
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
            <strong>SCAN THE RECORD. OPEN ONE CONDITION AT A TIME.</strong>
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

          <div className="hiltech-work-trace">
            <i data-work-trace-line />
          </div>

          <div className="hiltech-work-sequence-strip">
            {sequence.map((item) => (
              <article key={item.code} data-work-reveal>
                <div className="hiltech-work-sequence-media">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 900px) 45vw, 24vw"
                    className="object-cover"
                  />
                </div>
                <span>{item.code}</span>
                <strong>{item.title}</strong>
              </article>
            ))}
          </div>

          <p className="hiltech-work-sequence-note" data-work-reveal>
            These are separate evidence records arranged as a physical sequence. They are not presented as one invented project timeline.
          </p>
        </div>
      </section>

      <section className="hiltech-work-ledger">
        <div className="hiltech-work-shell">
          <div className="hiltech-work-section-label">
            <span>03 / EVIDENCE LEDGER</span>
            <strong>VISIBLE PROOF / CONTROLLED CLAIMS</strong>
          </div>

          <div className="hiltech-work-ledger-rule" data-work-reveal>
            <span>EVIDENCE RULE</span>
            <strong>SHOW WHAT IS THERE. STOP WHERE THE EVIDENCE STOPS.</strong>
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
          <div className="hiltech-work-close-row" data-work-reveal>
            <div>
              <span>04 / FROM EVIDENCE TO SCOPE</span>
              <strong>FIELD PROOF IS THE INPUT. THE NEXT PROJECT STILL NEEDS A REAL SCOPE.</strong>
            </div>
            <nav aria-label="Work next actions">
              <Link href="/rfq">Start a Project <span aria-hidden="true">↗</span></Link>
              <Link href="/solutions">Solutions <span aria-hidden="true">↗</span></Link>
              <Link href="/services">Capabilities <span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
