import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { checkKeyboardNavigation } from './utils';

test.describe('Link-trigger', () => {
  test.describe('Styles and a11y checks', () => {
    test('Verify main styles and props', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/link-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();

      await test.step('Focus styles', async () => {
        await page.keyboard.press('Tab');

        const button = await page.locator('[data-test-id="link-trigger-active"]');
        await button.hover();
        await expect(page).toHaveScreenshot();

        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await page.locator('[data-test-id="link-trigger-red"]').hover();
        await expect(page).toHaveScreenshot();
      });
    });

    test('Verify main styles a11y attributes and focus', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/tests/examples/link-trigger-all-states.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await test.step('Verify focus on Active and Disabled', async () => {
        await checkKeyboardNavigation(page, '[data-test-id]');
      });
      await test.step('Verify roles and attributes', async () => {
        const button = await page.locator('[data-test-id="link-trigger-active"]');
        await expect(button).toHaveAttribute('type', 'button');

        await expect(button).toHaveAttribute('tabindex', '0');

        const svg = button.locator('svg');
        await expect(svg).toBeVisible();
        await expect(svg).toHaveAttribute('tabindex', '-1');
        await expect(svg).toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('Verify loading props a11y and focus', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/tests/examples/button-trigger-loading.tsx';

      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const button1 = await page.locator('[data-test-id="normal-state-trigger"]');
      await expect(button1).toHaveAttribute('tabindex', '-1');

      const svg = button1.locator('svg');
      await expect(svg).toBeVisible();

      await expect(svg).toHaveAttribute('role', 'img');
      await expect(svg).toHaveAttribute('aria-label', 'Loading…');
      const textSpan = await button1.locator('[data-ui-name="ButtonTrigger.Text"]');
      await expect(textSpan).toHaveAttribute('aria-hidden', 'false');

      await page.keyboard.press('Tab');
      await expect(page.locator('[data-test-id="active-trigger"]')).not.toBeFocused();
    });

    test('Verify ellipsis', async ({ page }) => {
      const standPath =
        'stories/components/base-trigger/advanced/examples/link-trigger-ellipsis.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });
  });

  test.describe('Interactions', () => {
    test('Verify keyboard navigation and changing values', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/docs/examples/link-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const button = page.getByRole('combobox').first();
      await expect(button).toHaveAttribute('aria-haspopup', 'listbox');
      await expect(button).toHaveAttribute('placeholder', 'Select option');
      await page.keyboard.press('Tab');
      await expect(button).toBeFocused();
      await page.keyboard.press('ArrowDown');
      const option = page.getByRole('option', { name: 'Desktop' });
      await expect(option).toBeVisible();
      await expect(option).toHaveClass(/highlighted/);
      await page.keyboard.press('Escape');
      await expect(option).not.toBeVisible();

      await expect(button).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(option).toBeVisible();
      await expect(option).toHaveClass(/highlighted/);
      await page.keyboard.press('Space');
      await expect(button).toBeFocused();
      await expect(button).toHaveAttribute('value', 'Desktop');
    });

    test('Verify mouse navigation and changing values', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/docs/examples/link-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const button = page.getByRole('combobox').first();
      const initialWidth = await button.boundingBox().then((b) => b?.width || 0);
      await button.click();

      const option = page.getByRole('option', { name: 'Desktop' });
      await expect(option).toBeVisible();
      await expect(option).not.toHaveClass(/highlighted/);
      await button.click();
      await expect(option).not.toBeVisible();
      await button.click();
      await page.getByRole('option', { name: 'Mobile' }).click();
      await page.waitForTimeout(50);
      await expect(button).toHaveAttribute('value', 'Mobile');
      const finalWidth = await button.boundingBox().then((b) => b?.width || 0);
      expect(finalWidth).toBeLessThan(initialWidth);
    });

    test('Verify mouse with keyboard navigation and changing values', async ({ page }) => {
      const standPath = 'stories/components/base-trigger/docs/examples/link-trigger.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const button = page.getByRole('combobox').first();
      await button.click();
      await page.keyboard.press('ArrowDown');
      const option = page.getByRole('option', { name: 'Mobile' });
      await expect(option).toBeVisible();
      await expect(option).toHaveClass(/highlighted/);
      await button.click();
      await expect(option).not.toBeVisible();
      await expect(button).not.toHaveAttribute('value', 'Mobile');
      await button.click();
      await option.click();
      await expect(button).toHaveAttribute('value', 'Mobile');
    });
  });
});
