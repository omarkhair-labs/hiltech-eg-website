import type { Metadata } from 'next';
import ServicesExperience from '@/components/services/ServicesExperience';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Services | Enterprise Infrastructure Delivery in Egypt',
  description:
    'Site surveys, engineering drawings, fiber and copper installation, rack readiness, testing, handover, and operational support for enterprise network infrastructure in Egypt.',
  alternates: {
    canonical: `${site.siteUrl}/services`,
    languages: {
      en: `${site.siteUrl}/services`,
      ar: `${site.siteUrl}/ar/services`,
      'x-default': `${site.siteUrl}/`,
    },
  },
  openGraph: {
    title: 'HILTECH Services | Enterprise Infrastructure Delivery',
    description:
      'Field execution capabilities from technical survey and planning through installation, testing, handover, and support.',
    url: `${site.siteUrl}/services`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return <ServicesExperience />;
}
