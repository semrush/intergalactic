import { expect, Locator, Page, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

const getLocators = (page: Page) => ({
  addFilterBtn: page.getByRole('button', { name: 'Add filter' }),
  clearAllBtn: page.getByRole('button', { name: 'Clear filters' }),
  input: page.locator('[data-ui-name="Input.Value"][placeholder="Filter by name"]'),
  addFilterInput: (text: any) => page.getByPlaceholder(`${text}`),
  addFilterListItem: (text: any) =>
    page.locator(`div[data-ui-name="DropdownMenu.Item"]:has-text("${text}")`),
  addFilterSelectTrigger: (placeholder: any) =>
    page.locator(
      `div[data-ui-name="AddFilterSelect.Trigger"][placeholder="${placeholder}"] button[aria-expanded="true"]`,
    ),
  addFilterSelectTriggerFilled: (placeholder: any) =>
    page.locator(`div[data-ui-name="FilterTrigger.Text"][placeholder="${placeholder}"]`),
  addFilterSelectOption: (text: any) =>
    page.locator(`div[data-ui-name="AddFilterSelect.Option"]:has-text("${text}")`),
  addFilterDropdownTrigger: (placeholder: any) =>
    page.locator(`div[data-ui-name="AddFilterDropdown.Trigger"][placeholder="${placeholder}"]`),
  clearInput: page.locator('[data-ui-name="AddFilterInput.Clear"]'),
  clearSelectButtons: page.locator('[data-ui-name="FilterTrigger.ClearButton"]'),
});

test.describe('Add filter button', () => {
  test('No data selected and cancel adding filter - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify "Add filter" button visibility', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify filter list exapnded by click on Add filter', async () => {
      await locators.addFilterBtn.click();
      await expect(locators.addFilterListItem('Color')).toBeVisible();
      await expect(page).toHaveScreenshot();
      await locators.addFilterListItem('Color').click();
      await expect(locators.addFilterSelectTrigger('Color')).toBeFocused();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify filter hidden and filters list exapnded when cliking on Add filter', async () => {
      await locators.addFilterBtn.click();
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterListItem('Color')).toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Verify filter removes and filters list remain hidden when clicking outside', async () => {
      await locators.addFilterListItem('Color').click();
      const box = await page.$eval('[data-ui-name="AddFilter"]', (el: any) => {
        const rect = el.getBoundingClientRect();
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      });
      await page.mouse.click(box.x, box.y);
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterListItem('Color')).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Verify filter removed and filters list hidden via filter trigger click', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterListItem('Color').click();
      await locators.addFilterSelectTrigger('Color').click();
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterListItem('Color')).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });
  });

  test('No data selected and cancel adding filter - keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/docs/examples/add-filter-basic.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify focus for filters list and filter', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      await expect(locators.addFilterListItem('Color')).toBeFocused();
      await page.keyboard.press('Enter');

      await expect(locators.addFilterSelectTrigger('Color')).toBeFocused();
    });

    await test.step('Verify filter hidden, filters list not expanded and Add filter focused by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(locators.addFilterSelectTrigger('Color')).not.toBeVisible();
      await expect(locators.addFilterListItem('Color')).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeFocused();
    });
  });

  test('Add filter button appearing and disappearing - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Add Select filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterListItem('Device').click();
      await locators.addFilterSelectOption('Phone').click();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Add Input filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await expect(locators.addFilterListItem('Device')).not.toBeVisible();
      await locators.addFilterListItem('Position').click();
      await locators.addFilterInput('Filter by position').fill('Test');
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Add DD filter and fill value', async () => {
      await locators.addFilterBtn.click();
      await expect(locators.addFilterListItem('Position')).not.toBeVisible();
      await locators.addFilterListItem('Keywords').click();
      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      const applyButton = page.locator('span[data-ui-name="Button.Text"]:has-text("Apply")');
      await applyButton.click();
    });

    await test.step('Verify that Add filter removed when all filtersfrom the list added', async () => {
      await expect(page).toHaveScreenshot();
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
      await locators.addFilterListItem('Device').click();
      await locators.addFilterSelectOption('Phone').click();
      await locators.clearInput.click();
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });

    await test.step('Vefity Add filters appear when clicking on Clear filters', async () => {
      await locators.addFilterBtn.click();
      await locators.addFilterListItem('Position').click();
      await locators.addFilterInput('Filter by position').fill('Test');
      await locators.clearAllBtn.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
      await expect(locators.addFilterBtn).toBeVisible();
    });
  });

  test('Add filter button appearing and disappearing - keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
    }
    await expect(locators.addFilterBtn).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    //await page.waitForSelector('div[data-ui-name="DropdownMenu.Item"]:has-text("Keywords")', { timeout: 5000 });
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(200);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(locators.clearAllBtn).toBeVisible();

    await test.step('Add Input filter and fill value', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(locators.addFilterListItem('Device')).not.toBeVisible();
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await locators.addFilterInput('Filter by position').fill('Test');
    });

    await test.step('Add DD filter and fill value', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(locators.addFilterListItem('Device')).not.toBeVisible();
      await expect(locators.addFilterListItem('Position')).not.toBeVisible();
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
    });

    await test.step('Verofy Add filter removed when all filters added', async () => {
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).not.toBeVisible();
      // await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Add filter appears and focused when Input flter removed', async () => {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeFocused();
    });

    await test.step('Verify Add filter appears and focused when Select flter removed', async () => {
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
      await page.keyboard.press('Tab');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await page.keyboard.press('Shift+Tab');
      await page.waitForTimeout(100);
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
      await page.waitForTimeout(300);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      await locators.addFilterInput('Filter by position').fill('Test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await expect(locators.clearAllBtn).toBeVisible();
      await expect(locators.addFilterBtn).toBeFocused();
    });
  });
});

test.describe('Clear Filters button', () => {
  test('Clear all when some filters pre filled and added - mouse', async ({ page }) => {
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
      await locators.addFilterListItem('Device').click();
      await locators.addFilterSelectOption('Phone').click();
      await expect(locators.clearAllBtn).toBeVisible();
      await locators.clearSelectButtons.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify Clear filters disappears and removes all added filters', async () => {
      await locators.input.fill('Test');
      await locators.addFilterBtn.click();
      await locators.addFilterListItem('Device').click();
      await locators.addFilterSelectOption('Phone').click();
      await expect(locators.clearAllBtn).toBeVisible();
      await locators.clearAllBtn.click();
      await expect(locators.clearAllBtn).not.toBeVisible();
      await expect(locators.addFilterSelectTriggerFilled('Device')).not.toBeVisible();
      await expect(locators.input).not.toHaveText('Test');
    });
  });

  test('Clear all when some filters pre filled and added - keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await test.step('Verify Clear filters button shown and removed when interacting with filters before Add filter', async () => {
      await locators.input.fill('Test');
      await expect(locators.clearAllBtn).toBeVisible();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify Clear filters button shown and removed when interacting with filters list', async () => {
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
      }
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');

      await expect(locators.addFilterSelectTriggerFilled('Device')).toBeVisible();
      await expect(
        page.locator('[data-ui-name="FilterTrigger.TriggerButton"][placeholder="Device"]'),
      ).toBeFocused();
      await expect(locators.clearAllBtn).toBeVisible();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await expect(locators.clearAllBtn).not.toBeVisible();
    });

    await test.step('Verify all filters removed and Clear filters button hidden when clicking Clear filters', async () => {
      await locators.input.fill('Test');
      for (let i = 0; i < 6; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
      }
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(100);
      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(50);
      }
      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await expect(locators.clearAllBtn).not.toBeVisible();
      await expect(locators.addFilterSelectTriggerFilled('Device')).not.toBeVisible();
      await expect(locators.input).not.toHaveText('Test');
    });
  });
});

test.describe('Different types of filters', () => {
  test('Dropdown- keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    for (let i = 0; i < 6; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(50);
    }
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterDropdownTrigger('Exclude keywords')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(
      page.locator('[data-ui-name="FilterTrigger.Text"][placeholder="Exclude keywords"]'),
    ).toHaveText('Exclude: 1 keywords');
    await expect(locators.clearAllBtn).toBeVisible();
    await expect(locators.addFilterBtn).not.toBeFocused();
  });

  test('Dropdown - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);
    await locators.addFilterBtn.click();

    await locators.addFilterListItem('Keywords').click();
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    const applyButton = page.locator('span[data-ui-name="Button.Text"]:has-text("Apply")');
    await locators.addFilterDropdownTrigger('Exclude keywords').click();
    await expect(locators.addFilterDropdownTrigger('Exclude keywords')).not.toBeVisible();

    await locators.addFilterBtn.click();

    await locators.addFilterListItem('Keywords').click();
    await locators.addFilterInput('Keyword - broad match\n[Keyword] - exact match').fill('Test');
    await applyButton.click();
    await expect(
      page.locator('[data-ui-name="FilterTrigger.Text"][placeholder="Exclude keywords"]'),
    ).toHaveText('Exclude: 1 keywords');
    await expect(locators.clearAllBtn).toBeVisible();
  });

  test('Select with range - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Range')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Range')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Range')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Range')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1-5');
  });

  test('Select with range - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Range').click();
    await expect(page).toHaveScreenshot();
    await page.locator('[data-ui-name="AddFilterSelect.Option"][value="10,001-100,000"]').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
      'Volume: 10,001-100,000',
    );

    await locators.clearSelectButtons.click();
    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Range').click();

    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="From"]').fill('1');
    await page.locator('[data-ui-name="Button.Text"]:has-text("Apply")').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1+');

    await locators.clearSelectButtons.click();
    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Range').click();
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="From"]').fill('1');
    await page.locator('[data-ui-name="InputNumber.Value"][placeholder="To"]').fill('5');
    await page.locator('[data-ui-name="Button.Text"]:has-text("Apply")').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Volume: 1-5');
  });

  test('Select with search - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
    const selectInputSearch = page.locator('[data-ui-name="AddFilterSelect.InputSearch"]');
    await selectInputSearch.fill('abc');
    await page.keyboard.press('Escape');
    await expect(locators.addFilterSelectTrigger('Select a fruit')).not.toBeVisible();
    await expect(locators.addFilterBtn).toBeFocused();

    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await selectInputSearch.fill('Banana');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Fruit: Banana');
    await expect(page.locator('[data-ui-name="FilterTrigger.TriggerButton"]')).toBeFocused();
  });

  test('Select with search - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Select with search').click();
    const selectInputSearch = page.locator('[data-ui-name="AddFilterSelect.InputSearch"]');
    await selectInputSearch.fill('abc');
    await locators.addFilterSelectTrigger('Select a fruit').click();
    await expect(locators.addFilterSelectTrigger('Select a fruit')).not.toBeVisible();

    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Select with search').click();
    await selectInputSearch.fill('Banana');
    await expect(page).toHaveScreenshot();
    await page.locator('[data-ui-name="AddFilterSelect.Option"]:has-text("Banana")').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText('Fruit: Banana');
  });

  test('Multiselect - keyboard', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(100);
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await expect(page).toHaveScreenshot();
    await page.locator('[data-ui-name="AddFilterSelect.Trigger"]').click();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
      'Multiselect: 0, 1',
    );
  });

  test('Multiselect - mouse', async ({ page }) => {
    const standPath =
      'stories/patterns/filters/add-filter/advanced/examples/add-filter-complex-selects.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterBtn.click();
    await locators.addFilterListItem('MultiSelect').click();
    await expect(page).toHaveScreenshot();

    await page.getByText('Awesome option 0').click();
    await page.getByText('Awesome option 2').click();
    await page.locator('[data-ui-name="AddFilterSelect.Trigger"]').click();
    await expect(page).toHaveScreenshot();
    await expect(page.locator('[data-ui-name="FilterTrigger.Text"]')).toHaveText(
      'Multiselect: 0, 2',
    );
  });

  test('Input - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await locators.addFilterInput('Filter by name').fill('Test');
    await expect(locators.clearAllBtn).toBeVisible();
    await locators.addFilterInput('Filter by fullname').fill('Test');
    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Position').click();
    await locators.addFilterInput('Filter by position').fill('Test');
    await locators.clearInput.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Input - keyboard', async ({ page }) => {
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
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await locators.addFilterInput('Filter by position').fill('Test');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Enter');
    await expect(locators.addFilterBtn).toBeFocused();
  });

  test('Select - mouse', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.locator('[data-ui-name="ButtonTrigger.Text"]:has-text("Everywhere")').click();
    await page.locator('[data-ui-name="Select.Option"]:has-text("Option 1")').click();
    await expect(locators.clearAllBtn).toBeVisible();
    await locators.addFilterBtn.click();
    await locators.addFilterListItem('Device').click();
    await locators.addFilterSelectOption('Tablet').click();
    await locators.clearSelectButtons.hover();
    await expect(page).toHaveScreenshot();
  });

  test('Select - keyboard', async ({ page }) => {
    const standPath = 'stories/patterns/filters/add-filter/advanced/examples/add-filter.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await expect(locators.clearAllBtn).toBeVisible();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(500);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(50);
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
    await page.keyboard.press('Enter');
    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Enter');
    await expect(locators.addFilterBtn).toBeFocused();
  });
});
