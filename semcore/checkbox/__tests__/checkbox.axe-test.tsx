import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Checkbox', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/checkbox/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath = 'stories/components/checkbox/docs/examples/partial_selection.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
    const standPath =
      'stories/components/checkbox/docs/examples/checkbox_with_other_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Additional props for input', async ({ page }) => {
    const standPath = 'stories/components/checkbox/docs/examples/additional_props_for_input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Aria label props drilling', async ({ page }) => {
    const standPath = 'stories/components/checkbox/advanced/examples/aria_label_props_drilling.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
