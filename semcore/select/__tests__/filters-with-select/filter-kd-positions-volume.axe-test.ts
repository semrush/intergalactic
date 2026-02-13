import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@select ${TAG.ACCESSIBILITY}`, () => {
  test('Basic filter with opened menu', async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/presets.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('listbox').waitFor({ state: 'visible' });

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
