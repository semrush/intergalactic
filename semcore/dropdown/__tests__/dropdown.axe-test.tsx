import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @dropdown`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/basic_usage.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened dropdown check
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Focus interaction', async ({ page }) => {
    await loadPage(page, 'stories/components/dropdown/docs/examples/focus_interaction.tsx', 'en');

    // base check
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // opened dropdown check
    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
