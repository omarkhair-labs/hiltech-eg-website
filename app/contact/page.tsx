import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact HILTECH | RFQ, WhatsApp & Network Infrastructure Support',
  description: 'Choose the shortest path into HILTECH: structured RFQ or direct Cairo contact for network infrastructure project framing.',
  alternates: {
    canonical: `${site.siteUrl}/contact`,
    languages: {
      en: `${site.siteUrl}/contact`,
      ar: `${site.siteUrl}/ar/contact`,
      'x-default': `${site.siteUrl}/`,
    },
  },
};

const preparation = [
  'Site / facility type and physical location',
  'Fiber, structured cabling, rack, CCTV, pathway, or testing scope',
  'Approximate quantities or exact references when available',
  'Target timing and site constraints',
  'BOQ, drawings, or route notes when available',
];

export default function Page() {
  return (
    <main className="hiltech-contact-page">
      <section className="hiltech-contact-hero">
        <div className="hiltech-contact-shell">
          <div className="hiltech-contact-topline">
            <span>CONTACT / ROUTE THE REQUEST</span>
            <span>CAIRO / EGYPT</span>
          </div>

          <div className="hiltech-contact-hero-grid">
            <div>
              <span>DIRECT ENTRY</span>
              <h1>
                CHOOSE THE<br />
                <em>SHORTEST PATH.</em>
              </h1>
            </div>
            <div>
              <p>
                Use a structured RFQ when you already have references, quantities, or a defined system scope. Use direct contact when the project still needs to be framed.
              </p>
              <div className="hiltech-contact-paths">
                <Link href="/rfq">
                  <span>01 / I HAVE SCOPE</span>
                  <strong>START STRUCTURED RFQ</strong>
                  <em>↗</em>
                </Link>
                <a href={site.contact.whatsappGeneralLink} target="_blank" rel="noreferrer">
                  <span>02 / I NEED TO FRAME IT</span>
                  <strong>OPEN WHATSAPP</strong>
                  <em>↗</em>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-contact-channels">
        <div className="hiltech-contact-shell">
          <div className="hiltech-contact-section-label">
            <span>01 / DIRECT CHANNELS</span>
            <strong>ONE VERIFIED PRESENCE / THREE DIRECT CONTACT METHODS</strong>
          </div>

          <div className="hiltech-contact-channel-index">
            <a href={site.contact.whatsappGeneralLink} target="_blank" rel="noreferrer">
              <span>01</span>
              <small>WHATSAPP / RFQ</small>
              <strong>{site.contact.whatsappLocal}</strong>
              <em>↗</em>
            </a>
            <a href={'tel:' + site.contact.phone}>
              <span>02</span>
              <small>PHONE</small>
              <strong>{site.contact.phone}</strong>
              <em>↗</em>
            </a>
            <a href={'mailto:' + site.contact.email}>
              <span>03</span>
              <small>EMAIL</small>
              <strong>{site.contact.email}</strong>
              <em>↗</em>
            </a>
          </div>

          <address className="hiltech-contact-address">
            <span>PHYSICAL PRESENCE</span>
            <strong>{site.contact.addressEn}</strong>
            <small>ONE PUBLISHED LOCATION / NO INVENTED BRANCH NETWORK</small>
          </address>
        </div>
      </section>

      <section className="hiltech-contact-prepare">
        <div className="hiltech-contact-shell">
          <div className="hiltech-contact-section-label is-dark">
            <span>02 / PREPARE THE CONVERSATION</span>
            <strong>WHAT HELPS THE PROJECT MOVE FASTER.</strong>
          </div>

          <div className="hiltech-contact-prepare-grid">
            <div>
              <h2>
                BRING THE CONTEXT.<br />
                <em>WE CAN BUILD THE REQUEST FROM THERE.</em>
              </h2>
            </div>
            <div className="hiltech-contact-prep-index">
              {preparation.map((item, index) => (
                <div key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="hiltech-contact-close">
        <div className="hiltech-contact-shell">
          <div className="hiltech-contact-close-grid">
            <div>
              <span>03 / PROJECT HANDOFF</span>
              <h2>
                FROM CONVERSATION<br />
                <em>TO A REAL SCOPE.</em>
              </h2>
            </div>
            <nav>
              <Link href="/rfq">START RFQ <span aria-hidden="true">↗</span></Link>
              <Link href="/work">FIELD EVIDENCE <span aria-hidden="true">↗</span></Link>
              <Link href="/company">COMPANY <span aria-hidden="true">↗</span></Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
}
