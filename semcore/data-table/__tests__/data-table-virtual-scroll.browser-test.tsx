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
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
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

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
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
