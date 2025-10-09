import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

test.describe('@add-filter', () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
