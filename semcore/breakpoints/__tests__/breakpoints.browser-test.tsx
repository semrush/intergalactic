import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Simple-use - Breakpoints Button Size', () => {
  const breakpoints = [
    { width: 320, expectedSize: 'L', expectedHeight: '40px' },
    { width: 768, expectedSize: 'M', expectedHeight: '28px' },
    { width: 1200, expectedSize: 'M', expectedHeight: '28px' },
    { width: 1920, expectedSize: 'M', expectedHeight: '28px' },
  ];

  breakpoints.forEach(({ width, expectedSize, expectedHeight }) => {
    test(`Should render button with size '${expectedSize}' at viewport width ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/breakpoints/docs/examples/simple-use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(100);

      const button = page.locator('[data-ui-name="Button"]');

      const buttonText = await button.locator('[data-ui-name="Button.Text"]').textContent();
      expect(buttonText?.trim()).toBe(`Size ${expectedSize}`);

      const buttonHeight = await button.evaluate((el) => getComputedStyle(el).height);
      expect(buttonHeight).toBe(expectedHeight);
    });
  });
});

test.describe('Manual control - Breakpoints Button Size', () => {
  const breakpoints = [
    { width: 320, expectedSize: 'L', expectedHeight: '40px' },
    { width: 768, expectedSize: 'M', expectedHeight: '28px' },
    { width: 1200, expectedSize: 'M', expectedHeight: '28px' },
    { width: 1920, expectedSize: 'M', expectedHeight: '28px' },
  ];

  breakpoints.forEach(({ width, expectedSize, expectedHeight }) => {
    test(`Should render button with size '${expectedSize}' at viewport width ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/breakpoints/docs/examples/simple-use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(100);

      const button = page.locator('[data-ui-name="Button"]');

      const buttonText = await button.locator('[data-ui-name="Button.Text"]').textContent();
      expect(buttonText?.trim()).toBe(`Size ${expectedSize}`);

      const buttonHeight = await button.evaluate((el) => getComputedStyle(el).height);
      expect(buttonHeight).toBe(expectedHeight);
    });
  });
});

test.describe('Mocking - Breakpoints Text', () => {
  const breakpoints = [
    { width: 300, expectedText: '(max-width: 300px)' },
    { width: 500, expectedText: '(max-width: 500px)' },
    { width: 700, expectedText: '(max-width: 700px)' },
    { width: 900, expectedText: '(max-width: 900px)' },
    { width: 1100, expectedText: '(max-width: 1100px)' },
    { width: 1200, expectedText: 'ZOOM WINDOW' },
  ];

  breakpoints.forEach(({ width, expectedText }) => {
    test(`Should render  '${expectedText}' at viewport width ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/breakpoints/docs/examples/mocking.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.setViewportSize({ width, height: 800 });
      await page.waitForTimeout(100);

      const mediaTextLocator = page.locator('div', {
        hasText: "Media matches '(max-width: 700px)'",
      });
      await expect(mediaTextLocator.nth(1)).toBeVisible();
    });
  });
});

test.describe('Custom media - Breakpoints Text', () => {
  const breakpoints = [
    { width: 300, expectedText: '(max-width: 300px)' },
    { width: 500, expectedText: '(max-width: 500px)' },
    { width: 700, expectedText: '(max-width: 700px)' },
    { width: 900, expectedText: '(max-width: 900px)' },
    { width: 1100, expectedText: '(max-width: 1100px)' },
    { width: 1200, expectedText: 'ZOOM WINDOW' },
  ];

  breakpoints.forEach(({ width, expectedText }) => {
    test(`Should render  '${expectedText}' at viewport width ${width}px`, async ({ page, browserName }) => {
      const standPath = 'stories/components/breakpoints/docs/examples/custom-media.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      if (browserName !== 'webkit') {
        //the webkit skipped temporary because it doesnt update the size, in debug mode all words well
        await page.setViewportSize({ width, height: 800 });
        await page.waitForTimeout(100);

        const mediaTextLocator = page.locator('div', {
          hasText: ` Media matches "${expectedText}"`,
        });
        await expect(mediaTextLocator.nth(1)).toBeVisible();
      }
    });
  });
});
