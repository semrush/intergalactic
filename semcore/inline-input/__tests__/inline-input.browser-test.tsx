import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('InlineInput', () => {
  test('Verify states and styles', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/styles.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 800 });

    await test.step('Verify default with controls', async () => {
      const flex = await page.locator('[data-testid="default"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const confirm = flex.locator('[data-ui-name="data-ui-name="InlineInput.ConfirmControl"]');
      const cancel = flex.locator('[data-ui-name="data-ui-name="InlineInput.CancelControl"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(confirm.first()).toHaveCSS('padding', '0px 4px');
      await expect(cancel.first()).toHaveCSS('padding', '0px 4px');
    });

    await test.step('Verify default with addon', async () => {
      const flex = await page.locator('[data-testid="addons"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const confirm = flex.locator('[data-ui-name="data-ui-name="InlineInput.ConfirmControl"]');
      const cancel = flex.locator('[data-ui-name="data-ui-name="InlineInput.CancelControl"]');
      const addon = flex.locator('[data-ui-name="data-ui-name="InlineInput.Addon"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await value.first().click();
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(confirm.first()).toHaveCSS('padding', '0px 4px');
      await expect(cancel.first()).toHaveCSS('padding', '0px 4px');
      await expect(addon.first()).toHaveCSS('padding', '0px 4px');
    });

    await test.step('Verify default with addon', async () => {
      const flex = await page.locator('[data-testid="no-controls"]');
      const value = flex.locator('[data-ui-name="InlineInput.Value"]');
      const input = flex.locator('[data-ui-name="InlineInput"]');
      const inputLine = flex.locator('div[class*="Underline"]');
      const inputPlaceholder = flex.locator('[id="placeholder"]');

      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await value.first().click();
      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      await expect(value.first()).toHaveCSS('padding', '0px 4px');
      await expect(input.first()).toHaveCSS('align-items', 'center');
      await expect(input.first()).toHaveCSS('vertical-align', 'middle');
      await expect(input.first()).toHaveCSS('padding', '1px');
      await expect(input.first()).toHaveCSS('background-color', '1px');
      await expect(inputLine.first()).toHaveCSS('border-bottom', '1px solid');
      await expect(inputLine.first()).toHaveCSS('border', '1px solid');
      await expect(inputPlaceholder.first()).toHaveCSS('color', '1px solid');
    });
  });

  test('Verify custom icon and text', async ({ page }) => {
    const standPath = 'stories/components/inline-input/tests/examples/with-custom-text.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await page.waitForSelector('text="For love"');
    // snapshot

    await page.locator('[data-ui-name="InlineInput.CancelControl"]').hover();
    await page.waitForSelector('text="DRAIN THE SWAMP!"');

    // snapshot
  });
});
