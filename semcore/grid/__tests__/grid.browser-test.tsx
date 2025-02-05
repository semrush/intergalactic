import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Grid base tests', () => {
  const sizes = [{ width: 320 }, { width: 768 }, { width: 1200 }];

  sizes.forEach(({ width }) => {
    test(`Verify Row gutter for each ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/grid/docs/examples/example-use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.setViewportSize({ width, height: 800 });

      const row = await page.locator('div[data-ui-name="Row"]');

      expect(
        await row.evaluate((box) => {
          const computedStyle = window.getComputedStyle(box);
          return {
            marginLeft: computedStyle.marginLeft,
            marginRight: computedStyle.marginRight,
          };
        }),
      ).toEqual({ marginLeft: '-8px', marginRight: '-8px' });

      const cols = await page.$$('[data-ui-name="Row.Col"]');

      for (const col of cols) {
        const colPaddingLeft = await col.evaluate((el) => getComputedStyle(el).paddingLeft);
        const colPaddingRight = await col.evaluate((el) => getComputedStyle(el).paddingRight);

        expect(colPaddingLeft).toBe('8px');
        expect(colPaddingRight).toBe('8px');
      }
    });
  });

  sizes.forEach(({ width }) => {
    test(`Verify Col span and offset for each ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/grid/docs/examples/change-in-general-offset.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.setViewportSize({ width, height: 800 });
      await expect(page).toHaveScreenshot();
      const row = await page.waitForSelector('div[data-ui-name="Row"]');

      const columns = await row.$$('div[data-ui-name="Row.Col"]');

      // Expected span and offset values based on the HTML structure
      const expectedSpanValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const expectedOffsetValues = ['11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];

      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];

        const spanClass = await column.evaluate((el) => el.className);

        // Extract the span value from the class (e.g. _span_2_wia8r_gg_)
        const spanMatch = spanClass.match(/_span_(\d+)/);
        const spanValue = spanMatch ? spanMatch[1] : null;

        expect(spanValue).toBe(expectedSpanValues[i]);

        const offset = await column.evaluate((el) => el.getAttribute('offset'));

        expect(offset).toBe(expectedOffsetValues[i]);

        const rowPaddingLeft = await column.evaluate((el) => {
          return window.getComputedStyle(el).paddingLeft;
        });

        const rowPaddingRight = await column.evaluate((el) => {
          return window.getComputedStyle(el).paddingRight;
        });

        expect(rowPaddingLeft).toBe('8px');
        expect(rowPaddingRight).toBe('8px');
      }
    });
  });

  sizes.forEach(({ width }) => {
    test(`Verify Grid is responsive with md, sm, xs, offset and mdOffset for each ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/grid/docs/examples/responsive.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await page.setViewportSize({ width, height: 800 });
      await expect(page).toHaveScreenshot();
    });
  });

  sizes.forEach(({ width }) => {
    test(`Verify Grid is responsive with alternative API for each ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/grid/docs/examples/responsive-alternative-api.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await page.setViewportSize({ width, height: 800 });
      await expect(page).toHaveScreenshot();
    });
  });
});
