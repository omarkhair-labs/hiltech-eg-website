import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
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

async function assertNoHorizontalClip(page, selector, label) {
  const locator = page.locator(selector).first();
  await locator.waitFor();
  const state = await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return {
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
      left: rect.left,
      right: rect.right,
      viewportWidth: window.innerWidth,
    };
  });
  if (
    state.scrollWidth > state.clientWidth + 1 ||
    state.left < -1 ||
    state.right > state.viewportWidth + 1
  ) {
    throw new Error(
      `${label} clips horizontally: ${JSON.stringify(state)}`,
    );
  }
}

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
    await page.waitForTimeout(1000);

    const initialWorldCode = (await page.locator('.hiltech-product-world-topline strong').innerText()).trim();
    const initialWorldLabel = (await page.locator('.hiltech-product-world-stage-label span').innerText()).trim();
    if (initialWorldCode !== 'SYSTEM / 00' || !initialWorldLabel.includes('ALL SYSTEMS')) {
      throw new Error(`All-systems world is inconsistent: code=${initialWorldCode}, label=${initialWorldLabel}`);
    }

    for (const [name, selector] of [
      ['hero', '.hiltech-products-hero'],
      ['world', '[data-product-world]'],
      ['filters', '[data-products-filters]'],
      ['results', '[data-products-results]'],
    ]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(750);
      await page.screenshot({
        path: `visual-qa-products/${target.name}-catalog-${name}.png`,
        fullPage: false,
      });
    }

    const familyButtons = page.locator('[data-product-family]');
    const familyCount = await familyButtons.count();
    if (familyCount < 5) throw new Error(`Expected at least 5 live product families, got ${familyCount}`);

    if (target.name === 'desktop') {
      const worldIndexes = [0, 1, Math.max(0, familyCount - 2), familyCount - 1];
      for (const index of [...new Set(worldIndexes)]) {
        await familyButtons.nth(index).click();
        await page.waitForTimeout(650);
        await page.screenshot({
          path: `visual-qa-products/desktop-world-family-${index + 1}.png`,
          fullPage: false,
        });
      }
    }

    const detailCodes = await page.locator('[data-product-card] .hiltech-product-code').evaluateAll((nodes) =>
      nodes.map((node) => node.textContent?.trim()).filter(Boolean).slice(0, 3),
    );
    if (detailCodes.length < 1) throw new Error('No real product codes found from the live catalog');

    const firstRow = page.locator('[data-product-card]').first();
    const firstCode = (await firstRow.locator('.hiltech-product-code').innerText()).trim();
    const search = page.locator('[data-products-filters] input').first();
    await search.fill(firstCode);
    await page.waitForTimeout(650);
    if ((await page.locator('[data-product-card]').count()) < 1) throw new Error('Product-code search returned no products');
    await page.screenshot({
      path: `visual-qa-products/${target.name}-catalog-code-search.png`,
      fullPage: false,
    });

    const clearFilters = async () => {
      const clear = page.locator('.hiltech-product-finder-active button');
      if (await clear.count()) {
        await clear.first().click();
        await page.waitForTimeout(450);
      }
    };
    await clearFilters();

    const brandButtons = page.locator('.hiltech-product-brand-index button');
    if ((await brandButtons.count()) > 1) {
      await brandButtons.nth(1).click();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: `visual-qa-products/${target.name}-catalog-brand-filter.png`,
        fullPage: false,
      });
    }
    await clearFilters();

    if (target.name === 'desktop') {
      const row = page.locator('[data-product-card]').first();
      await row.getByRole('button', { name: /add to rfq/i }).click();
      await page.waitForTimeout(600);
      await page.screenshot({
        path: 'visual-qa-products/desktop-catalog-rfq-added.png',
        fullPage: false,
      });

      await page.getByRole('button', { name: /rfq basket/i }).click();
      await page.waitForTimeout(500);
      await page.locator('.hiltech-product-rfq-overlay aside').waitFor();
      await page.screenshot({
        path: 'visual-qa-products/desktop-catalog-rfq-drawer.png',
        fullPage: false,
      });

      const close = page.getByRole('button', { name: /^close$/i });
      if (await close.count()) {
        await close.click();
        await page.waitForTimeout(350);
      }

      await page.getByRole('button', { name: /build by project/i }).click();
      await page.waitForTimeout(550);
      await page.locator('[data-project-builder]').waitFor();
      await page.screenshot({
        path: 'visual-qa-products/desktop-catalog-project-mode.png',
        fullPage: false,
      });
    }

    for (let detailIndex = 0; detailIndex < detailCodes.length; detailIndex += 1) {
      const detailCode = detailCodes[detailIndex];
      const detailURL = `${baseURL}/products-partners/${encodeURIComponent(detailCode)}`;
      const response = await page.goto(detailURL, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) {
        throw new Error(`Product detail failed for ${detailCode}: ${response?.status() ?? 'no response'}`);
      }
      await page.waitForTimeout(750);

      for (const [name, selector] of [
        ['object', '.hiltech-product-v2-stage'],
        ['position', '.hiltech-product-v2-position'],
        ['ledger', '.hiltech-product-v2-ledger'],
        ['related', '.hiltech-product-v2-related'],
        ['rfq', '.hiltech-product-v2-rfq'],
      ]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(550);
        await page.screenshot({
          path: `visual-qa-products/${target.name}-detail-${detailIndex + 1}-${name}.png`,
          fullPage: false,
        });
      }
    }

    if (target.name === 'desktop' && detailCodes.length) {
      const arabicDetailURL = `${baseURL}/ar/products-partners/${encodeURIComponent(detailCodes[0])}`;
      const arabicResponse = await page.goto(arabicDetailURL, { waitUntil: 'networkidle' });
      if (!arabicResponse || !arabicResponse.ok()) {
        throw new Error(`Arabic product detail failed for ${detailCodes[0]}: ${arabicResponse?.status() ?? 'no response'}`);
      }
      await page.locator('main[dir="rtl"]').waitFor();
      await page.screenshot({
        path: 'visual-qa-products/desktop-arabic-unicode-detail-smoke.png',
        fullPage: false,
      });
    }

    for (const slug of intelligenceSlugs) {
      await page.goto(`${baseURL}/products-partners/intelligence/${slug}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);

      const diagramCount = await page.locator('[data-intel-system-diagram]').count();
      if (diagramCount !== 1) throw new Error(`${slug} expected one semantic system diagram, got ${diagramCount}`);

      const legacyClientCount = await page.locator(
        '[data-intel-rfq].rounded-2xl, [data-intel-product].rounded-2xl, [data-intel-final].rounded-2xl',
      ).count();
      if (legacyClientCount) {
        throw new Error(`${slug} still contains legacy rounded intelligence shells`);
      }

      if (target.name === 'mobile') {
        await assertNoHorizontalClip(page, '.hiltech-product-intelligence-hero h1', `${slug} mobile intelligence title`);
        await assertNoHorizontalClip(page, '.hiltech-product-intelligence-hero-grid > div:first-child > p', `${slug} mobile intelligence intro`);
        await assertNoHorizontalClip(page, '.hiltech-product-intelligence-summary > strong', `${slug} mobile intelligence summary`);
        await assertNoHorizontalClip(page, '[data-intel-rfq] h2', `${slug} mobile RFQ translation title`);
        await assertNoHorizontalClip(page, '[data-intel-products] h2', `${slug} mobile reference index title`);
        await assertNoHorizontalClip(page, '[data-intel-final] h2', `${slug} mobile procurement close title`);
      }

      for (const [name, selector] of [
        ['top', '.hiltech-product-intelligence-hero'],
        ['system', '.hiltech-product-intelligence-diagram-section'],
        ['planning', '.hiltech-product-intelligence-planning'],
        ['compatibility', '.hiltech-product-intelligence-compatibility'],
        ['connections', '.hiltech-product-intelligence-link-grid'],
        ['rfq-translation', '[data-intel-rfq]'],
        ['references', '[data-intel-products]'],
        ['close', '[data-intel-final]'],
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
