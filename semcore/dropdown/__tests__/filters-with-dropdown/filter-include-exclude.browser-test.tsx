import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Filters include exclude visual', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const popper = page.getByRole('dialog');
    const textbox = page.getByRole('textbox');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await popper.waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();

    await textbox.fill('test');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await popper.waitFor({ state: 'hidden' });

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
    const trigger = page.getByRole('combobox').first();

    const popper = page.getByRole('dialog');
    const textbox = page.getByRole('textbox');
    const apply = page.getByRole('button', { name: 'Apply' });
    const clear = page.getByRole('button', { name: 'Clear all' });
    const checkbox = page.getByRole('radio');
    const filterTriggerClear = page.getByRole('button', { name: 'Clear' });
    const triggerText = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');

    await test.step('Verify textbox focused when dropdown opened', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });
      await expect(textbox).toBeFocused();
    });

    await test.step('Verify keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(apply).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(clear).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(checkbox.first()).toBeFocused();
      await page.keyboard.press('Tab');
      await expect(textbox).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('ArrowRight');
      await expect(checkbox.nth(1)).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');

      await expect(apply).toBeFocused();
    });

    await test.step('Verify counter in trigger not added when textbox filled and ESC pressed', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.type('test');
      await page.keyboard.press('Escape');
      await popper.waitFor({ state: 'hidden' });

      await expect(trigger).toBeFocused();

      await expect(triggerText).toContainText('Include keywords');
    });

    await test.step('Verify counter in trigger  added when textbox filled and Apply pressed', async () => {
      await page.keyboard.press('Enter');
      await apply.waitFor({ state: 'visible' });
      await page.keyboard.type('test');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'hidden' });

      await expect(trigger).toBeFocused();

      await expect(triggerText).toHaveText('Include: 1 keyword');
    });

    await test.step('Verify hint on close button and trigger keyboard navigation', async () => {
      await page.keyboard.press('Tab');
      await expect(filterTriggerClear).toBeFocused();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      // await page.keyboard.press('Escape');
      // await page.getByText('Clear').waitFor({ state: 'hidden' });
      await page.keyboard.press('Shift+Tab');
    });

    await test.step('Verify Clear all clears textbox', async () => {
      await page.keyboard.press('Space');
      await popper.waitFor({ state: 'visible' });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Enter');
      await expect(triggerText).toHaveText('Include: 1 keyword');
      await expect(popper).toBeVisible();
    });

    await test.step('Verify trigger clears when pressing apply', async () => {
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Enter');

      await popper.waitFor({ state: 'hidden' });
      await expect(triggerText).toHaveText('Include keywords');
    });
  });

  test('Verify mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/patterns/filters/filter-include-exclude/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const trigger = page.getByRole('combobox');
    const popper = page.getByRole('dialog');
    const textbox = page.getByRole('textbox');
    const apply = page.getByRole('button', { name: 'Apply' });
    const clear = page.getByRole('button', { name: 'Clear all' });
    const filterTriggerClear = page.getByRole('button', { name: 'Clear' });
    const triggerText = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');

    await test.step('Verify trigger text not updated when entering text in textbox', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await textbox.fill('text, text, text');
      await expect(triggerText).toHaveText('Include keywords');
    });

    await test.step('Verify trigger text not updated when pressing trigger', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'hidden' });
      await expect(triggerText).toHaveText('Include keywords');
      await expect(filterTriggerClear).not.toBeVisible();
    });

    await test.step('Verify trigger text updated when pressing apply', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await textbox.fill('text, text, text');
      await apply.click();
      await apply.waitFor({ state: 'hidden' });
      await expect(triggerText).toHaveText('Include: 3 keywords');
      await expect(filterTriggerClear).toBeVisible();
    });

    await test.step('Verify Hint on hover Clear', async () => {
      await filterTriggerClear.hover();
      await page.getByText('Clear').waitFor({ state: 'visible' });
      await expect(page.getByText('Clear')).toHaveCount(1);
    });

    await test.step('Verify counter not updated after pressing Clear all', async () => {
      await trigger.click();
      await apply.waitFor({ state: 'visible' });
      await clear.click();
      await expect(popper).toBeVisible();
      await expect(triggerText).toHaveText('Include: 3 keywords');
    });

    await test.step('Verify counter updated after pressing Apply', async () => {
      await apply.click();
      await apply.waitFor({ state: 'hidden' });
      await expect(triggerText).toHaveText('Include keywords');
      await expect(filterTriggerClear).not.toBeVisible();
    });
  });
});
