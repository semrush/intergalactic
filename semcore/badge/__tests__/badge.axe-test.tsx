import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/tags';

test.describe(`${TAG.ACCESSIBILITY}`, () => {
  test('All types', async ({ page }) => {
    await loadPage(page, 'stories/components/badge/docs/examples/badge_main_types.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
