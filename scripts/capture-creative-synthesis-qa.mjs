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
