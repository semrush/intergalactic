import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';
import { expect, test } from '@semcore/testing-utils/playwright';

test.describe('Visuals', () => {
  const variables = [
    { trim: 'end', maxLine: 1, tooltip: true },
    { trim: 'end', maxLine: undefined, tooltip: false },
    { trim: 'end', maxLine: 2, tooltip: undefined },
    { trim: 'end', maxLine: 4, tooltip: true },
    { trim: 'middle', maxLine: 1, tooltip: true },
    { trim: 'middle', maxLine: 3, tooltip: false },
  ];
  variables.forEach((item) => {
    test(`Verify Ellipsis in Text with trimType = ${item.trim} maxLine=${item.maxLine} and tooltip=${item.tooltip}`, async ({ page }) => {
      const standPath = 'stories/components/ellipsis/docs/examples/advanced_use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const ellipsisContent = page.locator('[data-ui-name="Ellipsis.Content"]');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      if (item.tooltip !== false) {
        await page.getByRole('tooltip').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot();
      } else {
        await expect(page).toHaveScreenshot();
      }
    });

    test(`Verify Ellipsis in Link with trimType = ${item.trim} maxLine=${item.maxLine} and tooltip=${item.tooltip}`, async ({ page }) => {
      const standPath = 'stories/components/ellipsis/docs/examples/basic_usage.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const ellipsisContent = page.getByRole('link');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      if (item.tooltip !== false && item.maxLine !== 4) {
        await page.getByRole('tooltip').waitFor({ state: 'visible' });
        await expect(page.getByRole('tooltip')).toHaveCount(1);
        await expect(page).toHaveScreenshot();
      } else {
        await expect(page.getByRole('tooltip')).toHaveCount(0);
        await expect(page).toHaveScreenshot();
      }
      // Focus on link doesnt work and ellipsis will not shown in this implementation
    });
  });

  const variablesTrim = [
    { trim: 'end' },
    { trim: 'middle' },
  ];
  variablesTrim.forEach((item) => {
    test(`Verify Ellipsis position with cursor anchoring with trimType = ${item.trim} `, async ({ page }) => {
      const standPath = 'stories/components/ellipsis/docs/examples/tooltip-cursor-anchoring.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      const ellipsisContent = page.locator('[data-ui-name="Ellipsis.Content"]');
      const box = await ellipsisContent.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width - 2, box.y + box.height / 2);
        await page.getByRole('tooltip').waitFor({ state: 'visible' });
        await expect(page.getByRole('tooltip')).toHaveCount(1);

        await expect(page).toHaveScreenshot();
      }
    });

    test(`Verify Ellipsis in table cell with Text and trimType = ${item.trim} `, async ({ page }) => {
      const standPath = 'stories/components/ellipsis/docs/examples/multiple_use.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page.getByRole('tooltip')).toHaveCount(0);

      const ellipsisContent = page.locator('[data-ui-name="Tooltip"]');
      const box = await ellipsisContent.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      await page.getByRole('tooltip').waitFor({ state: 'visible' });
      await expect(page.getByRole('tooltip')).toHaveCount(1);
    });

    test(`Verify Ellipsis in table cell with Link and trimType = ${item.trim} `, async ({ page }) => {
      const standPath = 'stories/components/ellipsis/test/examples/in_table_with_link.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en', item);

      await page.setContent(htmlContent);

      await expect(page.getByRole('tooltip')).toHaveCount(0);

      const ellipsisContent = page.locator('[data-ui-name="Tooltip"]');
      const box = await ellipsisContent.first().boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      }

      await page.getByRole('tooltip').waitFor({ state: 'visible' });
      await expect(page.getByRole('tooltip')).toHaveCount(1);

      await expect(page).toHaveScreenshot();

      const tablerow = page.locator('[role="row"][aria-rowindex="2"]');
      const tableCell = tablerow.getByRole('gridcell');
      const boxCell = await tableCell.nth(1).boundingBox();
      if (boxCell) {
        await page.mouse.move(boxCell.x + boxCell.width / 2, boxCell.y + boxCell.height / 2);
      }
      await page.getByRole('tooltip').waitFor({ state: 'hidden' });
      await expect(page.getByRole('tooltip')).toHaveCount(0);

      const boxLast = await ellipsisContent.last().boundingBox();
      if (boxLast) {
        await page.mouse.move(boxLast.x + boxLast.width / 2, boxLast.y + boxLast.height / 2);
      }
      await expect(page.getByRole('tooltip')).toHaveCount(0);
    });
  });
});

test.describe('Functional', () => {
  test('Verify multiple tags in one component', async ({ page }) => {
    const standPath =
      'stories/components/ellipsis/test/examples/multiple_tags_in_one_components.tsx';
    const htmlContent = await e2eStandToHtml(standPath, 'en');
    await page.setContent(htmlContent);

    const text = page.locator('[data-ui-name="Text"]');
    const tagNameButton = await text.evaluate((el) => el.tagName.toLowerCase());
    expect(tagNameButton).toBe('h2');

    const boxLast = await text.boundingBox();
    if (boxLast) {
      await page.mouse.move(boxLast.x + boxLast.width / 2, boxLast.y + boxLast.height / 2);
    }
    await page.getByRole('tooltip').waitFor({ state: 'visible' });
    await expect(page.getByRole('tooltip')).toHaveCount(1);
  });
});
