import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@bulk-textarea ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/bulk-textarea/docs/examples/basic-usage.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      const text =
        'Zoom in on product categories to understand how each site segment drives conversions.\nSecond row\n3 row\n4 row\n5 row\n6 row\n7 row\n8 row\n9 row\n10 row';
      await page.keyboard.type(text, { delay: 20 });
      await page.keyboard.press('Tab');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
