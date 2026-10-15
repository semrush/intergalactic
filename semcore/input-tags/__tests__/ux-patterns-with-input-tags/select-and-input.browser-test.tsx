import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  options: (page: Page) => page.getByRole('option'),
  trigger: (page: Page) => page.getByRole('combobox'),
  input: (page: Page) => page.getByRole('textbox'),
  inputClose: (page: Page) => page.locator('[data-ui-name="InputTags.Tag.Close"]'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify Input tags and select', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input-tags',
      '@select',
      '@base-components',
      '@button',
      '@counter',
      '@flex-box',
      '@tooltip',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx', 'en');

    const emailLabel = page.locator('label:text("Emails")');
    const tooltip = page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify initial state', async () => {
      await expect(locators.trigger(page)).toHaveCount(2);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify option selected in the first select', async () => {
      await locators.trigger(page).first().click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.options(page).first().click();
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveCount(1);
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify invalid email tooltip', async () => {
      await emailLabel.click();
      await page.keyboard.type('test@tets.test');
      await page.keyboard.press('Enter');
      await page.keyboard.type('test@tets');
      await page.keyboard.press('Enter');
      await tooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify emails added up to the limit', async () => {
      await page.keyboard.type('.test');
      await tooltip.waitFor({ state: 'hidden' });
      await page.keyboard.press('Enter');
      await page.keyboard.type('test@tets.test');
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify limit tooltip', async () => {
      await page.keyboard.type('test@tets.test');
      await page.keyboard.press('Enter');
      await tooltip.waitFor({ state: 'visible' });
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
  test('Verify Input tags and select keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input-tags',
      '@select',
      '@base-components',
      '@button',
      '@counter',
      '@flex-box',
      '@tooltip',
      '@typography'],
  }, async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'WebKit does not move focus to tag close buttons by Tab');
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx', 'en');

    const counter = page.locator('[data-ui-name="Counter"]');
    const counterText = counter.locator('span');
    const tooltip = page.locator('[data-ui-name="Tooltip.Popper"]');

    await test.step('Verify option selected in the first select by keyboard', async () => {
      await expect(locators.trigger(page)).toHaveCount(2);
      await page.keyboard.press('Tab');
      await expect(locators.trigger(page).first()).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.options(page).first().waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveCount(1);
    });

    await test.step('Verify focus moves through tag close to the emails input', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.inputClose(page).first()).toBeFocused();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.input(page)).toBeFocused();
    });

    await test.step('Verify valid email increases counter and invalid email shows tooltip', async () => {
      await page.keyboard.type('test@tets.test');
      await page.keyboard.press('Enter');
      await expect(counterText).toHaveText('3/5');

      await page.keyboard.type('test@tets');
      await expect(counterText).toHaveText('3/5');
      await page.keyboard.press('Enter');
      await tooltip.waitFor({ state: 'visible' });
      await expect(tooltip).toHaveText(`Email isn't valid.`);
    });

    await test.step('Verify counter reaches the limit with warning', async () => {
      await page.keyboard.type('.test');
      await tooltip.waitFor({ state: 'hidden' });
      await page.keyboard.press('Enter');
      await expect(counterText).toHaveText('4/5');

      await page.keyboard.type('test@tets.test');
      await page.keyboard.press('Enter');
      await expect(counterText).toHaveText('5/5');
      await expect(counter).toHaveClass(/warning/);
    });

    await test.step('Verify limit tooltip when adding more emails', async () => {
      await page.keyboard.type('test@tets.test');
      await page.keyboard.press('Enter');
      await expect(counterText).toHaveText('5/5');
      await tooltip.waitFor({ state: 'visible' });
      await expect(tooltip).toHaveText(`There must be no more than 5 emails.`);

      await page.keyboard.press('Enter');
      await expect(locators.input(page)).toBeFocused();
    });

    await test.step('Verify removing a tag clears the warning', async () => {
      const length = (await locators.input(page).inputValue()).length;
      for (let i = 0; i < length; i++) {
        await page.keyboard.press('Backspace');
      }
      await tooltip.waitFor({ state: 'hidden' });

      await page.keyboard.press('Shift+Tab');
      await expect(locators.inputClose(page).last()).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(counter).not.toHaveClass(/warning/);
    });
  });
});
