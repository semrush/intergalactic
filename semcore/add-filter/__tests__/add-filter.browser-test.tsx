import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  addFilterBtn: (page: Page): Locator => page.getByRole('button', { name: 'Add filter' }),
  clearAllBtn: (page: Page): Locator => page.getByRole('button', { name: 'Clear filters' }),
  applyBtn: (page: Page): Locator => page.getByRole('button', { name: 'Apply' }),
  inputClearBtn: (page: Page): Locator => page.getByRole('button', { name: 'Clear', exact: true }),
  addFilterMenuItem: (page: Page, name: string): Locator => page.getByRole('menuitem', { name }),
  selectOption: (page: Page, name: string): Locator => page.getByRole('option', { name }),
  input: (page: Page, placeholder: string): Locator => page.getByPlaceholder(placeholder),
  rangeInput: (page: Page, placeholder: 'From' | 'To'): Locator => page.getByPlaceholder(placeholder, { exact: true }),
  searchInput: (page: Page): Locator => page.locator('[data-ui-name="AddFilterSelect.InputSearch"]'),
  dialog: (page: Page): Locator => page.getByRole('dialog'),
  dialogWithFocus: (page: Page): Locator => page.locator('[role="dialog"]:focus-within'),
  clearInput: (page: Page): Locator => page.locator('[data-ui-name="AddFilterInput.Clear"]'),
  selectTrigger: (page: Page, placeholder?: string): Locator => page.locator(
    placeholder
      ? `[data-ui-name="FilterTrigger.TriggerButton"][placeholder="${placeholder}"]`
      : '[data-ui-name="FilterTrigger.TriggerButton"]',
  ),
  filterValue: (page: Page, placeholder?: string): Locator => page.locator(
    placeholder
      ? `[data-ui-name="FilterTrigger.Text"][placeholder="${placeholder}"]`
      : '[data-ui-name="FilterTrigger.Text"]',
  ),
  addFilterSelectTrigger: (page: Page): Locator => page.locator('[data-ui-name="AddFilterSelect.Trigger"]'),
  dropdownTrigger: (page: Page, placeholder: string): Locator =>
    page.locator(`[data-ui-name="AddFilterDropdown.Trigger"][placeholder="${placeholder}"]`),
  clearSelectButton: (page: Page, index: number): Locator =>
    page.locator('[data-ui-name="FilterTrigger.ClearButton"]').nth(index),
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify base example with selects after mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@add-filter',
      '@base-trigger',
      '@filter-trigger',
      '@button',
      '@input',
      '@select',
      '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

    await test.step('Verify initial state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify filter list expanded by click on Add filter', async () => {
      await locators.addFilterBtn(page).click();

      await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await locators.addFilterMenuItem(page, 'Color').click();
      await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify base example with selects after keyboard interactions', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@add-filter',
      '@base-trigger',
      '@filter-trigger',
      '@button',
      '@input',
      '@select',
      '@button-link'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

    await test.step('Verify filter list expanded by Enter on Add filter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Color')).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify all filters added and Add filter button hidden', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@add-filter',
      '@base-trigger',
      '@filter-trigger',
      '@button',
      '@input',
      '@radio',
      '@textarea',
      '@select',
      '@base-components',
      '@flex-box',
      '@button-link',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

    await test.step('Add Select filter and fill value', async () => {
      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Device').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Device').click();
      await locators.selectOption(page, 'Phone').waitFor({ state: 'visible' });
      await locators.selectOption(page, 'Phone').click();
    });

    await test.step('Add Input filter and fill value', async () => {
      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Position').click();
      await locators.input(page, 'Filter by position').fill('Test');
    });

    await test.step('Add DD filter and fill value', async () => {
      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Keywords').click();
      await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await locators.applyBtn(page).click();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Clear filters focus state by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.KEYBOARD,
      '@add-filter',
      '@base-trigger',
      '@filter-trigger',
      '@button',
      '@input',
      '@radio',
      '@textarea',
      '@select',
      '@base-components',
      '@flex-box',
      '@button-link',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

    await locators.input(page, 'Filter by name').fill('Test');

    for (let i = 0; i < 7; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }
    await expect(locators.clearAllBtn(page)).toBeFocused();
    await expect(page).toHaveScreenshot();
  });

  test('Verify Select with range as filter after mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@add-filter',
      '@button',
      '@input',
      '@input-number',
      '@divider',
      '@base-components',
      '@flex-box',
      '@neighbor-location',
      '@button-link',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

    await locators.addFilterBtn(page).click();
    await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem(page, 'Range').click();
    await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Select with search as filter after keyboard interactions', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@add-filter',
      '@button',
      '@input',
      '@input-number',
      '@divider',
      '@base-components',
      '@flex-box',
      '@neighbor-location',
      '@button-link',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

    await test.step('Verify select with search opened from filters list', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);

      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
      await locators.selectOption(page, 'Banana').waitFor({ state: 'visible' });

      await expect(page).toHaveScreenshot();
    });
    await test.step('Verify option selected after search', async () => {
      await locators.searchInput(page).fill('Banana');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.selectOption(page, 'Banana').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Input filter clear button hint on hover', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@add-filter',
      '@base-trigger',
      '@filter-trigger',
      '@button',
      '@input',
      '@radio',
      '@textarea',
      '@select',
      '@base-components',
      '@flex-box',
      '@button-link',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

    await locators.input(page, 'Filter by name').fill('Test');
    await locators.input(page, 'Filter by fullname').fill('Test');
    await locators.addFilterBtn(page).click();
    await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem(page, 'Position').click();
    await locators.input(page, 'Filter by position').fill('Test');
    await locators.clearInput(page).hover();
    await expect(page.locator('[data-ui-name="Hint"]')).toHaveCount(1);
    await expect(page).toHaveScreenshot();
  });

  test('Verify Multiselect as filter after keyboard interactions', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.KEYBOARD,
      '@add-filter',
      '@button',
      '@input',
      '@input-number',
      '@divider',
      '@base-components',
      '@flex-box',
      '@neighbor-location',
      '@button-link',
      '@typography'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
  });
});

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Add filter button', () => {
    test('Verify cancel adding filter data when no data selected by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@select',
        '@button-link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

      await test.step('Verify filter list expanded by click on Add filter', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Color').click();
        await expect(locators.selectTrigger(page, 'Color')).toBeFocused();
      });

      await test.step('Verify filter hidden and filters list expanded when clicking on Add filter', async () => {
        await locators.addFilterBtn(page).click();
        await expect(locators.selectTrigger(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterMenuItem(page, 'Color')).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Verify filter removes and filters list remain hidden when clicking outside', async () => {
        await locators.addFilterMenuItem(page, 'Color').click();
        await page.mouse.click(0, 0);
        await expect(locators.selectTrigger(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterMenuItem(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Verify filter removed and filters list hidden via filter trigger click', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Color').click();
        await locators.selectTrigger(page, 'Color').click();
        await expect(locators.selectTrigger(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterMenuItem(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });
    });

    test('Verify cancel adding filter data when no data selected by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@select',
        '@button-link'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

      await test.step('Verify focus for filters list and filter', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Color')).toBeFocused();
        await page.keyboard.press('Enter');

        await expect(locators.selectTrigger(page, 'Color')).toBeFocused();
      });

      await test.step('Verify filter hidden, filters list not expanded and Add filter focused by ESC', async () => {
        await page.keyboard.press('Escape');
        await expect(locators.selectTrigger(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterMenuItem(page, 'Color')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });
    });

    test('Verify Add filter button appearing and disappearing by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Add Select filter and fill value', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Device').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Device').click();
        await locators.selectOption(page, 'Phone').waitFor({ state: 'visible' });
        await locators.selectOption(page, 'Phone').click();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Add Input filter and fill value', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Device')).not.toBeVisible();
        await locators.addFilterMenuItem(page, 'Position').click();
        await locators.input(page, 'Filter by position').fill('Test');
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Add DD filter and fill value', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Position')).not.toBeVisible();
        await locators.addFilterMenuItem(page, 'Keywords').click();
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await locators.applyBtn(page).click();
      });

      await test.step('Verify that Add filter removed when all filters from the list added', async () => {
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Add filter appears when Select filter removed', async () => {
        await locators.clearSelectButton(page, 0).click();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Verify Add filter appears when Input filter removed', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Device').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Device').click();
        await locators.selectOption(page, 'Phone').waitFor({ state: 'visible' });
        await locators.selectOption(page, 'Phone').click();
        await locators.clearInput(page).click();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Verify Add filter appears when clicking on Clear filters', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Position').click();
        await locators.input(page, 'Filter by position').fill('Test');
        await locators.clearAllBtn(page).click();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });
    });

    test('Verify Add filter button appearing and disappearing by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
      }

      await test.step('Clear all button appear when select item is added', async () => {
        await expect(locators.addFilterBtn(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'hidden' });
        await locators.selectOption(page, 'Desktop').waitFor({ state: 'visible' });
        await expect(locators.clearAllBtn(page)).not.toBeVisible();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.selectOption(page, 'Desktop').waitFor({ state: 'hidden' });
        await expect(locators.clearAllBtn(page)).toBeVisible();
      });

      await test.step('Add Input filter and fill value', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await expect(locators.addFilterBtn(page)).toBeFocused();
        await page.keyboard.press('Space');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);
        await expect(locators.addFilterMenuItem(page, 'Device')).not.toBeVisible();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'hidden' });
        await locators.input(page, 'Filter by position').fill('Test');
      });

      await test.step('Add DD filter and fill value', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Space');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);
        await expect(locators.addFilterMenuItem(page, 'Device')).not.toBeVisible();
        await expect(locators.addFilterMenuItem(page, 'Position')).not.toBeVisible();

        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'hidden' });
        await expect(locators.dialogWithFocus(page)).toBeVisible();
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.keyboard.press('Tab');
        await expect(locators.applyBtn(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'hidden' });
      });

      await test.step('Verify Add filter removed when all filters added', async () => {
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Add filter appears and focused when Input filter removed', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify Add filter appears and focused when Select filter removed', async () => {
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);

        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'visible' });

        await expect(locators.dialogWithFocus(page)).toBeVisible();
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.keyboard.press('Tab');
        await expect(locators.applyBtn(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'hidden' });

        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeFocused();
        await expect(
          locators.selectTrigger(page, 'Exclude keywords'),
        ).toBeFocused();
      });

      await test.step('Verify Add filter appears and focused when pressing Clear filters', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Position')).toHaveClass(/highlighted/);
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'hidden' });
        await locators.input(page, 'Filter by position').fill('Test');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });
    });
  });

  test.describe('Clear Filters button', () => {
    test('Verify Clear all when some filters pre filled and added by mouse', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Verify Clear filters button shown and removed when interacting with filters before Add filter', async () => {
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await locators.input(page, 'Filter by name').fill('Test');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await locators.inputClearBtn(page).click();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Clear filters button shown and removed when interacting with filters list', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Device').click();
        await locators.selectOption(page, 'Phone').click();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await locators.clearSelectButton(page, 0).click();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Clear filters disappears and removes all added filters', async () => {
        await locators.input(page, 'Filter by name').fill('Test');
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Device').click();
        await locators.selectOption(page, 'Phone').click();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await locators.clearAllBtn(page).click();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await expect(locators.filterValue(page, 'Device')).not.toBeVisible();
        await expect(locators.input(page, 'Filter by name')).toHaveValue('');
      });
    });

    test('Verify Clear all when some filters pre filled and added by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Verify Clear filters button shown and removed when interacting with filters before Add filter', async () => {
        await page.keyboard.press('Tab');
        await expect(locators.input(page, 'Filter by name')).toBeFocused();

        await page.keyboard.type('Test');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Clear filters button shown and removed when interacting with filters list', async () => {
        for (let i = 0; i < 5; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(50);
        }
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'hidden' });
        await locators.selectOption(page, 'Desktop').waitFor({ state: 'visible' });

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.selectOption(page, 'Desktop').waitFor({ state: 'hidden' });

        await expect(locators.filterValue(page, 'Device')).toBeVisible();
        await expect(
          locators.selectTrigger(page, 'Device'),
        ).toBeFocused();
        await expect(locators.clearAllBtn(page)).toBeVisible();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify all filters removed and Clear filters button hidden when pressing Clear filters', async () => {
        await locators.input(page, 'Filter by fullname').fill('Test');
        for (let i = 0; i < 4; i++) {
          await page.keyboard.press('Tab');
          await page.waitForTimeout(50);
        }
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.selectOption(page, 'Desktop').waitFor({ state: 'visible' });

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.selectOption(page, 'Desktop').waitFor({ state: 'hidden' });

        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('Tab');
        }
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await expect(locators.filterValue(page, 'Device')).not.toBeVisible();
        await expect(locators.input(page, 'Filter by fullname')).toHaveValue('');
      });
    });
  });

  test.describe('Different filter types', () => {
    test('Verify Dropdown as filter keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Verify not applied Dropdown filter removed by Escape', async () => {
        for (let i = 0; i < 6; i++) {
          await page.keyboard.press('Tab');
        }
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);

        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'visible' });
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.keyboard.press('Escape');
        await expect(locators.dropdownTrigger(page, 'Exclude keywords')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify Dropdown filter value applied by keyboard', async () => {
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);
        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'visible' });

        await expect(locators.dialogWithFocus(page)).toBeVisible();
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.keyboard.press('Tab');
        await expect(locators.applyBtn(page)).toBeFocused();
        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'hidden' });

        await expect(
          locators.filterValue(page, 'Exclude keywords'),
        ).toHaveText('Exclude: 1 keywords');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeFocused();
      });
    });

    test('Verify Dropdown as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Verify not applied Dropdown filter removed by click on its trigger', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });

        await locators.addFilterMenuItem(page, 'Keywords').click();
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await locators.dropdownTrigger(page, 'Exclude keywords').click();
        await expect(locators.dropdownTrigger(page, 'Exclude keywords')).not.toBeVisible();
      });

      await test.step('Verify Dropdown filter value applied by Apply button', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });

        await locators.addFilterMenuItem(page, 'Keywords').click();
        await locators.input(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await locators.applyBtn(page).click();
        await expect(
          locators.filterValue(page, 'Exclude keywords'),
        ).toHaveText('Exclude: 1 keywords');
        await expect(locators.clearAllBtn(page)).toBeVisible();
      });
    });

    test('Verify Select with range as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await test.step('Verify empty filter removed by Escape on its trigger', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });

        await page.keyboard.press('Escape');
        await expect(locators.selectTrigger(page, 'Range')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify empty filter removed by Escape inside the popper', async () => {
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
        await locators.selectOption(page, '100,001+').waitFor({ state: 'visible' });
        await page.keyboard.press('Tab');
        await page.keyboard.press('Escape');
        await locators.selectOption(page, '100,001+').waitFor({ state: 'hidden' });
        await expect(locators.selectTrigger(page, 'Range')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify custom range applied by Enter', async () => {
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
        await locators.selectOption(page, '100,001+').waitFor({ state: 'visible' });

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await locators.rangeInput(page, 'To').fill('5');
        await page.keyboard.press('Enter');
        await expect(locators.filterValue(page)).toHaveText('Volume: 1-5');
      });
    });

    test('Verify Select with range as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await test.step('Verify preset range selected', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Range').click();
        await locators.selectOption(page, '10,001-100,000').click();
        await expect(locators.filterValue(page)).toHaveText(
          'Volume: 10,001-100,000',
        );
      });

      await test.step('Verify custom range with From only', async () => {
        await locators.clearSelectButton(page, 0).click();
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Range').click();

        await locators.rangeInput(page, 'From').fill('1');
        await locators.applyBtn(page).click();
        await expect(locators.filterValue(page)).toHaveText('Volume: 1+');
      });

      await test.step('Verify custom range with From and To', async () => {
        await locators.clearSelectButton(page, 0).click();
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Range').click();
        await locators.rangeInput(page, 'From').fill('1');
        await locators.rangeInput(page, 'To').fill('5');
        await locators.applyBtn(page).click();
        await expect(locators.filterValue(page)).toHaveText('Volume: 1-5');
      });
    });

    test('Verify Select with search as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await test.step('Verify filter removed by Escape when search has no selection', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });

        await locators.searchInput(page).fill('abc');
        await page.keyboard.press('Escape');
        await expect(locators.selectTrigger(page, 'Select a fruit')).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify option selected after search and trigger focused', async () => {
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
        await page.keyboard.press('ArrowDown');

        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });

        await locators.searchInput(page).fill('Banana');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.selectOption(page, 'Banana').waitFor({ state: 'hidden' });
        await expect(locators.filterValue(page)).toHaveText('Fruit: Banana');
        await expect(locators.selectTrigger(page)).toBeFocused();
      });
    });

    test('Verify Select with search as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await test.step('Verify filter removed by click on trigger when search has no selection', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Select with search').click();
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
        await locators.searchInput(page).fill('abc');
        await locators.selectTrigger(page, 'Select a fruit').click();
        await expect(locators.selectTrigger(page, 'Select a fruit')).not.toBeVisible();
      });

      await test.step('Verify option selected after search', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Select with search').click();
        await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
        await locators.searchInput(page).fill('Banana');
        await locators.selectOption(page, 'Banana').click();
        await expect(locators.filterValue(page)).toHaveText('Fruit: Banana');
      });
    });

    test('Verify Multiselect as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.addFilterSelectTrigger(page).click();
      await expect(locators.filterValue(page)).toHaveText(
        'Multiselect: 1, 2',
      );
    });

    test('Verify Multiselect as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider',
        '@base-components',
        '@flex-box',
        '@neighbor-location',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'MultiSelect').click();
      await locators.selectOption(page, 'Awesome option 0').click();
      await locators.selectOption(page, 'Awesome option 2').click();
      await locators.addFilterSelectTrigger(page).click();
      await expect(locators.filterValue(page)).toHaveText(
        'Multiselect: 0, 2',
      );
    });

    test('Verify Input as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select',
        '@base-components',
        '@flex-box',
        '@button-link',
        '@typography'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Fill pre-filled Input filters', async () => {
        await page.keyboard.press('Tab');
        await locators.input(page, 'Filter by name').fill('Test');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await locators.input(page, 'Filter by fullname').fill('Test');
      });
      await test.step('Verify Add filter focused after added Input filter is cleared', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keyword')).toHaveClass(/highlighted/);
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');
        await locators.input(page, 'Filter by position').fill('Test');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });
    });
  });

  test.describe('Controlled mode', () => {
    test('Verify add filter by visibleFilters prop', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@filter-trigger',
        '@d3-chart',
        '@select',
        '@base-components',
        '@flex-box',
        '@cigarette-chart'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/controlled_add_filter.tsx', 'en');

      await test.step('Add Color filter and fill value from addFilter button', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Color').click();
        await locators.selectOption(page, 'Blue').click();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.filterValue(page, 'Color')).toHaveText('Color: Blue');
      });

      await locators.clearAllBtn(page).click();

      await test.step('Add Color filter and fill value outside from addFilter component', async () => {
        await page.locator('div[data-ui-name="Cigarette.Bar"][aria-label="Colors"] path[color="blue-300"]').click();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.filterValue(page, 'Color')).toHaveText('Color: Yellow');
        await page.waitForTimeout(100);
        await expect(locators.selectOption(page, 'Blue')).not.toBeVisible();
        await locators.clearAllBtn(page).click();
        await expect(locators.addFilterBtn(page)).toBeVisible();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
      });
    });
  });
});
