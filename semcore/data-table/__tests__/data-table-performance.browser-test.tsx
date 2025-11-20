import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.skip('Measure render time between first and last row', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/tests/examples/additional-tests/performmance-tooltips-ellipsis-test.tsx', 'en');

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
