import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'HILTECH | حلول الشبكات والفايبر وطلبات عروض الأسعار في مصر',
  description: 'توريد وتنفيذ واختبار حلول الشبكات والفايبر والراك للشركات في مصر، مع طلب عرض سعر وتتبع حالة الطلب.',
  alternates: { canonical: `${site.siteUrl}/ar`, languages: { en: `${site.siteUrl}/`, ar: `${site.siteUrl}/ar`, 'x-default': `${site.siteUrl}/` } },
};

const capabilities = ['فايبر أوبتك', 'كابلات منظمة', 'تجهيز الراك', 'اختبار قبل التسليم'];
const services = ['تمديد ولحام الفايبر', 'تركيب وتنظيم الراك', 'تمديد الكابلات النحاسية', 'تصميم ومعاينة الموقع', 'اختبارات الشبكات', 'إدارة مشاريع الشبكات'];
const productCategories = [
  { label: 'فايبر أوبتك', category: 'Fiber Optic Systems' },
  { label: 'كابلات CAT6', category: 'Copper / CAT6 Cabling' },
  { label: 'باتش كورد وربط', category: 'Patch Cords & Connectivity' },
  { label: 'راك وكبائن', category: 'Cabinets / Racks / PDU' },
  { label: 'CCTV والبنية الأمنية', category: 'CCTV & Security' },
  { label: 'ملحقات الشبكات', category: 'Cable Management / Duct Systems' },
];
const scopeStarters = [
  { title: 'تجهيز شبكة مكتب', items: ['كابلات CAT6', 'باتش بانل', 'فيس بليت', 'ملحقات الراك', 'الاختبار'] },
  { title: 'تجهيز راك وغرفة بيانات', items: ['راك', 'PDU', 'تنظيم الكابلات', 'باتش بانل', 'التسمية والاختبار'] },
  { title: 'نطاق فايبر وODF', items: ['كابل فايبر', 'ODF', 'باتش كورد', 'اللحام والاختبار'] },
  { title: 'بنية تحتية للكاميرات', items: ['نقاط شبكة', 'كابلات', 'تجهيز الراك', 'جاهزية الطاقة والشبكة'] },
];
const proof = [
  { value: 'Fiber + Copper', label: 'ربط شبكي أساسي' },
  { value: 'معاينة ← تسليم', label: 'مسار تنفيذ المشروع' },
  { value: 'RFQ جاهز', label: 'طلب عدة منتجات' },
  { value: 'Fluke + OTDR', label: 'مسارات الاختبار' },
];

export default function ArabicHomePage() {
  return (
    <main dir="rtl" className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <section className="relative min-h-screen overflow-hidden py-12 sm:py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-orange-500/20 blur-3xl opacity-40" />
          <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl opacity-30" />
        </div>
        <div className="container relative z-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-8">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">حلول البنية التحتية للشبكات في مصر</p>
                <h1 className="text-balance text-4xl font-black leading-tight sm:text-5xl md:text-6xl">حلول شبكات وفايبر وراك جاهزة للتنفيذ والتسعير</h1>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base">تساعد HILTECH الشركات في مصر على تجهيز البنية التحتية للشبكات، من تحديد النطاق واختيار المنتجات إلى التنفيذ والاختبار وطلب عرض السعر.</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link href="/ar/rfq" className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-orange-700">اطلب عرض سعر</Link>
                <Link href="/ar/products-partners" className="inline-flex items-center justify-center rounded-md border border-white/30 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/10">تصفح المنتجات</Link>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {capabilities.map((cap) => <span key={cap} className="rounded-full border border-orange-500/40 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-200">{cap}</span>)}
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl">
              <div className="mb-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-center"><p className="text-lg font-bold text-orange-300 sm:text-xl">Fiber + Copper</p><p className="mt-1 text-xs font-semibold text-slate-300">ربط منظم</p></div>
                <div className="rounded-xl border border-white/20 bg-white/5 p-4 text-center"><p className="text-lg font-bold text-orange-300 sm:text-xl">RFQ جاهز</p><p className="mt-1 text-xs font-semibold text-slate-300">توريد للمشروعات</p></div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image src="/rack-data-room.jpg" alt="أنظمة شبكات للمؤسسات" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4"><p className="font-semibold">أنظمة شبكات للمؤسسات</p><p className="mt-1 text-xs text-slate-300">تصميم • تنفيذ • اختبار • تسليم</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-20"><div className="container"><div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-xl sm:p-8"><p className="text-xs font-bold uppercase tracking-widest text-orange-400">تصفح سريع للمنتجات</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">اختار التصنيف وابدأ طلب عرض السعر</h2><div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">{productCategories.map((category) => <Link key={category.label} href={`/ar/products-partners?category=${encodeURIComponent(category.category)}`} className="rounded-lg border border-white/20 bg-white/5 p-3 text-center text-xs font-semibold text-slate-200 transition hover:border-orange-500/50 hover:bg-white/10 sm:text-sm">{category.label}</Link>)}</div></div></div></section>

      <section className="py-16"><div className="container space-y-8"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">الخدمات</p><h2 className="text-3xl font-bold sm:text-4xl">خدمات وحلول HILTECH</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <div key={service} className="rounded-xl border border-white/15 bg-white/5 p-6"><div className="mb-4 h-3 w-3 rounded-full bg-orange-500" /><h3 className="text-sm font-semibold">{service}</h3></div>)}</div></div></section>

      <section className="py-16"><div className="container space-y-8"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">نطاقات المشروعات</p><h2 className="text-3xl font-bold sm:text-4xl">جهّز نطاق مشروع كامل</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{scopeStarters.map((scope) => <div key={scope.title} className="rounded-xl border border-white/15 bg-white/5 p-5"><h3 className="font-semibold">{scope.title}</h3><ul className="mt-4 space-y-2">{scope.items.map((item) => <li key={item} className="text-xs text-slate-300">• {item}</li>)}</ul></div>)}</div></div></section>

      <section className="py-16"><div className="container"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{proof.map((item) => <div key={item.label} className="rounded-xl border border-white/15 bg-white/5 p-8 text-center"><p className="text-xl font-black text-orange-400 sm:text-2xl">{item.value}</p><p className="mt-3 text-sm font-semibold text-slate-300">{item.label}</p></div>)}</div></div></section>

      <section className="py-16"><div className="container space-y-8"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-orange-400">الجودة</p><h2 className="text-3xl font-bold sm:text-4xl">مسارات الاختبار والتحقق</h2></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{['Fluke Test', 'OTDR', 'Power Meter', 'Digital Copper Tester'].map((tool) => <div key={tool} className="rounded-xl border border-white/15 bg-white/5 p-6 text-center"><div className="mx-auto mb-3 h-8 w-2 rounded bg-orange-500" /><p className="text-sm font-semibold">{tool}</p></div>)}</div></div></section>

      <section className="py-16"><div className="container"><div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-r from-orange-600/20 to-orange-500/10 p-8 sm:p-12"><h2 className="text-3xl font-bold sm:text-4xl">جاهز لتسعير مشروع البنية التحتية؟</h2><p className="mt-4 max-w-2xl text-slate-200">أرسل المنتجات والكميات أو BOQ أو متطلبات الموقع، وسيقوم فريق HILTECH بمراجعة النطاق ومتابعة عرض السعر.</p><div className="mt-6 flex flex-col gap-3 sm:flex-row"><Link href="/ar/rfq" className="inline-flex items-center justify-center rounded-md bg-orange-600 px-6 py-3 font-semibold hover:bg-orange-700">اطلب عرض سعر</Link><a href={site.contact.whatsappGeneralLink} className="inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">تواصل عبر واتساب</a></div></div></div></section>
    </main>
  );
}
