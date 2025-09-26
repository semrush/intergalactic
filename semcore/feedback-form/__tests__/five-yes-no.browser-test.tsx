import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify yes-no form base example styles', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();

    const starts = page.getByRole('none');
    const dialog = page.getByRole('dialog');
    const buttons = dialog.getByRole('button');
    await test.step('Verify state when feedback form is opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await dialog.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify error state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('tooltip').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify form styles', async () => {
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify email validation', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.type('t');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await page.waitForSelector('text="Please enter valid email"');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify loading styles', async () => {
      await page.keyboard.type('test@test.test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');

      await page.locator('[aria-label="Loading…"]').nth(1).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify feedback rating with error notice on submit', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-error-on-send.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const starts = page.getByRole('none');
    const dialog = page.getByRole('dialog');
    const buttons = dialog.getByRole('button');

    await starts.nth(1).click();
    await buttons.first().waitFor({ state: 'visible' });
    await buttons.nth(1).click();
    await page.waitForSelector('text="Something went wrong. Please try again or contact us at"');
    await expect(page).toHaveScreenshot();
  });

  test('Verify feedback rating notice with title and subtitle', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/tests/examples/with-title-and-subtitle.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify five stars base example styles keyboard interactions', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sliderRating = page.getByRole('slider');
    const stars = page.getByRole('none');
    const checkboxInput = page.getByRole('checkbox');
    const dialog = page.getByRole('dialog');
    const buttons = dialog.getByRole('button');
    const itemInput = page.getByRole('textbox');

    await test.step('Verify stars can be focused and their attributes ', async () => {
      await page.keyboard.press('Tab');
      await expect(sliderRating).toBeFocused();
      await expect(sliderRating).toHaveAttribute('aria-valuemin', '1');
      await expect(sliderRating).toHaveAttribute('aria-valuemax', '5');
      await expect(sliderRating).toHaveAttribute('aria-valuenow', '0');
      await expect(sliderRating).toHaveAttribute('aria-valuetext', 'Not set');

      await expect(sliderRating).toHaveAttribute('value', '0');
      await expect(sliderRating).toHaveAttribute('aria-orientation', 'horizontal');

      const count = await stars.count();
      for (let i = 0; i < count; i++) {
        await expect(stars.nth(i)).toHaveAttribute('fill', 'none');
        await expect(stars.nth(i)).toHaveAttribute('width', '24');
        await expect(stars.nth(i)).toHaveAttribute('height', '24');
      }

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(sliderRating).toHaveAttribute('aria-valuenow', '2');
      await expect(sliderRating).toHaveAttribute('value', '0');

      await expect(sliderRating).toHaveAttribute('aria-valuetext', '2 out of 5. Press Enter to select the rating.');
    });

    await test.step('Verify form opened and first checkbox focused by deault', async () => {
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'visible' });
      await expect(sliderRating).toHaveAttribute('value', '2');
      await expect(checkboxInput.first()).toBeFocused();
      await expect(checkboxInput.first()).toHaveAttribute('aria-invalid', 'false');
      await expect(checkboxInput.first()).toHaveAttribute('aria-labelledby', 'option1');
    });

    await test.step('Verify form closed by ESC and selected starts skipped', async () => {
      await page.keyboard.press('Escape');
      await buttons.first().waitFor({ state: 'hidden' });
      await expect(sliderRating).toBeFocused();
      await expect(sliderRating).toHaveAttribute('aria-valuenow', '0');
      await expect(sliderRating).toHaveAttribute('aria-valuetext', 'Not set');

      await expect(sliderRating).toHaveAttribute('value', '0');
    });

    await test.step('Verify Form not opened by Enter  when no starts selected', async () => {
      await page.keyboard.press('Enter');
      await expect(buttons.first()).not.toBeVisible();
    });

    await test.step('Verify Form focus order', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text="Great! What do you like the most?"');
      await expect(checkboxInput.first()).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(itemInput.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(itemInput.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(itemInput.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(buttons.nth(1)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(buttons.nth(0)).toBeFocused();
    });

    await test.step('Verify form closed by activate Close button', async () => {
      await page.keyboard.press('Enter');
      await buttons.first().waitFor({ state: 'hidden' });
      await expect(sliderRating).toBeFocused();
    });

    await test.step('Verify form closed by activate Send request', async () => {
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text="Great! What do you like the most?"');
      await expect(checkboxInput.first()).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await page.locator('[aria-label="Loading…"]').nth(1).waitFor({ state: 'hidden' });
      await expect(page.getByRole('button', { name: 'Reload page' })).toBeFocused();
    });
  });

  test('Verify five stars base example styles mouse interactions', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/feedback-rating/docs/examples/feedback_rating_form.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const sliderRating = page.getByRole('slider');
    const stars = page.getByRole('none');
    const checkboxInput = page.getByRole('checkbox');
    const dialog = page.getByRole('dialog');
    const buttons = dialog.getByRole('button');

    await test.step('Verify stars hover interaction', async () => {
      await stars.nth(3).hover();
      await expect(sliderRating).toHaveAttribute('aria-valuenow', '4');
      await expect(sliderRating).toHaveAttribute('value', '0');

      await expect(sliderRating).toHaveAttribute('aria-valuetext', '4 out of 5. Press Enter to select the rating.');
    });

    await test.step('Verify form opened by click on stars', async () => {
      await stars.nth(3).click();
      await buttons.first().waitFor({ state: 'visible' });
      await expect(sliderRating).toHaveAttribute('value', '4');
    });

    await test.step('Verify form closed by click outside the form and selected starts skipped', async () => {
      await page.mouse.click(0, 0);
      await buttons.first().waitFor({ state: 'hidden' });
      await expect(sliderRating).toHaveAttribute('aria-valuenow', '0');
      await expect(sliderRating).toHaveAttribute('aria-valuetext', 'Not set');

      await expect(sliderRating).toHaveAttribute('value', '0');
    });

    await test.step('Verify form closed by click Close button', async () => {
      await stars.nth(3).click();
      await page.waitForSelector('text="Great! What do you like the most?"');
      await buttons.first().click();
      await expect(dialog).toBeHidden();
    });

    await test.step('Verify form closed by click Send request', async () => {
      await stars.nth(3).click();
      await page.waitForSelector('text="Great! What do you like the most?"');
      await expect(checkboxInput.first()).toBeFocused();
      await buttons.nth(1).click();

      await page.locator('[aria-label="Loading…"]').nth(1).waitFor({ state: 'hidden' });
      await expect(dialog).toBeHidden();

      await expect(page.getByRole('button', { name: 'Reload page' })).toBeVisible();
    });
  });
});
