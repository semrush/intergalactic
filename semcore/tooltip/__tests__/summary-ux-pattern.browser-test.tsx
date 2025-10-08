import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  test('Verify Default summary', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/summary/docs/examples/default-summary-example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const link = page.getByRole('link');
    const descriptionTooltip = page.getByRole('dialog');

    await test.step('Verify focus on tooltip trigger amd link hover', async () => {
      await page.getByLabel('Loading…').nth(1).waitFor({ state: 'hidden' });

      await page.keyboard.press('Tab');
      await link.nth(1).hover();

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Description tooltip opened', async () => {
      await page.keyboard.press('Space');
      await descriptionTooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify loading state', async () => {
      await page.keyboard.press('Escape');
      await descriptionTooltip.waitFor({ state: 'hidden' });
      await page.getByRole('button').nth(3).click();
      await page.getByLabel('Loading…').nth(1).waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Summary with error', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-error.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const button = page.getByRole('button');
    const descriptionTooltip = page.getByRole('dialog');
    const image = page.locator('[data-ui-name="Hint"]');

    await test.step('Verify focus on tooltip trigger amd link hover', async () => {
      await page.keyboard.press('Tab');
      await button.nth(1).hover();

      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Description tooltip and Hint opened', async () => {
      await page.keyboard.press('Space');
      await descriptionTooltip.waitFor({ state: 'visible' });
      await expect(image.first()).toHaveAttribute('aria-hidden', 'false');
      await expect(image.first()).toHaveAttribute('disabled');
      await expect(image.first()).toHaveAttribute('tabindex', '-1');
      await expect(image.first()).toHaveAttribute('data-name', 'Warning');
      await expect(image.first()).toHaveAttribute('color', 'icon-secondary-neutral');

      const box = await image.nth(2).boundingBox();

      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }
      await page.getByText('Something went wrong').waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify Summary with minitrends', async ({ page }) => {
    const standPath = 'stories/patterns/ux-patterns/summary/docs/examples/summary-with-minitrend.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const link = page.getByRole('link');
    const descriptionTooltip = page.getByRole('dialog');

    await test.step('Verify focus on tooltip trigger amd link hover', async () => {
      await page.keyboard.press('Tab');
      await link.nth(1).hover();
      await expect(page).toHaveScreenshot();
    });

    await test.step('Verify Description tooltip and Hint opened', async () => {
      await page.getByRole('button').nth(1).click();
      await descriptionTooltip.waitFor({ state: 'visible' });
      await expect(page).toHaveScreenshot();
    });
  });
});
