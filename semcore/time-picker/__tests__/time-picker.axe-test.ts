import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @time-picker`, () => {
  test('Timepicker', async ({ page }) => {
    await loadPage(page, 'stories/components/time-picker/docs/examples/expanded_access_to_all_the_components.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('option').first().waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
