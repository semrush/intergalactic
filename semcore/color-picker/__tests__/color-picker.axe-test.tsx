import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Color-Picker', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    // check volor picker trigger
    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    // check expamded popper
    {
      await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Custom trigger without input on popper', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/custom_trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Input validation', async ({ page }) => {
    const standPath = 'stories/components/color-picker/docs/examples/input_validation.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();
    const input = page.locator('input[data-ui-name="PaletteManager.InputColor"]');

    await input.fill('fffffff');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
