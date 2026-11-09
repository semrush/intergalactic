import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

test.describe(`@base-components @hint ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/basic-usage.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Timeout', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/hint/docs/examples/timeout.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await locators.hint(page).waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
