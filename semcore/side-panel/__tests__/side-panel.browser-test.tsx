import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visual', () => {
  const variablesPlacement = [
    { placement: 'top' },
    { placement: 'bottom' },
    { placement: 'left' },
    { placement: 'right' },
  ];

  variablesPlacement.forEach((item) => {
    test(`Verify Base example looks good in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const button = page.getByRole('button');
      await button.click();
      await page.waitForSelector('text="Close"'); // actually this is bug UIK-3926 but added for test

      await expect(page).toHaveScreenshot();
    });
  });

  variablesPlacement.forEach((item) => {
    test(`Verify Side panel with Header and Footer looks good in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/advanced_example.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text="Close"');

      await expect(page).toHaveScreenshot();
    });
  });

  variablesPlacement.forEach((item) => {
    test(`Verify Internal component inside positioned correclty in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const button = page.getByRole('button');
      await button.click();
      await button.hover();
      await page.waitForSelector('text="Close"');

      await expect(page).toHaveScreenshot();
    });
  });

  variablesPlacement.forEach((item) => {
    test(`Verify Side panel with disabled overlay in each placement = ${item.placement}`, async ({ page }) => {
      const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      await page.waitForSelector('text="Close"');

      await expect(page).toHaveScreenshot();
    });
  });

  test('Verify No Close button when no SidePanel.Close and closable = false', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/basic_example.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });

  test('Verify Close button shown when SidePanel.Close and closable = false', async ({ page }) => {
    const standPath = 'stories/components/side-panel/docs/examples/access_to_internal_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en', { closable: false });

    await page.setContent(htmlContent);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await page.getByRole('dialog').waitFor({ state: 'visible' });
    await expect(page).toHaveScreenshot();
  });
});

test.describe('Functional', () => {

});
