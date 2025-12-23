import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@radio ${TAG.ACCESSIBILITY}`, () => {
  test('Radio and select', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
