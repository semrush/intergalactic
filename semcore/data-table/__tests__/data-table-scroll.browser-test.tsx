import type { Locator, Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

import { locators } from './utils';

async function checkScrolled(scrollBar: Locator) {
  await expect(scrollBar).toHaveAttribute('aria-valuenow');
  await expect.poll(async () => Number(await scrollBar.getAttribute('aria-valuenow')), { timeout: 3000 }).toBeGreaterThan(0);
}

const tableRoot = (page: Page, index = 0) => page.locator('[data-ui-name="ScrollArea"]').nth(index);
const scrollContainer = (page: Page, index = 0) => tableRoot(page, index).locator('[data-ui-name="ScrollArea.Container"]').first();
const scrollBars = (page: Page, orientation: 'horizontal' | 'vertical', index = 0) =>
  tableRoot(page, index).locator(`[data-ui-name="ScrollArea.Bar"][aria-orientation="${orientation}"]`);
const allScrollBars = (page: Page) => page.locator('[data-ui-name="ScrollArea.Bar"]');

/** Scrolls the table container to an exact position (clamped to the scrollable range) and waits until it settles. */
async function scrollTableTo(page: Page, position: { top: number; left: number }, index = 0) {
  const container = scrollContainer(page, index);
  const target = await container.evaluate((el, { top, left }) => {
    const clamped = {
      top: Math.min(top, el.scrollHeight - el.clientHeight),
      left: Math.min(left, el.scrollWidth - el.clientWidth),
    };
    el.scrollTo({ ...clamped, behavior: 'instant' });
    return clamped;
  }, position);

  await expect.poll(() => container.evaluate((el) => ({ top: el.scrollTop, left: el.scrollLeft }))).toEqual(target);
}

/** The element painted at the center of the locator must belong to it, i.e. nothing scrolled over it. */
async function expectNotCovered(page: Page, selector: string, index = 0) {
  const box = (await tableRoot(page, index).locator(selector).first().boundingBox())!;
  const isOnTop = await page.evaluate(({ x, y, selector }) =>
    Boolean(document.elementFromPoint(x, y)?.closest(selector)), { x: box.x + box.width / 2, y: box.y + box.height / 2, selector });
  expect(isOnTop, `${selector} is covered by scrolled content`).toBe(true);
}

/** Sticky header stays at the top of the container and is not covered; a non-sticky header scrolls away. */
async function expectHeaderPosition(page: Page, sticky: boolean, index = 0) {
  const containerBox = (await scrollContainer(page, index).boundingBox())!;
  const header = tableRoot(page, index).locator('[data-ui-name="Head.Column"], [data-ui-name="Head.Group"]').first();
  const headerBox = (await header.boundingBox())!;

  if (sticky) {
    expect(Math.abs(headerBox.y - containerBox.y), 'sticky header is at the top of the container').toBeLessThanOrEqual(1);
    await expectNotCovered(page, '[data-ui-name="Head.Column"]', index);
  } else {
    expect(headerBox.y + headerBox.height, 'non-sticky header scrolled away').toBeLessThanOrEqual(containerBox.y + 1);
  }
}

/** Cells of the fixed left column stay at the left edge of the container after horizontal scroll. */
async function expectFixedLeftColumn(page: Page, index = 0) {
  const containerBox = (await scrollContainer(page, index).boundingBox())!;
  const fixedCell = tableRoot(page, index).locator('[data-ui-name="Row.Cell"][aria-colindex="1"]').last();
  const fixedCellBox = (await fixedCell.boundingBox())!;
  expect(Math.abs(fixedCellBox.x - containerBox.x), 'fixed column is at the left edge').toBeLessThanOrEqual(1);
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
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/with-fixed-column.tsx', 'en', { ...item, multiLevel: false });

      await test.step('Verify vertical scroll by mouse wheel', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(1000);
        await checkScrolled(scrollBars(page, 'vertical').first());
      });

      await test.step('Verify horizontal scroll by mouse wheel', async () => {
        await locators.dataTable(page).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        await checkScrolled(scrollBars(page, 'horizontal').last());
      });

      await test.step('Scroll to a fixed position for stable geometry and screenshot', async () => {
        await scrollTableTo(page, { top: 150, left: 300 });
      });

      await test.step(`Verify header is ${item.sticky ? 'sticky' : 'scrolled away'}`, async () => {
        await expectHeaderPosition(page, item.sticky);
      });

      await test.step('Verify fixed left column stays at the left edge', async () => {
        await expectFixedLeftColumn(page);
      });

      const screenshotStep = item.sticky ? test.step : test.step.skip;
      await screenshotStep('Verify scrolled table screenshot', async () => {
        await expect(tableRoot(page)).toHaveScreenshot({ mask: [allScrollBars(page)] });
      });
    });
  });

  variantFixedColumn.forEach((item) => {
    test(`Verify keyboard scroll Multi Level with Fixed column sticky=${item.sticky} withScrollBar=${item.withScrollBar}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@data-table'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/with-fixed-column.tsx', 'en', { ...item, multiLevel: true });

      await test.step('Verify horizontal scroll by keyboard', async () => {
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);
        await checkScrolled(scrollBars(page, 'horizontal').last());
      });

      await test.step('Verify vertical scroll by keyboard', async () => {
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('ArrowDown');
        }
        await page.waitForTimeout(200);
        await checkScrolled(scrollBars(page, 'vertical').first());
      });

      await test.step('Scroll to a fixed position for stable geometry and screenshot', async () => {
        await scrollTableTo(page, { top: 150, left: 300 });
      });

      await test.step(`Verify multi-level header is ${item.sticky ? 'sticky' : 'scrolled away'}`, async () => {
        await expectHeaderPosition(page, item.sticky);
      });

      await test.step('Verify fixed left column group stays at the left edge', async () => {
        await expectFixedLeftColumn(page);
      });

      await test.step('Verify scrolled table screenshot', async () => {
        await expect(tableRoot(page)).toHaveScreenshot({ mask: [allScrollBars(page)] });
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
      tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@data-table',
        '@base-components',
        '@flex-box',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/scroll-in-table.tsx', 'en', { ...item, multiLevel: false });
      const hasHorizontalScroll = item.wMax === '300px';

      await test.step('Verify vertical scroll by keyboard in both tables', async () => {
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
        await checkScrolled(scrollBars(page, 'vertical', 0).first());
        await checkScrolled(scrollBars(page, 'vertical', 1).first());
      });

      const horizontalStep = hasHorizontalScroll ? test.step : test.step.skip;
      await horizontalStep('Verify horizontal scroll by keyboard (only with wMax)', async () => {
        await page.keyboard.press('Shift+Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(200);
        await checkScrolled(scrollBars(page, 'horizontal', 1).last());
      });

      await test.step('Scroll both tables to a fixed position for stable geometry and screenshot', async () => {
        await scrollTableTo(page, { top: 100, left: 150 }, 0);
        await scrollTableTo(page, { top: 100, left: 150 }, 1);
      });

      await test.step(`Verify headers are ${item.sticky ? 'sticky' : 'scrolled away'}`, async () => {
        await expectHeaderPosition(page, item.sticky, 0);
        await expectHeaderPosition(page, item.sticky, 1);
      });

      await horizontalStep('Verify scrolled tables screenshot (only with wMax)', async () => {
        await expect(tableRoot(page, 0).locator('..')).toHaveScreenshot({ mask: [allScrollBars(page)] });
      });
    });
  });

  variantNoFixedColumn.forEach((item) => {
    test(`Verify Mouse scroll Multi Level scroll sticky=${item.sticky} withScrollBar=${item.withScrollBar} wMax=${item.wMax}`, {
      tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@data-table',
        '@base-components',
        '@flex-box',
      ],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/scroll-in-table.tsx', 'en', { ...item, multiLevel: true });
      const hasHorizontalScroll = item.wMax === '300px';

      await test.step('Verify vertical scroll by mouse wheel in both tables', async () => {
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(200);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(0, 600);
        await page.waitForTimeout(200);
        await checkScrolled(scrollBars(page, 'vertical', 0).first());
        await checkScrolled(scrollBars(page, 'vertical', 1).first());
      });

      const horizontalStep = hasHorizontalScroll ? test.step : test.step.skip;
      await horizontalStep('Verify horizontal scroll by mouse wheel in both tables (only with wMax)', async () => {
        await locators.dataTable(page).first().hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(200);
        await locators.dataTable(page).nth(1).hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(200);
        await checkScrolled(scrollBars(page, 'horizontal', 0).last());
        await checkScrolled(scrollBars(page, 'horizontal', 1).last());
      });

      await test.step('Scroll both tables to a fixed position for stable geometry and screenshot', async () => {
        await scrollTableTo(page, { top: 100, left: 150 }, 0);
        await scrollTableTo(page, { top: 100, left: 150 }, 1);
      });

      await test.step(`Verify multi-level headers are ${item.sticky ? 'sticky' : 'scrolled away'}`, async () => {
        await expectHeaderPosition(page, item.sticky, 0);
        await expectHeaderPosition(page, item.sticky, 1);
      });

      await horizontalStep('Verify scrolled tables screenshot (only with wMax)', async () => {
        await expect(tableRoot(page, 0).locator('..')).toHaveScreenshot({ mask: [allScrollBars(page)] });
      });
    });
  });

  test('Verify keyboard when sticky header with top props', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@data-table',
      '@base-components',
      '@flex-box',
    ],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/scroll-with-sticky-and-top-props-header.tsx', 'en');

    await page.keyboard.press('Tab');
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('ArrowDown');
    }
    await page.waitForTimeout(100);

    const headColumns = page.locator('[data-ui-name="Head.Column"]');
    await expect(headColumns).not.toHaveCount(0);
    for (const column of await headColumns.all()) {
      await expect(column).toHaveCSS('top', '100px');
    }

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.0005 });
  });
});

/* =====================================================
@functional
Scroll bar geometry - no snapshots here.
We verify offsets of the scroll bars against the fixed columns.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify offset of horizontal scroll bar is recalculated after table resize', {
    tag: [TAG.PRIORITY_HIGH, '@data-table',
      '@base-components',
      '@card',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/scroll-tests/real-table.tsx', 'en');

    const fixedColumn = locators.getHeadColumn(page, 1);
    const horizontalScrollBars = page.locator('[data-ui-name="ScrollArea.Bar"][aria-orientation="horizontal"]');

    await page.setViewportSize({ width: 1500, height: 900 });
    await expect(fixedColumn).toBeVisible();
    const wideColumnWidth = (await fixedColumn.boundingBox())!.width;

    await page.setViewportSize({ width: 800, height: 900 });

    await test.step('Verify the fixed column (minmax(139px, auto)) shrinks together with the table', async () => {
      await expect.poll(async () => (await fixedColumn.boundingBox())!.width, { timeout: 3000 }).toBeLessThan(wideColumnWidth);
    });

    await test.step('Verify horizontal scroll bars start at the end of the fixed column', async () => {
      await expect(horizontalScrollBars.first()).toBeVisible();

      for (const scrollBar of await horizontalScrollBars.all()) {
        await expect.poll(async () => {
          const scrollBarBox = (await scrollBar.boundingBox())!;
          const columnBox = (await fixedColumn.boundingBox())!;
          const scrollBarMargin = 4;

          return Math.abs(scrollBarBox.x - scrollBarMargin - (columnBox.x + columnBox.width));
        }, { timeout: 3000 }).toBeLessThanOrEqual(1);
      }
    });
  });
});
