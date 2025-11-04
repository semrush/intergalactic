import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@checkbox  ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/basic_usage.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Partial selection', async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/partial_selection.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('With other components', async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Additional props for input', async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/docs/examples/additional_props_for_input.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Aria label props drilling', async ({ page }) => {
    await loadPage(page, 'stories/components/checkbox/advanced/examples/aria_label_props_drilling.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
