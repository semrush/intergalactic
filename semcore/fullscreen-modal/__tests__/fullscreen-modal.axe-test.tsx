import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @fullscreen-modal `, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx', 'en');

    await page.locator('[data-ui-name="Button"]').click();
    await page.waitForTimeout(200);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Dual zone', async ({ page }) => {
    await loadPage(page, 'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx', 'en');

    await page.locator('[data-ui-name="Button"]').click();
    await page.waitForTimeout(200);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
