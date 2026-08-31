import type { Metadata } from 'next';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Accessibility Statement | HILTECH Egypt',
  description: 'HILTECH accessibility statement and contact information for website accessibility feedback.',
  alternates: { canonical: site.siteUrl + '/accessibility-statement' },
};

export default function AccessibilityStatementPage() {
  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <article className="hiltech-utility-legal">
          <header>
            <span>PUBLIC SYSTEM / ACCESSIBILITY</span>
            <h1>Accessibility Statement</h1>
            <p>Last updated: August 18, 2026</p>
          </header>

          <div className="hiltech-utility-legal-body">
            <section>
              <h2>Our approach</h2>
              <p>HILTECH aims to make this website practical to use across common devices, screen sizes, keyboards, and assistive technologies. Accessibility is treated as an ongoing part of maintaining the site rather than a one-time claim of perfect conformance.</p>
            </section>
            <section>
              <h2>What we work to support</h2>
              <p>We work to provide meaningful page structure, readable contrast, descriptive links and images where appropriate, keyboard-accessible navigation and controls, clear form labels and validation, and layouts that remain usable when content is resized or viewed on smaller screens.</p>
            </section>
            <section>
              <h2>Third-party content</h2>
              <p>Some website functionality or media may depend on third-party services. Their accessibility behavior can be outside HILTECH&apos;s direct control, but we can still investigate reported problems and look for practical alternatives where possible.</p>
            </section>
            <section>
              <h2>Tell us about a problem</h2>
              <p>If you have difficulty using a page, form, product listing, or RFQ feature, tell us what you were trying to access and the problem you encountered. Contact <a href={'mailto:' + site.contact.email}>{site.contact.email}</a> or call {site.contact.phone}. We will use that feedback to investigate and improve the experience.</p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
