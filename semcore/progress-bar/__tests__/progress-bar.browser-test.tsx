import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variables = [
    { theme: 'invert', size: 's' },
    { theme: 'dark', size: 'm' },
    { theme: 'violet-100', size: 'l' },
  ];
  variables.forEach((item) => {
    test(`Verify progress bar customization with size= ${item.size}  and theme= e= ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/progress-bar/tests/examples/customizing_the_bar1.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesProgressValue = [
    { value: 0, size: 's' },
    { value: 110, size: 'm' },
    { value: 50, size: 'l' },
  ];
  variablesProgressValue.forEach((item) => {
    test(`Verify progress bar customization with value= ${item.value}`, async ({ page }) => {
      const standPath = 'stories/components/progress-bar/tests/examples/customizing_the_bar1.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesValueValue = [
    { value: 0 },
    { value: 110 },
    { value: 50 },
  ];
  variablesValueValue.forEach((item) => {
    test(`Verify progress bar value customization with value= ${item.value}`, async ({ page }) => {
      const standPath = 'stories/components/progress-bar/tests/examples/customizing_the_value.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  const variablesValue = [
    { theme: 'invert', size: 's' },
    { theme: 'dark', size: 'm' },
    { theme: 'violet-100', size: 'l' },
  ];
  variablesValue.forEach((item) => {
    test(`Verify progress bar value customization with size= ${item.size} theme= ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/progress-bar/tests/examples/customizing_the_value.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify progress bar and value customization', async ({ page }) => {
    const standPath = 'stories/components/progress-bar/docs/examples/customizing_the_bar.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {
  test('Verify keyboard interactions and attributes', async ({ page }) => {
    const standPath = 'stories/components/progress-bar/docs/examples/basic-usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const progressBar = page.locator('[data-ui-name="ProgressBar"]');

    await test.step('Verify attributes', async () => {
      await expect(progressBar).toHaveAttribute('role', 'progressbar');
      await expect(progressBar).toHaveAttribute('value');
      await expect(progressBar).toHaveAttribute('aria-valuenow');
      await expect(progressBar).toHaveAttribute('aria-valuetext');
      await expect(progressBar).toHaveAttribute('aria-label', 'Basic ProgressBar example');
      await expect(progressBar).toHaveAttribute('tabindex', '0');
    });

    await test.step('Verify focus on ptogress bar by tab', async () => {
      await page.keyboard.press('Tab');
      await expect(progressBar).toBeFocused();
    });
  });
});
