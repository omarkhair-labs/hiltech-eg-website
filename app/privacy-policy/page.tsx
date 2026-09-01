import type { Metadata } from 'next';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | HILTECH Egypt',
  description: 'How HILTECH handles information submitted through its website, RFQ forms, and contact channels.',
  alternates: { canonical: site.siteUrl + '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <article className="hiltech-utility-legal">
          <header>
            <span>LEGAL / PRIVACY</span>
            <h1>Privacy Policy</h1>
            <p>Last updated: August 18, 2026</p>
          </header>

          <div className="hiltech-utility-legal-body">
            <section>
              <h2>Information we receive</h2>
              <p>When you contact HILTECH or submit a request for quotation, you may provide information such as your name, company, phone number, email address, project location, project notes, and the products or quantities you are interested in.</p>
            </section>
            <section>
              <h2>How we use it</h2>
              <p>We use submitted information to review project requirements, prepare and follow up on quotations, respond to enquiries, provide requested support, and maintain the operational records needed to manage those requests.</p>
            </section>
            <section>
              <h2>Website operations</h2>
              <p>The website may use technical logs, analytics, and essential browser storage to operate features, understand site usage, improve reliability, and keep the RFQ workflow working correctly.</p>
            </section>
            <section>
              <h2>Sharing and service providers</h2>
              <p>HILTECH may use service providers that host or operate parts of the website and its business systems. Information is not published as part of the public product catalog. We may also disclose information where required by applicable law or to protect legitimate business and security interests.</p>
            </section>
            <section>
              <h2>Retention and security</h2>
              <p>We keep business-request information for as long as reasonably needed for quotation, project, support, record-keeping, and legal purposes. We use access controls and server-side protections intended to reduce unauthorized access, although no internet service can guarantee absolute security.</p>
            </section>
            <section>
              <h2>Your questions or requests</h2>
              <p>For questions about information you submitted through this website, contact HILTECH at <a href={'mailto:' + site.contact.email}>{site.contact.email}</a> or by phone at {site.contact.phone}.</p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
