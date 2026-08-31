import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import SolutionDetailExperience from '@/components/solutions/SolutionDetailExperience';
import { solutions, solutionsBySlug } from '@/content/solutions';
import { site } from '@/content/site';

interface Params {
  slug: string;
}

const titleMap: Record<string, string> = {
  'structured-cabling': 'Structured Cabling Solutions | HILTECH',
  'fiber-backbone': 'Fiber Backbone Infrastructure | HILTECH',
  'data-rooms': 'Data Room Infrastructure | HILTECH',
  'cctv-infrastructure': 'CCTV Infrastructure Solutions | HILTECH',
  'network-testing': 'Network Testing & Validation | HILTECH',
  'project-supply-rfq': 'Project Supply & RFQ | HILTECH',
};

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const solution = solutionsBySlug[params.slug];
  if (!solution) return {};

  const title = titleMap[solution.slug] ?? `${solution.title} | HILTECH`;
  const url = `${site.siteUrl}/solutions/${solution.slug}`;

  return {
    title,
    description: solution.intro,
    alternates: { canonical: url },
    openGraph: { title, description: solution.intro, url, images: [site.ogImage] },
    twitter: { card: 'summary_large_image', images: [site.ogImage] },
  };
}

export default function SolutionDetailPage({ params }: { params: Params }) {
  const solution = solutionsBySlug[params.slug];
  if (!solution) notFound();

  return <SolutionDetailExperience solution={solution} />;
}
