import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('AutoSuggest', () => {
  test('Verify keyboard Navigation', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const menu = page.locator('[data-ui-name="Select.Menu"]');
    const options = page.locator('[data-ui-name="Select.Option"]');
    const trigger = page.locator('[data-ui-name="Select.Trigger"]');

    await test.step('Verify menu not expanded when nothing entered', async () => {
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');
      await expect(menu).not.toBeVisible();
    });
    await test.step('Verify menu appears when character entered but nothing is selected', async () => {
      await page.keyboard.type('a');
      await page.waitForSelector('text=persian');
      const count = await options.count();
      for (let i = 1; i < count; i++) {
        await expect(options.nth(i)).not.toHaveClass(/selected/);
      }
    });

    await test.step('Verify arrows navigation between options', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify option not selected and menu closed by Escape', async () => {
      await page.keyboard.press('Escape');

      await expect(menu).not.toBeVisible();
      await expect(trigger).toHaveAttribute('value', 'a');

      await page.keyboard.press('Enter');
      await page.waitForSelector('text=persian');
      const count = await options.count();
      for (let i = 1; i < count; i++) {
        await expect(options.nth(i)).not.toHaveClass(/selected/);
      }
    });

    await test.step('Verify option selected and menu closed by Enter', async () => {
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      await expect(trigger).toHaveAttribute('value', 'ragdoll');

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify selected item shown and highlighted but not focused', async () => {
      await page.keyboard.press('Enter');
      await page.waitForSelector('text=ragdoll');
      await expect(options.first()).toHaveClass(/selected/);
      await expect(options.first()).not.toHaveClass(/highlighted/);
    });

    await test.step('Verify item is selected and menu closed by Enter when exact match opened', async () => {
      for (let i = 0; i < 'ragdoll'.length; i++) {
        await page.keyboard.press('Backspace');
      };
      await page.keyboard.type('persian');
      await options.first().waitFor({ state: 'visible' });
      await expect(options.first()).toHaveText(/persian/);

      await expect(options.first()).toHaveClass(/selected/);
      await page.keyboard.press('Enter');
      await options.first().waitFor({ state: 'visible' });
    });
  });

  test('Verify mouse Navigation', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/auto-suggest/docs/examples/autosuggest_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const menu = page.locator('[data-ui-name="Select.Menu"]');
    const options = page.locator('[data-ui-name="Select.Option"]');
    const trigger = page.locator('[data-ui-name="Select.Trigger"]');

    const input = await page.locator('input');
    const inputRect = (await input.boundingBox())!;
    const inputCoords = [inputRect.x + inputRect.width / 2, inputRect.y + inputRect.height / 2];

    await test.step('Verify menu not expanded when nothing entered', async () => {
      await page.mouse.click(inputCoords[0], inputCoords[1]);
    });

    await test.step('Verify menu expanded when character entered', async () => {
      await page.keyboard.type('a');
      await page.waitForSelector('text=persian');
      await expect(menu).toBeVisible();
      const count = await options.count();
      for (let i = 1; i < count; i++) {
        await expect(options.nth(i)).not.toHaveClass(/selected/);
      }
    });

    await test.step('Verify menu closed when option clicked', async () => {
      const persianOption = await page.locator('text=persian');
      await expect(page).toHaveScreenshot();
      const persianOptionRect = (await persianOption.boundingBox())!;
      const persianOptionCoords = [
        persianOptionRect.x + persianOptionRect.width / 2,
        persianOptionRect.y + persianOptionRect.height / 2,
      ];

      await page.mouse.click(persianOptionCoords[0], persianOptionCoords[1]);

      await expect(persianOption).toHaveCount(0);
      await expect(trigger).toHaveAttribute('value', 'persian');
    });

    await test.step('Verify menu opened and selected option highlighted', async () => {
      await page.mouse.click(inputCoords[0], inputCoords[1]);
      await page.waitForSelector('text=persian');
      await expect(trigger).toHaveAttribute('value', 'persian');

      await expect(options.first()).toHaveClass(/selected/);
      await expect(options.first()).not.toHaveClass(/highlighted/);

      await expect(page).toHaveScreenshot();
    });
  });
});
