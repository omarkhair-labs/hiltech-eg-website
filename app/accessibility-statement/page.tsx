import type { Metadata } from 'next';
import { SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Accessibility Statement | HILTECH Egypt',
  description: 'HILTECH accessibility statement and contact information for website accessibility feedback.',
  alternates: { canonical: `${site.siteUrl}/accessibility-statement` },
};

export default function AccessibilityStatementPage() {
  return (
    <main className="bg-slate-950 text-slate-100">
      <SectionShell>
        <article className="mx-auto max-w-3xl rounded-2xl border border-white/15 bg-white/5 p-6 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-orange-300">Accessibility</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Accessibility Statement</h1>
          <p className="mt-3 text-sm text-slate-400">Last updated: August 18, 2026</p>

          <div className="mt-8 space-y-7 text-sm leading-7 text-slate-300">
            <section><h2 className="text-lg font-semibold text-white">Our approach</h2><p className="mt-2">HILTECH aims to make this website practical to use across common devices, screen sizes, keyboards, and assistive technologies. Accessibility is treated as an ongoing part of maintaining the site rather than a one-time claim of perfect conformance.</p></section>
            <section><h2 className="text-lg font-semibold text-white">What we work to support</h2><p className="mt-2">We work to provide meaningful page structure, readable contrast, descriptive links and images where appropriate, keyboard-accessible navigation and controls, clear form labels and validation, and layouts that remain usable when content is resized or viewed on smaller screens.</p></section>
            <section><h2 className="text-lg font-semibold text-white">Third-party content</h2><p className="mt-2">Some website functionality or media may depend on third-party services. Their accessibility behavior can be outside HILTECH&apos;s direct control, but we can still investigate reported problems and look for practical alternatives where possible.</p></section>
            <section><h2 className="text-lg font-semibold text-white">Tell us about a problem</h2><p className="mt-2">If you have difficulty using a page, form, product listing, or RFQ feature, tell us what you were trying to access and the problem you encountered. Contact <a className="text-orange-300 hover:text-orange-200" href={`mailto:${site.contact.email}`}>{site.contact.email}</a> or call {site.contact.phone}. We will use that feedback to investigate and improve the experience.</p></section>
          </div>
        </article>
      </SectionShell>
    </main>
  );
}
