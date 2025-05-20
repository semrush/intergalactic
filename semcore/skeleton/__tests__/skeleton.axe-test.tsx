import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Skeleton', () => {
  test('Verify no Axe errrors when using in charts', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/skeleton_examples_for_charts.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Verify no Axe errrors when using in Loading text', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/text_initial_loading.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Verify no Axe errrors when using in Custom shapes', async ({ page }) => {
    const standPath = 'stories/components/skeleton/docs/examples/usage_with_other_elements.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
