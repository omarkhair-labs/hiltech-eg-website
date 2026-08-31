import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const utilityRoutes = [
  ['resources', '/resources'],
  ['company-profile', '/resources/company-profile'],
  ['rfq-guide', '/resources/rfq-guide'],
  ['launch-copy', '/resources/launch-copy'],
  ['one-pager-structured', '/resources/one-pagers/structured-cabling'],
  ['one-pager-fiber', '/resources/one-pagers/fiber-backbone'],
  ['one-pager-data-room', '/resources/one-pagers/data-room-infrastructure'],
  ['one-pager-cctv', '/resources/one-pagers/cctv-infrastructure'],
  ['one-pager-testing', '/resources/one-pagers/network-testing-validation'],
  ['one-pager-supply', '/resources/one-pagers/project-supply-rfq'],
  ['track', '/track'],
  ['scope-finder', '/scope-finder'],
  ['privacy', '/privacy-policy'],
  ['accessibility', '/accessibility-statement'],
];

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const compactRoutes = [
  ['resources', '/resources'],
  ['track', '/track'],
  ['scope-finder', '/scope-finder'],
  ['privacy', '/privacy-policy'],
  ['accessibility', '/accessibility-statement'],
];

await mkdir('visual-qa-public-utility', { recursive: true });

async function assertNoHorizontalOverflow(page, label) {
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    innerWidth: window.innerWidth,
  }));

  if (
    state.scrollWidth > state.clientWidth + 1 ||
    state.bodyWidth > state.clientWidth + 1
  ) {
    throw new Error(label + ' horizontal overflow: ' + JSON.stringify(state));
  }
}

async function assertNoLegacyUtilitySurface(page, label) {
  const count = await page.locator(
    'main.hiltech-utility-page .rounded-xl, ' +
    'main.hiltech-utility-page .rounded-2xl, ' +
    'main.hiltech-utility-page .bg-orange-600, ' +
    'main.hiltech-utility-page .bg-gradient-to-br, ' +
    'main.hiltech-utility-page .bg-slate-950'
  ).count();

  if (count) {
    throw new Error(label + ' contains ' + count + ' legacy rounded/slate/orange surface markers');
  }
}

async function openSearch(page, label) {
  const searchButton = page.getByRole('button', { name: /^Search$/i }).first();
  await searchButton.click();

  const panel = page.locator('.hiltech-search-panel');
  await panel.waitFor();

  const legacy = await panel.locator(
    '.rounded-xl, .rounded-2xl, .rounded-lg, .bg-white, .bg-orange-600'
  ).count();
  if (legacy) throw new Error(label + ' search contains legacy modal markers: ' + legacy);

  const input = panel.locator('input[type="search"]');
  await input.fill('fiber');
  await page.waitForTimeout(150);

  const resultCount = await panel.locator('.hiltech-search-result').count();
  if (!resultCount) throw new Error(label + ' search produced no results for fiber');

  await assertNoHorizontalOverflow(page, label + ' search');
}

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'reduce',
      isMobile: target.name === 'mobile',
      hasTouch: target.name === 'mobile',
    });

    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    page.setDefaultNavigationTimeout(30000);

    for (const [name, path] of utilityRoutes) {
      console.log('[utility] ' + target.name + ' ' + name);
      const response = await page.goto(baseURL + path, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) {
        throw new Error(target.name + ' ' + name + ' failed: ' + (response?.status() ?? 'no response'));
      }

      await page.locator('header.hiltech-creative-header').waitFor();
      await page.locator('.hiltech-system-footer').waitFor();
      await page.locator('main.hiltech-utility-page').waitFor();

      await assertNoLegacyUtilitySurface(page, target.name + ' ' + name);
      await assertNoHorizontalOverflow(page, target.name + ' ' + name);

      await page.screenshot({
        path: 'visual-qa-public-utility/' + target.name + '-' + name + '-full.png',
        fullPage: true,
        timeout: 15000,
      });
    }

    await page.goto(baseURL + '/company', { waitUntil: 'networkidle' });
    await openSearch(page, target.name);
    await page.screenshot({
      path: 'visual-qa-public-utility/' + target.name + '-search-open.png',
      fullPage: false,
      timeout: 15000,
    });
    await page.keyboard.press('Escape');
    if (await page.locator('.hiltech-search-panel').count()) {
      throw new Error(target.name + ' search did not close with Escape');
    }

    await page.goto(baseURL + '/track', { waitUntil: 'networkidle' });
    const trackForm = page.locator('[data-track-form]');
    await trackForm.waitFor();
    if (await trackForm.locator('.rounded-xl, .rounded-lg, .bg-orange-600').count()) {
      throw new Error(target.name + ' Track form regressed to legacy controls');
    }

    await page.goto(baseURL + '/scope-finder', { waitUntil: 'networkidle' });
    await page.locator('[data-scope-question]').waitFor();

    for (let step = 0; step < 6; step += 1) {
      const next = page.locator('.hiltech-scope-actions button').last();
      await next.click();
      await page.waitForTimeout(80);
    }

    await page.locator('.hiltech-scope-actions button').last().click();
    await page.locator('[data-scope-result]').waitFor();
    await assertNoHorizontalOverflow(page, target.name + ' scope result');
    await page.screenshot({
      path: 'visual-qa-public-utility/' + target.name + '-scope-result.png',
      fullPage: true,
      timeout: 15000,
    });

    await page.goto(baseURL + '/about', { waitUntil: 'networkidle' });
    if (!page.url().includes('/company')) {
      throw new Error('/about did not resolve to canonical /company route');
    }

    await context.close();
  }

  const compactContext = await browser.newContext({
    viewport: { width: 360, height: 800 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    isMobile: true,
    hasTouch: true,
  });
  const compactPage = await compactContext.newPage();
  compactPage.setDefaultTimeout(15000);

  for (const [name, path] of compactRoutes) {
    const response = await compactPage.goto(baseURL + path, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) throw new Error('compact ' + name + ' route failed');
    await assertNoHorizontalOverflow(compactPage, 'compact ' + name);
    await assertNoLegacyUtilitySurface(compactPage, 'compact ' + name);
  }

  await compactContext.close();
} finally {
  await browser.close();
}
