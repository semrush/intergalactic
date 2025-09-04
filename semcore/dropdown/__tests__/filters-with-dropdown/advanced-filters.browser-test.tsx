import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify advanced filters visual', async ({ page }) => {
    const standPath = 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const popper = page.getByRole('dialog');
    const removeBtn = page.getByRole('button', { name: 'Remove condition' });
    const addCondBtn = page.getByRole('button', { name: 'Add condition' });
    const apply = page.getByRole('button', { name: 'Apply' });

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await popper.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('a');
    await removeBtn.waitFor({ state: 'visible' });
    await page.keyboard.press('Tab');
    await page.getByText('Remove condition').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await addCondBtn.click();
    await addCondBtn.click();
    await addCondBtn.click();

    await expect(page).toHaveScreenshot();
    await apply.click();
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const trigger = page.getByRole('combobox').first();

    const popper = page.getByRole('dialog');
    const removeBtn = page.getByRole('button', { name: 'Remove condition' });
    const addCondBtn = page.getByRole('button', { name: 'Add condition' });
    const apply = page.getByRole('button', { name: 'Apply' });
    const clear = page.getByRole('button', { name: 'Clear all' });
    const filterTriggerButton = page.getByRole('button', { name: 'Clear advanced filters' });
    const conditionLegend = page.locator('legend');
    const counter = trigger.locator('span[data-ui-name="FilterTrigger.Counter"]');

    await test.step('Verify 1st focusable item focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });
      await expect(conditionLegend).toHaveCount(1);
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
      await removeBtn.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.getByText('Remove condition').waitFor({ state: 'visible' });
      await expect(removeBtn).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(page.getByText('Remove condition')).toHaveCount(0);
    });

    await test.step('Verify focus navigation inside Dropdown', async () => {
      await page.keyboard.press('Tab');
      await expect(addCondBtn).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(apply).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(clear).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(clear).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(apply).toBeFocused();
    });

    await test.step('Verify counter in trigger appears when item added', async () => {
      await page.keyboard.press('Space');
      await popper.waitFor({ state: 'hidden' });

      await expect(trigger).toBeFocused();

      await expect(counter).toHaveText('1 applied');
    });
    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(filterTriggerButton).toBeFocused();
      await page.getByText('Clear advanced filters').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.getByText('Clear advanced filters').waitFor({ state: 'hidden' });
      // await expect(page.getByText('Clear')).not.toBeVisible();
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify focus when last item removed', async () => {
      await page.keyboard.press('Space');
      await popper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await expect(addCondBtn).not.toBeFocused();
      await expect(clear).toBeHidden();

      await page.keyboard.press('Tab');
      await expect(page.getByLabel('Rule')).toBeFocused();
    });
    await test.step('Verify counter not changed when Escape pressed', async () => {
      await page.keyboard.press('Escape');
      await popper.waitFor({ state: 'hidden' });
      await expect(counter).toHaveText('1 applied');
    });

    await test.step('Verify counter removed when last item removed and Apply pressed', async () => {
      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'visible' });
      await expect(clear).not.toBeHidden();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Space');
      await expect(clear).toBeHidden();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(apply).toBeFocused();
      await page.keyboard.press('Space');
      await popper.waitFor({ state: 'hidden' });

      await expect(counter).not.toBeVisible();
    });
    await test.step('Verify counter removed when Clear All pressed', async () => {
      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'visible' });
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

      await expect(conditionLegend).toHaveCount(2);
      await expect(removeBtn).toHaveCount(2);
      await page.keyboard.press('Space');

      await page.keyboard.press('Tab');
      await expect(apply).toBeFocused();
      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'hidden' });

      await page.keyboard.press('Space');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Shift+Tab');
      await expect(clear).toBeFocused();
      await page.keyboard.press('Space');
      await expect(apply).toBeFocused();
      await page.keyboard.press('Space');
      await expect(counter).not.toBeVisible();
    });
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/advanced-filters/docs/examples/filters-with-filter-conditions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const trigger = page.getByRole('combobox').first();

    const popper = page.getByRole('dialog');
    const removeBtn = page.getByRole('button', { name: 'Remove condition' });
    const addCondBtn = page.getByRole('button', { name: 'Add condition' });
    const apply = page.getByRole('button', { name: 'Apply' });
    const clear = page.getByRole('button', { name: 'Clear all' });
    const filterTriggerButton = page.getByRole('button', { name: 'Clear advanced filters' });
    const conditionLegend = page.locator('legend');
    const counter = trigger.locator('span[data-ui-name="FilterTrigger.Counter"]');
    const input = page.locator('[data-ui-name="Input.Value"]');

    await test.step('Verify no remove and clear all bths when dropdown just opened', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await expect(conditionLegend).toHaveCount(1);
      await expect(removeBtn).toHaveCount(0);
      await expect(clear).toHaveCount(0);
    });

    await test.step('Verify Remove button for the row shown and hint shown on hover', async () => {
      await page.getByText('Containing').click();
      await page.getByText('Not containing').waitFor({ state: 'visible' });
      await page.getByRole('option').nth(1).click();
      await page.getByRole('option').nth(1).waitFor({ state: 'hidden' });
      await input.fill('a');
      await removeBtn.waitFor({ state: 'visible' });
      await removeBtn.hover(); ;
      await page.getByText('Remove condition').waitFor({ state: 'visible' });
      await expect(removeBtn).toHaveCount(1);
    });

    await test.step('Verify counter in trigger appears when item added', async () => {
      await apply.click();
      await popper.waitFor({ state: 'hidden' });
      await expect(counter).toHaveText('1 applied');
    });

    await test.step('Verify hint on hover close button ', async () => {
      await page.getByLabel('Clear advanced filters').hover();
      await page.getByText('Clear advanced filters').waitFor({ state: 'visible' });
      // await page.keyboard.press('Escape');
      // await expect(page.getByText('Clear')).not.toBeVisible();
      await expect(page.getByText('Clear advanced filters')).toHaveCount(1);
    });

    await test.step('Verify Adding multiple items', async () => {
      await trigger.click();
      await popper.waitFor({ state: 'visible' });

      await addCondBtn.click();
      await addCondBtn.click();
      await addCondBtn.click();
      await input.nth(1).fill('b');
      await input.nth(2).fill('c');
      await input.nth(3).fill('d');

      await apply.click();
      await expect(counter).toHaveText('4 applied');
    });

    await test.step('Verify items doesnt add when add new and click on trigger', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await addCondBtn.click();
      await input.nth(4).fill('e');
      await trigger.click();
      await apply.waitFor({ state: 'hidden' });
      await expect(counter).toHaveText('4 applied');
    });

    await test.step('Verify Removing one item', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await page.getByLabel('Remove condition').nth(2).click();
      await apply.click();
      await apply.waitFor({ state: 'hidden' });
      await expect(counter).toHaveText('3 applied');
    });

    await test.step('Verify Clear all removes all items', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await clear.click();
      await expect(counter).toHaveText('3 applied');
      await apply.click();
      await apply.waitFor({ state: 'hidden' });
      await expect(counter).not.toBeVisible();
    });
  });
});
