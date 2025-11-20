import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@skeleton ${TAG.ACCESSIBILITY}`, () => {
  test('Skeleton examples for charts', async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/docs/examples/skeleton_examples_for_charts.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Text initial loading', async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/docs/examples/text_initial_loading.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Usage with other elements', async ({ page }) => {
    await loadPage(page, 'stories/components/skeleton/docs/examples/usage_with_other_elements.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
