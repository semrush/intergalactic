import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';

test.describe('Feedback form', () => {
  test('Default feedback', async ({ page }) => {
    const standPath = 'stories/components/feedback/docs/examples/default_feedback_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify empty form', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
    await test.step('Verify form with errors', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Feedback yes-no', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify notice', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
    await test.step('Verify empty form', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
    await test.step('Verify form with errors', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.type('qwe');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });
});
