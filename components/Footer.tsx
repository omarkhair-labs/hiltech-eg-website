'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/content/site';

const footerServices = [
  { label: 'Structured Cabling', href: '/solutions/structured-cabling' },
  { label: 'Fiber Infrastructure', href: '/solutions/fiber-backbone' },
  { label: 'Data Room Readiness', href: '/solutions/data-rooms' },
  { label: 'Project Supply & RFQ', href: '/products-partners' },
];

export default function Footer() {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const isCreativePublic =
    !isArabic &&
    (pathname === '/' ||
      pathname.startsWith('/solutions') ||
      pathname.startsWith('/services') ||
      pathname.startsWith('/products-partners') ||
      pathname.startsWith('/work') ||
      pathname.startsWith('/company') ||
      pathname.startsWith('/rfq') ||
      pathname.startsWith('/contact') ||
      pathname.startsWith('/resources') ||
      pathname.startsWith('/track') ||
      pathname.startsWith('/scope-finder') ||
      pathname.startsWith('/privacy-policy') ||
      pathname.startsWith('/accessibility-statement'));

  const servicesHeading = isArabic ? 'الخدمات' : 'Services';
  const contactHeading = isArabic ? 'تواصل معنا' : 'Contact';
  const resourcesHeading = isArabic ? 'الموارد' : 'Resources';

  const servicesLinks = isArabic
    ? [
        { label: 'حلول البنية التحتية للشبكات', href: '/ar/solutions' },
        { label: 'المنتجات', href: '/ar/products-partners' },
        { label: 'أعمالنا', href: '/ar/work' },
        { label: 'الشركة', href: '/ar/company' },
      ]
    : footerServices;

  const resourcesLinks = isArabic
    ? [
        { label: 'الصفحة الرئيسية', href: '/ar' },
        { label: 'المنتجات', href: '/ar/products-partners' },
        { label: 'اطلب عرض سعر', href: '/ar/rfq' },
        { label: 'تتبع طلب العرض', href: '/ar/track' },
        { label: 'اتصل بنا', href: '/ar/contact' },
        { label: 'سياسة الخصوصية', href: '/privacy-policy' },
        { label: 'بيان إمكانية الوصول', href: '/accessibility-statement' },
        { label: 'تحميل ملف الشركة', href: 'https://raw.githubusercontent.com/omarkhair-labs/hiltech-eg-website/main/public/hiltech-company-profile.pdf' },
      ]
    : [
        { label: 'Resources Hub', href: '/resources' },
        { label: 'RFQ Preparation Guide', href: '/resources/rfq-guide' },
        { label: 'Company', href: '/company' },
        { label: 'Work', href: '/work' },
        { label: 'Track RFQ', href: '/track' },
        { label: 'Scope Finder', href: '/scope-finder' },
        { label: 'Privacy Policy', href: '/privacy-policy' },
        { label: 'Accessibility Statement', href: '/accessibility-statement' },
      ];

  if (isCreativePublic) {
    return (
      <footer className="hiltech-system-footer">
        <div className="hiltech-system-footer-shell">
          <div className="hiltech-system-footer-topline">
            <span>HILTECH / PHYSICAL LAYER</span>
            <span>CAIRO / EGYPT</span>
          </div>

          <div className="hiltech-system-footer-main">
            <div className="hiltech-system-footer-identity">
              <Link href="/" translate="no" aria-label="HILTECH home">
                <Image
                  src="/logo-dark.png"
                  alt="HILTECH logo"
                  width={152}
                  height={44}
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p>{site.officialName}</p>
              <span>BUILD → ROUTE → TEST → PROVE</span>
            </div>

            <nav aria-label="HILTECH primary footer navigation" className="hiltech-system-footer-routes">
              {[
                ['01', 'Solutions', '/solutions'],
                ['02', 'Capabilities', '/services'],
                ['03', 'Products', '/products-partners'],
                ['04', 'Work', '/work'],
                ['05', 'Company', '/company'],
              ].map(([index, label, href]) => (
                <Link key={href} href={href}>
                  <span>{index}</span>
                  <strong>{label}</strong>
                  <em aria-hidden="true">↗</em>
                </Link>
              ))}
            </nav>

            <div className="hiltech-system-footer-project">
              <span>PROJECT ENTRY</span>
              <Link href="/rfq">
                START A PROJECT
                <em aria-hidden="true">↗</em>
              </Link>
              <p>Exact references when you have them. Project context when you do not.</p>
            </div>
          </div>

          <div className="hiltech-system-footer-contact">
            <span>VERIFIED CONTACT</span>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <a href={`tel:${site.contact.phone}`}>{site.contact.phone}</a>
            <a href={site.contact.whatsappGeneralLink} target="_blank" rel="noreferrer">
              WHATSAPP {site.contact.whatsappLocal}
            </a>
            <strong>{site.contact.addressEn}</strong>
          </div>

          <div className="hiltech-system-footer-bottom">
            <div>
              <Link href="/resources">Resources</Link>
              <Link href="/track">Track RFQ</Link>
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/accessibility-statement">Accessibility</Link>
            </div>
            <p>
              Product and brand references describe technical ecosystems unless a formal relationship is explicitly verified.
            </p>
            <span>© HILTECH</span>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-950 text-slate-100">
      <div className="container grid gap-8 py-12 md:grid-cols-4 md:py-16">
        <div>
          <div translate="no" className="inline-flex rounded-xl border border-white/10 bg-white/5 px-3 py-2 shadow-sm backdrop-blur-sm">
            <Image src="/logo-dark.png" alt="HILTECH brand logo" width={152} height={44} className="h-8 w-auto object-contain" />
          </div>
          <p className="mt-2.5 text-slate-200">{site.officialName}</p>
          <p className="text-orange-400">{site.slogan}</p>
          <p className="mt-1 text-sm text-slate-400">{isArabic ? 'حلول تنفيذ وتجهيز البنية التحتية للشبكات للمشروعات داخل مصر.' : 'Network infrastructure support for business facilities in Egypt.'}</p>
          <p className="mt-3 text-sm text-slate-400">© HILTECH. All rights reserved.
            <span className="block text-xs text-slate-500" dir="rtl">حلول البنية التحتية التقنية للمشروعات داخل مصر.</span></p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-100">{servicesHeading}</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            {servicesLinks.map((service) => (
              <li key={service.label}>
                <Link className="underline decoration-slate-600 underline-offset-4 hover:text-white transition" href={service.href}>{service.label}</Link>
              </li>
            ))}
          </ul>
          <Link href={isArabic ? '/ar/rfq' : '/rfq'} className="mt-3 inline-flex rounded-md border border-orange-500/40 bg-orange-600/10 px-3 py-1.5 text-sm font-semibold text-orange-300 hover:bg-orange-600/20 transition">{isArabic ? 'اطلب عرض سعر' : 'Request Project Quote'}</Link>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-100">{contactHeading}</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            <li dir="ltr"><a className="underline decoration-slate-600 underline-offset-4 hover:text-white transition" href={`mailto:${site.contact.email}`}>{site.contact.email}</a></li>
            <li dir="ltr"><a className="underline decoration-slate-600 underline-offset-4 hover:text-white transition" href={`tel:${site.contact.phone}`}>{site.contact.phone}</a></li>
            <li dir="ltr"><a className="underline decoration-slate-600 underline-offset-4 hover:text-white transition" href={site.contact.whatsappGeneralLink}>{site.contact.whatsappIntl}</a></li>
            <li>{isArabic ? site.contact.addressAr || site.contact.addressEn : site.contact.addressEn}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-100">{resourcesHeading}</h4>
          <ul className="mt-3 space-y-1 text-sm text-slate-300">
            {resourcesLinks.map((resource) => (
              <li key={`${resource.label}-${resource.href}`}>
                <Link className="underline decoration-slate-600 underline-offset-4 hover:text-white transition" href={resource.href}>{resource.label}</Link>
              </li>
            ))}
          </ul>
          {!isArabic ? <h4 className="mt-4 font-semibold text-slate-100">Compliance</h4> : null}
          <p className="mt-2 text-xs text-slate-500" dir="rtl">جميع الإشارات التجارية والفنية لأغراض توضيح النطاق فقط.</p>
          <p className="mt-3 text-sm text-slate-400">
            {isArabic
              ? 'تُعرض مراجع العلامات والمنتجات ضمن نطاق التنفيذ الفني فقط، ولا تعني شراكة رسمية إلا إذا تم ذكر ذلك صراحة.'
              : 'Brands and product references indicate ecosystems we work with and do not imply formal partnership unless explicitly stated.'}
          </p>
          {isArabic ? (
            <Link href="/ar/track" className="mt-3 inline-flex text-sm font-semibold text-orange-400 underline hover:text-orange-300 transition">تتبع طلب العرض</Link>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
