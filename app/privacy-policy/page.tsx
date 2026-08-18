import type { Metadata } from 'next';
import { SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | HILTECH Egypt',
  description: 'How HILTECH handles information submitted through its website, RFQ forms, and contact channels.',
  alternates: { canonical: `${site.siteUrl}/privacy-policy` },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SectionShell>
        <article className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Legal</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: August 18, 2026</p>

          <div className="mt-8 space-y-7 text-sm leading-7 text-slate-300">
            <section><h2 className="text-lg font-semibold text-white">Information we receive</h2><p className="mt-2">When you contact HILTECH or submit a request for quotation, you may provide information such as your name, company, phone number, email address, project location, project notes, and the products or quantities you are interested in.</p></section>
            <section><h2 className="text-lg font-semibold text-white">How we use it</h2><p className="mt-2">We use submitted information to review project requirements, prepare and follow up on quotations, respond to enquiries, provide requested support, and maintain the operational records needed to manage those requests.</p></section>
            <section><h2 className="text-lg font-semibold text-white">Website operations</h2><p className="mt-2">The website may use technical logs, analytics, and essential browser storage to operate features, understand site usage, improve reliability, and keep the RFQ workflow working correctly.</p></section>
            <section><h2 className="text-lg font-semibold text-white">Sharing and service providers</h2><p className="mt-2">HILTECH may use service providers that host or operate parts of the website and its business systems. Information is not published as part of the public product catalog. We may also disclose information where required by applicable law or to protect legitimate business and security interests.</p></section>
            <section><h2 className="text-lg font-semibold text-white">Retention and security</h2><p className="mt-2">We keep business-request information for as long as reasonably needed for quotation, project, support, record-keeping, and legal purposes. We use access controls and server-side protections intended to reduce unauthorized access, although no internet service can guarantee absolute security.</p></section>
            <section><h2 className="text-lg font-semibold text-white">Your questions or requests</h2><p className="mt-2">For questions about information you submitted through this website, contact HILTECH at <a className="text-orange-300 hover:text-orange-200" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or by phone at {site.contact.phone}.</p></section>
          </div>
        </article>
      </SectionShell>
    </main>
  );
}
