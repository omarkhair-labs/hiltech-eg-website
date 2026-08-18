import type { ProductItem } from '@/content/products';
import { site } from '@/content/site';

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
  const brandPrefix = hasConcreteBrand(product.brand) && !product.name.toLowerCase().includes(product.brand.toLowerCase())
    ? `${product.brand} `
    : '';

  const core = normalizeText(`${brandPrefix}${product.name}. ${product.shortSpecs} ${product.useCase}`);
  const suffix = locale === 'ar'
    ? ' اطلب عرض سعر من HILTECH Egypt.'
    : ' Request a quote from HILTECH Egypt.';

  return `${core}${suffix}`.slice(0, 160).trim();
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
