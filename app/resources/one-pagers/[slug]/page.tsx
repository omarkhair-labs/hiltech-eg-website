import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { onePagers } from '@/content/sales-materials';
import { site } from '@/content/site';

export function generateStaticParams() {
  return onePagers.map((item) => ({ slug: item.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const onePager = onePagers.find((item) => item.slug === params.slug);
  if (!onePager) return {};
  const url = site.siteUrl + '/resources/one-pagers/' + onePager.slug;
  return {
    title: onePager.title + ' | HILTECH Resources',
    description: onePager.shortIntro,
    alternates: { canonical: url },
    openGraph: {
      title: onePager.title + ' | HILTECH',
      description: onePager.shortIntro,
      url,
      images: [site.ogImage],
    },
    twitter: { card: 'summary_large_image', images: [site.ogImage] },
  };
}

export default function OnePagerPage({ params }: { params: { slug: string } }) {
  const onePager = onePagers.find((item) => item.slug === params.slug);
  if (!onePager) notFound();

  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>RESOURCES / SOLUTION ONE-PAGER</span>
            <span>{onePager.slug.toUpperCase().replaceAll('-', ' / ')}</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>CLIENT CONTEXT / SCOPE ENTRY</span>
              <h1>{onePager.title}</h1>
              <p>{onePager.shortIntro}</p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>PROBLEM</strong><small>CLIENT CONDITION</small></div>
              <div><span>02</span><strong>RESPONSE</strong><small>HILTECH ROLE</small></div>
              <div><span>03</span><strong>SCOPE</strong><small>TYPICAL INPUT</small></div>
              <div><span>04</span><strong>REQUEST</strong><small>WHAT TO PREPARE</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / ONE-PAGER</span>
            <strong>PROJECT DISCUSSION / NOT FINAL DESIGN</strong>
          </div>

          <div className="hiltech-utility-ledger">
            <article>
              <span>01</span>
              <h2>Client Problem</h2>
              <div><p>{onePager.clientProblem}</p></div>
            </article>

            <article>
              <span>02</span>
              <h2>How HILTECH Helps</h2>
              <div><ul>{onePager.howHiltechHelps.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </article>

            <article>
              <span>03</span>
              <h2>Typical Scope</h2>
              <div><ul>{onePager.typicalScope.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </article>

            <article>
              <span>04</span>
              <h2>Request Checklist</h2>
              <div><ul>{onePager.requestChecklist.map((item) => <li key={item}>{item}</li>)}</ul></div>
            </article>
          </div>

          {onePager.relatedSolution ? (
            <div className="hiltech-utility-route-index">
              <Link href={onePager.relatedSolution} className="hiltech-utility-route-row">
                <span>05</span>
                <strong>Related Solution</strong>
                <p>Open the full system route for deeper technical and project context.</p>
                <em>OPEN ↗</em>
              </Link>
            </div>
          ) : null}

          <div className="hiltech-utility-actions">
            <Link href="/rfq">START A PROJECT <span aria-hidden="true">↗</span></Link>
            <Link href="/resources">BACK TO RESOURCES <span aria-hidden="true">↗</span></Link>
            <a href={site.contact.whatsappGeneralLink}>WHATSAPP <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </main>
  );
}
