import { expect, test, type Page } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const locators = {
  trigger: (page: Page) => page.getByRole('combobox', { name: 'Volume' }),
  popper: (page: Page) => page.getByRole('dialog'),
  textboxes: (page: Page) => page.getByRole('textbox'),
  apply: (page: Page) => page.getByRole('button', { name: 'Apply' }),
  filterTriggerClear: (page: Page) => page.getByRole('button', { name: 'Clear' }),
  options: (page: Page) => page.getByRole('option'),
  clearHint: (page: Page) => page.getByText('Clear'),
};

/* =====================================================
  @visual
  Visual states, hover and focus styles, paddings, margins, and snapshots.
  ===================================================== */
test.describe(TAG.VISUAL, () => {
  test('Verify filter KD positions volume visual states', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/presets.tsx', 'en');

    await test.step('Verify opened dialog state', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify dialog with focused textbox', async () => {
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify dialog with values filled', async () => {
      await expect(locators.textboxes(page).nth(0)).toBeFocused();
      await page.keyboard.type('6');
      await page.keyboard.press('Tab');
      await expect(locators.textboxes(page).nth(1)).toBeFocused();
      await page.keyboard.type('1');
      await page.keyboard.press('Tab');
      await expect(locators.apply(page)).toBeFocused();
      await page.waitForTimeout(100);
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
test.describe(TAG.FUNCTIONAL, () => {
  test('Verify filter KD positions volume keyboard navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@select', '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/presets.tsx', 'en');

    await test.step('Verify 1st item highlighted when select opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await locators.apply(page).waitFor({ state: 'visible' });
      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify keyboard navigation inside dialog', async () => {
      for (let i = 0; i++; i < 6) {
        await page.keyboard.press('ArrowDown');
        await page.waitForTimeout(50);
      }

      await expect(locators.options(page).first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Tab');
      await expect(locators.textboxes(page).first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.textboxes(page).nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.apply(page)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.apply(page)).not.toBeFocused();

      await expect(locators.options(page).first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify Dialog closed by ESC when focus in different elements', async () => {
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.apply(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await expect(locators.textboxes(page).first()).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.apply(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.apply(page)).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toBeFocused();
    });

    await test.step('Verify value applies on trigger when selecting item from select list', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.apply(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await expect(locators.options(page).first()).toHaveClass(/highlighted/);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.trigger(page)).toBeFocused();
      await expect(locators.trigger(page)).toHaveText(/Volume:\s*1,001–10,000/);
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.filterTriggerClear(page)).toBeFocused();
      await locators.clearHint(page).waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await locators.clearHint(page).waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify Case when entering min value only', async () => {
      await page.keyboard.press('Space');
      await locators.popper(page).waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await expect(locators.textboxes(page).nth(0)).toBeVisible();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.textboxes(page).nth(0)).toBeFocused();
      await page.keyboard.type('5');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveText(/Volume:\s*5+/);
    });

    await test.step('Verify trigger clears when pressing Clear', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await page.keyboard.press('Enter');
      await expect(locators.filterTriggerClear(page)).not.toBeVisible();
    });

    await test.step('Verify Case when entering max value only', async () => {
      await expect(locators.trigger(page)).toBeVisible();

      await page.keyboard.press('Space');
      await locators.options(page).first().waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.textboxes(page).nth(1)).toBeFocused();
      await page.keyboard.type('5');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveText('Volume: 1-5');
    });
  });

  test('Verify filter KD positions volume mouse navigation', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@select', '@input-number'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/filters/filter-custom-range/docs/examples/presets.tsx', 'en');

    await test.step('Verify dialog opened and closed by trigger click', async () => {
      await locators.trigger(page).click();
      await expect(locators.popper(page)).toBeVisible();
      await locators.trigger(page).click();
      await expect(locators.popper(page)).toBeHidden();
    });

    await test.step('Verify item from select can be selected and applies', async () => {
      await locators.trigger(page).click();
      await locators.popper(page).waitFor({ state: 'visible' });
      await locators.options(page).nth(2).click();
      await locators.popper(page).waitFor({ state: 'hidden' });

      await expect(locators.popper(page)).toBeHidden();
      await expect(locators.trigger(page)).toHaveText(/Volume:\s*1,001–10,000/);
      await expect(locators.filterTriggerClear(page)).toHaveCount(1);
    });

    await test.step('Verify hint on close button hover', async () => {
      await locators.filterTriggerClear(page).hover();
      await expect(locators.clearHint(page)).toHaveCount(1);
    });

    await test.step('Verify Case when entering min value only', async () => {
      await locators.trigger(page).click();
      await locators.popper(page).waitFor({ state: 'visible' });

      await locators.textboxes(page).nth(0).fill('5');
      await locators.apply(page).click();
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveText(/Volume:\s*5+/);
    });

    await test.step('Verify trigger clears when pressing Clear', async () => {
      await locators.filterTriggerClear(page).click();
      await expect(locators.filterTriggerClear(page)).not.toBeVisible();
    });

    await test.step('Verify Case when entering max value only', async () => {
      await locators.trigger(page).click();
      await locators.popper(page).waitFor({ state: 'visible' });

      await locators.textboxes(page).nth(1).fill('5');
      await locators.apply(page).click();
      await locators.popper(page).waitFor({ state: 'hidden' });
      await expect(locators.trigger(page)).toHaveText('Volume: 1-5');
    });
  });
});
