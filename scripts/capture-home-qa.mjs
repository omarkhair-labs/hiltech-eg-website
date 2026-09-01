import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000/';
const chapters = ['h01', 'h02', 'h03', 'h04', 'h05', 'h06', 'h07', 'h08', 'h09', 'h10', 'h11', 'h12'];
const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];

await mkdir('visual-qa', { recursive: true });

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
    await page.waitForTimeout(1200);

    for (const chapter of chapters) {
      await page.evaluate((id) => {
        const element = document.getElementById(id);
        if (!element) throw new Error(`Missing QA chapter: ${id}`);
        const top = element.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      }, chapter);

      await page.waitForTimeout(1800);
      await page.screenshot({
        path: `visual-qa/${target.name}-${chapter}.png`,
        fullPage: false,
      });

      if (chapter === 'h07' && target.name === 'desktop') {
        const tabs = page.locator('[data-product-category]');
        const tabCount = await tabs.count();
        for (let tabIndex = 0; tabIndex < tabCount; tabIndex += 1) {
          await tabs.nth(tabIndex).focus();
          await page.waitForTimeout(480);
          await page.screenshot({
            path: `visual-qa/desktop-h07-categories-${tabIndex + 1}.png`,
            fullPage: false,
          });
        }
      }

      if (chapter === 'h08' && target.name === 'desktop') {
        const brands = page.locator('[data-brand-row]');
        const count = Math.min(await brands.count(), 4);
        for (let index = 0; index < count; index += 1) {
          await brands.nth(index).focus();
          await page.waitForTimeout(420);
          await page.screenshot({
            path: `visual-qa/desktop-h08-brands-${index + 1}.png`,
            fullPage: false,
          });
        }
      }

      if (chapter === 'h10' && target.name === 'desktop') {
        const tabs = page.locator('.hiltech-validation-mode-tabs button');
        const count = await tabs.count();
        for (let index = 0; index < count; index += 1) {
          await tabs.nth(index).focus();
          await page.waitForTimeout(420);
          await page.screenshot({
            path: `visual-qa/desktop-h10-mode-${index + 1}.png`,
            fullPage: false,
          });
        }
      }
    }

    await context.close();
  }

  const motionContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    recordVideo: {
      dir: 'visual-qa/video-temp',
      size: { width: 1440, height: 1000 },
    },
  });

  const motionPage = await motionContext.newPage();
  const motionVideo = motionPage.video();
  await motionPage.goto(baseURL, { waitUntil: 'networkidle' });
  await motionPage.waitForTimeout(900);

  const maxScroll = await motionPage.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );

  const checkpoints = [0, 0.08, 0.18, 0.3, 0.42, 0.54, 0.66, 0.78, 0.9, 1];
  for (const checkpoint of checkpoints) {
    await motionPage.evaluate((top) => {
      window.scrollTo({ top, behavior: 'smooth' });
    }, Math.round(maxScroll * checkpoint));
    await motionPage.waitForTimeout(850);
  }

  await motionPage.close();
  if (motionVideo) {
    await motionVideo.saveAs('visual-qa/desktop-motion.webm');
  }
  await motionContext.close();

  const processContext = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: 'no-preference',
    recordVideo: {
      dir: 'visual-qa/process-video-temp',
      size: { width: 1440, height: 1000 },
    },
  });

  const processPage = await processContext.newPage();
  const processVideo = processPage.video();
  await processPage.goto(baseURL, { waitUntil: 'networkidle' });
  await processPage.waitForTimeout(700);

  const processBounds = await processPage.evaluate(() => {
    const element = document.getElementById('h05');
    if (!element) throw new Error('Missing QA chapter: h05');
    const top = element.getBoundingClientRect().top + window.scrollY - 64;
    const bottom = top + element.offsetHeight - window.innerHeight + 64;
    return { top: Math.max(0, top), bottom: Math.max(top, bottom) };
  });

  for (let index = 0; index <= 12; index += 1) {
    const progress = index / 12;
    const top = Math.round(
      processBounds.top + (processBounds.bottom - processBounds.top) * progress,
    );
    await processPage.evaluate((scrollTop) => {
      window.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }, top);
    await processPage.waitForTimeout(520);
  }

  await processPage.close();
  if (processVideo) {
    await processVideo.saveAs('visual-qa/h05-motion.webm');
  }
  await processContext.close();
} finally {
  await browser.close();
}
