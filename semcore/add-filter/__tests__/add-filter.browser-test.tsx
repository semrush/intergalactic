import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import type { Page, Locator } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';

const getLocators = (page: Page) => ({
  addFilterBtn: page.getByRole('button', { name: 'Add filter' }),
  clearAllBtn: page.getByRole('button', { name: 'Clear filters' }),
  addFilterMenuItem: (name: string): Locator => page.getByRole('menuitem', { name }),
  selectOptions: (name: string): Locator => page.getByRole('option', { name }),
  filterDialog: page.getByRole('dialog'),
  addFilterSelectTrigger: (placeholder: string): Locator =>
    page.locator(
      `div[data-ui-name="AddFilterSelect.Trigger"][placeholder="${placeholder}"] button[aria-expanded="true"]`,
    ),

  input: page.locator('[data-ui-name="Input.Value"][placeholder="Filter by name"]'),
  addFilterInput: (text: string): Locator => page.getByPlaceholder(text),

  addFilterSelectTriggerFilled: (placeholder: string): Locator =>
    page.locator(`div[data-ui-name="FilterTrigger.Text"][placeholder="${placeholder}"]`),

  addFilterDropdownTrigger: (placeholder: string): Locator =>
    page.locator(`div[data-ui-name="AddFilterDropdown.Trigger"][placeholder="${placeholder}"]`),

  clearInput: page.locator('[data-ui-name="AddFilterInput.Clear"]'),
  clearSelectButtons: page.locator('[data-ui-name="FilterTrigger.ClearButton"]'),
});

test.describe('Visual', () => {
  test('Verify base example with selects mouse interactions', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify initial state', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify filter list expanded by click on Add filter', async () => {
      await locators.addFilterBtn.click();

      await locators.addFilterMenuItem('Color').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await locators.addFilterMenuItem('Color').click();
      await locators.addFilterMenuItem('Color').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify base example with selects keyboard interactions', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify filter list expanded by click on Add filter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Color').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Color').waitFor({ state: 'hidden' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify visual without Add filter button', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Add Select filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Device').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Device').click();
      await locators.selectOptions('Phone').waitFor({ state: 'visible' });
      await locators.selectOptions('Phone').click();
    });

    await test.step('Add Input filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Position').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Position').click();
      await locators.addFilterInput('Filter by position').fill('Test');
    });

    await test.step('Add DD filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Keywords').click();
      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.getByRole('button', { name: 'Apply' }).click();
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Clear all by keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    await locators.input.fill('Test');

    for (let i = 0; i < 7; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }
    await expect(page).toHaveScreenshot();
  });

  test('Verify Select with range as filter - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('Range').click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Select with search as filter - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    const selectInputSearch = page.locator('[data-ui-name="AddFilterSelect.InputSearch"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);

    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await locators.selectOptions('Banana').waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();
    await selectInputSearch.fill('Banana');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.selectOptions('Banana').waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Input as filter - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterInput('Filter by name').fill('Test');
    await locators.addFilterInput('Filter by fullname').fill('Test');
    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Position').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('Position').click();
    await locators.addFilterInput('Filter by position').fill('Test');
    await locators.clearInput.hover();
    await expect(page).toHaveScreenshot();
  });
  test('Verify Multiselect as filter - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);

    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional - Add filter button', () => {
  test('Verify cancel adding filter data when no data selected by mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify filter list exapnded by click on Add filter', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Color').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Color').click();
      await expect(locators.addFilterSelectTrigger('Color')).toBeFocused();
    });

    await test.step('Verify filter hidden and filters list exapnded when cliking on Add filter', async () => {
      await locators.addFilterBtn.click();
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterMenuItem('Color')).toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Verify filter removes and filters list remain hidden when clicking outside', async () => {
      await locators.addFilterMenuItem('Color').click();
      await page.mouse.click(0, 0);
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterMenuItem('Color')).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Verify filter removed and filters list hidden via filter trigger click', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Color').click();
      await locators.addFilterSelectTrigger('Color').click();
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterMenuItem('Color')).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });
  });

  test('Verify cancel adding filter data when no data selected by keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify focus for filters list and filter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Color').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Color')).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(locators.addFilterSelectTrigger('Color')).toBeFocused();
    });

    await test.step('Verify filter hidden, filters list not expanded and Add filter focused by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterMenuItem('Color')).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeFocused();
    });
  });

  test('Verify Add filter button appearing and disappearing by mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Add Select filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Device').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Device').click();
      await locators.selectOptions('Phone').waitFor({ state: 'visible' });
      await locators.selectOptions('Phone').click();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Add Input filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Position').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Device')).not.toBeVisible();
      await locators.addFilterMenuItem('Position').click();
      await locators.addFilterInput('Filter by position').fill('Test');
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Add DD filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Position')).not.toBeVisible();
      await locators.addFilterMenuItem('Keywords').click();
      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.getByRole('button', { name: 'Apply' }).click();
    });

    await test.step('Verify that Add filter removed when all filters from the list added', async () => {
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).not.toBeVisible();
    });

    await test.step('Verify Add filters appears when Select filter removed', async () => {
      await locators.clearSelectButtons.first().click();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Verify Add filters appears when Input filter removed ', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Device').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Device').click();
      await locators.selectOptions('Phone').waitFor({ state: 'visible' });
      await locators.selectOptions('Phone').click();
      await locators.clearInput.click();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Vefity Add filters appear when clicking on Clear filters', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Position').waitFor({ state: 'visible' });
      await locators.addFilterMenuItem('Position').click();
      await locators.addFilterInput('Filter by position').fill('Test');
      await locators.clearAllBtn.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });
  });

  test('Verify Add filter button appearing and disappearing by keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
    }
    await test.step('Clear all button appear when select item is added', async () => {
      await expect(locators.addFilterBtn).toBeFocused();
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'hidden' });
      await locators.selectOptions('Desktop').waitFor({ state: 'visible' });
      await expect(locators.clearAllBtn).not.toBeVisible();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.selectOptions('Desktop').waitFor({ state: 'hidden' });
      await expect(locators.clearAllBtn).toBeVisible();
    });

    await test.step('Add Input filter and fill value', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.addFilterBtn).toBeFocused();
      await page.keyboard.press('Space');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);
      await expect(locators.addFilterMenuItem('Device')).not.toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'hidden' });
      await locators.addFilterInput('Filter by position').fill('Test');
    });

    await test.step('Add DD filter and fill value', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);
      await expect(locators.addFilterMenuItem('Device')).not.toBeVisible();
      await expect(locators.addFilterMenuItem('Position')).not.toBeVisible();

      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'hidden' });
      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.filterDialog.waitFor({ state: 'hidden' });
    });

    await test.step('Verofy Add filter removed when all filters added', async () => {
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).not.toBeVisible();
    });

    await test.step('Verify Add filter appears and focused when Input flter removed', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeFocused();
    });

    await test.step('Verify Add filter appears and focused when Select flter removed', async () => {
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);

      await page.keyboard.press('Enter');
      await locators.filterDialog.waitFor({ state: 'visible' });

      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.filterDialog.waitFor({ state: 'hidden' });

      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).not.toBeFocused();
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
      await locators.addFilterMenuItem('Position').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Position')).toHaveClass(/highlighted/);
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Position').waitFor({ state: 'hidden' });
      await locators.addFilterInput('Filter by position').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeFocused();
    });
  });
});

test.describe('Functional - Clear Filters button', () => {
  test('Verify Clear all when some filters pre filled and added by mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify Clear filters button shown and removed when interacting with filters before Add filter', async () => {
      await expect(locators.clearAllBtn).not.toBeVisible();
      await locators.input.fill('Test');
      await expect(locators.clearAllBtn).toBeVisible();
      const clearButton = page.locator('button[data-ui-name="ButtonLink"][aria-label="Clear"]');
      await clearButton.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify Clear filters button shown and removed when interacting with filters list', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Device').click();
      await locators.selectOptions('Phone').click();
      await expect(locators.clearAllBtn).toBeVisible();
      await locators.clearSelectButtons.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify Clear filters disappears and removes all added filters', async () => {
      await locators.input.fill('Test');
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Device').click();
      await locators.selectOptions('Phone').click();
      await expect(locators.clearAllBtn).toBeVisible();
      await locators.clearAllBtn.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
      await expect(locators.addFilterSelectTriggerFilled('Device')).not.toBeVisible();
      await expect(locators.input).not.toHaveText('Test');
    });
  });

  test('Verify Clear all when some filters pre filled and added by keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify Clear filters button shown and removed when interacting with filters before Add filter', async () => {
      await locators.input.fill('Test');
      await expect(locators.clearAllBtn).toBeVisible();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify Clear filters button shown and removed when interacting with filters list', async () => {
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
      }
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'hidden' });
      await locators.selectOptions('Desktop').waitFor({ state: 'visible' });

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.selectOptions('Desktop').waitFor({ state: 'hidden' });

      await expect(locators.addFilterSelectTriggerFilled('Device')).toBeVisible();
      await expect(
        page.locator('[data-ui-name="FilterTrigger.TriggerButton"][placeholder="Device"]'),
      ).toBeFocused();
      await expect(locators.clearAllBtn).toBeVisible();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify all filters removed and Clear filters button hidden when pressing Clear filters', async () => {
      await locators.input.fill('Test');
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
      }
      await page.keyboard.press('Enter');
      await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
      await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.selectOptions('Desktop').waitFor({ state: 'visible' });

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.selectOptions('Desktop').waitFor({ state: 'hidden' });

      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
      }
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).not.toBeVisible();
      await expect(locators.addFilterSelectTriggerFilled('Device')).not.toBeVisible();
      await expect(locators.input).not.toHaveText('Test');
    });
  });
});

test.describe('Functional - Different types of filters', () => {
  test('Verify drodown as filter - keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);

    await page.keyboard.press('Enter');
    await locators.filterDialog.waitFor({ state: 'visible' });
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterDropdownTrigger('Exclude keywords')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Keywords')).toHaveClass(/highlighted/);
    await page.keyboard.press('Enter');
    await locators.filterDialog.waitFor({ state: 'visible' });

    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.filterDialog.waitFor({ state: 'hidden' });

    await expect(
      page.locator('[data-ui-name="FilterTrigger.Text"][placeholder="Exclude keywords"]'),
    ).toHaveText('Exclude: 1 keywords');
    await expect(locators.clearAllBtn).toBeVisible();
    await expect(locators.addFilterBtn).not.toBeFocused();
  });

  test('Verify drodown as filter - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });

    await locators.addFilterMenuItem('Keywords').click();
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    const applyButton = page.locator('span[data-ui-name="Button.Text"]:has-text("Apply")');
    await locators.addFilterDropdownTrigger('Exclude keywords').click();
    await expect(locators.addFilterDropdownTrigger('Exclude keywords')).not.toBeVisible();

    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Keywords').waitFor({ state: 'visible' });

    await locators.addFilterMenuItem('Keywords').click();
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    await applyButton.click();
    await expect(
      page.locator('[data-ui-name="FilterTrigger.Text"][placeholder="Exclude keywords"]'),
    ).toHaveText('Exclude: 1 keywords');
    await expect(locators.clearAllBtn).toBeVisible();
  });

  test('Verify Select with range as filter - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });

    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Range')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await locators.selectOptions('100,001+').waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await locators.selectOptions('100,001+').waitFor({ state: 'hidden' });
    await expect(locators.addFilterSelectTrigger('Range')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await locators.selectOptions('100,001+').waitFor({ state: 'visible' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1-5');
  });

  test('Verify Select with range as filter - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('Range').click();
    await page.locator('[data-ui-name="AddFilterSelect.Option"][value="10,001-100,000"]').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
      'Volume: 10,001-100,000',
    );

    await locators.clearSelectButtons.click();
    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').click();

    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="From"]').fill('1');
    await page.locator('[data-ui-name="Button.Text"]:has-text("Apply")').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1+');

    await locators.clearSelectButtons.click();
    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('Range').click();
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="From"]').fill('1');
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
    await page.locator('[data-ui-name="Button.Text"]:has-text("Apply")').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1-5');
  });

  test('Verify Select with search as filter - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });

    const selectInputSearch = page.locator('[data-ui-name="AddFilterSelect.InputSearch"]');
    await selectInputSearch.fill('abc');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Select a fruit')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });

    await selectInputSearch.fill('Banana');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.selectOptions('Banana').waitFor({ state: 'hidden' });
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Fruit: Banana');
    await expect(page.locator('[data-ui-name="FilterTrigger.TriggerButton"]')).toBeFocused();
  });

  test('Verify Select with search as filter - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('Select with search').click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    const selectInputSearch = page.locator('[data-ui-name="AddFilterSelect.InputSearch"]');
    await selectInputSearch.fill('abc');
    await locators.addFilterSelectTrigger('Select a fruit').click();
    await expect(locators.addFilterSelectTrigger('Select a fruit')).not.toBeVisible();

    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('Select with search').click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await selectInputSearch.fill('Banana');
    await page.locator('[data-ui-name="AddFilterSelect.Option"]:has-text("Banana")').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Fruit: Banana');
  });

  test('Verify Multiselect as filter - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Range')).toHaveClass(/highlighted/);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Range').waitFor({ state: 'hidden' });
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.locator('[data-ui-name="AddFilterSelect.Trigger"]').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
      'Multiselect: 0, 1',
    );
  });

  test('Verify Multiselect as filter - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterMenuItem('Range').waitFor({ state: 'visible' });
    await locators.addFilterMenuItem('MultiSelect').click();
    await page.getByText('Awesome option 0').click();
    await page.getByText('Awesome option 2').click();
    await page.locator('[data-ui-name="AddFilterSelect.Trigger"]').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
      'Multiselect: 0, 2',
    );
  });

  test('Verify Input as filter - keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    await page.keyboard.press('Tab');
    await locators.addFilterInput('Filter by name').fill('Test');
    await expect(locators.clearAllBtn).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await locators.addFilterInput('Filter by fullname').fill('Test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.keyboard.press('Enter');
    await locators.addFilterMenuItem('Position').waitFor({ state: 'visible' });
    await expect(locators.addFilterMenuItem('Keyword')).toHaveClass(/highlighted/);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await locators.addFilterInput('Filter by position').fill('Test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(locators.addFilterBtn).toBeFocused();
  });
});

test.describe('Functional - Controlled mode', () => {
  test('Verify add filter by visibleFilters prop', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/controlled_add_filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Add Color filter and fill value from addFilter button', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterMenuItem('Color').click();
      await locators.selectOptions('Blue').click();
      await expect(locators.addFilterBtn).not.toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterSelectTriggerFilled('Color')).toHaveText('Color: Blue');
    });

    await locators.clearAllBtn.click();

    await test.step('Add Color filter and fill value outside from addFilter component', async () => {
      const cigaretteChartElement = page.locator(`div[data-ui-name="Cigarette.Bar"][aria-label="Colors"] path[color="blue-300"]`);
      await cigaretteChartElement.click();
      await expect(locators.addFilterBtn).not.toBeVisible();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterSelectTriggerFilled('Color')).toHaveText('Color: Yellow');
      await locators.clearAllBtn.click();
      await expect(locators.addFilterBtn).toBeVisible();
      await expect(locators.clearAllBtn).not.toBeVisible();
    });
  });
});
