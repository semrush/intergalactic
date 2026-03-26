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
  test('Verify Dynamic search', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world Hello world Hello world ');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await locators.hint(page, 'Clear').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Shift+Tab');
    await expect(page).toHaveScreenshot();
  });

  test('Verify Search by button', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/search-by-button.tsx', 'en');

    await page.locator('label').click();
    await page.keyboard.type('Hello world Hello world Hello world ');
    await expect(page).toHaveScreenshot();

    await page.getByRole('button').nth(1).hover();
    await locators.hint(page, 'Search').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await locators.hint(page, 'Clear').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Search with Select', {
    tag: [TAG.PRIORITY_HIGH,
      '@input',
      '@button',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/search-with-select.tsx', 'en');

    await page.locator('label').click();
    await page.keyboard.type('Hello world Hello world Hello world ');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Shift+Tab');
    await page.keyboard.press('Space');
    await page.getByRole('option').first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL} `, () => {
  test('Verify focus returns on Clear Addon by mouse click in Dynamic dearch', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx', 'en');

    await page.locator('label').click();
    await page.keyboard.type('Hello world');
    await expect(locators.input(page)).toHaveValue('Hello world');
    await locators.button(page, 'Clear').click();

    await expect(locators.input(page)).toHaveValue('');
    await expect(locators.input(page)).toBeFocused();
    await expect(locators.button(page, 'Clear')).toBeHidden();
  });

  test('Verify focus returns on Clear addon by keyboard interaction in Dynamic dearch', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@input',
      '@button',
      '@tooltip'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-search/docs/examples/dynamic_search.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.type('Hello world');
    await expect(locators.input(page)).toHaveValue('Hello world');
    await page.keyboard.press('Tab');
    await expect(locators.button(page, 'Clear')).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(locators.input(page)).toHaveValue('');
    await expect(locators.input(page)).toBeFocused();
    await expect(locators.button(page, 'Clear')).toBeHidden();
  });
});
