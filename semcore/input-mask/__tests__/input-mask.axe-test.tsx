import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`${TAG.ACCESSIBILITY} @input-mask `, () => {
  test('Aliases', async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/aliases.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('1234');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('InputMask', async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/inputmask.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('1234567890123456');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Pipe', async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/pipe.tsx', 'en');

    {
      await page.keyboard.press('Tab');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.type('1234567890123456');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });
});
