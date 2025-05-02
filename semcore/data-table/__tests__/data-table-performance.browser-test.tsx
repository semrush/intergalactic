import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Rows', () => {
  test('Verify Tooltip render performance', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/additional-tests/performmance-tooltips-ellipsis-test.tsx';
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

    //console.log(`Tooltip render time: ${duration.toFixed(2)}ms`);

    expect(duration).toBeGreaterThan(0);
    expect(duration).toBeLessThan(100);
  });
});
