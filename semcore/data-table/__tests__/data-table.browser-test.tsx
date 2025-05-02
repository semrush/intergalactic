import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('DataTable', () => {
  test('Renders correctly', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Renders correctly with scroll if some columns are fixed', async ({ page }) => {
    const standPath = 'semcore/data-table/__tests__/stands/scroll-and-fixed-column.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 820, height: 500 });

    await expect(page).toHaveScreenshot();
  });

  test('Keyboard access with changing data', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/pagination.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page.getByRole('gridcell', { name: 'ebay buy' })).toBeFocused();
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();

    await page.keyboard.press('Space');
    await page.keyboard.press('Space');
    await expect(page.getByRole('button', { name: 'Prev' })).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Shift+Tab');
    await expect(page.getByRole('gridcell', { name: 'ebay buy last' })).toBeFocused();
  });

  test.skip('Performance Test', async ({ page }) => {
    const standPath = 'stories/components/data-table/tests/examples/test-render.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Hint"]').nth(2);
    const tooltip = page.locator('[data-ui-name="Hint.Popper"]');

    await expect(trigger).toBeVisible();

    const renderTime = await page.evaluate(() => performance.now());

    await trigger.hover();

    await expect(tooltip).toBeVisible({ timeout: 2000 });

    const tooltipShownTime = await page.evaluate(() => performance.now());
    const duration = tooltipShownTime - renderTime;

    // console.log(`Tooltip render time: ${duration.toFixed(2)}ms`);

    // expect(duration).toBeGreaterThan(0);
    // expect(duration).toBeLessThan(100);
  });
});
