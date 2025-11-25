import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@notice-global ${TAG.ACCESSIBILITY}`, () => {
  test('Verify basic usage accessibility', async ({ page }) => {
    await loadPage(page, 'stories/components/notice-global/docs/examples/basic_usage.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
