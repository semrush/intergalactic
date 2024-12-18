import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Options Filtering', () => {
  test('Traps focus on input', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');

    await expect(page).toHaveScreenshot();
  });
  test('Closes and Returns focus by esc', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');
    const inputLocaltor = await page.locator('input');

    await page.keyboard.press('Escape');

    await expect(inputLocaltor).toHaveCount(0);

    await expect(page).toHaveScreenshot();
  });
  test('Closes by mouse click on trigger', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const Trigger = page.locator(
      '[data-ui-name="ButtonTrigger.Text"][placeholder="Select a fruit"]',
    );
    await Trigger.click();

    await page.waitForSelector('input');
    const inputLocaltor = await page.locator('input');

    await Trigger.click();
    await expect(inputLocaltor).toHaveCount(0);
    await expect(inputLocaltor).not.toBeVisible();
  });
  test('Open select and choose option by keyboard', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');
    await page.waitForSelector('input');
    const inputLocaltor = await page.locator('input');

    await new Promise((resolve) => setTimeout(resolve, 500));
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');

    await page.keyboard.press('Space');
    await new Promise((resolve) => setTimeout(resolve, 500));
    const triggerLocatior = await page.locator('[data-ui-name="Select.Trigger"]');
    await expect(await triggerLocatior.textContent()).toBe('Banana');
  });
  test('Open select and choose option by mouse', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');
    const inputLocaltor = await page.locator('input');
    await new Promise((resolve) => setTimeout(resolve, 500));

    const optionBLocator = await page.locator('text=Banana');
    const optionBRect = (await optionBLocator.boundingBox())!;
    await page.mouse.click(
      optionBRect.x + optionBRect.width / 2,
      optionBRect.y + optionBRect.height / 2,
    );

    await expect(inputLocaltor).toHaveCount(0);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const triggerLocatior = await page.locator('[data-ui-name="Select.Trigger"]');

    await expect(await triggerLocatior.textContent()).toBe('Banana');
  });

  test('Show hint for clear input button by keyboard', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Space');

    await page.waitForSelector('input');

    await page.keyboard.type('Test');
    await page.keyboard.press('Tab');

    await new Promise((resolve) => setTimeout(resolve, 500));

    await expect(page).toHaveScreenshot();
  });

  test('Show hint for clear input button by mouse', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = await page.locator('[data-ui-name="Select.Trigger"]');
    await trigger.click();

    const input = await page.waitForSelector('input');
    await input.click();
    await page.keyboard.type('Test');

    const close = await page.locator('[data-ui-name="InputSearch.Clear"]');
    await close.hover();

    await new Promise((resolve) => setTimeout(resolve, 500));
    await expect(page).toHaveScreenshot();
  });

  test('Show highlight the first filtered item if previous is out of filtered list', async ({
    page,
  }) => {
    const standPath = 'stories/components/select/docs/examples/options_filtering.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = await page.locator('[data-ui-name="Select.Trigger"]');
    await trigger.click();

    await page.waitForSelector('input');

    await page.keyboard.press('ArrowUp');
    await page.keyboard.press('Tab');

    await page.keyboard.type('appl');

    await page.keyboard.press('ArrowDown');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Render function', () => {
  test('Show highlight the first option item', async ({ page }) => {
    const standPath = 'stories/components/select/docs/examples/render_function.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();

    // close and reopen
    await page.keyboard.press('Escape');
    await page.keyboard.press('Enter');

    await expect(page).toHaveScreenshot();
  });
});

test.describe('Focus interaction', () => {
  test('Open By mouse', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const trigger = page.locator('button[placeholder = "Select option"]');
    await trigger.click();
    await expect(page.locator('[data-ui-name ="DropdownMenu.Popper"]')).toBeVisible();
    await trigger.click();
    await expect(page.locator('[data-ui-name ="DropdownMenu.Popper"]')).toBeVisible();
  });

  test('Open By keyboard', async ({ page }) => {
    const standPath = 'stories/components/select/tests/examples/focus_interaction.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name ="DropdownMenu.Popper"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[data-ui-name ="DropdownMenu.Popper"]')).not.toBeVisible();
  });
});
