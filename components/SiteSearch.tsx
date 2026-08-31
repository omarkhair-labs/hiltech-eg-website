'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  popularSearchShortcuts,
  siteSearchIndex,
  type SearchEntry,
  type SearchType,
} from '@/lib/site-search';
import { getLocalizedPath } from '@/lib/i18n/routes';

interface SiteSearchProps {
  onNavigate?: () => void;
  className?: string;
}

export default function SiteSearch({ onNavigate, className }: SiteSearchProps) {
  const pathname = usePathname();
  const isArabic = pathname?.startsWith('/ar');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', handleEsc);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return popularSearchShortcuts;

    return siteSearchIndex
      .map((entry) => ({ entry, score: scoreEntry(entry, normalized) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .slice(0, 12)
      .map((item) => item.entry);
  }, [query]);

  const grouped = useMemo(() => {
    const order: SearchType[] = ['Products', 'Solutions', 'Services', 'Resources', 'Guides', 'Pages'];
    return order
      .map((type) => ({ type, items: results.filter((entry) => entry.type === type) }))
      .filter((group) => group.items.length > 0);
  }, [results]);

  const closeSearch = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <>
      <button
        type="button"
        className={
          className ??
          'inline-flex items-center border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700'
        }
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {isArabic ? 'بحث' : 'Search'}
      </button>

      {open ? (
        <div
          className="hiltech-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={isArabic ? 'بحث هيلتك' : 'HILTECH search'}
          dir={isArabic ? 'rtl' : 'ltr'}
          onClick={() => setOpen(false)}
        >
          <div className="hiltech-search-panel" onClick={(event) => event.stopPropagation()}>
            <div className="hiltech-search-topline">
              <span>{isArabic ? 'هيلتك / فهرس البحث' : 'HILTECH / SEARCH INDEX'}</span>
              <span>{query.trim() ? results.length + ' MATCHES' : 'PUBLIC SYSTEM'}</span>
              <button type="button" onClick={() => setOpen(false)}>
                {isArabic ? 'إغلاق' : 'CLOSE'} <b aria-hidden="true">×</b>
              </button>
            </div>

            <label className="hiltech-search-query">
              <span>{isArabic ? 'الاستعلام' : 'QUERY / PRODUCT / SYSTEM / RFQ'}</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={
                  isArabic
                    ? 'ابحث بالكود، المنتج، الحل، أو طلب عرض السعر...'
                    : 'TYPE A CODE, PRODUCT, SYSTEM, OR PROJECT ROUTE...'
                }
                autoComplete="off"
              />
              <small>
                {query.trim()
                  ? isArabic
                    ? results.length + ' نتيجة حالية'
                    : results.length + ' CURRENT MATCHES'
                  : isArabic
                    ? 'ابدأ من مسار شائع أو اكتب ما تبحث عنه.'
                    : 'START FROM A COMMON ROUTE OR TYPE WHAT YOU ALREADY KNOW.'}
              </small>
            </label>

            <div className="hiltech-search-results">
              {grouped.length === 0 ? (
                <div className="hiltech-search-empty">
                  <span>00 / NO MATCH</span>
                  <strong>{isArabic ? 'لا يوجد مسار مطابق.' : 'NO CURRENT ROUTE MATCHES THIS QUERY.'}</strong>
                  <p>
                    {isArabic
                      ? 'جرّب كود منتج، اسم نظام، أو ابدأ من المنتجات وطلب عرض السعر.'
                      : 'Try a product code, system name, or enter through Products / RFQ.'}
                  </p>
                </div>
              ) : (
                grouped.map((group, groupIndex) => (
                  <section key={group.type} className="hiltech-search-group">
                    <header>
                      <span>{String(groupIndex + 1).padStart(2, '0')}</span>
                      <strong>{getTypeLabel(group.type, Boolean(isArabic))}</strong>
                      <small>{group.items.length} / INDEX</small>
                    </header>

                    <div>
                      {group.items.map((item, index) => (
                        <Link
                          key={group.type + '-' + item.title + '-' + item.href}
                          href={getLocalizedHref(item.href, Boolean(isArabic))}
                          onClick={closeSearch}
                          className="hiltech-search-result"
                        >
                          <span>{String(index + 1).padStart(2, '0')}</span>
                          <div>
                            <strong>
                              {Boolean(isArabic) ? getArabicPageTitle(item.title) : item.title}
                            </strong>
                            <p>
                              {Boolean(isArabic)
                                ? getArabicPageDescription(item)
                                : item.description}
                            </p>
                          </div>
                          <small>{getTypeLabel(item.type, Boolean(isArabic))}</small>
                          <em>
                            {getLocalizedHref(item.href, Boolean(isArabic))} <b aria-hidden="true">↗</b>
                          </em>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))
              )}
            </div>

            <div className="hiltech-search-endplate">
              <span>{isArabic ? 'ESC / إغلاق' : 'ESC / CLOSE'}</span>
              <p>
                {isArabic
                  ? 'للبحث الدقيق عن المنتجات استخدم الكود أو المواصفة. للتخطيط ابدأ من النظام أو نطاق المشروع.'
                  : 'KNOWN REFERENCE → SEARCH THE CODE. KNOWN SYSTEM → OPEN THE SYSTEM. KNOWN PROJECT → START THE RFQ.'}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function scoreEntry(entry: SearchEntry, normalizedQuery: string): number {
  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const keywords = entry.keywords.map((keyword) => keyword.toLowerCase());

  if (title === normalizedQuery) return 100;
  if (title.startsWith(normalizedQuery)) return 80;
  if (title.includes(normalizedQuery)) return 65;
  if (keywords.some((keyword) => keyword === normalizedQuery)) return 50;
  if (keywords.some((keyword) => keyword.includes(normalizedQuery))) return 35;
  if (description.includes(normalizedQuery)) return 20;
  if (entry.type.toLowerCase().includes(normalizedQuery)) return 10;
  return 0;
}

const arabicTypeLabels: Record<SearchType, string> = {
  Products: 'المنتجات',
  Solutions: 'الحلول',
  Services: 'الخدمات',
  Resources: 'الموارد',
  Guides: 'الأدلة',
  Pages: 'الصفحات',
};

const arabicPageTitleMap: Record<string, string> = {
  Home: 'الرئيسية',
  'Products & Partners': 'المنتجات',
  'Start RFQ': 'طلب عرض سعر',
  'Track RFQ': 'تتبع طلب العرض',
  Company: 'الشركة',
  Contact: 'تواصل معنا',
  'Field Work & References': 'أعمالنا',
  Services: 'الخدمات',
  Solutions: 'الحلول',
  'Browse Products': 'المنتجات',
};

const arabicPageDescriptionMap: Record<string, string> = {
  Home: 'الصفحة الرئيسية مع نبذة عن قدرات هيلتك وروابط سريعة.',
  'Products & Partners': 'تصفح المنتجات والعلامات التجارية وأضف العناصر إلى سلة طلب عرض السعر.',
  Solutions: 'حلول بنية تحتية موجهة لنتائج الأعمال.',
  Services: 'خدمات التنفيذ والتركيب والاختبار الميداني للبنية التحتية.',
  'Field Work & References': 'مراجع أعمال ميدانية وصور تنفيذ المشاريع.',
  Company: 'تعرف على الشركة وخبراتها ومجالات العمل.',
  Contact: 'تواصل معنا للتخطيط للمشروعات والدعم.',
  'Start RFQ': 'ابدأ طلب عرض السعر وأرسل متطلبات المشروع.',
  'Track RFQ': 'تابع حالة طلب عرض السعر المرسل.',
};

function getTypeLabel(type: SearchType, isArabic: boolean): string {
  return isArabic ? arabicTypeLabels[type] : type;
}

function getLocalizedHref(href: string, isArabic: boolean): string {
  return isArabic ? getLocalizedPath(href, 'ar') : getLocalizedPath(href, 'en');
}

function getArabicPageTitle(title: string): string {
  return arabicPageTitleMap[title] || title;
}

function getArabicPageDescription(item: SearchEntry): string {
  return arabicPageDescriptionMap[item.title] || item.description;
}
