import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { selectOption } from './utils';

test.describe('FilterTrigger', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // check empty filter trigger
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // check filter trigger with value
    {
      await selectOption(page);

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
