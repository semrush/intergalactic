import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Widget empty', () => {
  test('Verify WE inside card without actions renders and have correct attributes', async ({
    page,
  }) => {
    const standPath = 'stories/components/widget-empty/docs/examples/custom-examples.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstWidgetEmpty = page.locator('div[data-ui-name="WidgetEmpty"]').first();
    await expect(firstWidgetEmpty).toHaveAttribute('role', 'status');
    await expect(firstWidgetEmpty).not.toHaveAttribute('aria-label');

    const imageContainer = page.locator('div.___SImage_1jkvg_gg_').first();
    const imageElement = imageContainer.locator('img');
    await expect(imageContainer).toHaveAttribute('aria-hidden', 'true');
    await expect(imageElement).toHaveAttribute('alt', '');

    await expect(page).toHaveScreenshot();
  });

  test('Verify WE inside card with actions renders', async ({ page }) => {
    const standPath = 'stories/components/widget-empty/docs/examples/custom_examples_actions.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await expect(page.locator('data-ui-name="Button"')).toBeFocused();
  });

  test('Verify WE with different states', async ({ page }) => {
    const standPath = 'stories/components/widget-empty/tests/examples/widget-empty-states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify WE with text or description and link', async ({ page }) => {
    const standPath = 'stories/components/widget-empty/tests/examples/widget-empty-withlink.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });

  test('Verify WE with text or description and controls', async ({ page }) => {
    const standPath =
      'stories/components/widget-empty/tests/examples/widget-empty-with-controls.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Error', () => {
  test('Verify VE Error renders and has correct attributes', async ({ page }) => {
    const standPath = 'stories/components/widget-empty/docs/examples/error_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstWidgetEmpty = page.locator('div[data-ui-name="WidgetError"]').first();
    await expect(firstWidgetEmpty).toHaveAttribute('role', 'status');
    await expect(firstWidgetEmpty).not.toHaveAttribute('aria-label');

    const imageContainer = page.locator('div.___SImage_1jkvg_gg_').first();
    const imageElement = imageContainer.locator('img');
    await expect(imageContainer).toHaveAttribute('aria-hidden', 'true');
    await expect(imageElement).toHaveAttribute('alt', '');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Reload page' }).first()).toBeFocused();

    //this doesnt work on ff - the  tab not focuses the link
    // await page.keyboard.press('Tab');
    // await expect(page.getByRole('link', { name: 'mail@semrush.com' })).toBeFocused();
    // await page.keyboard.press('Tab');
    // await expect(page.getByRole('button', { name: 'Reload page' }).last()).toBeFocused();
  });
});

test.describe('NoData', () => {
  test('Verify VE Nodata renders and has correct attributes', async ({ page }) => {
    const standPath = 'stories/components/widget-empty/docs/examples/nodata_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const firstWidgetEmpty = page.locator('div[data-ui-name="WidgetNoData"]').first();
    await expect(firstWidgetEmpty).toHaveAttribute('role', 'status');
    await expect(firstWidgetEmpty).not.toHaveAttribute('aria-label');

    const imageContainer = page.locator('div.___SImage_1jkvg_gg_').first();
    const imageElement = imageContainer.locator('img');
    await expect(imageContainer).toHaveAttribute('aria-hidden', 'true');
    await expect(imageElement).toHaveAttribute('alt', '');

    await expect(page).toHaveScreenshot();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Clear filters' })).toBeFocused();
  });
});
