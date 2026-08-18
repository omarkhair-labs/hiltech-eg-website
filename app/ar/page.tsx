import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const deliveryPillars = [
  ['01', 'الكابلات المنظمة', 'مسارات نحاسية، مخارج، باتش بانل، تنظيم الراك وتجهيز نقاط الشبكة للمواقع التجارية.'],
  ['02', 'البنية التحتية للفايبر', 'تجهيز الـBackbone والـODF والباتش كورد وسياق اللحام والاختبارات البصرية.'],
  ['03', 'تجهيز غرف البيانات', 'الراك وPDU والباتش بانل ومسارات الكابلات والتسمية وسهولة الصيانة كنطاق واحد.'],
  ['04', 'توريد المشروع وRFQ', 'اختار المنتج المحدد والكميات، ابعت طلبًا واحدًا منظمًا، وتابع حالته بعد الإرسال.'],
] as const;

const fieldWork = [
  { title: 'تجهيز الراك وغرفة البيانات', description: 'تنظيم الباتش ومسارات قابلة للصيانة.', image: '/rack-front-cabling.jpg', href: '/ar/work#rack-data-room' },
  { title: 'أعمال الفايبر وODF', description: 'سياق توزيع وإنهاء الـBackbone.', image: '/fiber-distribution-panel.jpg', href: '/ar/work#fiber-odf' },
  { title: 'الاختبار قبل التسليم', description: 'مسارات تحقق باستخدام أدوات الاختبار الميداني.', image: '/testing-otdr-device.jpg', href: '/ar/work#testing-handover' },
];

const catalogCategories = [
  { label: 'فايبر أوبتك', category: 'Fiber Optic Systems' },
  { label: 'كابلات CAT6', category: 'Copper / CAT6 Cabling' },
  { label: 'باتش كورد', category: 'Patch Cords & Connectivity' },
  { label: 'RJ45 وفيس بليت', category: 'Faceplates / Keystone / RJ45' },
  { label: 'راك وPDU', category: 'Cabinets / Racks / PDU' },
];

const deliveryPrinciples = [
  ['النطاق أولًا', 'تحديد المسار والكميات والواجهات ومتطلبات التسليم قبل تثبيت عرض السعر النهائي.'],
  ['التوفر يتم تأكيده', 'توفر المنتجات والمواصفات النهائية يتم مراجعتها داخل RFQ بدل عرض معلومات غير مؤكدة.'],
  ['التنفيذ يراعي الاختبار', 'التسمية والوصول والاختبار والصيانة المستقبلية تدخل في قرار التنفيذ من البداية.'],
] as const;

export default function ArabicHomePage() {
  return (
    <main dir="rtl" className="bg-slate-950 text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="container relative grid min-h-[calc(100svh-4rem)] items-center gap-10 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
          <div className="max-w-2xl">
            <p className="public-eyebrow text-orange-300">البنية التحتية للشبكات في مصر</p>
            <h1 className="mt-4 text-balance text-4xl font-black leading-[1.08] tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              بنية تحتية مناسبة للموقع — ومسار واضح من النطاق إلى طلب السعر.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              HILTECH تدعم الكابلات المنظمة والفايبر وتجهيز غرف البيانات والاختبار وتوريد المشروعات من خلال مسار واحد واضح يبدأ بتحديد الاحتياج وينتهي بـRFQ منظم.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/ar/products-partners" className="btn-primary min-h-12 px-6 py-3 text-sm shadow-[0_14px_35px_rgba(234,88,12,0.2)]">تصفح المنتجات</Link>
              <Link href="/ar/work" className="btn-secondary min-h-12 px-6 py-3 text-sm">شاهد أعمال التنفيذ</Link>
            </div>
            <Link href="/ar/track" className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-slate-400 underline decoration-white/20 underline-offset-4 transition hover:text-white">
              أرسلت طلبًا بالفعل؟ تابع RFQ ←
            </Link>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-slate-400">
              <span><strong className="text-slate-100">Fiber + Copper</strong> للربط</span>
              <span><strong className="text-slate-100">RFQ</strong> لعدة منتجات</span>
              <span><strong className="text-slate-100">Fluke + OTDR</strong> ضمن سياق الاختبار</span>
            </div>
          </div>

          <div className="relative lg:pr-6">
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-900 shadow-[0_32px_90px_rgba(2,6,23,0.55)]">
              <div className="relative aspect-[4/3] min-h-[320px] sm:min-h-[430px]">
                <Image src="/rack-data-room.jpg" alt="راك منظم وبنية تحتية لغرفة بيانات" fill priority sizes="(max-width: 1024px) 100vw, 48vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="public-eyebrow text-orange-300">سياق التنفيذ</p>
                  <p className="mt-2 max-w-md text-lg font-bold sm:text-xl">التصميم والتنفيذ والاختبار والتسليم أجزاء من مسار بنية تحتية واحد.</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-2 rounded-xl border border-white/15 bg-slate-950/95 px-4 py-3 shadow-xl backdrop-blur sm:right-2">
              <p className="text-xs font-semibold text-slate-500">المسار الأساسي</p>
              <p className="mt-1 text-sm font-bold">حدد المنتجات ← جهّز RFQ واحد</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 py-14 sm:py-16">
        <div className="container grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
          <div>
            <p className="public-eyebrow text-orange-300">ماذا تقدم HILTECH؟</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">أربع مراحل في رحلة مشروع واحدة.</h2>
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">تنظيم الموقع مبني على ما يحتاج العميل أو مسؤول المشروع لعمله بعد ذلك، وليس على قائمة خدمات منفصلة وطويلة.</p>
            <Link href="/ar/solutions" className="mt-5 inline-flex min-h-10 items-center text-sm font-bold text-orange-300 hover:text-orange-200">استكشف الحلول ←</Link>
          </div>
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {deliveryPillars.map(([number, title, body]) => (
              <article key={number} className="border-t border-white/15 pt-4">
                <div className="flex items-start gap-4"><span className="text-xs font-black tracking-[0.18em] text-orange-400">{number}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="public-eyebrow text-orange-300">أعمال التنفيذ</p><h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">شاهد سياق التنفيذ بدل الاكتفاء بالكلام.</h2></div>
            <Link href="/ar/work" className="inline-flex min-h-11 items-center text-sm font-bold text-slate-300 hover:text-white">شاهد كل الأعمال ←</Link>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
            <Link href={fieldWork[0].href} className="group relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-7 lg:row-span-2 lg:min-h-[560px]">
              <Image src={fieldWork[0].image} alt={fieldWork[0].title} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7"><h3 className="text-xl font-bold sm:text-2xl">{fieldWork[0].title}</h3><p className="mt-2 text-sm text-slate-300">{fieldWork[0].description}</p></div>
            </Link>
            {fieldWork.slice(1).map((item) => (
              <Link key={item.title} href={item.href} className="group relative min-h-[270px] overflow-hidden rounded-2xl border border-white/10 lg:col-span-5">
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5"><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-1 text-sm text-slate-300">{item.description}</p></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/45 py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-14">
          <div>
            <p className="public-eyebrow text-orange-300">الكتالوج ← RFQ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">حوّل البحث عن المنتجات إلى طلب واحد منظم.</h2>
            <p className="mt-4 max-w-lg text-base leading-7 text-slate-400">ابحث في الكتالوج الحالي، اختار الموديلات والكميات، ثم أرسل الاحتياج كله مرة واحدة بدل شرح كل منتج في رسالة منفصلة.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {catalogCategories.map((item) => <Link key={item.category} href={`/ar/products-partners?category=${encodeURIComponent(item.category)}`} className="inline-flex min-h-10 items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:border-orange-400/40 hover:bg-orange-500/10 hover:text-orange-200">{item.label}</Link>)}
            </div>
            <Link href="/ar/products-partners" className="btn-primary mt-7 min-h-12 px-6 py-3 text-sm">تصفح الكتالوج الحالي</Link>
          </div>
          <ol className="grid gap-3">
            {[
              ['01', 'ابحث وفلتر', 'وصل للموديل أو البراند أو الفئة المحددة من غير تصفح كتالوج عام طويل.'],
              ['02', 'جهّز السلة', 'أضف أكثر من منتج وكمياته إلى سلة RFQ واحدة أثناء التصفح.'],
              ['03', 'أرسل وتابع', 'أرسل الاحتياج مرة واحدة واحصل على مرجع واستخدم مسار التتبع للمتابعة.'],
            ].map(([number, title, body]) => <li key={number} className="grid grid-cols-[auto_1fr] gap-4 rounded-2xl border border-white/10 bg-slate-950/55 p-5 sm:p-6"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 text-xs font-black text-orange-300 ring-1 ring-orange-400/30">{number}</span><div><h3 className="text-lg font-bold">{title}</h3><p className="mt-1.5 text-sm leading-6 text-slate-400">{body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[440px]">
            <Image src="/testing-field-device.jpg" alt="مسار اختبار البنية التحتية للشبكات" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tl from-slate-950/80 via-transparent to-orange-500/10" />
          </div>
          <div>
            <p className="public-eyebrow text-orange-300">انضباط التنفيذ</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">واجهة أهدأ لأن مسار العمل أوضح.</h2>
            <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
              {deliveryPrinciples.map(([title, body]) => <div key={title} className="py-5"><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-400">{body}</p></div>)}
            </div>
            <Link href="/ar/services" className="mt-5 inline-flex min-h-10 items-center text-sm font-bold text-orange-300 hover:text-orange-200">شاهد خدمات التنفيذ ←</Link>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-orange-400/25 bg-[linear-gradient(235deg,rgba(234,88,12,0.2),rgba(15,23,42,0.8)_48%,rgba(2,6,23,0.95))] p-7 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
            <div className="relative grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
              <div><p className="public-eyebrow text-orange-200">ابدأ عندما يكتمل النطاق</p><h2 className="mt-3 max-w-3xl text-3xl font-black tracking-[-0.025em] sm:text-4xl">أرسل متطلبات المشروع مرة واحدة وحافظ على مسار التسعير منظمًا.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">أضف المنتجات والكميات أو BOQ أو ملاحظات الموقع، وسيتم مراجعة المتطلبات والمتابعة من خلال مسار RFQ.</p></div>
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col"><Link href="/ar/rfq" className="btn-primary min-h-12 px-6 py-3 text-sm">أرسل متطلبات المشروع</Link><Link href="/ar/contact" className="inline-flex min-h-11 items-center justify-center px-4 py-2 text-sm font-semibold text-slate-300 transition hover:text-white">تواصل مع HILTECH</Link></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
