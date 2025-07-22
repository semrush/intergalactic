import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const breakpoints = [
    { width: 320 },
    { width: 768 },
    { width: 1280 },
    { width: 1920 },
  ];

  breakpoints.forEach(({ width }) => {
    test(`Verify base example looks good on screen width ${width}px`, async ({ page }) => {
      const standPath = 'stories/components/product-head/docs/examples/extended_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await page.setViewportSize({ width, height: 800 });
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify looks good when long long title', async ({ page }) => {
    const standPath = 'stories/components/product-head/advanced/examples/long-long-title.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify renders when single items used', async ({ page }) => {
    const standPath = 'stories/components/product-head/tests/examples/test_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify focus by keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/product-head/docs/examples/extended_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Breadcrumbs.Item"]').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="ButtonLink"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Button"]').first()).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="Select"]').first()).toBeFocused();

    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'visible' });
    await page.keyboard.press('Space');
    await page.locator('[data-ui-name="Select.Option"]').first().waitFor({ state: 'hidden' });
    await expect(page.locator('[data-ui-name="Select"]').first()).toBeFocused();
    await expect(page.locator('[data-ui-name="Select"]').first()).toHaveAttribute('value', 'us');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Trigger"]').first()).toBeFocused();
    await page.keyboard.press('Space');

    await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'visible' });
    await expect(page.locator('[data-ui-name="DescriptionTooltip.Popper"]')).toBeFocused();
    await page.keyboard.press('Escape');

    await page.locator('[data-ui-name="DescriptionTooltip.Popper"]').waitFor({ state: 'hidden' });
    await page.keyboard.press('Shift+Tab');
    await expect(page.locator('[data-ui-name="Select"]').nth(1)).toBeFocused();
  });
});
