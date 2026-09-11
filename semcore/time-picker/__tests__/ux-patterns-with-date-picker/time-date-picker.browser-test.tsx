import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  timeBoxes: (page: Page) => page.getByRole('combobox'),
  timePickerGroup: (page: Page) => page.getByRole('group'),
  options: (page: Page) => page.getByRole('option'),
  button: (page: Page, text?: string) => page.getByRole('button', { name: text }),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify pattern with Time Picker and Date picker', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@time-picker',
      '@checkbox',
      '@date-picker',
      '@button',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/datepicker-and-timepicker.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.type('12122024');
    await page.keyboard.press('Escape');

    await locators.timeBoxes(page).nth(1).click();
    await locators.options(page).first().waitFor({ state: 'visible' });
    await locators.options(page).first().click();
    await locators.options(page).first().waitFor({ state: 'hidden' });

    await expect(page).toHaveScreenshot();

    await page.locator('[data-ui-name="Checkbox.Text"]').click();
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify pattern with Time Picker and Date picker keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@time-picker',

      '@checkbox',
      '@date-picker',
      '@button',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/datepicker-and-timepicker.tsx', 'en');

    const datePickerTrigger = page.locator('[data-ui-name="DatePicker.Trigger"]');
    await expect(datePickerTrigger).toHaveCount(3);
    await expect(locators.timePickerGroup(page)).toHaveCount(1);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Today').waitFor({ state: 'visible' });
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.button(page, 'Today').waitFor({ state: 'hidden' });

    await expect(datePickerTrigger.nth(2)).toHaveAttribute('value');
    await page.keyboard.press('Tab');
    await locators.options(page).first().waitFor({ state: 'visible' });
    await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    await page.keyboard.press('Enter');
    await locators.options(page).first().waitFor({ state: 'hidden' });
    await page.keyboard.press('Tab');
    await locators.options(page).first().waitFor({ state: 'visible' });
    await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    await page.keyboard.press('Enter');
    await locators.options(page).first().waitFor({ state: 'hidden' });

    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'AM')).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(locators.button(page, 'PM')).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await expect(datePickerTrigger).toHaveCount(6);
    await expect(locators.timePickerGroup(page)).toHaveCount(2);
  });
});
