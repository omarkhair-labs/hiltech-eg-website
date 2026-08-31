import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const routes = [
  { name: 'home', path: '/', hero: '[data-home-experience], main' },
  { name: 'solutions', path: '/solutions', hero: '.hiltech-solutions-index-hero' },
  { name: 'services', path: '/services', hero: '.hiltech-services-hero' },
  { name: 'products', path: '/products-partners', hero: '.hiltech-products-hero' },
  { name: 'work', path: '/work', hero: '.hiltech-work-hero' },
  { name: 'company', path: '/company', hero: '.hiltech-company-hero' },
  { name: 'rfq', path: '/rfq', hero: '.hiltech-rfq-hero' },
  { name: 'contact', path: '/contact', hero: '.hiltech-contact-hero' },
];

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir('visual-qa-creative-synthesis', { recursive: true });

async function assertNoHorizontalOverflow(page, label) {
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (state.scrollWidth > state.clientWidth + 1) {
    throw new Error(`${label} horizontal overflow: ${JSON.stringify(state)}`);
  }
}

async function assertMobileTextFits(page, label, expectedWidth) {
  const state = await page.evaluate(() => ({
    docWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    innerWidth: window.innerWidth,
  }));
  if (state.clientWidth !== expectedWidth || state.innerWidth !== expectedWidth || state.docWidth > expectedWidth + 1 || state.bodyWidth > expectedWidth + 1) {
    throw new Error(`${label} mobile width mismatch: ${JSON.stringify(state)}`);
  }

  const issues = await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const result = [];
    for (const element of document.querySelectorAll('h1,h2,h3,p,strong,a,button,label')) {
      if (!(element instanceof HTMLElement)) continue;
      if (element.closest('svg,[aria-hidden="true"]')) continue;
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const text = (element.innerText || element.textContent || '').trim();
      if (!text || style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0 || rect.width < 2 || rect.height < 2) continue;
      const internalClip = element.dataset.allowMobileOverflow !== 'true' && element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 2 && style.overflowX !== 'visible';
      const viewportClip = rect.left < -2 || rect.right > viewportWidth + 2;
      if (internalClip || viewportClip) {
        result.push({ tag: element.tagName, text: text.slice(0, 90), left: Math.round(rect.left), right: Math.round(rect.right), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, overflowX: style.overflowX });
      }
      if (result.length >= 20) break;
    }
    return result;
  });
  if (issues.length) throw new Error(`${label} visible text clipping: ${JSON.stringify(issues)}`);
}

async function assertAllImagesLoaded(page, label) {
  const broken = await page.locator('img').evaluateAll((images) => images.map((img, index) => ({ index, src: img.currentSrc || img.getAttribute('src') || '', complete: img.complete, naturalWidth: img.naturalWidth })).filter((entry) => !entry.complete || entry.naturalWidth <= 0));
  if (broken.length) throw new Error(`${label} broken images: ${JSON.stringify(broken.slice(0, 10))}`);
}

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    for (const route of routes) {
      const context = await browser.newContext({
        viewport: { width: target.width, height: target.height },
        deviceScaleFactor: 1,
        reducedMotion: 'no-preference',
      });
      const page = await context.newPage();

      const response = await page.goto(`${baseURL}${route.path}`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) {
        throw new Error(`${target.name} ${route.name} route failed: ${response?.status() ?? 'no response'}`);
      }

      await page.locator('header.hiltech-creative-header').waitFor();
      await page.locator('.hiltech-system-footer').waitFor();

      const legacyFooter = await page.locator('footer.bg-slate-950').count();
      if (legacyFooter) {
        throw new Error(`${target.name} ${route.name} still renders legacy creative-route footer`);
      }

      if (target.name === 'desktop') {
        const roundedCreativeControls = await page.locator(
          'header.hiltech-creative-header .hiltech-creative-nav-link.rounded-lg, header.hiltech-creative-header .hiltech-creative-project-link.rounded-lg',
        ).count();
        if (roundedCreativeControls) {
          throw new Error(`${route.name} creative header regressed to rounded pill controls`);
        }
      }

      await assertNoHorizontalOverflow(page, `${target.name} ${route.name} top`);

      const hero = page.locator(route.hero).first();
      if (await hero.count()) {
        await hero.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({
          path: `visual-qa-creative-synthesis/${target.name}-${route.name}-top.png`,
          fullPage: false,
        });
      }

      const footer = page.locator('.hiltech-system-footer');
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: `visual-qa-creative-synthesis/${target.name}-${route.name}-footer.png`,
        fullPage: false,
      });

      await page.screenshot({
        path: `visual-qa-creative-synthesis/${target.name}-${route.name}-full.png`,
        fullPage: true,
      });

      if (target.name === 'mobile') {
        const menuButton = page.getByRole('button', { name: /Open navigation menu|Menu/i }).first();
        if (await menuButton.count()) {
          await menuButton.click();
          const panel = page.locator('.hiltech-creative-mobile-panel');
          await panel.waitFor();
          const roundedMobileControls = await panel.locator('.hiltech-creative-mobile-nav-link.rounded-xl').count();
          if (roundedMobileControls) {
            throw new Error(`${route.name} mobile creative nav regressed to rounded route pills`);
          }
          await page.screenshot({
            path: `visual-qa-creative-synthesis/mobile-${route.name}-menu.png`,
            fullPage: false,
          });
          await menuButton.click();
        }
      }

      const footerText = await footer.innerText();
      if (!footerText.includes('HILTECH / PHYSICAL LAYER') || !footerText.includes('START A PROJECT')) {
        throw new Error(`${target.name} ${route.name} system footer content incomplete`);
      }

      await assertNoHorizontalOverflow(page, `${target.name} ${route.name} footer`);
      await context.close();
    }
  }

  const mobileDeepRoutes = [
    ['solution-structured', '/solutions/structured-cabling'],
    ['solution-fiber', '/solutions/fiber-backbone'],
    ['solution-data-rooms', '/solutions/data-rooms'],
    ['solution-cctv', '/solutions/cctv-infrastructure'],
    ['solution-testing', '/solutions/network-testing'],
    ['solution-rfq', '/solutions/project-supply-rfq'],
    ['intel-fiber', '/products-partners/intelligence/fiber-optic-systems'],
    ['intel-copper', '/products-partners/intelligence/copper-cat6-cabling'],
    ['intel-patch', '/products-partners/intelligence/patch-cords-connectivity'],
    ['intel-endpoints', '/products-partners/intelligence/faceplates-keystone-rj45'],
    ['intel-racks', '/products-partners/intelligence/cabinets-racks-pdu'],
    ['intel-pathways', '/products-partners/intelligence/cable-management-duct-systems'],
    ['intel-cctv', '/products-partners/intelligence/cctv-security'],
  ];
  const mobileWidths = [
    { name: 'compact', width: 360, height: 800 },
    { name: 'baseline-touch', width: 390, height: 844 },
    { name: 'wide-touch', width: 430, height: 932 },
  ];

  for (const mobile of mobileWidths) {
    const mobileContext = await browser.newContext({
      viewport: { width: mobile.width, height: mobile.height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      isMobile: true,
      hasTouch: true,
    });
    const mobilePage = await mobileContext.newPage();

    for (const route of routes) {
      const response = await mobilePage.goto(`${baseURL}${route.path}`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) throw new Error(`${mobile.name} ${route.name} route failed`);
      await mobilePage.waitForTimeout(450);
      await assertMobileTextFits(mobilePage, `${mobile.name} ${route.name}`, mobile.width);
      await assertAllImagesLoaded(mobilePage, `${mobile.name} ${route.name}`);
    }

    for (const [name, path] of mobileDeepRoutes) {
      const response = await mobilePage.goto(`${baseURL}${path}`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) throw new Error(`${mobile.name} ${name} route failed`);
      await mobilePage.waitForTimeout(350);
      await assertMobileTextFits(mobilePage, `${mobile.name} ${name}`, mobile.width);
      await assertAllImagesLoaded(mobilePage, `${mobile.name} ${name}`);
      if (mobile.name === 'baseline-touch' && ['solution-fiber','solution-cctv','intel-racks','intel-cctv'].includes(name)) {
        await mobilePage.screenshot({ path: `visual-qa-creative-synthesis/mobile-final-${name}.png`, fullPage: true });
      }
    }

    await mobilePage.goto(`${baseURL}/products-partners`, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(450);
    const detailCodes = await mobilePage.locator('[data-product-card] .hiltech-product-code').evaluateAll((nodes) => nodes.map((node) => node.textContent?.trim()).filter(Boolean).slice(0, 2));
    for (let index = 0; index < detailCodes.length; index += 1) {
      const code = detailCodes[index];
      const response = await mobilePage.goto(`${baseURL}/products-partners/${encodeURIComponent(code)}`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) throw new Error(`${mobile.name} product detail ${index + 1} route failed`);
      await mobilePage.waitForTimeout(350);
      await assertMobileTextFits(mobilePage, `${mobile.name} product detail ${index + 1}`, mobile.width);
      await assertAllImagesLoaded(mobilePage, `${mobile.name} product detail ${index + 1}`);
      if (mobile.name === 'baseline-touch') {
        await mobilePage.screenshot({ path: `visual-qa-creative-synthesis/mobile-final-product-detail-${index + 1}.png`, fullPage: true });
      }
    }

    if (mobile.name === 'baseline-touch') {
      await mobilePage.goto(`${baseURL}/`, { waitUntil: 'networkidle' });
      const menuButton = mobilePage.getByRole('button', { name: /Open navigation menu|Menu/i }).first();
      await menuButton.click();
      const panel = mobilePage.locator('.hiltech-creative-mobile-panel');
      await panel.waitFor();
      const roundedActions = await panel.locator('.rounded-lg, .rounded-xl, .rounded-2xl').count();
      if (roundedActions) throw new Error(`mobile creative menu still contains ${roundedActions} rounded controls`);
      await assertMobileTextFits(mobilePage, 'baseline-touch mobile menu', mobile.width);
      await mobilePage.screenshot({ path: 'visual-qa-creative-synthesis/mobile-final-global-menu.png', fullPage: false });
    }

    await mobileContext.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();

  for (const route of ['/work', '/company']) {
    const response = await page.goto(`${baseURL}${route}`, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) throw new Error(`Reduced-motion ${route} failed`);
    await assertNoHorizontalOverflow(page, `reduced-motion ${route}`);
  }

  await context.close();
} finally {
  await browser.close();
}
