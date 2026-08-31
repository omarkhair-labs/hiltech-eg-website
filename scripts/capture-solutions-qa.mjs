import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';

const routes = [
  { name: 'index', path: '/solutions', checkpoints: ['top', 'field', 'cta'] },
  { name: 'structured-cabling', path: '/solutions/structured-cabling', checkpoints: ['top', 'problem', 'route', 'rfq'] },
  { name: 'fiber-backbone', path: '/solutions/fiber-backbone', checkpoints: ['top', 'problem', 'route', 'rfq'] },
  { name: 'data-rooms', path: '/solutions/data-rooms', checkpoints: ['top', 'problem', 'route', 'rfq'] },
  { name: 'cctv-infrastructure', path: '/solutions/cctv-infrastructure', checkpoints: ['top', 'problem', 'route', 'rfq'] },
  { name: 'network-testing', path: '/solutions/network-testing', checkpoints: ['top', 'problem', 'route', 'rfq'] },
  { name: 'project-supply-rfq', path: '/solutions/project-supply-rfq', checkpoints: ['top', 'problem', 'route', 'rfq'] },
];

const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const selectors = {
  index: {
    top: '.hiltech-solutions-index-hero',
    field: '.hiltech-solutions-index-field',
    cta: '.hiltech-solutions-index-cta',
  },
  detail: {
    top: '.hiltech-solution-detail-hero',
    problem: '.hiltech-solution-detail-problem',
    route: '.hiltech-solution-detail-route',
    rfq: '.hiltech-solution-detail-rfq',
  },
};

await mkdir('visual-qa-solutions', { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });

    const page = await context.newPage();

    for (const route of routes) {
      await page.goto(`${baseURL}${route.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      const map = route.name === 'index' ? selectors.index : selectors.detail;

      for (const checkpoint of route.checkpoints) {
        const selector = map[checkpoint];
        await page.locator(selector).scrollIntoViewIfNeeded();
        await page.waitForTimeout(850);
        await page.screenshot({
          path: `visual-qa-solutions/${target.name}-${route.name}-${checkpoint}.png`,
          fullPage: false,
        });
      }

      if (route.name === 'index' && target.name === 'desktop') {
        const rows = page.locator('[data-solution-row]');
        for (const index of [0, Math.max(0, (await rows.count()) - 1)]) {
          await rows.nth(index).focus();
          await page.waitForTimeout(420);
          await page.screenshot({
            path: `visual-qa-solutions/desktop-index-state-${index + 1}.png`,
            fullPage: false,
          });
        }
      }
    }

    await context.close();
  }
} finally {
  await browser.close();
}
