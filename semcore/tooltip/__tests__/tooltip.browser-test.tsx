import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { resolve as resolvePath } from 'path';

test.describe('Tooltip', () => {
  test('Opens on mouse hover', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/components/tooltip/examples/tooltip.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const trigger = await page.locator('text=Trigger');
    const triggerRect = (await trigger.boundingBox())!;

    await page.mouse.move(
      triggerRect.x + triggerRect.width / 2,
      triggerRect.y + triggerRect.height / 2,
    );

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(page).toHaveScreenshot();
  });

  test('Opens on keyboard focus', async ({ page }) => {
    const standPath = resolvePath(
      __dirname,
      '../../../website/docs/components/tooltip/examples/tooltip.tsx',
    );
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    await expect(page).toHaveScreenshot();
  });
});
