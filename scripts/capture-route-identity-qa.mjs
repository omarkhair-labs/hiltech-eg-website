import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const routes = [
  {
    name: 'solutions',
    path: '/solutions',
    identity: 'system-path',
    anchor: '.hiltech-solutions-hero-map',
  },
  {
    name: 'services',
    path: '/services',
    identity: 'field-execution',
    anchor: '.hiltech-services-hero-media',
  },
  {
    name: 'products',
    path: '/products-partners',
    identity: 'object-intent',
    anchor: '.hiltech-products-object-dock',
  },
  {
    name: 'work',
    path: '/work',
    identity: 'evidence-archive',
    anchor: '.hiltech-work-contact-sheet',
  },
  {
    name: 'company',
    path: '/company',
    identity: 'operating-map',
    anchor: '.hiltech-company-system-stage',
  },
  {
    name: 'rfq',
    path: '/rfq',
    identity: 'request-state',
    anchor: '.hiltech-rfq-live-state',
  },
  {
    name: 'contact',
    path: '/contact',
    identity: 'direct-endpoint',
    anchor: '.hiltech-contact-paths',
  },
];

const targets = [
  { name: 'desktop', width: 1440, height: 1000, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
];

await mkdir('visual-qa-route-identity', { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      isMobile: target.mobile,
      hasTouch: target.mobile,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(30000);

    for (const route of routes) {
      console.log(`[route-identity] ${target.name} ${route.name}`);
      const response = await page.goto(`${baseURL}${route.path}`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) {
        throw new Error(`${target.name} ${route.name} failed: ${response?.status() ?? 'no response'}`);
      }

      const hero = page.locator(`[data-route-identity="${route.identity}"]`);
      const anchor = page.locator(route.anchor).first();
      await hero.waitFor();
      await anchor.waitFor();

      const identity = await hero.getAttribute('data-route-identity');
      if (identity !== route.identity) {
        throw new Error(`${route.name} identity mismatch: ${identity}`);
      }

      const metrics = await page.evaluate(({ heroSelector, anchorSelector }) => {
        const heroElement = document.querySelector(heroSelector);
        const anchorElement = document.querySelector(anchorSelector);
        if (!(heroElement instanceof HTMLElement) || !(anchorElement instanceof HTMLElement)) {
          return null;
        }
        const heroRect = heroElement.getBoundingClientRect();
        const anchorRect = anchorElement.getBoundingClientRect();
        const h1 = heroElement.querySelector('h1');
        const h1Rect = h1?.getBoundingClientRect();
        return {
          hero: {
            top: heroRect.top,
            width: heroRect.width,
            height: heroRect.height,
          },
          anchor: {
            top: anchorRect.top,
            left: anchorRect.left,
            width: anchorRect.width,
            height: anchorRect.height,
          },
          h1: h1Rect
            ? { width: h1Rect.width, height: h1Rect.height, top: h1Rect.top }
            : null,
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      }, {
        heroSelector: `[data-route-identity="${route.identity}"]`,
        anchorSelector: route.anchor,
      });

      if (!metrics) throw new Error(`${route.name} route identity metrics unavailable`);
      if (metrics.scrollWidth > metrics.clientWidth + 1) {
        throw new Error(`${target.name} ${route.name} horizontal overflow: ${JSON.stringify(metrics)}`);
      }
      if (metrics.anchor.width < (target.mobile ? 250 : 360) || metrics.anchor.height < (target.mobile ? 150 : 180)) {
        throw new Error(`${target.name} ${route.name} visual anchor too weak: ${JSON.stringify(metrics.anchor)}`);
      }

      if (target.mobile && metrics.anchor.top > target.height * 1.12) {
        throw new Error(`${route.name} mobile visual identity enters too late: top=${metrics.anchor.top}`);
      }

      if (!target.mobile && metrics.h1) {
        const anchorArea = metrics.anchor.width * metrics.anchor.height;
        const titleArea = metrics.h1.width * metrics.h1.height;
        if (anchorArea < titleArea * 1.15) {
          throw new Error(`${route.name} desktop opening still title-dominant: anchor=${anchorArea}, title=${titleArea}`);
        }
      }

      await page.screenshot({
        path: `visual-qa-route-identity/${target.name}-${route.name}.png`,
        fullPage: false,
      });
    }

    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: 'reduce',
    isMobile: true,
    hasTouch: true,
  });
  const reducedPage = await reducedContext.newPage();

  for (const route of routes) {
    const response = await reducedPage.goto(`${baseURL}${route.path}`, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) throw new Error(`reduced-motion ${route.name} failed`);
    await reducedPage.locator(`[data-route-identity="${route.identity}"]`).waitFor();
    await reducedPage.locator(route.anchor).first().waitFor();
  }

  await reducedContext.close();
  console.log('[route-identity] complete');
} finally {
  await browser.close();
}
