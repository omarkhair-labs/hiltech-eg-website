import type { Metadata } from 'next';
import { site } from '@/content/site';
import TrackClient from './track-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Track Your RFQ | HILTECH',
  description:
    'Track the current status of your RFQ request using your request reference and matching contact detail.',
  alternates: {
    canonical: site.siteUrl + '/track',
    languages: {
      en: site.siteUrl + '/track',
      ar: site.siteUrl + '/ar/track',
      'x-default': site.siteUrl + '/',
    },
  },
};

interface TrackPageProps {
  searchParams?: Promise<{ request_code?: string }>;
}

export default async function TrackPage({ searchParams }: TrackPageProps) {
  const params = await searchParams;
  const initialRequestCode =
    typeof params?.request_code === 'string' ? params.request_code : '';

  return (
    <main className="hiltech-utility-page">
      <div className="hiltech-utility-shell">
        <section className="hiltech-utility-hero">
          <div className="hiltech-utility-topline">
            <span>RFQ / TRACKING</span>
            <span>REFERENCE + CONTACT VERIFICATION</span>
          </div>

          <div className="hiltech-utility-hero-grid">
            <div className="hiltech-utility-hero-copy">
              <span>REQUEST STATE / CLIENT ACCESS</span>
              <h1>
                FOLLOW THE<br />
                <em>REQUEST STATE.</em>
              </h1>
              <p>
                Use the RFQ reference and the same phone number or email used at submission.
                Tracking exposes the current request state; it does not create or change a quotation.
              </p>
            </div>

            <div className="hiltech-utility-hero-state">
              <div><span>01</span><strong>REFERENCE</strong><small>REQUEST CODE</small></div>
              <div><span>02</span><strong>VERIFY</strong><small>PHONE / EMAIL</small></div>
              <div><span>03</span><strong>READ STATE</strong><small>STATUS / UPDATE</small></div>
              <div><span>04</span><strong>NEXT STEP</strong><small>CONTACT / RESPONSE</small></div>
            </div>
          </div>
        </section>

        <section className="hiltech-utility-section">
          <div className="hiltech-utility-section-label">
            <span>01 / REQUEST LOOKUP</span>
            <strong>REFERENCE / MATCHING CONTACT</strong>
          </div>
          <TrackClient initialRequestCode={initialRequestCode} />
        </section>
      </div>
    </main>
  );
}
