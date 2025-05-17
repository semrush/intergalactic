import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Icons size rendering and attributes', () => {
  test('Verify Pay icons type - view and attributes', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icons_pay.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const expectedAttributes = [
      {
        'aria-label': 'PayM interactive',
        'data-group': 'm',
        color: 'icon-secondary-neutral',
        width: '21',
        height: '16',
        viewBox: '0 0 21 16',
        focusable: 'true',
      },
      {
        'aria-label': 'PayL interactive',
        'data-group': 'l',
        color: 'icon-secondary-neutral',
        width: '32',
        height: '24',
        viewBox: '0 0 32 24',
        focusable: 'true',
      },
      {
        'aria-label': 'AmericanExpressM non interactive',
        'data-group': 'm',
        width: '21',
        height: '16',
        viewBox: '0 0 21 16',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
      {
        'aria-label': 'AmericanExpressL non interactive',
        'data-group': 'l',
        width: '32',
        height: '24',
        viewBox: '0 0 32 24',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
    ];

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Regular icons type - view and attributes', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icons_regular.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const expectedAttributes = [
      {
        'aria-label': 'Icon RegularM Interactive',
        'data-group': 'm',
        color: 'icon-secondary-neutral',
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        focusable: 'true',
      },
      {
        'aria-label': 'Icon RegularL Interative',
        'data-group': 'l',
        color: 'icon-secondary-neutral',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        focusable: 'true',
      },
      {
        'aria-label': 'Icon ColoredM Non Interactive',
        'data-group': 'm',
        color: 'text-critical',
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
      {
        'aria-label': 'Icon ColoredL Non Interactive',
        'data-group': 'l',
        color: 'text-critical',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
    ];

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Colored icons type - view and attributes', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icons_color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const expectedAttributes = [
      {
        'aria-label': 'ColorM interactive',
        'data-group': 'm',
        color: 'icon-secondary-neutral',
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        focusable: 'true',
      },
      {
        'aria-label': 'ColorL interactive',
        'data-group': 'l',
        color: 'icon-secondary-neutral',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        focusable: 'true',
      },
      {
        'aria-label': 'AmazonM non interactive',
        'data-group': 'm',
        width: '16',
        height: '16',
        viewBox: '0 0 16 16',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
      {
        'aria-label': 'AmazonL non interactive',
        'data-group': 'l',
        width: '24',
        height: '24',
        viewBox: '0 0 24 24',
        'aria-hidden': 'true',
        tabindex: '-1',
      },
    ];

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Platform icons type - view and attributes', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icons_platform.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);

      await expect(svg).toHaveAttribute('width', '24');
      await expect(svg).toHaveAttribute('height', '24');
      await expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      await expect(svg).toHaveAttribute('focusable', 'true');
      await expect(svg).toHaveAttribute('tabindex', '0');

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });

  test('Verify Custom icons type - view and attributes', async ({ page }) => {
    const standPath = 'stories/components/icon/tests/examples/icon_with_custom_size_color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const expectedAttributes = [
      {
        'aria-label': 'icon with size 22',
        color: 'green',
        width: '22',
        height: '22',
        viewBox: '0 0 22 22',
        tabindex: '-1',
      },
      {
        'aria-label': 'icon with size 55',
        color: 'green',
        width: '55',
        height: '55',
        viewBox: '0 0 55 55',
        tabindex: '-1',
      },
    ];

    const svgs = await page.locator('svg');
    const count = await svgs.count();

    expect(count).toBe(expectedAttributes.length);

    for (let i = 0; i < count; i++) {
      const svg = svgs.nth(i);
      const attrs = expectedAttributes[i];

      for (const [key, value] of Object.entries(attrs)) {
        await expect(svg).toHaveAttribute(key, value);
      }

      const tagName = await svg.evaluate((el) => el.tagName.toLowerCase());
      expect(tagName).toBe('svg');
    }
  });
});
