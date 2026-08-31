import type { Metadata } from 'next';
import Link from 'next/link';
import { onePagers } from '@/content/sales-materials';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Sales & Project Resources | HILTECH',
  description:
    'Public-facing resources for company profile, solution one-pagers, RFQ preparation guidance, and project planning.',
  alternates: { canonical: site.siteUrl + '/resources' },
  openGraph: {
    title: 'Sales & Project Resources | HILTECH',
    description: 'Project planning references, RFQ preparation, company information, and scope tools.',
    url: site.siteUrl + '/resources',
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function ResourcesPage() {
  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>RESOURCES / PROJECT INTELLIGENCE</span>
            <span>PUBLIC / VERIFIED ROUTES</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>PLANNING / SCOPE / RFQ</span>
              <h1>
                READ WHAT<br />
                <em>THE PROJECT NEEDS.</em>
              </h1>
              <p>
                Company context, scope preparation, solution one-pagers, and request tools live here.
                Resources support a project decision; they do not replace technical review.
              </p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>COMPANY PROFILE</strong><small>POSITION / CAPABILITY</small></div>
              <div><span>02</span><strong>RFQ GUIDE</strong><small>INPUT / PREPARATION</small></div>
              <div><span>03</span><strong>{onePagers.length} ONE-PAGERS</strong><small>SOLUTION / CLIENT CONTEXT</small></div>
              <div><span>04</span><strong>PROJECT TOOLS</strong><small>SCOPE / TRACK</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / CORE RESOURCES</span>
            <strong>OPEN ONLY THE DEPTH YOU NEED</strong>
          </div>

          <div className="hiltech-utility-route-index">
            <Link href="/resources/company-profile" className="hiltech-utility-route-row">
              <span>01</span>
              <strong>Company Profile</strong>
              <p>Positioning, capabilities, solution areas, procurement model, and RFQ workflow.</p>
              <em>OPEN ↗</em>
            </Link>
            <Link href="/resources/rfq-guide" className="hiltech-utility-route-row">
              <span>02</span>
              <strong>RFQ Preparation Guide</strong>
              <p>What to prepare before quotation review so quantities, site context, and constraints are visible.</p>
              <em>PREPARE ↗</em>
            </Link>
            <Link href="/scope-finder" className="hiltech-utility-route-row">
              <span>03</span>
              <strong>Scope Finder</strong>
              <p>Turn an early project description into a preliminary system direction and RFQ starter context.</p>
              <em>DEFINE ↗</em>
            </Link>
            <Link href="/track" className="hiltech-utility-route-row">
              <span>04</span>
              <strong>Track RFQ</strong>
              <p>Use the request reference and matching contact detail to read the current request state.</p>
              <em>TRACK ↗</em>
            </Link>
          </div>
        </section>

        <section className="hiltech-utility-section is-dark">
          <div className="hiltech-utility-section-label is-dark">
            <span>02 / SOLUTION ONE-PAGERS</span>
            <strong>CLIENT CONTEXT / NOT A SUBSTITUTE FOR SCOPE REVIEW</strong>
          </div>

          <div className="hiltech-utility-route-index">
            {onePagers.map((item, index) => (
              <Link
                href={'/resources/one-pagers/' + item.slug}
                key={item.slug}
                className="hiltech-utility-route-row"
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.title}</strong>
                <p>{item.shortIntro}</p>
                <em>READ ↗</em>
              </Link>
            ))}
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>03 / PROJECT ENTRY</span>
            <strong>REFERENCE / SCOPE / CONTACT</strong>
          </div>

          <div className="hiltech-utility-actions">
            <Link href="/rfq">START A PROJECT <span aria-hidden="true">↗</span></Link>
            <Link href="/products-partners">FIND A REFERENCE <span aria-hidden="true">↗</span></Link>
            <Link href="/contact">CONTACT HILTECH <span aria-hidden="true">↗</span></Link>
          </div>

          <div className="hiltech-utility-route-index">
            <Link href="/resources/launch-copy" className="hiltech-utility-route-row">
              <span>04</span>
              <strong>Communication Templates</strong>
              <p>Optional launch and outreach copy retained as a utility resource, separate from technical project content.</p>
              <em>OPEN ↗</em>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
