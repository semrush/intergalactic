import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  tooltip: (page: Page, index?: number) => {
    const base = page.getByRole('tooltip');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  ellipsisContent: (page: Page) => page.locator('[data-ui-name="Ellipsis.Content"]'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */

test.describe(`${TAG.VISUAL} `, () => {
  const variables = [
    { trim: 'end', maxLine: 1, tooltip: true },
    { trim: 'end', maxLine: undefined, tooltip: false },
    { trim: 'end', maxLine: 2, tooltip: undefined },
    { trim: 'end', maxLine: 4, tooltip: true },
    { trim: 'middle', maxLine: 1, tooltip: true },
    { trim: 'middle', maxLine: 3, tooltip: false },
  ];
  variables.forEach((item) => {
    test(`Verify Ellipsis in Text with trimType = ${item.trim} maxLine=${item.maxLine} and tooltip=${item.tooltip}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/ellipsis/docs/examples/advanced_use.tsx', 'en', item);

      const box = await locators.ellipsisContent(page).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      if (item.tooltip !== false) {
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      } else {
        await expect(page).toHaveScreenshot();
      }
    });

    test(`Verify Ellipsis in Link with trimType = ${item.trim} maxLine=${item.maxLine} and tooltip=${item.tooltip}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@ellipsis',
        '@link'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/ellipsis/docs/examples/basic_usage.tsx', 'en', item);

      const ellipsisContent = page.getByRole('link');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      if (item.tooltip !== false && item.maxLine !== 4) {
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(locators.tooltip(page)).toHaveCount(1);
        await expect(page).toHaveScreenshot();
      } else {
        if (browserName === 'webkit') return; // skipped because of the bug UIK-4513
        await expect(locators.tooltip(page)).toHaveCount(0);
        await expect(page).toHaveScreenshot();
      }
      // Focus on link doesnt work and ellipsis will not shown in this implementation
    });
  });

  const variablesTrim = [
    { trim: 'end' },
    { trim: 'middle' },
  ];
  variablesTrim.forEach((item) => {
    test(`Verify Ellipsis position with cursor anchoring with trimType = ${item.trim} `, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/ellipsis/docs/examples/tooltip-cursor-anchoring.tsx', 'en', item);

      const box = await locators.ellipsisContent(page).boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width - 2, box.y + box.height / 2);
        await locators.tooltip(page).waitFor({ state: 'visible' });
        await expect(locators.tooltip(page)).toHaveCount(1);

        await expect(page).toHaveScreenshot();
      }
    });

    test(`Verify Ellipsis in table cell with Text and trimType = ${item.trim} `, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@ellipsis'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/ellipsis/docs/examples/multiple_use.tsx', 'en', item);

      await expect(locators.tooltip(page)).toHaveCount(0);

      const ellipsisContent = page.locator('[data-ui-name="Tooltip"]');
      const box = await ellipsisContent.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(locators.tooltip(page)).toHaveCount(1);
    });

    test(`Verify Ellipsis in table cell with Link and trimType = ${item.trim} `, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@ellipsis',
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/ellipsis/test/examples/in_table_with_link.tsx', 'en', item);

      await expect(locators.tooltip(page)).toHaveCount(0);

      const ellipsisContent = page.locator('[data-ui-name="Tooltip"]');
      const box = await ellipsisContent.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      await locators.tooltip(page).waitFor({ state: 'visible' });
      await expect(locators.tooltip(page)).toHaveCount(1);

      await expect(page).toHaveScreenshot();

      const tablerow = page.locator('[role="row"][aria-rowindex="2"]');
      const tableCell = tablerow.getByRole('gridcell');
      const boxCell = await tableCell.nth(1).boundingBox();
      if (boxCell) {
        await page.mouse.move(boxCell.x + boxCell.width / 2, boxCell.y + boxCell.height / 2);
      }
      await locators.tooltip(page).waitFor({ state: 'hidden' });
      await expect(locators.tooltip(page)).toHaveCount(0);

      const boxLast = await ellipsisContent.last().boundingBox();
      if (boxLast) {
        await page.mouse.move(boxLast.x + boxLast.width / 2, boxLast.y + boxLast.height / 2);
      }
      await expect(locators.tooltip(page)).toHaveCount(0);
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify multiple tags in one component', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@ellipsis'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/ellipsis/test/examples/multiple_tags_in_one_components.tsx', 'en');

    const text = page.locator('[data-ui-name="Text"]');
    const tagNameButton = await text.evaluate((el) => el.tagName.toLowerCase());
    expect(tagNameButton).toBe('h2');

    const boxLast = await text.boundingBox();
    if (boxLast) {
      await page.mouse.move(boxLast.x + boxLast.width / 2, boxLast.y + boxLast.height / 2);
    }
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(locators.tooltip(page)).toHaveCount(1);
  });
});
