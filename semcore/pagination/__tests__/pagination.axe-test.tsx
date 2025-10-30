import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@tools/testing-utils/shared/helpers';

test.describe('Pagination', () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/pagination/docs/examples/basic_usage.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Verify id for input in advanced PageInput mode', async ({ page }) => {
    await loadPage(page, 'stories/components/pagination/tests/examples/advanced_page_input.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
