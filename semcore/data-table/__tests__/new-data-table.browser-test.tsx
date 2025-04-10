import { expect, test } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function getColumnWidth(page: any, colIndex: any) {
  const column = await page.locator(`[aria-colindex="${colIndex}"][role="columnheader"]`);
  const box = await column.boundingBox();
  return box ? box.width : 0;
}

const checkStyles = async (element: any, styles: Record<string, string>) => {
  for (const [property, value] of Object.entries(styles) as [string, string][]) {
    await expect(element).toHaveCSS(property, value);
  }
};

test.describe('DataTable', () => {
  test.describe('Base styles Primary Table', () => {
    test('Verify styles when no interactive elements in header', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/base.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const table = page.locator('[data-ui-name="DataTable"]');
      await expect(table).toBeVisible();

      const keywordHeader = page.locator('[data-ui-name="Head.Column"]').nth(0);
      const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

      await checkStyles(keywordHeader, {
        'font-size': '12px',
        'line-height': 'normal',
        color: 'rgb(25, 27, 35)',
        padding: '12px',
        'background-color': 'rgb(244, 245, 249)',
        'border-bottom': '1px solid rgb(224, 225, 233)',
      });

      await keywordHeader.hover();
      await expect(keywordHeader).toHaveCSS('background-color', 'rgb(244, 245, 249)');

      await checkStyles(firstCell, {
        'font-size': '14px',
        'border-bottom': '1px solid rgb(224, 225, 233)',
        color: 'rgb(25, 27, 35)',
        'background-color': 'rgb(255, 255, 255)',
        padding: '12px',
        'min-height': '45px',
      });

      await firstCell.hover();
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
    });

    test('Verify styles when long text and icons in header', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/header-content.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
      const amazonIcon = page.getByLabel('AmazonM non interactive').nth(1);
      await amazonIcon.hover();

      await expect(page.getByText('AmazonM non interactive')).toHaveCount(1);

      await page.locator('[data-ui-name="Ellipsis"]').hover();
      await expect(page.getByRole('tooltip', { name: 'Difficulty Difficulty' })).toHaveCount(1);

      const elements = page.locator('[data-ui-name="Head.Column"]');
      for (const element of await elements.all()) {
        const alignItems = await element.evaluate((el) => window.getComputedStyle(el).alignItems);
        expect(alignItems).toBe('flex-start');
      }
    });

    test('Verify styles of Compact table', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/compact.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const table = page.locator('[data-ui-name="DataTable"]');
      await expect(table).toBeVisible();

      const keywordHeader = page.locator('[data-ui-name="Head.Column"]').nth(0);
      const firstCell = page.getByRole('gridcell').first();

      await checkStyles(keywordHeader, {
        'font-size': '12px',
        'line-height': 'normal',
        color: 'rgb(25, 27, 35)',
        padding: '12px 8px',
        'background-color': 'rgb(244, 245, 249)',
        'border-bottom': '1px solid rgb(224, 225, 233)',
      });

      await checkStyles(firstCell, {
        'font-size': '14px',
        'border-bottom': '1px solid rgb(224, 225, 233)',
        'background-color': 'rgb(255, 255, 255)',
        color: 'rgb(25, 27, 35)',
        padding: '12px 8px', 
      });

      await firstCell.hover();
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
      await expect(page).toHaveScreenshot();
    });

    test('Verify styles of sorting button', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
      const buttonLink1 = column1.locator('button[data-ui-name="ButtonLink"]');
      await expect(buttonLink1).toHaveCSS('margin-left', '4px');
      //BUG! In playwright the header cell not focused!
      await page.keyboard.press('Tab');
      await expect(buttonLink1).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Enter');
      await expect(buttonLink1).toHaveCSS('margin-left', '4px');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Enter');
      await expect(page).toHaveScreenshot();
    });

    test('Verify Column width by default - auto', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/base.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const widths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

      expect(widths[1]).toBeLessThan(widths[0]);
      expect(widths[2]).toBeLessThan(widths[0]);
      expect(widths[1]).toBeLessThan(widths[3]);
      expect(widths[2]).toBeLessThan(widths[3]);
    });

    test('Verify Column width when 1fr', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/table-with-1tf-and diff-elements.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const widths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

      expect(widths[1]).toEqual(widths[0]);
      expect(widths[2]).toEqual(widths[0]);
      expect(widths[1]).toEqual(widths[3]);
      expect(widths[2]).toEqual(widths[3]);
    });
  });

  test.describe('Base styles Secondary Table', () => {
    test('Secondary Keyboard interactions', async ({ page, browserName }) => {
      const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const table = page.locator('[data-ui-name="DataTable"]');
      await expect(table).toBeVisible();

      await page.keyboard.press('Tab');

      const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

      await expect(firstCell).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowRight');

      const secondCell = page.locator('[role="gridcell"][aria-colindex="2"]').first();
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      const secondCellSecondRow = page.locator('[role="gridcell"][aria-colindex="2"]').nth(1);
      await expect(secondCellSecondRow).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(secondCell).not.toBeFocused();

      if(browserName==='firefox') return;
      await page.keyboard.press('Shift+Tab');
      await expect(secondCellSecondRow).toBeFocused();
    });

    test('Secondary styles', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const table = page.locator('[data-ui-name="DataTable"]');
      await expect(table).toBeVisible();

      const keywordHeader = page.locator('[data-ui-name="Head.Column"]').nth(0);
      const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

      await checkStyles(keywordHeader, {
        'font-size': '12px',
        'line-height': 'normal',
        color: 'rgb(25, 27, 35)',
        padding: '8px',
        'background-color': 'rgb(255, 255, 255)',
        'border-bottom': '1px solid rgb(169, 171, 182)',
      });

      await keywordHeader.hover();
      await expect(keywordHeader).toHaveCSS('background-color', 'rgb(255, 255, 255)');

      await checkStyles(firstCell, {
        'font-size': '14px',
        'border-bottom': '1px solid rgb(224, 225, 233)',
        color: 'rgb(25, 27, 35)',
        'background-color': 'rgb(255, 255, 255)',
        padding: '8px',
      });

      await firstCell.hover();
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('Tab');
      await expect(firstCell).toHaveCSS('background-color', 'rgb(240, 240, 244)');
    });

    test('Verify styles when long text and icons in header', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/secondary-header.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
      const amazonIcon = page.getByLabel('AmazonM non interactive').nth(1);
      await amazonIcon.hover();

      await expect(page.getByText('AmazonM non interactive')).toHaveCount(1);

      await page.locator('[data-ui-name="Ellipsis"]').hover();
      await expect(page.getByRole('tooltip', { name: 'Difficulty Difficulty' })).toHaveCount(1);

      const elements = page.locator('[data-ui-name="Head.Column"]');
      for (const element of await elements.all()) {
        const alignItems = await element.evaluate((el) => window.getComputedStyle(el).alignItems);
        expect(alignItems).toBe('flex-start');
      }
    });

    test('Verify sorting icon style and interactions ', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/secondary-sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await expect(page).toHaveScreenshot();
      const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
      const buttonLink1 = column1.locator('button[data-ui-name="ButtonLink"]');
      await column1.hover();
      await expect(column1).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect(buttonLink1).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await buttonLink1.hover();
      await expect(column1).toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect(buttonLink1).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await expect(buttonLink1).toBeFocused();
    });

    test('Verify Column width by default - auto', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const widths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

      expect(widths[1]).toBeLessThan(widths[0]);
      expect(widths[1]).toBeLessThanOrEqual(widths[2]);
      expect(widths[2]).toBeLessThan(widths[3]);
    });

    test('Verify Column width when 1fr', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/secondary-sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const widths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

      expect(widths[0]).toEqual(widths[1]);
      expect(widths[1]).toEqual(widths[2]);
      expect(widths[2]).toEqual(widths[3]);
    });
  });

  test.describe('Columns', () => {
    test('Verify alingnment props', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/column-alignment.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const checkAlignment = async (columnIndex: any, justifyContent: any, alignItems: any) => {
        const headerCell = page.locator(
          `[data-ui-name="Head.Column"][aria-colindex="${columnIndex}"]`,
        );

        if (justifyContent) {
          const justify = await headerCell.evaluate(
            (el) => window.getComputedStyle(el).justifyContent,
          );
          expect(justify).toBe(justifyContent);
        }

        if (alignItems) {
          const align = await headerCell.evaluate((el) => window.getComputedStyle(el).alignItems);
          expect(align).toBe(alignItems);
        }
      };

      await checkAlignment(2, 'center', null);
      await checkAlignment(3, 'flex-start', null);
      await checkAlignment(4, 'flex-end', null);

      await checkAlignment(5, null, 'center');
      await checkAlignment(6, null, 'flex-end');
      await checkAlignment(7, null, 'flex-start');

      await expect(page).toHaveScreenshot();
      await expect(page).toHaveScreenshot();
    });

    test('Verify column width - static and based on content', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/column-expand.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const getWidths = async (viewportWidth: any) => {
        await page.setViewportSize({ width: viewportWidth, height: 800 });
        const widths = await Promise.all([1, 2, 3, 4, 5].map((i) => getColumnWidth(page, i)));
        return widths;
      };

      const [width1Desktop, width2Desktop, width3Desktop, width4Desktop, width5Desktop] =
        await getWidths(1280);
      const [width1Mobile, width2Mobile, width3Mobile, width4Mobile, width5Mobile] =
        await getWidths(375);

      expect(width1Mobile).toBeLessThan(width1Desktop);
      expect(width2Mobile).toEqual(width2Desktop);
      expect(width3Mobile).toEqual(width3Desktop);
      expect(width4Mobile).toBeLessThan(width4Desktop);
      expect(width5Mobile).toEqual(width5Desktop);

      await expect(page).toHaveScreenshot();
    });

    test('Verify Column-sizes functionality', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/column-sizes.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();

      await page.setViewportSize({ width: 375, height: 800 });
      await expect(page).toHaveScreenshot();
    });

    test('Verify merged columns keyboard navigation', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/columns-merging.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
      const firstCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(0);
      const secondCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(1);

      const secondRow = page.locator('[data-ui-name="Body.Row"]').nth(1);
      const secondCell2 = secondRow.locator('[data-ui-name="Body.Cell"]').nth(1);
      const fourthCell2 = secondRow.locator('[data-ui-name="Body.Cell"]').nth(2);

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await expect(firstCell).toBeFocused();
      await page.keyboard.press('ArrowRight');

      await expect(page).toHaveScreenshot();
      await expect(secondCell).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await expect(secondCell2).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(fourthCell2).toBeFocused();

      await page.keyboard.press('ArrowUp');
      await expect(secondCell).toBeFocused();
      await page.keyboard.press('ArrowDown');
    });
  });

  test.describe('Rows', () => {
    test.skip('Verify Custom rows Rendering', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/custom-rows-rendering.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');

      await expect(page).toHaveScreenshot();
    });

    test('Verify merged cells on Hover', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/columns-merging.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
      const firstCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(0);
      await firstCell.hover();
      await expect(page).toHaveScreenshot();

      const secondRow = page.locator('[data-ui-name="Body.Row"]').nth(1);
      const secondCellSecondRow = secondRow.locator('[data-ui-name="Body.Cell"]').nth(1);
      await secondCellSecondRow.hover();
      await expect(page).toHaveScreenshot();
    });

    test('Verify merged rows keyboard mnvigation', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/rows-merging.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');

      const firstRow = page.locator('[data-ui-name="Body.Row"]').first();
      const firstMergedCell = firstRow.locator('[data-ui-name="Body.Cell"][aria-colindex="1"]');
      await expect(firstMergedCell).toBeFocused();

      const secondCell = firstRow.locator('[data-ui-name="Body.Cell"]').nth(1);
      await page.keyboard.press('ArrowRight');
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await expect(firstMergedCell).not.toHaveAttribute('inert');
await expect(firstMergedCell).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await expect(firstMergedCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      const fourthRow = page.locator('[data-ui-name="Body.Row"]').nth(3);
      const MergedCellSecondRow = fourthRow.locator('[data-ui-name="Body.Cell"]').nth(0);
      await expect(MergedCellSecondRow).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      await expect(MergedCellSecondRow).toBeFocused();
    });
  });

  test.describe('Cells', () => {
    test('Verify long text in cells - default and wrap and ellipsis', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/long-text-in-cells.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
    });

    test('Verify multiple access to cells with spin', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/access-to-set-of-cells.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await page.keyboard.press('Tab');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('ArrowRight');
      await expect(page.getByRole('gridcell', { name: 'Loading…' }).first()).toBeFocused();

      const svgInSecondCell = page.getByLabel('Loading…').first();

      await expect(svgInSecondCell).toHaveCount(1);
      await expect(svgInSecondCell).toHaveAttribute('aria-label', 'Loading…');
      await expect(svgInSecondCell).toHaveAttribute('role', 'img');
    });
//GUG IN FF????
    test('Verify keyboard interaction with interactive elements in cells', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/interactive-elements-in-cells.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const getCell = (row: number, col: number) =>
        page.locator(
          `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
        );
      const descriptionTooltipTrigger = (row: number, col: number) =>
        getCell(row, col).locator('[data-ui-name="DescriptionTooltip.Trigger"]');
      const buttonInCell = (row: number, col: number) =>
        getCell(row, col).locator('[data-ui-name="Button"]').first();

      // Start navigation with Tab
      await page.keyboard.press('Tab');
      await expect(getCell(2, 1)).toBeFocused();

      // Navigate right
      await page.keyboard.press('ArrowRight');
      await expect(descriptionTooltipTrigger(2, 2)).toBeFocused();

      await page.keyboard.press('ArrowRight');
      await expect(getCell(2, 3)).toBeFocused();

      // Navigate down
      await page.keyboard.press('ArrowDown');
      await expect(getCell(3, 3)).toBeFocused();

      // Open and close button inside a cell
      await page.keyboard.press('Enter');
      await expect(buttonInCell(3, 3)).toBeFocused();

      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(buttonInCell(3, 3)).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(getCell(3, 3)).toBeFocused();

      // Navigate outside table and back
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-test-id="button-after-table"]')).toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(getCell(3, 3)).toBeFocused();

      // Move left and open tooltip
      await page.keyboard.press('ArrowLeft');
      await expect(descriptionTooltipTrigger(3, 2)).toBeFocused();

      await page.keyboard.press('Enter');
      await expect(page.locator('[data-ui-name="DescriptionTooltip.Popper"]')).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(descriptionTooltipTrigger(3, 2)).toBeFocused();

      // Navigate into link inside tooltip
      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await expect(page.getByRole('link')).toBeFocused();

      await page.keyboard.press('Escape');
      await expect(descriptionTooltipTrigger(3, 2)).toBeFocused();

      // Move left and interact with elements
      await page.keyboard.press('ArrowLeft');
      await expect(getCell(3, 1)).toBeFocused();

      await page.keyboard.press('Enter');
      await page.keyboard.press('Escape');
      await expect(getCell(3, 1)).toBeFocused();

      await page.keyboard.press('Enter');
      await page.keyboard.press('Tab');
      await expect(getCell(3, 1).locator('[data-test-id="interactive-icon"]')).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(descriptionTooltipTrigger(3, 1)).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(200);
      await expect(page.getByLabel('About fastest animals')).toBeFocused();
      await page.keyboard.press('Escape');

      await expect(descriptionTooltipTrigger(3, 1)).toBeFocused();
    });

    test('Verify keyboard interaction with dd and select in cells', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/dd-select-in-cell.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      // Define common selectors
      const getCell = (row: number, col: number) =>
        page.locator(
          `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
        );
      const selectButton = (row: number, col: number) =>
        getCell(row, col).locator('button[data-ui-name="Select"]');
      const dropdownButton = (row: number, col: number) =>
        getCell(row, col).locator('button[data-ui-name="Dropdown.Trigger"]');
      const dropdownPopper = page.locator('[data-ui-name="Dropdown.Popper"]');

      await page.keyboard.press('Tab');

      await test.step('Verify interaction with select', async () => {
        const firstCell = getCell(2, 1);
        await expect(firstCell).toBeFocused();

        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');

        await expect(selectButton(2, 1)).toBeFocused();
        await page.keyboard.press('Enter');

        const selectOption = page.getByRole('option', { name: 'Option 0' });
        await expect(selectOption).toBeVisible();

        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await expect(selectOption).toBeHidden();
        await expect(selectButton(2, 1)).toHaveAttribute('value', '2');

        await page.keyboard.press('Escape');
        await expect(firstCell).toBeFocused();
      });

      await test.step('Verify interaction with dropdown', async () => {
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');

        await expect(dropdownButton(2, 3)).toBeFocused();
        await expect(dropdownPopper).toBeHidden();

        await page.keyboard.press('Enter');

        await expect(dropdownPopper).toBeVisible();
        await expect(dropdownPopper).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(dropdownPopper).toBeFocused();

        await page.keyboard.press('Escape');

        await expect(dropdownPopper).toBeHidden();
        await expect(dropdownButton(2, 3)).toBeFocused();
      });
    });

    test('Verify mouse interaction with dd and select in cells', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/dd-select-in-cell.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const getCell = (row: number, col: number) =>
        page.locator(
          `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
        );
      const selectButton = getCell(2, 2).locator('button[data-ui-name="Select"]');
      const dropdownButton = getCell(2, 3).locator('button[data-ui-name="Dropdown.Trigger"]');
      const dropdownPopper = page.locator('[data-ui-name="Dropdown.Popper"]');

      await test.step('Verify interaction with select', async () => {
        await selectButton.click();
        const selectOption = page.getByRole('option', { name: 'Option 0' });
        await expect(selectOption).toBeVisible();

        await selectButton.click();
        await expect(selectOption).toBeHidden();

        await selectButton.click();
        await page.keyboard.press('Escape');
        await expect(selectOption).toBeHidden();
        await expect(selectButton).toBeFocused();

        await selectButton.click();
        await page.getByRole('option', { name: 'Option 2' }).click();
        await expect(selectButton).toHaveAttribute('value', '2');
      });

      await test.step('Verify interaction with dropdown', async () => {
        await dropdownButton.click();
        await expect(dropdownPopper).toBeVisible();

        await dropdownButton.click();
        await expect(dropdownPopper).toBeHidden();

        await dropdownButton.click();
        await page.keyboard.press('Escape');
        await expect(dropdownPopper).toBeHidden();
      });
    });
  });

  test.describe('One level Header', () => {
    test('Verify keyboard interactions when no interactive elements in header', async ({
      page,
    }) => {
      const standPath = 'stories/components/data-table/docs/examples/base.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const table = page.locator('[data-ui-name="DataTable"]');
      await expect(table).toBeVisible();

      await page.keyboard.press('Tab');

      const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

      await expect(firstCell).toBeFocused();
      await expect(page).toHaveScreenshot();

      await page.keyboard.press('ArrowRight');

      const secondCell = page.locator('[role="gridcell"][aria-colindex="2"]').first();
      await expect(secondCell).toBeFocused();

      await page.keyboard.press('ArrowDown');
      const secondCellSecondRow = page.locator('[role="gridcell"][aria-colindex="2"]').nth(1);
      await expect(secondCellSecondRow).toBeFocused();

      await page.keyboard.press('Tab');
      await expect(secondCell).not.toBeFocused();

      await page.keyboard.press('Shift+Tab');
      await expect(secondCellSecondRow).toBeFocused();
    });

    test('11Verify keyboard interactions when in header hint, checkbox, description tooltip', async ({
      page,
      browserName,
    }) => {
      const standPath =
        'stories/components/data-table/tests/examples/table-with-1tf-and diff-elements.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const getTooltip = (testId: string) => page.locator(`[data-test-id="${testId}"]`);
      const getTooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
      const getCell = (index: number) => page.locator('[data-ui-name="Body.Cell"]').nth(index);
      const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');
      const columnKD = page.locator(
        '[data-ui-name="Head.Column"][name="keyword"][aria-colindex="5"]',
      );

      await test.step('Verify interaction with tooltip without interactive elements', async () => {
        await page.keyboard.press('Tab');
        const tooltipTrigger = getTooltip('tooltip-without-interactive-el');
        await expect(tooltipTrigger).toBeFocused();
        await expect(getTooltipPopper).toBeHidden();

        await page.keyboard.press('ArrowDown');
        await expect(getCell(0)).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await expect(getTooltipPopper).toBeVisible();
        await expect(getTooltipPopper).toBeFocused();
        await page.keyboard.press('Escape');

        await expect(getTooltipPopper).toBeHidden();
       await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('ArrowRight');
        
          await expect(getTooltip('tooltip-with-interactive-el')).toBeFocused();
        
      });


      await test.step('Verify interaction with tooltip containing interactive elements', async () => {
        const tooltipTrigger = getTooltip('tooltip-with-interactive-el');
        await page.keyboard.press('ArrowDown');
        await expect(getCell(1)).toBeFocused();
        await page.keyboard.press('ArrowUp');
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await expect(getTooltipPopper).toBeVisible();
        await expect(getTooltipPopper).toBeFocused();

        await page.keyboard.press('Escape');
        await expect(getTooltipPopper).toBeHidden();
        await expect(tooltipTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

        await page.keyboard.press('Escape');
        await expect(getTooltipPopper).toBeHidden();
        await expect(tooltipTrigger).toBeFocused();
      });

      await test.step('Verify interaction with inline tooltip', async () => {
        await page.keyboard.press('ArrowRight');
        const linkTrigger = getTooltip('tooltip-with-tag-link');
        await expect(linkTrigger).toBeFocused();
        await expect(page.getByRole('tooltip', { name: 'Default tooltip contains' })).toBeVisible();

        await page.keyboard.press('ArrowDown');
        await expect(page.getByRole('tooltip')).toBeHidden();

        await page.keyboard.press('ArrowUp');
        await expect(page.getByRole('tooltip')).toBeVisible();

        await page.keyboard.press('Escape');
        await expect(page.getByRole('tooltip')).toBeHidden();

        const icon = page.locator('[data-test-id="interactive-icon"]');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('Enter');

        await expect(icon).toBeFocused();
        await expect(page.getByText('Go to our awesome article')).toBeVisible();

        await page.keyboard.press('Escape');
        
        await expect(page.getByText('Go to our awesome article')).toBeHidden();
        await page.keyboard.press('Escape');
        await page.keyboard.press('ArrowRight');

      });

      await test.step('Verify interaction with checkbox and tooltip in header', async () => {
        await expect(columnKD).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(columnKD).not.toBeFocused();

        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        await expect(checkbox).toBeFocused();

        await page.keyboard.press('Space');
        await expect(checkbox).toHaveClass(/__checked_/);

        await page.keyboard.press('Escape');
        await expect(columnKD).toBeFocused();

        await page.keyboard.press('Enter');
        await page.keyboard.press('ArrowDown');
        await expect(checkbox).toBeFocused();
      });
    });

    test('Verify mouse interactions when in header hint, checkbox, description tooltip', async ({
      page,
      browserName,
    }) => {
      const standPath =
        'stories/components/data-table/tests/examples/table-with-1tf-and diff-elements.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const getTooltip = (testId: string) => page.locator(`[data-test-id="${testId}"]`);
      const tooltipPopper = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');
      const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();
      const checkbox = page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]');

      if (browserName === 'firefox') return; //UIK-3506

      await test.step('Verify interaction with tooltip without interactive elements', async () => {
        await getTooltip('tooltip-without-interactive-el').click();
        await expect(tooltipPopper).toBeVisible();
        await firstCell.click();
        await expect(tooltipPopper).toBeHidden();
      });

      await test.step('Verify interaction with tooltip containing interactive elements', async () => {
        const tooltipTrigger = getTooltip('tooltip-with-interactive-el');
        await tooltipTrigger.click();
        await expect(tooltipPopper).toBeVisible();

        await tooltipTrigger.click();
        await expect(tooltipPopper).toBeHidden();

        await tooltipTrigger.click();
        await page.locator('[data-ui-name="Link"]').click();
        await expect(tooltipPopper).toBeVisible();
        await firstCell.click();
        await expect(tooltipPopper).toBeHidden();
      });

      await test.step('Verify hover interaction with tooltip', async () => {
        const linkTrigger = getTooltip('tooltip-with-tag-link');
        const tooltip = page.getByRole('tooltip', { name: 'Default tooltip contains' });

        await linkTrigger.hover();
        await expect(tooltip).toBeVisible();

        await firstCell.hover();
        await expect(tooltip).toBeHidden();
      });

      await test.step('Verify interaction with checkbox and tooltip in header', async () => {
        const tooltipTrigger = getTooltip('few-interactive');

        await page.locator('[data-test-id="header-checkbox"] span').first().click();
        await expect(checkbox).toHaveClass(/__checked_/);

        await tooltipTrigger.click();
        await expect(tooltipPopper).toBeVisible();

        await page.locator('[data-test-id="header-checkbox"] span').first().click();
        await expect(tooltipPopper).toBeHidden();
        await expect(checkbox).not.toHaveClass(/__checked_/);
      });
    });

    test('Verify keyboard interactions when in header DD menu', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/customizing-header.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const ddTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
      const menuItem = page.getByRole('menuitem', { name: 'Options 1' });
      const headerCell3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

      await test.step('Verify tooltip on focus', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify interactions with DD menu', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(ddTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        await page.waitForTimeout(200);
        await expect(page).toHaveScreenshot();
        await expect(menuItem).toBeVisible();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(menuItem).toBeFocused();

        // BUG
        // await page.keyboard.press('ArrowLeft');
        // await page.keyboard.press('ArrowRight');
        // await expect(menuItem).toBeFocused();

        await page.keyboard.press('Escape');
        await expect(ddTrigger).toBeFocused();
        await expect(menuItem).toBeHidden();

        await page.keyboard.press('ArrowRight');
        await expect(headerCell3).toBeFocused();

        //BUG!
        // await page.keyboard.press('ArrowLeft');
        // await expect(ddTrigger).toBeFocused();
        // await page.keyboard.press('ArrowDown');
      });

      await test.step('Verify keyboard and mouse interactions', async () => {
        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Enter');
        await expect(menuItem).toBeVisible();
        await ddTrigger.click();
        await expect(menuItem).toBeHidden();
      });
    });

    test('Verify mouse interactions when in header DD menu', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/customizing-header.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const ddTrigger = page.locator('[data-ui-name="DropdownMenu.Trigger"]');
      const menuItem = page.getByRole('menuitem', { name: 'Options 1' });
      const headerCell3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');

      await test.step('Cells on hover', async () => {
        await headerCell3.hover();
        //shapshot
        await ddTrigger.hover();
      });

      await test.step('Verify mouse interactions ', async () => {
        await ddTrigger.click();
        await expect(menuItem).toHaveCount(1);
        await ddTrigger.click();
        await expect(menuItem).toHaveCount(0);
        await ddTrigger.click();
        await headerCell3.click();
        await expect(menuItem).toHaveCount(0);
      });
    });

    test('Verify keyboard sorting without changing size', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await test.step('Verify active column highlighted when sorting active', async () => {
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify keyboard interactions', async () => {
        const getColumn = (i: any) =>
          page.locator(`[data-ui-name="Head.Column"][aria-colindex="${i}"]`);
        const getButton = (col: any) => col.locator('button[data-ui-name="ButtonLink"]');

        const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

        await page.keyboard.press('Tab');
        const button1 = getButton(getColumn(1));
        await expect(button1).toBeFocused();
        await expect(button1).toHaveAttribute('aria-label', 'descending');

        await page.keyboard.press('Enter');
        await expect(button1).toHaveAttribute('aria-label', 'descending');
        await page.keyboard.press('Enter');
        await expect(button1).toHaveAttribute('aria-label', 'ascending');

        for (let i = 2; i <= 4; i++) {
          await page.keyboard.press('ArrowRight');
          const button = getButton(getColumn(i));
          await expect(button).toBeFocused();

          if (i === 4) {
            await button.click();
            await page.keyboard.press('ArrowDown');
            await page.keyboard.press('ArrowUp');
            await expect(button).toBeFocused();
          }
        }

        await page.keyboard.press('ArrowLeft');
        await page.keyboard.press('Enter');

        const newWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
        expect(newWidths).toEqual(initialWidths);
      });
    });

    test('Verify sorting with changing size', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');
      const afterFirstSortWidths = await Promise.all(
        [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
      );
      expect(afterFirstSortWidths).toEqual(initialWidths);

      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Space');

      const afterSecondSortWidths = await Promise.all(
        [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
      );

      expect(afterSecondSortWidths[0]).toBeLessThan(initialWidths[0]); // Колонка 1 уменьшилась
      expect(afterSecondSortWidths[1]).toEqual(initialWidths[1]); // Колонка 2 без изменений
      expect(afterSecondSortWidths[2]).toBeGreaterThan(initialWidths[2]); // Колонка 3 увеличилась
      expect(afterSecondSortWidths[3]).toEqual(initialWidths[3]); // Колонка 4 без изменений
    });

    test('Verify mouse sorting without changing size', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));

      const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
      const buttonLink1 = column1.locator('button[data-ui-name="ButtonLink"]');
      const column2 = page.locator('[data-ui-name="Head.Column"][aria-colindex="2"]');
      const buttonLink2 = column1.locator('button[data-ui-name="ButtonLink"]');

      await test.step('Verify hover on column with not active sorting', async () => {
        await column1.hover();
        await expect(page).toHaveScreenshot();
      });

      await test.step('Verify 1st click on not sorted icon activates srrting', async () => {
        await buttonLink1.click();
        await expect(buttonLink1).toHaveAttribute('aria-label', 'descending');
        await buttonLink1.click();
        await expect(buttonLink1).toHaveAttribute('aria-label', 'ascending');
      });

      await test.step('Verify click on the column activates sorting', async () => {
        await column2.click();
        await expect(buttonLink2).toHaveAttribute('aria-label', 'descending');
        await column2.click();
        await expect(buttonLink2).toHaveAttribute('aria-label', 'ascending');
      });

      await test.step('Verify columns width not changed', async () => {
        const newWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
        expect(newWidths).toEqual(initialWidths);
      });
    });

    test('Verify mouse sorting with changing widest column size', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const initialWidths = await Promise.all([1, 2, 3, 4].map((i) => getColumnWidth(page, i)));
      const column1 = page.locator('[data-ui-name="Head.Column"][aria-colindex="1"]');
      await column1.click();

      const widthsAfterFirstSort = await Promise.all(
        [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
      );
      expect(widthsAfterFirstSort).toEqual(initialWidths);

      const column3 = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');
      await column3.click();

      const widthsAfterSecondSort = await Promise.all(
        [1, 2, 3, 4].map((i) => getColumnWidth(page, i)),
      );

      expect(widthsAfterSecondSort[0]).toBeLessThan(initialWidths[0]); // Колонка 1 уменьшилась
      expect(widthsAfterSecondSort[1]).toEqual(initialWidths[1]); // Колонка 2 без изменений
      expect(widthsAfterSecondSort[2]).toBeGreaterThan(initialWidths[2]); // Колонка 3 увеличилась
      expect(widthsAfterSecondSort[3]).toEqual(initialWidths[3]); // Колонка 4 без изменений
    });
  });

  test.describe('Multi level Header', () => {
    test('Verify lines props work correctly', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/multi-level-header.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
      const group1 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'left' });
      await group1.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '0px');
      await group1.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '1px');

      const group2 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'both' });
      await group2.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '0px');
      await group2.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '0px');

      const group3 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'right' });
      await group3.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '1px');
      await group3.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '0px');

      const group4 = page.locator('[data-ui-name="Head.Group"]', { hasText: 'default' });
      await group4.evaluate((el) => window.getComputedStyle(el).borderRightWidth === '0px');
      await group4.evaluate((el) => window.getComputedStyle(el).borderLeftWidth === '0px');
    });

    test('Verify header when long text wraps and ellipsis', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/multi-level-header.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      await expect(page).toHaveScreenshot();
      await page.keyboard.press('Tab');
    });

    test('Verify multi level looks good when it is sticky', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/multi-level-header-sticky.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
    });

    test('Verify keyboard interactions in header with hint, checkbox, description tooltip, select', async ({
      page,
      browserName,
    }) => {
      const standPath =
        'stories/components/data-table/tests/examples/multi-level-with-interactive.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      if (browserName === 'firefox') return;

      await test.step('Verify interaction with tooltip inside header', async () => {
        await page.keyboard.press('Tab');
        await page.keyboard.press('ArrowRight');

        const tooltipTrigger = page.locator('[data-test-id="tooltip-with-interactive-el"]');
        const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

        await expect(tooltipTrigger).toBeFocused();
        await expect(tooltip).toBeHidden();

        await page.keyboard.press('Enter');
        await expect(tooltip).toBeVisible();
        await expect(tooltipTrigger).not.toBeFocused();

        await page.keyboard.press('Tab');
        await expect(page.locator('[data-ui-name="Link"]')).toBeFocused();

        await page.keyboard.press('Escape');
        await expect(tooltip).toBeHidden();
        await expect(tooltipTrigger).toBeFocused();
      });

      await test.step('Verify interaction with multiple elements inside header', async () => {
        await page.keyboard.press('ArrowRight');
        const thirdColumn = page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]');
        await expect(thirdColumn).toBeFocused();

        await page.keyboard.press('ArrowDown');
        const thirdCell = page.locator(
          '[role="row"][aria-rowindex="2"] [role="gridcell"][aria-colindex="3"]',
        );
        await expect(thirdCell).toBeFocused();

        await page.keyboard.press('ArrowUp');
        await page.keyboard.press('Enter');
        const checkbox = page.locator(
          'label[data-test-id="header-checkbox"] input[type="checkbox"]',
        );
        await expect(checkbox).toBeFocused();

        await page.keyboard.press('Space');
        await expect(checkbox).toHaveClass(/__checked_/);

        await page.keyboard.press('Escape');
        await expect(thirdColumn).toBeFocused();

        await page.keyboard.press('Enter');
        await page.keyboard.press('ArrowDown');
        await expect(checkbox).toBeFocused();

        // but
        // await page.keyboard.press('Tab');  - moves to the next focusable element outside table
        // await page.keyboard.press('Shift+Tab');
      });

      await test.step('Verify interaction with Select', async () => {
        await page.keyboard.press('Escape');
        await page.keyboard.press('ArrowRight');

        const selectTrigger = page.locator('[data-ui-name="Select"]');
        await expect(selectTrigger).toBeFocused();

        await page.keyboard.press('Enter');
        const options = page.getByRole('option', { name: 'Option 0' });

        await expect(options).toBeVisible();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('Enter');

        await expect(options).toBeHidden();
        await expect(selectTrigger).toBeFocused();
        await expect(selectTrigger).toHaveAttribute('value', '2');

        // await page.keyboard.press('ArrowDown'); ----BUG
      });
    });

    test('Verify mouse interactions in header with hint, checkbox, description tooltip, select', async ({
      page,
    }) => {
      const standPath =
        'stories/components/data-table/tests/examples/multi-level-with-interactive.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const firstCell = page.locator('[data-ui-name="Body.Cell"]').first();

      await test.step('Verify tooltip without interactive elements', async () => {
        const tooltipTrigger = page.locator('[data-test-id="tooltip-without-interactive-el"]');
        const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

        await tooltipTrigger.click();
        await expect(tooltip).toBeVisible();

        await firstCell.click();
        await expect(tooltip).toBeHidden();
      });

      await test.step('Verify tooltip with interactive elements', async () => {
        const tooltipTrigger = page.locator('[data-test-id="tooltip-with-interactive-el"]');
        const tooltip = page.locator('[data-ui-name="DescriptionTooltip.Popper"]');

        await tooltipTrigger.click();

        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveCount(1);

        await tooltipTrigger.click();
        await expect(tooltip).toBeHidden();

        await tooltipTrigger.click();
        await page.locator('[data-ui-name="Link"]').click();
        await expect(tooltip).toBeVisible();
        await tooltipTrigger.click();
        await expect(tooltip).toBeHidden();
      });

      await test.step('Verify Select interaction', async () => {
        const selectTrigger = page.locator('[data-ui-name="Select"]');
        await selectTrigger.hover();
        // shapshot
        await selectTrigger.click();

        const option0 = page.getByRole('option', { name: 'Option 0' });
        await expect(option0).toBeVisible();

        const option2 = page.getByRole('option', { name: 'Option 2' });
        await option2.click();

        await expect(option0).toBeHidden();
        await expect(selectTrigger).toHaveAttribute('value', '2');
      });

      await test.step('Verify checkbox interaction', async () => {
        const checkbox = page.locator('[data-test-id="header-checkbox"]');

        await checkbox.click();
        await expect(
          page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]'),
        ).toHaveClass(/__checked_/);
        await checkbox.click();
        await expect(
          page.locator('label[data-test-id="header-checkbox"] input[type="checkbox"]'),
        ).not.toHaveClass(/__checked_/);
      });
    });

    test('Verify keyboard interactions with sorting', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/multi-level-sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const buttonLink1 = page.locator(
        '[data-ui-name="Head.Column"][aria-colindex="1"] button[data-ui-name="ButtonLink"]',
      );
      const buttonLink2 = page.locator(
        '[data-ui-name="Head.Column"][aria-colindex="2"] button[data-ui-name="ButtonLink"]',
      );

      await test.step('Verify focus on the 1st sorted icon', async () => {
        await page.keyboard.press('Tab');
        await expect(page).toHaveScreenshot();
        await expect(buttonLink1).toBeFocused();
        await expect(buttonLink1).toHaveAttribute('aria-label', 'descending');
      });

      await test.step('Verify sorting interaction by keyboard', async () => {
        await page.keyboard.press('Enter');
        await expect(buttonLink1).toHaveAttribute('aria-label', 'ascending');
      });

      await test.step('Verify sorting interaction with mouse and keyboard', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(buttonLink2).toHaveAttribute('aria-label', 'ascending');

        await buttonLink2.click();
        await expect(buttonLink2).toHaveAttribute('aria-label', 'descending');
      });

      await test.step('Verify switching between cells by keyboard', async () => {
        await page.keyboard.press('ArrowRight');
        await expect(page.locator('[data-ui-name="Head.Column"][aria-colindex="3"]')).toBeFocused();
        await page.keyboard.press('ArrowRight');
        const column4 = page.locator('[data-ui-name="Head.Column"][aria-colindex="4"]');
        const buttonLink4 = column4.locator('button[data-ui-name="ButtonLink"]');
        await expect(buttonLink4).toBeFocused();
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await page.keyboard.press('ArrowRight');
        await expect(page.locator('[data-ui-name="Head.Column"][aria-colindex="7"]')).toBeFocused();
      });
    });

    test('Verify mouse interactions with sorting', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/multi-level-sorting.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await test.step('Verify sorting activation on click', async () => {
        const buttonLink1 = page.locator(
          '[data-ui-name="Head.Column"][aria-colindex="1"] button[data-ui-name="ButtonLink"]',
        );
        await expect(buttonLink1).toHaveAttribute('aria-label', 'descending');
        await buttonLink1.click();
        await expect(buttonLink1).toHaveAttribute('aria-label', 'ascending');
      });

      await test.step('Verify hover and click on another sorting column', async () => {
        const buttonLink2 = page.locator(
          '[data-ui-name="Head.Column"][aria-colindex="2"] button[data-ui-name="ButtonLink"]',
        );
        await buttonLink2.hover();
        await expect(page).toHaveScreenshot();
        await expect(buttonLink2).toHaveAttribute('aria-label', 'ascending');
        await buttonLink2.click();
        await expect(buttonLink2).toHaveAttribute('aria-label', 'descending');
      });
    });
  });

  async function checkAriaMaxValue(scrollBar: any) {
    await expect(scrollBar).toHaveAttribute('aria-valuemax');
    const attrValue = await scrollBar.getAttribute('aria-valuemax');
    expect(attrValue).not.toBeNull();
    const value = Number(attrValue);
    return value;
  }

  async function checkScrollNowIncreased(scrollBar: any) {
    await expect(scrollBar).toHaveAttribute('aria-valuenow');
    const nowValue = await scrollBar.getAttribute('aria-valuenow');
    expect(nowValue).not.toBeNull();
    const nowNumber = Number(nowValue);
    return nowNumber;
  }
  test.describe('Vertical Scroll', () => {
    test('Verify Keyboard scroll when Sticky header and no interactive in cells', async ({
      page,
    }) => {
      const standPath = 'stories/components/data-table/tests/examples/scroll-in-table-sticky.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 8; i++) {
        await page.keyboard.press('ArrowDown');
      }
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot();
    });

    test('Verify Mouse scroll when Sticky header and no interactive in cells', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/scroll-in-table-sticky.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const dataTable = await page.locator('[data-ui-name="DataTable"]');
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test('Verify Keyboard scroll when Sticky header and interactive in cells', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/table-with-1tf-and diff-elements.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('ArrowDown');
      }
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot();
    });

    test('Verify mouse scroll when Sticky header and interactive in cells', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/table-with-1tf-and diff-elements.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const dataTable = await page.locator('[data-ui-name="DataTable"]');
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test('Verify Keyboard scroll when not Sticky header', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('ArrowDown');
      }
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot();
    });

    test('Verify mouse scroll when mot Sticky header', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const dataTable = await page.locator('[data-ui-name="DataTable"]');
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });
  });

  test.describe('Horizontal Scroll', () => {
    test('Verify keyboard scroll when no fixed columns', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/horizontal-scroll.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      await test.step('Verify regular horizontal scroll', async () => {
        const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
        const initialValue = await checkAriaMaxValue(scrollBar);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(100);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        //shapshot
      });

      await test.step('Verify when header scroll presents', async () => {
        const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
        const initialValue = await checkAriaMaxValue(scrollBar);
        await page.keyboard.press('Tab');
        for (let i = 0; i < 3; i++) {
          await page.keyboard.press('ArrowRight');
        }
        await page.waitForTimeout(100);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        //shapshot
      });
    });

    test('Verify mouse scroll when no fixed columns', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/horizontal-scroll.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      await test.step('Verify regular horizontal scroll', async () => {
        const dataTable = await page.locator('[data-ui-name="DataTable"]').first();

        const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
        const initialValue = await checkAriaMaxValue(scrollBar);
        await dataTable.hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
      });

      await test.step('Verify when header scroll presents', async () => {
        const dataTable = await page.locator('[data-ui-name="DataTable"]').nth(1);

        const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
        const initialValue = await checkAriaMaxValue(scrollBar);
        await dataTable.hover();
        await page.mouse.wheel(600, 0);
        await page.waitForTimeout(1000);
        const nowNumber = await checkScrollNowIncreased(scrollBar);
        expect(nowNumber).toBeLessThanOrEqual(initialValue);
        await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
      });
    });

    test('Verify keyboard scroll when 1 level header and columns fixed', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/fixed-columns.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      //shapshot
    });

    test('Verify mouse scroll when 1 level header and columns fixed', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/fixed-columns.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const dataTable = await page.locator('[data-ui-name="DataTable"]');

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(600, 0);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      // await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test('Verify keyboard scroll when columns with differend width fixed', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/fixed-column-with-d-ff-width.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);
      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      // await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test('Verify keyboard scroll when multilevel parent fixed', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/horizontal-scroll-fixed-group.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      //shapshot
    });

    test('Verify mouse scroll when multilevel parent fixed', async ({ page }) => {
      const standPath =
        'stories/components/data-table/tests/examples/horizontal-scroll-fixed-group.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const dataTable = await page.locator('[data-ui-name="DataTable"]');

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]');
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(600, 0);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });
    });

    test('Verify keyboard when vertical and horizontal presents', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/multiple-scrolls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
      const initialValue = await checkAriaMaxValue(scrollBar);
      await page.keyboard.press('Tab');
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('ArrowRight');
      }
      await page.waitForTimeout(100);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);

      const scrollBar2 = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
      const initialValue2 = await checkAriaMaxValue(scrollBar2);

      for (let i = 0; i < 7; i++) {
        await page.keyboard.press('ArrowDown');
      }
      await page.waitForTimeout(100);
      const nowNumber2 = await checkScrollNowIncreased(scrollBar2);
      expect(nowNumber2).toBeLessThanOrEqual(initialValue2);

      //shapshot
    });

    test('Verify mouse when vertical and horizontal presents', async ({ page }) => {
      const standPath = 'stories/components/data-table/tests/examples/multiple-scrolls.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');
      await page.setContent(htmlContent);

      const dataTable = await page.locator('[data-ui-name="DataTable"]');

      const scrollBar = page.locator('[data-ui-name="ScrollArea.Bar"]').first();
      const initialValue = await checkAriaMaxValue(scrollBar);
      await dataTable.hover();
      await page.mouse.wheel(600, 0);
      await page.waitForTimeout(1000);
      const nowNumber = await checkScrollNowIncreased(scrollBar);
      expect(nowNumber).toBeLessThanOrEqual(initialValue);
      await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

      const scrollBar2 = page.locator('[data-ui-name="ScrollArea.Bar"]').nth(1);
      const initialValue2 = await checkAriaMaxValue(scrollBar2);

      await dataTable.hover();
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(1000);
      await page.waitForTimeout(100);
      const nowNumber2 = await checkScrollNowIncreased(scrollBar2);
      expect(nowNumber2).toBeLessThanOrEqual(initialValue2);
    });
  });

  test.describe('Pagination', () => {
    test('Verify keyboard access with changing data', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/pagination.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const nav = await page.locator('nav[data-ui-name="Pagination"]');

      const marginTop = await nav.evaluate((el) => {
        return window.getComputedStyle(el).getPropertyValue('margin-top');
      });

      expect(marginTop).toBe('16px');

      await page.keyboard.press('Tab');
      await expect(page.getByRole('gridcell', { name: 'ebay buy' })).toBeFocused();
      await page.keyboard.press('ArrowDown');

      await page.keyboard.press('Tab');
      await expect(page.getByRole('button', { name: 'Next' })).toBeFocused();

      await page.keyboard.press('Space');
      await page.keyboard.press('Space');
      await expect(page.getByRole('button', { name: 'Prev' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('gridcell', { name: 'ebay buy last' })).toBeFocused();
    });
  });

  test.describe('Loading states', () => {
    test('Verify loading state of table', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/spin-container-in-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);

      const loadingIcon = page.locator('svg[data-ui-name="Spin"]');
      await expect(loadingIcon).toBeVisible();
      await expect(loadingIcon).toHaveAttribute('role', 'img');
      await expect(loadingIcon).toHaveAttribute('aria-label', 'Loading…');
    });

    test('Verify skeleton in table', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/skeleton-in-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const row = await page.locator('div[data-ui-name="Body.Row"][aria-rowindex="2"]');

      const rowCells = row.locator('div[data-ui-name="Body.Cell"]');

      const cellsCount = await rowCells.count();
      for (let i = 0; i < cellsCount; i++) {
        const cell = rowCells.nth(i);
        const svg = cell.locator('svg');
        await expect(svg).toBeVisible();

        const width = await svg.getAttribute('width');
        const ariaLabel = await svg.getAttribute('aria-label');
        const role = await svg.getAttribute('role');

        expect(width).toBe('100%');
        expect(ariaLabel).toBe('Loading…');
        expect(role).toBe('img');
      }
    });
  });

  test.describe('Accordion in table', () => {
    test('Verify keyboard interactions with accordion and chart inside', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();
      await page.keyboard.press('Tab');
      await expect(page).toHaveScreenshot();
      await expect(firstArrow).toBeFocused();
      await page.keyboard.press('ArrowDown');
      const secondArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(1);
      const plot = await page.locator('[data-ui-name="Plot"]');

      await expect(secondArrow).toBeFocused();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('Enter');
      await expect(plot).toHaveCount(0);
      await page.keyboard.press('ArrowLeft');
      await expect(secondArrow).toBeFocused();
      await page.keyboard.press('Enter');
      await expect(plot).toBeVisible();
      await expect(plot).toHaveCount(1);
      await page.keyboard.press('Enter');

      await expect(plot).not.toBeVisible();
      await expect(plot).toHaveCount(0);
      await page.keyboard.press('Enter');
      await page.keyboard.press('ArrowDown');

      const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
      await expect(thirdArrow).toBeFocused();

      await page.keyboard.press('Enter');
      await page.waitForTimeout(100);
      await page.keyboard.press('Tab');
      await expect(plot).toHaveCount(2);
      const plot2 = await page.getByLabel('Chart').nth(1);
      await expect(plot2).toBeFocused();

      //   await page.keyboard.press('Shift+Tab');
      //   await expect(secondArrow).toBeFocused();
    });

    test('Verify mouse interactions with accordion and chart inside', async ({ page }) => {
      const standPath = 'stories/components/data-table/docs/examples/accordion-inside-table.tsx';
      const htmlContent = await e2eStandToHtml(standPath, 'en');

      await page.setContent(htmlContent);
      const firstArrow = await page.locator('[data-ui-name="ButtonLink"]').first();

      await firstArrow.click();
      await page.keyboard.press('ArrowDown');
      const plot = await page.locator('[data-ui-name="Plot"]');
      await expect(plot).toHaveCount(1);
      await firstArrow.click();
      await expect(plot).toHaveCount(0);
      await firstArrow.click();

      const thirdArrow = await page.locator('[data-ui-name="ButtonLink"]').nth(2);
      await thirdArrow.click();
      await expect(plot).toHaveCount(2);

      //   await page.keyboard.press('Shift+Tab');
      //   await expect(secondArrow).toBeFocused();
    });
  });
});
