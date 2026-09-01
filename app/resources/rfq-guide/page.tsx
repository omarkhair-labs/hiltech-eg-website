import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'RFQ Preparation Guide | HILTECH Resources',
  description: 'Checklist for preparing complete infrastructure RFQ requests before quotation.',
  alternates: { canonical: site.siteUrl + '/resources/rfq-guide' },
  openGraph: {
    title: 'RFQ Preparation Guide | HILTECH',
    description: 'Prepare your project RFQ with a complete scope and checklist.',
    url: site.siteUrl + '/resources/rfq-guide',
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const checklist = [
  'Project location and site access conditions',
  'Site type (office, warehouse, factory, campus, mixed-use)',
  'Estimated number of endpoints, cameras, cabinets, or racks',
  'Preferred brands or technical specifications (if any)',
  'BOQ or quantity list, even if preliminary',
  'Required delivery or implementation timeline',
  'Testing, validation, and handover expectations',
  'Any operational constraints (working hours, phased rollout, safety protocols)',
];

export default function RFQGuidePage() {
  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>RESOURCES / RFQ PREPARATION</span>
            <span>INPUT QUALITY → REVIEW QUALITY</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>BEFORE THE REQUEST</span>
              <h1>
                PREPARE THE<br />
                <em>PROJECT INPUT.</em>
              </h1>
              <p>
                A complete request reduces clarification loops. The checklist below describes useful
                project context before HILTECH reviews price, availability, compatibility, and final scope.
              </p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>SITE</strong><small>LOCATION / ACCESS</small></div>
              <div><span>02</span><strong>SCALE</strong><small>ENDPOINT / CAMERA / RACK</small></div>
              <div><span>03</span><strong>REFERENCES</strong><small>BOQ / SPEC / BRAND</small></div>
              <div><span>04</span><strong>HANDOVER</strong><small>TEST / TIMELINE</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / REQUEST CHECKLIST</span>
            <strong>USE WHAT IS AVAILABLE / UNKNOWN ITEMS CAN BE CLARIFIED</strong>
          </div>

          <div className="hiltech-utility-ledger">
            {checklist.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{item}</h2>
                <div>
                  <p>
                    Include this when known. Missing information can be clarified during review; it should not be invented to make the request look complete.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="hiltech-utility-section is-dark">
          <div className="hiltech-utility-section-label is-dark">
            <span>02 / NEXT ACTION</span>
            <strong>REFERENCE / SCOPE / REQUEST</strong>
          </div>

          <div className="hiltech-utility-intro">
            <div className="hiltech-utility-copy-block">
              <h2>BUILD THE REQUEST FROM WHAT YOU ALREADY KNOW.</h2>
            </div>
            <div className="hiltech-utility-copy-block">
              <p>
                Exact product references can be added from Products. Early-stage projects can begin in Scope Finder.
                Both paths converge on the RFQ project sheet before submission.
              </p>
            </div>
          </div>

          <div className="hiltech-utility-actions">
            <Link href="/rfq">START RFQ <span aria-hidden="true">↗</span></Link>
            <Link href="/products-partners">FIND REFERENCES <span aria-hidden="true">↗</span></Link>
            <Link href="/scope-finder">DEFINE SCOPE <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
