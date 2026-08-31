import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir('visual-qa-company', { recursive: true });

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
    const response = await page.goto(`${baseURL}/company`, { waitUntil: 'networkidle' });
    if (!response || !response.ok()) throw new Error(`Company route failed: ${response?.status() ?? 'no response'}`);

    await page.locator('header.hiltech-creative-header').waitFor();
    await assertNoHorizontalOverflow(page, `${target.name} Company`);

    const legacy = await page.locator('.hiltech-company-page .rounded-lg, .hiltech-company-page .rounded-xl, .hiltech-company-page .rounded-2xl, .hiltech-company-page .bg-slate-950, .hiltech-company-page .bg-orange-600').count();
    if (legacy) throw new Error(`Company contains ${legacy} legacy corporate surface markers`);

    for (const [name, selector] of [
      ['hero', '.hiltech-company-hero'],
      ['position', '.hiltech-company-position'],
      ['truths', '.hiltech-company-truths'],
      ['presence', '.hiltech-company-presence'],
      ['proof', '.hiltech-company-proof'],
      ['close', '.hiltech-company-close'],
    ]) {
      const section = page.locator(selector);
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await assertImagesLoaded(page, selector, `${target.name} ${name}`);
      await page.screenshot({
        path: `visual-qa-company/${target.name}-company-${name}.png`,
        fullPage: false,
      });
    }

    const address = (await page.locator('.hiltech-company-presence address').innerText()).trim();
    if (!address.includes('Zahraa El Maadi') || !address.includes('01000087808') || !address.includes('info@hiltech-eg.com')) {
      throw new Error(`Company verified presence is incomplete: ${address}`);
    }

    const primaryHref = await page.locator('.hiltech-company-close a').first().getAttribute('href');
    if (primaryHref !== '/rfq') throw new Error(`Company primary CTA expected /rfq, got ${primaryHref}`);

    await assertNoHorizontalOverflow(page, `${target.name} Company final`);
    await context.close();
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const reducedPage = await reducedContext.newPage();
  const response = await reducedPage.goto(`${baseURL}/company`, { waitUntil: 'networkidle' });
  if (!response || !response.ok()) throw new Error('Reduced-motion Company route failed');
  await reducedPage.locator('.hiltech-company-position').scrollIntoViewIfNeeded();
  await assertNoHorizontalOverflow(reducedPage, 'reduced-motion Company');
  await reducedPage.screenshot({
    path: 'visual-qa-company/reduced-motion-company-position.png',
    fullPage: false,
  });
  await reducedContext.close();
} finally {
  await browser.close();
}
