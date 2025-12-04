import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@spin-container ${TAG.ACCESSIBILITY}`, () => {
  test('Verify no Axe errors when used in content', async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/docs/examples/usage_in_content.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Verify no Axe errors when used in dropdown', async ({ page }) => {
    await loadPage(page, 'stories/components/spin-container/docs/examples/usage_in_dropdowns.tsx', 'en');

    await page.locator('[data-ui-name="Dropdown.Trigger"]').click();

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
