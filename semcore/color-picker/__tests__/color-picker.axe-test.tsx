import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@color-picker ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/basic_example.tsx', 'en');

    await test.step('Check color picker trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check expanded popper', async () => {
      await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Custom trigger without input on popper', async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/custom_trigger.tsx', 'en');

    await test.step('Check custom trigger', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Check expanded popper', async () => {
      await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Palette manager', async ({ page }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/palettemanager.tsx', 'en');

    await test.step('Check expanded popper with palette manager', async () => {
      await page.locator('[data-ui-name="ColorPicker.Trigger"]').click();

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
