import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Link', () => {
  test('Verify default link styles when links inside the text', async ({ page }) => {
    const standPath =
      'stories/components/link/tests/examples/link_inside_the_content-with_enable_visited.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await test.step('Verify links styles active disabled and normal', async () => {
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify inline props', async () => {
      const inlineTrue = page.locator('[data-testid="Inline-true"]');
      const inlineFalse = page.locator('[data-testid="Inline-false"]')

      await expect(inlineTrue).toHaveClass(/inline/);
      await expect(inlineFalse).not.toHaveClass(/inline/);
    });
  });

  test('Verify colored link styles', async ({ page }) => {
    const standPath = 'stories/components/link/docs/examples/color_links.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const links = page.locator('[data-ui-name="Link"]');
    await test.step('Verify colored links styles focused and hovered', async () => {
      await page.keyboard.press('Tab');
      await links.nth(1).hover();

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify disabled link', async ({ page }) => {
    const standPath = 'stories/components/link/docs/examples/link_disabled.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const links = page.locator('[data-ui-name="Link"]');
    await test.step('Verify colored links styles focused and hovered', async () => {
      await page.keyboard.press('Tab');
      await expect(links).not.toBeFocused();
      await expect(links).toHaveAttribute('tabindex', '-1');
      await expect(links.first()).toHaveCSS('color', 'rgb(0, 109, 202)');
      await expect(links.first()).toHaveCSS('opacity', '0.3');

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Links without text mouse interactions', async ({ page, browserName }) => {
    const standPath = 'stories/components/link/docs/examples/link_without_text.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const links = page.locator('[data-ui-name="Link"]');

    await expect(links.first()).toHaveCSS('color', 'rgb(0, 109, 202)');
    await expect(links.nth(1)).toHaveCSS('color', 'rgb(0, 109, 202)');

    await links.first().hover();
    await page.waitForSelector('text="Home page"');
    if (browserName !== 'firefox') {
      await expect(links.first()).toHaveCSS('color', 'rgb(4, 71, 146)');
      await expect(links.nth(1)).toHaveCSS('color', 'rgb(0, 109, 202)');
    }
    await expect(page).toHaveScreenshot();

    await links.nth(1).hover();
    await page.waitForSelector('text="Go to the next page"');
    await expect(links.first()).toHaveCSS('color', 'rgb(0, 109, 202)');
    await expect(links.nth(1)).toHaveCSS('color', 'rgb(4, 71, 146)');
  });

  test('Verify Links without text keyboard interactions', async ({ page }) => {
    const standPath = 'stories/components/link/docs/examples/link_without_text.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const links = page.locator('[data-ui-name="Link"]');

    await page.keyboard.press('Tab');
    await page.waitForSelector('text="Home page"');
    await expect(links.first()).toHaveCSS('color', 'rgb(0, 109, 202)');
    await expect(links.nth(1)).toHaveCSS('color', 'rgb(0, 109, 202)');

    await page.keyboard.press('Tab');
    await page.waitForSelector('text="Go to the next page"');
    await expect(links.first()).toHaveCSS('color', 'rgb(0, 109, 202)');
    await expect(links.nth(1)).toHaveCSS('color', 'rgb(4, 71, 146)');
    await expect(page).toHaveScreenshot();
  });

  test('Verify links sizes', async ({ page }) => {
    const standPath = 'stories/components/link/tests/examples/sizes.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const links = page.locator('[data-ui-name="Link"]');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await expect(page).toHaveScreenshot();
  });

  test('Verify links with addons', async ({ page }) => {
    const standPath = 'stories/components/link/tests/examples/icons_in_links.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const links = page.locator('[data-ui-name="Link"]');
    await page.keyboard.press('Tab');
    await links.nth(4).hover();
    await expect(page).toHaveScreenshot();
    const addons = links.nth(6).locator('[data-ui-name="Link.Addon"]');
    await expect(addons.first()).toHaveCSS('margin-right', '4px');
    await expect(addons.nth(1)).toHaveCSS('margin-left', '4px');
  });

  test('Verify link with ellipsis', async ({ page }) => {
    const standPath = 'stories/components/link/docs/examples/links_with_ellipsis.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});
