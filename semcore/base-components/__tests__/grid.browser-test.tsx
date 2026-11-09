import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const sizes = [{ width: 320 }, { width: 768 }, { width: 1200 }];

const getColSpan = (className: string) => className.match(/_span_(\d+)/g)?.at(-1)?.match(/\d+/)?.[0] ?? null;

/* =====================================================
@visual
Visual states, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  sizes.forEach(({ width }) => {
    test(`Verify Col span and offset for each ${width}px`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-components',
        '@grid',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/grid/docs/examples/change-in-general-offset.tsx', 'en');

      await page.setViewportSize({ width, height: 800 });
      await expect(page).toHaveScreenshot();
      await page.waitForSelector('div[data-ui-name="Row"]');

      const columns = await page.locator('[data-ui-name="Row.Col"]').all();
      const expectedSpanValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const expectedOffsetValues = ['11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
      await page.waitForTimeout(100);

      for (const [i, column] of columns.entries()) {
        await test.step(`Verify column ${i + 1} has span=${expectedSpanValues[i]}, offset=${expectedOffsetValues[i]} and 8px gutters`, async () => {
          expect(getColSpan(await column.evaluate((el) => el.className))).toBe(expectedSpanValues[i]);
          await expect(column).toHaveAttribute('offset', expectedOffsetValues[i]);
          await expect(column).toHaveCSS('padding-left', '8px');
          await expect(column).toHaveCSS('padding-right', '8px');
        });
      }
    });
  });

  sizes.forEach(({ width }) => {
    test(`Verify Grid is responsive with md, sm, xs, offset and mdOffset for each ${width}px`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-components',
        '@grid',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/grid/docs/examples/responsive.tsx', 'en');

      await page.setViewportSize({ width, height: 800 });
      await expect(page).toHaveScreenshot();
    });
  });

  sizes.forEach(({ width }) => {
    test(`Verify Grid is responsive with alternative API for each ${width}px`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-components',
        '@grid',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/grid/docs/examples/responsive-alternative-api.tsx', 'en');

      await page.setViewportSize({ width, height: 800 });
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
@functional
Computed styles - no snapshots here.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  sizes.forEach(({ width }) => {
    test(`Verify Row gutter for each ${width}px`, {
      tag: [TAG.PRIORITY_HIGH,
        '@base-components',
        '@grid',
        '@flex-box'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/base-components/grid/docs/examples/example-use.tsx', 'en');

      await page.setViewportSize({ width, height: 800 });

      await test.step('Verify Row has -8px horizontal margins', async () => {
        const row = page.locator('div[data-ui-name="Row"]');
        await expect(row).toHaveCSS('margin-left', '-8px');
        await expect(row).toHaveCSS('margin-right', '-8px');
      });

      await test.step('Verify each Col has 8px horizontal paddings', async () => {
        for (const col of await page.locator('[data-ui-name="Row.Col"]').all()) {
          await expect(col).toHaveCSS('padding-left', '8px');
          await expect(col).toHaveCSS('padding-right', '8px');
        }
      });
    });
  });
});
