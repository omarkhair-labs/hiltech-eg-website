import type { Metadata } from 'next';
import Link from 'next/link';
import { companyProfile } from '@/content/sales-materials';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Company Profile | HILTECH Resources',
  description:
    'HILTECH company profile with positioning, service scope, solution areas, and RFQ workflow details.',
  alternates: { canonical: site.siteUrl + '/resources/company-profile' },
  openGraph: {
    title: 'Company Profile | HILTECH',
    description: 'Company profile content prepared for client communication and project context.',
    url: site.siteUrl + '/resources/company-profile',
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function CompanyProfilePage() {
  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>RESOURCES / COMPANY PROFILE</span>
            <span>POSITION / CAPABILITY / PROJECT ENTRY</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>COMPANY CONTEXT / CLIENT REFERENCE</span>
              <h1>
                ONE COMPANY.<br />
                <em>ONE OPERATING LAYER.</em>
              </h1>
              <p>{companyProfile.intro}</p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>POSITION</strong><small>WHAT HILTECH IS</small></div>
              <div><span>02</span><strong>CAPABILITY</strong><small>WHAT HILTECH DOES</small></div>
              <div><span>03</span><strong>SUPPLY</strong><small>REFERENCE / PROJECT</small></div>
              <div><span>04</span><strong>RFQ</strong><small>REQUEST / REVIEW</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / COMPANY PROFILE</span>
            <strong>CLIENT-SAFE OPERATING SUMMARY</strong>
          </div>

          <div className="hiltech-utility-ledger">
            <article>
              <span>01</span>
              <h2>Positioning</h2>
              <div><p>{companyProfile.positioning}</p></div>
            </article>

            <article>
              <span>02</span>
              <h2>What HILTECH Provides</h2>
              <div>
                <ul>{companyProfile.whatWeDo.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>

            <article>
              <span>03</span>
              <h2>Solutions Overview</h2>
              <div>
                <ul>{companyProfile.solutionAreas.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>

            <article>
              <span>04</span>
              <h2>Product & Project Supply</h2>
              <div>
                <ul>{companyProfile.productSupply.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </article>

            <article>
              <span>05</span>
              <h2>RFQ Workflow</h2>
              <div>
                <ol>{companyProfile.rfqWorkflow.map((item) => <li key={item}>{item}</li>)}</ol>
              </div>
            </article>

            <article>
              <span>06</span>
              <h2>Compliance Note</h2>
              <div><p>{companyProfile.complianceNote}</p></div>
            </article>
          </div>

          <div className="hiltech-utility-actions">
            <Link href="/rfq">START A PROJECT <span aria-hidden="true">↗</span></Link>
            <Link href="/company">OPEN COMPANY <span aria-hidden="true">↗</span></Link>
            <a href={site.contact.whatsappGeneralLink}>WHATSAPP HILTECH <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </main>
  );
}
