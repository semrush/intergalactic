import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Wizard axe checks', () => {
  test('Base example', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Custom Step', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/custom-step.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Custom Stepper', async ({ page }) => {
    const standPath = 'stories/components/wizard/docs/examples/custom-stepper.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
