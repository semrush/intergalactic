import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';
import type { Property } from 'csstype';

import { locators, getColumnWidth } from './utils';

const COLUMN_SORT_TO_ARIA: Record<string, string> = {
  asc: 'ascending',
  desc: 'descending',
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */

test.describe(`${TAG.VISUAL}`, () => {
  test('Verify alignment props', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/cells-tests/column-alignment.tsx', 'en');

    const checkProperty = async (columnIndex: number, check: {
      justifyContent?: Property.JustifyContent;
      alignItems?: Property.AlignItems;
      textAlign?: Property.TextAlign;
    }) => {
      const headerCell = page.locator(
        `[data-ui-name="Head.Column"][aria-colindex="${columnIndex}"]`,
      );

      if (check.justifyContent) {
        const justify = await headerCell.evaluate(
          (el) => window.getComputedStyle(el).justifyContent,
        );
        expect(justify).toBe(check.justifyContent);
      }

      if (check.alignItems) {
        const align = await headerCell.evaluate((el) => window.getComputedStyle(el).alignItems);
        expect(align).toBe(check.alignItems);
      }

      if (check.textAlign) {
        const align = await headerCell.evaluate((el) => window.getComputedStyle(el).textAlign);
        expect(align).toBe(check.textAlign);
      }
    };

    await checkProperty(2, { justifyContent: 'center' });
    await checkProperty(3, { justifyContent: 'flex-start' });
    await checkProperty(4, { justifyContent: 'flex-end' });

    await checkProperty(5, { alignItems: 'center' });
    await checkProperty(6, { alignItems: 'flex-end' });
    await checkProperty(7, { alignItems: 'flex-start' });

    await checkProperty(11, { textAlign: 'end' });
    await checkProperty(12, { textAlign: 'start' });
    await checkProperty(13, { textAlign: 'center' });

    await expect(page).toHaveScreenshot();
  });

  test('Verify Column sizes functionality', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/column-sizes.tsx', 'en');

    await expect(page).toHaveScreenshot();

    await page.setViewportSize({ width: 375, height: 800 });
    await expect(page).toHaveScreenshot();
  });

  test('Verify head column shadow for fixed columns with different screen sizes', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/advanced/examples/fixed_columns_width_with_shadows.tsx', 'en');

    const lastColumn = page.locator('[data-ui-name="Head.Column"]').last();

    let isShadowExist = await lastColumn.evaluate((node) => {
      // default `left` value is `auto`
      return window.getComputedStyle(node, '::after').getPropertyValue('left') === '0px';
    });

    expect(isShadowExist).toBe(false);

    await page.setViewportSize({ width: 400, height: 700 });

    isShadowExist = await lastColumn.evaluate((node) => {
      return window.getComputedStyle(node, '::after').getPropertyValue('left') === '0px';
    });

    expect(isShadowExist).toBe(true);
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify column width when static and based on content', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/rows-columns-tests/column-expand.tsx', 'en');

    const getWidths = async (viewportWidth: any) => {
      await page.setViewportSize({ width: viewportWidth, height: 800 });
      const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));
      return widths;
    };

    const [width1Desktop, width2Desktop, width3Desktop, width4Desktop, width5Desktop] =
      await getWidths(1280);
    const [width1Mobile, width2Mobile, width3Mobile, width4Mobile, width5Mobile] = await getWidths(
      375,
    );

    expect(width1Mobile).toBeLessThan(width1Desktop);
    expect(width2Mobile).toBeLessThan(width2Desktop);
    expect(width3Mobile).toBeLessThan(width3Desktop);
    expect(width4Mobile).toBeLessThan(width4Desktop);
    expect(width5Mobile).toBeLessThan(width5Desktop);

    await expect(page).toHaveScreenshot();
  });

  test('Verify merged columns keyboard navigation', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/docs/examples/columns-merging.tsx', 'en');

    const firstCell = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]').nth(0);
    const secondCell = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]').nth(1);

    const secondCell2 = locators.row(page, 3).locator('[data-ui-name="Row.Cell"]').nth(1);
    const fourthCell2 = locators.row(page, 3).locator('[data-ui-name="Row.Cell"]').nth(2);

    await page.keyboard.press('Tab');
    await expect(firstCell).toBeFocused();
    await page.keyboard.press('ArrowRight');

    await expect(page).toHaveScreenshot();
    await expect(secondCell).toBeFocused();
    await page.keyboard.press('ArrowRight');
    await expect(secondCell).toBeFocused();

    await page.keyboard.press('ArrowDown');
    await expect(secondCell2).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(fourthCell2).toBeFocused();

    await page.keyboard.press('ArrowUp');
    await expect(secondCell).toBeFocused();
    await page.keyboard.press('ArrowDown');
  });

  test('Verify merged columns and interactive cells', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/docs/examples/access-to-cells.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(locators.row(page, 7).locator('[data-ui-name="Row.Cell"]').first()).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(locators.row(page, 7).locator('[data-ui-name="Row.Cell"]').nth(1)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(locators.row(page, 7).locator('[data-ui-name="Row.Cell"]').first()).toBeFocused();
  });

  test('Verify data table renders when refs in columns', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/docs/examples/multiple_use.tsx', 'en');

    await page.keyboard.press('Tab');
    const firstCell = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]').nth(0);
    await expect(firstCell).toBeFocused();
  });

  test('Verify column\'s aria-sort and aria-describedby attributes ', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/docs/examples/sorting.tsx', 'en');

    const columns = await page.locator('[data-ui-name="Head.Column"]').all();
    const [defaultSortColumnName, defaultSortValue] = ['kd', 'desc'];
    for (const column of columns) {
      const columnName = await column.getAttribute('name');

      if (defaultSortColumnName === columnName) {
        expect(column).toHaveAttribute('aria-sort', COLUMN_SORT_TO_ARIA[defaultSortValue]);
        continue;
      }

      expect(column).not.toHaveAttribute('aria-sort');
      expect(column).toHaveAttribute('aria-describedby');
    }
  });
});
