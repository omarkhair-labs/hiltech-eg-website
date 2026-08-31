'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  productCategories,
  products,
  type ProductCategory,
  type ProductItem,
} from '@/content/products-runtime';

gsap.registerPlugin(ScrollTrigger);

const representativeIds: Partial<Record<ProductCategory, string>> = {
  'Fiber Optic Systems': 'panduit-nkfpx1bn3nnm001-om3-sc-fiber-optic-cable-1m',
  'Copper / CAT6 Cabling': 'legrand-category-6-uutp-lszh-cable-305m-blue',
  'Patch Cords & Connectivity': 'commscope-fdxlclc42-mxf010-om4-lc-lc-duplex-fiber-patch-cord-10ft',
  'Faceplates / Keystone / RJ45': 'legrand-rj45-socket-category-6-utp-1-module-white',
  'Cabinets / Racks / PDU': 'كابينة-شنايدر-إلكتريك-schneider-electric-enclosure-700-gvbc7',
};

const categoryShort: Partial<Record<ProductCategory, string>> = {
  'Fiber Optic Systems': 'FIBER',
  'Copper / CAT6 Cabling': 'COPPER',
  'Patch Cords & Connectivity': 'PATCHING',
  'Faceplates / Keystone / RJ45': 'ENDPOINTS',
  'Cabinets / Racks / PDU': 'RACK / POWER',
};

function findRepresentative(category: ProductCategory): ProductItem {
  return (
    products.find((product) => product.id === representativeIds[category]) ||
    products.find((product) => product.category === category)!
  );
}

export default function CatalogBridge() {
  const rootRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(productCategories[0]);

  const categories = useMemo(
    () =>
      productCategories.map((category) => ({
        category,
        short: categoryShort[category] ?? category,
        count: products.filter((product) => product.category === category).length,
        representative: findRepresentative(category),
      })),
    [],
  );

  const active = categories.find((entry) => entry.category === activeCategory) || categories[0];
  const product = active.representative;
  const categoryHref = `/products-partners?category=${encodeURIComponent(active.category)}`;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const context = gsap.context(() => {
      gsap.from('[data-h07-heading]', {
        clipPath: 'inset(0 0 100% 0)',
        yPercent: 9,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
      });

      gsap.from('[data-h07-stage]', {
        opacity: 0,
        y: 28,
        duration: 0.82,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '[data-h07-stage]',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.from('[data-product-category]', {
        opacity: 0,
        y: 14,
        stagger: 0.06,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hiltech-catalog-category-rail',
          start: 'top 88%',
          once: true,
        },
      });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="h07" ref={rootRef} className="hiltech-catalog-bridge">
      <div className="hiltech-catalog-shell">
        <div className="hiltech-catalog-topline">
          <span>07 / 12</span>
          <span>COMPONENTS / PROCUREMENT BRIDGE</span>
          <span>CATALOG SNAPSHOT / {String(products.length).padStart(2, '0')} REFERENCES</span>
        </div>

        <header className="hiltech-catalog-heading">
          <div>
            <span>BILL OF MATERIALS</span>
            <h2 data-h07-heading>
              FROM SYSTEM<br />
              TO B.O.M.
            </h2>
          </div>
          <p>
            The physical system resolves into exact cable, patching, endpoint, rack, and fiber references that can move into one project RFQ.
          </p>
        </header>

        <div data-h07-stage className="hiltech-catalog-stage">
          <div className="hiltech-catalog-media">
            <div className="hiltech-catalog-media-meta">
              <span>CATALOG MEDIA / CURRENT LISTING</span>
              <span>{active.category}</span>
            </div>

            <div key={product.id} className="hiltech-catalog-image-swap">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={`${product.name} — HILTECH catalog reference`}
                  fill
                  sizes="(max-width: 700px) 90vw, 48vw"
                  className="object-contain"
                  priority={false}
                />
              ) : (
                <div className="hiltech-catalog-image-fallback">
                  <span>IMAGE NOT AVAILABLE</span>
                  <strong>{product.name}</strong>
                </div>
              )}
            </div>

            <div className="hiltech-catalog-media-axis" aria-hidden="true">
              <span>0</span><i /><span>PRODUCT / REFERENCE</span><i /><span>1</span>
            </div>
          </div>

          <div className="hiltech-catalog-spec">
            <div className="hiltech-catalog-spec-index">
              <span>{String(productCategories.indexOf(active.category) + 1).padStart(2, '0')} / 05</span>
              <strong>{active.count} REFERENCES</strong>
            </div>

            <div key={active.category} className="hiltech-catalog-spec-swap">
              <small>{active.category}</small>
              <h3>{active.short}</h3>

              <dl>
                <div>
                  <dt>BRAND</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div>
                  <dt>REFERENCE</dt>
                  <dd>{product.name}</dd>
                </div>
                <div>
                  <dt>SPEC</dt>
                  <dd>{product.shortSpecs}</dd>
                </div>
                <div>
                  <dt>USE</dt>
                  <dd>{product.useCase}</dd>
                </div>
              </dl>

              <Link href={categoryHref} className="hiltech-catalog-category-link">
                Open category <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="hiltech-catalog-category-rail" role="tablist" aria-label="Catalog categories">
          {categories.map((entry, index) => (
            <button
              key={entry.category}
              type="button"
              role="tab"
              aria-selected={active.category === entry.category}
              data-product-category
              className={active.category === entry.category ? 'is-active' : undefined}
              onClick={() => setActiveCategory(entry.category)}
              onMouseEnter={() => setActiveCategory(entry.category)}
              onFocus={() => setActiveCategory(entry.category)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{entry.short}</strong>
              <small>{String(entry.count).padStart(2, '0')}</small>
            </button>
          ))}
        </div>

        <div className="hiltech-catalog-foot">
          <div>
            <span>PROCUREMENT MODE</span>
            <p>Search by reference, brand, category, or specification in the full catalog, then add multiple items to one RFQ basket.</p>
          </div>
          <Link href="/products-partners">Browse full catalog <span aria-hidden="true">↗</span></Link>
          <Link href="/rfq">Start RFQ <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
  );
}
