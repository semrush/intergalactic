import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Feature highlight', () => {
  test('Badge', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/badge.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Button', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Checkbox', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/checkbox.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Data table', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/data-table.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Input', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/input.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Notice', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/notice.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Pills', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/pills.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Radio', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/radio.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Select', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/select.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    {
      const violations = await getAccessibilityViolations({ page });
      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.getByRole('option').first().waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }

    {
      await page.keyboard.press('Enter');

      await page.getByRole('option').first().waitFor({ state: 'hidden' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    }
  });

  test('Switch', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/switch.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });

  test('Tabline', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feature-highlight/docs/examples/tabline.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const violations = await getAccessibilityViolations({ page });

    expect(violations).toEqual([]);
  });
});
