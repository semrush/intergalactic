import { expect, test, getAccessibilityViolations } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@feedback-form ${TAG.ACCESSIBILITY}`, () => {
  test('Default feedback', async ({ page }) => {
    await loadPage(page, 'stories/components/feedback/docs/examples/default_feedback_form.tsx', 'en');

    await test.step('Verify empty form', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.locator(`[data-ui-name="FeedbackForm"]`).waitFor({ state: 'visible' });

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
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx', 'en');

    await test.step('Verify notice', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
    await test.step('Verify empty form', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await page.locator(`[data-ui-name="FeedbackForm"]`).waitFor({ state: 'visible' });

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

  test('Feedback rating', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx', 'en');

    await test.step('Verify notice', async () => {
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
    await test.step('Verify empty form', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');

      await page.getByRole(`dialog`).waitFor({ state: 'visible' });
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

      await page.getByRole('dialog').waitFor({ state: 'visible' });
      const violations = await getAccessibilityViolations({ page });

      expect(violations).toEqual([]);
    });
  });

  test('Feedback rating with form and illustration', async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-custom-illustration-and-notice.tsx', 'en');

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
  });
});
