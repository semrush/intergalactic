import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

test.describe('DataTable', () => {
  test('Renders correctly', async ({ page }) => {
    const standPath = 'website/docs/table-group/data-table/examples/base.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);

    await expect(page).toHaveScreenshot();
  });

  test('Renders correctly with scroll if some columns are fixed', async ({ page }) => {
    const standPath = 'semcore/data-table/__tests__/stands/scroll-and-fixed-column.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 820, height: 500 });

    await expect(page).toHaveScreenshot();
  });

  test('Hover of grouped rows', async ({ page }) => {
    const standPath = 'website/docs/table-group/data-table/examples/rows-merging.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');

    await page.setContent(htmlContent);
    await page.setViewportSize({ width: 820, height: 500 });

    const cell1Locator = page.locator(
      '[data-ui-name="DefinitionTable.Body"] [data-ui-name="Flex"]',
    );
    const cell2Locator = page.locator(
      '[data-ui-name="DefinitionTable.Body"] [data-ui-name="group-cell"] [data-ui-name="Flex"]',
    );

    const cell1List = await cell1Locator.all();
    const cell2List = await cell2Locator.all();

    const cell1Box = await cell1List[0]?.boundingBox();
    const cell2Box = await cell2List[0]?.boundingBox();

    if (cell1Box) {
      await page.mouse.move(cell1Box.x + 10, cell1Box.y + 10);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await expect(page).toHaveScreenshot();
    }

    if (cell2Box) {
      await page.mouse.move(cell2Box.x + 10, cell2Box.y + 10);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await expect(page).toHaveScreenshot();
    }
  });
});
