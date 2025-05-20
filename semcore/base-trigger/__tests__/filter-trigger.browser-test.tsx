import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { checkBackgroundColor, checkBorderColor, checkKeyboardNavigation } from './utils';

test.describe('Filter-trigger', () => {
  test.describe('Styles and a11y checks', () => {
    test('Verify main styles and props', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/filter-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const button = page.locator(
        '[data-test-id="m-size"] [data-ui-name="FilterTrigger.TriggerButton"]',
      );
      await button.hover();
      await expect(page).toHaveScreenshot();

      await test.step('Verify Active styles', async () => {
        await checkBackgroundColor(
          page,
          '[data-test-id="active"] [data-ui-name="FilterTrigger.TriggerButton"]',
          'rgba(0, 143, 248, 0.3)',
        );
        await checkBorderColor(
          page,
          '[data-test-id="active"] [data-ui-name="FilterTrigger.TriggerButton"]',
          'rgb(0, 109, 202)',
        );
        await checkBackgroundColor(
          page,
          '[data-test-id="active"] [data-ui-name="Hint.Trigger"]',
          'rgba(0, 0, 0, 0)',
        );
        await checkBorderColor(
          page,
          '[data-test-id="active"] [data-ui-name="Hint.Trigger"]',
          'rgb(0, 0, 0)',
        );
      });

      await test.step('Verify Disabled styles', async () => {
        await checkBackgroundColor(
          page,
          '[data-test-id="disabled"] [data-ui-name="FilterTrigger.TriggerButton"]',
          'rgba(0, 143, 248, 0.1)',
        );
        await checkBorderColor(
          page,
          '[data-test-id="disabled"] [data-ui-name="FilterTrigger.TriggerButton"]',
          'rgb(0, 109, 202)',
        );

        await checkBackgroundColor(
          page,
          '[data-test-id="active"] [data-ui-name="Hint.Trigger"]',
          'rgba(0, 0, 0, 0)',
        );
        await checkBorderColor(
          page,
          '[data-test-id="active"] [data-ui-name="Hint.Trigger"]',
          'rgb(0, 0, 0)',
        );
      });

      await test.step('Verify Placeholder styles', async () => {
        await checkBackgroundColor(
          page,
          '[data-test-id="placeholder"] [data-ui-name="FilterTrigger.TriggerButton"]',
          'rgb(255, 255, 255)',
        );
        await checkBorderColor(
          page,
          '[data-test-id="placeholder"] [data-ui-name="FilterTrigger.TriggerButton"]',
          'rgb(196, 199, 207)',
        );
      });
    });

    test('Verify a11y attributes', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/filter-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await test.step('Verify avtive attributes', async () => {
        const button = await page.locator('[data-test-id="active"]');
        const buttonTRigger = await button.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
        await expect(buttonTRigger).toHaveAttribute('type', 'button');
        await expect(buttonTRigger).toHaveAttribute('role', 'combobox');
        await expect(buttonTRigger).toHaveAttribute('tabindex', '0');

        const buttonText = await button.locator('[data-ui-name="FilterTrigger.Text"]');
        await expect(buttonText).toHaveAttribute('aria-hidden', 'false');

        const hint = button.locator('[data-ui-name="FilterTrigger.ClearButton"]');

        await expect(hint).toHaveAttribute('tabindex', '0');
        await expect(hint).toHaveAttribute('aria-label', 'Clear');
        await expect(hint).toHaveAttribute('type', 'button');
      });

      await test.step('Verify placeholder attributes', async () => {
        const button = await page.locator('[data-test-id="placeholder"]');
        const buttonTRigger = await button.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
        await expect(buttonTRigger).toHaveAttribute('type', 'button');
        await expect(buttonTRigger).toHaveAttribute('role', 'combobox');
        await expect(buttonTRigger).toHaveAttribute('tabindex', '0');
      });

      await test.step('Verify disabled attributes', async () => {
        const button = await page.locator('[data-test-id="disabled"]');
        const buttonTRigger = await button.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
        await expect(buttonTRigger).toHaveAttribute('type', 'button');
        await expect(buttonTRigger).toHaveAttribute('role', 'combobox');
        await expect(buttonTRigger).toHaveAttribute('tabindex', '0');

        const hint = button.locator('[data-ui-name="FilterTrigger.ClearButton"]');

        await expect(hint).toHaveAttribute('tabindex', '0');
        await expect(hint).toHaveAttribute('aria-label', 'Clear');
        await expect(hint).toHaveAttribute('type', 'button');
      });
    });

    test('Verify Hint appearing', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/filter-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const hint = page.locator('[data-test-id="tooltip-hint-text"]');
      await hint.hover();
      const hintText = page.locator('text=clear trigger hint text');
      await expect(hintText).toHaveCount(1);
      await page.locator('[data-test-id="m-size"]').hover();
      await expect(hintText).toHaveCount(0);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(hint).toBeFocused();

      await expect(hintText).toHaveCount(1);
    });
  });

  test.describe('FilterTrigger interactions', () => {
    test('Verify Keyboard interactions and focus', async ({ page, browserName }) => {
      const standPath = 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
      await trigger.hover();
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('ArrowDown');

      const popperLocator = await page.locator('[data-ui-name="Select.Menu"]');
      await expect(popperLocator).toHaveCount(1);

      const option1 = page.getByRole('option', { name: 'Blue' });
      await expect(option1).toBeVisible();
      await expect(option1).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await expect(popperLocator).toHaveCount(0);

      await expect(page.getByLabel('Color')).toBeFocused();
      await page.keyboard.press('Space');
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Space');

      await expect(trigger).toHaveAttribute('value', 'Green');
      await expect(trigger).toBeFocused();

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(clearButtonLocator).toBeFocused();
      await new Promise((resolve) => setTimeout(resolve, 250));
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Enter');
      await expect(clearButtonLocator).not.toBeVisible();

      await expect(trigger).toBeFocused();
    });

    test('Verify Mouse and keyboard interactions', async ({ page }) => {
      const standPath = 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
      await trigger.click();

      const popperLocator = await page.locator('[data-ui-name="Select.Menu"]');
      await expect(popperLocator).toHaveCount(1);

      const option1 = page.getByRole('option', { name: 'Blue' });
      await expect(option1).toBeVisible();
      await expect(option1).not.toHaveClass(/highlighted/);
      await page.keyboard.press('ArrowDown');
      const option2 = page.getByRole('option', { name: 'Gray' });
      await expect(option2).toHaveClass(/highlighted/);

      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await expect(trigger).toHaveAttribute('value', 'Gray');

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();

      await page.keyboard.press('Tab');

      await expect(clearButtonLocator).toBeFocused();
    });

    test('Verify Mouse interactions', async ({ page, browserName }) => {
      const standPath = 'stories/components/filter-trigger/docs/examples/usage_with_select.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
      await trigger.click();

      const popperLocator = await page.locator('[data-ui-name="Select.Menu"]');
      await expect(popperLocator).toHaveCount(1);

      const option1 = page.getByRole('option', { name: 'Blue' });
      await expect(option1).toBeVisible();
      await expect(option1).not.toHaveClass(/highlighted/);
      await trigger.click();
      await expect(popperLocator).toHaveCount(0);

      await trigger.click();
      await page.waitForTimeout(100);
      const option3 = page.getByRole('option', { name: 'Green' });
      await option3.click();
      await page.waitForSelector('[data-ui-name="Select.Menu"]');

      await expect(trigger).toHaveAttribute('value', 'Green');

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();

      await clearButtonLocator.click();

      await expect(clearButtonLocator).not.toBeVisible();
      await expect(trigger).not.toHaveAttribute('value', 'Green');
    });
  });

  test.describe('Controlled filter interactions (triggerRef)', () => {
    test('Verify Keyboard interactions and focus', async ({ page, browserName }) => {
      const standPath = 'stories/components/filter-trigger/docs/examples/programmatic_focus.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');

      const popperLocator = await page.locator('[data-ui-name="Select.Menu"]');
      await expect(popperLocator).toHaveCount(1);
      await expect(trigger).toBeFocused();

      const option1 = page.getByRole('option', { name: 'Option 0' });
      await expect(option1).toBeVisible();
      await expect(option1).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await expect(popperLocator).toHaveCount(0);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
      await page.waitForTimeout(100);
      await expect(trigger).toHaveAttribute('value', 'Option 0');
      await expect(trigger).toBeFocused();

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(clearButtonLocator).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(clearButtonLocator).not.toBeVisible();

      await expect(trigger).toBeFocused();
    });

    test('Verify Mouse interactions', async ({ page, browserName }) => {
      const standPath = 'stories/components/filter-trigger/docs/examples/programmatic_focus.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const button = page.getByRole('button', { name: 'Focus the filter trigger' });
      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
      await button.click();

      const popperLocator = await page.locator('[data-ui-name="Select.Menu"]');
      await expect(popperLocator).toHaveCount(1);

      const option1 = page.getByRole('option', { name: 'Option 0' });
      await expect(option1).toBeVisible();
      await expect(option1).not.toHaveClass(/highlighted/);
      await button.click();
      await expect(popperLocator).toHaveCount(0);

      await button.click();
      await trigger.click();
      await expect(popperLocator).toHaveCount(0);

      await button.click();
      const option3 = page.getByRole('option', { name: 'Option 3' });
      await option3.click();

      await expect(trigger).toHaveAttribute('value', 'Option 3');

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();

      await clearButtonLocator.click();

      await expect(clearButtonLocator).not.toBeVisible();
      await expect(trigger).not.toHaveAttribute('value', 'Option 3');
    });
  });

  test.describe('Counter and On Clear props', () => {
    test('Verify Keyboard interactions and focus', async ({ page, browserName }) => {
      const standPath =
        'stories/components/filter-trigger/advanced/examples/advanced_with_counter.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForTimeout(50);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('Enter');
      }
      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).toHaveText('10');
      await page.keyboard.press('Escape');
      await page.waitForTimeout(50);
      await expect(page).toHaveScreenshot();

      await expect(trigger).toBeFocused();

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();

      await page.keyboard.press('Tab');
      await expect(clearButtonLocator).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(clearButtonLocator).not.toBeVisible();
      await expect(trigger).toBeFocused();
      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).not.toBeVisible();
    });

    test('Verify Mouse interactions', async ({ page, browserName }) => {
      const standPath =
        'stories/components/filter-trigger/advanced/examples/advanced_with_counter.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
      const addFilter = page.getByRole('button', { name: 'Add a filter' });
      await trigger.click();

      for (let i = 0; i < 10; i++) {
        await addFilter.click();
      }
      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).toHaveText('10');
      await trigger.click();

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await expect(clearButtonLocator).toBeVisible();
      await expect(clearButtonLocator).not.toBeFocused();
      await clearButtonLocator.click();

      await expect(page.locator('[data-ui-name="FilterTrigger.Counter"]')).not.toBeVisible();
    });

    test('Verify  Keyboard interactions and focus', async ({ page, browserName }) => {
      const standPath = 'stories/components/filter-trigger/docs/examples/accessible_name.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const trigger = page.getByLabel('Material');
      await trigger.click();

      const options = page.getByRole('option');
      await options.nth(0).click();
      await options.nth(1).click();
      await options.nth(2).click();
      const button = page.getByRole('combobox', { name: 'Material' });

      await expect(button).toHaveAttribute('value', 'Glass,Metal,Paper');
      await expect(button.locator('div[data-ui-name="FilterTrigger.Text"]')).toContainText(
        '3 selected',
      );

      const textSpan = button.locator('div[data-ui-name="FilterTrigger.Text"] span');
      await expect(textSpan).toHaveAttribute('aria-hidden', 'true');

      const clearButtonLocator = await page.locator(
        'button[data-ui-name="FilterTrigger.ClearButton"]',
      );
      await clearButtonLocator.click();
      await expect(button.locator('div[data-ui-name="FilterTrigger.Text"]')).not.toContainText(
        '3 selected',
      );
    });
  });
});
