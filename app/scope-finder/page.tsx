import type { Metadata } from 'next';
import ScopeFinderClient from './ScopeFinderClient';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Smart Project Scope Finder | HILTECH',
  description:
    'Answer a few project questions and get a preliminary infrastructure scope direction for cabling, fiber, data rooms, CCTV, testing, and project supply.',
  alternates: { canonical: site.siteUrl + '/scope-finder' },
  openGraph: {
    title: 'Smart Project Scope Finder | HILTECH',
    description:
      'Answer a few project questions and get a preliminary infrastructure scope direction for cabling, fiber, data rooms, CCTV, testing, and project supply.',
    url: site.siteUrl + '/scope-finder',
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

export default function ScopeFinderPage() {
  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>SCOPE FINDER / PRELIMINARY DIRECTION</span>
            <span>NOT A FINAL DESIGN / NOT A QUOTE</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>PROJECT INPUT → SYSTEM DIRECTION</span>
              <h1>
                DEFINE THE<br />
                <em>FIRST SCOPE.</em>
              </h1>
              <p>
                Answer a short sequence about environment, need, scale, supply, CCTV, testing,
                and urgency. The result is a planning direction that still requires HILTECH review.
              </p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>ENVIRONMENT</strong><small>SITE TYPE</small></div>
              <div><span>02</span><strong>NEED</strong><small>SYSTEM INTENT</small></div>
              <div><span>03</span><strong>SCALE</strong><small>ENDPOINT / ZONE</small></div>
              <div><span>04</span><strong>VALIDATE</strong><small>TEST / HANDOVER</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / SCOPE SEQUENCE</span>
            <strong>ANSWER / REVIEW / ADD STARTER CONTEXT</strong>
          </div>
          <ScopeFinderClient />
        </section>
      </div>
    </main>
  );
}
