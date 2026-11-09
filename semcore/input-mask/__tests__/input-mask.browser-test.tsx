import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  input: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  inputMask: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="InputMask"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify InputMask basic example', {
    tag: [TAG.PRIORITY_HIGH, '@input-mask',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/inputmask.tsx', 'en');

    await locators.input(page).waitFor({ state: 'visible' });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify focused state', async () => {
      await locators.input(page).focus();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify InputMask Aliases example', {
    tag: [TAG.PRIORITY_HIGH, '@input-mask',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/aliases.tsx', 'en');

    await locators.input(page).waitFor({ state: 'visible' });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify InputMask Pipe example', {
    tag: [TAG.PRIORITY_HIGH, '@input-mask',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/pipe.tsx', 'en');

    await locators.input(page).first().waitFor({ state: 'visible' });

    await test.step('Verify default state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify card number filled state', async () => {
      await locators.input(page, 0).fill('123');
      await expect(page).toHaveScreenshot();
    });
  });
});

/* =====================================================
  @functional
  Keyboard and mouse interactions - no snapshots here.
  We verify states, visibility, and attributes.
  ===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify mask formats typed value and ignores letters', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@input-mask',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/inputmask.tsx', 'en');
    const input = page.getByRole('textbox', { name: 'Card number' });

    await test.step('Verify digits are grouped by mask', async () => {
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
      await page.keyboard.type('12345678');
      await expect(input).toHaveValue('1234 5678');
    });

    await test.step('Verify letters are ignored', async () => {
      await page.keyboard.type('ab');
      await expect(input).toHaveValue('1234 5678');
    });
  });

  test('Verify aliases accept only matching characters', {
    tag: [TAG.PRIORITY_MEDIUM, TAG.KEYBOARD, '@input-mask',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/aliases.tsx', 'en');
    const input = page.getByRole('textbox', { name: 'Item index' });

    await test.step('Verify digits fill alias positions and letters are ignored', async () => {
      await page.keyboard.press('Tab');
      await expect(input).toBeFocused();
      await page.keyboard.press('End');
      await page.keyboard.type('1a2b');
      await expect(input).toHaveValue(/^9912/);
    });
  });

  test('Verify pipe example: onSuccess moves focus to expiry date', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@input-mask',
      '@base-components',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/input-mask/docs/examples/pipe.tsx', 'en');
    const cardNumber = page.getByRole('textbox', { name: 'Card number' });
    const expiryDate = page.getByRole('textbox', { name: 'Expiry date' });

    await test.step('Verify focus moves to expiry date after full card number', async () => {
      await page.keyboard.press('Tab');
      await expect(cardNumber).toBeFocused();
      await page.keyboard.type('1234567890123456');
      await expect(cardNumber).toHaveValue('1234 5678 9012 3456');
      await expect(expiryDate).toBeFocused();
    });

    await test.step('Verify valid expiry date is accepted', async () => {
      await expiryDate.fill('1299');
      await expect(expiryDate).toHaveValue('12/99');
    });
  });
});
