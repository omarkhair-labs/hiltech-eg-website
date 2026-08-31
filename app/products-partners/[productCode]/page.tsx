import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductDetailActions from '@/components/ProductDetailActions';
import ProductDetailMotion from '@/components/products/ProductDetailMotion';
import { productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals, productVisualWarning } from '@/content/product-visuals';
import { site } from '@/content/site';
import { normalizeProductCode, productDetailPath } from '@/lib/products/product-code';
import { absoluteSiteUrl, buildProductJsonLd, getProductSeoDescription, serializeJsonLd } from '@/lib/seo/product';
import { getPublicProducts } from '@/lib/server/products-public';

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

function ProductPositionDiagram({ category }: { category: string }) {
  if (category === 'Fiber Optic Systems') {
    return (
      <svg viewBox="0 0 900 520" aria-hidden="true">
        <g className="hiltech-product-position-diagram-main">
          <circle cx="110" cy="260" r="58" />
          <circle cx="790" cy="260" r="58" />
          <path d="M168 248 C292 184 354 210 452 258 C546 306 620 314 732 272" />
          <path d="M168 268 C292 226 354 240 452 278 C546 314 620 330 732 288" />
          <circle cx="338" cy="226" r="7" />
          <circle cx="518" cy="290" r="7" />
          <rect x="392" y="190" width="116" height="134" rx="4" />
          <path d="M410 214 H490 M410 238 H490 M410 262 H490 M410 286 H490" />
        </g>
      </svg>
    );
  }

  if (category === 'Cabinets / Racks / PDU') {
    return (
      <svg viewBox="0 0 900 520" aria-hidden="true">
        <g className="hiltech-product-position-diagram-main">
          {[150, 364, 578].map((x) => (
            <g key={x}>
              <rect x={x} y="74" width="172" height="372" rx="5" />
              {Array.from({ length: 11 }).map((_, row) => (
                <line key={row} x1={x + 22} y1={112 + row * 28} x2={x + 150} y2={112 + row * 28} />
              ))}
            </g>
          ))}
          <path d="M112 470 H790" />
          <path d="M182 446 C286 500 388 462 470 486 S656 506 726 452" />
        </g>
      </svg>
    );
  }

  if (category === 'CCTV & Security') {
    return (
      <svg viewBox="0 0 900 520" aria-hidden="true">
        <g className="hiltech-product-position-diagram-main">
          <rect x="92" y="70" width="716" height="382" rx="5" />
          <path d="M92 216 H808 M330 70 V452 M570 70 V452" />
          {[[150,138],[746,138],[150,384],[746,384],[450,138]].map(([x,y], index) => (
            <g key={index}>
              <circle cx={x} cy={y} r="26" />
              <path d={`M${x} ${y + 26} L450 292`} />
            </g>
          ))}
          <rect x="396" y="258" width="108" height="68" rx="4" />
        </g>
      </svg>
    );
  }

  if (category === 'Cable Management / Duct Systems') {
    return (
      <svg viewBox="0 0 900 520" aria-hidden="true">
        <g className="hiltech-product-position-diagram-main">
          <path d="M92 122 H332 V248 H506 V128 H808" />
          <path d="M92 398 H258 V286 H646 V392 H808" />
          <rect x="76" y="100" width="48" height="44" rx="4" />
          <rect x="784" y="106" width="48" height="44" rx="4" />
          <rect x="76" y="376" width="48" height="44" rx="4" />
          <rect x="784" y="370" width="48" height="44" rx="4" />
          <circle cx="332" cy="248" r="7" />
          <circle cx="506" cy="128" r="7" />
          <circle cx="258" cy="286" r="7" />
          <circle cx="646" cy="392" r="7" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 900 520" aria-hidden="true">
      <g className="hiltech-product-position-diagram-main">
        <rect x="102" y="160" width="144" height="132" rx="4" />
        <rect x="656" y="160" width="144" height="132" rx="4" />
        <path d="M246 226 C364 226 388 178 466 210 C550 244 566 226 656 226" />
        <circle cx="360" cy="214" r="7" />
        <circle cx="466" cy="210" r="7" />
        <circle cx="574" cy="228" r="7" />
        <path d="M120 340 H780" />
        <path d="M120 340 L196 340 L214 312 L250 364 L316 344 L382 344 L404 296 L438 380 L488 344 L550 344 L578 324 L614 356 L780 356" />
      </g>
    </svg>
  );
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { product } = await getProduct(params.productCode);
  if (!product) return {};

  const canonical = `${site.siteUrl}${productDetailPath(product.id)}`;
  const arabicUrl = `${site.siteUrl}${productDetailPath(product.id, 'ar')}`;
  const description = getProductSeoDescription(product);
  const mappedVisual = visualsByProductId.get(product.id);
  const image = absoluteSiteUrl(product.image || mappedVisual?.imagePath);
  const title = `${product.name} | HILTECH Egypt`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: canonical, ar: arabicUrl, 'x-default': canonical },
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
  const canonical = `${site.siteUrl}${productDetailPath(product.id)}`;
  const productJsonLd = buildProductJsonLd(product, canonical, productImageSrc);
  const productTitleLength = Array.from(product.name).length;
  const productTitleDensity = productTitleLength > 72 ? 'dense' : productTitleLength > 44 ? 'long' : 'standard';
  const productTitleHasArabic = /[\u0600-\u06FF]/.test(product.name);

  const related = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aScore = Number(a.category === product.category) * 3 + Number(a.brand === product.brand);
      const bScore = Number(b.category === product.category) * 3 + Number(b.brand === product.brand);
      return bScore - aScore;
    })
    .slice(0, 5);

  const categoryLower = product.category.toLowerCase();
  const adjacent =
    categoryLower.includes('fiber')
      ? ['Fiber termination / ODF', 'Patch connectivity', 'Testing / OTDR context']
      : categoryLower.includes('copper') || categoryLower.includes('cat6')
        ? ['Endpoint termination', 'Patch connectivity', 'Testing / certification']
        : categoryLower.includes('rack') || categoryLower.includes('cabinet') || categoryLower.includes('pdu')
          ? ['Power distribution', 'Cable management', 'Patch / fiber organization']
          : categoryLower.includes('cctv') || categoryLower.includes('security')
            ? ['Camera cabling', 'Network path', 'Control-room infrastructure']
            : categoryLower.includes('duct') || categoryLower.includes('management')
              ? ['Cable route', 'Bends / accessories', 'Endpoint access']
              : ['System path', 'Adjacent connectivity', 'Testing / handover'];

  return (
    <main data-product-detail-v2 className="hiltech-product-v2-page">
      <ProductDetailMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />

      <section className="hiltech-product-v2-stage">
        <div className="hiltech-product-v2-shell">
          <nav className="hiltech-product-v2-breadcrumb" aria-label="Breadcrumb">
            <Link href="/products-partners">PRODUCTS</Link>
            <span>/</span>
            <Link href={`/products-partners?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
            <span>/</span>
            <strong>{product.id}</strong>
          </nav>

          <div className="hiltech-product-v2-title-row">
            <div>
              <span>{product.brand} / {product.category}</span>
              <h1
                data-product-detail-title
                data-title-density={productTitleDensity}
                data-mixed-script={productTitleHasArabic ? 'true' : 'false'}
              >
                {product.name}
              </h1>
            </div>
            <div>
              <span>REFERENCE CODE</span>
              <strong>{product.id}</strong>
            </div>
          </div>

          <div className="hiltech-product-v2-object-grid">
            <div data-product-object className="hiltech-product-v2-object">
              {productImageSrc ? (
                <Image
                  src={productImageSrc}
                  alt={productImageAlt}
                  fill
                  priority
                  className="object-contain"
                  sizes="(max-width: 900px) 90vw, 62vw"
                />
              ) : (
                <div className="hiltech-product-v2-object-fallback">
                  <span>REFERENCE OBJECT</span>
                  <strong>{product.name}</strong>
                </div>
              )}
              <span className="hiltech-product-v2-object-axis hiltech-product-v2-object-axis-x" />
              <span className="hiltech-product-v2-object-axis hiltech-product-v2-object-axis-y" />
              <div className="hiltech-product-v2-object-label">
                <span>VISUAL STATUS</span>
                <strong>{productImageSrc ? 'ILLUSTRATIVE PRODUCT VISUAL' : 'NO PRODUCT VISUAL'}</strong>
              </div>
            </div>

            <aside className="hiltech-product-v2-annotations">
              <div data-product-annotation>
                <span>01 / SPEC CONTEXT</span>
                <strong>{product.shortSpecs}</strong>
              </div>
              <div data-product-annotation>
                <span>02 / TYPICAL USE</span>
                <strong>{product.useCase}</strong>
              </div>
              <div data-product-annotation>
                <span>03 / PRICE</span>
                <strong>{product.priceNote?.trim() || 'PRICE ON REQUEST'}</strong>
              </div>
              <div data-product-annotation>
                <span>04 / AVAILABILITY</span>
                <strong>{product.availabilityNote?.trim() || 'CONFIRM DURING RFQ'}</strong>
              </div>

              <ProductDetailActions
                product={product}
                intelligenceHref={intelligenceSlug ? `/products-partners/intelligence/${intelligenceSlug}` : undefined}
                labels={{
                  addToRFQ: 'Add to RFQ',
                  technicalNotes: 'Technical guide',
                  backToProducts: 'Back to products',
                  addedToRFQ: 'Added to RFQ',
                }}
              />
            </aside>
          </div>

          <div className="hiltech-product-v2-stage-foot">
            <span>OBJECT</span><i />
            <span>SYSTEM POSITION</span><i />
            <span>PROJECT FIT</span><i />
            <span>RFQ</span>
          </div>
        </div>
      </section>

      <section className="hiltech-product-v2-position">
        <div className="hiltech-product-v2-shell">
          <div className="hiltech-product-v2-section-label is-dark">
            <span>01 / SYSTEM POSITION</span>
            <strong>THE PART ONLY MAKES SENSE INSIDE THE INFRASTRUCTURE.</strong>
          </div>

          <div className="hiltech-product-v2-position-grid">
            <div data-product-detail-reveal>
              <span>{product.category}</span>
              <h2>WHERE THIS<br /><em>REFERENCE SITS.</em></h2>
              <p>{product.useCase}</p>

              <div className="hiltech-product-v2-route">
                <i data-product-route-line />
                {adjacent.map((item, index) => (
                  <div key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{item}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div data-product-detail-reveal className="hiltech-product-v2-position-diagram">
              <div>
                <span>SYSTEM MODEL / ILLUSTRATIVE</span>
                <strong>{product.category}</strong>
              </div>
              <ProductPositionDiagram category={product.category} />
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-product-v2-ledger">
        <div className="hiltech-product-v2-shell">
          <div className="hiltech-product-v2-section-label">
            <span>02 / DECISION LEDGER</span>
            <strong>WHAT IS KNOWN / WHAT STILL NEEDS CONFIRMATION.</strong>
          </div>

          <div className="hiltech-product-v2-ledger-grid">
            <article data-product-detail-reveal>
              <span>KNOWN / BRAND</span>
              <strong>{product.brand}</strong>
            </article>
            <article data-product-detail-reveal>
              <span>KNOWN / SPEC CONTEXT</span>
              <strong>{product.shortSpecs}</strong>
            </article>
            <article data-product-detail-reveal>
              <span>PROJECT / USE CASE</span>
              <strong>{product.useCase}</strong>
            </article>
            <article data-product-detail-reveal>
              <span>CONFIRM / COMMERCIAL</span>
              <strong>{product.availabilityNote?.trim() || 'Availability'} / {product.priceNote?.trim() || 'Price'}</strong>
            </article>
          </div>

          {product.technicalNotes?.trim() ? (
            <div data-product-detail-reveal className="hiltech-product-v2-technical-note">
              <span>TECHNICAL NOTE</span>
              <p>{product.technicalNotes.trim()}</p>
            </div>
          ) : null}

          <div className="hiltech-product-v2-visual-warning">
            <span>VISUAL EVIDENCE RULE</span>
            <p>{productVisualWarning}</p>
          </div>
        </div>
      </section>

      <section className="hiltech-product-v2-related">
        <div className="hiltech-product-v2-shell">
          <div className="hiltech-product-v2-section-label">
            <span>03 / ADJACENT REFERENCES</span>
            <strong>SAME SYSTEM FAMILY / BRAND PROXIMITY</strong>
          </div>

          <div className="hiltech-product-v2-related-index">
            {related.map((item, index) => {
              const visual = visualsByProductId.get(item.id);
              const image = item.image || visual?.imagePath;
              return (
                <Link key={item.id} href={productDetailPath(item.id)} data-product-detail-reveal>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div className="hiltech-product-v2-related-media">
                    {image ? (
                      <Image
                        src={image}
                        alt={visual?.alt || item.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 700px) 26vw, 10vw"
                      />
                    ) : (
                      <small>NO VISUAL</small>
                    )}
                  </div>
                  <div>
                    <small>{item.id}</small>
                    <strong>{item.name}</strong>
                    <p>{item.brand} / {item.shortSpecs}</p>
                  </div>
                  <em>↗</em>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hiltech-product-v2-rfq">
        <div className="hiltech-product-v2-shell">
          <div>
            <span>04 / PROCUREMENT</span>
            <h2>THE REFERENCE<br /><em>IS NOT THE QUOTE.</em></h2>
          </div>

          <div>
            <p>
              Final specification, compatibility, quantity, price, and availability are confirmed during RFQ review. Add this reference with the surrounding project context before HILTECH confirms the commercial scope.
            </p>
            <div>
              <Link href="/rfq">Review RFQ <span aria-hidden="true">↗</span></Link>
              {intelligenceSlug ? (
                <Link href={`/products-partners/intelligence/${intelligenceSlug}`}>
                  Technical guide <span aria-hidden="true">↗</span>
                </Link>
              ) : null}
              <Link href="/products-partners">Return to physical library <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
