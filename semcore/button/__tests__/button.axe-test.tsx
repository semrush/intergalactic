import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Button', () => {
  test('Addons', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/addons.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Buttons accessibility', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_accessibility.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Buttons with icon', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_with_icon.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Buttons with loading', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_with_loading.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});

test.describe('Button Link', () => {
  test('ButtonLink', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_link.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
