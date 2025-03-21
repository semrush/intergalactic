import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { selectOption, checkBackgroundColor } from './utils';

test.describe('Base-trigger', () => {
  test('Styles', async ({ page }) => {
    const standPath = 'stories/components/base-trigger/tests/examples/base-trigger-all-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();

    await test.step('Normal state styles', async () => {
        await checkBackgroundColor(page, '[data-test-id="normal-state-trigger"]', 'rgb(255, 255, 255)');

    });

    await test.step('Hover state styles', async () => {
      const button = await page.locator('[data-test-id="normal-state-trigger"]');
      await button.hover();
      const backgroundColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(backgroundColor).toBe('rgb(244, 245, 249)'); // Укажи ожидаемый цвет
    });

    await test.step('Disabled state styles', async () => {
      const button = await page.locator('[data-test-id="disabled-trigger"]');
      const backgroundColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // Укажи ожидаемый цвет
    });

    await test.step('Valid state styles', async () => {
      const button = await page.locator('[data-test-id="valid-state-trigger"]');
      const borderColor = await button.evaluate((el) => getComputedStyle(el).borderColor);
      expect(borderColor).toBe('rgb(0, 124, 101)'); // Укажи ожидаемый цвет границы
    });

    await test.step('Invalid state styles', async () => {
      const button = await page.locator('[data-test-id="invalid-state-trigger"]');
      const borderColor = await button.evaluate((el) => getComputedStyle(el).borderColor);
      expect(borderColor).toBe('rgb(209, 0, 47)'); // Укажи ожидаемый цвет границы
    });

    await test.step('Valid state styles', async () => {
      const button = await page.locator('[data-test-id="valid-state-trigger"]');
      const borderColor = await button.evaluate((el) => getComputedStyle(el).borderColor);
      expect(borderColor).toBe('rgb(0, 124, 101)'); // Укажи ожидаемый цвет границы
    });

    await test.step('Invalid state styles', async () => {
      const button = await page.locator('[data-test-id="invalid-state-trigger"]');
      const borderColor = await button.evaluate((el) => getComputedStyle(el).borderColor);
      expect(borderColor).toBe('rgb(209, 0, 47)'); // Укажи ожидаемый цвет границы
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
      const button = await page.locator('[data-test-id="active-trigger"]');
      await page.mouse.down(); // Нажимаем мышь
      const backgroundColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(backgroundColor).toBe('rgb(255, 255, 255)'); // Укажи ожидаемый цвет
      const borderColor = await button.evaluate((el) => getComputedStyle(el).borderColor);
      expect(borderColor).toBe('rgb(0, 109, 202)'); // Укажи ожидаемый цвет границы
      await page.mouse.up(); // Отпускаем мышь
    });
  });

  test('a11y attributes and focus', async ({ page }) => {
    const standPath = 'stories/components/base-trigger/tests/examples/base-trigger-all-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify focus on Active and Disabled', async () => {
      const elements = page.locator('[data-test-id]');
      const count = await elements.count();

      let i = 0;
      while (i < count) {
        const currentElement = elements.nth(i);
        const isDisabled = (await currentElement.getAttribute('disabled')) !== null;
        if (isDisabled) {
          await expect(currentElement).not.toBeFocused({ timeout: 5000 });
          i++;
          continue;
        }
        await page.keyboard.press('Tab');
        const expectedElement = elements.nth(i);
        await expect(expectedElement).toBeFocused({ timeout: 5000 });
        i++;
      }
    });
    await test.step('Verify roles and attributes', async () => {
      const button = await page.locator('[data-test-id="active-trigger"]');
      await expect(button).toHaveAttribute('type', 'button');
      const text = await button.locator('[data-ui-name="BaseTrigger.Text"]');
      await expect(text).toHaveAttribute('aria-hidden', 'false');

      const placeholderElement = await page
        .locator('[data-ui-name="BaseTrigger.Text"][placeholder]')
        .first();
      await expect(placeholderElement).toHaveAttribute('aria-hidden', 'true');
    });
  });

  test('Keyboard navigation', async ({ page }) => {
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

  test('Mouse navigation', async ({ page }) => {
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

  test('Mouse and Keyboard navigation', async ({ page }) => {
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
