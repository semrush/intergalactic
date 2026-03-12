import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  feedbackForm: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="FeedbackForm"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  notice: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="FeedbackForm.Notice"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  success: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="Dropdown.Popper"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, index?: number) => {
    const base = page.getByRole('button');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  inputs: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify base feedback form styles', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feedback/docs/examples/default_feedback_form.tsx', 'en');

    await test.step('Verify feedback First open styles', async () => {
      await locators.button(page).click();
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await expect(locators.inputs(page).first()).toBeFocused();
      await expect(page).toHaveScreenshot();

      const boxinForm = locators.feedbackForm(page).locator('[data-ui-name="Box"]').first();
      await expect(boxinForm).toHaveCSS('padding', '16px');
      await expect(locators.notice(page)).toHaveCSS('padding-top', '12px');
      await expect(locators.notice(page)).toHaveCSS('padding-bottom', '12px');
      await expect(locators.notice(page)).toHaveCSS('padding-left', '16px');
      await expect(locators.notice(page)).toHaveCSS('padding-right', '16px');
    });

    await test.step('Verify 2nd input item', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.inputs(page).nth(1)).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify input items validation', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.inputs(page).first()).toBeFocused();
      await page.getByRole('tooltip', { name: 'Your feedback must contain at least 10 characters.' }).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await locators.inputs(page, 0).fill('Your feedback must contain at least 10 characters. our feedback must contain at least 10 characters');
      await page.keyboard.press('Tab');
      await page.getByRole('tooltip', { name: 'Please enter valid email.' }).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await locators.inputs(page, 1).fill('test@test.test');
    });

    await test.step('Verify spin and success form', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();

      await page.keyboard.press('Enter');
      await page.locator('[aria-label="Loading…"]').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
      await page.locator('[aria-label="Loading…"]').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify base feedback form loading styles', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/components/feedback/tests/examples/feedback_form_theme_loading.tsx', 'en');
    if (browserName == 'webkit') test.skip(); // unstable
    await locators.button(page).click();
    await locators.feedbackForm(page).waitFor({ state: 'visible' });
    await expect(locators.inputs(page).nth(0)).toBeFocused();

    await locators.inputs(page, 0).fill('Your feedback must contain at least 10 characters.');

    await page.keyboard.press('Tab');
    await expect(locators.inputs(page).nth(1)).toBeFocused();

    await locators.inputs(page, 1).fill('test@test.test');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(locators.button(page, 1)).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.button(page, 1)).not.toBeFocused();

    await page.locator('[aria-label="Loading…"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify base feedback form keyboard interaction', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@feedback-form'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feedback/docs/examples/default_feedback_form.tsx', 'en');

    await test.step('Verify feedback form items opened by Enter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await expect(locators.inputs(page, 0)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();
    });
    await test.step('Verify feedback form items attributes', async () => {
      await expect(locators.feedbackForm(page)).toHaveAttribute('novalidate');
      await expect(locators.feedbackForm(page)).toHaveAttribute('method', 'POST');

      const count = await locators.inputs(page).count();
      for (let i = 0; i < count; i++) {
        await expect(locators.inputs(page, i)).toHaveAttribute('aria-invalid', 'false');
      }
      await expect(locators.inputs(page, 0)).toHaveAttribute('name', 'description');
      await expect(locators.inputs(page, 1)).toHaveAttribute('name', 'email');
    });

    await test.step('Verify feedback form closed by Cancel', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 2)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.feedbackForm(page).waitFor({ state: 'hidden' });
      await expect(locators.feedbackForm(page)).not.toBeVisible();
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify feedback form closed by Escape', async () => {
      await page.keyboard.press('Space');
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await locators.feedbackForm(page).waitFor({ state: 'hidden' });
      await expect(locators.feedbackForm(page)).not.toBeVisible();
      await expect(locators.button(page)).toBeFocused();
    });

    await test.step('Verify feedback form validation starts and form not closed by activate Send Feedback', async () => {
      await page.keyboard.press('Space');
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await expect(locators.inputs(page, 0)).toBeFocused();
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();

      await page.keyboard.press('Space');
      await expect(locators.inputs(page, 0)).toBeFocused();

      await page.getByRole('tooltip', { name: 'Your feedback must contain at least 10 characters.' }).waitFor({ state: 'visible' });
      await expect(locators.inputs(page, 0)).toBeFocused();
      const count = await locators.inputs(page).count();

      for (let i = 0; i < count; i++) {
        await expect(locators.inputs(page, i)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.inputs(page, i)).toHaveAttribute('aria-describedby');
      }

      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();
    });

    await test.step('Verify feedback form changes to Success by Send feedback when inputs filled', async () => {
      await page.keyboard.press('Shift+Tab');

      await expect(locators.inputs(page, 0)).toBeFocused();

      await locators.inputs(page, 0).fill('Your feedback must contain at least 10 characters.');

      await expect(locators.inputs(page, 0)).toHaveAttribute('aria-invalid', 'false');
      await page.keyboard.press('Tab');
      await expect(locators.inputs(page, 1)).toBeFocused();

      await locators.inputs(page, 1).fill('test@test.test');
      await page.waitForTimeout(200);

      await expect(locators.inputs(page, 1)).toHaveAttribute('aria-invalid', 'false');
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 1)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.success(page).waitFor({ state: 'visible' });
      await expect(locators.success(page)).toBeFocused();
    });

    await test.step('Verify success closed by ESC', async () => {
      await page.keyboard.press('Escape');
      await locators.success(page).waitFor({ state: 'hidden' });
      await expect(locators.success(page)).not.toBeVisible();
      await expect(locators.button(page)).toBeFocused();
    });
  });

  test('Verify base feedback form mouse interaction', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@feedback-form'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/feedback/docs/examples/default_feedback_form.tsx', 'en');

    const submit = page.locator('[data-ui-name="FeedbackForm.Submit"]');
    const cancel = page.locator('[data-ui-name="FeedbackForm.Cancel"]');

    await test.step('Verify feedback form opened by trigger click', async () => {
      await locators.button(page).click();
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await expect(locators.inputs(page, 0)).toBeFocused();
    });

    await test.step('Verify feedback form closed by Cancel click ', async () => {
      await expect(cancel).toHaveAttribute('type', 'reset');
      await cancel.click();
      await locators.feedbackForm(page).waitFor({ state: 'hidden' });
      await expect(locators.feedbackForm(page)).not.toBeVisible();
    });

    await test.step('Verify feedback form closed by click outside the form', async () => {
      await locators.button(page).click();
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await page.mouse.click(0, 0);
      await locators.feedbackForm(page).waitFor({ state: 'hidden' });
      await expect(locators.feedbackForm(page)).not.toBeVisible();
    });

    await test.step('Verify feedback form validation starts  and form not closed by click  Send Feedback', async () => {
      await locators.button(page).click();
      await locators.feedbackForm(page).waitFor({ state: 'visible' });
      await expect(submit).toHaveAttribute('type', 'submit');
      await submit.click();
      await page.getByRole('tooltip', { name: 'Your feedback must contain at least 10 characters.' }).waitFor({ state: 'visible' });
      await expect(locators.inputs(page, 0)).toBeFocused();
      const count = await locators.inputs(page).count();

      for (let i = 0; i < count; i++) {
        await expect(locators.inputs(page, i)).toHaveAttribute('aria-invalid', 'true');
        await expect(locators.inputs(page, i)).toHaveAttribute('aria-describedby');
      }
    });

    await test.step('Verify feedback form changes to success by click on Send feedback when inputs filled', async () => {
      await locators.inputs(page, 0).fill('Your feedback must contain at least 10 characters.');
      await locators.inputs(page, 1).fill('test@test.test');

      await submit.click();
      await locators.success(page).waitFor({ state: 'visible' });
      await expect(locators.success(page)).toBeFocused();
    });

    await test.step('Verify success closed by click outside the form', async () => {
      await page.mouse.click(0, 0);
      await locators.success(page).waitFor({ state: 'hidden' });
      await expect(locators.success(page)).not.toBeVisible();
    });

    await test.step('Verify success closed by click on trigger', async () => {
      await locators.button(page).click();
      await locators.success(page).waitFor({ state: 'visible' });
      await locators.button(page).click();

      await locators.success(page).waitFor({ state: 'hidden' });
      await expect(locators.success(page)).not.toBeVisible();
    });
  });
});
