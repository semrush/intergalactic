import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@pagination ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
