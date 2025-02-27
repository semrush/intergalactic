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

      const columns = await page.locator('[data-ui-name="Row.Col"]').all();

      for (const col of columns) {
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

      const columns = await page.locator('[data-ui-name="Row.Col"]').all();

      // Expected span and offset values based on the HTML structure
      const expectedSpanValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
      const expectedOffsetValues = ['11', '10', '9', '8', '7', '6', '5', '4', '3', '2', '1'];
      await page.waitForTimeout(100);
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i];
        const spanClass = await column.evaluate((el) => el.className);
        const spanMatches = spanClass.match(/_span_(\d+)/g);
        let secondSpanValue = null;
        if (spanMatches && spanMatches.length > 1) {
          secondSpanValue = spanMatches[1].match(/\d+/)[0];
        }
        // added this logic because sometimes the class can contain two spans, where the second one is correct, and sometimes it contains only one correct span in the class.
        const spanValue =
          spanMatches?.length > 1
            ? spanMatches[1].match(/\d+/)?.[0]
            : spanMatches?.[0]?.match(/\d+/)?.[0] ?? null;
        expect(spanValue).toBe(expectedSpanValues[i]);
        const offset = await column.evaluate(
          (el) => el.getAttribute('offset') || getComputedStyle(el).getPropertyValue('offset'),
        );
        expect(offset).toBe(expectedOffsetValues[i]);
        const rowPaddingLeft = await column.evaluate(
          (el) => window.getComputedStyle(el).paddingLeft,
        );
        const rowPaddingRight = await column.evaluate(
          (el) => window.getComputedStyle(el).paddingRight,
        );
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
