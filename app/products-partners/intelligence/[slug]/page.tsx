import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductIntelligenceSystemDiagram from '@/components/products/ProductIntelligenceSystemDiagram';
import { productIntelligenceBySlug, productIntelligenceCategories } from '@/content/product-intelligence';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import { getPublicProducts } from '@/lib/server/products-public';
import CategoryIntelligenceClient from './CategoryIntelligenceClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const relatedSolutionsByIntelligenceSlug = {
  'fiber-optic-systems': [
    { label: 'Fiber Backbone', slug: 'fiber-backbone' },
    { label: 'Data Room Infrastructure', slug: 'data-rooms' },
  ],
  'copper-cat6-cabling': [{ label: 'Structured Cabling', slug: 'structured-cabling' }],
  'cctv-security': [{ label: 'CCTV Infrastructure', slug: 'cctv-infrastructure' }],
} as const;

const systemLabelBySlug: Record<string, string> = {
  'fiber-optic-systems': 'CABLE / ODF / CONNECTOR / TRACE',
  'copper-cat6-cabling': 'PAIR / CABLE / TERMINATE / TEST',
  'patch-cords-connectivity': 'PORT / PATCH / EQUIPMENT',
  'faceplates-keystone-rj45': 'BOX / MODULE / OUTLET / DEVICE',
  'cabinets-racks-pdu': 'ENCLOSURE / POWER / PATCH / ACCESS',
  'cable-management-duct-systems': 'PATH / BEND / SEPARATE / ACCESS',
  'cctv-security': 'CAMERA / LINK / CONTROL / REVIEW',
};

interface Params { slug: string }

export function generateStaticParams() {
  return productIntelligenceCategories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const category = productIntelligenceBySlug[params.slug];
  if (!category) return {};

  const url = `${site.siteUrl}/products-partners/intelligence/${category.slug}`;
  const title = `${category.title} Technical Guide | HILTECH`;

  return {
    title,
    description: category.intro,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: category.intro,
      url,
      images: [site.ogImage],
    },
    twitter: { card: 'summary_large_image', images: [site.ogImage] },
  };
}

export default async function ProductIntelligencePage({ params }: { params: Params }) {
  const category = productIntelligenceBySlug[params.slug];
  if (!category) notFound();

  const { products } = await getPublicProducts();
  const relatedProducts = products.filter((item) => item.category === category.title);
  const relatedSolutions = relatedSolutionsByIntelligenceSlug[category.slug as keyof typeof relatedSolutionsByIntelligenceSlug];

  return (
    <main className="hiltech-product-intelligence-page">
      <section className="hiltech-product-intelligence-hero">
        <div className="hiltech-product-intelligence-shell">
          <nav className="hiltech-product-intelligence-breadcrumb">
            <Link href="/products-partners">Products</Link>
            <span>/</span>
            <strong>{category.title}</strong>
          </nav>

          <div className="hiltech-product-intelligence-hero-grid">
            <div>
              <span>{category.eyebrow}</span>
              <h1>{category.title}</h1>
              <p>{category.intro}</p>
            </div>

            <div className="hiltech-product-intelligence-summary">
              <span>TECHNICAL CATEGORY GUIDE</span>
              <strong>{category.strategicSummary}</strong>
              <small>Category context supports RFQ preparation; final product, topology, and compatibility are confirmed per project.</small>
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-product-intelligence-diagram-section">
        <div className="hiltech-product-intelligence-shell">
          <div className="hiltech-product-intelligence-label">
            <span>01 / SYSTEM CONTEXT</span>
            <strong>{systemLabelBySlug[category.slug]}</strong>
          </div>

          <div className="hiltech-product-intelligence-diagram">
            <div>
              <span>SEMANTIC SYSTEM MODEL / ILLUSTRATIVE</span>
              <strong>{category.title}</strong>
            </div>
            <div>
              <ProductIntelligenceSystemDiagram slug={category.slug} />
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-product-intelligence-planning">
        <div className="hiltech-product-intelligence-shell">
          <div className="hiltech-product-intelligence-label">
            <span>02 / CATEGORY PLANNING</span>
            <strong>COMPONENTS / USE CASES / RFQ INPUTS</strong>
          </div>

          <div className="hiltech-product-intelligence-columns">
            <article>
              <span>TYPICAL COMPONENTS</span>
              {category.typicalComponents.map((item, index) => (
                <div key={item}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </article>

            <article>
              <span>COMMON USE CASES</span>
              {category.commonUseCases.map((item, index) => (
                <div key={item}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </article>

            <article>
              <span>WHAT TO INCLUDE IN RFQ</span>
              {category.requestChecklist.map((item, index) => (
                <div key={item}>
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{item}</strong>
                </div>
              ))}
            </article>
          </div>
        </div>
      </section>

      <section className="hiltech-product-intelligence-compatibility">
        <div className="hiltech-product-intelligence-shell">
          <div className="hiltech-product-intelligence-label is-dark">
            <span>03 / COMPATIBILITY & HANDOVER</span>
            <strong>DETAILS THAT CHANGE THE QUOTE.</strong>
          </div>

          <div className="hiltech-product-intelligence-compatibility-grid">
            <div>
              <h2>COMPATIBILITY<br /><em>BEFORE CONFIRMATION.</em></h2>
              <p>{category.disclaimer}</p>
            </div>

            <div>
              <section>
                <span>COMPATIBILITY NOTES</span>
                {category.compatibilityNotes.map((item, index) => (
                  <div key={item}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <strong>{item}</strong>
                  </div>
                ))}
              </section>

              <section>
                <span>HANDOVER NOTES</span>
                {category.handoverNotes.map((item, index) => (
                  <div key={item}>
                    <small>{String(index + 1).padStart(2, '0')}</small>
                    <strong>{item}</strong>
                  </div>
                ))}
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-product-intelligence-links">
        <div className="hiltech-product-intelligence-shell">
          <div className="hiltech-product-intelligence-label">
            <span>04 / CONNECT THE CATEGORY</span>
            <strong>CAPABILITIES / SOLUTIONS / CURRENT REFERENCES</strong>
          </div>

          <div className={`hiltech-product-intelligence-link-grid${relatedSolutions ? '' : ' is-single'}`}>
            <div>
              <span>CAPABILITY TAGS</span>
              <div>
                {category.relatedCapabilityTags.map((tag) => <strong key={tag}>{tag}</strong>)}
              </div>
            </div>

            {relatedSolutions ? (
              <div>
                <span>RELATED SOLUTIONS</span>
                <div>
                  {relatedSolutions.map((solution) => (
                    <Link key={solution.slug} href={`/solutions/${solution.slug}`}>
                      {solution.label} <b aria-hidden="true">↗</b>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <CategoryIntelligenceClient category={category} relatedProducts={relatedProducts} />

          <div className="hiltech-product-intelligence-disclaimer">
            <span>CATALOG RULE</span>
            <p>{productDisclaimer}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
