import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Summary', () => {
  test('Default', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.waitForTimeout(3500);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('With error', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-error.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.waitForTimeout(3500);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('With minitrend', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
