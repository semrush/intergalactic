import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@accordion ${TAG.ACCESSIBILITY}`, () => {
  test('Basic usage', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/basic_usage.tsx', 'en');

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

  test('Custom styles', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/custom_styles.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Heading tag', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/heading_tag.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Non compact', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/non_compact.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('One section opening', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/one_section_opening.tsx', 'en');

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
    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('SEO - with preserveNode', async ({ page }) => {
    await loadPage(page, 'stories/components/accordion/docs/examples/seo.tsx', 'en');
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
});
