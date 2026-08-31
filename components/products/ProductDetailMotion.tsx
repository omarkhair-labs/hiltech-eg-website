'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProductDetailMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-product-detail-v2]');
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const context = gsap.context(() => {
      gsap.from('[data-product-detail-title]', {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 7,
        duration: 0.95,
        ease: 'power4.out',
      });

      gsap.from('[data-product-object]', {
        opacity: 0,
        scale: 0.965,
        y: 22,
        duration: 1.05,
        delay: 0.12,
        ease: 'power3.out',
      });

      gsap.from('[data-product-annotation]', {
        opacity: 0,
        y: 10,
        duration: 0.55,
        stagger: 0.07,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.utils.toArray<HTMLElement>('[data-product-detail-reveal]').forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 87%',
            once: true,
          },
        });
      });

      gsap.to('[data-product-route-line]', {
        scaleX: 1,
        transformOrigin: 'left center',
        ease: 'none',
        scrollTrigger: {
          trigger: '.hiltech-product-v2-position',
          start: 'top 76%',
          end: 'bottom 58%',
          scrub: 0.4,
        },
      });

      const object = root.querySelector<HTMLElement>('[data-product-object]');
      if (object) {
        gsap.fromTo(
          object,
          { yPercent: -1.2 },
          {
            yPercent: 1.2,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hiltech-product-v2-stage',
              start: 'top top+=64',
              end: 'bottom top',
              scrub: 0.45,
            },
          },
        );
      }
    }, root);

    return () => context.revert();
  }, []);

  return null;
}
