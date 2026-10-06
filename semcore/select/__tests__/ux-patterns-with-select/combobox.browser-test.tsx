import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  menu: (page: Page) => page.getByRole('listbox'),
  options: (page: Page) => page.getByRole('option'),
  trigger: (page: Page) => page.getByRole('combobox'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify Combobox menu opened state', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx', 'en');

    await test.step('Verify menu when trigger focused', async () => {
      await locators.trigger(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Combobox with typed value', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx', 'en');

    await test.step('Verify menu with custom typed value', async () => {
      await locators.trigger(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.type('01:00');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Combobox arrows navigation state', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx', 'en');

    await test.step('Verify arrows navigation visual state', async () => {
      await locators.trigger(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.type('01:00');
      await expect(locators.options(page).nth(1)).toHaveClass(/selected/);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
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
  test('Verify Combobox keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input', '@base-components', '@flex-box', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/auto-suggest/docs/examples/combobox_example.tsx', 'en');

    await test.step('Verify menu when trigger focused', async () => {
      await page.keyboard.press('Tab');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.menu(page)).toBeVisible();
      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify menu when character entered but nothing is found', async () => {
      await page.keyboard.type('a');
      await expect(locators.menu(page)).toBeVisible();
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
      const count = await locators.options(page).count();
      for (let i = 1; i < count; i++) {
        await expect(locators.options(page).nth(i)).not.toHaveClass(/selected/);
        await expect(locators.options(page).nth(i)).not.toHaveClass(/highlighted/);
      }
    });

    await test.step('Verify arrows navigation between options and selection option closed the menu', async () => {
      await page.keyboard.press('Backspace');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveAttribute('value', '03:00');
    });

    await test.step('Verify selected item highlighted when menu opened', async () => {
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).nth(3)).toHaveClass(/selected/);
    });

    await test.step('Verify item is selected and menu closed by Enter when exact match opened', async () => {
      for (let i = 0; i < '03:00'.length; i++) {
        await page.keyboard.press('Backspace');
      }
      await page.keyboard.type('05:00');
      await locators.options(page).first().waitFor({ state: 'visible' });

      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
      await expect(locators.options(page).nth(4)).not.toHaveClass(/selected/);
      await expect(locators.options(page).nth(5)).toHaveClass(/highlighted/);
      await expect(locators.options(page).nth(5)).toHaveClass(/selected/);

      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveAttribute('value', '05:00');
      await page.keyboard.press('Enter');

      await locators.options(page).first().waitFor({ state: 'visible' });
      await expect(locators.options(page).first()).not.toHaveClass(/selected/);
      await expect(locators.options(page).nth(5)).toHaveClass(/highlighted/);
      await expect(locators.options(page).nth(5)).toHaveClass(/selected/);
    });
  });
});
