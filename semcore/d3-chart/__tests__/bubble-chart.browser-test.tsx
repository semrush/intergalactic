import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Bubble chart', () => {
  test('Verify bubble base example renders and tooltip works', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bubble-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const items = page.locator('[data-ui-name="Bubble"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bubbles attributes', async () => {
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        await expect(item).toHaveAttribute('aria-hidden', 'true');
        await expect(item).toHaveAttribute('value', 'value');
      }
    });

    await test.step('Verify tooltip on hover', async () => {
      await items.nth(0).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bubble chart implementation renders and tooltip works', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/bubble-chart/bubble-chart.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]');
    const items = page.locator('[data-ui-name="Bubble"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bubbles attributes', async () => {
      const count = await items.count();

      for (let i = 0; i < count; i++) {
        const item = items.nth(i);
        await expect(item).toHaveAttribute('aria-hidden', 'true');
        await expect(item).toHaveAttribute('value', 'value');
      }
    });

    await test.step('Verify tooltip shown by hover', async () => {
      await items.nth(0).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify color customization', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/color-customization.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify legend and patter fill', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bubble-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    //only render because the fucnstionality doesnt; work

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });
});
