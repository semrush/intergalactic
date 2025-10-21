import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@carousel  ${TAG.ACCESSIBILITY}`, () => {
  test('Default indicators', async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_default_indicators.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
  test('Indicators only', async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_indicators_only.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Preview indicators', async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_with_preview_indicators.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
  test('Without modal', async ({ page }) => {
    await loadPage(page, 'stories/components/carousel/tests/examples/carousel_without_modal_window.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
