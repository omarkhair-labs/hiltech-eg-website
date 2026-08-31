import type { Metadata } from 'next';
import CompanyExperience from '@/components/company/CompanyExperience';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Company | HILTECH Network Infrastructure',
  description:
    'HILTECH operating identity, Cairo presence, physical infrastructure focus, and direct routes into field evidence, solutions, capabilities, products, and RFQ.',
  alternates: {
    canonical: `${site.siteUrl}/company`,
    languages: {
      en: `${site.siteUrl}/company`,
      ar: `${site.siteUrl}/ar/company`,
      'x-default': `${site.siteUrl}/`,
    },
  },
  openGraph: {
    title: 'HILTECH Company | Built Around the Physical Layer',
    description:
      'HILTECH is an Egypt-based network infrastructure delivery team working between project requirements and physical delivery.',
    url: `${site.siteUrl}/company`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function CompanyPage() {
  return <CompanyExperience />;
}
