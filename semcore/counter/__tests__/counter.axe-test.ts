import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Counter', () => {
  test('Animated number', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/animated_number.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('Counter and typography', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_and_typography.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In button', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In dot', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_dot.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In filters', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_filters.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In forms', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_forms.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In limits', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_limits.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
  test('In pills', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_pills.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    expect(violations).toEqual([]);
  });
});
