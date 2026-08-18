import type { ProductItem } from '@/content/products';
import { site } from '@/content/site';

const wixInfrastructureDescriptionSlugs = new Set([
  'fiber-enclosure-24-core-china',
  'coupler-sc-simplex-mm-sm',
  'patch-cord-lc-lc-sc-mm-om3-3-meter',
  'patch-cord-lc-lc-sm-3-meter',
  'cornet-rj45-connector-box-100-pieces',
  'point-rj45-connector-box-100-pieces',
  'fumo-double-faceplate-white',
  'excel-cat6-utp-keystone-jack-idc-white',
  'prolink-cat6a-rj45-mptl-stp-plug',
  'local-rj11-telephone-patch-cord',
  'blackstone-utp-cat6-cable-3m',
  'leviton-cat6-utp-patch-cord-3m-gray',
  'dema-prolink-cat6a-patch-cord-3m-lszh-gray',
  'panduit-category-6-utp-patch-cord-1m',
  'leviton-cat6-lszh-network-cable-305m-gray',
  'leviton-optic-fiber-cable',
]);

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function hasConcreteBrand(brand: string) {
  return Boolean(brand) && !/generic|multi-brand/i.test(brand);
}

export function absoluteSiteUrl(pathOrUrl?: string | null) {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, site.siteUrl).toString();
  } catch {
    return undefined;
  }
}

export function getProductSeoDescription(product: ProductItem, locale: 'en' | 'ar' = 'en') {
  if (locale === 'en') {
    const projectScope = wixInfrastructureDescriptionSlugs.has(product.id)
      ? 'network infrastructure, fiber optic, structured cabling and data center projects'
      : 'professional networking and infrastructure projects';

    return `${product.name}. Available from HILTECH Egypt for ${projectScope}. Request a quote.`;
  }

  const brandPrefix = hasConcreteBrand(product.brand) && !product.name.toLowerCase().includes(product.brand.toLowerCase())
    ? `${product.brand} `
    : '';
  const core = normalizeText(`${brandPrefix}${product.name}. ${product.shortSpecs} ${product.useCase}`);
  return `${core} اطلب عرض سعر من HILTECH Egypt.`.slice(0, 160).trim();
}

export function buildProductJsonLd(product: ProductItem, canonicalUrl: string, imageUrl?: string | null) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: getProductSeoDescription(product),
    category: product.category,
    url: canonicalUrl,
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Specifications',
        value: product.shortSpecs,
      },
      {
        '@type': 'PropertyValue',
        name: 'Use case',
        value: product.useCase,
      },
    ],
  };

  if (hasConcreteBrand(product.brand)) {
    jsonLd.brand = {
      '@type': 'Brand',
      name: product.brand,
    };
  }

  const absoluteImage = absoluteSiteUrl(imageUrl);
  if (absoluteImage) jsonLd.image = [absoluteImage];

  return jsonLd;
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
