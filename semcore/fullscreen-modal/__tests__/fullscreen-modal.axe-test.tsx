import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Fullscreen modal', () => {
  test('Basic usage', async ({ page }) => {
    const standPath =
      'stories/components/fullscreen-modal/docs/examples/basic_fullscreen.headers_use.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.locator('[data-ui-name="Button"]').click();
    await page.waitForTimeout(200);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Dual zone', async ({ page }) => {
    const standPath =
      'stories/components/fullscreen-modal/docs/examples/example_of_a_dual-zone_modal_window.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.locator('[data-ui-name="Button"]').click();
    await page.waitForTimeout(200);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
