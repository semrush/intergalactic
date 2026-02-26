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
    test(`Verify Mouse scroll One Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar} h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-with-fixed-column.tsx', 'en', item);

      await test.step('Verify vertical scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });

      await test.step('Verify horizontal scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });
    });

    test(`Verify keyboard scroll One Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}  h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-with-fixed-column.tsx', 'en', item);

      await test.step('Verify horizontal scroll', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });

      await test.step('Verify vertical scroll', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });
    });

    test(`Verify Mouse scroll Multi Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}  h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-with-fixed-column.tsx', 'en', item);

      await test.step('Verify vertical scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });

      await test.step('Verify horizontal scroll', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });
    });

    test(`Verify keyboard scroll Multi Level with Fixed column scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar}  h=${item.h}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-with-fixed-column.tsx', 'en', item);

      await test.step('Verify horizontal scroll', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);

        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
      });

      await test.step('Verify vertical scroll', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });
    });
  });

  const variantNoFixedColumn = [
    { sticky: false, withScrollBar: false, h: '200px', wMax: undefined },
    { sticky: true, withScrollBar: true, h: '200px', wMax: '300px' },
    { sticky: true, withScrollBar: false, h: '200px', wMax: '300px' },

  ];
  variantNoFixedColumn.forEach((item) => {
    test(`Verify Mouse scroll One Level scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-scroll-in-table.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      await test.step('Verify vertical scroll', async () => {
        const nowNumberInitial = await checkAriaMaxValue(scrollBar.nth(0));
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        const nowNumber = await checkAriaMaxValue(scrollBar.nth(0));
        expect(nowNumberInitial).toBeLessThanOrEqual(nowNumber);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });

      if (item.wMax === '300px') {
        await test.step('Verify horizontal scroll', async () => {
          const nowNumberInitial = await checkAriaMaxValue(scrollBar.nth(1));
          await locators.dataTable(page).nth(1).hover();
          await page.mouse.wheel(600, 0);
          await page.waitForTimeout(1000);
          const nowNumber = await checkAriaMaxValue(scrollBar.nth(1));
          expect(nowNumberInitial).toBeLessThanOrEqual(nowNumber);
          if (browserName == 'webkit') {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
          } else {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
          }
        });
      }
    });

    test(`Verify keyboard scroll One Levelscroll sticky =${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/one-level-scroll-in-table.tsx', 'en', item);

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
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });

      if (item.wMax == '300px') {
        await test.step('Verify horizontal scroll', async () => {
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');

          for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
          }
          await page.waitForTimeout(200);
          if (browserName == 'webkit') {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
          } else {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
          }
        });
      }
    });

    test(`Verify Mouse scroll Multi Level scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-scroll-in-table.tsx', 'en', item);

      await test.step('Verify vertical scroll', async () => {
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
      });

      if (item.wMax == '300px') {
        await test.step('Verify horizontal scroll', async () => {
          await locators.dataTable(page).nth(1).hover();
          await page.mouse.wheel(600, 0);
          await page.waitForTimeout(1000);
          if (browserName == 'webkit') {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
          } else {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
          }
        });
      }
    });

    test(`Verify keyboard scroll Multi Level scroll sticky =${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@data-table'],
    }, async ({ page, browserName }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/multi-level-scroll-in-table.tsx', 'en', item);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');

      if (item.wMax == '300px') {
        await test.step('Verify horizontal scroll', async () => {
          const nowNumberInitial = await checkAriaMaxValue(scrollBar.nth(1));
          await page.keyboard.press('Tab');
          await page.keyboard.press('Tab');
          for (let i = 0; i < 3; i++) {
            await page.keyboard.press('ArrowRight');
          }
          await page.waitForTimeout(200);
          const nowNumber = await checkAriaMaxValue(scrollBar.nth(1));
          expect(nowNumberInitial).toBeLessThanOrEqual(nowNumber);
          if (browserName == 'webkit') {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
          } else {
            await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
          }
        });
      }

      await test.step('Verify vertical scroll', async () => {
        const nowNumberInitial = await checkAriaMaxValue(scrollBar.nth(0));
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        const nowNumber = await checkAriaMaxValue(scrollBar.nth(0));
        expect(nowNumberInitial).toBeLessThanOrEqual(nowNumber);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        if (browserName == 'webkit') {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.1 });
        } else {
          await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
        }
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

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.001 });
  });

  // add cases when hedader has interactive element
});
