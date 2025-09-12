import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify base feedback form styles', async ({ page }) => {
    const standPath =
      'stories/components/feedback/docs/examples/default_feedback_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = page.getByRole('button');
    const feedbackForm = page.locator('[data-ui-name="FeedbackForm"]');
    const inputs = page.getByRole('textbox');
    const notice = page.locator('[data-ui-name="FeedbackForm.Notice"]');

    await test.step('Verify feedback First open styles', async () => {
      await trigger.click();
      await feedbackForm.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      const boxinForm = feedbackForm.locator('[data-ui-name="Box"]').first();
      await expect(boxinForm).toHaveCSS('padding', '16px');
      await expect(notice).toHaveCSS('padding-top', '12px');
      await expect(notice).toHaveCSS('padding-bottom', '12px');
      await expect(notice).toHaveCSS('padding-left', '16px');
      await expect(notice).toHaveCSS('padding-right', '16px');
    });

    await test.step('Verify 2nd input item', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify input items validation', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text="Your feedback must contain at least 10 characters."');
      await expect(page).toHaveScreenshot();

      await inputs.first().fill('Your feedback must contain at least 10 characters. our feedback must contain at least 10 characters. our feedback must contain at least 10 characters. our feedback must contain at least 10 characters.');
      await page.keyboard.press('Tab');
      await page.getByRole('tooltip', { name: 'Please enter valid email.' }).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await inputs.nth(1).fill('test@test.test');
    });

    await test.step('Verify spin and success form', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.locator('[aria-label="Loading…"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await page.locator('[aria-label="Loading…"]').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify base feedback form loading styles', async ({ page }) => {
    const standPath =
      'stories/components/feedback/tests/examples/feedback_form_theme_loading.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = page.getByRole('button');
    const feedbackForm = page.locator('[data-ui-name="FeedbackForm"]');
    const inputs = page.getByRole('textbox');

    await trigger.click();
    await feedbackForm.waitFor({ state: 'visible' });
    await inputs.first().fill('Your feedback must contain at least 10 characters.');

    await page.keyboard.press('Tab');

    await inputs.nth(1).fill('test@test.test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');
    await page.locator('[aria-label="Loading…"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify base feedback form keyboard interaction', async ({ page }) => {
    const standPath =
      'stories/components/feedback/docs/examples/default_feedback_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = page.getByRole('button');
    const feedbackForm = page.locator('[data-ui-name="FeedbackForm"]');
    const inputs = page.getByRole('textbox');
    const success = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify feedback form items opened by Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await feedbackForm.waitFor({ state: 'visible' });
      await expect(inputs.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(inputs.nth(1)).toBeFocused();
    });
    await test.step('Verify feedback form items attributes', async () => {
      await expect(feedbackForm).toHaveAttribute('novalidate');
      await expect(feedbackForm).toHaveAttribute('method', 'POST');

      const count = await inputs.count();
      for (let i = 0; i < count; i++) {
        await expect(inputs.nth(i)).toHaveAttribute('aria-invalid', 'false');
      }
      await expect(inputs.nth(0)).toHaveAttribute('name', 'description');
      await expect(inputs.nth(1)).toHaveAttribute('name', 'email');
    });

    await test.step('Verify feedback form closed by Cancel', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await feedbackForm.waitFor({ state: 'hidden' });
      await expect(feedbackForm).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify feedback form closed by Escape', async () => {
      await page.keyboard.press('Space');
      await feedbackForm.waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await feedbackForm.waitFor({ state: 'hidden' });
      await expect(feedbackForm).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });

    await test.step('Verify feedback form validation starts and form not closed by activate Send Feedback', async () => {
      await page.keyboard.press('Space');
      await feedbackForm.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForSelector('text="Your feedback must contain at least 10 characters."');
      await expect(inputs.first()).toBeFocused();
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        await expect(inputs.nth(i)).toHaveAttribute('aria-invalid', 'true');
        await expect(inputs.nth(i)).toHaveAttribute('aria-describedby');
      }

      await page.keyboard.press('Tab');
    });

    await test.step('Verify feedback form changes to Success by Send feedback when inputs filled', async () => {
      await page.keyboard.press('Shift+Tab');
      await inputs.first().fill('Your feedback must contain at least 10 characters.');
      await expect(inputs.nth(0)).toHaveAttribute('aria-invalid', 'false');
      await page.keyboard.press('Tab');
      await inputs.nth(1).fill('test@test.test');
      await expect(inputs.nth(1)).toHaveAttribute('aria-invalid', 'false');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await success.waitFor({ state: 'visible' });
      await expect(success).toBeFocused();
    });

    await test.step('Verify success closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await success.waitFor({ state: 'hidden' });
      await expect(success).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });
  });

  test('Verify base feedback form mouse interaction', async ({ page }) => {
    const standPath =
      'stories/components/feedback/docs/examples/default_feedback_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = page.getByRole('button');
    const feedbackForm = page.locator('[data-ui-name="FeedbackForm"]');
    const inputs = page.getByRole('textbox');
    const success = page.locator('[data-ui-name="Dropdown.Popper"]');
    const submit = page.locator('[data-ui-name="FeedbackForm.Submit"]');
    const cancel = page.locator('[data-ui-name="FeedbackForm.Cancel"]');

    await test.step('Verify feedback form opened by trigger click', async () => {
      await trigger.click();
      await feedbackForm.waitFor({ state: 'visible' });
      await expect(inputs.first()).toBeFocused();
    });

    await test.step('Verify feedback form closed by Cancel click ', async () => {
      await expect(cancel).toHaveAttribute('type', 'reset');
      await cancel.click();
      await feedbackForm.waitFor({ state: 'hidden' });
      await expect(feedbackForm).not.toBeVisible();
    });

    await test.step('Verify feedback form closed by click outside the form', async () => {
      await trigger.click();
      await feedbackForm.waitFor({ state: 'visible' });
      await page.mouse.click(0, 0);
      await feedbackForm.waitFor({ state: 'hidden' });
      await expect(feedbackForm).not.toBeVisible();
    });

    await test.step('Verify feedback form validation starts  and form not closed by click  Send Feedback', async () => {
      await trigger.click();
      await feedbackForm.waitFor({ state: 'visible' });
      await expect(submit).toHaveAttribute('type', 'submit');
      await submit.click();
      await page.waitForSelector('text="Your feedback must contain at least 10 characters."');
      await expect(inputs.first()).toBeFocused();
      const count = await inputs.count();

      for (let i = 0; i < count; i++) {
        await expect(inputs.nth(i)).toHaveAttribute('aria-invalid', 'true');
        await expect(inputs.nth(i)).toHaveAttribute('aria-describedby');
      }
    });

    await test.step('Verify feedback form changes to success by click on Send feedback when inputs filled', async () => {
      await inputs.first().fill('Your feedback must contain at least 10 characters.');
      await inputs.nth(1).fill('test@test.test');

      await submit.click();
      await success.waitFor({ state: 'visible' });
      await expect(success).toBeFocused();
    });

    await test.step('Verify success closed by click outside the form', async () => {
      await page.mouse.click(0, 0);
      await success.waitFor({ state: 'hidden' });
      await expect(success).not.toBeVisible();
    });

    await test.step('Verify success closed by click on trigger', async () => {
      await trigger.click();
      await success.waitFor({ state: 'visible' });
      await trigger.click();

      await success.waitFor({ state: 'hidden' });
      await expect(success).not.toBeVisible();
    });
  });
});
