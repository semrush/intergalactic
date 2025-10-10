import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';

test.describe('@add-filter', () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('menuitem', { name: 'Color' }).waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    { await page.keyboard.press('Enter');
      await page.getByRole('menuitem', { name: 'Color' }).waitFor({ state: 'hidden' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
