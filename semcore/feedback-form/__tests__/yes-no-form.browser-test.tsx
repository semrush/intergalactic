import type { Page } from '@playwright/test';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  button: (page: Page, text: string) => page.getByRole('button', { name: text }),

  feedbackForm: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="FeedbackForm"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  notice: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="FeedbackForm.Notice"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
  dialog: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  stars: (page: Page, index?: number) => {
    const base = page.getByRole('none');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  sliderRating: (page: Page, index?: number) => {
    const base = page.getByRole('slider');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  inputs: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  success: (page: Page, index?: number) => {
    const base = page.locator(`[data-ui-name="FeedbackForm.Success"]`);
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify yes-no form base example styles', {
    tag: [
      TAG.PRIORITY_HIGH,
      '@feedback-form',
      '@dropdown',
      '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx', 'en');

    await test.step('Verify state when feedback form is opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.inputs(page, 0)).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify error state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByRole('tooltip').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify success state', async () => {
      await page.keyboard.type('test test test');
      await page.keyboard.press('Tab');
      await page.keyboard.type('test@test.test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.success(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify close notification hint', async () => {
      await page.keyboard.press('Escape');
      await locators.success(page).waitFor({ state: 'hidden' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.getByText('Close notification').waitFor({ state: 'visible' });
    });
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify yes-no form keyboard interactions', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@feedback-form',
      '@dropdown',
      '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx', 'en');

    const feedbackFormItem = page.locator('[data-ui-name="FeedbackForm.Item"]');

    await test.step('Verify stars can be focused and their attributes ', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Yes')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'No').first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Ask me later')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'No').nth(1)).toBeFocused();

      await expect(page.locator('[data-ui-name="Notice.Close"]')).toBeFocused();

      await page.getByText('Close notification').waitFor({ state: 'visible' });

      await page.keyboard.press('Escape');
      await page.getByText('Close notification').waitFor({ state: 'hidden' });

      await expect(page.locator('[data-ui-name="Notice.Close"]')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'No').first()).toBeFocused();
    });

    await test.step('Verify form opened and attributed', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });

      await expect(feedbackFormItem.first()).toBeFocused();
      await expect(feedbackFormItem.first()).toHaveAttribute('aria-invalid', 'false');
      await expect(feedbackFormItem.first()).toHaveAttribute('name', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('id', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('rows', '2');
      await expect(feedbackFormItem.first()).not.toHaveAttribute('aria-describedby');
      await page.keyboard.press('Tab');

      await expect(feedbackFormItem.nth(1)).toBeFocused();
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-invalid', 'false');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('name', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('id', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('autocomplete', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-describedby');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('value');
    });

    await test.step('Verify form with error and attributed', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.button(page, 'Send feedback')).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(feedbackFormItem.first()).toBeFocused();
      await expect(feedbackFormItem.first()).toHaveAttribute('aria-invalid', 'true');
      await expect(feedbackFormItem.first()).toHaveAttribute('name', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('id', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('rows', '2');
      await expect(feedbackFormItem.first()).toHaveAttribute('aria-describedby');

      await page.keyboard.press('Tab');
      await expect(feedbackFormItem.nth(1)).toBeFocused();
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-invalid', 'true');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('name', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('id', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('autocomplete', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-describedby');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('value');
    });

    await test.step('Verify form closed by cancel', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Cancel')).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page, 'No').first()).toBeFocused();
    });

    await test.step('Verify form closed Escape', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Yes')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.inputs(page).first()).toBeFocused();
      await locators.dialog(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page, 'Yes')).toBeFocused();
    });

    await test.step('Verify Success form appeard and closed by Escape', async () => {
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(locators.inputs(page).first()).toBeFocused();

      await page.keyboard.type('test test test');

      await page.keyboard.press('Tab');
      await expect(locators.inputs(page).nth(1)).toBeFocused();

      await page.keyboard.type('test@test.test');

      await page.keyboard.press('Tab');
      await expect(page.getByRole('link')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Send feedback')).toBeFocused();

      await expect(feedbackFormItem.first()).toHaveAttribute('aria-invalid', 'false');
      await expect(feedbackFormItem.first()).toHaveAttribute('name', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('id', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('rows', '2');
      await expect(feedbackFormItem.first()).not.toHaveAttribute('aria-describedby');

      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-invalid', 'false');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('name', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('id', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('autocomplete', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-describedby');

      await page.keyboard.press('Enter');
      await locators.success(page).waitFor({ state: 'visible' });
      await expect(locators.success(page)).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.dialog(page).waitFor({ state: 'hidden' });
      await expect(locators.button(page, 'Yes')).toBeFocused();
    });
  });

  test('Verify yes-no form mouse interactions', {
    tag: [
      TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@feedback-form',
      '@dropdown',
      '@notice'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/feedback-yes-no/docs/examples/feedback-yes-no-example.tsx', 'en');

    const feedbackFormItem = page.locator('[data-ui-name="FeedbackForm.Item"]');

    await test.step('Verify form opened by click on button', async () => {
      await locators.button(page, 'Yes').click();
      await locators.dialog(page).waitFor({ state: 'visible' });
      await expect(feedbackFormItem.first()).toBeFocused();
      await page.locator('label').nth(1).click();
      await expect(feedbackFormItem.nth(1)).toBeFocused();
    });

    await test.step('Verify error tooltip  ', async () => {
      await locators.button(page, 'Send feedback').click();
      await expect(page.getByRole('tooltip')).toHaveCount(1);

      await expect(feedbackFormItem.first()).toBeFocused();
      await expect(feedbackFormItem.first()).toHaveAttribute('aria-invalid', 'true');
      await expect(feedbackFormItem.first()).toHaveAttribute('name', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('id', 'feedback');
      await expect(feedbackFormItem.first()).toHaveAttribute('rows', '2');
      await expect(feedbackFormItem.first()).toHaveAttribute('aria-describedby');

      await page.locator('label').nth(1).click();
      await expect(page.getByRole('tooltip')).toHaveCount(1);
      await expect(feedbackFormItem.nth(1)).toBeFocused();
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-invalid', 'true');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('name', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('id', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('autocomplete', 'email');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('aria-describedby');
      await expect(feedbackFormItem.nth(1)).toHaveAttribute('value');
    });

    await test.step('Verify form closed by click on Cancel', async () => {
      await locators.button(page, 'Cancel').click();
      await locators.dialog(page).waitFor({ state: 'hidden' });

      await expect(locators.dialog(page)).toHaveCount(0);
    });

    await test.step('Verify form closed by click on Trigger', async () => {
      await locators.button(page, 'Yes').click();
      await locators.dialog(page).waitFor({ state: 'visible' });

      await expect(locators.dialog(page)).toHaveCount(1);

      await locators.button(page, 'Yes').click();
      await locators.dialog(page).waitFor({ state: 'hidden' });

      await expect(locators.dialog(page)).toHaveCount(0);
    });

    await test.step('Verify Success form appears when data is filled and Send feedback clicked', async () => {
      await locators.button(page, 'Yes').click();
      await locators.dialog(page).waitFor({ state: 'visible' });

      await page.keyboard.type('test test test');

      await page.locator('label').nth(1).click();
      await page.keyboard.type('test@test.test');

      await locators.button(page, 'Send feedback').click();
      await expect(locators.success(page)).toHaveCount(1);
      await locators.button(page, 'Yes').click();
      await expect(locators.success(page)).toHaveCount(0);
    });
  });
});
