import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Input', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
