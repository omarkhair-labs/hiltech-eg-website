import type { Metadata } from 'next';
import { productDisclaimer } from '@/content/products';
import { site } from '@/content/site';
import { NoticeBox, SectionHeader, SectionShell } from '@/components/ui/primitives';
import { getPublicProducts } from '@/lib/server/products-public';
import ProductsClient from './ProductsClient';

export const metadata: Metadata = {
  title: 'Network Infrastructure Products & RFQ References',
  description:
    'Browse HILTECH product references for fiber optics, structured cabling, patch cords, racks, PDU, faceplates, keystone, and RJ45 infrastructure with RFQ support in Egypt.',
  alternates: { canonical: `${site.siteUrl}/products-partners`, languages: { en: `${site.siteUrl}/products-partners`, ar: `${site.siteUrl}/ar/products-partners`, 'x-default': `${site.siteUrl}/` } },
  openGraph: { title: 'HILTECH Products | Project Supply & RFQ', description: 'Search exact network infrastructure product references, build a multi-item RFQ, and submit one structured request for project review in Egypt.', url: `${site.siteUrl}/products-partners`, images: [site.ogImage] },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const { products } = await getPublicProducts();

  return (
    <main className="bg-slate-950">
      <SectionShell>
        <SectionHeader
          title="Products & Project Supply"
          description="Search exact references, filter the live catalog, and add multiple items to one RFQ basket."
          className="[&>h2]:text-white [&>p]:text-slate-300"
        />
        <ProductsClient initialProducts={products} />
        <div className="mt-6">
          <NoticeBox tone="highlight">{productDisclaimer} Product visuals are provided for catalog clarity; final specifications and availability are confirmed during RFQ review.</NoticeBox>
        </div>
      </SectionShell>
    </main>
  );
}
