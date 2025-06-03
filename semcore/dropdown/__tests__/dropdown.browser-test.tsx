import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dropdown', () => {
  test('Verify keyboard interactios with Basic usage', async ({ page, browserName }) => {
    if (browserName === 'webkit') return;
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
    await expect(page).toHaveScreenshot();

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

  test('Verify mouse interactios with Basic usage', async ({ page, browserName }) => {
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

    if (browserName === 'webkit') return;
    await page.keyboard.press('Escape');
    await popper.waitFor({ state: 'hidden', timeout: 500 });
    await expect(trigger).toBeFocused();
  });

  test('Verify keyboard interaction when Focus interaction enabled', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') return;

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

  test('Verify mouse interaction when Focus interaction enabled', async ({ page, browserName }) => {
    const standPath = 'stories/components/dropdown/docs/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="Dropdown.Trigger"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await trigger.click();
    await expect(trigger).not.toBeFocused();

    await trigger.click();
    await popper.waitFor({ state: 'visible', timeout: 500 });

    if (browserName === 'webkit') return;
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

    await expect(page).toHaveScreenshot();
    await button.first().click();
    await button.nth(1).click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot();

    await button.nth(2).click();
    await page.waitForTimeout(200);
    await expect(page).toHaveScreenshot();
  });

  test('Verify dropdown states functionality by mouse', async ({ page }) => {
    const standPath = 'stories/components/dropdown/tests/examples/dd-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

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
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify dropdown states functionality by keyboard', async ({ page, browserName }) => {
    if (browserName === 'webkit') return;

    const standPath = 'stories/components/dropdown/tests/examples/dd-cases.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify no popper when visible = false', async () => {
      await page.locator('[data-testid="visible"]').click();
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Space');
      await page.waitForTimeout(500);
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify popper when disabled', async () => {
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
      await page.keyboard.press('Escape');
      await popper.waitFor({ state: 'hidden', timeout: 500 });
    });
  });

  test('Verify dropdown keyboard interactions when trigger is input and Dropdown.Item inside', async ({
    page,
    browserName,
  }) => {
    if (browserName === 'webkit') return;
    const standPath = 'stories/components/dropdown/tests/examples/dd-input-trigger.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await test.step('Verify not opened when input focused', async () => {
      await page.keyboard.press('Tab');
      await expect(popper).toHaveCount(0);
    });

    await test.step('Verify popper opened and focused', async () => {
      await page.keyboard.press('Enter');
      await popper.waitFor({ state: 'visible', timeout: 500 });
      await expect(popper).toHaveCount(1);
      await expect(popper).toBeFocused();
    });

    await test.step('Verify Navigation bettwenn items', async () => {
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link', { name: 'set up first' })).toBeFocused();
    });

    await test.step('Verify Closes by ESC', async () => {
      await page.keyboard.press('Escape');
      await expect(popper).toHaveCount(0);
    });
  });

  test('Verify dropdown can be closed by click on button inside', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-cp-cd-cpc/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = page.locator('[data-ui-name="FilterTrigger.TriggerButton"]');
    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');
    const applyButton = page.getByRole('button', { name: 'Apply' });

    await trigger.click();
    await expect(popper).toHaveCount(1);
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await applyButton.click();
    await expect(popper).toHaveCount(0);
  });

  test('Verify dropdown can be closed by keyboard press on button inside', async ({ page }) => {
    const standPath = 'stories/patterns/filters/filter-cp-cd-cpc/docs/examples/basic-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const popper = page.locator('[data-ui-name="Dropdown.Popper"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(popper).toHaveCount(1);
    await popper.waitFor({ state: 'visible', timeout: 500 });
    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await popper.waitFor({ state: 'hidden', timeout: 500 });

    await expect(popper).not.toBeVisible();
  });
});
