import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('Dropdown-menu', () => {
  test('Should render white shadows in list', async ({ page }) => {
    const standPath = 'website/docs/components/dropdown-menu/examples/the_second_method.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    const ddMenu = await page.locator('#dropdown-menu-children-items');

    await ddMenu.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();

    await page.keyboard.press('ArrowDown');
    await expect(page).toHaveScreenshot();
  });
});
