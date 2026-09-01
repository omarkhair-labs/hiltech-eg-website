import type { Metadata } from 'next';
import HomeExperience from '@/components/home/HomeExperience';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | Engineered Network Infrastructure',
  description:
    'HILTECH engineers network infrastructure from component and route to installation, testing, validation, and project supply.',
  alternates: {
    canonical: `${site.siteUrl}/`,
    languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` },
  },
  openGraph: {
    title: 'HILTECH | Engineered Network Infrastructure',
    description:
      'Physical connectivity, fiber infrastructure, data-center systems, testing, validation, and technical project supply.',
    url: site.siteUrl,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function HomePage() {
  return <HomeExperience />;
}
