import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

// bug UIK-3605
test.describe(`${TAG.ACCESSIBILITY} @dot`, () => {
  test.skip('Dot with animation', async ({ page }) => {
    await loadPage(page, 'stories/components/dot/docs/examples/example_of_dot_animation.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
