import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | Network Infrastructure, Fiber Optics & RFQ in Egypt',
  description:
    'HILTECH supports network infrastructure delivery in Egypt with fiber optics, structured cabling, data room readiness, testing before handover, and RFQ coordination.',
  alternates: {
    canonical: `${site.siteUrl}/`,
    languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` },
  },
  openGraph: {
    title: 'HILTECH | Enterprise Network Infrastructure & Project Supply',
    description:
      'Network infrastructure, fiber optics, structured cabling, data room readiness, testing workflows, and project-based supply for business facilities in Egypt.',
    url: site.siteUrl,
    images: [site.ogImage],
  },
  twitter: { card: 'summary_large_image', images: [site.ogImage] },
};

const deliveryPillars = [
  {
    number: '01',
    title: 'Structured Cabling',
    body: 'Copper routes, outlets, patching, rack organization, and endpoint readiness for commercial sites.',
  },
  {
    number: '02',
    title: 'Fiber Infrastructure',
    body: 'Backbone planning, ODF organization, patching, termination context, and optical testing workflows.',
  },
  {
    number: '03',
    title: 'Data Room Readiness',
    body: 'Rack, PDU, patch-panel, routing, labeling, and maintainability considered as one delivery scope.',
  },
  {
    number: '04',
    title: 'Project Supply & RFQ',
    body: 'Select exact product references, set quantities, submit one structured request, and track it after submission.',
  },
];

const fieldWork = [
  {
    title: 'Rack & data room preparation',
    description: 'Organized patching flow and serviceable routing.',
    image: '/rack-front-cabling.jpg',
    href: '/work#rack-data-room',
  },
  {
    title: 'Fiber / ODF work',
    description: 'Backbone termination and distribution context.',
    image: '/fiber-distribution-panel.jpg',
    href: '/work#fiber-odf',
  },
  {
    title: 'Testing before handover',
    description: 'Validation workflows using field testing tools.',
    image: '/testing-otdr-device.jpg',
    href: '/work#testing-handover',
  },
];

const catalogCategories = [
  { label: 'Fiber Optics', category: 'Fiber Optic Systems' },
  { label: 'Copper / CAT6', category: 'Copper / CAT6 Cabling' },
  { label: 'Patch Cords', category: 'Patch Cords & Connectivity' },
  { label: 'RJ45 & Faceplates', category: 'Faceplates / Keystone / RJ45' },
  { label: 'Racks & PDU', category: 'Cabinets / Racks / PDU' },
];

const deliveryPrinciples = [
  ['Scope first', 'Clarify the route, quantities, interfaces, and handover requirement before final quotation.'],
  ['Availability confirmed', 'Product availability and final specifications are checked during RFQ review instead of being guessed on the website.'],
  ['Testing-aware delivery', 'Installation decisions consider labeling, access, validation, and future maintenance from the start.'],
] as const;

export default function HomePage() {
  return (
    <main className="bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="container relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="public-eyebrow text-orange-300">Network infrastructure in Egypt</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
              Infrastructure built for the site — and ready for procurement.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              HILTECH supports structured cabling, fiber backbones, data-room readiness, testing, and project supply through one clear path from scope to RFQ.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products-partners" className="btn-primary min-h-12 px-6 py-3 text-sm shadow-[0_14px_35px_rgba(234,88,12,0.2)]">
                Browse Products
              </Link>
              <Link href="/work" className="btn-secondary min-h-12 px-6 py-3 text-sm">
                View Field Work
              </Link>
            </div>
            <Link href="/track" className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-slate-400 underline decoration-white/20 underline-offset-4 transition hover:text-white">
              Already submitted? Track your RFQ →
            </Link>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-400">
              <span><strong className="text-slate-100">Fiber + Copper</strong> connectivity</span>
              <span><strong className="text-slate-100">RFQ</strong> multi-item workflow</span>
              <span><strong className="text-slate-100">Fluke + OTDR</strong> testing context</span>
            </div>
          </div>

          <div className="relative lg:pl-6">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 shadow-[0_32px_90px_rgba(2,6,23,0.55)]">
              <div className="relative aspect-[4/3] min-h-[320px] sm:min-h-[430px]">
                <Image
                  src="/rack-data-room.jpg"
                  alt="Organized network rack and data room infrastructure"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="public-eyebrow text-orange-300">Delivery context</p>
                  <p className="mt-2 max-w-md text-lg font-bold text-white sm:text-xl">Design, installation, testing, and handover considered as one infrastructure workflow.</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-2 rounded-xl border border-white/15 bg-slate-950/95 px-4 py-3 shadow-xl backdrop-blur sm:left-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Primary action</p>
              <p className="mt-1 text-sm font-bold text-white">Find exact items → build one RFQ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-slate-950 py-14 sm:py-16">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <div>
              <p className="public-eyebrow text-orange-300">What HILTECH delivers</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] text-white sm:text-4xl">Four parts of one project journey.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">The site is organized around what a buyer or project owner needs to do next — not around a long list of disconnected services.</p>
              <Link href="/solutions" className="mt-5 inline-flex min-h-10 items-center text-sm font-bold text-orange-300 hover:text-orange-200">Explore solutions →</Link>
            </div>

            <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {deliveryPillars.map((pillar) => (
                <article key={pillar.number} className="border-t border-white/15 pt-4">
                  <div className="flex items-start gap-4">
                    <span className="text-xs font-black tracking-[0.18em] text-orange-400">{pillar.number}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{pillar.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{pillar.body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="public-eyebrow text-orange-300">Field work</p>
              <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">See the delivery context, not just the claims.</h2>
            </div>
            <Link href="/work" className="inline-flex min-h-11 items-center text-sm font-bold text-slate-300 hover:text-white">View all field work →</Link>
          </div>

          <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
            <Link href={fieldWork[0].href} className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-7 lg:row-span-2 lg:min-h-[560px]">
              <Image src={fieldWork[0].image} alt={fieldWork[0].title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                <h3 className="text-xl font-bold sm:text-2xl">{fieldWork[0].title}</h3>
                <p className="mt-2 text-sm text-slate-300">{fieldWork[0].description}</p>
              </div>
            </Link>

            {fieldWork.slice(1).map((item) => (
              <Link key={item.title} href={item.href} className="group relative min-h-[270px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-5">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/45 py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <p className="public-eyebrow text-orange-300">Catalog → RFQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">Turn product discovery into one structured request.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-400">Search the live catalog, choose exact references, add quantities, then submit the full requirement once instead of explaining every item in separate messages.</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {catalogCategories.map((item) => (
                <Link key={item.category} href={`/products-partners?category=${encodeURIComponent(item.category)}`} className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200">
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/products-partners" className="btn-primary mt-7 min-h-12 px-6 py-3 text-sm">Browse live catalog</Link>
          </div>

          <ol className="grid gap-3">
            {[
              ['01', 'Search & filter', 'Find the exact model, brand, or category without scrolling a generic brochure.'],
              ['02', 'Build the basket', 'Add multiple items and quantities to a single RFQ basket while you browse.'],
              ['03', 'Submit & track', 'Send the requirement once, receive a reference, and use the tracking flow for follow-up.'],
            ].map(([number, title, body]) => (
              <li key={number} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-slate-950/55 p-5 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-xs font-black text-orange-300 ring-1 ring-orange-400/30">{number}</span>
                <div>
                  <h3 className="text-lg font-bold text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-400">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[440px]">
            <Image src="/testing-field-device.jpg" alt="Network infrastructure testing workflow" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/80 via-transparent to-orange-500/10" />
          </div>

          <div>
            <p className="public-eyebrow text-orange-300">Delivery discipline</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em] sm:text-4xl">A calmer website because the process is clearer.</h2>
            <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {deliveryPrinciples.map(([title, body]) => (
                <div key={title} className="py-5">
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
                </div>
              ))}
            </div>
            <Link href="/services" className="mt-5 inline-flex min-h-10 items-center text-sm font-bold text-orange-300 hover:text-orange-200">See delivery services →</Link>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-orange-400/25 bg-[linear-gradient(125deg,rgba(234,88,12,0.2),rgba(15,23,42,0.8)_48%,rgba(2,6,23,0.95))] p-7 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="public-eyebrow text-orange-200">Ready when the scope is ready</p>
                <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">Send the project requirements once. Keep the quotation workflow organized.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Add catalog items, quantities, a BOQ, or site notes. HILTECH reviews the requirement and follows up through the RFQ workflow.</p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <Link href="/rfq" className="btn-primary min-h-12 px-6 py-3 text-sm">Send Project Requirements</Link>
                <Link href="/contact" className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white">Contact HILTECH</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
