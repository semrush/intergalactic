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
    await page.waitForTimeout(200);
    await expect(popper).toHaveAttribute('role', 'dialog');
    await expect(trigger).toHaveAttribute('aria-labelledby');
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
    await page.waitForTimeout(200);
    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('ArrowDown');
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();
    //snapshot

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();

    await page.keyboard.press('Space');
    await page.waitForTimeout(200);
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();

    await trigger.click();
    await page.waitForTimeout(200);
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeHidden();
  });

  test('Verify mouse interactios with Basic usage', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await trigger.click();
    await page.waitForTimeout(200);

    await expect(trigger).not.toBeFocused();
    await expect(popper).not.toBeFocused();
    await expect(popper).toBeVisible();

    await trigger.click();
    await page.waitForTimeout(200);
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();

    await trigger.click();
    await popper.click();

    await expect(trigger).not.toBeFocused();
    await expect(popper).not.toBeFocused();
    await expect(popper).toBeVisible();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();
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
    await page.waitForTimeout(200);
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();

    await page.keyboard.press('Space');
    await page.waitForTimeout(200);
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();
    await expect(popper).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();
  });

  test('Verify mouse interaction when Focus interaction enabled', async ({ page }) => {
    const standPath = 'stories/components/dropdown/docs/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await trigger.click();
    await page.waitForTimeout(200);
    await expect(trigger).not.toBeFocused();
    await expect(popper).not.toBeFocused();

    await trigger.click();
    await expect(trigger).not.toBeFocused();
    await expect(popper).not.toBeFocused();

    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
    await expect(trigger).toBeFocused();
    await expect(popper).toBeHidden();

    await trigger.click();
    await expect(trigger).not.toBeFocused();
    await expect(popper).toBeFocused();
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
});
