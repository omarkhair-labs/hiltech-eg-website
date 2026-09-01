import type { Metadata } from 'next';
import Link from 'next/link';
import { launchCopy, salesMessageTemplates } from '@/content/sales-materials';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Client Communication Templates | HILTECH Resources',
  description:
    'Client-safe launch communication copy and outreach templates for HILTECH team coordination.',
  alternates: { canonical: site.siteUrl + '/resources/launch-copy' },
  openGraph: {
    title: 'Client Communication Templates | HILTECH',
    description: 'Launch communication copy for announcements, client updates, and outreach alignment.',
    url: site.siteUrl + '/resources/launch-copy',
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const launchPosts = [
  ['Facebook Launch Post', 'Arabic', launchCopy.facebookAr],
  ['Facebook Launch Post', 'English', launchCopy.facebookEn],
  ['LinkedIn-Style B2B Post', 'English', launchCopy.linkedInEn],
  ['Short Caption', 'Arabic', launchCopy.captionAr],
  ['Short Caption', 'English', launchCopy.captionEn],
] as const;

export default function LaunchCopyPage() {
  const salesMessages = Object.entries(salesMessageTemplates);

  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>RESOURCES / COMMUNICATION TEMPLATES</span>
            <span>OPTIONAL / REVIEW BEFORE USE</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>OUTREACH / CLIENT COMMUNICATION</span>
              <h1>
                KEEP THE<br />
                <em>MESSAGE CONSISTENT.</em>
              </h1>
              <p>
                Reusable launch and outreach copy retained as a communication utility.
                These templates are not technical specifications and should be reviewed before publishing.
              </p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>{launchPosts.length} LAUNCH ENTRIES</strong><small>SOCIAL / CAPTION</small></div>
              <div><span>02</span><strong>2 WHATSAPP VERSIONS</strong><small>AR / EN</small></div>
              <div><span>03</span><strong>{salesMessages.length} SALES TEMPLATES</strong><small>OUTREACH</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / LAUNCH COPY</span>
            <strong>REVIEW / ADAPT / PUBLISH</strong>
          </div>

          <div className="hiltech-utility-copy-index">
            {launchPosts.map(([label, language, text], index) => (
              <article key={label + language}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{label}</strong>
                  <small>{language}</small>
                </div>
                <pre>{text}</pre>
              </article>
            ))}
          </div>
        </section>

        <section className="hiltech-utility-section is-dark">
          <div className="hiltech-utility-section-label is-dark">
            <span>02 / WHATSAPP</span>
            <strong>SHORT CLIENT OUTREACH</strong>
          </div>

          <div className="hiltech-utility-copy-index is-dark">
            <article>
              <span>01</span>
              <div><strong>WhatsApp Broadcast</strong><small>Arabic</small></div>
              <pre>{launchCopy.whatsappAr}</pre>
            </article>
            <article>
              <span>02</span>
              <div><strong>WhatsApp Broadcast</strong><small>English</small></div>
              <pre>{launchCopy.whatsappEn}</pre>
            </article>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>03 / SALES MESSAGES</span>
            <strong>OPTIONAL OUTREACH LIBRARY</strong>
          </div>

          <div className="hiltech-utility-copy-index">
            {salesMessages.map(([key, text], index) => (
              <article key={key}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div><strong>{key.replaceAll('_', ' ')}</strong><small>SALES / OUTREACH</small></div>
                <pre>{text}</pre>
              </article>
            ))}
          </div>

          <div className="hiltech-utility-actions">
            <Link href="/resources">BACK TO RESOURCES <span aria-hidden="true">↗</span></Link>
            <Link href="/contact">CONTACT HILTECH <span aria-hidden="true">↗</span></Link>
            <Link href="/rfq">START A PROJECT <span aria-hidden="true">↗</span></Link>
          </div>
        </section>
      </div>
    </main>
  );
}
