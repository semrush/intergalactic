import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, checkStyles, getStylesActiveHovered, getStylesNotActive } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify colored rows', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/row-themes.tsx', 'en');
    const stylesActiveHovered = await getStylesActiveHovered(page);
    const stylesNotActive = await getStylesNotActive(page);

    await test.step('Verify success theme', async () => {
      const cells = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

      await checkStyles(cells, {
        'background-color': stylesNotActive[0],
      });

      await locators.getCell(page, 2, 1).hover();
      if (browserName !== 'firefox')
        await checkStyles(cells, {
          'background-color': stylesActiveHovered[0],
        });
    });

    await test.step('Verify info theme', async () => {
      const cells = locators.row(page, 3).locator('[data-ui-name="Row.Cell"]');

      await checkStyles(cells, {
        'background-color': stylesNotActive[1],
      });

      await locators.getCell(page, 3, 1).hover();
      if (browserName !== 'firefox')
        await checkStyles(cells, {
          'background-color': stylesActiveHovered[1],
        });
    });

    await test.step('Verify muted theme', async () => {
      const cells = locators.row(page, 4).locator('[data-ui-name="Row.Cell"]');

      await checkStyles(cells, {
        'background-color': stylesNotActive[2],
      });

      await locators.getCell(page, 4, 1).hover();
      if (browserName !== 'firefox')
        await checkStyles(cells, {
          'background-color': stylesActiveHovered[2],
        });
    });

    await test.step('Verify warning theme', async () => {
      const cells = locators.row(page, 5).locator('[data-ui-name="Row.Cell"]');

      await checkStyles(cells, {
        'background-color': stylesNotActive[3],
      });

      await locators.getCell(page, 5, 1).hover();
      if (browserName !== 'firefox')
        await checkStyles(cells, {
          'background-color': stylesActiveHovered[3],
        });
    });

    await test.step('Verify danger theme', async () => {
      const cells = locators.row(page, 6).locator('[data-ui-name="Row.Cell"]');

      await checkStyles(cells, {
        'background-color': stylesNotActive[4],
      });

      await locators.getCell(page, 6, 1).hover();
      if (browserName !== 'firefox')
        await checkStyles(cells, {
          'background-color': stylesActiveHovered[4],
        });
    });
  });

  test('Verify merged cells on Hover', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/columns-merging.tsx', 'en');

    const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
    const firstCell = firstRow.locator('[data-ui-name="Row.Cell"]').nth(0);
    await firstCell.hover();
    await expect(page).toHaveScreenshot();

    const secondRow = page.locator('[data-ui-name="Body.Row"]').nth(1);
    const secondCellSecondRow = secondRow.locator('[data-ui-name="Row.Cell"]').nth(1);
    await secondCellSecondRow.hover();
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify merged rows keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/rows-merging.tsx', 'en');

    await page.keyboard.press('Tab');

    const firstMergedCell = locators.getCell(page, 2, 1);
    const secondMergedCell = locators.getCell(page, 5, 1);
    const secondCell = locators.getCell(page, 2, 2);

    await expect(firstMergedCell).toBeFocused();
    await test.step('Verify  attributes', async () => {
      await expect(firstMergedCell).toHaveAttribute('tabindex', '-1');
      await expect(firstMergedCell).toHaveAttribute('data-grouped-by', 'rowgroup');
      await expect(firstMergedCell).toHaveAttribute('scope', 'rowgroup');
      await expect(firstMergedCell).toHaveAttribute('aria-rowspan', '3');
      await expect(firstMergedCell).toHaveAttribute('role', 'gridcell');
    });

    await test.step('Verify  1st child cell focused', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(secondCell).toBeFocused();
    });

    await test.step('Verify return to parent from 1st child  ', async () => {
      await page.keyboard.press('ArrowLeft');
      await expect(firstMergedCell).toBeFocused();
    });

    await test.step('Verify return to parent from 2nd child  ', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await expect(firstMergedCell).not.toHaveAttribute('inert');
      await expect(firstMergedCell).toBeFocused();
    });

    await test.step('Verify return to parent from last child  ', async () => {
      await page.keyboard.press('ArrowRight');
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await expect(firstMergedCell).toBeFocused();
    });
    await test.step('Verify focus second merged', async () => {
      await page.keyboard.press('ArrowDown');

      await expect(secondMergedCell).toBeFocused();
    });
    await test.step('Verify return second merged from last child', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(secondMergedCell).toBeFocused();
    });

    await test.step('Verify return to first merged', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(firstMergedCell).toBeFocused();
    });
  });

  test('Verify merged rows keyboard navigation when megred rows in different positions', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/rows-columns-tests/row-and-column-merging.tsx', 'en');

    await page.keyboard.press('Tab');

    await test.step('Verify merged cell focused when it is not in 1st column', async () => {
      for (let i = 0; i < 5; i++)
        await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 7, 2)).toBeFocused();
    });

    await test.step('Verify merged cell focused when it is not in 1st column and last child', async () => {
      await page.keyboard.press('ArrowLeft');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await expect(locators.getCell(page, 7, 2)).toBeFocused();
    });

    await test.step('Verify return to parent upper cell', async () => {
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowDown');
      await expect(locators.getCell(page, 7, 2)).toBeFocused();
    });

    await test.step('Verify return to parent lower cell', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      await expect(locators.getCell(page, 7, 2)).toBeFocused();
    });
  });
});
