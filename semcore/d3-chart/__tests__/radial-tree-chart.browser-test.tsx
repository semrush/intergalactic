import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Radial tree chart', () => {

  test('Verify basic usage with select', async ({ page, browserName }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const labels = page.locator('[data-ui-name="RadialTreeRadian.Label"]');
    const lines = page.locator('[data-ui-name="RadialTreeRadian.Line"]');
    const caps = page.locator('[data-ui-name="RadialTreeRadian.Cap"]');
    const title = page.locator('[data-ui-name="RadialTree.Title"]');

    await expect(chart).toBeVisible();

    await expect(title.first()).toHaveAttribute('aria-hidden', 'true');

    await test.step('Verify labels aria-hidden', async () => {
      const count = await labels.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const bar = labels.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify caps aria-hidden', async () => {
      const count = await caps.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const cap = caps.nth(i);
        await expect(cap).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify lines aria-hidden', async () => {
      const count = await lines.count();
      await expect(count).not.toBeNull();

      for (let i = 0; i < count; i++) {
        const line = lines.nth(i);
        await expect(line).toHaveAttribute('aria-hidden', 'true');
      }
    });

  });

  test('Verify basic usage', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(); 
  });

  test('Verify custom svg in center', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/custom-svg-in-center.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(); 
    });

  test('Verify multicolor', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/multicolor-and-accessibility.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(); 
    });

  test('Verify multiline', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/radial-tree-chart/multiline-text.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot(); 
  
  });


});
