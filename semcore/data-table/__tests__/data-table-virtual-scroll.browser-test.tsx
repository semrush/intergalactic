import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Keyboard scroll', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx', 'en');

    await page.keyboard.press('Tab');
    for (let i = 0; i < 50; i++) {
      await page.keyboard.press('ArrowDown', { delay: 50 });
    }
    await page.waitForSelector('[role="gridcell"][data-ui-name="Row.Cell"][name="id"]:has-text("#50")', { state: 'visible' });
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Mouse scroll', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx', 'en');

    await locators.dataTable(page).hover();
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });

  test('Verify Mouse scroll when cells have different height', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/virtualization/header-content.tsx', 'en');

    const dataTable = page.locator('[data-ui-name="Body.Row"]');
    await dataTable.first().hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  const STORY = 'stories/components/data-table/tests/examples/virtualization/virtual-scroll-controls.tsx';

  const scrollTo = (scrollContainer: ReturnType<typeof locators.dataTable>, amount: number) =>
    scrollContainer.evaluate((el: HTMLElement, px) => {
      el.scrollTop = px;
      el.dispatchEvent(new Event('scroll', { bubbles: true }));
    }, amount);

  const firstRenderedRowIndex = (page: Parameters<typeof locators.dataTable>[0]) =>
    page
      .locator('[data-ui-name="Body.Row"]')
      .first()
      .evaluate((el) => parseInt(el.getAttribute('aria-rowindex') ?? '0', 10));

  test('Verify virtual scroll renders fewer DOM rows than total', {
    tag: [TAG.PRIORITY_HIGH, '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { mode: 'boolean' });

    const grid = locators.dataTable(page);
    await expect(grid).toHaveAttribute('aria-rowcount', '500');
    const count = await page.locator('[data-ui-name="Body.Row"]').count();
    expect(count).toBeLessThan(500);
  });

  test('Verify rowHeight mode sets valid grid-template-rows (CSS bracket fix)', {
    tag: [TAG.PRIORITY_HIGH, '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { mode: 'rowHeight', rowHeight: 50 });

    const gridTemplateRows = await locators.dataTable(page).evaluate(
      (el) => getComputedStyle(el).gridTemplateRows,
    );
    // If bracket was missing in repeat(), browser ignores the rule and returns 'none'
    expect(gridTemplateRows).not.toBe('none');
    expect(gridTemplateRows).toMatch(/\d+px/);
  });

  test('Verify rowHeight mode scrolls to correct row by fixed offset', {
    tag: [TAG.PRIORITY_HIGH, '@data-table'],
  }, async ({ page }) => {
    const rowHeight = 40;
    await loadPage(page, STORY, 'en', { mode: 'rowHeight', rowHeight });

    const sc = page.locator('[data-ui-name="ScrollArea.Container"]');
    await scrollTo(sc, rowHeight * 20);
    await page.locator('[role="row"][aria-rowindex="21"]').waitFor({ state: 'attached' });

    await expect(page.locator('[role="row"][aria-rowindex="2"]')).toHaveCount(0);
    await expect(page.locator('[role="row"][aria-rowindex="21"]')).toHaveCount(1);
  });

  test('Verify rowsBufferOnly routes to auto-height branch, not rowHeight (routing fix)', {
    tag: [TAG.PRIORITY_HIGH, '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { mode: 'rowsBufferOnly', rowsBuffer: 5 });

    const grid = locators.dataTable(page);
    const gridTemplateRows = await grid.evaluate((el: HTMLElement) => el.style.gridTemplateRows);
    expect(gridTemplateRows).toBe('');

    await expect(grid).toHaveAttribute('aria-rowcount', '500');
    const count = await page.locator('[data-ui-name="Body.Row"]').count();
    expect(count).toBeLessThan(500);
  });

  test('Verify scroll down then up restores row #1 position', {
    tag: [TAG.PRIORITY_HIGH, '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, STORY, 'en', { mode: 'aproxRowsOnPage', rowsBuffer: 10, aproxRowsOnPage: 10 });

    const sc = page.locator('[data-ui-name="ScrollArea.Container"]');
    await scrollTo(sc, 1000);
    await scrollTo(sc, 0);

    const firstRow = page.locator('[role="row"][aria-rowindex="2"]');
    await expect(firstRow).toBeVisible();
    await expect(firstRow.locator('[data-ui-name="Row.Cell"]').first()).toContainText('#1');
  });

  test('Verify keyboard interactions with accordion and chart inside', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/virtualization/accordion-inside-table.tsx', 'en');

    const plot = page.locator('[data-ui-name="Plot"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'hidden' });
    await expect(plot).toHaveCount(0);

    await expect(locators.toggle(page).first()).toBeFocused();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(plot).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    await expect(locators.toggle(page).nth(1)).toBeFocused();

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(1);

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'hidden' });
    await expect(plot).toHaveCount(0);

    await page.keyboard.press('Enter');
    await plot.waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(locators.toggle(page).nth(2)).toBeFocused();
  });

  test('Verify mouse interactions with accordion and chart inside', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/virtualization/accordion-inside-table.tsx', 'en');

    const plot = page.locator('[data-ui-name="Plot"]');

    await locators.toggle(page).first().click();
    await plot.waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(1);
    await locators.toggle(page).first().click();
    await plot.waitFor({ state: 'hidden' });
    await expect(plot).toHaveCount(0);

    await locators.toggle(page).first().click();

    await locators.toggle(page).nth(2).click();
    await plot.nth(1).waitFor({ state: 'visible' });
    await expect(plot).toHaveCount(2);
  });

  test('Verify keyboard scroll for table with different height', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/virtual-scroll-in-table-different-height.tsx', 'en');

    await page.keyboard.press('Tab');
    for (let i = 0; i < 100; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(500);
    await expect(locators.getCell(page, 101, 1)).toBeVisible();
    await expect(page.getByText('#101')).toBeVisible();
  });
});
