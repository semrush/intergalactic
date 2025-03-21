import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { checkBackgroundColor, checkBorderColor, checkKeyboardNavigation } from './utils';

test.describe('Base-trigger', () => {
  test.describe('Styles and a11y checks', () => {
    test('Verify main styles and props', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/base-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await test.step('Normal state styles', async () => {
        await checkBackgroundColor(
          page,
          '[data-test-id="normal-state-trigger"]',
          'rgb(255, 255, 255)',
        );
      });
      const button = await page.locator('[data-test-id="normal-state-trigger"]');
      await button.hover();
      await expect(page).toHaveScreenshot();

      await test.step('Disabled state styles', async () => {
        await checkBackgroundColor(page, '[data-test-id="disabled-trigger"]', 'rgb(255, 255, 255)');
      });

      await test.step('Valid state styles', async () => {
        await checkBorderColor(page, '[data-test-id="valid-state-trigger"]', 'rgb(0, 124, 101)');
      });

      await test.step('Invalid state styles', async () => {
        await checkBorderColor(page, '[data-test-id="invalid-state-trigger"]', 'rgb(209, 0, 47)');
      });

      await test.step('Focus styles', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        const button = await page.locator('[data-test-id="normal-state-trigger"]');
        await button.hover();
        await expect(page).toHaveScreenshot();
        await page.keyboard.press('Tab');
        await page.locator('[data-test-id="valid-state-trigger"]').hover();
        await expect(page).toHaveScreenshot();
        await page.keyboard.press('Tab');
        await page.locator('[data-test-id="invalid-state-trigger"]').hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Active state styles', async () => {
        await checkBackgroundColor(page, '[data-test-id="active-trigger"]', 'rgb(255, 255, 255)');
        await checkBorderColor(page, '[data-test-id="active-trigger"]', 'rgb(0, 109, 202)');
      });
    });

    test('Verify main styles a11y attributes and focus', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/base-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await test.step('Verify focus on Active and Disabled', async () => {
        await checkKeyboardNavigation(page, '[data-test-id]');
      });

      await test.step('Verify roles and attributes', async () => {
        const button = await page.locator('[data-test-id="active-trigger"]');
        await expect(button).toHaveAttribute('type', 'button');
        await expect(button).toHaveAttribute('tabindex', '0');
        const text = await button.locator('[data-ui-name="BaseTrigger.Text"]');
        await expect(text).toHaveAttribute('aria-hidden', 'false');
        const placeholderElement = await page
          .locator('[data-ui-name="BaseTrigger.Text"][placeholder]')
          .first();
        await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('Verify ellipsis', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/advanced/examples/base-trigger-ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Interactions', () => {
    test('Verify keyboard navigation and changing values', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/advanced/examples/base-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page.locator('[id="device-button-select"]')).toBeFocused();
      await page.keyboard.press('ArrowDown');
      const option = page.getByRole('option', { name: 'One' });
      await expect(option).toBeVisible();
      await expect(option).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await expect(option).not.toBeVisible();
      await expect(page.locator('[id="device-button-select"]')).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(option).toBeVisible();
      await expect(option).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      await expect(page.locator('[id="device-button-select"]')).toBeFocused();
      await expect(page.locator('[id="device-button-select"]')).toHaveAttribute('value', 'One');
    });

    test('Verify mouse navigation and changing values', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/advanced/examples/base-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const button = page.locator('[id="device-button-select"]');
      await button.click();
      const initialWidth = await button.boundingBox().then((b) => b?.width || 0);
      const option = page.getByRole('option', { name: 'One' });
      await expect(option).toBeVisible();
      await expect(option).not.toHaveClass(/highlighted/);
      await button.click();
      await expect(option).not.toBeVisible();
      await button.click();
      await option.click();
      await page.waitForTimeout(50);
      await expect(page.locator('[id="device-button-select"]')).toHaveAttribute('value', 'One');
      const finalWidth = await button.boundingBox().then((b) => b?.width || 0);
      expect(finalWidth).toBeLessThan(initialWidth);
    });

    test('Verify mouse with keyboard navigation and changing values', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/advanced/examples/base-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const button = page.locator('[id="device-button-select"]');
      await button.click();
      await page.keyboard.press('ArrowDown');
      const option = page.getByRole('option', { name: 'Desktop' });
      await expect(option).toBeVisible();
      await expect(option).toHaveClass(/highlighted/);
      await button.click();
      await expect(option).not.toBeVisible();
      await expect(button).not.toHaveAttribute('value', 'Desktop');
      await button.click();
      await option.click();
      await expect(button).toHaveAttribute('value', 'Desktop');
    });
  });
});
