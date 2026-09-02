import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const baseURL = process.env.HILTECH_QA_URL || 'http://127.0.0.1:3000';
const requestedTarget = process.env.HILTECH_QA_TARGET;
const targets = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
].filter((target) => !requestedTarget || target.name === requestedTarget);

if (targets.length === 0) {
  throw new Error(`Unknown HILTECH_QA_TARGET: ${requestedTarget}`);
}

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
  { name: 'company-top', path: '/company', selector: '.hiltech-company-hero' },
  { name: 'company-presence', path: '/company', selector: '.hiltech-company-presence' },
  { name: 'company-final', path: '/company', selector: '.hiltech-company-close' },
];

async function openAppPage(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-hiltech-app-ready]').waitFor({ state: 'attached', timeout: 120_000 });
}

await mkdir('visual-qa-closed-public-smoke', { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: target.width, height: target.height },
      deviceScaleFactor: 1,
      hasTouch: target.name === 'mobile',
      isMobile: target.name === 'mobile',
      reducedMotion: 'no-preference',
    });
    const page = await context.newPage();
    page.setDefaultNavigationTimeout(120_000);

    for (const check of checks) {
      await openAppPage(page, `${baseURL}${check.path}`);
      await page.locator(check.selector).scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await page.screenshot({
        path: `visual-qa-closed-public-smoke/${target.name}-${check.name}.png`,
        fullPage: false,
      });
    }

    console.log(`[continuity] ${target.name} primary navigation keeps route context`);
    await openAppPage(page, baseURL);
    if (target.name === 'mobile') {
      const menuButton = page.getByRole('button', { name: /Open navigation menu|Menu/i }).first();
      await menuButton.click();
      await page.locator('.hiltech-creative-mobile-panel').waitFor();
    }
    const solutionsNav = page.locator('[data-route-continuity-link="solutions"]:visible').first();
    await solutionsNav.click();
    const navContinuity = page.locator('[data-route-continuity-kind="nav"]');
    await navContinuity.waitFor({ state: 'attached' });
    await page.waitForURL('**/solutions');
    await navContinuity.waitFor({ state: 'detached' });

    console.log(`[continuity] ${target.name} Solutions carries system model into detail`);
    const solutionMapNodes = page.locator('[data-solution-map-node]');
    if (await solutionMapNodes.count() !== 6) throw new Error(`${target.name} interactive Solutions map nodes missing`);
    const fiberRow = page.locator('[data-solution-map-node="fiber-backbone"]');
    if (target.name === 'desktop') await fiberRow.hover();
    await page.waitForTimeout(140);
    await fiberRow.click();
    const solutionCarry = page.locator('[data-route-continuity-kind="solution"]');
    await solutionCarry.waitFor({ state: 'attached' });
    await page.screenshot({
      path: `visual-qa-closed-public-smoke/${target.name}-solution-route-carry.png`,
      fullPage: false,
    });
    await page.waitForURL('**/solutions/fiber-backbone');
    await page.locator('[data-solution-carry-target="fiber-backbone"]').waitFor();
    await solutionCarry.waitFor({ state: 'detached' });

    console.log(`[continuity] ${target.name} Home evidence carries into Work archive`);
    await openAppPage(page, baseURL);
    const workCarryLink = page.locator('[data-work-carry-link="rack-data-room"]');
    await workCarryLink.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    await workCarryLink.click();
    const workCarry = page.locator('[data-route-continuity-kind="work"]');
    await workCarry.waitFor({ state: 'attached' });
    await page.screenshot({
      path: `visual-qa-closed-public-smoke/${target.name}-work-route-carry.png`,
      fullPage: false,
    });
    await page.waitForURL('**/work');
    await page.locator('[data-work-carry-target="rack-data-room"]').first().waitFor({ state: 'attached' });
    await workCarry.waitFor({ state: 'detached' });

    console.log(`[interaction] ${target.name} Work evidence selection is URL-backed and navigable`);
    const workEvidenceButtons = page.locator('.hiltech-work-contact-sheet > button');
    if (await workEvidenceButtons.count() !== 4) throw new Error(`${target.name} Work evidence controls missing`);
    await workEvidenceButtons.nth(2).click();
    await page.waitForTimeout(520);
    if (!page.url().endsWith('#evidence-fiber-termination')) {
      throw new Error(`${target.name} Work evidence URL state missing: ${page.url()}`);
    }
    const selectedEvidence = (await page.locator('.hiltech-work-record-context strong').first().innerText()).toUpperCase();
    if (!selectedEvidence.includes('FIBER')) throw new Error(`${target.name} Work evidence state mismatch: ${selectedEvidence}`);
    const nextEvidence = page.locator('.hiltech-work-record-controls button').last();
    await nextEvidence.click();
    if (!page.url().endsWith('#evidence-testing-validation')) {
      throw new Error(`${target.name} Work next control did not update URL state: ${page.url()}`);
    }

    console.log(`[interaction] ${target.name} Product Dock routes into real catalog entry states`);
    await openAppPage(page, `${baseURL}/products-partners`);
    const dockEntries = page.locator('[data-product-dock-entry]');
    if (await dockEntries.count() !== 3) throw new Error(`${target.name} Product Dock entries missing`);
    await page.locator('[data-product-dock-entry="family"]').click();
    await page.waitForTimeout(700);
    if (!page.url().endsWith('#physical-library')) throw new Error(`${target.name} Product family entry did not resolve`);
    const familyEntryTop = await page.locator('#physical-library').evaluate((element) => element.getBoundingClientRect().top);
    if (familyEntryTop > target.height) throw new Error(`${target.name} Product family entry remained outside viewport`);

    console.log(`[interaction] ${target.name} Company operating map changes state`);
    await openAppPage(page, `${baseURL}/company`);
    const companyControls = page.locator('.hiltech-company-map-controls button');
    if (await companyControls.count() !== 4) throw new Error(`${target.name} Company map controls missing`);
    await companyControls.nth(1).click();
    const companyReadout = (await page.locator('.hiltech-company-map-readout strong').innerText()).toUpperCase();
    if (!companyReadout.includes('PARTS CONNECTED')) throw new Error(`${target.name} Company map readout did not update`);

    console.log(`[interaction] ${target.name} RFQ state board opens the live request stages`);
    await openAppPage(page, `${baseURL}/rfq`);
    const rfqStateControls = page.locator('.hiltech-rfq-live-state > button');
    if (await rfqStateControls.count() !== 3) throw new Error(`${target.name} RFQ state controls missing`);
    await rfqStateControls.first().click();
    await page.waitForTimeout(700);
    const ledgerTop = await page.locator('[data-rfq-ledger]').evaluate((element) => element.getBoundingClientRect().top);
    if (ledgerTop > target.height) throw new Error(`${target.name} RFQ ledger control did not reveal its stage`);

    if (target.name === 'mobile') {
      console.log('[mobile-contract] H07 selector stays image-adjacent');
      await openAppPage(page, baseURL);
      await page.locator('#h07').scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      const h07Layout = await page.evaluate(() => {
        const media = document.querySelector('.hiltech-catalog-media');
        const rail = document.querySelector('.hiltech-catalog-category-rail');
        const spec = document.querySelector('.hiltech-catalog-spec');
        if (!(media instanceof HTMLElement) || !(rail instanceof HTMLElement) || !(spec instanceof HTMLElement)) return null;
        const mediaRect = media.getBoundingClientRect();
        const railRect = rail.getBoundingClientRect();
        const specRect = spec.getBoundingClientRect();
        return {
          mediaBottom: mediaRect.bottom,
          railTop: railRect.top,
          railBottom: railRect.bottom,
          specTop: specRect.top,
          overflowX: getComputedStyle(rail).overflowX,
          railScrollWidth: rail.scrollWidth,
          railClientWidth: rail.clientWidth,
        };
      });
      if (!h07Layout) throw new Error('mobile H07 layout targets missing');
      if (h07Layout.railTop < h07Layout.mediaBottom - 2 || h07Layout.railBottom > h07Layout.specTop + 2) {
        throw new Error(`mobile H07 rail is not between media and specs: ${JSON.stringify(h07Layout)}`);
      }
      if (!['auto', 'scroll'].includes(h07Layout.overflowX) || h07Layout.railScrollWidth <= h07Layout.railClientWidth) {
        throw new Error(`mobile H07 category rail is not swipeable: ${JSON.stringify(h07Layout)}`);
      }
      await page.locator('.hiltech-catalog-category-rail').scrollIntoViewIfNeeded();
      await page.waitForTimeout(120);
      const h07ScrollBefore = await page.evaluate(() => window.scrollY);
      await page.locator('[data-product-category]').nth(1).click();
      await page.waitForTimeout(220);
      const selectedText = (await page.locator('.hiltech-catalog-media-meta').innerText()).toUpperCase();
      if (!selectedText.includes('COPPER')) throw new Error(`mobile H07 category switch did not update media state: ${selectedText}`);
      const h07ScrollAfter = await page.evaluate(() => window.scrollY);
      if (Math.abs(h07ScrollAfter - h07ScrollBefore) > 24) {
        throw new Error(`mobile H07 category switch moved viewport unexpectedly: ${h07ScrollBefore} -> ${h07ScrollAfter}`);
      }
      await page.screenshot({
        path: 'visual-qa-closed-public-smoke/mobile-home-h07-selector.png',
        fullPage: false,
      });

      console.log('[mobile-contract] Solutions inspector tracks scroll state');
      await openAppPage(page, `${baseURL}/solutions`);
      const solutionRows = page.locator('[data-solution-row]');
      if ((await solutionRows.count()) < 2) throw new Error('mobile solutions rows missing');
      await solutionRows.nth(1).scrollIntoViewIfNeeded();
      await page.waitForTimeout(420);
      const activeSolution = await page.locator('.hiltech-solutions-index-inspector').getAttribute('data-active-solution');
      if (activeSolution !== 'fiber-backbone') {
        throw new Error(`mobile solutions inspector did not follow scroll state: ${activeSolution}`);
      }
      const inspectorPosition = await page.locator('.hiltech-solutions-index-inspector').evaluate(
        (element) => getComputedStyle(element).position,
      );
      if (inspectorPosition !== 'sticky') {
        throw new Error(`mobile solutions inspector expected sticky, got ${inspectorPosition}`);
      }
      await page.screenshot({
        path: 'visual-qa-closed-public-smoke/mobile-solutions-live-inspector.png',
        fullPage: false,
      });

      console.log('[mobile-contract] Company map is visible by default and triggers on downward entry');
      await openAppPage(page, `${baseURL}/company`);
      const companyStage = page.locator('.hiltech-company-system-stage');
      const initialCompanyStageOpacity = await companyStage.evaluate(
        (stage) => Number.parseFloat(getComputedStyle(stage).opacity || '1'),
      );
      if (initialCompanyStageOpacity < 0.99) {
        throw new Error(`mobile Company map stage starts hidden: opacity=${initialCompanyStageOpacity}`);
      }

      const companyScrollTarget = await companyStage.evaluate((stage) => {
        const absoluteTop = stage.getBoundingClientRect().top + window.scrollY;
        return Math.max(0, absoluteTop - window.innerHeight * 0.88);
      });

      for (let y = 0; y < companyScrollTarget; y += 120) {
        await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
        await page.waitForTimeout(16);
      }
      await page.evaluate((nextY) => window.scrollTo(0, nextY), companyScrollTarget);
      await page.waitForTimeout(180);

      const companyAnimated = await companyStage.getAttribute('data-company-map-animated');
      if (companyAnimated !== 'true') {
        throw new Error('mobile Company map did not trigger during normal downward scroll');
      }

      const companyLine = page.locator('[data-company-system-line]');
      await page.waitForTimeout(1450);
      const finalDash = await companyLine.evaluate((line) => ({
        dasharray: getComputedStyle(line).strokeDasharray,
        dashoffset: getComputedStyle(line).strokeDashoffset,
      }));
      if (finalDash.dashoffset !== '0px' && finalDash.dashoffset !== '0') {
        throw new Error(`mobile Company map did not settle after animation: ${JSON.stringify(finalDash)}`);
      }
      await page.screenshot({
        path: 'visual-qa-closed-public-smoke/mobile-company-map-motion.png',
        fullPage: false,
      });
    }

    await context.close();
  }

  console.log('[continuity] reduced-motion route navigation remains direct');
  const reducedContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    isMobile: true,
    hasTouch: true,
  });
  const reducedPage = await reducedContext.newPage();
  reducedPage.setDefaultNavigationTimeout(120_000);
  await openAppPage(reducedPage, baseURL);
  const reducedMenu = reducedPage.getByRole('button', { name: /Open navigation menu|Menu/i }).first();
  await reducedMenu.click();
  await reducedPage.locator('.hiltech-creative-mobile-panel').waitFor();
  await reducedPage.locator('[data-route-continuity-link="solutions"]:visible').first().click();
  await reducedPage.waitForURL('**/solutions');
  const reducedOverlay = await reducedPage.locator('[data-route-continuity]').count();
  if (reducedOverlay) {
    throw new Error('reduced-motion route navigation rendered a continuity overlay');
  }
  await reducedContext.close();
} finally {
  await browser.close();
}
