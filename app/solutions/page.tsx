import type { Metadata } from 'next';
import SolutionsIndexExperience from '@/components/solutions/SolutionsIndexExperience';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Enterprise Infrastructure Solutions | HILTECH',
  description:
    'Explore HILTECH solutions for structured cabling, fiber backbone, data rooms, CCTV infrastructure, network testing, and project-based supply.',
  alternates: { canonical: `${site.siteUrl}/solutions` },
  openGraph: {
    title: 'Enterprise Infrastructure Solutions | HILTECH',
    description: 'Physical infrastructure solution pathways for business environments in Egypt.',
    url: `${site.siteUrl}/solutions`,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function SolutionsPage() {
  return <SolutionsIndexExperience />;
}
