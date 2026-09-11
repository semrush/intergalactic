import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  menu: (page: Page) => page.getByRole('listbox'),
  options: (page: Page) => page.getByRole('option'),
  trigger: (page: Page) => page.getByRole('combobox'),
  textbox: (page: Page) => page.getByRole('textbox'),

};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify Input Phone keyboard interaction', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@button-link', '@input-mask', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/known_country_and_number_format.tsx', 'en');

    await test.step('Verify example when select expanded', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify example when option selected', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(TAG.FUNCTIONAL, () => {
  test('Verify Input Phone Functionality', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@button-link', '@input-mask', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/known_country_and_number_format.tsx', 'en');

    await test.step('Verify select expanded', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.trigger(page)).toBeVisible();
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).toHaveClass(/selected/);
    });

    await test.step('Verify input when select expanded', async () => {
      await expect(locators.textbox(page)).toHaveAttribute('type', 'tel');
      await expect(locators.textbox(page)).toHaveAttribute('autocomplete', 'tel');
      await expect(locators.textbox(page)).toHaveAttribute('value', '+49');
    });

    await test.step('Menu and input when option selected input when select expanded', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.textbox(page)).toHaveAttribute('value', '+39');
      await expect(locators.textbox(page)).toBeFocused();
      await page.keyboard.type('99999999999');
      await expect(locators.textbox(page)).toHaveAttribute('value', '+39 (999)999-9999');
    });

    await test.step('Clear input by Activate clear', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Clear')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.textbox(page)).toHaveAttribute('value', '+39');
      await expect(locators.textbox(page)).toBeFocused();
    });

    await test.step('Clear input by Backspace', async () => {
      await locators.textbox(page).fill('9');
      await page.keyboard.press('Backspace');
      await expect(locators.textbox(page)).toHaveAttribute('value', '+39');
    });

    await test.step('Verify Focus on select trigger back', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.trigger(page)).toBeFocused();
    });
  });
});
