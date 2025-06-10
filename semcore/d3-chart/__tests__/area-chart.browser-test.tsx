import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

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
    const paths = page.locator('path[data-ui-name="Area"]');

    await test.step('Verify dots presents and have correct attributes', async () => {
      const count = await dots.count();
      await expect(count).toBe(10);
      for (let i = 0; i < count; i++) {
        const dot = dots.nth(i);
        await expect(dot).toHaveAttribute('aria-hidden', 'true');
        await expect(dot).toHaveAttribute('r', '4');
      }
    });

    await test.step('Verify dot changes size on hover and no tooltip shown', async () => {
      await dots.nth(1).hover();
      await page.waitForTimeout(100);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify no unneeded attributes on DOM nodes', async () => {
      const pathsCount = await paths.count();
      expect(pathsCount).toBe(1);
      await expect(paths).not.toHaveAttribute('use:duration');
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
    const standPath = 'stories/components/d3-chart/tests/examples/area-chart/custom-line.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();
  });

  test('Verify chart with interpolation function', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/tests/examples/area-chart/interpolation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const paths = page.locator('path[data-ui-name="Area"]');
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot();

    await test.step('Verify no unneeded attributes on DOM nodes', async () => {
      const pathsCount = await paths.count();
      expect(pathsCount).toBe(2);
      await expect(paths.nth(0)).not.toHaveAttribute('use:duration');
      await expect(paths.nth(1)).not.toHaveAttribute('use:duration');
    });
  });

  test('Verify legend and pattern fill mouse interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/area-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();
    const label = page.getByText('Line 1');
    const label2 = page.getByText('Line 2');

    await test.step('Verify higlights by hover on label when checkbox is checked', async () => {
      await label.hover();
      await page.waitForTimeout(300);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify looks good when item unchecked and hover it', async () => {
      await label.click();
      await label.hover();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify legend and pattern fill keyboard interactions', async ({ page, browserName }) => {
    const standPath =
      'stories/components/d3-chart/tests/examples/area-chart/legend-and-pattern-fill.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify looks good when item focused', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify looks good when item unchecked by ', async () => {
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify looks good when next item focused', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });
});
