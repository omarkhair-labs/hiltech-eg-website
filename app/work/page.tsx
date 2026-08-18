import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/primitives';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Field Work & Infrastructure Proof',
  description: 'HILTECH field work visuals showing rack preparation, structured cabling, fiber infrastructure, testing, and handover readiness.',
  alternates: { canonical: `${site.siteUrl}/work`, languages: { en: `${site.siteUrl}/work`, ar: `${site.siteUrl}/ar/work`, 'x-default': `${site.siteUrl}/` } },
};

type ProofCard = {
  id: string;
  label: string;
  title: string;
  scope: string;
  confidence: string;
  image: string;
  alt: string;
};

const proofCards: ProofCard[] = [
  {
    id: 'rack-data-room',
    label: 'Rack preparation',
    title: 'Rack & data room preparation',
    scope: 'Rack organization, patching, cable routing, and readiness checks for business network rooms.',
    confidence: 'Focused on clean handover and maintainable infrastructure.',
    image: '/rack-data-room.jpg',
    alt: 'Rack and data room setup with organized routing and patch access.',
  },
  {
    id: 'structured-cabling',
    label: 'Structured cabling',
    title: 'Copper pathways & patching',
    scope: 'Organized cable pathways, patch-panel termination, and routing discipline across technical spaces.',
    confidence: 'Supports stable operation and easier maintenance after delivery.',
    image: '/copper-patch-panel.jpg',
    alt: 'Structured copper patching and cable management in technical infrastructure.',
  },
  {
    id: 'fiber-odf',
    label: 'Fiber / ODF',
    title: 'Fiber distribution & termination',
    scope: 'Fiber routing context, ODF organization, and connector preparation aligned with project execution.',
    confidence: 'Built around clarity, serviceability, and practical field readiness.',
    image: '/fiber-distribution-panel.jpg',
    alt: 'Fiber distribution and ODF preparation with organized termination points.',
  },
  {
    id: 'testing-handover',
    label: 'Testing & handover',
    title: 'Validation before go-live',
    scope: 'Field testing tools and validation checks used before delivery and operational handover.',
    confidence: 'Helps reduce avoidable issues before go-live and supports cleaner handover.',
    image: '/testing-otdr-device.jpg',
    alt: 'Testing instrument used for field validation before handover.',
  },
];

export default function Page() {
  const [lead, ...supporting] = proofCards;

  return (
    <main className="bg-slate-950 text-white">
      <SectionShell>
        <section className="grid gap-8 border-b border-white/10 pb-10 pt-2 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-12">
          <div>
            <p className="public-eyebrow text-orange-300">Field work proof</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.035em] sm:text-5xl">Delivery context you can inspect — not a wall of generic claims.</h1>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-base leading-7 text-slate-300">Approved HILTECH field visuals are organized by delivery discipline, with the scope and handover purpose explained beside the work.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/rfq" className="btn-primary min-h-11 px-5 py-2.5 text-sm">Send Project Requirements</Link>
              <Link href="/contact" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-slate-400 transition hover:text-white">Discuss a project →</Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <article id={lead.id} className="group relative min-h-[430px] overflow-hidden rounded-[1.5rem] border border-white/10 lg:col-span-7 lg:row-span-2 lg:min-h-[650px]">
            <Image src={lead.image} alt={lead.alt} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="inline-flex rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 text-xs font-bold text-orange-200 backdrop-blur">{lead.label}</span>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">{lead.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">{lead.scope}</p>
              <p className="mt-2 max-w-xl text-sm font-semibold text-white">{lead.confidence}</p>
            </div>
          </article>

          {supporting.slice(0, 2).map((card) => (
            <article id={card.id} key={card.id} className="group relative min-h-[310px] overflow-hidden rounded-[1.5rem] border border-white/10 lg:col-span-5">
              <Image src={card.image} alt={card.alt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-200">{card.label}</p>
                <h2 className="mt-2 text-xl font-bold">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.scope}</p>
              </div>
            </article>
          ))}
        </section>

        <section id={supporting[2].id} className="mt-4 grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/55 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[320px] lg:min-h-[430px]">
            <Image src={supporting[2].image} alt={supporting[2].alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/15" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="public-eyebrow text-orange-300">{supporting[2].label}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.025em]">{supporting[2].title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{supporting[2].scope}</p>
            <p className="mt-3 text-sm font-semibold text-white">{supporting[2].confidence}</p>
          </div>
        </section>

        <section className="mt-12 border-y border-white/10 py-8 sm:py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Route clarity', 'Organized pathways that can be traced and maintained.'],
              ['Rack discipline', 'Patching and hardware laid out for service access.'],
              ['Validation', 'Testing context considered before operational handover.'],
              ['Documentation mindset', 'Labels, scope, and acceptance context remain part of the delivery.'],
            ].map(([title, body]) => (
              <div key={title} className="border-t border-white/15 pt-4">
                <h3 className="font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </SectionShell>
    </main>
  );
}
