import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@card ${TAG.ACCESSIBILITY}`, () => {
  test('Basic example', async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/basic_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Card layout for tables', async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/card_layout_for_tables.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Complex example', async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/complex_example.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Ellipsis', async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/ellipsis.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
