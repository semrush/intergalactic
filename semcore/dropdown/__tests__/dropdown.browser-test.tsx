import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dropdown', () => {
  test('Verify roles and attributes', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await expect(trigger).toHaveAttribute('role', 'button');
    await expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await trigger.click();
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await expect(popper).toHaveAttribute('role', 'dialog');
    await expect(popper).toHaveAttribute('aria-labelledby');
  });

  test('Verify keyboard interactios with Basic usage', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();

    await page.keyboard.press('Enter');
    await popper.waitFor({ state: 'visible', timeout: 500 });

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();
    //snapshot

    await page.keyboard.press('Escape');
    await popper.waitFor({ state: 'hidden', timeout: 500 });
    await expect(trigger).toBeFocused();

    await page.keyboard.press('Space');
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();

    await trigger.click();
    await expect(popper).toBeHidden();
  });

  test('Verify mouse interactios with Basic usage', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await trigger.click();
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await expect(trigger).not.toBeFocused();

    await trigger.click();
    await popper.waitFor({ state: 'hidden', timeout: 500 });

    await trigger.click();
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await popper.click();

    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeVisible();

    await page.keyboard.press('Escape');
    await popper.waitFor({ state: 'hidden', timeout: 500 });
    await expect(trigger).toBeFocused();
  });

  test('Verify keyboard interaction when Focus interaction enabled', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();

    await page.keyboard.press('Space');
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();
    await expect(popper).not.toBeFocused();
  });

  test('Verify mouse interaction when Focus interaction enabled', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await trigger.click();
    await expect(trigger).not.toBeFocused();

    await trigger.click();
    await popper.waitFor({ state: 'visible', timeout: 500 });

    await page.keyboard.press('Escape');
    await popper.waitFor({ state: 'hidden', timeout: 500 });
    await expect(trigger).toBeFocused();
  });

  test('Verify stretch and placement', async ({ page }) => {
    const standPath = 'stories/components/dropdown/tests/examples/dd-stretch.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const button = page.getByRole('button');

    await button.first().click();
    await page.waitForTimeout(200);
    //snapshot

    await button.nth(1).click();
    await page.waitForTimeout(200);
    //snapshot

    await button.nth(2).click();
    await page.waitForTimeout(200);
    //snapshot
  });

  test('Verify dropdown states functionality by mouse', async ({ page }) => {
    const standPath = 'stories/components/dropdown/tests/examples/dd-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify default visible expanded', async () => {
      await expect(popper).toHaveCount(1);
      await expect(popper).toBeFocused();
    });

    await test.step('Verify no popper when visible = false', async () => {
      await page.locator('[data-testid="visible"]').click();
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify no popper when disabled', async () => {
      await page.locator('[data-testid="disabled"]').click();
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify no focus outline when disableEnforceFocus', async () => {
      await page.locator('[data-testid="disableEnforceFocus"]').click();
      await expect(popper).toHaveCount(1);
      await expect(popper).not.toBeFocused();
    });

    await test.step('Verify no focus outline when explicitTriggerSet', async () => {
      await page.locator('[data-testid="explicitTriggerSet"]').click();
      await expect(popper).toHaveCount(1);
      //snapshot
    });

    const messages: string[] = [];

    await test.step('Verify log onVisibleChange and onFirstUpdate to console on dropdown open by mouse click', async () => {
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          messages.push(msg.text());
        }
      });

      // Кликаем по кнопке-триггеру
      const trigger = page.getByTestId('onVisibleChange onFirstUpdate');
      await trigger.click();

      // Ждём появления поповера (по aria-controls)

      // Проверяем, что нужные сообщения были залогированы
      expect(
        messages.some((msg) => msg.includes('Dropdown visibility changed: true')),
      ).toBeTruthy();
      expect(messages.some((msg) => msg.includes('Popper first update'))).toBeTruthy();
      await trigger.click();
      expect(
        messages.some((msg) => msg.includes('Dropdown visibility changed: true')),
      ).toBeTruthy();
    });
  });

  test('Verify dropdown states functionality by keyboard', async ({ page }) => {
    const standPath = 'stories/components/dropdown/tests/examples/dd-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify no popper when visible = false', async () => {
      await page.keyboard.press('Escape');
      await page.keyboard.press('Escape');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify popper when disabled', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(popper).toHaveCount(1);
      await page.keyboard.press('Escape');
    });

    await test.step('Verify no focus outline when disableEnforceFocus', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(popper).toHaveCount(1);
      await expect(popper).not.toBeFocused();
      await page.keyboard.press('Escape');
    });

    await test.step('Verify popper when explicitTriggerSet', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Space');
      await expect(popper).toHaveCount(1);

      //snapshot
      await page.keyboard.press('Escape');
    });

    const messages: string[] = [];

    await test.step('Verify log onVisibleChange and onFirstUpdate to console on dropdown open by mouse click', async () => {
      page.on('console', (msg) => {
        if (msg.type() === 'log') {
          messages.push(msg.text());
        }
      });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await page.keyboard.press('Space');

      expect(
        messages.some((msg) => msg.includes('Dropdown visibility changed: true')),
      ).toBeTruthy();
      expect(messages.some((msg) => msg.includes('Popper first update'))).toBeTruthy();

      await page.keyboard.press('Escape');
      expect(
        messages.some((msg) => msg.includes('Dropdown visibility changed: true')),
      ).toBeTruthy();
    });
  });
});
