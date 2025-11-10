import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.FUNCTIONAL} @feature-popover`, () => {
  test('Addons', async ({ page }) => {
    await loadPage(page, 'stories/components/feature-popover/docs/examples/Basic.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
