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

async function checkScrollNowIncreased(scrollBar: any) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  const nowValue = await scrollBar.getAttribute('aria-valuenow');
  expect(nowValue).not.toBeNull();
  const nowNumber = Number(nowValue);
  return nowNumber;
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
    { sticky: false, withScrollBar: false, h: '100%' }, // without vertical scroll
  ];
  variantFixedColumn.forEach((item) => {
    test(`Verify Mouse scroll One Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar} h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-with-fixed-column.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await locators.dataTable(page).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      await test.step('Verify horizontal scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await locators.dataTable(page).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });
    });

    test(`Verify keyboard scroll One Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}  h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-with-fixed-column.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify horizontal scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });
    });

    test(`Verify Mouse scroll Multi Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}  h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-with-fixed-column.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await locators.dataTable(page).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      await test.step('Verify horizontal scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await locators.dataTable(page).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });
    });

    test(`Verify keyboard scroll Multi Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}  h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-with-fixed-column.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify horizontal scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });
    });
  });

  const variantNoFixedColumn = [
    { sticky: false, withScrollBar: false, h: '300px' },
    { sticky: true, withScrollBar: false, h: '300px' },
    { sticky: true, withScrollBar: true, h: '300px', wMax: '300px' },
  ];
  variantNoFixedColumn.forEach((item) => {
    test(`Verify Mouse scroll One Level scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-scroll-in-table.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar.first());
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar.first());
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      if (item.wMax === '200px') {
        await test.step('Verify horizontal scroll', async () => {
          const initialValue = await checkAriaMaxValue(scrollBar.nth(2));
          await locators.dataTable(page).nth(1).hover();
          await page.mouse.wheel(600, 0);
          await page.waitForTimeout(1000);
          const nowNumber = await checkScrollNowIncreased(scrollBar.nth(2));
          expect(nowNumber).toBeLessThanOrEqual(initialValue);
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        });
      }
    });

    test(`Verify keyboard scroll One Levelscroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-scroll-in-table.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar.first());
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkScrollNowIncreased(scrollBar.first());
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      if (item.wMax == '200px') {
        await test.step('Verify horizontal scroll', async () => {
          const initialValue = await checkAriaMaxValue(scrollBar.nth(2));
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');

          for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
          }
          await page.waitForTimeout(200);
          const nowNumber = await checkScrollNowIncreased(scrollBar.nth(2));
          expect(nowNumber).toBeLessThanOrEqual(initialValue);
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        });
      }
    });

    test(`Verify Mouse scroll Multi Level scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-scroll-in-table.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar.first());
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar.first());
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });

      if (item.wMax == '200px') {
        await test.step('Verify horizontal scroll', async () => {
          const initialValue = await checkAriaMaxValue(scrollBar.nth(2));
          await locators.dataTable(page).nth(1).hover();
          await page.mouse.wheel(600, 0);
          await page.waitForTimeout(1000);
          const nowNumber = await checkScrollNowIncreased(scrollBar.nth(2));
          expect(nowNumber).toBeLessThanOrEqual(initialValue);
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        });
      }
    });

    test(`Verify keyboard scroll Multi Level scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-scroll-in-table.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      if (item.wMax == '200px') {
        await test.step('Verify horizontal scroll', async () => {
          const initialValue = await checkAriaMaxValue(scrollBar);
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
          }
          await page.waitForTimeout(200);
          const nowNumber = await checkScrollNowIncreased(scrollBar);
          expect(nowNumber).toBeLessThanOrEqual(initialValue);
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        });
      }

      await test.step('Verify vertical scroll', async () => {
        const initialValue = await checkAriaMaxValue(scrollBar.first());
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkScrollNowIncreased(scrollBar.first());
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
      });
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
