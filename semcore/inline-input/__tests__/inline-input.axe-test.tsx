import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @inline-input`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/basic_usage.tsx', 'en');

    await test.step('Verify default state', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Verify focused editor', async () => {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Inheriting text size', async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/inheriting_text_size.tsx', 'en');

    await test.step('Verify default state', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Verify focused editor', async () => {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Verify edit mode', async () => {
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Number only input', async ({ page }) => {
    await loadPage(page, 'stories/components/inline-input/docs/examples/number-only_input.tsx', 'en');

    await test.step('Verify default state', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });

    await test.step('Verify focused editor', async () => {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
