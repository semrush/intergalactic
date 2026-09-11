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
    await loadPage(page, 'stories/components/data-table/tests/examples/rows-columns-tests/column-alignment.tsx', 'en');

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

  test('Verify merged columns keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/columns-merging.tsx', 'en');

    await page.keyboard.press('Tab');

    await page.keyboard.press('ArrowRight');

    await expect(page).toHaveScreenshot();
  });

  test('Verify head column shadow for fixed columns with different screen sizes', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table',
      '@base-components',
      '@flex-box',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/advanced/examples/fixed_columns_width_with_shadows.tsx', 'en');

    const lastColumn = page.locator('[data-ui-name="Head.Column"]').last();

    const isShadowExist = await lastColumn.evaluate((node) => {
      // default `left` value is `auto`
      return window.getComputedStyle(node, '::after').getPropertyValue('left') === '0px';
    });

    expect(isShadowExist).toBe(false);

    await page.setViewportSize({ width: 400, height: 700 });
    await page.waitForTimeout(100);

    await expect.poll(
      () => lastColumn.evaluate((node) => {
        return window.getComputedStyle(node, '::after').getPropertyValue('left') === '0px';
      }),
      { timeout: 5000 },
    ).toBe(true);
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
  });

  test('Verify merged columns keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/columns-merging.tsx', 'en');

    const mergedCell = locators.getCell(page, 2, 2);

    await test.step('Verify merged cell focused from left cell', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await expect(mergedCell).toBeFocused();
    });

    await test.step('Verify no focus movement when no right cells', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(mergedCell).toBeFocused();
    });

    await test.step('Verify return focus to the merged cell from 1st child', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 3, 2)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(mergedCell).toBeFocused();
    });

    await test.step('Verify return focus to the merged cell from last child', async () => {
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await page.keyboard.press('ArrowUp');
      await expect(mergedCell).toBeFocused();
    });
  });

  test('Verify merged columns keyboard navigation when megred columns in different positions', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/rows-columns-tests/row-and-column-merging.tsx', 'en');

    await page.keyboard.press('Tab');

    await test.step('Verify merged column focused when it is not in 1st column', async () => {
      for (let i = 0; i < 7; i++)
        await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 9, 2)).toBeFocused();
    });

    await test.step('Verify merged row focused from merged column', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(locators.getCell(page, 7, 2)).toBeFocused();
    });

    await test.step('Verify return to merged column from upper 1st child', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 9, 2)).toBeFocused();
    });

    await test.step('Verify return to merged column from upper last child', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(locators.getCell(page, 9, 2)).toBeFocused();
    });
  });

  test('Verify merged columns and interactive cells', {
    tag: [TAG.PRIORITY_MEDIUM,
      '@data-table',
      '@link',
      '@button-link',
      '@button',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/access-to-cells.tsx', 'en');

    await page.keyboard.press('Tab');
    for (let i = 0; i < 5; i++)
      await page.keyboard.press('ArrowDown');
    await expect(locators.getCell(page, 7, 1)).toBeFocused();

    await page.keyboard.press('ArrowRight');
    await expect(locators.getCell(page, 7, 4)).toBeFocused();

    await page.keyboard.press('ArrowLeft');
    await expect(locators.getCell(page, 7, 1)).toBeFocused();
  });

  test('Verify column\'s aria-sort and aria-describedby attributes ', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table',
      '@typography',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/sorting.tsx', 'en');

    const columns = await page.locator('[data-ui-name="Head.Column"]').all();
    const [defaultSortColumnName, defaultSortValue] = ['vol', 'desc'];
    for (const column of columns) {
      const columnName = await column.getAttribute('name');

      if (defaultSortColumnName === columnName) {
        expect(column).toHaveAttribute('aria-sort', COLUMN_SORT_TO_ARIA[defaultSortValue]);
        continue;
      } else {
        expect(column).not.toHaveAttribute('aria-sort');
      }
      expect(column).toHaveAttribute('aria-describedby');
    }
  });
});
