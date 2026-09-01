'use client';

import Link from 'next/link';
import { FormEvent, useMemo, useState } from 'react';
import { trackEvent } from '@/lib/client/analytics';
import type { TrackMessages } from '@/content/ar/track';

interface TrackedRequest {
  requestCode: string;
  status: string;
  statusExplanation: string;
  createdAt: string;
  lastUpdatedAt: string;
  itemCount: number;
  items?: Array<{
    name: string;
    category?: string | null;
    quantity?: number | null;
    unit?: string | null;
    notes?: string | null;
  }>;
  quote?: { status?: string | null } | null;
  customerResponse?: { status?: string | null } | null;
}

interface TrackResponse {
  ok: boolean;
  error?: string;
  request?: TrackedRequest;
}

const enMessages: TrackMessages = {
  trackTitle: 'Track Your RFQ',
  trackIntro: 'Enter your RFQ reference and the same phone or email used during submission.',
  rfqReference: 'RFQ Reference',
  phoneOrEmail: 'Phone or Email',
  trackButton: 'Track Request',
  tracking: 'Checking...',
  status: 'Status',
  created: 'Created',
  lastUpdate: 'Last update',
  requestedItems: 'Items Summary',
  nextStep: 'Next Step',
  reference: 'Reference',
  contactHiltech: 'Contact HILTECH',
  backToRFQ: 'Back to RFQ',
  notFound: 'We could not match this RFQ reference with the provided phone/email.',
  verificationHint: 'Check the reference and use the same phone number or email used in your request.',
  genericError: 'Unable to load request status right now. Please try again.',
  statusMessages: {
    new: 'Your RFQ was received. HILTECH will review the submitted scope and items.',
    in_review: 'Your RFQ is being reviewed. HILTECH may contact you for clarification.',
    quoted: 'Your quotation is ready or being shared.',
    waiting_client: 'HILTECH is waiting for your response or clarification.',
    won: 'This request has been accepted and moved forward.',
    lost: 'This request has been closed.',
    closed: 'This request has been closed or completed.',
  },
  statusFallback: 'Your RFQ status has been updated.',
};

export default function TrackClient({
  initialRequestCode = '',
  locale = 'en',
  messages = enMessages,
  rfqHref = '/rfq',
  contactHref = '/contact',
}: {
  initialRequestCode?: string;
  locale?: 'en' | 'ar';
  messages?: TrackMessages;
  rfqHref?: string;
  contactHref?: string;
}) {
  const [requestCode, setRequestCode] = useState(initialRequestCode);
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResponse | null>(null);

  const tracked = result?.request;
  const hasResult = Boolean(result?.ok && tracked);
  const stepMessage = useMemo(
    () => (tracked ? messages.statusMessages[tracked.status] || messages.statusFallback : ''),
    [tracked, messages],
  );
  const quoteResponseAllowed = Boolean(
    tracked?.quote &&
      tracked?.status === 'quoted' &&
      (!tracked.customerResponse?.status || tracked.customerResponse.status === 'no_response'),
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/rfq/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_code: requestCode,
          phone_or_email: phoneOrEmail,
        }),
      });
      const body = (await response.json()) as TrackResponse;
      setResult(body);
      if (body.ok && body.request?.quote) {
        trackEvent('quote_viewed', { source: 'track_page' });
      }
    } catch {
      setResult({ ok: false, error: messages.genericError });
    } finally {
      setLoading(false);
    }
  }

  const fmtDate = (value?: string | null) =>
    value ? new Date(value).toLocaleString(locale === 'ar' ? 'ar-EG' : undefined) : null;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <form onSubmit={onSubmit} className="hiltech-utility-form" data-track-form>
        <div className="hiltech-utility-fields">
          <label>
            <span>{messages.rfqReference}</span>
            <input
              value={requestCode}
              onChange={(event) => setRequestCode(event.target.value)}
              required
              dir="ltr"
              autoComplete="off"
            />
          </label>

          <label>
            <span>{messages.phoneOrEmail}</span>
            <input
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
              required
              dir="ltr"
              autoComplete="email"
            />
          </label>
        </div>

        <div className="hiltech-utility-actions">
          <button type="submit" disabled={loading}>
            {loading ? messages.tracking : messages.trackButton}
            <span aria-hidden="true">↗</span>
          </button>
          <Link href={rfqHref}>
            {messages.backToRFQ} <span aria-hidden="true">↗</span>
          </Link>
          <Link href={contactHref}>
            {messages.contactHiltech} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </form>

      {result && !hasResult ? (
        <div className="hiltech-utility-error" data-track-error>
          {result.error || messages.notFound + ' ' + messages.verificationHint}
        </div>
      ) : null}

      {hasResult && tracked ? (
        <section className="hiltech-utility-status" data-track-result>
          <article>
            <span>01 / {messages.reference}</span>
            <div>
              <strong dir="ltr">{tracked.requestCode}</strong>
              <p>{messages.status}: {tracked.status.toUpperCase()}</p>
            </div>
          </article>

          <article>
            <span>02 / TIMELINE</span>
            <div>
              <strong>{messages.created}: {fmtDate(tracked.createdAt)}</strong>
              <p>{messages.lastUpdate}: {fmtDate(tracked.lastUpdatedAt)}</p>
            </div>
          </article>

          <article>
            <span>03 / {messages.nextStep}</span>
            <div>
              <strong>{stepMessage}</strong>
              {tracked.statusExplanation ? <p>{tracked.statusExplanation}</p> : null}
            </div>
          </article>

          <article>
            <span>04 / {messages.requestedItems}</span>
            <div>
              <strong>{tracked.itemCount} CURRENT REQUEST LINES</strong>
              {tracked.items?.length ? (
                <ul>
                  {tracked.items.slice(0, 8).map((item, index) => (
                    <li key={item.name + '-' + index}>
                      {item.name}
                      {item.quantity ? ' / ' + item.quantity + (item.unit ? ' ' + item.unit : '') : ''}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>

          {quoteResponseAllowed ? (
            <article>
              <span>05 / RESPONSE</span>
              <div>
                <strong>QUOTE RESPONSE AVAILABLE</strong>
                <p>Response actions become available after quotation review.</p>
              </div>
            </article>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
