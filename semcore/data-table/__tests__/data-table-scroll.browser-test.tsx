import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators } from './utils';

async function checkAriaMaxValue(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuemax');
  const attrValue = await scrollBar.getAttribute('aria-valuemax');
  expect(attrValue).not.toBeNull();
  const value = Number(attrValue);
  return value;
}

async function checkScrolled(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  await expect.poll(async () => Number(await scrollBar.getAttribute('aria-valuenow')), { timeout: 3000 }).toBeGreaterThan(0);
}

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  const variantFixedColumn = [
    { sticky: false, withScrollBar: false, h: '300px' },
    { sticky: true, withScrollBar: false, h: '300px' },
    { sticky: true, withScrollBar: true, h: '300px' },
  ];
  variantFixedColumn.forEach((item) => {
    test(`Verify Mouse scroll One Level with Fixed column sticky=${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/with-fixed-column.tsx', 'en', { ...item, multiLevel: false });
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        if (item.withScrollBar) {
          await checkScrolled(scrollBar.nth(2));
        } else {
          await checkScrolled(scrollBar.nth(1));
        }
      });

      await test.step('Verify horizontal scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);

        if (item.sticky) {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        }
        if (item.withScrollBar) {
          await checkScrolled(scrollBar.nth(0));
          await checkScrolled(scrollBar.nth(1));
        } else {
          await checkScrolled(scrollBar.nth(0));
        }
      });
    });
  });

  variantFixedColumn.forEach((item) => {
    test(`Verify keyboard scroll Multi Level with Fixed column sticky=${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/with-fixed-column.tsx', 'en', { ...item, multiLevel: true });
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify horizontal scroll', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);

        if (item.withScrollBar) {
          await checkScrolled(scrollBar.nth(0));
          await checkScrolled(scrollBar.nth(1));
        } else
          await checkScrolled(scrollBar.nth(0));
      });

      await test.step('Verify vertical scroll', async () => {
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);

        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

        if (item.withScrollBar) {
          await checkScrolled(scrollBar.nth(2));
        } else
          await checkScrolled(scrollBar.nth(1));
      });
    });
  });

  const variantNoFixedColumn = [
    { sticky: false, withScrollBar: false, h: '200px', wMax: undefined },
    { sticky: true, withScrollBar: true, h: '200px', wMax: '300px' },
    { sticky: true, withScrollBar: false, h: '200px', wMax: '300px' },

  ];
  variantNoFixedColumn.forEach((item) => {
    test(`Verify keyboard scroll One Level scroll sticky=${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/scroll-in-table.tsx', 'en', { ...item, multiLevel: false });
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        if (item.wMax != '300px' && !item.withScrollBar) {
          await checkScrolled(scrollBar.nth(0));
          await checkScrolled(scrollBar.nth(1));
        } else if (item.wMax == '300px' && item.withScrollBar) {
          await checkScrolled(scrollBar.nth(0));
          await checkScrolled(scrollBar.nth(3));
        } else {
          await checkScrolled(scrollBar.nth(0));
          await checkScrolled(scrollBar.nth(2));
        }
      });

      if (item.wMax == '300px') {
        await test.step('Verify horizontal scroll', async () => {
          await page.keyboard.press('Shift+Tab');
          for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
          }
          await page.keyboard.press('Tab');
          for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
          }
          await page.waitForTimeout(200);
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

          if (item.withScrollBar)
            await checkScrolled(scrollBar.nth(1));
          else
            await checkScrolled(scrollBar.nth(2));
        });
      }
    });
  });

  variantNoFixedColumn.forEach((item) => {
    test(`Verify Mouse scroll Multi Level scroll sticky=${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/scroll-in-table.tsx', 'en', { ...item, multiLevel: true });
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      await test.step('Verify vertical scroll', async () => {
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(200);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(200);
        if (item.wMax != '300px' && !item.withScrollBar) {
          await checkScrolled(scrollBar.nth(0));
          await checkScrolled(scrollBar.nth(1));
        } else if (item.wMax == '300px' && item.withScrollBar) {
          await checkScrolled(scrollBar.nth(2));
          await checkScrolled(scrollBar.nth(5));
        } else {
          await checkScrolled(scrollBar.nth(1));
          await checkScrolled(scrollBar.nth(3));
        }
      });

      if (item.wMax == '300px') {
        await test.step('Verify horizontal scroll', async () => {
          await locators.dataTable(page).first().hover();
          await page.mouse.wheel(600, 0);
          await page.waitForTimeout(200);
          await locators.dataTable(page).nth(1).hover();
          await page.mouse.wheel(600, 0);
          await page.waitForTimeout(200);
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });

          if (item.withScrollBar) {
            await checkScrolled(scrollBar.nth(0));
            await checkScrolled(scrollBar.nth(3));
          } else {
            await checkScrolled(scrollBar.nth(0));
            await checkScrolled(scrollBar.nth(2));
          }
        });
      }
    });
  });

  test('Verify keyboard when sticky header with top props', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/scroll-with-sticky-and-top-props-header.tsx', 'en');

    await page.keyboard.press('Tab');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(100);

    const headColumns = page.locator('[data-ui-name="Head.Column"]');
    const count = await headColumns.count();

    for (let i = 0; i < count; i++) {
      const column = headColumns.nth(i);
      const topStyle = await column.evaluate((el) => getComputedStyle(el).top);
      expect(topStyle).toBe('100px');
    }

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
  });

  // add cases when hedader has interactive element
});
