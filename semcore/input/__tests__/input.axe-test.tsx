import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';

test.describe('Input', () => {
  test('Input with submit', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_a_submit_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath = 'stories/components/input/docs/examples/input_with_a_text_addon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath = 'stories/components/input/docs/examples/input_with_multiple_addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath =
      'stories/components/input/docs/examples/input_with_other_component_inside.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input with clear ', async ({ page }) => {
    const standPath = 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath = 'stories/components/input/docs/examples/input_with_the_clearing_ability.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath = 'stories/components/input/docs/examples/password_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
