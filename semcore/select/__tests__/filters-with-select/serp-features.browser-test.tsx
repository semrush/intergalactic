import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  trigger: (page: Page) => page.getByRole('combobox'),
  textbox: (page: Page) => page.getByRole('textbox'),
  clearSearch: (page: Page) => page.getByRole('button', { name: 'Clear search field' }),
  reload: (page: Page) => page.getByRole('button', { name: 'Reload' }),
  apply: (page: Page) => page.getByRole('button', { name: 'Apply' }),
  options: (page: Page) => page.getByRole('option'),
  checkboxes: (page: Page) => page.locator('[data-ui-name="Select.Option.Checkbox"]'),
  ellipsisHint: (page: Page) => page.locator('[data-ui-name="Hint"]'),
  clear: (page: Page) => page.getByRole('button', { name: 'Clear' }),
  loadingText: (page: Page) => page.getByText('Loading...'),
  errorText: (page: Page) => page.getByText('Something went wrong.'),
  clearSearchHint: (page: Page) => page.getByText('Clear search field'),
  optionByName: (page: Page, name: string) => page.getByRole('option', { name }),
  textByContent: (page: Page, text: string) => page.getByText(text),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify SERP features mouse interaction states', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx', 'en');

    await test.step('Verify loading state', async () => {
      await locators.trigger(page).click();
      await locators.loadingText(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify error state', async () => {
      await locators.errorText(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify clear search hint', async () => {
      await locators.textbox(page).fill('Test');
      await locators.clearSearch(page).hover();
      await locators.clearSearchHint(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify reload success state', async () => {
      await locators.reload(page).click();
      await locators.apply(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify cleared search with options', async () => {
      await locators.clearSearch(page).click();
      await locators.options(page).first().waitFor({ state: 'visible' });
      await locators.clearSearchHint(page).waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify option hover with hint', async () => {
      await locators.textbox(page).fill('Ads');
      await locators.optionByName(page, 'Shopping Ads (Product Listing Ads Block)').hover();
      const hint = page.locator('[data-ui-name="Hint"]');
      await hint.waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify applied filter state', async () => {
      await locators.optionByName(page, 'Shopping Ads (Product Listing Ads Block)').click();
      await locators.apply(page).click();
      await locators.apply(page).waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify SERP features keyboard interaction states', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx', 'en');

    await test.step('Verify loading state via keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.loadingText(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify error state via keyboard', async () => {
      await locators.errorText(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify reload success state via keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.apply(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify search, navigation state and hint on focus', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.type('Ads');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      const hint = page.locator('[data-ui-name="Hint"]');
      await hint.waitFor({ state: 'visible' });
      await page.waitForFunction(
        () => {
          const el = document.querySelector('[data-ui-name="Hint"]');
          return el && getComputedStyle(el).opacity === '1';
        },
      );
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify selected options state', async () => {
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify applied state via keyboard', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.apply(page).waitFor({ state: 'hidden' });
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
  test('Verify SERP features keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/serp-features/docs/examples/serp-filter.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await test.step('Verify focus order when reload state', async () => {
      await locators.errorText(page).waitFor({ state: 'visible' });
      await expect(locators.textbox(page)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.reload(page)).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.textbox(page)).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.reload(page)).toBeFocused();
    });

    await test.step('Verify focus order in the input', async () => {
      await page.keyboard.press('Enter');
      await locators.apply(page).waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.type('a');
      await expect(locators.clearSearch(page)).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(locators.clearSearch(page)).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(locators.clearSearch(page)).not.toBeVisible();
      await expect(locators.textbox(page)).toBeFocused();
    });

    await test.step('Verify all options can be selected', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(locators.optionByName(page, 'Select all')).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      const count = await locators.options(page).count();
      for (let i = 0; i < count - 2; i++) {
        await expect(locators.checkboxes(page).nth(i)).toHaveClass(/selected/);
      }
      await expect(locators.optionByName(page, 'None')).toHaveAttribute('disabled');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.apply(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveText(/SERP Features: All selected/);
    });

    await test.step('Verify all options can be deselected and cleared', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.apply(page).waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await expect(locators.optionByName(page, 'Deselect all')).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      const count = await locators.options(page).count();
      for (let i = 0; i < count - 2; i++) {
        await expect(locators.checkboxes(page).nth(i)).not.toHaveClass(/selected/);
      }
      await expect(locators.optionByName(page, 'None')).not.toHaveAttribute('disabled');

      await page.keyboard.press('Tab');
      await expect(locators.clear(page)).toBeFocused();
      await page.keyboard.press('Space');
      await locators.apply(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.trigger(page)).toHaveText(/SERP Features/);
    });

    await test.step('Verify none can be deselected', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.apply(page).waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowUp');
      await expect(locators.optionByName(page, 'None')).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      const count = await locators.options(page).count();
      for (let i = 0; i < count - 2; i++) {
        await expect(locators.checkboxes(page).nth(i)).toHaveAttribute('disabled');
      }
      await expect(locators.optionByName(page, 'None')).not.toHaveAttribute('disabled');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.apply(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.trigger(page)).toHaveText(/SERP Features: %none%/);
    });
  });
});
