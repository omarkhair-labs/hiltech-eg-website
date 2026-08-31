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
              <span className="hiltech-products-kicker">TECHNICAL COMMERCE / RFQ FIRST</span>
              <h1>
                FIND THE EXACT<br />
                <em>REFERENCE.</em>
              </h1>
              <p>
                Search by product code, brand, category, specification, or use case. Build the project request from exact references, then confirm availability, compatibility, and quotation through RFQ review.
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
                <span>PRIMARY ACTION</span>
                <strong>RFQ</strong>
                <small>QUOTE / AVAILABILITY / COMPATIBILITY</small>
              </div>
            </div>
          </div>

          <div className="hiltech-products-hero-rail">
            <span>PRODUCT CODE</span><i />
            <span>BRAND</span><i />
            <span>SPEC</span><i />
            <span>PROJECT FIT</span><i />
            <span>RFQ</span>
          </div>
        </div>
      </section>

      <section className="hiltech-products-catalog-section">
        <div className="hiltech-products-shell">
          <div className="hiltech-products-catalog-head">
            <div>
              <span>01 / FIND & BUILD</span>
              <h2>SEARCH THE CATALOG.<br /><em>BUILD THE REQUEST.</em></h2>
            </div>
            <div>
              <p>
                The catalog is optimized for technical finding, not browsing theater. Exact reference, specification context, and RFQ state take priority over decorative motion.
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
