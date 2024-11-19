import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('5-star Feedback form', () => {
  test('simple use case', async ({ page, browserName }) => {
    // TODO: in firefox and webkit headless mod textarea auto focus is very unstable
    if (browserName === 'webkit') return;
    if (browserName === 'firefox') return;

    const standPath =
      'stories/patterns/feedback-rating/__stories__/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const sliderRating = await page.locator('[data-ui-name="SliderRating"]');

    const stars = await sliderRating.locator('[data-ui-name="Box"]').all();

    await stars[1].hover();

    await expect(page).toHaveScreenshot();

    await stars[1].click();

    const textarea = await page.locator('textarea');

    await expect(textarea).toBeFocused();

    await expect(page).toHaveScreenshot();

    const submit = await page.locator('[data-ui-name="FeedbackRatingForm.Submit"]');

    await submit.click();

    await expect(page).toHaveScreenshot();

    await page.waitForTimeout(1200);

    await expect(page).toHaveScreenshot();
  });

  test('default validation', async ({ page }) => {
    const standPath =
      'stories/patterns/feedback-rating/__stories__/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sliderRating = await page.locator('[data-ui-name="SliderRating"]');
    const stars = await sliderRating.locator('[data-ui-name="Box"]').all();

    await stars[1].click();

    const description = await page.getByLabel('If there anything we could improve?');

    await description.fill('some short');

    await page.keyboard.press('Tab');

    await page.keyboard.type('Invalid email');

    await page.keyboard.press('Tab'); // link in email description
    await page.keyboard.press('Tab'); // submit button

    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();
  });
});
