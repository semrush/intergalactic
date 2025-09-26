import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';

const getLocators = (page: Page) => ({
  trigger: page.getByRole('combobox').first(),
  popper: page.getByRole('dialog'),
  removeBtn: page.getByRole('button', { name: 'Remove condition' }),
  addCondBtn: page.getByRole('button', { name: 'Add condition' }),
  apply: page.getByRole('button', { name: 'Apply' }),
  clear: page.getByRole('button', { name: 'Clear all' }),
  filterTriggerButton: page.getByRole('button', { name: 'Clear advanced filters' }),
  conditionLegend: page.locator('legend'),
  counter: page.getByRole('combobox').first().locator('span[data-ui-name="FilterTrigger.Counter"]'),
  input: page.locator('[data-ui-name="Input.Value"]'),
});

test.describe('Visual', () => {
  test('Verify advanced filters visual', async ({ page }) => {
    const standPath = 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('a');
    await locators.removeBtn.waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.getByText('Remove condition').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await locators.addCondBtn.click();
    await locators.addCondBtn.click();
    await locators.addCondBtn.click();

    await expect(page).toHaveScreenshot();
    await locators.apply.click();
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const locators = getLocators(page);

    await test.step('Verify 1st focusable item focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.apply.waitFor({ state: 'visible' });
      await expect(locators.conditionLegend).toHaveCount(1);
      await expect(page.getByLabel('Rule')).toBeFocused();
    });

    await test.step('Verify Remove button for the row shown and can be focused when something added to the input', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.getByText('Not containing').waitFor({ state: 'visible' });
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await page.getByRole('option').nth(1).waitFor({ state: 'hidden' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('a');
      await locators.removeBtn.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.getByText('Remove condition').waitFor({ state: 'visible' });
      await expect(locators.removeBtn).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(page.getByText('Remove condition')).toHaveCount(0);
    });

    await test.step('Verify focus navigation inside Dropdown', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.addCondBtn).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.apply).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.clear).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.clear).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(locators.apply).toBeFocused();
    });

    await test.step('Verify counter in trigger appears when item added', async () => {
      await page.keyboard.press('Space');
      await locators.popper.waitFor({ state: 'hidden' });

      await expect(locators.trigger).toBeFocused();

      await expect(locators.counter).toHaveText('1 applied');
    });
    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.filterTriggerButton).toBeFocused();
      await page.getByText('Clear advanced filters').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.getByText('Clear advanced filters').waitFor({ state: 'hidden' });
      // await expect(page.getByText('Clear')).not.toBeVisible();
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify focus when last item removed', async () => {
      await page.keyboard.press('Space');
      await locators.popper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await expect(locators.addCondBtn).not.toBeFocused();
      await expect(locators.clear).toBeHidden();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();
    });
    await test.step('Verify counter not changed when Escape pressed', async () => {
      await page.keyboard.press('Escape');
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.counter).toHaveText('1 applied');
    });

    await test.step('Verify counter removed when last item removed and Apply pressed', async () => {
      await page.keyboard.press('Space');
      await locators.apply.waitFor({ state: 'visible' });
      await expect(locators.clear).not.toBeHidden();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Space');
      await expect(locators.clear).toBeHidden();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(locators.apply).toBeFocused();
      await page.keyboard.press('Space');
      await locators.popper.waitFor({ state: 'hidden' });

      await expect(locators.counter).not.toBeVisible();
    });
    await test.step('Verify counter removed when Clear All pressed', async () => {
      await page.keyboard.press('Space');
      await locators.apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('a');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('b');
      await page.keyboard.press('Tab');

      await expect(locators.conditionLegend).toHaveCount(2);
      await expect(locators.removeBtn).toHaveCount(2);
      await page.keyboard.press('Space');

      await page.keyboard.press('Tab');
      await expect(locators.apply).toBeFocused();
      await page.keyboard.press('Space');
      await locators.apply.waitFor({ state: 'hidden' });

      await page.keyboard.press('Space');
      await locators.apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Shift+Tab');
      await expect(locators.clear).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.apply).toBeFocused();
      await page.keyboard.press('Space');
      await expect(locators.counter).not.toBeVisible();
    });
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const locators = getLocators(page);

    await test.step('Verify no remove and clear all bths when dropdown just opened', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await expect(locators.conditionLegend).toHaveCount(1);
      await expect(locators.removeBtn).toHaveCount(0);
      await expect(locators.clear).toHaveCount(0);
    });

    await test.step('Verify Remove button for the row shown and hint shown on hover', async () => {
      await page.getByText('Containing').click();
      await page.getByText('Not containing').waitFor({ state: 'visible' });
      await page.getByRole('option').nth(1).click();
      await page.getByRole('option').nth(1).waitFor({ state: 'hidden' });
      await locators.input.fill('a');
      await locators.removeBtn.waitFor({ state: 'visible' });
      await locators.removeBtn.hover(); ;
      await page.getByText('Remove condition').waitFor({ state: 'visible' });
      await expect(locators.removeBtn).toHaveCount(1);
    });

    await test.step('Verify counter in trigger appears when item added', async () => {
      await locators.apply.click();
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.counter).toHaveText('1 applied');
    });

    await test.step('Verify hint on hover close button ', async () => {
      await page.getByLabel('Clear advanced filters').hover();
      await page.getByText('Clear advanced filters').waitFor({ state: 'visible' });
      // await page.keyboard.press('Escape');
      // await expect(page.getByText('Clear')).not.toBeVisible();
      await expect(page.getByText('Clear advanced filters')).toHaveCount(1);
    });

    await test.step('Verify Adding multiple items', async () => {
      await locators.trigger.click();
      await locators.popper.waitFor({ state: 'visible' });

      await locators.addCondBtn.click();
      await locators.addCondBtn.click();
      await locators.addCondBtn.click();
      await locators.input.nth(1).fill('b');
      await locators.input.nth(2).fill('c');
      await locators.input.nth(3).fill('d');

      await locators.apply.click();
      await expect(locators.counter).toHaveText('4 applied');
    });

    await test.step('Verify items doesnt add when add new and click on trigger', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await locators.addCondBtn.click();
      await locators.input.nth(4).fill('e');
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'hidden' });
      await expect(locators.counter).toHaveText('4 applied');
    });

    await test.step('Verify Removing one item', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await page.getByLabel('Remove condition').nth(2).click();
      await locators.apply.click();
      await locators.apply.waitFor({ state: 'hidden' });
      await expect(locators.counter).toHaveText('3 applied');
    });

    await test.step('Verify Clear all removes all items', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await locators.clear.click();
      await expect(locators.counter).toHaveText('3 applied');
      await locators.apply.click();
      await locators.apply.waitFor({ state: 'hidden' });
      await expect(locators.counter).not.toBeVisible();
    });
  });
});
