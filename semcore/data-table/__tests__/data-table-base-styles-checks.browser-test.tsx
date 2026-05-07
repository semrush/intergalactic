import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators, checkStyles, getColumnWidth, getCssVarColor } from './utils';

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify styles Primary', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/base.tsx', 'en');

    const header = page.locator('[data-ui-name="Head.Column"]');
    const firstCell = locators.row(page, 2).locator('[data-ui-name="Row.Cell"]');

    await test.step('Verify header cell styles', async () => {
      await checkStyles(header, {
        'font-size': '12px',
        'line-height': browserName === 'firefox' ? '15.9667px' : '15.96px',
        'color': 'rgb(25, 27, 35)',
        'padding': '12px',
        'background-color': 'rgb(244, 245, 249)',
        'border-bottom': '1px solid rgb(224, 225, 233)',
      });
    });

    await test.step('Verify hovered header cell styles', async () => {
      await header.first().hover();
      if (browserName !== 'firefox')
        await checkStyles(header.first(), {
          'font-size': '12px',
          'border-bottom': '1px solid rgb(224, 225, 233)',
          'color': 'rgb(25, 27, 35)',
          'background-color': 'rgb(244, 245, 249)',
          'padding': '12px',
        });
    });

    await test.step('Verify body cell styles', async () => {
      const cellHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-hover');
      await firstCell.first().hover();
      if (browserName !== 'firefox')
        await checkStyles(firstCell, {
          'font-size': '14px',
          'border-bottom': '1px solid rgb(224, 225, 233)',
          'color': 'rgb(25, 27, 35)',
          'background-color': cellHoverBg,
        });

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify overflow=hidden on the CellWrapper', async () => {
      const cellWrapper = page.locator('[class*="CellWrapper"]');
      const count = await cellWrapper.count();
      for (let i = 0; i < count; i++) {
        const overflow = await cellWrapper.nth(i).evaluate((el) => {
          return window.getComputedStyle(el).overflow;
        });

        await expect(overflow).toBe('hidden');
      }
    });
  });
  const variantSideIndents = [
    { sideIndents: 'wide', use: 'primary' },
    { sideIndents: 'wide', use: 'secondary' },
  ];
  variantSideIndents.forEach((item) => {
    test(`Verify styles when sideIndents=${item.sideIndents} and use=${item.use} `, {
      tag: [TAG.PRIORITY_MEDIUM,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/base-one-level-header-props.tsx', 'en', item);

      const cellsFirstColumn = page.locator('[aria-colindex="1"]');
      const cellsMiddleColumn = page.locator('[aria-colindex="3"]');
      const cellsMLastColumn = page.locator('[aria-colindex="5"]');
      if (item.use === 'primary') {
        await test.step('Verify first column padding', async () => {
          await checkStyles(cellsFirstColumn, {
            'padding-top': '12px',
            'padding-right': '12px',
            'padding-bottom': '12px',
            'padding-left': '20px',
          });
        });

        await test.step('Verify first column padding after update', async () => {
          await checkStyles(cellsMLastColumn, {
            'padding-top': '12px',
            'padding-left': '12px',
            'padding-bottom': '12px',
            'padding-right': '20px',
          });
        });

        await test.step('Verify middle column padding', async () => {
          await checkStyles(cellsMiddleColumn, { padding: '12px' });
        });
      }
      if (item.use === 'secondary') {
        await test.step('Verify first column padding', async () => {
          await checkStyles(cellsFirstColumn, {
            'padding-top': '8px',
            'padding-right': '8px',
            'padding-bottom': '8px',
            'padding-left': '20px',
          });
        });

        await test.step('Verify first column padding after update', async () => {
          await checkStyles(cellsMLastColumn, {
            'padding-top': '8px',
            'padding-left': '8px',
            'padding-bottom': '8px',
            'padding-right': '20px',
          });
        });

        await test.step('Verify middle column padding', async () => {
          await checkStyles(cellsMiddleColumn, { padding: '8px' });
        });
      }
    });
  });

  test('Verify styles Compact', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/compact.tsx', 'en');

    const header = page.locator('[data-ui-name="Head.Column"]');
    const firstCell = page.getByRole('gridcell').first();

    await checkStyles(header, {
      'font-size': '12px',
      'line-height': browserName === 'firefox' ? '15.9667px' : '15.96px',
      'color': 'rgb(25, 27, 35)',
      'padding': '12px 8px',
      'background-color': 'rgb(244, 245, 249)',
      'border-bottom': '1px solid rgb(224, 225, 233)',
    });

    await checkStyles(firstCell, {
      'font-size': '14px',
      'border-bottom': '1px solid rgb(224, 225, 233)',
      'background-color': 'rgb(255, 255, 255)',
      'color': 'rgb(25, 27, 35)',
      'padding': '12px 8px',
    });

    await firstCell.hover();
    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();
  });

  test('Verify styles Secondary', {
    tag: [TAG.PRIORITY_HIGH,
      '@data-table'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/secondary-table.tsx', 'en');

    const header = page.locator('[data-ui-name="Head.Column"]');
    const firstCell = page.locator('[data-ui-name="Row.Cell"]').first();

    await checkStyles(header, {
      'font-size': '12px',
      'line-height': browserName === 'firefox' ? '15.9667px' : '15.96px',
      'color': 'rgb(25, 27, 35)',
      'padding': '8px',
      'background-color': 'rgb(255, 255, 255)',
      'border-bottom': '1px solid rgb(169, 171, 182)',
    });

    await header.first().hover();
    if (browserName !== 'firefox')
      await checkStyles(header, {
        'font-size': '12px',
        'color': 'rgb(25, 27, 35)',
        'padding': '8px',
        'background-color': 'rgb(255, 255, 255)',
        'border-bottom': '1px solid rgb(169, 171, 182)',
      });

    await checkStyles(firstCell, {
      'font-size': '14px',
      'border-bottom': '1px solid rgb(224, 225, 233)',
      'color': 'rgb(25, 27, 35)',
      'background-color': 'rgb(255, 255, 255)',
      'padding': '8px',
    });

    const cellHoverBg = await getCssVarColor(page, '--intergalactic-table-td-cell-hover');
    await firstCell.hover();
    if (browserName !== 'firefox')
      await expect(firstCell).toHaveCSS('background-color', cellHoverBg);

    await page.keyboard.press('Tab');
    if (browserName !== 'firefox')
      await expect(firstCell).toHaveCSS('background-color', cellHoverBg);
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  const variantUse = [
    { use: 'primary' },
    { use: 'secondary' },
  ];
  variantUse.forEach((item) => {
    test(`Verify keyboard interaction when use=${item.use} `, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/base-one-level-header-props.tsx', 'en', item);

      await page.keyboard.press('Tab');

      const firstCell = page.locator('[data-ui-name="Row.Cell"]').first();

      await expect(firstCell).toBeFocused();

      await page.keyboard.press('ArrowRight');

      const secondCell = page.locator('[role="gridcell"][aria-colindex="2"]').first();
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      const secondCellSecondRow = page.locator('[role="gridcell"][aria-colindex="2"]').nth(1);
      await expect(secondCellSecondRow).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(secondCell).not.toBeFocused();

      if (browserName === 'firefox') test.skip();
      await page.keyboard.press('Shift+Tab');
      await expect(secondCellSecondRow).toBeFocused();
    });
  });

  const variant1fr = [
    { use: 'primary', defaultGridTemplateColumnWidth: '1fr' },
    { use: 'secondary', defaultGridTemplateColumnWidth: '1fr' },
  ];
  variant1fr.forEach((item) => {
    test(`Verify defaultGridTemplateColumnWidth=${item.defaultGridTemplateColumnWidth} use=${item.use} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/base-one-level-header-props.tsx', 'en', item);
      const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));

      expect(widths[1]).toBeLessThanOrEqual(widths[2]);
      expect(widths[1]).toBeCloseTo(widths[3], 1);
      expect(widths[3]).toBeCloseTo(widths[4], 1);
    });
  });

  const variantAuto = [
    { use: 'primary', defaultGridTemplateColumnWidth: 'auto' },
    { use: 'secondary', defaultGridTemplateColumnWidth: 'auto' },
  ];
  variantAuto.forEach((item) => {
    test(`Verify defaultGridTemplateColumnWidth=${item.defaultGridTemplateColumnWidth} use=${item.use} `, {
      tag: [TAG.PRIORITY_HIGH,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/header-tests/base-one-level-header-props.tsx', 'en', item);
      const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));

      expect(widths[1]).toBeLessThan(widths[0]);
      expect(widths[2]).toBeLessThan(widths[0]);
      expect(widths[1]).toBeLessThan(widths[4]);
      expect(widths[2]).toBeLessThan(widths[4]);
    });
  });
});
