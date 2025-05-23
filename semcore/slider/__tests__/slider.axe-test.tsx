import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Slider', () => {
  test('Slider with options', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/slider_with_options.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    const filtered = violations.filter((v) => v.id !== 'button-name');
    expect(filtered).toEqual([]);
  });

  test('Numeric slider', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/numeric_slider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    const filtered = violations.filter((v) => v.id !== 'button-name');
    expect(filtered).toEqual([]);
  });

  test('Customized view slider', async ({ page }) => {
    const standPath = 'stories/components/slider/docs/examples/customized_options_view.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });
    const filtered = violations.filter((v) => v.id !== 'button-name');
    expect(filtered).toEqual([]);
  });
});
