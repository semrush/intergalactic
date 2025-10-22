import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@color-picker ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/basic_example.tsx', 'en'); // check volor picker trigger
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
    await loadPage(page, 'stories/components/color-picker/docs/examples/custom_trigger.tsx', 'en');
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
    await loadPage(page, 'stories/components/color-picker/docs/examples/input_validation.tsx', 'en');

    await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();
    const input = page.locator('input[data-ui-name="PaletteManager.InputColor"]');
    await input.fill('fffffff');
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
