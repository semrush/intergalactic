import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Tooltip', () => {
  test('Opens on mouse hover', async ({ page }) => {
    const standPath = 'website/docs/components/tooltip/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('text=Keywords');
    const triggerRect = (await trigger.boundingBox())!;

    await page.mouse.move(
      triggerRect.x + triggerRect.width / 2,
      triggerRect.y + triggerRect.height / 2,
      {
        steps: 5,
      },
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(page).toHaveScreenshot();
  });

  test('Opens on keyboard focus', async ({ page }) => {
    const standPath = 'website/docs/components/tooltip/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(page).toHaveScreenshot();
  });

  test('Renders correctly', async ({ page }) => {
    const standPath = 'semcore/tooltip/__tests__/stands/basic-render.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Renders correctly with warning theme', async ({ page }) => {
    const standPath = 'semcore/tooltip/__tests__/stands/warning-theme.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Renders correctly with invert theme', async ({ page }) => {
    const standPath = 'semcore/tooltip/__tests__/stands/invert-theme.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Renders correctly with changed color for arrow', async ({ page }) => {
    const standPath = 'semcore/tooltip/__tests__/stands/changed-arrow-color.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });
});
