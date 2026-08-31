import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';
const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const checkpoints = [
  ['hero', '.hiltech-services-hero'],
  ['lifecycle', '.hiltech-services-lifecycle'],
  ['field', '.hiltech-services-field'],
  ['testing', '.hiltech-services-testing'],
  ['handover', '.hiltech-services-handover'],
];

await mkdir('visual-qa-services', { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();

    await page.goto(`${baseURL}/services`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    for (const [name, selector] of checkpoints) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(900);
      await page.screenshot({
        path: `visual-qa-services/${target.name}-${name}.png`,
        fullPage: false,
      });
    }

    if (target.name === 'desktop') {
      const stages = page.locator('[data-service-stage]');
      for (const index of [0, 2, Math.max(0, (await stages.count()) - 1)]) {
        await stages.nth(index).scrollIntoViewIfNeeded();
        await page.waitForTimeout(650);
        await page.screenshot({
          path: `visual-qa-services/desktop-lifecycle-state-${index + 1}.png`,
          fullPage: false,
        });
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}
