import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  input: (page: Page) => page.getByRole('textbox'),
  hint: (page: Page, text: string) => page.getByText(text),
  tooltip: (page: Page) => page.getByRole('tooltip'),

  addon: (page: Page) => page.locator('[data-ui-name="Input.Addon"]'),
};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */

test.describe(`${TAG.VISUAL} `, () => {
  test('Verify login form', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@tooltip',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/default-log-in-form.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('test@test.test');
    await locators.tooltip(page).waitFor({ state: 'hidden' });
    await page.keyboard.press('Tab');
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify login form keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@tooltip',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/default-log-in-form.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.input(page).first()).toBeFocused();
    await expect(locators.input(page).first()).toHaveAttribute('aria-invalid', 'false');
    await expect(locators.input(page).first()).toHaveAttribute('name', 'email');
    await expect(locators.input(page).first()).toHaveAttribute('id', 'email');
    await expect(locators.input(page).first()).toHaveAttribute('autocomplete', 'email');

    await page.keyboard.press('Tab');

    await expect(locators.input(page).last()).toBeFocused();
    await expect(locators.input(page).last()).toHaveAttribute('aria-invalid', 'false');
    await expect(locators.input(page).last()).toHaveAttribute('name', 'password');
    await expect(locators.input(page).last()).toHaveAttribute('id', 'password');
    await expect(locators.input(page).last()).toHaveAttribute('autocomplete', 'current-password');

    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Log in')).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(locators.input(page).first()).toBeFocused();
    await expect(locators.tooltip(page)).toHaveText('Email is required.');
    await expect(locators.input(page).first()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('tes');
    await locators.tooltip(page).waitFor({ state: 'hidden' });
    await page.keyboard.press('Enter');
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(locators.tooltip(page)).toHaveText('Email is not valid.');
    await expect(locators.input(page).first()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('t@test.test');
    await locators.tooltip(page).waitFor({ state: 'hidden' });
    await expect(locators.input(page).first()).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.press('Tab');
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(locators.tooltip(page)).toHaveText('Password is required.');
    await expect(locators.input(page).last()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('Qwe');
    await locators.tooltip(page).waitFor({ state: 'hidden' });
    await page.keyboard.press('Enter');
    await locators.tooltip(page).waitFor({ state: 'visible' });
    await expect(locators.tooltip(page)).toHaveText('Password must have at least 8 characters.');
    await expect(locators.input(page).last()).toHaveAttribute('aria-invalid', 'true');

    await page.keyboard.type('Qwerty');
    await locators.tooltip(page).waitFor({ state: 'hidden' });
    await expect(locators.input(page).last()).toHaveAttribute('aria-invalid', 'false');

    await page.keyboard.press('Shift+Tab');
    await expect(locators.tooltip(page)).toHaveCount(0);
  });
});
