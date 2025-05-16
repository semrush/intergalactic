import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Rows', () => {
  test.skip('Verify Tooltip render performance', async ({ page }) => {
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

    expect(duration).toBeLessThan(500);
  });

  test('Measure render time between first and last row', async ({ page }) => {
    const standPath =
      'stories/components/data-table/tests/examples/additional-tests/performmance-tooltips-ellipsis-test.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const start = await page.evaluate(() => performance.now());

    const rows = page.locator('[role="row"]');

    const firstRowTime = await page.evaluate(() => performance.now());

    const count = await rows.count();
    // await expect(rows.nth(count - 1)).toBeVisible({ timeout: 2000 });
    const lastRowTime = await page.evaluate(() => performance.now());

    const firstRowDuration = firstRowTime - start;
    const fullRenderDuration = lastRowTime - start;
    const rangeDuration = lastRowTime - firstRowTime;
    expect(rangeDuration).toBeLessThan(70);

    // console.log(`First row appeared in: ${firstRowDuration.toFixed(2)}ms`);
    // console.log(`Last row appeared in: ${fullRenderDuration.toFixed(2)}ms`);
    // console.log(`Time between first and last row: ${rangeDuration.toFixed(2)}ms`);
  });
});
