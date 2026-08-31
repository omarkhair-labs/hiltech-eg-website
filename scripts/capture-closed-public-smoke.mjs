import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';
const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

const checks = [
  { name: 'home-top', path: '/', selector: '#h01' },
  { name: 'home-final', path: '/', selector: '#h12' },
  { name: 'solutions-index', path: '/solutions', selector: '.hiltech-solutions-index-hero' },
  { name: 'solutions-detail', path: '/solutions/fiber-backbone', selector: '.hiltech-solution-detail-hero' },
  { name: 'services-top', path: '/services', selector: '.hiltech-services-hero' },
  { name: 'services-final', path: '/services', selector: '.hiltech-services-handover' },
  { name: 'products-top', path: '/products-partners', selector: '.hiltech-products-hero' },
  { name: 'products-world', path: '/products-partners', selector: '[data-product-world]' },
  { name: 'products-intelligence', path: '/products-partners/intelligence/fiber-optic-systems', selector: '.hiltech-product-intelligence-hero' },
  { name: 'work-top', path: '/work', selector: '.hiltech-work-hero' },
  { name: 'work-evidence', path: '/work', selector: '.hiltech-work-index' },
  { name: 'work-final', path: '/work', selector: '.hiltech-work-close' },
];

await mkdir('visual-qa-closed-public-smoke', { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();

    for (const check of checks) {
      await page.goto(`${baseURL}${check.path}`, { waitUntil: 'networkidle' });
      await page.locator(check.selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({
        path: `visual-qa-closed-public-smoke/${target.name}-${check.name}.png`,
        fullPage: false,
      });
    }

    await context.close();
  }
} finally {
  await browser.close();
}
