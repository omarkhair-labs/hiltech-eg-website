'use client';

import Link from 'next/link';
import { useState } from 'react';
import { normalizeRFQItem, normalizeRFQQuantity, readRFQItems, writeRFQItems } from '@/lib/rfq';

interface Props {
  product: {
    id: string;
    name: string;
    category: string;
    brand: string;
    shortSpecs: string;
    priceNote?: string | null;
  };
  intelligenceHref?: string;
  labels?: {
    addToRFQ: string;
    technicalNotes: string;
    backToProducts: string;
    addedToRFQ: string;
  };
  productsHref?: string;
}

export default function ProductDetailActions({ product, intelligenceHref, labels, productsHref = '/products-partners' }: Props) {
  const [added, setAdded] = useState(false);
  const t = labels || {
    addToRFQ: 'Add to RFQ',
    technicalNotes: 'Technical Notes',
    backToProducts: 'Back to Products',
    addedToRFQ: 'Added to RFQ',
  };

  const addToRFQ = () => {
    const existing = readRFQItems();
    const found = existing.find((item) => item.id === product.id);
    const next = found
      ? existing.map((item) => (item.id === product.id ? { ...item, quantity: normalizeRFQQuantity(item.quantity + 1) } : item))
      : [
          ...existing,
          normalizeRFQItem({
            id: product.id,
            name: product.name,
            category: product.category,
            brand: product.brand,
            specs: product.shortSpecs,
            priceNote: product.priceNote,
            quantity: 1,
          }),
        ];

    writeRFQItems(next);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="hiltech-product-detail-actions">
      <div className="hiltech-product-detail-actions-row">
        <button type="button" onClick={addToRFQ} className="hiltech-product-detail-add">{t.addToRFQ}</button>
        {intelligenceHref ? <Link href={intelligenceHref} className="hiltech-product-detail-secondary">{t.technicalNotes}</Link> : null}
        <Link href={productsHref} className="hiltech-product-detail-secondary">{t.backToProducts}</Link>
      </div>
      {added ? <p className="hiltech-product-detail-added">{t.addedToRFQ}</p> : null}
    </div>
  );
}
