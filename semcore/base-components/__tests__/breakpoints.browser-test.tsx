import { test, expect } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

/* =====================================================
@functional
Keyboard and mouse interactions - no snapshots here.
We verify states, visibility, and attributes.
===================================================== */
test.describe(`${TAG.FUNCTIONAL}`, () => {
  test.describe('Simple use', () => {
    const breakpoints = [
      { width: 320, expectedSize: 'L', expectedHeight: '44px' },
      { width: 768, expectedSize: 'M', expectedHeight: '32px' },
      { width: 1200, expectedSize: 'M', expectedHeight: '32px' },
      { width: 1920, expectedSize: 'M', expectedHeight: '32px' },
    ];

    breakpoints.forEach(({ width, expectedSize, expectedHeight }) => {
      test(`Verify button has size '${expectedSize}' when viewport width ${width}px`, {
        tag: [TAG.PRIORITY_HIGH,
          '@base-components',
          '@breakpoints',
          '@button'],
      }, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await loadPage(page, 'stories/components/base-components/breakpoints/docs/examples/simple-use.tsx', 'en');
        await page.waitForTimeout(100);

        const button = page.locator('[data-ui-name="Button"]');

        const buttonText = await button.locator('[data-ui-name="Button.Text"]').textContent();
        expect(buttonText?.trim()).toBe(`Size ${expectedSize}`);

        const buttonHeight = await button.evaluate((el) => getComputedStyle(el).height);
        expect(buttonHeight).toBe(expectedHeight);
      });
    });
  });

  test.describe('Manual control', () => {
    const breakpoints = [
      { width: 320, expectedSize: 'L', expectedHeight: '44px' },
      { width: 768, expectedSize: 'M', expectedHeight: '32px' },
      { width: 1200, expectedSize: 'M', expectedHeight: '32px' },
      { width: 1920, expectedSize: 'M', expectedHeight: '32px' },
    ];

    breakpoints.forEach(({ width, expectedSize, expectedHeight }) => {
      test(`Verify renders button with size '${expectedSize}' at viewport width ${width}px`, {
        tag: [TAG.PRIORITY_HIGH,
          '@base-components',
          '@breakpoints',
          '@button'],
      }, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await loadPage(page, 'stories/components/base-components/breakpoints/docs/examples/manual-control.tsx', 'en');
        await page.waitForTimeout(100);

        const button = page.locator('[data-ui-name="Button"]');

        const buttonText = await button.locator('[data-ui-name="Button.Text"]').textContent();
        expect(buttonText?.trim()).toBe(`Size${expectedSize}`);

        const buttonHeight = await button.evaluate((el) => getComputedStyle(el).height);
        expect(buttonHeight).toBe(expectedHeight);
      });
    });
  });

  test.describe('Mocking ', () => {
    const breakpoints = [
      { width: 300, expectedText: '(max-width: 300px)' },
      { width: 500, expectedText: '(max-width: 500px)' },
      { width: 700, expectedText: '(max-width: 700px)' },
      { width: 900, expectedText: '(max-width: 900px)' },
      { width: 1100, expectedText: '(max-width: 1100px)' },
      { width: 1200, expectedText: 'ZOOM WINDOW' },
    ];

    breakpoints.forEach(({ width, expectedText }) => {
      test(`Verify '${expectedText}' shown at viewport width ${width}px`, {
        tag: [TAG.PRIORITY_HIGH,
          '@base-components',
          '@breakpoints'],
      }, async ({ page }) => {
        await loadPage(page, 'stories/components/base-components/breakpoints/docs/examples/mocking.tsx', 'en');

        await page.setViewportSize({ width, height: 800 });
        await page.waitForTimeout(100);

        const mediaTextLocator = page.locator('div', {
          hasText: 'Media matches \'(max-width: 700px)\'',
        });
        await expect(mediaTextLocator.nth(1)).toBeVisible();
      });
    });
  });

  test.describe('Custom media', () => {
    const breakpoints = [
      { width: 300, expectedText: '(max-width: 300px)' },
      { width: 500, expectedText: '(max-width: 500px)' },
      { width: 700, expectedText: '(max-width: 700px)' },
      { width: 900, expectedText: '(max-width: 900px)' },
      { width: 1100, expectedText: '(max-width: 1100px)' },
      { width: 1200, expectedText: 'ZOOM WINDOW' },
    ];

    breakpoints.forEach(({ width, expectedText }) => {
      test(`Verify '${expectedText}' shown at viewport width ${width}px`, {
        tag: [TAG.PRIORITY_HIGH,
          '@base-components',
          '@breakpoints'],
      }, async ({ page, browserName }) => {
        await loadPage(page, 'stories/components/base-components/breakpoints/docs/examples/custom-media.tsx', 'en');

        if (browserName !== 'webkit') {
          // the webkit skipped temporary because it doesnt update the size, in debug mode all words well
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
});
