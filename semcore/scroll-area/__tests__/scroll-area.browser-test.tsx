import { expect, Page, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('ScrollArea', () => {
  test('Scrolls with keyboard', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await page.keyboard.press('Tab');
    await page.keyboard.press('ArrowDown');

    await new Promise((resolve) => setTimeout(resolve, 2000));

    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.03 });
  });

  // Указываем селектор контейнера, в котором происходит скролл
  const containerSelector = '[data-ui-name="ScrollArea"]';
  const childSelector = '[data-ui-name="ScrollArea.Container"]';

  // Проверяем, что элементы имеют корректные атрибуты
  async function checkAttributes(page: Page) {
    const container = await page.locator(containerSelector);

    const child = await page.locator(childSelector);
    await expect(child).toHaveAttribute('tabindex', '0');
  }

  test('mouse scroll works inside container', async ({ page }) => {
    const standPath = 'stories/components/scroll-area/docs/examples/basic_usage.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await checkAttributes(page);

    const container = await page.locator(containerSelector);
    const scrollHeight = await container.evaluate((el) => el.scrollHeight);
    const clientHeight = await container.evaluate((el) => el.clientHeight);

    //console.log({ scrollHeight, clientHeight });
    // Получаем начальное положение скролла
    const initialScrollTop = await container.evaluate((el) => el.scrollTop);

    // Симулируем скролл колесиком мыши
    await container.hover();
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.03 });
  });
});
