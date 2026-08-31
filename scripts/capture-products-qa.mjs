import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const detailProducts = [
  'fiber-leviton-om3',
  'rack-network-cabinets',
  'cctv-hikvision-cams',
];

const intelligenceSlugs = [
  'fiber-optic-systems',
  'copper-cat6-cabling',
  'patch-cords-connectivity',
  'faceplates-keystone-rj45',
  'cabinets-racks-pdu',
  'cable-management-duct-systems',
  'cctv-security',
];

await mkdir('visual-qa-products', { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();

    await page.goto(`${baseURL}/products-partners`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    for (const [name, selector] of [
      ['hero', '.hiltech-products-hero'],
      ['filters', '[data-products-filters]'],
      ['results', '[data-products-results]'],
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({
        path: `visual-qa-products/${target.name}-catalog-${name}.png`,
        fullPage: false,
      });
    }

    const firstCard = page.locator('[data-product-card]').first();
    const code = (await firstCard.locator('.hiltech-product-code').innerText()).trim();
    const search = page.locator('[data-products-filters] input').first();
    await search.fill(code);
    await page.waitForTimeout(650);
    if ((await page.locator('[data-product-card]').count()) < 1) throw new Error('Product-code search returned no products');
    await page.screenshot({
      path: `visual-qa-products/${target.name}-catalog-code-search.png`,
      fullPage: false,
    });

    const clear = page.getByRole('button', { name: /clear filters/i });
    if (await clear.count()) {
      await clear.first().click();
      await page.waitForTimeout(450);
    }

    const brandButtons = page.locator('.hiltech-products-brand-filter button');
    if ((await brandButtons.count()) > 1) {
      await brandButtons.nth(1).click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `visual-qa-products/${target.name}-catalog-brand-filter.png`,
        fullPage: false,
      });
    }

    if (target.name === 'desktop') {
      if (await clear.count()) {
        await clear.first().click();
        await page.waitForTimeout(350);
      }
      const card = page.locator('[data-product-card]').first();
      await card.getByRole('button', { name: /add to rfq/i }).click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: 'visual-qa-products/desktop-catalog-rfq-added.png',
        fullPage: false,
      });

      await page.getByRole('button', { name: /rfq basket/i }).click();
      await page.waitForTimeout(450);
      await page.screenshot({
        path: 'visual-qa-products/desktop-catalog-rfq-drawer.png',
        fullPage: false,
      });
      const close = page.getByRole('button', { name: /^close$/i });
      if (await close.count()) await close.click();

      await page.getByRole('button', { name: /build by project/i }).click();
      await page.waitForTimeout(450);
      await page.screenshot({
        path: 'visual-qa-products/desktop-catalog-project-mode.png',
        fullPage: false,
      });
    }

    for (const productCode of detailProducts) {
      await page.goto(`${baseURL}/products-partners/${productCode}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(650);
      for (const [name, selector] of [
        ['top', '.hiltech-product-detail-hero'],
        ['context', '.hiltech-product-detail-context'],
        ['rfq', '.hiltech-product-detail-rfq'],
      ]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.screenshot({
          path: `visual-qa-products/${target.name}-detail-${productCode}-${name}.png`,
          fullPage: false,
        });
      }
    }

    for (const slug of intelligenceSlugs) {
      await page.goto(`${baseURL}/products-partners/intelligence/${slug}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      for (const [name, selector] of [
        ['top', '.hiltech-product-intelligence-hero'],
        ['planning', '.hiltech-product-intelligence-planning'],
      ]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(450);
        await page.screenshot({
          path: `visual-qa-products/${target.name}-intel-${slug}-${name}.png`,
          fullPage: false,
        });
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}
