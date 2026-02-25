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

  counter: (page: Page) => locators.trigger(page, 0).locator('[data-ui-name="FilterTrigger.Counter"]'),
  input: (page: Page) => page.locator('[data-ui-name="Input.Value"]'),
  conditionLegend: (page: Page) => page.locator('legend'),

};
/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(`${TAG.VISUAL} `, () => {
  test('Verify advanced filters visual', {
    tag: [TAG.PRIORITY_HIGH,
      '@dropdown',
      '@select',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper(page).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('a');
    await locators.button(page, 'Remove condition').waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.getByText('Remove condition').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await locators.button(page, 'Add condition').click();
    await locators.button(page, 'Add condition').click();
    await locators.button(page, 'Add condition').click();

    await expect(page).toHaveScreenshot();
    await locators.button(page, 'Apply').click();
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
      '@dropdown',
      '@select',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx', 'en');

    await test.step('Verify 1st focusable item focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(locators.conditionLegend(page)).toHaveCount(1);
      await expect(page.getByLabel('Rule')).toBeFocused();
    });

    await test.step('Verify Remove button for the row shown and can be focused when something added to the input', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('combobox', { name: 'Filter' }).nth(1)).toBeFocused();
      await page.keyboard.press('Enter');
      await page.getByText('Not containing').waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByRole('option').nth(1).waitFor({ state: 'hidden' });
      await page.keyboard.press('Tab');
      await expect(page.getByRole('textbox', { name: 'Value' })).toBeFocused();
      await page.keyboard.press('a');
      await locators.button(page, 'Remove condition').waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Remove condition')).toBeFocused();
      await page.getByText('Remove condition').waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Remove condition')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(page.getByText('Remove condition')).toHaveCount(0);
    });

    await test.step('Verify focus navigation inside Dropdown', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Add condition')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear all')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Clear all')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.button(page, 'Apply')).toBeFocused();
    });

    await test.step('Verify counter in trigger appears when item added', async () => {
      await page.keyboard.press('Space');
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.trigger(page, 0)).toBeFocused();

      await expect(locators.counter(page)).toHaveText('1 applied');
    });
    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Clear advanced filters ')).toBeFocused();
      await page.getByText('Clear advanced filters').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.getByText('Clear advanced filters').waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify focus when last item removed', async () => {
      await page.keyboard.press('Space');
      await locators.popper(page).waitFor({ state: 'visible' });
      await expect(page.getByLabel('Rule')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Remove condition')).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(locators.button(page, 'Add condition')).not.toBeFocused();
      await expect(locators.button(page, 'Clear all')).toBeHidden();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();
    });
    await test.step('Verify counter not changed when Escape pressed', async () => {
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.counter(page)).toHaveText('1 applied');
    });

    await test.step('Verify counter removed when last item removed and Apply pressed', async () => {
      await page.keyboard.press('Space');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(page.getByLabel('Rule')).toBeFocused();

      await expect(locators.button(page, 'Clear all')).not.toBeHidden();
      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await expect(page.getByRole('combobox', { name: 'Filter' }).nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('textbox', { name: 'Value' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Remove condition')).toBeFocused();

      await page.keyboard.press('Space');
      await expect(locators.button(page, 'Clear all')).toBeHidden();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('combobox', { name: 'Type' })).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(page.getByRole('combobox', { name: 'Filter' }).nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByRole('textbox', { name: 'Value' })).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Add condition')).toBeFocused();

      await page.keyboard.press('Tab');

      await expect(locators.button(page, 'Apply')).toBeFocused();
      await page.keyboard.press('Space');
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.counter(page)).not.toBeVisible();
    });
    await test.step('Verify counter removed when Clear All pressed', async () => {
      await page.keyboard.press('Space');
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(page.getByLabel('Rule')).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('textbox', { name: 'Value' })).toBeFocused();

      await page.keyboard.press('a');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Add condition')).toBeFocused();

      await page.keyboard.press('Space');
      await expect(locators.button(page, 'Add condition')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('textbox', { name: 'Value' }).nth(1)).toBeFocused();
      await page.keyboard.press('b');
      await page.keyboard.press('Tab');

      await expect(locators.conditionLegend(page)).toHaveCount(2);
      await expect(locators.button(page, 'Remove condition')).toHaveCount(2);
    });
  });

  test('Verify mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@dropdown',
      '@select',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx', 'en');

    await test.step('Verify no remove and clear all bths when dropdown just opened', async () => {
      await locators.trigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await expect(locators.conditionLegend(page)).toHaveCount(1);
      await expect(locators.button(page, 'Remove condition')).toHaveCount(0);
      await expect(locators.button(page, 'Clear all')).toHaveCount(0);
    });

    await test.step('Verify Remove button for the row shown and hint shown on hover', async () => {
      await page.getByText('Containing').click();
      await page.getByText('Not containing').waitFor({ state: 'visible' });
      await page.getByRole('option').nth(1).click();
      await page.getByRole('option').nth(1).waitFor({ state: 'hidden' });
      await locators.input(page).fill('a');
      await locators.button(page, 'Remove condition').waitFor({ state: 'visible' });
      await locators.button(page, 'Remove condition').hover(); ;
      await page.getByText('Remove condition').waitFor({ state: 'visible' });
      await expect(locators.button(page, 'Remove condition')).toHaveCount(1);
    });

    await test.step('Verify counter in trigger appears when item added', async () => {
      await locators.button(page, 'Apply').click();
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.counter(page)).toHaveText('1 applied');
    });

    await test.step('Verify hint on hover close button ', async () => {
      await page.getByLabel('Clear advanced filters').hover();
      await page.getByText('Clear advanced filters').waitFor({ state: 'visible' });
      // await page.keyboard.press('Escape');
      // await expect(page.getByText('Clear')).not.toBeVisible();
      await expect(page.getByText('Clear advanced filters')).toHaveCount(1);
    });

    await test.step('Verify Adding multiple items', async () => {
      await locators.trigger(page, 0).click();
      await locators.popper(page).waitFor({ state: 'visible' });

      await locators.button(page, 'Add condition').click();
      await locators.button(page, 'Add condition').click();
      await locators.button(page, 'Add condition').click();
      await locators.input(page).nth(1).fill('b');
      await locators.input(page).nth(2).fill('c');
      await locators.input(page).nth(3).fill('d');

      await locators.button(page, 'Apply').click();
      await expect(locators.counter(page)).toHaveText('4 applied');
    });

    await test.step('Verify items doesnt add when add new and click on trigger', async () => {
      await locators.trigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await locators.button(page, 'Add condition').click();
      await locators.input(page).nth(4).fill('e');
      await locators.trigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.counter(page)).toHaveText('4 applied');
    });

    await test.step('Verify Removing one item', async () => {
      await locators.trigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await page.getByLabel('Remove condition').nth(2).click();
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.counter(page)).toHaveText('3 applied');
    });

    await test.step('Verify Clear all removes all items', async () => {
      await locators.trigger(page, 0).click();
      await locators.button(page, 'Apply').waitFor({ state: 'visible' });
      await locators.button(page, 'Clear all').click();
      await expect(locators.counter(page)).toHaveText('3 applied');
      await locators.button(page, 'Apply').click();
      await locators.button(page, 'Apply').waitFor({ state: 'hidden' });
      await expect(locators.counter(page)).not.toBeVisible();
    });
  });
});
