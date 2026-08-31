'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { ProductIntelligenceCategory } from '@/content/product-intelligence';
import type { ProductItem } from '@/content/products';
import { productDetailPath } from '@/lib/products/product-code';
import {
  getRFQWhatsappLink,
  normalizeRFQItem,
  normalizeRFQQuantity,
  readRFQItems,
  type RFQItem,
  writeRFQItems,
} from '@/lib/rfq';

interface Props {
  category: ProductIntelligenceCategory;
  relatedProducts: ProductItem[];
}

function toRFQItem(item: ProductItem): RFQItem {
  return normalizeRFQItem({
    id: item.id,
    name: item.name,
    brand: item.brand,
    category: item.category,
    specs: item.shortSpecs,
    quantity: 1,
    priceNote: item.priceNote,
  });
}

export default function CategoryIntelligenceClient({ category, relatedProducts }: Props) {
  const [items, setItems] = useState<RFQItem[]>([]);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const basketCount = useMemo(
    () => items.reduce((total, entry) => total + normalizeRFQQuantity(entry.quantity), 0),
    [items],
  );

  const starterItems = relatedProducts.slice(0, 3);
  const visibleReferences = relatedProducts;

  const addItem = (item: ProductItem) => {
    const normalized = toRFQItem(item);
    setItems((previous) => {
      const found = previous.find((entry) => entry.id === item.id);
      if (found) {
        return previous.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: normalizeRFQQuantity(entry.quantity + 1) }
            : entry,
        );
      }
      return [...previous, normalized];
    });

    setJustAdded(item.id);
    window.setTimeout(() => setJustAdded((current) => (current === item.id ? null : current)), 1500);
  };

  return (
    <div className="hiltech-product-intelligence-client">
      <section className="hiltech-intel-procurement" data-intel-rfq>
        <div className="hiltech-product-intelligence-label">
          <span>05 / RFQ TRANSLATION</span>
          <strong>CATEGORY CONTEXT → LIVE REFERENCES → PROJECT REQUEST</strong>
        </div>

        <div className="hiltech-intel-procurement-grid">
          <div>
            <span>CURRENT CATEGORY STATE</span>
            <h2>
              TURN CONTEXT INTO<br />
              <em>A REQUEST.</em>
            </h2>
            <p>
              Use the guide to define the technical context, then add exact live references where the catalog supports them. Quantity, compatibility, price, and availability remain confirmed during RFQ review.
            </p>
          </div>

          <div className="hiltech-intel-procurement-state">
            <div>
              <span>LIVE REFERENCES</span>
              <strong>{relatedProducts.length}</strong>
              <small>{relatedProducts.length ? 'CURRENT CATALOG MATCHES' : 'RFQ-ONLY CATEGORY CONTEXT'}</small>
            </div>
            <div>
              <span>RFQ BASKET</span>
              <strong>{basketCount}</strong>
              <small>{basketCount === 1 ? 'UNIT CURRENTLY SELECTED' : 'UNITS CURRENTLY SELECTED'}</small>
            </div>
          </div>
        </div>

        {starterItems.length ? (
          <div className="hiltech-intel-starters" data-intel-starters>
            <div>
              <span>STARTER REFERENCES</span>
              <strong>ADD A FEW EXACT ITEMS, THEN EDIT THE REAL SCOPE IN RFQ.</strong>
            </div>
            <div>
              {starterItems.map((item, index) => (
                <button key={item.id} type="button" onClick={() => addItem(item)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <small>{item.id}</small>
                    <strong>{item.name}</strong>
                  </div>
                  <em>{justAdded === item.id ? 'ADDED' : 'ADD +'}</em>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="hiltech-intel-no-live" data-intel-no-live>
            <span>NO LIVE PUBLIC REFERENCES IN THIS FAMILY</span>
            <p>
              The technical guide remains useful for scoping. Product selection for this family should continue through RFQ until live references are published.
            </p>
            <Link href="/rfq">START RFQ ↗</Link>
          </div>
        )}
      </section>

      <section className="hiltech-intel-reference-section" data-intel-products>
        <div className="hiltech-product-intelligence-label">
          <span>06 / CURRENT REFERENCES</span>
          <strong>EXACT CODES / SPEC CONTEXT / PROCUREMENT ACTION</strong>
        </div>

        <div className="hiltech-intel-reference-head">
          <div>
            <span>{category.eyebrow}</span>
            <h2>
              CURRENT<br />
              <em>REFERENCE INDEX.</em>
            </h2>
          </div>
          <p>
            This index is intentionally quieter than the Product World. It exists to move from category intelligence back to exact procurement without returning to a promotional card grid.
          </p>
        </div>

        {visibleReferences.length ? (
          <div className="hiltech-intel-reference-index">
            {visibleReferences.map((item, index) => (
              <article data-intel-product key={item.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div className="hiltech-intel-reference-main">
                  <small>{item.id}</small>
                  <h3>{item.name}</h3>
                  <p>{item.useCase}</p>
                </div>
                <div className="hiltech-intel-reference-spec">
                  <span>{item.brand}</span>
                  <strong>{item.shortSpecs}</strong>
                  <small>{item.availabilityNote?.trim() || 'AVAILABILITY CONFIRMED DURING RFQ'}</small>
                </div>
                <div className="hiltech-intel-reference-actions">
                  <button type="button" onClick={() => addItem(item)}>
                    {justAdded === item.id ? 'ADDED' : 'ADD TO RFQ'}
                  </button>
                  <Link href={productDetailPath(item.id)}>OPEN REFERENCE ↗</Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="hiltech-intel-empty-index">
            <span>REFERENCE INDEX / EMPTY</span>
            <strong>NO CURRENT PUBLIC CODES IN THIS FAMILY.</strong>
            <p>Keep the system context and RFQ checklist; HILTECH can confirm the product mix against the project request.</p>
          </div>
        )}
      </section>

      <section className="hiltech-intel-close" data-intel-final>
        <div>
          <span>07 / PROCUREMENT CLOSE</span>
          <h2>
            THE GUIDE DEFINES CONTEXT.<br />
            <em>THE RFQ CONFIRMS THE PART.</em>
          </h2>
        </div>

        <div>
          <p>
            Your current basket contains {basketCount} {basketCount === 1 ? 'unit' : 'units'}. Continue to structured RFQ review, return to the Physical Library, or send the current basket through WhatsApp.
          </p>
          <div>
            <Link href="/rfq">REVIEW RFQ <span aria-hidden="true">↗</span></Link>
            <Link href="/products-partners">PHYSICAL LIBRARY <span aria-hidden="true">↗</span></Link>
            <a
              href={getRFQWhatsappLink(items.map((item) => normalizeRFQItem(item)))}
              target="_blank"
              rel="noreferrer"
            >
              WHATSAPP HILTECH <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
