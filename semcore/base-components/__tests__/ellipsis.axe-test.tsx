import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  link: (page: Page) => page.getByRole('link'),
  text: (page: Page) => page.locator('[data-ui-name="Text"]'),
  hint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
};

test.describe(`@ellipsis ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/basic_usage.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.locator('[data-ui-name="Tag.Text"]').hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Multiple use', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/multiple_use.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('No hint with multiline', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/no_hint_with_multiline.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });

  test('With required last symbols', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/with_required_last_symbols.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await locators.text(page).first().hover();
      await locators.hint(page).waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('With search selection', async ({ page }) => {
    await loadPage(page, 'stories/components/base-components/ellipsis/docs/examples/with_search_selection.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
