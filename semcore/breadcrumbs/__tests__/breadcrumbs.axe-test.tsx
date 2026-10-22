import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@breadcrumbs ${TAG.ACCESSIBILITY}`, () => {
  test('Redefining a tag', async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/redefining_a_tag.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Base usage', async ({ page }) => {
    await loadPage(page, 'stories/components/breadcrumbs/docs/examples/usage_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
