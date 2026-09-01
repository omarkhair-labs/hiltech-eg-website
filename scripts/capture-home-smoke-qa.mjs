import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000/';
const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir('visual-qa-home-smoke', { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);

    for (const id of ['h01', 'h12']) {
      await page.evaluate((chapter) => {
        const element = document.getElementById(chapter);
        if (!element) throw new Error(`Missing Home smoke chapter: ${chapter}`);
        const top = element.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      }, id);
      await page.waitForTimeout(800);
      await page.screenshot({
        path: `visual-qa-home-smoke/${target.name}-${id}.png`,
        fullPage: false,
      });
    }
    await context.close();
  }
} finally {
  await browser.close();
}
