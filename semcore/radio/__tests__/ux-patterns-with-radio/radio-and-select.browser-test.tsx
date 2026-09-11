import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  radios: (page: Page, index?: number) => {
    const base = page.getByRole('radio');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radio: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Radio"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioMark: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Value.RadioMark"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioText: (page: Page, index?: number) => {
    const base = page.locator('[data-ui-name="Radio.Text"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  textLabel: (page: Page, text: string) => page.locator('label', { hasText: text }),
  status: (page: Page, index?: number) => {
    const base = page.getByRole('status');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  radioGroup: (page: Page, index?: number) => {
    const base = page.getByRole('group');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  options: (page: Page, index?: number) => {
    const base = page.getByRole('option');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  selectTrigger: (page: Page, index?: number) => {
    const base = page.getByRole('combobox');
    return typeof index === 'number' ? base.nth(index) : base;
  },
  button: (page: Page, text: string) => page.locator('button', { hasText: text }),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify Radio and Select UX pattern', {
    tag: [TAG.PRIORITY_MEDIUM, '@radio', '@select', '@base-components', '@flex-box', '@button', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx', 'en');

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await locators.options(page, 0).waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test('Verify Radio and Select UX pattern keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.KEYBOARD, '@radio', '@select', '@base-components', '@flex-box', '@button', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx', 'en');

    await test.step('Verify initial state and tab navigation', async () => {
      await expect(locators.radioGroup(page)).toHaveAttribute('value', 'all');
      await page.keyboard.press('Tab');
      await expect(locators.radios(page, 0)).toBeFocused();
      await expect(locators.radios(page, 0)).toHaveAttribute('checked');
    });

    await test.step('Verify select interaction', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.selectTrigger(page)).toBeFocused();
      await page.keyboard.press('Space');
      await page.getByText('500').waitFor({ state: 'visible' });
      await expect(locators.options(page, 0)).toHaveClass(/highlighted/);

      await page.keyboard.press('ArrowDown');
      await expect(locators.options(page, 1)).toHaveClass(/highlighted/);

      await page.keyboard.press('Space');
      await locators.options(page, 0).waitFor({ state: 'hidden' });

      await expect(locators.selectTrigger(page)).toHaveAttribute('value', '500');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', 'first');
      await expect(locators.radios(page, 2)).toBeChecked();
      await page.keyboard.press('Shift+Tab');
      await expect(locators.radios(page, 2)).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.button(page, 'Export')).toBeFocused();
    });
  });

  test('Verify Radio and Select UX pattern mouse interactions', {
    tag: [TAG.PRIORITY_HIGH, TAG.MOUSE, '@radio', '@select', '@base-components', '@flex-box', '@button', '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/patterns/ux-patterns/form/docs/examples/radio-and-select.tsx', 'en');

    await test.step('Verify initial state', async () => {
      await expect(locators.radioGroup(page)).toHaveAttribute('value', 'all');
      await expect(locators.radios(page, 0)).toHaveAttribute('checked');
    });

    await test.step('Verify select interaction with mouse', async () => {
      await locators.selectTrigger(page).click();
      await page.getByText('500').waitFor({ state: 'visible' });
      await expect(locators.options(page, 0)).toHaveClass(/selected/);

      await locators.options(page, 1).click();

      await locators.options(page, 0).waitFor({ state: 'hidden' });

      await expect(locators.selectTrigger(page)).toHaveAttribute('value', '500');
      await expect(locators.radioGroup(page)).toHaveAttribute('value', 'first');
      await expect(locators.radios(page, 2)).toBeChecked();
    });
  });
});
