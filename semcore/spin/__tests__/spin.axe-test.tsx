import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@spin ${TAG.ACCESSIBILITY}`, () => {
  test('Basic example', async ({ page }) => {
    await loadPage(page, 'stories/components/spin/docs/examples/basic_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
