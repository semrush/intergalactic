import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('5-star Feedback form', () => {
  test('Verify mouse interaction with base cases', async ({ page, browserName }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const sliderRating = await page.locator('[data-ui-name="SliderRating"]');
    const secondStar = await sliderRating.locator('[data-ui-name="Box"]').nth(1);

    await secondStar.hover();
    await expect(page).toHaveScreenshot();
    await secondStar.click();

    const firstCheckbox = page.getByLabel('Score is more accurate');
    await expect(firstCheckbox).toBeFocused();

    const closeBtn = page.locator('[data-ui-name="Modal.Close"]');
    await closeBtn.click();
    await page.waitForTimeout(600);
    await expect(sliderRating).toHaveAttribute('aria-valuenow', '0');

    await secondStar.hover();
    await secondStar.click();

    const submit = await page.locator('[data-ui-name="FeedbackRatingForm.Submit"]');
    await submit.click();
    await page.waitForTimeout(1200);
    await expect(page).toHaveScreenshot();
  });

  test('Verify keyboard interaction with base cases', async ({ page, browserName }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const sliderRating = await page.locator('[data-ui-name="SliderRating"]');
    const feedbackForm = page.getByRole('dialog', { name: 'Great! What do you like the' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(feedbackForm).not.toBeVisible();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Enter');
    await expect(feedbackForm).toBeVisible();
    const firstCheckbox = page.getByLabel('Score is more accurate');
    await expect(firstCheckbox).toBeFocused();
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Escape');
    await page.waitForTimeout(600);
    await expect(feedbackForm).not.toBeVisible();
    await expect(sliderRating).toHaveAttribute('aria-valuenow', '0');
    await page.keyboard.press('Enter');
    await expect(feedbackForm).not.toBeVisible();
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);
    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(300);
    await expect(sliderRating).toHaveAttribute('aria-valuenow', '0');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Enter');
    await expect(feedbackForm).toBeVisible();
    for (let i = 0; i < 6; i++) await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(600);
    await expect(page.locator('[data-ui-name="Notice"]')).not.toBeVisible();
  });

  test('Verify default validation', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sliderRating = await page.locator('[data-ui-name="SliderRating"]');

    const secondStar = await sliderRating.locator('[data-ui-name="Box"]').nth(1);

    await secondStar.click();
    await page.waitForTimeout(50);
    const description = await page.getByLabel('If there anything we could improve?');
    await description.fill('some short');

    await page.keyboard.press('Tab');

    await page.keyboard.type('Invalid email');

    await page.keyboard.press('Tab'); // link in email description
    await page.keyboard.press('Tab'); // submit button

    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();
  });

  test('Verify feedback rating with error notice on submit', async ({ page, browserName }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-error-on-send.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const sliderRating = await page.locator('[data-ui-name="SliderRating"]');
    const secondStar = await sliderRating.locator('[data-ui-name="Box"]').nth(1);

    await secondStar.hover();
    await secondStar.click();

    const submit = await page.locator('[data-ui-name="FeedbackRatingForm.Submit"]');
    await submit.click();
    await page.waitForTimeout(1200);
    await expect(page).toHaveScreenshot();
  });
});
