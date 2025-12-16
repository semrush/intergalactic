import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input-tags @select`, () => {
  test('Input tags and select', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
