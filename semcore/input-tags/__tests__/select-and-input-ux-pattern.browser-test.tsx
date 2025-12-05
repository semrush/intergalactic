import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {

  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  options: (page: Page) => page.getByRole('option'),
  trigger: (page: Page) => page.getByRole('combobox'),
  input: (page: Page) => page.getByRole('textbox'),

  inputValue: (page: Page) => page.locator('[data-ui-name="InputTags.Value"]'),
  tag: (page: Page) => page.locator('li[data-ui-name="InputTags.Tag"]'),
  inputText: (page: Page) => page.locator('[data-ui-name="InputTags.Tag.Text"]'),
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
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx', 'en');

    const emailLabel = page.locator('label:text("Emails")');
    const tooltip = page.locator('[data-ui-name="Tooltip.Popper"]');
    await expect(locators.trigger(page)).toHaveCount(2);
    await expect(page).toHaveScreenshot();

    await locators.trigger(page).first().click();
    await locators.options(page).first().waitFor({ state: 'visible' });
    await locators.options(page).first().click();
    await locators.options(page).first().waitFor({ state: 'hidden' });

    await expect(locators.trigger(page)).toHaveCount(1);
    await expect(page).toHaveScreenshot();

    await emailLabel.click();
    await page.keyboard.type('test@tets.test');
    await page.keyboard.press('Enter');
    await page.keyboard.type('test@tets');
    await page.keyboard.press('Enter');
    await tooltip.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
    await page.keyboard.type('.test');
    await tooltip.waitFor({ state: 'hidden' });

    await page.keyboard.press('Enter');
    await page.keyboard.type('test@tets.test');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
    await page.keyboard.type('test@tets.test');
    await page.keyboard.press('Enter');
    await tooltip.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify Input tags and select keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input-tags',
      '@select'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/inputtags-and-select.tsx', 'en');

    if (browserName === 'webkit') return;
    const counter = page.locator('[data-ui-name="Counter"]');
    const tooltip = page.locator('[data-ui-name="Tooltip.Popper"]');
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

    await page.keyboard.press('Tab');
    await expect(locators.inputClose(page).first()).toBeFocused();
    await page.keyboard.press('Tab');

    await page.keyboard.press('Tab');

    await expect(locators.input(page)).toBeFocused();
    await page.keyboard.type('test@tets.test');
    await page.keyboard.press('Enter');
    {
      const counterText = await counter.locator('span').textContent();
      await expect(counterText).toBe('3/5');
    }

    await page.keyboard.type('test@tets');
    {
      const counterText = await counter.locator('span').textContent();
      await expect(counterText).toBe('3/5');
    }
    await page.keyboard.press('Enter');
    await tooltip.waitFor({ state: 'visible' });
    await expect(tooltip).toHaveText(`Email isn't valid.`);

    await page.keyboard.type('.test');
    await tooltip.waitFor({ state: 'hidden' });

    await page.keyboard.press('Enter');
    {
      const counterText = await counter.locator('span').textContent();
      await expect(counterText).toBe('4/5');
    }
    await page.keyboard.type('test@tets.test');
    await page.keyboard.press('Enter');
    {
      const counterText = await counter.locator('span').textContent();
      await expect(counterText).toBe('5/5');
    } await expect(counter).toHaveClass(/warning/);

    await page.keyboard.type('test@tets.test');
    await page.keyboard.press('Enter');
    {
      const counterText = await counter.locator('span').textContent();
      await expect(counterText).toBe('5/5');
    }
    await tooltip.waitFor({ state: 'visible' });
    await expect(tooltip).toHaveText(`There must be no more than 5 emails.`);

    await page.keyboard.press('Enter');
    await expect(locators.input(page)).toBeFocused();

    const value = await locators.input(page).inputValue();
    const length = value.length;

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
