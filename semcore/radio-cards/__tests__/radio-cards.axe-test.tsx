import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@radio-cards  ${TAG.ACCESSIBILITY}`, () => {
  test('Basic', async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/docs/examples/basic.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  test('Advanced', async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/docs/examples/advanced.tsx', 'en');

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });

  /*
    The `loading` prop puts a Skeleton (an SVG with role='img') inside the radio's label,
    so check that the extra image role does not break the radiogroup semantics.
  */
  test('Loading', async ({ page }) => {
    await loadPage(page, 'stories/components/radio-cards/tests/examples/radio-card-all-props.tsx', 'en', { loadingCard: '1', disabledCard: 'none' });

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowLeft');

      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }
  });
});
