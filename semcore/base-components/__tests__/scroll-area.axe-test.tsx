import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

test.describe('ScrollArea', () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/scroll-area/docs/examples/basic_usage.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
