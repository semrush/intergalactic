import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import type { Page } from '@semcore/testing-utils/playwright';
import { expect, test } from '@semcore/testing-utils/playwright';

const getLocators = (page: Page) => ({
  trigger: page.getByRole('combobox'),
  popper: page.getByRole('dialog'),
  textbox: page.getByRole('textbox'),
  apply: page.getByRole('button', { name: 'Apply' }),
  clear: page.getByRole('button', { name: 'Clear all' }),
  filterTriggerClear: page.getByRole('button', { name: 'Clear' }),
  checkbox: page.getByRole('radio'),
  triggerText: page.locator('[data-ui-name="FilterTrigger.TriggerButton"]'),
  input: page.locator('[data-ui-name="Input.Value"]'),
});

test.describe('Visual', () => {
  test('Verify Filters include exclude visual', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    if (browserName !== 'chromium') return; // the focus on radio works unstable so skipped for firefox and webkit
    const locators = getLocators(page);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await locators.popper.waitFor({ state: 'visible' });

    await expect(page).toHaveScreenshot();

    await locators.textbox.fill('test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await locators.popper.waitFor({ state: 'hidden' });

    await page.keyboard.press('Tab');
    await page.getByText('Clear').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interactios', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    if (browserName !== 'chromium') return; // because incorrect initial focus on webkit and ff(known issue)

    const locators = getLocators(page);

    await test.step('Verify textbox focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.apply.waitFor({ state: 'visible' });
      await expect(locators.textbox).toBeFocused();
    });

    await test.step('Verify keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.apply).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.clear).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(locators.checkbox.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(locators.textbox).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('ArrowRight');
      await expect(locators.checkbox.nth(1)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');

      await expect(locators.apply).toBeFocused();
    });

    await test.step('Verify counter in trigger not added when textbox filled and ESC pressed', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.type('test');
      await page.keyboard.press('Escape');
      await locators.popper.waitFor({ state: 'hidden' });

      await expect(locators.trigger).toBeFocused();

      await expect(locators.triggerText).toContainText('Include keywords');
    });

    await test.step('Verify counter in trigger  added when textbox filled and Apply pressed', async () => {
      await page.keyboard.press('Enter');
      await locators.apply.waitFor({ state: 'visible' });
      await page.keyboard.type('test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await locators.popper.waitFor({ state: 'hidden' });

      await expect(locators.trigger).toBeFocused();

      await expect(locators.triggerText).toHaveText('Include: 1 keyword');
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(locators.filterTriggerClear).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      // await page.keyboard.press('Escape');
      // await page.getByText('Clear').waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify Clear all clears textbox', async () => {
      await page.keyboard.press('Space');
      await locators.popper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await expect(locators.triggerText).toHaveText('Include: 1 keyword');
      await expect(locators.popper).toBeVisible();
    });

    await test.step('Verify trigger clears when pressing apply', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');

      await locators.popper.waitFor({ state: 'hidden' });
      await expect(locators.triggerText).toHaveText('Include keywords');
    });
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const locators = getLocators(page);

    await test.step('Verify trigger text not updated when entering text in textbox', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await locators.textbox.fill('text, text, text');
      await expect(locators.triggerText).toHaveText('Include keywords');
    });

    await test.step('Verify trigger text not updated when pressing trigger', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'hidden' });
      await expect(locators.triggerText).toHaveText('Include keywords');
      await expect(locators.filterTriggerClear).not.toBeVisible();
    });

    await test.step('Verify trigger text updated when pressing apply', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await locators.textbox.fill('text, text, text');
      await locators.apply.click();
      await locators.apply.waitFor({ state: 'hidden' });
      await expect(locators.triggerText).toHaveText('Include: 3 keywords');
      await expect(locators.filterTriggerClear).toBeVisible();
    });

    await test.step('Verify Hint on hover Clear', async () => {
      await locators.filterTriggerClear.hover();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await expect(page.getByText('Clear')).toHaveCount(1);
    });

    await test.step('Verify counter not updated after pressing Clear all', async () => {
      await locators.trigger.click();
      await locators.apply.waitFor({ state: 'visible' });
      await locators.clear.click();
      await expect(locators.popper).toBeVisible();
      await expect(locators.triggerText).toHaveText('Include: 3 keywords');
    });

    await test.step('Verify counter updated after pressing Apply', async () => {
      await locators.apply.click();
      await locators.apply.waitFor({ state: 'hidden' });
      await expect(locators.triggerText).toHaveText('Include keywords');
      await expect(locators.filterTriggerClear).not.toBeVisible();
    });
  });
});
