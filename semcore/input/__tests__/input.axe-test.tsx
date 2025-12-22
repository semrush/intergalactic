import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input `, () => {
  test('Input with submit', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('Hello');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input with text addon', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_a_text_addon.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('Hello');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input with multiple addons', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_multiple_addons.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('Hello');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input with other component ', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_other_component_inside.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input with clear ', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('Hello');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input with loading state ', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('Hello');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input password ', async ({ page }) => {
    await loadPage(page, 'stories/components/input/docs/examples/password_input.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('Hello');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
