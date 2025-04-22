import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Styles', () => {
  test('Verify default divider styles', async ({ page }) => {
    const standPath = 'stories/components/divider/docs/examples/divider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const divider = page.locator('[data-ui-name="Divider"]');

    const height = await divider.evaluate((el) => getComputedStyle(el).height);
    const width = await divider.evaluate((el) => getComputedStyle(el).width);
    const color = await divider.evaluate((el) => getComputedStyle(el).backgroundColor);

    expect(height).toBe('1px');
    expect(width).toBe('200px');
    expect(color).toBe('rgb(196, 199, 207)');
    await expect(divider).toHaveAttribute('orientation', 'horizontal');

    await expect(page).toHaveScreenshot();
  });

  test('Verify styles when use and theme props set', async ({ page }) => {
    const standPath = 'stories/components/divider/tests/examples/use-theme-variations.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const dividers = page.locator('[data-ui-name="Divider"]');

    const count = await dividers.count();

    for (let i = 0; i < 2; i++) {
      const style = await dividers.nth(i).getAttribute('style');
      expect(style).not.toContain('default');
      expect(style).not.toContain('invert');
      await expect(dividers.nth(i)).toHaveAttribute('orientation', 'horizontal');
    }

    for (let i = 2; i < 4; i++) {
      const style = await dividers.nth(i).getAttribute('style');
      expect(style).toContain('default');
      await expect(dividers.nth(i)).toHaveAttribute('orientation', 'horizontal');
    }

    for (let i = 4; i < 6; i++) {
      const style = await dividers.nth(i).getAttribute('style');
      expect(style).toContain('invert');
      await expect(dividers.nth(i)).toHaveAttribute('orientation', 'horizontal');
    }

    for (let i = 6; i < 8; i++) {
      const style = await dividers.nth(i).getAttribute('style');
      expect(style).toContain('c33909');
      await expect(dividers.nth(i)).toHaveAttribute('orientation', 'horizontal');
    }

    await expect(page).toHaveScreenshot();
  });

  test('Verify styles when orientation use and theme props set', async ({ page }) => {
    const standPath =
      'stories/components/divider/tests/examples/orientation-use-theme-variations.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const flex = page.locator('[data-ui-name="Flex"]');
    const dividersHorizontal = flex.first().locator('[data-ui-name="Divider"]');
    const dividersVertical = flex.nth(1).locator('[data-ui-name="Divider"]');

    const count1 = await dividersHorizontal.count();
    const count2 = await dividersVertical.count();

    for (let i = 0; i < count1; i++) {
      await expect(dividersHorizontal.nth(i)).toHaveAttribute('orientation', 'horizontal');
    }

    for (let i = 0; i < count1; i++) {
      await expect(dividersVertical.nth(i)).toHaveAttribute('orientation', 'vertical');
    }

    await expect(page).toHaveScreenshot();
  });

  test('Verify renders in the middle of the content', async ({ page }) => {
    const standPath = 'stories/components/divider/tests/examples/render-in-center.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Attributes and interactions', () => {
  test('Verify styles when orientation use and theme props set', async ({ page }) => {
    const standPath =
      'stories/components/divider/tests/examples/orientation-use-theme-variations.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const flex = page.locator('[data-ui-name="Flex"]');
    const dividersHorizontal = flex.first().locator('[data-ui-name="Divider"]');
    const dividersVertical = flex.nth(1).locator('[data-ui-name="Divider"]');

    const count1 = await dividersHorizontal.count();
    const count2 = await dividersVertical.count();

    for (let i = 0; i < count1; i++) {
      await expect(dividersHorizontal.nth(i)).toHaveAttribute('role', 'separator');
      await expect(dividersHorizontal.nth(i)).toHaveAttribute('aria-orientation', 'horizontal');
    }

    for (let i = 0; i < count2; i++) {
      await expect(dividersVertical.nth(i)).toHaveAttribute('role', 'separator');
      await expect(dividersVertical.nth(i)).toHaveAttribute('aria-orientation', 'vertical');
    }
  });

  test('Verify not interactive element', async ({ page }) => {
    const standPath = 'stories/components/divider/docs/examples/divider.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    const dividers = page.locator('[data-ui-name="Divider"]');

    await expect(dividers).not.toBeFocused();
  });
});

test.describe('Complex examples', () => {
  test('Verify horizontal divider renders in complex examples', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify vertical divider renders in complex examples', async ({ page }) => {
    const standPath =
      'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});
