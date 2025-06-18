import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Form', () => {
  test('Checkbox and radio', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/checkbox-and-radio.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Datepicker and timepicker', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/datepicker-and-timepicker.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Login', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/default-log-in-form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
  test('Input tags and select', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
