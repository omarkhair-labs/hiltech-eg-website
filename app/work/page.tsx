import type { Metadata } from 'next';
import WorkEvidenceExperience from '@/components/work/WorkEvidenceExperience';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Field Work & Infrastructure Evidence',
  description:
    'Inspect HILTECH field evidence across racks, structured cabling, fiber termination, and infrastructure testing without unverified project claims.',
  alternates: {
    canonical: `${site.siteUrl}/work`,
    languages: {
      en: `${site.siteUrl}/work`,
      ar: `${site.siteUrl}/ar/work`,
      'x-default': `${site.siteUrl}/`,
    },
  },
  openGraph: {
    title: 'HILTECH Work | Field Evidence',
    description:
      'Real HILTECH field records organized around route, termination, rack discipline, and validation.',
    url: `${site.siteUrl}/work`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function Page() {
  return <WorkEvidenceExperience />;
}
