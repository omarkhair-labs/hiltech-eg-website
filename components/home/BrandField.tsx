'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/content/products-runtime';

gsap.registerPlugin(ScrollTrigger);

const blockedBrands = new Set([
  'MIX',
  'CHINA',
  'LOCAL',
  'FIBER CABLE READY',
  'POINT',
  'CORNET',
]);

const canonicalBrand: Record<string, string> = {
  LEVITON: 'Leviton',
  PANDUIT: 'Panduit',
  'DEMA PROLINK': 'DEMA Prolink',
  LEGRAND: 'Legrand',
  HPE: 'HPE',
  CommScope: 'CommScope',
  'Schneider Electric': 'Schneider Electric',
  EXCEL: 'Excel',
  CONTEG: 'Conteg',
  'PREMIUM LINE': 'Premium Line',
  FUMO: 'Fumo',
  PROLINK: 'Prolink',
  BLACKSTONE: 'Blackstone',
  IBM: 'IBM',
};

export default function BrandField() {
  const rootRef = useRef<HTMLElement>(null);

  const brands = useMemo(() => {
    const map = new Map<string, { name: string; count: number; categories: Set<string> }>();

    for (const product of products) {
      if (blockedBrands.has(product.brand)) continue;
      const name = canonicalBrand[product.brand] ?? product.brand;
      const current = map.get(name) ?? { name, count: 0, categories: new Set<string>() };
      current.count += 1;
      current.categories.add(product.category);
      map.set(name, current);
    }

    return [...map.values()]
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .slice(0, 9)
      .map((entry) => ({
        name: entry.name,
        count: entry.count,
        categories: [...entry.categories],
      }));
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);
  const active = brands[activeIndex];

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const context = gsap.context(() => {
      gsap.from('[data-h08-title]', {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 8,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('[data-brand-row]', {
        opacity: 0,
        y: 18,
        duration: 0.58,
        stagger: 0.055,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hiltech-brand-list',
          start: 'top 84%',
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="h08" ref={rootRef} className="hiltech-brand-section">
      <div className="hiltech-brand-shell">
        <div className="hiltech-brand-topline">
          <span>08 / 12</span>
          <span>TECHNOLOGY ECOSYSTEM</span>
          <span>CATALOG PRESENCE / NOT PARTNERSHIP CLAIM</span>
        </div>

        <header className="hiltech-brand-heading">
          <h2 data-h08-title>
            THE SYSTEM IS<br />
            <span>MULTI-BRAND.</span>
          </h2>
          <div>
            <p>
              HILTECH’s current catalog spans multiple infrastructure manufacturers and product ecosystems. Brand presence here means current catalog reference only — not an implied formal partnership.
            </p>
            <small>{products.length} CURRENT CATALOG REFERENCES</small>
          </div>
        </header>

        <div className="hiltech-brand-body">
          <div className="hiltech-brand-list" role="list" aria-label="Brands represented in the current HILTECH catalog">
            {brands.map((brand, index) => (
              <button
                key={brand.name}
                type="button"
                role="listitem"
                data-brand-row
                className={activeIndex === index ? 'is-active' : undefined}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{brand.name}</strong>
                <small>{String(brand.count).padStart(2, '0')} LISTINGS</small>
              </button>
            ))}
          </div>

          <aside className="hiltech-brand-inspector">
            <div className="hiltech-brand-inspector-head">
              <span>ACTIVE / {String(activeIndex + 1).padStart(2, '0')}</span>
              <span>CATALOG EVIDENCE</span>
            </div>

            <div key={active.name} className="hiltech-brand-inspector-swap">
              <strong>{active.name}</strong>
              <dl>
                <div>
                  <dt>LISTINGS</dt>
                  <dd>{active.count}</dd>
                </div>
                <div>
                  <dt>CATEGORY COVERAGE</dt>
                  <dd>{active.categories.join(' / ')}</dd>
                </div>
                <div>
                  <dt>RELATIONSHIP LABEL</dt>
                  <dd>Catalog brand / current product references</dd>
                </div>
              </dl>
            </div>

            <div className="hiltech-brand-note">
              <span>EVIDENCE GATE</span>
              <p>Authorized reseller, distributor, certified partner, or strategic partner labels require separate verified company evidence.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
