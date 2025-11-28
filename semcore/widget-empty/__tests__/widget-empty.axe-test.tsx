import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@widget-empty ${TAG.ACCESSIBILITY}`, () => {
  test('Custom inside card without actions', async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/custom-examples.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Custom inside card with actions', async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/custom_examples_actions.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('Error example', async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/error_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('No data example', async ({ page }) => {
    await loadPage(page, 'stories/components/widget-empty/docs/examples/nodata_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
