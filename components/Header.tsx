'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type MouseEvent as ReactMouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import { readRFQItems } from '@/lib/rfq';
import SiteSearch from '@/components/SiteSearch';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { arNavigation } from '@/content/ar/navigation';
import { getLocalizedPath } from '@/lib/i18n/routes';
import { emitRouteContinuity, shouldInterceptRouteClick } from '@/lib/route-continuity';

const primaryNav = [
  ['Solutions', '/solutions', arNavigation.solutions],
  ['Products', '/products-partners', arNavigation.products],
  ['Services', '/services', arNavigation.services],
  ['Work', '/work', arNavigation.work],
  ['Contact', '/contact', arNavigation.contact],
] as const;

const creativeNav = [
  ['Solutions', '/solutions', arNavigation.solutions],
  ['Capabilities', '/services', arNavigation.services],
  ['Products', '/products-partners', arNavigation.products],
  ['Work', '/work', arNavigation.work],
  ['Company', '/company', arNavigation.company],
] as const;

const secondaryNav = [
  ['Company', '/company', arNavigation.company],
  ['Resources', '/resources', 'المصادر'],
  ['Track RFQ', '/track', arNavigation.trackRfq],
  ['Scope Finder', '/scope-finder', 'مساعد تحديد النطاق'],
] as const;

export default function Header() {
  const pathname = usePathname();
  const isArabic = pathname.startsWith('/ar');
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
  const [open, setOpen] = useState(false);
  const [showLogoImage, setShowLogoImage] = useState(true);
  const [rfqCount, setRfqCount] = useState(0);

  useEffect(() => {
    const sync = () => setRfqCount(readRFQItems().reduce((sum, item) => sum + item.quantity, 0));
    sync();
    window.addEventListener('rfq-updated', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('rfq-updated', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const localizeHref = (href: string) => getLocalizedPath(href, isArabic ? 'ar' : 'en');
  const isActive = (href: string) => {
    const target = localizeHref(href);
    return pathname === target || pathname.startsWith(`${target}/`);
  };

  const handleCreativeRoute = (
    event: ReactMouseEvent<HTMLElement>,
    href: string,
    label: string,
  ) => {
    if (!isCreativePublic || !shouldInterceptRouteClick(event)) return;

    const target = localizeHref(href);
    if (target === pathname) return;

    event.preventDefault();
    const destinationRect = event.currentTarget.getBoundingClientRect();
    const routeElements = Array.from(
      document.querySelectorAll<HTMLElement>('.hiltech-creative-header [data-route-continuity-link]'),
    );
    const visibleRouteElement = routeElements.find((element) => {
      const rect = element.getBoundingClientRect();
      return element.getAttribute('aria-current') === 'page' && rect.width > 0 && rect.height > 0;
    }) ?? routeElements.find((element) => {
      const rect = element.getBoundingClientRect();
      return element.dataset.routeContinuityLink === 'home' && rect.width > 0 && rect.height > 0;
    });
    const sourceRect = visibleRouteElement?.getBoundingClientRect() ?? destinationRect;
    setOpen(false);

    emitRouteContinuity({
      kind: 'nav',
      href: target,
      label,
      destinationKey: href === '/' ? 'home' : label.toLowerCase(),
      sourceRect: {
        left: sourceRect.left,
        top: sourceRect.top,
        width: sourceRect.width,
        height: sourceRect.height,
      },
      destinationRect: {
        left: destinationRect.left,
        top: destinationRect.top,
        width: destinationRect.width,
        height: destinationRect.height,
      },
    });
  };

  return (
    <header className={`sticky top-0 z-50 border-b backdrop-blur-xl ${isCreativePublic ? 'hiltech-creative-header border-[#8ff257]/15 bg-[#050806]/90 shadow-[0_10px_40px_rgba(0,0,0,0.34)]' : 'border-white/10 bg-slate-950/90 shadow-[0_8px_30px_rgba(2,6,23,0.28)]'}`}>
      <div className="container flex h-16 items-center justify-between gap-3">
        <Link
          href={isArabic ? '/ar' : '/'}
          translate="no"
          className="flex min-w-0 items-center gap-2 text-lg font-extrabold tracking-[0.12em] text-white"
          aria-label={isArabic ? 'العودة إلى الصفحة الرئيسية لهيلتك' : 'HILTECH home'}
          aria-current={pathname === '/' ? 'page' : undefined}
          data-route-continuity-link={isCreativePublic ? 'home' : undefined}
          onClick={isCreativePublic ? (event) => handleCreativeRoute(event, '/', 'HOME') : undefined}
        >
          {showLogoImage ? (
            <Image
              src="/logo-dark.png"
              alt="HILTECH logo"
              width={132}
              height={38}
              className="h-8 w-auto max-w-[126px] object-contain"
              onError={() => setShowLogoImage(false)}
              priority
            />
          ) : null}
          <span translate="no" className={showLogoImage ? 'sr-only' : 'text-white'}>HILTECH</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={isArabic ? 'التنقل الرئيسي' : 'Primary navigation'}>
          {(isCreativePublic ? creativeNav : primaryNav).map(([label, href, arLabel]) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={localizeHref(href)}
                translate="no"
                aria-current={active ? 'page' : undefined}
                data-route-continuity-link={isCreativePublic ? label.toLowerCase() : undefined}
                onClick={isCreativePublic ? (event) => handleCreativeRoute(event, href, label.toUpperCase()) : undefined}
                className={isCreativePublic
                  ? `hiltech-creative-nav-link ${active ? 'is-active' : ''}`
                  : `rounded-lg px-3 py-2 text-sm font-semibold transition ${active ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
                }
              >
                {isArabic ? arLabel : label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1.5 lg:flex">
          <SiteSearch className={isCreativePublic ? "hiltech-creative-utility-link" : "inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"} />
          <LanguageSwitcher className={isCreativePublic ? "hiltech-creative-utility-link" : "inline-flex min-h-10 items-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/5 hover:text-white"} />
          <Link
            href={localizeHref('/rfq')}
            aria-current={pathname.startsWith('/rfq') ? 'page' : undefined}
            data-route-continuity-link={isCreativePublic ? 'rfq' : undefined}
            onClick={isCreativePublic ? (event) => handleCreativeRoute(event, '/rfq', 'RFQ') : undefined}
            className={isCreativePublic ? "hiltech-creative-rfq-count" : "inline-flex min-h-10 items-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/25 hover:bg-white/10"}
          >
            {isArabic ? `السلة ${rfqCount}` : `RFQ ${rfqCount}`}
          </Link>
          <Link
            href={localizeHref('/rfq')}
            aria-current={pathname.startsWith('/rfq') ? 'page' : undefined}
            data-route-continuity-link={isCreativePublic ? 'rfq' : undefined}
            onClick={isCreativePublic ? (event) => handleCreativeRoute(event, '/rfq', 'RFQ') : undefined}
            className={isCreativePublic ? "hiltech-creative-project-link" : "inline-flex min-h-10 items-center rounded-lg bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(234,88,12,0.18)] transition hover:bg-orange-500"}
          >
            {isArabic ? 'ابدأ طلب السعر' : isCreativePublic ? 'Start a Project' : 'Start RFQ'}
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 lg:hidden">
          <SiteSearch
            className={isCreativePublic ? "hiltech-creative-mobile-utility" : "inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/10"}
            onNavigate={() => setOpen(false)}
          />
          <button
            type="button"
            className={isCreativePublic ? "hiltech-creative-mobile-menu-button" : "inline-flex min-h-11 items-center rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={isArabic ? 'فتح قائمة التنقل' : 'Open navigation menu'}
          >
            {isArabic ? 'القائمة' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className={isCreativePublic ? "hiltech-creative-mobile-panel lg:hidden" : "border-t border-white/10 bg-slate-950/98 lg:hidden"}>
          <div className="container max-h-[calc(100vh-4rem)] overflow-y-auto py-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            <nav aria-label={isArabic ? 'قائمة الهاتف' : 'Mobile navigation'} className="grid gap-1">
              {(isCreativePublic ? creativeNav : primaryNav).map(([label, href, arLabel]) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={localizeHref(href)}
                    aria-current={active ? 'page' : undefined}
                    data-route-continuity-link={isCreativePublic ? label.toLowerCase() : undefined}
                    onClick={isCreativePublic ? (event) => handleCreativeRoute(event, href, label.toUpperCase()) : undefined}
                    className={isCreativePublic
                      ? `hiltech-creative-mobile-nav-link ${active ? 'is-active' : ''}`
                      : `flex min-h-11 items-center rounded-xl px-4 py-2.5 text-base font-semibold transition ${active ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`
                    }
                  >
                    {isArabic ? arLabel : label}
                  </Link>
                );
              })}
            </nav>

            <div className="my-4 h-px bg-white/10" />

            <nav aria-label={isArabic ? 'روابط إضافية' : 'Secondary navigation'} className="grid grid-cols-2 gap-1">
              {(isCreativePublic
                ? [
                    ['Contact', '/contact', arNavigation.contact],
                    ['Resources', '/resources', 'المصادر'],
                    ['Track RFQ', '/track', arNavigation.trackRfq],
                    ['Scope Finder', '/scope-finder', 'مساعد تحديد النطاق'],
                  ] as const
                : secondaryNav
              ).map(([label, href, arLabel]) => (
                <Link
                  key={href}
                  href={localizeHref(href)}
                  aria-current={isActive(href) ? 'page' : undefined}
                  data-route-continuity-link={isCreativePublic ? label.toLowerCase() : undefined}
                  onClick={isCreativePublic ? (event) => handleCreativeRoute(event, href, label.toUpperCase()) : undefined}
                  className={isCreativePublic ? "hiltech-creative-mobile-secondary-link" : "flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"}
                >
                  {isArabic ? arLabel : label}
                </Link>
              ))}
              <LanguageSwitcher className={isCreativePublic ? "hiltech-creative-mobile-secondary-link" : "flex min-h-11 items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"} />
            </nav>

            <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
              <Link
                href={localizeHref('/rfq')}
                aria-current={pathname.startsWith('/rfq') ? 'page' : undefined}
                data-route-continuity-link={isCreativePublic ? 'rfq' : undefined}
                onClick={isCreativePublic ? (event) => handleCreativeRoute(event, '/rfq', 'RFQ') : undefined}
                className={isCreativePublic ? "hiltech-creative-mobile-project-link" : "inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-500"}
              >
                {isArabic ? 'ابدأ طلب عرض السعر' : isCreativePublic ? 'Start a Project' : 'Start RFQ'}
              </Link>
              <Link
                href={localizeHref('/rfq')}
                aria-current={pathname.startsWith('/rfq') ? 'page' : undefined}
                data-route-continuity-link={isCreativePublic ? 'rfq' : undefined}
                onClick={isCreativePublic ? (event) => handleCreativeRoute(event, '/rfq', 'RFQ') : undefined}
                className={isCreativePublic ? "hiltech-creative-mobile-basket-link" : "inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10"}
              >
                {isArabic ? `السلة (${rfqCount})` : `Basket (${rfqCount})`}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
