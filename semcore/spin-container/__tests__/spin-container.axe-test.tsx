import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Spin-container', () => {
  test('Verify no Axe errors when used in content', async ({ page }) => {
    const standPath = 'stories/components/spin-container/docs/examples/usage_in_content.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Verify no Axe errors when used in dropdown', async ({ page }) => {
    const standPath = 'stories/components/spin-container/docs/examples/usage_in_dropdowns.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.locator('[data-ui-name="Dropdown.Trigger"]').click();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
