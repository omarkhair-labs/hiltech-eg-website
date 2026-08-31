import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir('visual-qa-work', { recursive: true });

async function assertNoHorizontalOverflow(page, label) {
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (state.scrollWidth > state.clientWidth + 1) {
    throw new Error(`${label} horizontal overflow: ${JSON.stringify(state)}`);
  }
}

async function assertImagesLoaded(page, selector, label) {
  const images = page.locator(`${selector} img`);
  const count = await images.count();
  if (!count) throw new Error(`${label} contains no images`);
  for (let index = 0; index < count; index += 1) {
    const loaded = await images.nth(index).evaluate((img) => img.complete && img.naturalWidth > 0);
    if (!loaded) throw new Error(`${label} image ${index + 1} did not load`);
  }
}

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();

    const response = await page.goto(`${baseURL}/work`, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) throw new Error(`Work route failed: ${response?.status() ?? 'no response'}`);
    await page.waitForTimeout(900);

    await page.locator('header.hiltech-creative-header').waitFor();
    await assertNoHorizontalOverflow(page, `${target.name} Work`);

    for (const [name, selector] of [
      ['hero', '.hiltech-work-hero'],
      ['index', '.hiltech-work-index'],
      ['sequence', '.hiltech-work-sequence'],
      ['ledger', '.hiltech-work-ledger'],
      ['close', '.hiltech-work-close'],
    ]) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(650);
      await assertImagesLoaded(page, selector, `${target.name} ${name}`).catch((error) => {
        if (name === 'ledger' || name === 'close') return;
        throw error;
      });
      await page.screenshot({
        path: `visual-qa-work/${target.name}-work-${name}.png`,
        fullPage: false,
      });
    }

    const records = page.locator('.hiltech-work-record-list button');
    const recordCount = await records.count();
    if (recordCount !== 4) throw new Error(`Expected 4 Work evidence records, got ${recordCount}`);

    const interactionIndexes = target.name === 'desktop' ? [0, 1, 2, 3] : [0, 3];
    for (const index of interactionIndexes) {
      await records.nth(index).click();
      await page.waitForTimeout(450);
      const pressed = await records.nth(index).getAttribute('aria-pressed');
      if (pressed !== 'true') throw new Error(`Evidence record ${index + 1} did not become active`);
      await page.locator('.hiltech-work-record-stage').scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      await page.screenshot({
        path: `visual-qa-work/${target.name}-work-record-${index + 1}.png`,
        fullPage: false,
      });
    }

    const rfqHref = await page.locator('.hiltech-work-close a').first().getAttribute('href');
    if (rfqHref !== '/rfq') throw new Error(`Work primary CTA expected /rfq, got ${rfqHref}`);

    await assertNoHorizontalOverflow(page, `${target.name} Work after interactions`);
    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
  });
  const reducedPage = await reducedContext.newPage();
  const reducedResponse = await reducedPage.goto(`${baseURL}/work`, { waitUntil: 'networkidle' });
  if (!reducedResponse || !reducedResponse.ok()) throw new Error('Reduced-motion Work route failed');
  await reducedPage.locator('.hiltech-work-index').scrollIntoViewIfNeeded();
  await reducedPage.waitForTimeout(300);
  await assertNoHorizontalOverflow(reducedPage, 'reduced-motion Work');
  await reducedPage.screenshot({
    path: 'visual-qa-work/reduced-motion-work-index.png',
    fullPage: false,
  });
  await reducedContext.close();
} finally {
  await browser.close();
}
