import type { Metadata } from 'next';
import Link from 'next/link';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import { getPublicProducts } from '@/lib/server/products-public';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Network Infrastructure Products & RFQ References',
  description:
    'Browse HILTECH product references for fiber optics, structured cabling, patch cords, racks, PDU, faceplates, keystone, and RJ45 infrastructure with RFQ support in Egypt.',
  alternates: {
    canonical: `${site.siteUrl}/products-partners`,
    languages: {
      en: `${site.siteUrl}/products-partners`,
      ar: `${site.siteUrl}/ar/products-partners`,
      'x-default': `${site.siteUrl}/`,
    },
  },
  openGraph: {
    title: 'HILTECH Products | Project Supply & RFQ',
    description:
      'Search exact network infrastructure product references, build a multi-item RFQ, and submit one structured request for project review in Egypt.',
    url: `${site.siteUrl}/products-partners`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const { products, count, source } = await getPublicProducts();
  const activeCategoryCount = new Set(products.map((product) => product.category)).size;

  return (
    <main className="hiltech-products-page">
      <section className="hiltech-products-hero" data-route-identity="object-intent">
        <div className="hiltech-products-shell">
          <div className="hiltech-products-topline">
            <span>PRODUCTS / PROJECT SUPPLY</span>
            <span>{count} CURRENT REFERENCES</span>
            <span>{source.toUpperCase()} CATALOG SOURCE</span>
          </div>

          <div className="hiltech-products-hero-grid">
            <div>
              <span className="hiltech-products-kicker">PHYSICAL INFRASTRUCTURE LIBRARY / PROCUREMENT SYSTEM</span>
              <h1>
                ENTER THE<br />
                <em>PHYSICAL LIBRARY.</em>
              </h1>
              <p>
                Every network system resolves into physical references: cable, connector, rack, pathway, endpoint, power, camera. Explore the system first, then move from family to exact code and into one structured RFQ.
              </p>
            </div>

            <div className="hiltech-products-object-dock" aria-label="Physical library entry model">
              <div className="hiltech-products-object-dock-head">
                <span>OBJECT / ENTRY DOCK</span>
                <strong>{count} LIVE REFERENCES</strong>
              </div>

              <div className="hiltech-products-object-visual" aria-hidden="true">
                <svg viewBox="0 0 640 420">
                  <rect x="170" y="48" width="300" height="320" rx="4" fill="none" stroke="#8ff257" strokeWidth="1.4" />
                  <rect x="206" y="84" width="228" height="42" rx="2" fill="none" stroke="#607268" />
                  <rect x="206" y="146" width="228" height="42" rx="2" fill="none" stroke="#607268" />
                  <rect x="206" y="208" width="228" height="42" rx="2" fill="none" stroke="#607268" />
                  <rect x="206" y="270" width="228" height="58" rx="2" fill="none" stroke="#607268" />
                  {Array.from({ length: 8 }).map((_, index) => (
                    <circle key={index} cx={236 + index * 24} cy="105" r="4" fill={index < 5 ? '#8ff257' : '#26342b'} />
                  ))}
                  <path d="M206 167 H132 V334 H68" fill="none" stroke="#8ff257" strokeWidth="1.5" />
                  <path d="M434 229 H520 V106 H584" fill="none" stroke="#8ff257" strokeWidth="1.5" />
                  <circle cx="68" cy="334" r="7" fill="#071008" stroke="#8ff257" strokeWidth="1.4" />
                  <circle cx="584" cy="106" r="7" fill="#071008" stroke="#8ff257" strokeWidth="1.4" />
                </svg>
              </div>

              <div className="hiltech-products-object-entries">
                <div>
                  <span>01 / EXACT</span>
                  <strong>REFERENCE</strong>
                  <small>{count} CURRENT CODES</small>
                </div>
                <div>
                  <span>02 / SYSTEM</span>
                  <strong>FAMILY</strong>
                  <small>{activeCategoryCount} ACTIVE FAMILIES</small>
                </div>
                <div>
                  <span>03 / PROJECT</span>
                  <strong>FIT</strong>
                  <small>REFERENCE → RFQ</small>
                </div>
              </div>
            </div>
          </div>

          <div className="hiltech-products-hero-rail">
            <span>SYSTEM</span><i />
            <span>FAMILY</span><i />
            <span>REFERENCE</span><i />
            <span>PROJECT FIT</span><i />
            <span>RFQ</span>
          </div>
        </div>
      </section>

      <section className="hiltech-products-catalog-section">
        <div className="hiltech-products-shell">
          <div className="hiltech-products-catalog-head">
            <div>
              <span>01 / CHOOSE ENTRY</span>
              <h2>START FROM WHAT<br /><em>YOU ALREADY KNOW.</em></h2>
            </div>
            <div>
              <p>
                Enter by exact reference, infrastructure system, or project scope. The physical library stays available for exploration, but an expert user never has to consume it before exact finding.
              </p>
              <Link href="/solutions/project-supply-rfq">How project supply works <span aria-hidden="true">↗</span></Link>
            </div>
          </div>

          <ProductsClient initialProducts={products} />

          <div className="hiltech-products-disclaimer">
            <span>CATALOG EVIDENCE RULE</span>
            <p>{productDisclaimer} Product visuals support catalog clarity; final specifications, compatibility, price, and availability are confirmed during RFQ review.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
