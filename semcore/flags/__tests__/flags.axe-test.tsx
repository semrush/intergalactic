import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @flags`, () => {
  test('Aria label', async ({ page }) => {
    await loadPage(page, 'stories/components/flags/docs/examples/aria-label.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
