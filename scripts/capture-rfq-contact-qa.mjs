import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';
const storageKey = 'hiltech_rfq_basket_v2';

const seededItems = [
  {
    id: 'legrand-category-6-uutp-lszh-cable-305m-blue',
    name: 'Legrand Category 6 U/UTP LSZH Cable 305M Blue',
    category: 'Copper / CAT6 Cabling',
    brand: 'Legrand',
    specs: 'Category 6 U/UTP LSZH cable, 305m box.',
    quantity: 2,
    unit: 'pcs',
    notes: '',
    priceNote: null,
  },
  {
    id: 'legrand-rj45-socket-category-6-utp-1-module-white',
    name: 'Legrand RJ45 Socket Category 6 UTP 1 Module White',
    category: 'Faceplates / Keystone / RJ45',
    brand: 'Legrand',
    specs: 'Category 6 UTP RJ45 outlet module.',
    quantity: 6,
    unit: 'pcs',
    notes: '',
    priceNote: null,
  },
];

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir('visual-qa-rfq-contact', { recursive: true });

async function assertNoHorizontalOverflow(page, label) {
  const state = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (state.scrollWidth > state.clientWidth + 1) {
    throw new Error(`${label} horizontal overflow: ${JSON.stringify(state)}`);
  }
}

async function openWithBasket(context, items) {
  await context.addInitScript(({ key, value }) => {
    localStorage.setItem(key, JSON.stringify(value));
  }, { key: storageKey, value: items });
  const page = await context.newPage();
  return page;
}

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    {
      const context = await browser.newContext({
        viewport: { width: target.width, height: target.height },
        deviceScaleFactor: 1,
      });
      const page = await openWithBasket(context, []);
      const response = await page.goto(`${baseURL}/rfq`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) throw new Error(`${target.name} RFQ empty route failed`);
      await page.locator('header.hiltech-creative-header').waitFor();
      await page.locator('[data-rfq-empty]').waitFor();
      await assertNoHorizontalOverflow(page, `${target.name} RFQ empty`);
      await page.screenshot({
        path: `visual-qa-rfq-contact/${target.name}-rfq-empty.png`,
        fullPage: false,
      });
      await context.close();
    }

    {
      const context = await browser.newContext({
        viewport: { width: target.width, height: target.height },
        deviceScaleFactor: 1,
      });
      const page = await openWithBasket(context, seededItems);

      await page.route('**/api/rfq', async (route) => {
        if (route.request().method() === 'POST') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ ok: true, id: 'qa-request', requestCode: 'RFQ-QA-20260831' }),
          });
          return;
        }
        await route.continue();
      });

      const response = await page.goto(`${baseURL}/rfq`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) throw new Error(`${target.name} RFQ populated route failed`);
      await page.locator('[data-rfq-item]').first().waitFor();

      const legacy = await page.locator(
        '.hiltech-rfq-page .rounded-xl, .hiltech-rfq-page .rounded-2xl, .hiltech-rfq-page .bg-gradient-to-br, .hiltech-rfq-page .bg-orange-600',
      ).count();
      if (legacy) throw new Error(`RFQ contains ${legacy} legacy rounded/gradient markers`);

      await page.locator('[data-rfq-ledger]').scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `visual-qa-rfq-contact/${target.name}-rfq-ledger.png`,
        fullPage: false,
      });

      const firstQty = page.locator('[data-rfq-item]').first().locator('.hiltech-rfq-quantity strong');
      const beforeQty = Number((await firstQty.innerText()).trim());
      await page.locator('[data-rfq-item]').first().getByRole('button', { name: 'Increase quantity' }).click();
      const afterQty = Number((await firstQty.innerText()).trim());
      if (afterQty !== beforeQty + 1) throw new Error(`RFQ quantity edit failed: ${beforeQty} -> ${afterQty}`);

      const scope = page.locator('[data-rfq-scope]');
      if (await scope.count()) {
        await scope.scrollIntoViewIfNeeded();
        await page.screenshot({
          path: `visual-qa-rfq-contact/${target.name}-rfq-scope.png`,
          fullPage: false,
        });
        const suggestion = scope.locator('.hiltech-rfq-scope-suggestions button').first();
        if (await suggestion.count()) {
          const itemCountBefore = await page.locator('[data-rfq-item]').count();
          await suggestion.click();
          await page.locator('[data-rfq-ledger]').scrollIntoViewIfNeeded();
          await page.waitForTimeout(250);
          const itemCountAfter = await page.locator('[data-rfq-item]').count();
          if (itemCountAfter <= itemCountBefore) {
            throw new Error('RFQ scope suggestion did not add a reference');
          }
        }
      }

      await page.locator('[data-rfq-project]').scrollIntoViewIfNeeded();
      await page.screenshot({
        path: `visual-qa-rfq-contact/${target.name}-rfq-project-sheet.png`,
        fullPage: false,
      });

      await page.locator('[data-rfq-submit-button]').click();
      await page.locator('[data-rfq-field="fullName"]').waitFor();
      const fullNameError = await page.locator('[data-rfq-field="fullName"] + small').count();
      if (!fullNameError) throw new Error('RFQ required-field validation did not surface');

      await page.locator('[data-rfq-field="fullName"]').fill('QA User');
      await page.locator('[data-rfq-field="phoneNumber"]').fill('01000087808');
      await page.locator('[data-rfq-field="emailAddress"]').fill('qa@example.com');
      await page.locator('[data-rfq-field="companyName"]').fill('QA Company');
      await page.locator('[data-rfq-field="projectLocation"]').fill('Cairo');
      await page.locator('[data-rfq-field="projectNotes"]').fill('Visual QA project request.');

      await page.locator('[data-rfq-submit-button]').click();
      const receipt = page.locator('[data-rfq-success]');
      await receipt.waitFor();
      const requestCode = (await page.locator('.hiltech-rfq-receipt-code strong').innerText()).trim();
      if (requestCode !== 'RFQ-QA-20260831') throw new Error(`RFQ receipt code mismatch: ${requestCode}`);
      await receipt.scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      const receiptBox = await receipt.boundingBox();
      if (!receiptBox || receiptBox.height < 180) throw new Error('RFQ receipt did not render at meaningful visual size');
      await page.screenshot({
        path: `visual-qa-rfq-contact/${target.name}-rfq-receipt.png`,
        fullPage: false,
      });

      await assertNoHorizontalOverflow(page, `${target.name} RFQ populated`);
      await context.close();
    }

    {
      const context = await browser.newContext({
        viewport: { width: target.width, height: target.height },
        deviceScaleFactor: 1,
      });
      const page = await context.newPage();
      const response = await page.goto(`${baseURL}/contact`, { waitUntil: 'networkidle' });
      if (!response || !response.ok()) throw new Error(`${target.name} Contact route failed`);
      await page.locator('header.hiltech-creative-header').waitFor();

      const legacy = await page.locator(
        '.hiltech-contact-page .rounded-xl, .hiltech-contact-page .rounded-2xl, .hiltech-contact-page .bg-gradient-to-br, .hiltech-contact-page .bg-orange-600',
      ).count();
      if (legacy) throw new Error(`Contact contains ${legacy} legacy rounded/gradient markers`);

      for (const [name, selector] of [
        ['hero', '.hiltech-contact-hero'],
        ['channels', '.hiltech-contact-channels'],
        ['prepare', '.hiltech-contact-prepare'],
        ['close', '.hiltech-contact-close'],
      ]) {
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await page.screenshot({
          path: `visual-qa-rfq-contact/${target.name}-contact-${name}.png`,
          fullPage: false,
        });
      }

      const body = await page.locator('.hiltech-contact-channels').innerText();
      if (!body.includes('01000087808') || !body.includes('01555357807') || !body.includes('info@hiltech-eg.com') || !body.includes('Zahraa El Maadi')) {
        throw new Error('Contact verified channel/presence data incomplete');
      }

      const rfqHref = await page.locator('.hiltech-contact-paths a').first().getAttribute('href');
      if (rfqHref !== '/rfq') throw new Error(`Contact RFQ path mismatch: ${rfqHref}`);

      await assertNoHorizontalOverflow(page, `${target.name} Contact`);
      await context.close();
    }
  }

  const reducedContext = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    reducedMotion: 'reduce',
  });
  const reducedPage = await openWithBasket(reducedContext, seededItems);
  const reducedResponse = await reducedPage.goto(`${baseURL}/rfq`, { waitUntil: 'networkidle' });
  if (!reducedResponse || !reducedResponse.ok()) throw new Error('Reduced-motion RFQ route failed');
  await assertNoHorizontalOverflow(reducedPage, 'reduced-motion RFQ');
  await reducedPage.screenshot({
    path: 'visual-qa-rfq-contact/reduced-motion-rfq.png',
    fullPage: false,
  });
  await reducedContext.close();
} finally {
  await browser.close();
}
