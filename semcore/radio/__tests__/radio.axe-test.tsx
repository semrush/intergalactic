import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@radio ${TAG.ACCESSIBILITY}`, () => {
  test('Radiogroup', async ({ page }) => {
    await loadPage(page, 'stories/components/radio/docs/examples/radiogroup_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Additional props to input', async ({ page }) => {
    await loadPage(page, 'stories/components/radio/docs/examples/additional_props_for_input.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
