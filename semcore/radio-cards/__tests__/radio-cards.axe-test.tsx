import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@radio-cards ${TAG.ACCESSIBILITY}`, () => {
  test('Basic', async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/docs/examples/basic.tsx', 'en');

    await test.step('Verify initial render', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify after keyboard selection', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });

  test('Large icons', async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/docs/examples/large-icons.tsx', 'en');

    await test.step('Verify initial render', async () => {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });

    await test.step('Verify after keyboard selection', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    });
  });
});
