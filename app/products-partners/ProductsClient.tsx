'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import ProductWorldScene from '@/components/products/ProductWorldScene';
import { PRODUCT_ROUTE_TRANSITION_EVENT } from '@/components/products/ProductRouteTransition';
import { productIntelligenceCategories, productIntelligenceSlugByCategory } from '@/content/product-intelligence';
import { productVisuals } from '@/content/product-visuals';
import { productCategories, products as staticProducts, type ProductCategory, type ProductItem } from '@/content/products';
import { projectBundles } from '@/content/project-bundles';
import { getBestMatchingBundleForBasket, getCompanionRecommendationsForProduct, getMissingBundleRequirements, getProjectBundleById, getSuggestedProductsForMissingRequirements } from '@/lib/project-bundles';
import { trackEvent } from '@/lib/client/analytics';
import { productDetailPath } from '@/lib/products/product-code';
import { getRFQWhatsappLink, normalizeRFQItem, normalizeRFQQuantity, readRFQItems, writeRFQItems, type RFQItem } from '@/lib/rfq';

const INITIAL_VISIBLE = 12;
const LOAD_MORE_STEP = 12;

const ARABIC_ALIAS_MAP: Record<string, string[]> = {
  'كابلات': ['cable', 'cables', 'cat6', 'copper'],
  'فايبر': ['fiber', 'optic', 'om3', 'os2'],
  'راكات': ['rack', 'cabinet', 'pdu'],
  'كاميرات': ['cctv', 'camera', 'security'],
  'ألياف': ['fiber', 'optic'],
  'شبكة': ['network', 'connectivity', 'switching'],
};

const familyByCategory: Record<ProductCategory, {
  family: 'fiber' | 'copper' | 'connectivity' | 'access' | 'rack' | 'pathways' | 'cctv';
  code: string;
  title: string;
  statement: string;
  route: string;
  description: string;
}> = {
  'Fiber Optic Systems': {
    family: 'fiber',
    code: 'OPTICAL / 01',
    title: 'FIBER',
    statement: 'LIGHT THROUGH A CONTROLLED PHYSICAL PATH.',
    route: 'CABLE → ODF → CONNECTOR → TRACE',
    description: 'Backbone cable, ODF, patching, couplers, pigtails, and termination references for optical infrastructure.',
  },
  'Copper / CAT6 Cabling': {
    family: 'copper',
    code: 'COPPER / 02',
    title: 'COPPER',
    statement: 'THE HORIZONTAL LINK STARTS INSIDE THE CABLE.',
    route: 'PAIR → CABLE → TERMINATE → TEST',
    description: 'CAT6/CAT6A horizontal cabling references for office floors, endpoints, and structured network routes.',
  },
  'Patch Cords & Connectivity': {
    family: 'connectivity',
    code: 'PATCH / 03',
    title: 'CONNECTIVITY',
    statement: 'THE SYSTEM CHANGES AT THE CONNECTION.',
    route: 'PORT → PATCH → EQUIPMENT',
    description: 'Copper and fiber patching references that connect panels, switches, servers, and active equipment.',
  },
  'Faceplates / Keystone / RJ45': {
    family: 'access',
    code: 'ACCESS / 04',
    title: 'ENDPOINTS',
    statement: 'THE NETWORK BECOMES PHYSICAL AT THE USER EDGE.',
    route: 'BOX → MODULE → OUTLET → DEVICE',
    description: 'Faceplates, keystones, sockets, plugs, and endpoint termination components.',
  },
  'Cabinets / Racks / PDU': {
    family: 'rack',
    code: 'RACK / 05',
    title: 'RACK + POWER',
    statement: 'EQUIPMENT NEEDS A MAINTAINABLE PHYSICAL HOME.',
    route: 'ENCLOSURE → POWER → PATCH → ACCESS',
    description: 'Cabinets, rack power, PDU, and supporting references for data rooms and technical spaces.',
  },
  'Cable Management / Duct Systems': {
    family: 'pathways',
    code: 'PATH / 06',
    title: 'PATHWAYS',
    statement: 'A CLEAN ROUTE IS PART OF THE SYSTEM.',
    route: 'PATH → BEND → SEPARATE → ACCESS',
    description: 'Duct, trunking, routing accessories, and physical pathway references for protected, maintainable runs.',
  },
  'CCTV & Security': {
    family: 'cctv',
    code: 'SECURITY / 07',
    title: 'CCTV',
    statement: 'COVERAGE DEPENDS ON THE INFRASTRUCTURE BEHIND THE CAMERA.',
    route: 'CAMERA → LINK → CONTROL → REVIEW',
    description: 'Camera, connectivity, cabling, and control-room infrastructure references for surveillance readiness.',
  },
};

const allSystemsWorld = {
  family: 'all' as const,
  code: 'SYSTEM / 00',
  title: 'ALL SYSTEMS',
  statement: 'THE PHYSICAL LAYER IS ONE CONNECTED SYSTEM OF PARTS.',
  route: 'PATH → CONNECT → ORGANIZE → POWER → PROVE',
  description: 'Live catalog families converge into one project infrastructure path before the exact reference is selected.',
};

const visualsByProductId = new Map(productVisuals.map((visual) => [visual.productId, visual]));

function expandQuery(rawQuery: string) {
  const normalized = rawQuery.trim().toLowerCase();
  if (!normalized) return [];
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const expanded = new Set(tokens);
  for (const token of tokens) (ARABIC_ALIAS_MAP[token] || []).forEach((alias) => expanded.add(alias));
  return Array.from(expanded);
}

function toRFQItem(item: ProductItem): RFQItem {
  return normalizeRFQItem({
    id: item.id,
    name: item.name,
    category: item.category,
    brand: item.brand,
    specs: item.shortSpecs,
    quantity: 1,
    priceNote: item.priceNote,
  });
}

function ProductIndexVisual({ item }: { item: ProductItem }) {
  const visual = visualsByProductId.get(item.id);
  const src = item.image || visual?.imagePath;
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="hiltech-product-index-media is-fallback">
        <span>REFERENCE</span>
        <strong>{item.category}</strong>
      </div>
    );
  }

  return (
    <div className="hiltech-product-index-media">
      <Image
        src={src}
        alt={visual?.alt || item.name}
        fill
        sizes="(max-width: 700px) 28vw, 12vw"
        className="object-contain"
        onError={() => setBroken(true)}
      />
      <span>ILLUSTRATIVE VISUAL</span>
    </div>
  );
}

export default function ProductsClient({
  initialProducts = staticProducts,
  locale = 'en',
  messages,
  rfqHref = '/rfq',
  productsHref = '/products-partners',
}: {
  initialProducts?: ProductItem[];
  locale?: 'en' | 'ar';
  messages?: any;
  rfqHref?: string;
  productsHref?: string;
}) {
  const t = messages;
  const isArabic = locale === 'ar';
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const gridRef = useRef<HTMLElement>(null);

  const [items, setItems] = useState<RFQItem[]>([]);
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState<string | null>(null);
  const [activeCompanionProductId, setActiveCompanionProductId] = useState<string | null>(null);
  const [highlightedProductId, setHighlightedProductId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'All' | ProductCategory>('All');
  const [activeBrand, setActiveBrand] = useState('All');
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const [catalogMode, setCatalogMode] = useState<'browse' | 'project'>('browse');
  const [addedStarterBundles, setAddedStarterBundles] = useState<string[]>([]);
  const [worldTransitioning, setWorldTransitioning] = useState(false);

  useEffect(() => setItems(readRFQItems()), []);
  useEffect(() => writeRFQItems(items), [items]);

  const count = useMemo(() => items.reduce((sum, item) => sum + normalizeRFQQuantity(item.quantity), 0), [items]);
  const productBrands = useMemo(
    () => Array.from(new Set(initialProducts.map((item) => item.brand))).filter(Boolean).sort((a, b) => a.localeCompare(b)),
    [initialProducts],
  );
  const categoryStats = useMemo(
    () =>
      productCategories
        .map((category) => {
          const products = initialProducts.filter((item) => item.category === category);
          return {
            category,
            count: products.length,
            brands: Array.from(new Set(products.map((item) => item.brand))).filter(Boolean),
            ...familyByCategory[category],
          };
        })
        .filter((entry) => entry.count > 0),
    [initialProducts],
  );

  const currentWorld = activeCategory === 'All' ? allSystemsWorld : familyByCategory[activeCategory];
  const currentWorldStats =
    activeCategory === 'All'
      ? { count: initialProducts.length, brands: productBrands }
      : categoryStats.find((entry) => entry.category === activeCategory)!;

  const categoryFiltered = useMemo(
    () => (activeCategory === 'All' ? initialProducts : initialProducts.filter((item) => item.category === activeCategory)),
    [activeCategory, initialProducts],
  );
  const brandFiltered = useMemo(
    () => (activeBrand === 'All' ? categoryFiltered : categoryFiltered.filter((item) => item.brand === activeBrand)),
    [activeBrand, categoryFiltered],
  );
  const queryTokens = useMemo(() => expandQuery(query), [query]);
  const filteredProducts = useMemo(() => {
    if (!queryTokens.length) return brandFiltered;
    return brandFiltered.filter((item) => {
      const haystack = [item.id, item.name, item.brand, item.category, item.shortSpecs, item.useCase].join(' ').toLowerCase();
      return queryTokens.every((token) => haystack.includes(token));
    });
  }, [brandFiltered, queryTokens]);
  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const scopeKits = useMemo(
    () =>
      ['office-network-setup', 'rack-room-preparation', 'fiber-backbone-scope']
        .map((id) => getProjectBundleById(id))
        .filter((bundle): bundle is NonNullable<ReturnType<typeof getProjectBundleById>> => Boolean(bundle)),
    [],
  );

  const bestBundleMatch = useMemo(() => getBestMatchingBundleForBasket(items), [items]);
  const bundleMissingRequirements = useMemo(
    () => (bestBundleMatch ? getMissingBundleRequirements(bestBundleMatch.bundle, items) : []),
    [bestBundleMatch, items],
  );
  const bundleSuggestedProducts = useMemo(
    () => (bestBundleMatch ? getSuggestedProductsForMissingRequirements(bestBundleMatch.bundle, items, initialProducts) : []),
    [bestBundleMatch, items, initialProducts],
  );

  useEffect(() => setVisibleCount(INITIAL_VISIBLE), [activeCategory, activeBrand, query]);

  useEffect(() => {
    const productParam = searchParams.get('product');
    const categoryParam = searchParams.get('category');
    const queryParam = searchParams.get('q');
    const brandParam = searchParams.get('brand');

    setQuery(queryParam?.trim() || '');
    setActiveBrand(brandParam && productBrands.includes(brandParam) ? brandParam : 'All');

    if (productParam || categoryParam || brandParam || queryParam?.trim()) setCatalogMode('browse');

    if (productParam) {
      const target = initialProducts.find((item) => item.id === productParam);
      if (target) {
        setActiveCategory(target.category);
        setHighlightedProductId(target.id);
      }
      return;
    }

    if (categoryParam && productCategories.includes(categoryParam as ProductCategory)) {
      setActiveCategory(categoryParam as ProductCategory);
      setHighlightedProductId(null);
      return;
    }

    setActiveCategory('All');
    setHighlightedProductId(null);
  }, [initialProducts, productBrands, searchParams]);

  useEffect(() => {
    if (!highlightedProductId) return;
    const timeout = window.setTimeout(() => {
      document.getElementById(`product-${highlightedProductId}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 180);
    const clear = window.setTimeout(() => {
      setHighlightedProductId((current) => (current === highlightedProductId ? null : current));
    }, 5000);
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(clear);
    };
  }, [highlightedProductId]);

  const setUrlState = (
    nextCategory: typeof activeCategory,
    nextQuery: string,
    nextBrand = activeBrand,
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextCategory !== 'All') params.set('category', nextCategory);
    else params.delete('category');
    if (nextQuery.trim()) params.set('q', nextQuery.trim());
    else params.delete('q');
    if (nextBrand !== 'All') params.set('brand', nextBrand);
    else params.delete('brand');
    params.delete('product');
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname, { scroll: false });
  };

  const chooseCategory = (category: 'All' | ProductCategory) => {
    setActiveCategory(category);
    setActiveBrand('All');
    setUrlState(category, query, 'All');
    trackEvent('product_category_filter', { category, source: 'product_world' });
  };

  const clearFilters = () => {
    setQuery('');
    setActiveCategory('All');
    setActiveBrand('All');
    setHighlightedProductId(null);
    setVisibleCount(INITIAL_VISIBLE);
    router.replace(pathname, { scroll: false });
  };

  const addToRFQ = (product: ProductItem) => {
    setItems((previous) => {
      const existing = previous.find((entry) => entry.id === product.id);
      const next = existing
        ? previous.map((entry) =>
            entry.id === product.id
              ? { ...entry, quantity: normalizeRFQQuantity(entry.quantity + 1) }
              : entry,
          )
        : [...previous, toRFQItem(product)];

      trackEvent('product_add_to_rfq', {
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        brand: product.brand,
        basket_count_after: next.length,
      });
      return next;
    });
    setJustAdded(product.id);
    setActiveCompanionProductId(product.id);
    window.setTimeout(() => setJustAdded((current) => (current === product.id ? null : current)), 1500);
  };

  const addCompanionProduct = (product: ProductItem, sourceProductId: string) => {
    addToRFQ(product);
    trackEvent('aov_companion_add', { product_id: product.id, source_product_id: sourceProductId });
  };

  const addBundleStarterToRFQ = (bundleId: string) => {
    const bundle = getProjectBundleById(bundleId);
    if (!bundle) return;

    setItems((previous) => {
      const existing = new Set(previous.map((entry) => entry.id));
      const additions = bundle.starterProductIds
        .filter((productId) => !existing.has(productId))
        .map((productId) => initialProducts.find((entry) => entry.id === productId))
        .filter((entry): entry is ProductItem => Boolean(entry))
        .map(toRFQItem);
      return [...previous, ...additions];
    });
    setAddedStarterBundles((previous) => (previous.includes(bundle.id) ? previous : [...previous, bundle.id]));
    trackEvent('bundle_add_to_rfq', { bundle_id: bundle.id });
  };

  const updateItem = (id: string, patch: Partial<RFQItem>) => {
    setItems((previous) =>
      previous.map((entry) => (entry.id === id ? normalizeRFQItem({ ...entry, ...patch }) : entry)),
    );
  };

  const productDetailHref = (id: string) => productDetailPath(id, isArabic ? 'ar' : 'en');

  const startProductDetailTransition = (
    event: ReactMouseEvent<HTMLAnchorElement>,
    item: ProductItem,
  ) => {
    if (
      isArabic ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const article = event.currentTarget.closest<HTMLElement>('[data-product-card]');
    const media = article?.querySelector<HTMLElement>('.hiltech-product-index-media');
    const image = media?.querySelector<HTMLImageElement>('img');
    if (!media || !image?.currentSrc) return;

    event.preventDefault();

    const rect = media.getBoundingClientRect();
    const href = productDetailHref(item.id);

    trackEvent('product_detail_transition_start', {
      product_id: item.id,
      category: item.category,
      source: 'reference_index',
    });

    window.dispatchEvent(
      new CustomEvent(PRODUCT_ROUTE_TRANSITION_EVENT, {
        detail: {
          href,
          productId: item.id,
          src: image.currentSrc,
          alt: image.alt || item.name,
          rect: {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height,
          },
        },
      }),
    );
  };

  const intelligenceHref = (slug?: string) => {
    if (!slug) return productsHref;
    return isArabic
      ? `/ar/products-partners/intelligence/${slug}`
      : `/products-partners/intelligence/${slug}`;
  };

  const localizeCategory = (category: string) =>
    isArabic ? t?.categoryLabels?.[category] || category : category;

  const hasActiveFilters =
    Boolean(query.trim()) || activeCategory !== 'All' || activeBrand !== 'All' || Boolean(searchParams.get('product'));

  const scrollToEntryTarget = (targetId: string, focusSearch = false) => {
    const move = () => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
      if (focusSearch) {
        window.requestAnimationFrame(() => {
          target.querySelector<HTMLInputElement>('input[type="text"], input[type="search"]')
            ?.focus({ preventScroll: true });
        });
      }
    };

    window.requestAnimationFrame(() => window.requestAnimationFrame(move));
  };

  const chooseEntryMode = (mode: 'reference' | 'system' | 'project') => {
    trackEvent('product_entry_mode', { mode, source: 'products_quick_entry' });

    if (mode === 'project') {
      setCatalogMode('project');
      scrollToEntryTarget('project-scope');
      return;
    }

    setCatalogMode('browse');
    scrollToEntryTarget(mode === 'reference' ? 'exact-finding' : 'physical-library', mode === 'reference');
  };

  const collapseWorldToReferences = () => {
    trackEvent('product_world_to_reference', {
      family: currentWorld.family,
      category: activeCategory,
    });

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      scrollToEntryTarget('exact-finding', true);
      return;
    }

    setWorldTransitioning(true);
    window.setTimeout(() => {
      scrollToEntryTarget('exact-finding', true);
      setWorldTransitioning(false);
    }, 380);
  };

  const quickEntry = isArabic
    ? [
        ['reference', '01 / أعرف المرجع', 'ابحث بالكود مباشرة', 'انتقل إلى البحث الدقيق عن الكود أو المواصفة.'],
        ['system', '02 / أعرف النظام', 'استكشف النظام', 'ادخل إلى مكتبة الأنظمة والعائلات المادية.'],
        ['project', '03 / أعرف المشروع', 'ابدأ بنطاق المشروع', 'ابدأ من نظام المشروع ثم عدّل المراجع والكميات.'],
      ] as const
    : [
        ['reference', '01 / I KNOW THE REFERENCE', 'FIND THE EXACT CODE', 'Jump directly to reference, code, brand, or specification finding.'],
        ['system', '02 / I KNOW THE SYSTEM', 'EXPLORE THE SYSTEM', 'Enter the physical library and inspect the infrastructure family first.'],
        ['project', '03 / I KNOW THE PROJECT', 'BUILD BY PROJECT', 'Start from a project system, then edit exact references and quantities.'],
      ] as const;

  return (
    <div className="hiltech-products-world-client">
      <section className="hiltech-product-quick-entry" data-product-quick-entry aria-label={isArabic ? 'اختر طريقة الدخول إلى المنتجات' : 'Choose how to enter the product system'}>
        {quickEntry.map(([mode, label, title, note]) => (
          <button
            type="button"
            key={mode}
            onClick={() => chooseEntryMode(mode)}
          >
            <span>{label}</span>
            <strong>{title}</strong>
            <small>{note}</small>
            <em aria-hidden="true">→</em>
          </button>
        ))}
      </section>

      <section className="hiltech-products-mode-switch" data-products-mode>
        <div>
          <span>PROCUREMENT MODE</span>
          <strong>{catalogMode === 'browse' ? 'REFERENCE FINDING' : 'PROJECT SCOPE'}</strong>
        </div>
        <div>
          <button
            type="button"
            className={catalogMode === 'browse' ? 'is-active' : undefined}
            onClick={() => setCatalogMode('browse')}
          >
            Browse references
          </button>
          <button
            type="button"
            className={catalogMode === 'project' ? 'is-active' : undefined}
            onClick={() => setCatalogMode('project')}
          >
            Build by project
          </button>
        </div>
      </section>

      {catalogMode === 'browse' ? (
        <>
          <section
            id="physical-library"
            className={`hiltech-product-world${worldTransitioning ? ' is-collapsing' : ''}`}
            data-product-world
            data-world-state={worldTransitioning ? 'collapsing-to-reference' : 'explore'}
          >
            <div className="hiltech-product-world-topline">
              <span>02 / PHYSICAL LIBRARY</span>
              <strong>{currentWorld.code}</strong>
            </div>

            <div className="hiltech-product-world-layout">
              <nav className="hiltech-product-world-nav" aria-label="Product families">
                <button
                  type="button"
                  className={activeCategory === 'All' ? 'is-active' : undefined}
                  onClick={() => chooseCategory('All')}
                >
                  <span>00</span>
                  <strong>ALL SYSTEMS</strong>
                  <small>{initialProducts.length} refs</small>
                </button>

                {categoryStats.map((entry, index) => (
                  <button
                    type="button"
                    key={entry.category}
                    data-product-family
                    className={activeCategory === entry.category ? 'is-active' : undefined}
                    onClick={() => chooseCategory(entry.category)}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{entry.title}</strong>
                    <small>{entry.count} refs / {entry.brands.length} brands</small>
                  </button>
                ))}
              </nav>

              <div className="hiltech-product-world-stage">
                <div className="hiltech-product-world-scene">
                  <ProductWorldScene family={currentWorld.family} />
                  <div className="hiltech-product-world-stage-label">
                    <span>SEMANTIC 3D / {currentWorld.title}</span>
                    <strong>{currentWorld.route}</strong>
                  </div>
                </div>

                <div className="hiltech-product-world-copy">
                  <span>{currentWorld.code}</span>
                  <h2>{currentWorld.statement}</h2>
                  <p>{currentWorld.description}</p>
                  <div>
                    <span>{currentWorldStats.count} CURRENT REFERENCES</span>
                    <span>{currentWorldStats.brands.length} BRAND LABELS</span>
                  </div>
                  <button
                    type="button"
                    className="hiltech-product-world-to-reference"
                    onClick={collapseWorldToReferences}
                  >
                    <span>{isArabic ? 'المراجع الدقيقة' : 'EXACT REFERENCES'}</span>
                    <strong>{isArabic ? 'انتقل من النظام إلى الكود' : 'COLLAPSE TO THE INDEX'}</strong>
                    <em aria-hidden="true">↓</em>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section id="exact-finding" className="hiltech-product-finder" data-products-filters>
            <div className="hiltech-product-finder-heading">
              <span>03 / EXACT FINDING</span>
              <strong>{filteredProducts.length} MATCHES</strong>
            </div>

            <div className="hiltech-product-finder-grid">
              <label>
                <span>REFERENCE / CODE / SPEC</span>
                <input
                  value={query}
                  onChange={(event) => {
                    const next = event.target.value;
                    setQuery(next);
                    setUrlState(activeCategory, next);
                  }}
                  placeholder="Search product code, brand, CAT6, fiber, rack, ODF..."
                />
              </label>

              <div className="hiltech-product-brand-index">
                <span>BRAND INDEX</span>
                <div>
                  <button
                    type="button"
                    className={activeBrand === 'All' ? 'is-active' : undefined}
                    onClick={() => {
                      setActiveBrand('All');
                      setUrlState(activeCategory, query, 'All');
                    }}
                  >
                    ALL
                  </button>
                  {productBrands.map((brand) => (
                    <button
                      type="button"
                      key={brand}
                      className={activeBrand === brand ? 'is-active' : undefined}
                      onClick={() => {
                        setActiveBrand(brand);
                        setUrlState(activeCategory, query, brand);
                      }}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {hasActiveFilters ? (
              <div className="hiltech-product-finder-active">
                <span>ACTIVE QUERY</span>
                <strong>
                  {[
                    activeCategory !== 'All' ? activeCategory : '',
                    activeBrand !== 'All' ? activeBrand : '',
                    query.trim() ? `“${query.trim()}”` : '',
                  ]
                    .filter(Boolean)
                    .join(' / ')}
                </strong>
                <button type="button" onClick={clearFilters}>CLEAR</button>
              </div>
            ) : null}
          </section>

          <section ref={gridRef} id="all" className="hiltech-product-reference-index" data-products-results>
            <div className="hiltech-product-reference-head">
              <span>04 / TECHNICAL REFERENCE INDEX</span>
              <strong>EXACT PART → PROJECT CONTEXT → RFQ</strong>
            </div>

            {visibleProducts.length === 0 ? (
              <div className="hiltech-product-empty">
                <span>NO CURRENT MATCH</span>
                <h3>CHANGE THE REFERENCE, BRAND, OR SYSTEM.</h3>
                <div>
                  <button type="button" onClick={clearFilters}>Clear filters</button>
                  <Link href={rfqHref}>Start RFQ</Link>
                </div>
              </div>
            ) : (
              <div className="hiltech-product-reference-list">
                {visibleProducts.map((item, index) => {
                  const slug = productIntelligenceSlugByCategory[item.category];
                  const companions =
                    activeCompanionProductId === item.id
                      ? getCompanionRecommendationsForProduct(item, items, initialProducts).slice(0, 3)
                      : [];

                  return (
                    <article
                      id={`product-${item.id}`}
                      data-product-card
                      key={item.id}
                      className={highlightedProductId === item.id ? 'is-highlighted' : undefined}
                    >
                      <div className="hiltech-product-reference-index-number">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <small>{localizeCategory(item.category)}</small>
                      </div>

                      <Link
                        href={productDetailHref(item.id)}
                        className="hiltech-product-reference-media-link"
                        onClick={(event) => startProductDetailTransition(event, item)}
                      >
                        <ProductIndexVisual item={item} />
                      </Link>

                      <div className="hiltech-product-reference-main">
                        <span className="hiltech-product-code">{item.id}</span>
                        <Link
                          href={productDetailHref(item.id)}
                          onClick={(event) => startProductDetailTransition(event, item)}
                        >
                          <h3>{item.name}</h3>
                        </Link>
                        <p>{item.useCase}</p>
                      </div>

                      <div className="hiltech-product-reference-spec">
                        <span>BRAND</span>
                        <strong>{item.brand}</strong>
                        <span>SPEC CONTEXT</span>
                        <strong>{item.shortSpecs}</strong>
                        <span>AVAILABILITY</span>
                        <strong>{item.availabilityNote?.trim() || 'Confirm during RFQ'}</strong>
                      </div>

                      <div className="hiltech-product-reference-actions">
                        <button type="button" onClick={() => addToRFQ(item)}>
                          {justAdded === item.id ? 'ADDED' : 'ADD TO RFQ'}
                        </button>
                        <Link
                          href={productDetailHref(item.id)}
                          onClick={(event) => startProductDetailTransition(event, item)}
                        >
                          DETAIL ↗
                        </Link>
                        <Link href={intelligenceHref(slug)}>TECHNICAL GUIDE ↗</Link>
                      </div>

                      {companions.length ? (
                        <div className="hiltech-product-companion-row">
                          <span>COMMONLY QUOTED WITH</span>
                          <div>
                            {companions.map((companion) => (
                              <button
                                type="button"
                                key={companion.id}
                                onClick={() => addCompanionProduct(companion, item.id)}
                              >
                                <strong>{companion.name}</strong>
                                <small>ADD +</small>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            )}

            {hasMore ? (
              <button
                type="button"
                className="hiltech-product-load-more"
                onClick={() => setVisibleCount((previous) => previous + LOAD_MORE_STEP)}
              >
                LOAD NEXT {Math.min(LOAD_MORE_STEP, filteredProducts.length - visibleCount)} REFERENCES
              </button>
            ) : null}
          </section>

          <section className="hiltech-product-guides">
            <div className="hiltech-product-reference-head">
              <span>05 / TECHNICAL INTELLIGENCE</span>
              <strong>READ ONLY WHEN THE PROJECT NEEDS DEPTH.</strong>
            </div>

            <div className="hiltech-product-guide-index">
              {productIntelligenceCategories.map((category, index) => (
                <Link href={intelligenceHref(category.slug)} key={category.slug}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{category.eyebrow}</small>
                  <strong>{category.title}</strong>
                  <em>↗</em>
                </Link>
              ))}
            </div>
          </section>
        </>
      ) : (
        <section id="project-scope" className="hiltech-product-project-builder" data-project-builder>
          <div className="hiltech-product-reference-head">
            <span>02 / PROJECT SCOPE</span>
            <strong>START WITH A SYSTEM, THEN EDIT THE REFERENCES.</strong>
          </div>

          <header>
            <h2>BUILD THE<br /><em>REQUEST AS A SYSTEM.</em></h2>
            <p>
              Project mode starts with a minimum technical scope from the live catalog. Add the starter references, then use the RFQ basket to change quantities, notes, and missing system items.
            </p>
          </header>

          <div className="hiltech-product-project-lanes">
            {scopeKits.map((kit, index) => (
              <article key={kit.id}>
                <div>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>PROJECT STARTER</small>
                </div>
                <div>
                  <h3>{kit.title}</h3>
                  <p>{kit.shortDescription}</p>
                </div>
                <div>
                  <span>REQUIREMENTS</span>
                  {kit.requirements.map((requirement) => (
                    <strong key={requirement.id}>
                      {requirement.required ? 'REQUIRED' : 'OPTIONAL'} / {requirement.label}
                    </strong>
                  ))}
                </div>
                <div>
                  <span>STARTER SET</span>
                  <strong>{kit.starterProductIds.length} REFERENCES</strong>
                  <button type="button" onClick={() => addBundleStarterToRFQ(kit.id)}>
                    {addedStarterBundles.includes(kit.id) ? 'STARTER ADDED' : 'ADD STARTER TO RFQ'}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="hiltech-product-project-return">
            <button type="button" onClick={() => setCatalogMode('browse')}>RETURN TO REFERENCE INDEX</button>
            <Link href={rfqHref}>REVIEW RFQ ↗</Link>
          </div>
        </section>
      )}

      <button
        type="button"
        className="hiltech-product-rfq-dock"
        aria-label="RFQ Basket"
        onClick={() => {
          trackEvent('rfq_basket_open', { item_count: items.length, total_units: count });
          setOpen(true);
        }}
      >
        <span>RFQ</span>
        <strong>{count}</strong>
        <small>{count === 1 ? 'UNIT' : 'UNITS'} / REVIEW</small>
      </button>

      {open ? (
        <div className="hiltech-product-rfq-overlay">
          <button type="button" aria-label="Close RFQ overlay" onClick={() => setOpen(false)} />
          <aside>
            <header>
              <div>
                <span>PROJECT REQUEST</span>
                <strong>RFQ BASKET / {items.length} REFERENCES / {count} UNITS</strong>
              </div>
              <button type="button" aria-label="Close" onClick={() => setOpen(false)}>CLOSE</button>
            </header>

            <div className="hiltech-product-rfq-body">
              {items.length === 0 ? (
                <div className="hiltech-product-rfq-empty">
                  <span>EMPTY REQUEST</span>
                  <h3>ADD EXACT REFERENCES OR START FROM A PROJECT SCOPE.</h3>
                  <button type="button" onClick={() => setOpen(false)}>RETURN TO PRODUCTS</button>
                </div>
              ) : (
                <>
                  <div className="hiltech-product-rfq-items">
                    {items.map((item, index) => (
                      <article key={item.id}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <div>
                          <small>{item.id}</small>
                          <strong>{item.name}</strong>
                          <p>{item.brand} / {item.specs}</p>
                        </div>
                        <div>
                          <button type="button" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity - 1) })}>−</button>
                          <strong>{item.quantity}</strong>
                          <button type="button" onClick={() => updateItem(item.id, { quantity: normalizeRFQQuantity(item.quantity + 1) })}>+</button>
                        </div>
                        <textarea
                          rows={2}
                          value={item.notes}
                          onChange={(event) => updateItem(item.id, { notes: event.target.value })}
                          placeholder="Project note / location / variant"
                        />
                        <button
                          type="button"
                          className="hiltech-product-rfq-remove"
                          onClick={() => setItems((previous) => previous.filter((entry) => entry.id !== item.id))}
                        >
                          REMOVE
                        </button>
                      </article>
                    ))}
                  </div>

                  {bestBundleMatch ? (
                    <div className="hiltech-product-rfq-scope">
                      <span>SCOPE SIGNAL</span>
                      <strong>{bestBundleMatch.bundle.title}</strong>
                      <p>
                        {bestBundleMatch.completion.completedRequiredCount} / {bestBundleMatch.completion.totalRequiredCount} required scope items covered.
                      </p>
                      {bundleMissingRequirements.length ? (
                        <div>
                          <span>MISSING FROM SCOPE</span>
                          {bundleSuggestedProducts.map((product) => (
                            <button type="button" key={product.id} onClick={() => addToRFQ(product)}>
                              <strong>{product.name}</strong><small>ADD +</small>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <em>SCOPE COMPLETE</em>
                      )}
                    </div>
                  ) : null}

                  <div className="hiltech-product-rfq-final">
                    <Link href={rfqHref} onClick={() => setOpen(false)}>REVIEW STRUCTURED RFQ ↗</Link>
                    <a
                      href={getRFQWhatsappLink(items.map(normalizeRFQItem))}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('rfq_whatsapp_click', { item_count: items.length, total_units: count, source: 'products_drawer' })}
                    >
                      SEND VIA WHATSAPP ↗
                    </a>
                    <button type="button" onClick={() => setItems([])}>CLEAR REQUEST</button>
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
