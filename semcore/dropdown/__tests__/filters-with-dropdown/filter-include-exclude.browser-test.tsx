import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
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

  checkbox: (page: Page, index?: number) => {
    const base = page.getByRole('radio');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  textbox: (page: Page, index?: number) => {
    const base = page.getByRole('textbox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  triggerText: (page: Page) => page.locator('[data-ui-name="FilterTrigger.TriggerButton"]'),
  input: (page: Page) => page.locator('[data-ui-name="Input.Value"]'),
  conditionLegend: (page: Page) => page.locator('legend'),

};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify Filters include exclude', {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx', 'en');

    if (browserName !== 'chromium') return; // the focus on radio works unstable so skipped for firefox and webkit

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();

    await locators.textbox(page).fill('test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.popper(page).waitFor({ state: 'hidden' });

    await page.keyboard.press('Tab');
    await page.getByText('Clear').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify keyboard interactios', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@dropdown'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx', 'en');

    if (browserName !== 'chromium') return; // because incorrect initial focus on webkit and ff(known issue)

    await test.step('Verify textbox focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(locators.textbox(page)).toBeFocused();
    });

    await test.step('Verify keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear all')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.checkbox(page, 0)).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.textbox(page)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.checkbox(page, 0)).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(locators.checkbox(page, 1)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Clear all')).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();
    });

    await test.step('Verify counter in trigger not added when textbox filled and ESC pressed', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.textbox(page)).toBeFocused();
      await page.keyboard.type('test');
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.triggerText(page)).toContainText('Include keywords');
    });

    await test.step('Verify counter in trigger  added when textbox filled and Apply pressed', async () => {
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(locators.textbox(page)).toBeFocused();
      await page.keyboard.type('test');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.triggerText(page)).toHaveText('Include: 1 keyword');
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear')).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.getByText('Clear').waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify Clear all clears textbox', async () => {
      await page.keyboard.press('Space');
      await locators.popper(page).waitFor({ state: 'visible' });
      await expect(locators.textbox(page)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear all')).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(locators.triggerText(page)).toHaveText('Include: 1 keyword');
      await expect(locators.popper(page)).toBeVisible();
    });

    await test.step('Verify trigger clears when pressing apply', async () => {
      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();

      await page.keyboard.press('Enter');

      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText('Include keywords');
    });
  });

  test('Verify mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown'],
  }, async ({ page, browserName }) => {
    await loadPage(page, 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx', 'en');

    await test.step('Verify trigger text not updated when entering text in textbox', async () => {
      await locators.trigger(page).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await locators.textbox(page).fill('text, text, text');
      await expect(locators.triggerText(page)).toHaveText('Include keywords');
    });

    await test.step('Verify trigger text not updated when pressing trigger', async () => {
      await locators.trigger(page).click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText('Include keywords');
      await expect(locators.button(page, 'Clear')).not.toBeVisible();
    });

    await test.step('Verify trigger text updated when pressing apply', async () => {
      await locators.trigger(page).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await locators.textbox(page).fill('text, text, text');
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText('Include: 3 keywords');
      await expect(locators.button(page, 'Clear')).toBeVisible();
    });

    await test.step('Verify Hint on hover Clear', async () => {
      await locators.button(page, 'Clear').hover();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await expect(page.getByText('Clear')).toHaveCount(1);
    });

    await test.step('Verify counter not updated after pressing Clear all', async () => {
      await locators.trigger(page).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await locators.button(page, 'Clear all').click();
      await expect(locators.popper(page)).toBeVisible();
      await expect(locators.triggerText(page)).toHaveText('Include: 3 keywords');
    });

    await test.step('Verify counter updated after pressing Apply', async () => {
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.triggerText(page)).toHaveText('Include keywords');
      await expect(locators.button(page, 'Clear')).not.toBeVisible();
    });
  });
});
