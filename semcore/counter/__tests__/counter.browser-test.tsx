import { platform } from 'os';

import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variables = [
    { theme: 'warning', size: 'm' },
    { theme: 'danger', size: 'm' },
    { theme: 'info', size: 'm' },
    { theme: 'warning', size: 'l' },
    { theme: 'danger', size: 'l' },
    { theme: 'info', size: 'l' },
  ];
  variables.forEach((item) => {
    test(`Verify Counter with size= ${item.size} and theme = ${item.theme}`, async ({ page }) => {
      const standPath = 'stories/components/counter/tests/examples/counter.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify counter in filters', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_filters.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.waitForSelector('text="500"');
    await expect(page).toHaveScreenshot();

    await page.locator('[data-ui-name="FilterTrigger.TriggerButton"]').click();
    await page.locator('[data-ui-name="Dropdown.Popper"]').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify counter in dots', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_dot.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.locator('[data-ui-name="Button"]').first().waitFor({ state: 'visible' });
    await page.waitForSelector('text="18"');
    await expect(page).toHaveScreenshot();
  });

  test('Verify counter in buttons', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_button.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.locator('[data-ui-name="Button"]').first().waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify counter in forms', async ({ page }) => {
    const standPath = 'stories/components/counter/docs/examples/counter_in_forms.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.locator('[data-ui-name="Textarea"]').click();
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('As the design guide recommends, the counter changes color to orange shortly before the limit is reached, and then to red when the limit is exceeded.', { delay: 10 });
    await expect(page).toHaveScreenshot();

    await page.keyboard.type('As the design', { delay: 10 });
    await expect(page).toHaveScreenshot();
  });
});
