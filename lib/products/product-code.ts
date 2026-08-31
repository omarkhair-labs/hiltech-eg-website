export function normalizeProductCode(value: string) {
  let current = value;

  for (let index = 0; index < 2; index += 1) {
    try {
      const decoded = decodeURIComponent(current);
      if (decoded === current) break;
      current = decoded;
    } catch {
      break;
    }
  }

  return current.normalize('NFC');
}

export function productDetailPath(productCode: string, locale: 'en' | 'ar' = 'en') {
  const encoded = encodeURIComponent(normalizeProductCode(productCode));
  return locale === 'ar'
    ? `/ar/products-partners/${encoded}`
    : `/products-partners/${encoded}`;
}
