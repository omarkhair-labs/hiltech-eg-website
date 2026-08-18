import type { ProductCategory } from './products';

export type { ProductCategory, ProductItem } from './products';
export { featuredProjectSupply, productDisclaimer } from './products';
export { wixCatalogProducts as products } from './wix-catalog-products';

// Keep the public catalog filters aligned with the live Wix/Supabase catalog.
// Categories with no active products should not appear as empty UX dead ends.
export const productCategories: ProductCategory[] = [
  'Fiber Optic Systems',
  'Copper / CAT6 Cabling',
  'Patch Cords & Connectivity',
  'Faceplates / Keystone / RJ45',
  'Cabinets / Racks / PDU',
];
