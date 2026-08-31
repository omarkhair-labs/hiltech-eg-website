import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetailActions from '@/components/ProductDetailActions';
import { productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { site } from '@/content/site';
import { absoluteSiteUrl, buildProductJsonLd, getProductSeoDescription, serializeJsonLd } from '@/lib/seo/product';
import { getPublicProducts } from '@/lib/server/products-public';
import { normalizeProductCode, productDetailPath } from '@/lib/products/product-code';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Params { productCode: string }

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

async function getProduct(productCode: string) {
  const normalizedCode = normalizeProductCode(productCode);
  const { products } = await getPublicProducts();
  const product = products.find((item) => normalizeProductCode(item.id) === normalizedCode);
  return { products, product };
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product } = await getProduct(params.productCode);
  if (!product) return {};

  const encodedId = encodeURIComponent(product.id);
  const canonical = `${site.siteUrl}/products-partners/${encodedId}`;
  const arabicUrl = `${site.siteUrl}/ar/products-partners/${encodedId}`;
  const description = getProductSeoDescription(product);
  const mappedVisual = visualsByProductId.get(product.id);
  const image = absoluteSiteUrl(product.image || mappedVisual?.imagePath);
  const title = `${product.name} | HILTECH Egypt`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: canonical,
        ar: arabicUrl,
        'x-default': canonical,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.brand,
      type: 'website',
      ...(image ? { images: [{ url: image, alt: product.name }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { product, products } = await getProduct(params.productCode);
  if (!product) notFound();

  const intelligenceSlug = productIntelligenceSlugByCategory[product.category];
  const mappedVisual = visualsByProductId.get(product.id);
  const productImageSrc = product.image || mappedVisual?.imagePath;
  const productImageAlt = mappedVisual?.alt || product.name;
  const canonical = `${site.siteUrl}/products-partners/${encodeURIComponent(product.id)}`;
  const productJsonLd = buildProductJsonLd(product, canonical, productImageSrc);

  const categoryLower = product.category.toLowerCase();
  const oftenQuotedWith = categoryLower.includes('fiber')
    ? ['ODF / enclosure', 'Fiber patch cords', 'Testing / OTDR context']
    : categoryLower.includes('copper') || categoryLower.includes('cat6')
      ? ['Patch panels', 'Faceplates / keystone', 'Rack / cabinet', 'Testing']
      : categoryLower.includes('rack') || categoryLower.includes('cabinet') || categoryLower.includes('pdu')
        ? ['PDU / power', 'Cable management', 'Patch panels']
        : categoryLower.includes('cctv') || categoryLower.includes('security')
          ? ['Camera cabling', 'Network points', 'Rack / control-room context']
          : ['Cable / fiber scope support', 'Testing', 'Patching accessories'];

  const related = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aScore = Number(a.category === product.category) * 2 + Number(a.brand === product.brand);
      const bScore = Number(b.category === product.category) * 2 + Number(b.brand === product.brand);
      return bScore - aScore;
    })
    .slice(0, 6);

  return (
    <main className="hiltech-product-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />

      <section className="hiltech-product-detail-hero">
        <div className="hiltech-product-detail-shell">
          <nav className="hiltech-product-detail-breadcrumb" aria-label="Breadcrumb">
            <Link href="/products-partners">Products</Link>
            <span>/</span>
            <Link href={`/products-partners?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
            <span>/</span>
            <strong>{product.id}</strong>
          </nav>

          <div className="hiltech-product-detail-grid">
            <div className="hiltech-product-detail-media">
              {productImageSrc ? (
                <Image
                  src={productImageSrc}
                  alt={productImageAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 900px) 90vw, 45vw"
                />
              ) : (
                <div className="hiltech-product-detail-media-fallback">
                  <span>ILLUSTRATIVE VISUAL</span>
                  <strong>{product.name}</strong>
                </div>
              )}

              <div className="hiltech-product-detail-media-label">
                <span>PRODUCT REFERENCE</span>
                <strong>{product.id}</strong>
              </div>
            </div>

            <div className="hiltech-product-detail-summary">
              <div className="hiltech-product-detail-summary-topline">
                <span>{product.category}</span>
                <strong>{product.brand}</strong>
              </div>

              <span className="hiltech-product-detail-code">{product.id}</span>
              <h1>{product.name}</h1>
              <p className="hiltech-product-detail-spec-lead">{product.shortSpecs}</p>

              <dl className="hiltech-product-detail-facts">
                <div>
                  <dt>BRAND</dt>
                  <dd>{product.brand}</dd>
                </div>
                <div>
                  <dt>CATEGORY</dt>
                  <dd>{product.category}</dd>
                </div>
                <div>
                  <dt>PRICE CONTEXT</dt>
                  <dd>{product.priceNote?.trim() || 'Price on request'}</dd>
                </div>
                <div>
                  <dt>AVAILABILITY</dt>
                  <dd>{product.availabilityNote?.trim() || 'Confirmed during RFQ review'}</dd>
                </div>
              </dl>

              <ProductDetailActions
                product={product}
                intelligenceHref={intelligenceSlug ? `/products-partners/intelligence/${intelligenceSlug}` : undefined}
                labels={{
                  addToRFQ: 'Add to RFQ',
                  technicalNotes: 'Technical notes',
                  backToProducts: 'Back to products',
                  addedToRFQ: 'Added to RFQ',
                }}
              />
            </div>
          </div>

          <div className="hiltech-product-detail-hero-rail">
            <span>REFERENCE</span><i />
            <span>SPEC</span><i />
            <span>PROJECT FIT</span><i />
            <span>RFQ</span>
          </div>
        </div>
      </section>

      <section className="hiltech-product-detail-context">
        <div className="hiltech-product-detail-shell">
          <div className="hiltech-product-detail-section-label">
            <span>01 / PRODUCT CONTEXT</span>
            <strong>WHAT IT IS / WHERE IT FITS</strong>
          </div>

          <div className="hiltech-product-detail-context-grid">
            <article>
              <span>SPECIFICATION SUMMARY</span>
              <h2>{product.shortSpecs}</h2>
            </article>

            <article>
              <span>TYPICAL USE CASE</span>
              <h2>{product.useCase}</h2>
            </article>

            {product.technicalNotes?.trim() ? (
              <article>
                <span>TECHNICAL NOTE</span>
                <h2>{product.technicalNotes.trim()}</h2>
              </article>
            ) : null}
          </div>
        </div>
      </section>

      <section className="hiltech-product-detail-project">
        <div className="hiltech-product-detail-shell">
          <div className="hiltech-product-detail-section-label is-dark">
            <span>02 / PROJECT ADJACENCY</span>
            <strong>OFTEN QUOTED AS PART OF A SYSTEM.</strong>
          </div>

          <div className="hiltech-product-detail-project-grid">
            <div>
              <h2>DO NOT QUOTE<br /><em>THE PART IN ISOLATION.</em></h2>
              <p>
                Infrastructure products are usually selected as part of a route, rack, endpoint, fiber, power, or testing scope. Add related project context before final quotation.
              </p>
            </div>

            <div className="hiltech-product-detail-adjacencies">
              {oftenQuotedWith.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-product-detail-related">
        <div className="hiltech-product-detail-shell">
          <div className="hiltech-product-detail-section-label">
            <span>03 / RELATED REFERENCES</span>
            <strong>SAME CATEGORY / BRAND PROXIMITY</strong>
          </div>

          <div className="hiltech-product-detail-related-grid">
            {related.map((item) => {
              const relatedVisual = visualsByProductId.get(item.id);
              const image = item.image || relatedVisual?.imagePath;

              return (
                <Link key={item.id} href={productDetailPath(item.id)}>
                  <div className="hiltech-product-detail-related-media">
                    {image ? (
                      <Image
                        src={image}
                        alt={relatedVisual?.alt || item.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 700px) 45vw, 20vw"
                      />
                    ) : (
                      <span>NO PRODUCT VISUAL</span>
                    )}
                  </div>
                  <small>{item.id}</small>
                  <strong>{item.name}</strong>
                  <span>{item.brand}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hiltech-product-detail-rfq">
        <div className="hiltech-product-detail-shell">
          <div>
            <span>04 / QUOTATION PATH</span>
            <h2>REFERENCE FOUND.<br /><em>NOW CONFIRM THE PROJECT.</em></h2>
          </div>

          <div>
            <p>
              Final specification, compatibility, quantity, price, and availability are confirmed during RFQ review. Add this reference to the basket, include adjacent items, and send the project scope as one request.
            </p>
            <div className="hiltech-product-detail-rfq-actions">
              <Link href="/rfq">Review RFQ <span aria-hidden="true">↗</span></Link>
              {intelligenceSlug ? (
                <Link href={`/products-partners/intelligence/${intelligenceSlug}`}>
                  Technical notes <span aria-hidden="true">↗</span>
                </Link>
              ) : null}
              <Link href="/products-partners">Continue catalog <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
