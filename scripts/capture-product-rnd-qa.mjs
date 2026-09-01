import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';
const SHOT_TIMEOUT = 15000;
const NAV_TIMEOUT = 30000;

await mkdir('visual-qa-product-rnd', { recursive: true });

async function openProducts(page) {
  const response = await page.goto(`${baseURL}/products-partners`, { waitUntil: 'networkidle' });
  if (!response || !response.ok()) throw new Error(`products route failed: ${response?.status() ?? 'no response'}`);
  await page.locator('[data-product-quick-entry]').waitFor();
}

async function assertNoHorizontalOverflow(page, label) {
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (state.scrollWidth > state.clientWidth + 1) {
    throw new Error(`${label} horizontal overflow: ${JSON.stringify(state)}`);
  }
}

async function assertReferenceFocus(page, label) {
  const input = page.locator('#exact-finding input');
  await input.waitFor();
  await page.waitForFunction(
    () => document.activeElement === document.querySelector('#exact-finding input'),
    undefined,
    { timeout: 3000 },
  ).catch(() => {
    throw new Error(`${label} did not focus exact finding`);
  });
}

const browser = await chromium.launch({ headless: true });

try {
  console.log('[product-rnd] desktop quick entry');
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
  });
  const page = await desktop.newPage();
  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(NAV_TIMEOUT);

  const entryCases = [
    ['I KNOW THE REFERENCE', '#exact-finding'],
    ['I KNOW THE SYSTEM', '#physical-library'],
    ['I KNOW THE PROJECT', '#project-scope'],
  ];

  for (const [label, target] of entryCases) {
    await openProducts(page);
    const entry = page.locator('[data-product-quick-entry] button').filter({ hasText: label });
    await entry.waitFor();
    await entry.click();
    await page.locator(target).waitFor();
    if (label === 'I KNOW THE REFERENCE') await assertReferenceFocus(page, 'desktop reference quick entry');
  }

  await openProducts(page);
  const quickEntry = page.locator('[data-product-quick-entry]');
  await quickEntry.scrollIntoViewIfNeeded();
  await page.screenshot({
    path: 'visual-qa-product-rnd/desktop-quick-entry.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });

  console.log('[product-rnd] desktop persistent Product World route');
  await page.locator('[data-product-quick-entry] button').filter({ hasText: 'I KNOW THE SYSTEM' }).click();
  const world = page.locator('#physical-library');
  await world.waitFor();
  await world.scrollIntoViewIfNeeded();
  const firstFamily = page.locator('[data-product-family]').first();
  await firstFamily.click();
  await page.waitForTimeout(180);
  const worldFamily = await page.locator('.hiltech-product-world-canvas').getAttribute('data-product-world-family');
  if (!worldFamily || worldFamily === 'all') throw new Error('Product World family state did not change');
  const activeRouteNodes = await page.locator('.hiltech-product-world-persistent-route g.is-active').count();
  if (activeRouteNodes !== 1) throw new Error(`Product World expected one active route node, got ${activeRouteNodes}`);
  await page.screenshot({
    path: 'visual-qa-product-rnd/desktop-product-world-route.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });

  console.log('[product-rnd] desktop World -> Reference collapse');
  const collapse = page.locator('.hiltech-product-world-to-reference');
  await collapse.scrollIntoViewIfNeeded();
  await collapse.click();
  await page.locator('[data-world-state="collapsing-to-reference"]').waitFor();
  await page.screenshot({
    path: 'visual-qa-product-rnd/desktop-world-reference-collapse.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });
  await assertReferenceFocus(page, 'desktop world-to-reference collapse');

  console.log('[product-rnd] desktop Reference -> Detail continuity');
  await openProducts(page);
  const desktopDetailLink = page.locator('[data-product-card] .hiltech-product-reference-media-link').first();
  await desktopDetailLink.scrollIntoViewIfNeeded();
  await desktopDetailLink.click();
  const desktopOverlay = page.locator('[data-product-route-transition]');
  await desktopOverlay.waitFor();
  await page.waitForTimeout(90);
  await page.screenshot({
    path: 'visual-qa-product-rnd/desktop-reference-detail-handoff.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });
  await page.waitForURL(/\/products-partners\/[^/?#]+$/, { timeout: NAV_TIMEOUT });
  await page.locator('[data-product-object]').waitFor();
  await desktopOverlay.waitFor({ state: 'detached', timeout: 4000 });
  await assertNoHorizontalOverflow(page, 'desktop product detail continuity');
  await page.screenshot({
    path: 'visual-qa-product-rnd/desktop-detail-arrival.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });
  await desktop.close();

  console.log('[product-rnd] reduced-motion direct Product -> Detail');
  const reduced = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const reducedPage = await reduced.newPage();
  reducedPage.setDefaultTimeout(15000);
  reducedPage.setDefaultNavigationTimeout(NAV_TIMEOUT);
  await openProducts(reducedPage);
  const reducedLink = reducedPage.locator('[data-product-card] .hiltech-product-reference-media-link').first();
  await reducedLink.scrollIntoViewIfNeeded();
  await reducedLink.click();
  await reducedPage.waitForURL(/\/products-partners\/[^/?#]+$/, { timeout: NAV_TIMEOUT });
  await reducedPage.locator('[data-product-object]').waitFor();
  if (await reducedPage.locator('[data-product-route-transition]').count()) {
    throw new Error('reduced-motion Product -> Detail rendered transition overlay');
  }
  await reduced.close();

  console.log('[product-rnd] mobile quick entry');
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobile.newPage();
  mobilePage.setDefaultTimeout(15000);
  mobilePage.setDefaultNavigationTimeout(NAV_TIMEOUT);
  await openProducts(mobilePage);
  const mobileQuickEntry = mobilePage.locator('[data-product-quick-entry]');
  await mobileQuickEntry.scrollIntoViewIfNeeded();
  await assertNoHorizontalOverflow(mobilePage, 'mobile quick entry');
  await mobilePage.screenshot({
    path: 'visual-qa-product-rnd/mobile-quick-entry.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });
  await mobilePage.locator('[data-product-quick-entry] button').filter({ hasText: 'I KNOW THE REFERENCE' }).click();
  await mobilePage.locator('#exact-finding').waitFor();
  await assertReferenceFocus(mobilePage, 'mobile reference quick entry');

  await openProducts(mobilePage);
  await mobilePage.locator('[data-product-quick-entry] button').filter({ hasText: 'I KNOW THE PROJECT' }).click();
  await mobilePage.locator('#project-scope').waitFor();
  await assertNoHorizontalOverflow(mobilePage, 'mobile project quick entry');
  await mobile.close();

  console.log('[product-rnd] mobile Reference -> Detail continuity');
  const mobileMotion = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    isMobile: true,
    hasTouch: true,
  });
  const mobileMotionPage = await mobileMotion.newPage();
  mobileMotionPage.setDefaultTimeout(15000);
  mobileMotionPage.setDefaultNavigationTimeout(NAV_TIMEOUT);
  await openProducts(mobileMotionPage);
  const mobileDetailLink = mobileMotionPage.locator('[data-product-card] .hiltech-product-reference-media-link').first();
  await mobileDetailLink.scrollIntoViewIfNeeded();
  await mobileDetailLink.click();
  const mobileOverlay = mobileMotionPage.locator('[data-product-route-transition]');
  await mobileOverlay.waitFor();
  await mobileMotionPage.waitForTimeout(90);
  await mobileMotionPage.screenshot({
    path: 'visual-qa-product-rnd/mobile-reference-detail-handoff.png',
    fullPage: false,
    timeout: SHOT_TIMEOUT,
  });
  await mobileMotionPage.waitForURL(/\/products-partners\/[^/?#]+$/, { timeout: NAV_TIMEOUT });
  await mobileMotionPage.locator('[data-product-object]').waitFor();
  await mobileOverlay.waitFor({ state: 'detached', timeout: 4000 });
  await assertNoHorizontalOverflow(mobileMotionPage, 'mobile product detail continuity');
  await mobileMotion.close();

  console.log('[product-rnd] complete');
} finally {
  await browser.close();
}
