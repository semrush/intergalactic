import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Styles', () => {
  test('Verify spin with correct sizes and right text', async ({ page }) => {
    const standPath = 'stories/components/spin/tests/examples/spin-sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
    const sizes = {
      xs: '16px',
      s: '20px',
      m: '24px',
      l: '32px',
      xl: '48px',
      xxl: '72px',
    };

    for (const [size, expectedPx] of Object.entries(sizes)) {
      const spinner = page.locator(`svg[class*="size_${size}"]`);

      await expect(spinner).toBeVisible();

      const height = await spinner.evaluate((el) => getComputedStyle(el).height);
      const width = await spinner.evaluate((el) => getComputedStyle(el).width);

      expect(height).toBe(expectedPx);
      expect(width).toBe(expectedPx);

      const style = await spinner.getAttribute('style');
      expect(style).toContain('dark');
    }
  });

  test('Verify spin with bottom text', async ({ page }) => {
    const standPath = 'stories/components/spin/tests/examples/spin-sizes-bottom-text.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Verify themes and default sizes', async ({ page }) => {
    const standPath = 'stories/components/spin/tests/examples/spin-theme.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const spinners = page.locator('svg');
    const styleDark = await spinners.first().getAttribute('style');
    expect(styleDark).toContain('dark');

    const styleInvert = await spinners.nth(1).getAttribute('style');
    expect(styleInvert).toContain('invert');

    const height = await spinners.nth(1).evaluate((el) => getComputedStyle(el).height);
    const width = await spinners.nth(1).evaluate((el) => getComputedStyle(el).width);

    expect(height).toBe('24px');
    expect(width).toBe('24px');
    await expect(page).toHaveScreenshot();
  });

  test('Verify custom themes and default sizes', async ({ page }) => {
    const standPath = 'stories/components/spin/tests/examples/spin-custom-theme.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const spinners = page.locator('svg');
    const styleFirst = await spinners.first().getAttribute('style');
    expect(styleFirst).toContain('blanchedalmond');

    const styleSecond = await spinners.nth(1).getAttribute('style');
    expect(styleSecond).toContain('3eeb4c');

    const styleThind = await spinners.nth(2).getAttribute('style');
    expect(styleThind).toContain('8649e1');

    await expect(page).toHaveScreenshot();
  });

  test('Verify spin box props', async ({ page }) => {
    const standPath = 'stories/components/spin/tests/examples/spin-box-props.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const spinners = page.locator('svg');

    const customWidth = await spinners.first().evaluate((el) => getComputedStyle(el).width);
    expect(customWidth).toBe('50px');

    const customHeight = await spinners.nth(1).evaluate((el) => getComputedStyle(el).height);
    expect(customHeight).toBe('50px');

    const customWidth1 = await spinners.nth(2).evaluate((el) => getComputedStyle(el).width);
    const customHeight1 = await spinners.nth(2).evaluate((el) => getComputedStyle(el).height);
    expect(customWidth1).toBe('50px');
    expect(customHeight1).toBe('50px');

    const margin = await spinners.nth(2).evaluate((el) => getComputedStyle(el).margin);
    expect(margin).toBe('16px');

    const padding = await spinners.nth(3).evaluate((el) => getComputedStyle(el).padding);
    expect(padding).toBe('16px');
  });
});

test.describe('Attributes', () => {
  test('Verify spin sttributes inside table', async ({ page }) => {
    const standPath = 'stories/components/spin/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const div = page.locator('div[role="status"][aria-live="polite"]');
    const svg = div.locator('svg');

    await expect(svg).toBeVisible();

    await expect(svg).toHaveAttribute('role', 'img');
    await expect(svg).toHaveAttribute('aria-label', 'Loading…');
    await expect(svg).toHaveAttribute('viewBox', '0 0 24 24');

    await page.locator('[data-ui-name="Button"]').click();
    await expect(svg).not.toBeVisible();
  });

  test('Verify default spin sttributes', async ({ page }) => {
    const standPath = 'stories/components/spin/tests/examples/spin-sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    const spinners = page.locator('svg');

    const spinnerCount = await spinners.count();
    for (let i = 0; i < spinnerCount; i++) {
      const spinner = spinners.nth(i);

      await expect(spinner).toHaveAttribute('aria-label', 'Loading…');
      await expect(spinner).toHaveAttribute('role', 'img');
    }
  });
});
