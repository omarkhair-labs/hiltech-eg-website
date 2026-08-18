import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { SectionShell } from '@/components/ui/primitives';
import { arWorkContent } from '@/content/ar/work';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'أعمال ميدانية ودليل تنفيذ البنية التحتية',
  description: 'أعمال HILTECH الميدانية في تجهيز الراك والكابلات المنظمة والفايبر والاختبار قبل التسليم.',
  alternates: { canonical: `${site.siteUrl}/ar/work`, languages: { en: `${site.siteUrl}/work`, ar: `${site.siteUrl}/ar/work`, 'x-default': `${site.siteUrl}/` } },
};

export default function Page() {
  const proofCards = arWorkContent.cards.slice(0, 4);
  const [lead, ...supporting] = proofCards;

  return (
    <main dir="rtl" className="bg-slate-950 text-white">
      <SectionShell>
        <section className="grid gap-8 border-b border-white/10 pb-10 pt-2 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:pb-12">
          <div>
            <p className="public-eyebrow text-orange-300">إثبات الأعمال الميدانية</p>
            <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.025em] sm:text-5xl">شاهد سياق التنفيذ نفسه — بدل الاعتماد على عبارات عامة.</h1>
          </div>
          <div className="lg:pb-1">
            <p className="max-w-xl text-base leading-7 text-slate-300">{arWorkContent.supporting}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/ar/rfq" className="btn-primary min-h-11 px-5 py-2.5 text-sm">أرسل متطلبات المشروع</Link>
              <Link href="/ar/contact" className="inline-flex min-h-11 items-center px-2 text-sm font-semibold text-slate-400 transition hover:text-white">ناقش المشروع ←</Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
          <article id="rack-data-room" className="group relative min-h-[430px] overflow-hidden rounded-[1.5rem] border border-white/10 lg:col-span-7 lg:row-span-2 lg:min-h-[650px]">
            <Image src={lead.image} alt={lead.alt} fill priority sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <span className="inline-flex rounded-full border border-white/20 bg-slate-950/65 px-3 py-1 text-xs font-bold text-orange-200 backdrop-blur">{lead.label}</span>
              <h2 className="mt-3 text-2xl font-black sm:text-3xl">{lead.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-200">{lead.scope}</p>
              <p className="mt-2 max-w-xl text-sm font-semibold text-white">{lead.confidence}</p>
            </div>
          </article>

          {supporting.slice(0, 2).map((card, index) => (
            <article id={index === 1 ? 'fiber-odf' : 'structured-cabling'} key={card.title} className="group relative min-h-[310px] overflow-hidden rounded-[1.5rem] border border-white/10 lg:col-span-5">
              <Image src={card.image} alt={card.alt} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-bold text-orange-200">{card.label}</p>
                <h2 className="mt-2 text-xl font-bold">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">{card.scope}</p>
              </div>
            </article>
          ))}
        </section>

        <section id="testing-handover" className="mt-4 grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900/55 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="relative min-h-[320px] lg:min-h-[430px]">
            <Image src={supporting[2].image} alt={supporting[2].alt} fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-slate-950/15" />
          </div>
          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            <p className="public-eyebrow text-orange-300">{supporting[2].label}</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em]">{supporting[2].title}</h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">{supporting[2].scope}</p>
            <p className="mt-3 text-sm font-semibold text-white">{supporting[2].confidence}</p>
          </div>
        </section>

        <section className="mt-12 border-y border-white/10 py-8 sm:py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['وضوح المسارات', 'مسارات منظمة يمكن تتبعها وصيانتها بسهولة.'],
              ['تنظيم الراك', 'باتش وهاردوير مرتبان مع مراعاة سهولة الوصول الفني.'],
              ['التحقق', 'سياق الاختبار يدخل ضمن التسليم قبل التشغيل.'],
              ['عقلية التوثيق', 'التسمية والنطاق ومعايير القبول تظل جزءًا من عملية التسليم.'],
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
