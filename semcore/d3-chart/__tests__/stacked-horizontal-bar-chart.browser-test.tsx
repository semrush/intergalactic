import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Stacked Horizontal Bar chart', () => {
  test('Verify stacked bar chart base example renders and tooltip shown on hover', async ({
    page,
  }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/stacked-horizontal-bar/horizontal-stacked-bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const bars = page.locator('[data-ui-name="StackBar.HorizontalBar"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bars aria-hidden', async () => {
      const count = await bars.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const bar = bars.nth(i);
        await expect(bar.first()).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await bars.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify negative values render', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/stacked-horizontal-bar/horizontal-stacked-bar-negative.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify bar legend and pattern fill mouse interactions', async ({ page, browserName }) => {
    const standPath =
    'stories/components/d3-chart/tests/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const label = page.getByText('Category 1');
    const label2 = page.getByText('Category 2');

    await test.step('Verify higlights by hover on label', async () => {
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify not higlights by hover on unchecked  label', async () => {
      await label.click();
      await label.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify higlights by hover on other label', async () => {
      await label2.hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bar legend and pattern fill keyboard interactions', async ({ page, browserName }) => {
    const standPath =
    'stories/components/d3-chart/tests/examples/stacked-horizontal-bar/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const label = page.getByText('Category 1');
    const label2 = page.getByText('Category 2');

    await test.step('Verify highlights when focused', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify highlights when checked and unchecked', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify not highlights when unchecked', async () => {
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});
