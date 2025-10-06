import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Keyword Difficulty, Positions, Volume visual', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-kd-positions-volume/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const popper = page.getByRole('dialog');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await popper.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
    await page.keyboard.type('6');

    await page.keyboard.press('Tab');
    await page.keyboard.type('1');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await popper.waitFor({ state: 'hidden' });
    await expect(page).toHaveScreenshot();
  });
});

const getLocators = (page: Page) => ({
  trigger: page.getByRole('combobox', { name: 'Volume' }),
  popper: page.getByRole('dialog'),
  textboxes: page.getByRole('textbox'),
  apply: page.getByRole('button', { name: 'Apply' }),
  filterTriggerClear: page.getByRole('button', { name: 'Clear' }),
  options: page.getByRole('option'),
});

test.describe('Functional', () => {
  test('Verify keyboard interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-kd-positions-volume/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const locators = getLocators(page);

    await test.step('Verify 1st item highlighted when select opened opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.apply.waitFor({ state: 'visible' });
      await expect(locators.trigger).toBeFocused();
      await expect(locators.options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify keyboard navigation inside dialog', async () => {
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await expect(locators.options.first()).toHaveClass(/highlighted/);

      await page.keyboard.press('Tab');
      await expect(locators.textboxes.first()).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.textboxes.nth(1)).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.apply).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.options.first()).toHaveClass(/highlighted/);
    });

    await test.step('Verify Dialog closed by ESC when focus in different elements', async () => {
      await page.keyboard.press('Escape');
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await expect(locators.textboxes.first()).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toBeFocused();

      await page.keyboard.press('Enter');
      await locators.apply.waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.apply).toBeFocused();
      await page.keyboard.press('Escape');
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toBeFocused();
    });

    await test.step('Verify value applies on trigger when selecting item from select list', async () => {
      await page.keyboard.press('ArrowDown');
      await locators.apply.waitFor({ state: 'visible' });
      await page.waitForTimeout(200);
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await locators.popper.waitFor({ state: 'hidden' });

      await expect(locators.trigger).toBeFocused();
      await expect(locators.trigger).toHaveText(/Volume:\s*1,001-10,000/);
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.filterTriggerClear).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await page.keyboard.press('Escape');
      await page.getByText('Clear').waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify Case when entering min value only', async () => {
      await page.keyboard.press('Space');
      await locators.popper.waitFor({ state: 'visible' });
      await page.waitForTimeout(200);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.textboxes.nth(0)).toBeFocused();
      await page.keyboard.type('5');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toHaveText(/Volume:\s*5+/);
    });

    await test.step('Verify trigger clears when pressing Clear', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      await page.keyboard.press('Enter');
      await expect(locators.filterTriggerClear).not.toBeVisible();
    });

    await test.step('Verify Case when entering max value only', async () => {
      await page.waitForTimeout(100);
      await page.keyboard.press('Space');
      await locators.options.first().waitFor({ state: 'visible' });
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(locators.textboxes.nth(1)).toBeFocused();
      await page.keyboard.type('5');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toHaveText(/Volume:\s*1-5+/);
    });
  });

  test('Verify mouse interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-kd-positions-volume/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const locators = getLocators(page);

    await test.step('Verify dialog opened and closed by trigger click', async () => {
      await locators.trigger.click();
      await await expect(locators.popper).toBeVisible();
      await locators.trigger.click();
      await await expect(locators.popper).toBeHidden();
    });

    await test.step('Verify item from select and be selected and applies', async () => {
      await locators.trigger.click();
      await locators.popper.waitFor({ state: 'visible' });
      await locators.options.nth(2).click();
      await locators.popper.waitFor({ state: 'hidden' });

      await expect(locators.popper).toBeHidden();
      await expect(locators.trigger).toHaveText(/Volume:\s*1,001-10,000/);
      await expect(locators.filterTriggerClear).toHaveCount(1);
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await locators.filterTriggerClear.hover();
      await expect(page.getByText('Clear')).toHaveCount(1);
    });

    await test.step('Verify Case when entering min value only', async () => {
      await locators.trigger.click();
      await locators.popper.waitFor({ state: 'visible' });

      await locators.textboxes.nth(0).fill('5');
      await locators.apply.click();
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toHaveText(/Volume:\s*5+/);
    });

    await test.step('Verify trigger clears when pressing Clear', async () => {
      await locators.filterTriggerClear.click();
      await expect(locators.filterTriggerClear).not.toBeVisible();
    });
    await test.step('Verify Case when entering max value only', async () => {
      await locators.trigger.click();
      await locators.popper.waitFor({ state: 'visible' });

      await locators.textboxes.nth(1).fill('5');
      await locators.apply.click();
      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.trigger).toHaveText(/Volume:\s*1-5/);
    });
  });
});
