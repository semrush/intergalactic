import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Theme providers', () => {
  test('Verify violet primary comtrol theme', async ({ page, browserName }) => {
    const standPath = 'stories/components/utils/design-tokens/docs/examples/themeprovider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const button = await page.getByRole('button', { name: 'Violet primary control theme' });

    // Parent div for button
    const parentDiv = await button.locator('..');

    const primaryInfoColor = await parentDiv.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info'),
    );
    const primaryInfoHoverColor = await parentDiv.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-hover'),
    );
    const primaryInfoActiveColor = await parentDiv.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-active'),
    );

    expect(primaryInfoColor).toBe('#8649e1');
    expect(primaryInfoHoverColor).toBe('#5925ab');
    expect(primaryInfoActiveColor).toBe('#5925ab');

    const initialColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(initialColor).toBe('rgb(134, 73, 225)'); // #8649e1 in rgb

    if (browserName !== 'firefox') {
      // hover works weird on ff
      await button.hover();
      const hoverColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(hoverColor).toBe('rgb(89, 37, 171)'); // #5925ab in rgb
    }

    const buttonBox = await button.boundingBox();
    if (buttonBox) {
      await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(300);
      const clickColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(clickColor).toBe('rgb(89, 37, 171)'); // #5925ab in rgb
      await page.mouse.up();
    }
  });

  test('Verify grey primary control theme', async ({ page, browserName }) => {
    const standPath = 'stories/components/utils/design-tokens/docs/examples/themeprovider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const button = await page.getByRole('button', { name: 'Gray primary control theme' });
    const parentDiv = await button.locator('..');
    const primaryInfoColor = await parentDiv.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info'),
    );
    const primaryInfoHoverColor = await parentDiv.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-hover'),
    );
    const primaryInfoActiveColor = await parentDiv.evaluate((el) =>
      getComputedStyle(el).getPropertyValue('--intergalactic-control-primary-info-active'),
    );

    expect(primaryInfoColor).toBe('#6c6e79');
    expect(primaryInfoHoverColor).toBe('#484a54');
    expect(primaryInfoActiveColor).toBe('#2b2e38');

    const initialColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(initialColor).toBe('rgb(108, 110, 121)'); // #6c6e79 in rgb

    if (browserName !== 'firefox') {
      // hover works weird on ff
      await button.hover();
      const hoverColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(hoverColor).toBe('rgb(72, 74, 84)'); // #484a54 in rgb
    }

    const buttonBox = await button.boundingBox();
    if (buttonBox) {
      await page.mouse.move(buttonBox.x + buttonBox.width / 2, buttonBox.y + buttonBox.height / 2);
      await page.mouse.down();
      await page.waitForTimeout(300);
      const clickColor = await button.evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(clickColor).toBe('rgb(43, 46, 56)'); // #2b2e38 in rgb

      await page.mouse.up();
    }
  });
});

test.describe('Tokens with custom component', () => {
  test('Verify token applies for switch and svg', async ({ page }) => {
    const standPath =
      'stories/components/utils/design-tokens/docs/examples/tokens-with-custom-component.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    const switchElement = await page.locator('[data-ui-name="Switch"]');
    await switchElement.click();
    await expect(page).toHaveScreenshot();
  });
});
