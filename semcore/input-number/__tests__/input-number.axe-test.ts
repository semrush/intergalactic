import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input-number `, () => {
  test('Basic', async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/tests/examples/basic_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Appearance customization', async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/appearance_customization.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Range of values', async ({ page }) => {
    await loadPage(page, 'stories/components/input-number/docs/examples/range_of_values.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
