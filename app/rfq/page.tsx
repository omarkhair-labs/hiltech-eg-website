import type { Metadata } from 'next';
import { site } from '@/content/site';
import RFQReviewClient from './rfq-review-client';

export const metadata: Metadata = {
  title: 'Request Project Quote | HILTECH Network Infrastructure',
  description: 'Review exact references, quantities, project context, and submit a structured HILTECH RFQ for quotation follow-up.',
  alternates: {
    canonical: `${site.siteUrl}/rfq`,
    languages: {
      en: `${site.siteUrl}/rfq`,
      ar: `${site.siteUrl}/ar/rfq`,
      'x-default': `${site.siteUrl}/`,
    },
  },
  openGraph: {
    title: 'Request Project Quote | HILTECH',
    description: 'Turn a physical infrastructure scope into a structured project request.',
    url: `${site.siteUrl}/rfq`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function RFQPage() {
  return (
    <main className="hiltech-rfq-page">
      <div className="hiltech-rfq-shell">
        <RFQReviewClient />
      </div>
    </main>
  );
}
