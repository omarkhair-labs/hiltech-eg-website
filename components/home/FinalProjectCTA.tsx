'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { site } from '@/content/site';

gsap.registerPlugin(ScrollTrigger);

export default function FinalProjectCTA() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-h12-line]', {
        opacity: 0,
        xPercent: -2.5,
        duration: 0.82,
        stagger: 0.07,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 76%',
          once: true,
        },
      });

      gsap.from('.hiltech-final-signal i', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 1.1,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('.hiltech-final-signal b', {
        opacity: 0,
        scale: 0.2,
        duration: 0.45,
        delay: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="h12" ref={rootRef} className="hiltech-final-section">
      <div className="hiltech-final-shell">
        <div className="hiltech-final-topline">
          <span>12 / 12</span>
          <span>START THE NEXT SYSTEM</span>
          <span>CAIRO / EGYPT</span>
        </div>

        <div className="hiltech-final-signal" aria-hidden="true">
          <span>PATH / OPEN</span>
          <i />
          <b />
        </div>

        <div className="hiltech-final-title">
          <h2>
            <span data-h12-line>START WITH</span>
            <span data-h12-line className="is-outline">THE PHYSICAL</span>
            <span data-h12-line>PATH.</span>
          </h2>
        </div>

        <div className="hiltech-final-actions">
          <div className="hiltech-final-primary">
            <span>PROJECT PATH</span>
            <p>Start with scope, quantities, location, timeline, and the infrastructure you need to deliver.</p>
            <Link href="/rfq">Start RFQ <span aria-hidden="true">↗</span></Link>
          </div>

          <div className="hiltech-final-secondary">
            <span>PROCUREMENT PATH</span>
            <p>Search current product references first, then move selected items into one structured request.</p>
            <Link href="/products-partners">Browse catalog <span aria-hidden="true">↗</span></Link>
          </div>
        </div>

        <div className="hiltech-final-contact">
          <div>
            <span>EMAIL</span>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </div>
          <div>
            <span>PHONE</span>
            <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
          </div>
          <div>
            <span>LOCATION</span>
            <strong>Cairo, Egypt</strong>
          </div>
          <Link href="/contact">Contact HILTECH <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
