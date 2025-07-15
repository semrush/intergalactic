import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Accordion', () => {
  test('Basic usage', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Custom styles', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/custom_styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Heading tag', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/heading_tag.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Non compact', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/non_compact.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('One section opening', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/one_section_opening.tsx';
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

  test('SEO - with preserveNode', async ({ page }) => {
    const standPath = 'stories/components/accordion/docs/examples/seo.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
