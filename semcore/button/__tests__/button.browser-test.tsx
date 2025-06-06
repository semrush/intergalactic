import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Button', () => {
  test('Verify uses themes sizes and addons styles', async ({ page }) => {
    const standPath = 'stories/components/button/tests/examples/icon_uses_and_themes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 1600, height: 800 });

    await page.keyboard.press('Tab');

    await test.step('Verify secondary muted ', async () => {
      const flex = await page.locator('[data-testid="Secondary-muted"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify secondary invert ', async () => {
      const flex = await page.locator('[data-testid="Secondary-invert"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify primary info', async () => {
      const flex = await page.locator('[data-testid="Primary-info"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify primary success', async () => {
      const flex = await page.locator('[data-testid="Primary-success"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify primary brand', async () => {
      const flex = await page.locator('[data-testid="Primary-brand"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify primary danger', async () => {
      const flex = await page.locator('[data-testid="Primary-danger"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify primary invert', async () => {
      const flex = await page.locator('[data-testid="Primary-invert"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify Tertiary muted', async () => {
      const flex = await page.locator('[data-testid="Tertiary-muted"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;

      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify Tertiary info', async () => {
      const flex = await page.locator('[data-testid="Tertiary-info"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');
      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });

    await test.step('Verify Tertiary invert', async () => {
      const flex = await page.locator('[data-testid="Tertiary-invert"]');
      const screenshotsClip = (await flex.first().boundingBox())!;
      screenshotsClip.x -= 4;
      screenshotsClip.y -= 4;
      screenshotsClip.width += 8;
      screenshotsClip.height += 8;
      await flex.locator('[data-ui-name="Button"]').nth(0).click();
      await page.keyboard.press('Tab');

      await flex.locator('[data-ui-name="Button"]').nth(6).hover();

      await expect(page).toHaveScreenshot({ clip: screenshotsClip });

      const lWithAddons = flex.locator('[data-ui-name="Button"]').nth(8);
      await expect(lWithAddons).toHaveCSS('height', '40px');
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '16px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-left',
        '8px',
      );
      await expect(lWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );

      const mWithAddons = flex.locator('[data-ui-name="Button"]').nth(10);
      await expect(mWithAddons).toHaveCSS('height', '28px');
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'font-size',
        '14px',
      );
      await expect(mWithAddons.locator('[data-ui-name="Button.Text"]')).toHaveCSS(
        'margin-right',
        '8px',
      );
    });
  });

  test('Verify buttons without text interactions', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_accessibility.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const buttons = page.locator('[data-ui-name="Button"]');
    await page.keyboard.press('Tab');
    await page.waitForSelector('text="Confirm action"');
    await expect(page).toHaveScreenshot();

    await buttons.nth(1).hover();
    await page.waitForSelector('text="Close notification"');
    await expect(page).toHaveScreenshot();

    await buttons.nth(0).hover();
    await page.waitForSelector('text="Confirm action"');
    await expect(page.locator('text="Confirm action"')).toBeVisible();
    await expect(page.locator('text="Close notification"')).not.toBeVisible();
  });

  test('Verify disabled buttons interactions', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_with_loading.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const buttons = page.locator('[data-ui-name="Button"]');
    await page.keyboard.press('Tab');
    await expect(buttons.nth(0)).not.toBeFocused();

    await page.keyboard.press('Tab');
    await expect(buttons.nth(1)).not.toBeFocused();
  });
});

test.describe('Button Link', () => {
  test('Verify Button Link styles and states', async ({ page }) => {
    const standPath = 'stories/components/button/docs/examples/button_link.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const button = page.locator('[data-ui-name="ButtonLink"]');

    await test.step('Verify primary styles', async () => {
      await expect(page).toHaveScreenshot();
      await button.first().hover();
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify colored styles', async () => {
      await button.nth(1).hover();
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify secondary styles', async () => {
      await button.nth(2).hover();

      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify icon only styles', async () => {
      await button.nth(4).hover();
      await page.waitForSelector('text="Icon-only button"');
      await expect(page).toHaveScreenshot();
      await button.nth(5).hover();

      await page.keyboard.press('Tab');
      await page.waitForSelector('text="Icon-only button"');
      await expect(page).toHaveScreenshot();
    });
  });
});
