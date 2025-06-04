import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Bar horizontal compact', () => {
  test('Verify basic usage of bar horizontal compact', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const barBacks = page.locator('[data-ui-name="CompactHorizontalBar.Bar.Background"]');
    const barFills = page.locator('[data-ui-name="CompactHorizontalBar.Bar.Fill"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bars  backgrounds aria-hidden', async () => {
      const count = await barBacks.count();

      for (let i = 0; i < count; i++) {
        const bar = barBacks.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bars fills aria-hidden', async () => {
      const count = await barFills.count();

      for (let i = 0; i < count; i++) {
        const bar = barFills.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await barFills.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify advanced usage of bar horizontal compact', async ({ page }) => {
    const standPath =
      'stories/components/d3-chart/docs/examples/bar-horizontal-compact/advanced_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    const barBacks = page.locator('[data-ui-name="CompactHorizontalBar.Bar.Background"]');
    const barFills = page.locator('[data-ui-name="CompactHorizontalBar.Bar.Fill"]');
    await expect(chart).toBeVisible();

    await test.step('Verify bars  backgrounds aria-hidden', async () => {
      const count = await barBacks.count();

      for (let i = 0; i < count; i++) {
        const bar = barBacks.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bars fills aria-hidden', async () => {
      const count = await barFills.count();

      for (let i = 0; i < count; i++) {
        const bar = barFills.nth(i);
        await expect(bar).toHaveAttribute('aria-hidden', 'true');
      }
    });

    await test.step('Verify bar hihlights on hover and tooltip shown', async () => {
      await barFills.nth(1).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify bar horizontal compact with links', async ({ page }) => {
    const standPath = 'stories/components/d3-chart/docs/examples/bar-horizontal-compact/links.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const chart = page.locator('svg[data-ui-name="Plot"]').first();
    await expect(chart).toBeVisible();

    await test.step('Verify links by hover', async () => {
      await page.locator('[data-ui-name="Link.Text"]').nth(2).hover();
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify links by tab', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(500);
      await expect(page).toHaveScreenshot();
    });
  });
});
