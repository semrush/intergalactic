import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

export const locators = {
  addFilterBtn: (page: Page, index?: number): Locator => {
    const base = page.getByRole('button', { name: 'Add filter' });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  clearAllBtn: (page: Page): Locator => page.getByRole('button', { name: 'Clear filters' }),

  addFilterMenuItem: (page: Page, name: string, index?: number): Locator => {
    const base = page.getByRole('menuitem', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  selectOption: (page: Page, name: string, index?: number): Locator => {
    const base = page.getByRole('option', { name });
    return typeof index === 'number' ? base.nth(index) : base;
  },

  input: (page: Page, placeholder?: string, index?: number): Locator => {
    const base = placeholder
      ? page.getByPlaceholder(placeholder)
      : page.locator('[data-ui-name="Input.Value"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },

  addFilterInput: (page: Page, placeholder?: string, index?: number): Locator => {
    const base = placeholder
      ? page.getByPlaceholder(placeholder)
      : page.locator('[data-ui-name="AddFilterInput.Value"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },

  selectTrigger: (page: Page, placeholder: string, index?: number): Locator => {
    const base = page.locator(
      `[data-ui-name="FilterTrigger.TriggerButton"][placeholder="${placeholder}"]`,
    );
    return typeof index === 'number' ? base.nth(index) : base;
  },

  selectTriggerFilled: (page: Page, placeholder: string, index?: number): Locator => {
    const base = page.locator(
      `[data-ui-name="FilterTrigger.Text"][placeholder="${placeholder}"]`,
    );
    return typeof index === 'number' ? base.nth(index) : base;
  },

  addFilterSelectInputSearch: (page: Page): Locator => page.locator('[data-ui-name="AddFilterSelect.InputSearch"]'),

  dropdownTrigger: (page: Page, placeholder: string): Locator =>
    page.locator(`[data-ui-name="AddFilterDropdown.Trigger"][placeholder="${placeholder}"]`),

  dialog: (page: Page): Locator => page.getByRole('dialog'),

  clearInput: (page: Page): Locator => page.locator('[data-ui-name="AddFilterInput.Clear"]'),

  clearSelectButton: (page: Page, index?: number): Locator => {
    const base = page.locator('[data-ui-name="FilterTrigger.ClearButton"]');
    return typeof index === 'number' ? base.nth(index) : base;
  },
};

/* =====================================================
@visual
Visual states, hover and focus styles, paddings, margins, and snapshots.
===================================================== */
test.describe(`${TAG.VISUAL}`, () => {
  test('Verify base example with selects after mouse interactions', {
    tag: [TAG.PRIORITY_HIGH,
      '@add-filter',
      '@base-trigger',
      '@button',
      '@input',
      '@select'],
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
      '@button',
      '@input',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

    await test.step('Verify filter list expanded by click on Add filter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Add filter without Add filter button', {
    tag: [TAG.PRIORITY_HIGH,
      TAG.MOUSE,
      '@add-filter',
      '@base-trigger',
      '@button',
      '@input',
      '@radio',
      '@textarea',
      '@select'],
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
      await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.getByRole('button', { name: 'Apply' }).click();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Add filter after activating Clear all by keyboard', {
    tag: [TAG.PRIORITY_HIGH,
      '@add-filter',
      '@base-trigger',
      '@button',
      '@input',
      '@radio',
      '@textarea',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

    await locators.input(page, 'Filter by name').fill('Test');

    for (let i = 0; i < 7; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }
    await expect(page).toHaveScreenshot();
  });

  test('Verify Select with range as filter after mouse interactions ', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@add-filter',
      '@button',
      '@input',
      '@input-number',
      '@divider'],
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
      '@divider'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

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
    await locators.addFilterSelectInputSearch(page).fill('Banana');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.selectOption(page, 'Banana').waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Input as filter after mouse interactions', {
    tag: [TAG.PRIORITY_MEDIUM,
      TAG.MOUSE,
      '@add-filter',
      '@base-trigger',
      '@button',
      '@input',
      '@radio',
      '@textarea',
      '@select'],
  }, async ({ page }) => {
    await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

    await locators.addFilterInput(page, 'Filter by name').fill('Test');
    await locators.addFilterInput(page, 'Filter by fullname').fill('Test');
    await locators.addFilterBtn(page).click();
    await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem(page, 'Position').click();
    await locators.addFilterInput(page, 'Filter by position').fill('Test');
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
      '@divider'],
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
        '@button',
        '@input',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/docs/examples/add-filter-basic.tsx', 'en');

      await test.step('Verify filter list exapnded by click on Add filter', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Color').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Color').click();
        await expect(locators.selectTrigger(page, 'Color')).toBeFocused();
      });

      await test.step('Verify filter hidden and filters list exapnded when cliking on Add filter', async () => {
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
        '@button',
        '@input',
        '@select'],
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
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
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
        await locators.addFilterInput(page, 'Filter by position').fill('Test');
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Add DD filter and fill value', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Position')).not.toBeVisible();
        await locators.addFilterMenuItem(page, 'Keywords').click();
        await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.getByRole('button', { name: 'Apply' }).click();
      });

      await test.step('Verify that Add filter removed when all filters from the list added', async () => {
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Add filters appears when Select filter removed', async () => {
        await locators.clearSelectButton(page, 0).click();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Verify Add filters appears when Input filter removed ', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Device').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Device').click();
        await locators.selectOption(page, 'Phone').waitFor({ state: 'visible' });
        await locators.selectOption(page, 'Phone').click();
        await locators.clearInput(page).click();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });

      await test.step('Vefity Add filters appear when clicking on Clear filters', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
        await locators.addFilterMenuItem(page, 'Position').click();
        await locators.addFilterInput(page, 'Filter by position').fill('Test');
        await locators.clearAllBtn(page).click();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeVisible();
      });
    });

    test('Verify Add filter button appearing and disappearing by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.FUNCTIONAL,
        '@add-filter',
        '@base-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
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
        await locators.addFilterInput(page, 'Filter by position').fill('Test');
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
        await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'hidden' });
      });

      await test.step('Verofy Add filter removed when all filters added', async () => {
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
      });

      await test.step('Verify Add filter appears and focused when Input flter removed', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).toBeFocused();
      });

      await test.step('Verify Add filter appears and focused when Select flter removed', async () => {
        await page.keyboard.press('Enter');
        await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
        await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);

        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'visible' });

        await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await locators.dialog(page).waitFor({ state: 'hidden' });

        await page.keyboard.press('Shift+Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.addFilterBtn(page)).not.toBeFocused();
        await expect(
          page.locator(
            '[data-ui-name="FilterTrigger.TriggerButton"][placeholder="Exclude keywords"]',
          ),
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
        await locators.addFilterInput(page, 'Filter by position').fill('Test');
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
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await test.step('Verify Clear filters button shown and removed when interacting with filters before Add filter', async () => {
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
        await locators.input(page, 'Filter by name').fill('Test');
        await expect(locators.clearAllBtn(page)).toBeVisible();
        const clearButton = page.locator('button[data-ui-name="ButtonLink"][aria-label="Clear"]');
        await clearButton.click();
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
        await expect(locators.selectTriggerFilled(page, 'Device')).not.toBeVisible();
        await expect(locators.input(page, 'Filter by name')).not.toHaveText('Test');
      });
    });

    test('Verify Clear all when some filters pre filled and added by keyboard', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
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

        await expect(locators.selectTriggerFilled(page, 'Device')).toBeVisible();
        await expect(
          page.locator('[data-ui-name="FilterTrigger.TriggerButton"][placeholder="Device"]'),
        ).toBeFocused();
        await expect(locators.clearAllBtn(page)).toBeVisible();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
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
        await expect(locators.selectTriggerFilled(page, 'Device')).not.toBeVisible();
        await expect(locators.input(page, 'Filter by fullname')).not.toHaveText('Test');
      });
    });
  });

  test.describe('Different filter types', () => {
    test('Verify drodown as filter keyboard interactions', {
      tag: [TAG.PRIORITY_HIGH,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
      }
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);

      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });
      await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.keyboard.press('Escape');
      await expect(locators.dropdownTrigger(page, 'Exclude keywords')).not.toBeVisible();
      await expect(locators.addFilterBtn(page)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Keywords')).toHaveClass(/highlighted/);
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'visible' });

      await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.dialog(page).waitFor({ state: 'hidden' });

      await expect(
        page.locator('[data-ui-name="FilterTrigger.Text"][placeholder="Exclude keywords"]'),
      ).toHaveText('Exclude: 1 keywords');
      await expect(locators.clearAllBtn(page)).toBeVisible();
      await expect(locators.addFilterBtn(page)).not.toBeFocused();
    });

    test('Verify drodown as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });

      await locators.addFilterMenuItem(page, 'Keywords').click();
      await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
      const applyButton = page.locator('span[data-ui-name="Button.Text"]:has-text("Apply")');
      await locators.dropdownTrigger(page, 'Exclude keywords').click();
      await expect(locators.dropdownTrigger(page, 'Exclude keywords')).not.toBeVisible();

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Keywords').waitFor({ state: 'visible' });

      await locators.addFilterMenuItem(page, 'Keywords').click();
      await locators.addFilterInput(page, 'Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await applyButton.click();
      await expect(
        page.locator('[data-ui-name="FilterTrigger.Text"][placeholder="Exclude keywords"]'),
      ).toHaveText('Exclude: 1 keywords');
      await expect(locators.clearAllBtn(page)).toBeVisible();
    });

    test('Verify Select with range as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

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

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
      await locators.selectOption(page, '100,001+').waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
      await page.keyboard.press('Enter');
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1-5');
    });

    test('Verify Select with range as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Range').click();
      await page.locator('[data-ui-name="AddFilterSelect.Option"][value="10,001-100,000"]').click();
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
        'Volume: 10,001-100,000',
      );

      await locators.clearSelectButton(page, 0).click();
      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').click();

      await page.locator('[data-ui-name="InputNumber.Value"][placeholder="From"]').fill('1');
      await page.locator('[data-ui-name="Button.Text"]:has-text("Apply")').click();
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1+');

      await locators.clearSelectButton(page, 0).click();
      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Range').click();
      await page.locator('[data-ui-name="InputNumber.Value"][placeholder="From"]').fill('1');
      await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
      await page.locator('[data-ui-name="Button.Text"]:has-text("Apply")').click();
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1-5');
    });

    test('Verify Select with search as filter keyboard interactions ', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });

      await locators.addFilterSelectInputSearch(page).fill('abc');
      await page.keyboard.press('Escape');
      await expect(locators.selectTrigger(page, 'Select a fruit')).not.toBeVisible();
      await expect(locators.addFilterBtn(page)).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Range')).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });

      await locators.addFilterSelectInputSearch(page).fill('Banana');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.selectOption(page, 'Banana').waitFor({ state: 'hidden' });
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Fruit: Banana');
      await expect(page.locator('[data-ui-name="FilterTrigger.TriggerButton"]')).toBeFocused();
    });

    test('Verify Select with search as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Select with search').click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
      const selectInputSearch = page.locator('[data-ui-name="AddFilterSelect.InputSearch"]');
      await selectInputSearch.fill('abc');
      await locators.selectTrigger(page, 'Select a fruit').click();
      await expect(locators.selectTrigger(page, 'Select a fruit')).not.toBeVisible();

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'Select with search').click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'hidden' });
      await selectInputSearch.fill('Banana');
      await page.locator('[data-ui-name="AddFilterSelect.Option"]:has-text("Banana")').click();
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Fruit: Banana');
    });

    test('Verify Multiselect as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider'],
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
      await page.locator('[data-ui-name="AddFilterSelect.Trigger"]').click();
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
        'Multiselect: 0, 1',
      );
    });

    test('Verify Multiselect as filter mouse interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@button',
        '@input',
        '@input-number',
        '@divider'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter-complex-selects.tsx', 'en');

      await locators.addFilterBtn(page).click();
      await locators.addFilterMenuItem(page, 'Range').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem(page, 'MultiSelect').click();
      await page.getByText('Awesome option 0').click();
      await page.getByText('Awesome option 2').click();
      await page.locator('[data-ui-name="AddFilterSelect.Trigger"]').click();
      await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
        'Multiselect: 0, 2',
      );
    });

    test('Verify Input as filter keyboard interactions', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.KEYBOARD,
        '@add-filter',
        '@base-trigger',
        '@button',
        '@input',
        '@radio',
        '@textarea',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/add-filter.tsx', 'en');

      await page.keyboard.press('Tab');
      await locators.addFilterInput(page, 'Filter by name').fill('Test');
      await expect(locators.clearAllBtn(page)).toBeVisible();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await locators.addFilterInput(page, 'Filter by fullname').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem(page, 'Position').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem(page, 'Keyword')).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.addFilterInput(page, 'Filter by position').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.addFilterBtn(page)).toBeFocused();
    });
  });

  test.describe('Controlled mode', () => {
    test('Verify add filter by visibleFilters prop', {
      tag: [TAG.PRIORITY_MEDIUM,
        TAG.MOUSE,
        '@add-filter',
        '@base-trigger',
        '@d3-chart',
        '@select'],
    }, async ({ page }) => {
      await loadPage(page, 'stories/components/add-filter/advanced/examples/controlled_add_filter.tsx', 'en');

      await test.step('Add Color filter and fill value from addFilter button', async () => {
        await locators.addFilterBtn(page).click();
        await locators.addFilterMenuItem(page, 'Color').click();
        await locators.selectOption(page, 'Blue').click();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.selectTriggerFilled(page, 'Color')).toHaveText('Color: Blue');
      });

      await locators.clearAllBtn(page).click();

      await test.step('Add Color filter and fill value outside from addFilter component', async () => {
        const cigaretteChartElement = page.locator(`div[data-ui-name="Cigarette.Bar"][aria-label="Colors"] path[color="blue-300"]`);
        await cigaretteChartElement.click();
        await expect(locators.addFilterBtn(page)).not.toBeVisible();
        await expect(locators.clearAllBtn(page)).toBeVisible();
        await expect(locators.selectTriggerFilled(page, 'Color')).toHaveText('Color: Yellow');
        await locators.clearAllBtn(page).click();
        await expect(locators.addFilterBtn(page)).toBeVisible();
        await expect(locators.clearAllBtn(page)).not.toBeVisible();
      });
    });
  });
});
