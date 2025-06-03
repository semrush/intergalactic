import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Checkbox states and styles', () => {
  test('Verify all checkbox states', async ({ page }) => {
    const standPath = 'stories/components/checkbox/tests/examples/states.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const defaultFlex = page.locator('[data-testid="default"]');
    await test.step('Verify checkbox default states', async () => {

      //verify L chackbox styles
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(2)).toHaveCSS('height', '20px');
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(2)).toHaveCSS('width', '20px');
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(2)).toHaveCSS('margin-left', '8px');
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(2)).toHaveCSS('font-size', '16px');

         //verify M chackbox styles
         await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(3)).toHaveCSS('height', '16px');
         await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(3)).toHaveCSS('width', '16px');
         await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(3)).toHaveCSS('margin-left', '8px');
         await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(3)).toHaveCSS('font-size', '14px');
   

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); 
    await page.keyboard.press('Tab');     
    await expect(page).toHaveScreenshot();
  });

  await test.step('Verify checkbox checked ctates', async () => {

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');  
    await page.keyboard.press('Tab');    
    await expect(page).toHaveScreenshot();
  });

  await test.step('Verify checkbox indeterminate ctates', async () => {

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');  
    await page.keyboard.press('Tab');    
    await expect(page).toHaveScreenshot();
  });
  });

  test('Verify all checkbox group styles', async ({ page }) => {
    const standPath = 'stories/components/checkbox/tests/examples/groups.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    const defaultFlex = page.locator('[data-testid="default"]');
    await test.step('Verify checkbox default states', async () => {

      //verify L chackbox styles
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(2)).toHaveCSS('height', '20px');
      await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(2)).toHaveCSS('width', '20px');
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(2)).toHaveCSS('margin-left', '8px');
      await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(2)).toHaveCSS('font-size', '16px');

         //verify M chackbox styles
         await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(3)).toHaveCSS('height', '16px');
         await expect(defaultFlex.locator('[data-ui-name="Value.CheckMark"]').nth(3)).toHaveCSS('width', '16px');
         await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(3)).toHaveCSS('margin-left', '8px');
         await expect(defaultFlex.locator('[data-ui-name="Checkbox.Text"]').nth(3)).toHaveCSS('font-size', '14px');
   

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); 
    await page.keyboard.press('Tab');     
    await expect(page).toHaveScreenshot();
  });

  await test.step('Verify checkbox checked ctates', async () => {

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');  
    await page.keyboard.press('Tab');    
    await expect(page).toHaveScreenshot();
  });

  await test.step('Verify checkbox indeterminate ctates', async () => {

    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');  
    await page.keyboard.press('Tab');    
    await expect(page).toHaveScreenshot();
  });
  });
});
