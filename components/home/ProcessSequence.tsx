'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const stages = [
  {
    key: 'build',
    index: '01',
    title: 'BUILD',
    state: 'STRUCTURE / ASSEMBLED',
    body: 'Terminations, racks, endpoints, and containment move from parts into one installed structure.',
  },
  {
    key: 'route',
    index: '02',
    title: 'ROUTE',
    state: 'PATH / ESTABLISHED',
    body: 'The installed structure becomes a continuous physical path from source to destination.',
  },
  {
    key: 'test',
    index: '03',
    title: 'TEST',
    state: 'MEASUREMENT / ACTIVE',
    body: 'Copper and fiber links move into measurement, remediation, and retest before handover.',
  },
  {
    key: 'prove',
    index: '04',
    title: 'PROVE',
    state: 'HANDOVER / READY',
    body: 'The path settles into a documented handover state only after validation closes the loop.',
  },
] as const;

export default function ProcessSequence() {
  const rootRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const modules = root.querySelectorAll<SVGElement>('[data-process-module]');
    const ports = root.querySelectorAll<SVGElement>('[data-process-port]');
    const route = root.querySelector<SVGPathElement>('[data-process-route]');
    const signal = root.querySelector<SVGCircleElement>('[data-process-signal]');
    const testLayer = root.querySelector<SVGGElement>('[data-process-test]');
    const trace = root.querySelector<SVGPathElement>('[data-process-trace]');
    const proof = root.querySelector<SVGGElement>('[data-process-proof]');
    const buildGuides = root.querySelectorAll<SVGElement>('[data-build-guide]');

    if (!route || !signal || !testLayer || !trace || !proof) return;

    const moduleOffsets = [
      { x: -76, y: 42 },
      { x: -28, y: -54 },
      { x: 44, y: 48 },
      { x: 72, y: -34 },
    ];

    modules.forEach((module, index) => {
      const offset = moduleOffsets[index] ?? { x: 0, y: 0 };
      gsap.set(module, {
        opacity: 0.28,
        scale: 0.88,
        x: offset.x,
        y: offset.y,
        transformOrigin: 'center center',
      });
    });
    gsap.set(ports, { opacity: 0.1, scale: 0.62, transformOrigin: 'center center' });
    gsap.set(route, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(signal, { opacity: 0 });
    gsap.set(testLayer, { opacity: 0 });
    gsap.set(trace, { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(proof, { opacity: 0, scale: 0.97, transformOrigin: 'center center' });
    gsap.set(buildGuides, { opacity: 0.2 });

    const tl = gsap.timeline({ paused: true });

    tl.to(modules, {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      duration: 0.62,
      stagger: 0.08,
      ease: 'power3.out',
    }, 0)
      .to(buildGuides, {
        opacity: 0.48,
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
      }, 0.18)
      .to(ports, {
        opacity: 1,
        scale: 1,
        duration: 0.28,
        stagger: 0.025,
        ease: 'back.out(1.8)',
      }, 0.34)
      .to(route, {
        strokeDashoffset: 0,
        duration: 0.72,
        ease: 'power2.inOut',
      }, 1)
      .set(signal, { opacity: 1 }, 1.02)
      .to(signal, {
        duration: 0.82,
        ease: 'none',
        motionPath: {
          path: route,
          align: route,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      }, 1.05)
      .to(testLayer, {
        opacity: 1,
        duration: 0.42,
        ease: 'power2.out',
      }, 2)
      .to(trace, {
        strokeDashoffset: 0,
        duration: 0.78,
        ease: 'power1.inOut',
      }, 2.1)
      .to('[data-test-scan]', {
        x: 430,
        duration: 0.75,
        ease: 'none',
      }, 2.08)
      .to('[data-process-test-grid]', {
        opacity: 0.65,
        duration: 0.45,
      }, 2.15)
      .to(proof, {
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'power3.out',
      }, 3)
      .to('[data-process-lock]', {
        opacity: 1,
        strokeDashoffset: 0,
        duration: 0.48,
        stagger: 0.06,
        ease: 'power2.out',
      }, 3.1)
      .to(signal, {
        scale: 1.35,
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        transformOrigin: 'center center',
      }, 3.42);

    timelineRef.current = tl;

    if (reduced) {
      tl.progress(1);
      setActiveStage(3);
      return () => {
        tl.kill();
      };
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      start: 'top top+=64',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;
        tl.progress(progress);
        const next = Math.min(3, Math.floor(progress * 4));
        setActiveStage((current) => (current === next ? current : next));
      },
    });

    return () => {
      trigger.kill();
      tl.kill();
      timelineRef.current = null;
    };
  }, []);

  const stage = stages[activeStage];

  return (
    <section id="h05" ref={rootRef} className="hiltech-process-section">
      <div className="hiltech-process-sticky">
        <div className="hiltech-process-shell">
          <div className="hiltech-process-topline">
            <span>05 / 12</span>
            <span>SIGNATURE DELIVERY SEQUENCE</span>
            <span>ILLUSTRATIVE PROCESS STATE</span>
          </div>

          <div className="hiltech-process-layout">
            <div className="hiltech-process-copy">
              <div className="hiltech-process-stage-meta">
                <span>{stage.index} / 04</span>
                <strong>{stage.state}</strong>
              </div>

              <div key={stage.key} className="hiltech-process-stage-swap">
                <h2>{stage.title}</h2>
                <p>{stage.body}</p>
              </div>
            </div>

            <div className="hiltech-process-visual">
              <div className="hiltech-process-visual-meta">
                <span>SOURCE / PHYSICAL LAYER</span>
                <span>DELIVERY LOGIC / BUILD → PROVE</span>
                <span>DESTINATION / HANDOVER</span>
              </div>

              <svg viewBox="0 0 900 580" role="presentation" aria-hidden="true">
                <defs>
                  <pattern id="process-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M36 0H0V36" className="hiltech-process-grid-path" />
                  </pattern>
                  <linearGradient id="route-gradient" x1="0" x2="1">
                    <stop offset="0%" stopColor="#638052" />
                    <stop offset="50%" stopColor="#a5ff78" />
                    <stop offset="100%" stopColor="#638052" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="900" height="580" fill="url(#process-grid)" data-process-test-grid />

                <g className="hiltech-process-build-guides">
                  <path data-build-guide d="M84 116 H816" />
                  <path data-build-guide d="M84 464 H816" />
                  <path data-build-guide d="M160 84 V496" />
                  <path data-build-guide d="M740 84 V496" />
                </g>

                <g data-process-module className="hiltech-process-module">
                  <rect x="90" y="224" width="132" height="132" rx="5" />
                  <path d="M112 248 H200 M112 270 H200 M112 292 H200 M112 314 H200" />
                  <circle cx="192" cy="336" r="5" />
                </g>

                <g data-process-module className="hiltech-process-module">
                  <rect x="306" y="174" width="158" height="232" rx="5" />
                  {Array.from({ length: 6 }).map((_, row) => (
                    <g key={row}>
                      <line x1="330" y1={216 + row * 29} x2="440" y2={216 + row * 29} />
                      <rect data-process-port x="408" y={207 + row * 29} width="20" height="9" rx="1" />
                    </g>
                  ))}
                </g>

                <g data-process-module className="hiltech-process-module">
                  <rect x="542" y="138" width="126" height="304" rx="5" />
                  {Array.from({ length: 8 }).map((_, row) => (
                    <line key={row} x1="564" y1={178 + row * 31} x2="646" y2={178 + row * 31} />
                  ))}
                  <rect data-process-port x="622" y="158" width="20" height="9" rx="1" />
                  <rect data-process-port x="622" y="406" width="20" height="9" rx="1" />
                </g>

                <g data-process-module className="hiltech-process-module">
                  <rect x="744" y="242" width="74" height="96" rx="5" />
                  <circle data-process-port cx="781" cy="290" r="9" />
                </g>

                <path
                  data-process-route
                  pathLength="1"
                  className="hiltech-process-route"
                  d="M196 336 C250 336 248 246 330 246 H430 C496 246 486 326 566 326 H642 C702 326 710 290 781 290"
                />
                <circle data-process-signal className="hiltech-process-signal" r="7" />

                <g data-process-test className="hiltech-process-test">
                  <line x1="244" y1="496" x2="706" y2="496" />
                  <line x1="244" y1="456" x2="244" y2="524" />
                  <line x1="360" y1="468" x2="360" y2="524" />
                  <line x1="476" y1="468" x2="476" y2="524" />
                  <line x1="592" y1="468" x2="592" y2="524" />
                  <line x1="706" y1="456" x2="706" y2="524" />
                  <path
                    data-process-trace
                    pathLength="1"
                    className="hiltech-process-trace"
                    d="M244 496 L302 496 L324 488 L348 504 L382 496 L430 496 L452 482 L476 512 L512 496 L560 496 L586 490 L612 502 L646 496 L706 496"
                  />
                  <line data-test-scan x1="254" y1="450" x2="254" y2="532" className="hiltech-process-scan" />
                  <text x="244" y="552">TEST TRACE / ILLUSTRATIVE</text>
                </g>

                <g data-process-proof className="hiltech-process-proof">
                  <rect x="64" y="92" width="772" height="388" rx="8" />
                  <path data-process-lock pathLength="1" d="M64 146 V92 H118" />
                  <path data-process-lock pathLength="1" d="M782 92 H836 V146" />
                  <path data-process-lock pathLength="1" d="M64 426 V480 H118" />
                  <path data-process-lock pathLength="1" d="M782 480 H836 V426" />
                  <g className="hiltech-process-proof-mark">
                    <circle cx="738" cy="138" r="24" />
                    <path d="M726 139 L735 148 L752 128" />
                  </g>
                  <text x="92" y="126">PATH / VERIFIED</text>
                  <text x="92" y="446">HANDOVER STATE / READY</text>
                </g>
              </svg>
            </div>
          </div>

          <ol className="hiltech-process-rail" aria-label="Build route test prove sequence">
            {stages.map((item, index) => (
              <li key={item.key} className={activeStage === index ? 'is-active' : undefined}>
                <span>{item.index}</span>
                <strong>{item.title}</strong>
                <i aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
