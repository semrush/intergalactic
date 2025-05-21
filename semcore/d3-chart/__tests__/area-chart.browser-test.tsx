import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Area chart', () => {
  test('Verify basic Area Chart implementation', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/area-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify renders correctly', async () => {
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

  });

  test('Verify chart renders using the Area component', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/area-chart/area.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const dots = page.locator('circle[data-ui-name="Area.Dots"]');

    await test.step('Verify dots presents and have correct attributes', async () => {
      const count = await dots.count();

      for (let i = 0; i < count; i++) {
        const dot = dots.nth(i);
        await expect(dot).toHaveAttribute('aria-hidden', 'true');
        await expect(dot).toHaveAttribute('r', '4');
      }
    });

    await test.step('Verify no tooltip shown on hover', async () => {
      await dots.nth(1).hover();
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify chart when no data and single data', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/edge-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
  });

  test('Verify chart with custom line', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/custom-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();

  });

  test('Verify chart with interpolation function', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/area-chart/interpolation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify legend and pattern fill', async ({ page , browserName}) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/area-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify higlights by hover on label', async () => {
      const label = page.getByText('Line 1');
      await label.hover();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });

    if (browserName==='webkit') return;

    await test.step('Verify looks good when some items disabled by keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });
  });
});
