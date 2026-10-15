import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@inline-edit ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/simple_use.tsx', 'en');

    await test.step('Verify view mode', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify focused view', async () => {
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

  test('Editable tag', async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/editable_tag.tsx', 'en');

    await test.step('Verify view mode', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify focused view', async () => {
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

  test('Pseudo network interaction', async ({ page }) => {
    await loadPage(page, 'stories/components/inline-edit/docs/examples/pseudo_network_interaction.tsx', 'en');

    await test.step('Verify view mode', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify focused view', async () => {
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
});
