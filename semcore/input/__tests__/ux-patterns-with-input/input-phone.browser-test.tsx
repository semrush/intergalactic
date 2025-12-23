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

};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */

test.describe(`${TAG.VISUAL} `, () => {
  test('Verify Unknown country and number format', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@typography',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/unknown_country_and_number_format.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('7777777');
    await expect(page).toHaveScreenshot();
  });

  test('Verify known country and unknown number format', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@typography',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/known_country_but_the_number_format_is_unknown.tsx', 'en');

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
  test('Verify Unknown country and number format', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@typography',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/unknown_country_and_number_format.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.input(page)).toBeFocused();
    await expect(locators.input(page)).toHaveAttribute('value', '+');

    await page.keyboard.type('777');
    await expect(locators.input(page)).toHaveAttribute('value', '777');
    await expect(page.getByLabel('Clear')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Clear')).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.input(page)).toBeFocused();
    await expect(locators.input(page)).toHaveAttribute('value', '+');

    await page.keyboard.type('777');
    await expect(locators.input(page)).toHaveAttribute('value', '+777');
    await expect(page.getByLabel('Clear')).toBeVisible();
  });

  test('Verify known country and unknown number format', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@typography',
      '@button'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/input-phone/docs/examples/known_country_but_the_number_format_is_unknown.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(locators.input(page)).toBeFocused();
    await expect(locators.input(page)).toHaveAttribute('value', '1');

    await page.keyboard.type('777');
    await expect(locators.input(page)).toHaveAttribute('value', '777');
    await expect(page.getByLabel('Clear')).toBeVisible();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Clear')).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.input(page)).toBeFocused();
    await expect(locators.input(page)).toHaveAttribute('value', '1');

    await page.keyboard.type('777');
    await expect(locators.input(page)).toHaveAttribute('value', '1777');
    await expect(page.getByLabel('Clear')).toBeVisible();
  });
});
