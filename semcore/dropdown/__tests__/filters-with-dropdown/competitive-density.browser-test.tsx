import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  button: (page: Page, name?: string, index?: number) => {
    const base = page.getByRole('button', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },
  popper: (page: Page, index?: number) => {
    const base = page.getByRole('dialog');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  trigger: (page: Page, index?: number) => {
    const base = page.getByRole('combobox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  textbox: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  triggerText: (page: Page) => page.locator('[data-ui-name="FilterTrigger.TriggerButton"]'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Competitive density pattern', {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown',
      '@input-number',
      '@base-components',
      '@base-trigger',
      '@button',
      '@filter-trigger',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/basic-example.tsx', 'en');

    await test.step('Verify opened dropdown', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify filled range with focused Apply', async () => {
      await page.keyboard.press('1');
      await page.keyboard.press('Tab');
      await page.keyboard.press('5');
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify trigger with applied range', async () => {
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'hidden' });
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
  test('Verify keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown',
      '@input-number',
      '@base-components',
      '@base-trigger',
      '@button',
      '@filter-trigger',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/basic-example.tsx', 'en');

    await test.step('Verify 1st textbox focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(locators.textbox(page).nth(0)).toBeFocused();
    });

    await test.step('Verify keyboard navigation', async () => {
      await page.keyboard.press('ArrowUp');
      await expect(locators.textbox(page).nth(0)).toHaveValue('2');

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await expect(locators.textbox(page).nth(1)).toHaveValue('7');

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.textbox(page).nth(0)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();
    });

    await test.step('Verify trigger text not changed when Escape pressed', async () => {
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toBeFocused();

      await expect(locators.triggerText(page)).toContainText('Competitive Density');
    });

    await test.step('Verify trigger text updated when Apply pressed', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toBeFocused();

      await expect(locators.triggerText(page)).toHaveText('Com.: 2–7');
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear')).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.getByText('Clear').waitFor({ state: 'hidden' });
    });

    await test.step('Verify Clear button resets trigger text', async () => {
      await page.keyboard.press('Space');

      await expect(locators.triggerText(page)).toContainText('Competitive Density');
    });
  });

  test('Verify mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown',
      '@input-number',
      '@base-components',
      '@base-trigger',
      '@button',
      '@filter-trigger',
      '@flex-box',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/basic-example.tsx', 'en');

    await test.step('Verify 1st textbox focused when dropdown opened', async () => {
      await locators.trigger(page).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(locators.textbox(page).nth(0)).toBeFocused();
    });

    await test.step('Verify trigger text not updated when pressing trigger', async () => {
      await locators.trigger(page).click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toContainText('Competitive Density');
      await expect(locators.button(page, 'Clear')).toBeHidden();
    });

    await test.step('Verify trigger text updated when pressing apply', async () => {
      await locators.trigger(page).click();
      await locators.textbox(page).nth(0).fill('0');
      await locators.textbox(page).nth(1).fill('8');
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText('Com.: 1–8');
      await expect(locators.button(page, 'Clear')).toBeVisible();
    });

    await test.step('Verify hint on hover Clear', async () => {
      await locators.button(page, 'Clear').hover();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await expect(page.getByText('Clear')).toHaveCount(1);
    });
  });
});
