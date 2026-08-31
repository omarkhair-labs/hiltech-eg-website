import type { Metadata } from 'next';
import Link from 'next/link';
import { productDisclaimer, productCategories } from '@/content/products';
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

  return (
    <main className="hiltech-products-page">
      <section className="hiltech-products-hero">
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

            <div className="hiltech-products-hero-panel">
              <div>
                <span>CATALOG MODEL</span>
                <strong>{count}</strong>
                <small>CURRENT PUBLIC REFERENCES</small>
              </div>
              <div>
                <span>CATEGORY COVERAGE</span>
                <strong>{productCategories.length}</strong>
                <small>INFRASTRUCTURE FAMILIES</small>
              </div>
              <div>
                <span>PROCUREMENT STATE</span>
                <strong>RFQ</strong>
                <small>REFERENCE → SCOPE → CONFIRMATION</small>
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
              <span>01 / PRODUCT WORLD</span>
              <h2>EXPLORE THE SYSTEM.<br /><em>THEN FIND THE PART.</em></h2>
            </div>
            <div>
              <p>
                The product experience starts from physical infrastructure families, then collapses into exact reference finding. Motion and 3D explain the system; procurement controls stay fast and explicit.
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
