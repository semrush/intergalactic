import { expect } from '@semcore/testing-utils/playwright';
import type { Page, Locator } from '@semcore/testing-utils/playwright';

export const locators = {
  toggle: (page: Page) => page.getByRole('row').getByLabel('Show details'),
  chart: (page: Page, text: string) => page.getByRole('gridcell', { name: text }),
  row: (page: Page, index: number) =>
    page.locator(`[aria-rowindex="${index}"]`),
  rowTableInTable: (page: Page, level: number, index: number) =>
    page.locator(`[role="row"][aria-level="${level}"][aria-rowindex="${index}"]`),
  dataTable: (page: Page) => page.getByRole('grid'),
  collapse: (page: Page) => page.locator('[data-ui-name="Collapse"]'),
  button: (page: Page, text: string) => page.getByRole('button', { name: text }),
  getCell: (page: Page, row: number, col: number) =>
    page.locator(
      `[role="row"][aria-rowindex="${row}"] [role="gridcell"][aria-colindex="${col}"]`,
    ),
  getDataTestId: (page: Page, testId: string) => page.locator(`[data-test-id="${testId}"]`),

  descriptionTooltipTrigger: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('[data-ui-name="DescriptionTooltip.Trigger"]'),
  selectButton: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('button[data-ui-name="Select"]'),
  dropdownButton: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('button[data-ui-name="Dropdown.Trigger"]'),
  buttonInCell: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('[data-ui-name="Button"]').first(),
  getHeadColumn: (page: Page, i?: any) =>
    page.locator(`[data-ui-name="Head.Column"][aria-colindex="${i}"]`),
  sortButton: (page: Page, col: any) => locators.getHeadColumn(page, col).locator('button[data-ui-name="ButtonLink"]'),

};

export async function getColumnWidth(page: any, colIndex: any) {
  const column = await page.locator(`[aria-colindex="${colIndex}"][role="columnheader"]`);
  const box = await column.boundingBox();
  return box ? box.width : 0;
}

export const stylesActiveHovered = [
  'rgb(158, 242, 201)', // success
  'rgb(196, 229, 254)', // info
  'rgb(230, 231, 237)', // muted
  'rgb(255, 220, 162)', // warning
  'rgb(255, 215, 223)', // danger
];

export const stylesNotActive = [
  'rgb(219, 254, 232)', // success
  'rgb(233, 247, 255)', // info
  'rgb(244, 245, 249)', // muted
  'rgb(255, 243, 217)', // warning
  'rgb(255, 240, 247)', // danger
];

export const getCssVarColor = async (page: Page, varName: string) => {
  return page.evaluate((name) => {
    const probe = document.createElement('div');
    probe.style.backgroundColor = `var(${name})`;
    document.body.appendChild(probe);
    const color = window.getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  }, varName);
};

export const checkStyles = async (
  elements: any,
  styles: Record<string, string>,
) => {
  const count = await elements.count().catch(() => 1);

  if (count === 1 && elements.evaluate) {
    for (const [property, value] of Object.entries(styles)) {
      await expect(elements).toHaveCSS(property, value);
    }
    return;
  }

  await Promise.all(
    Array.from({ length: count }, async (_, i) => {
      const el = elements.nth(i);
      for (const [property, value] of Object.entries(styles)) {
        await expect(el).toHaveCSS(property, value);
      }
    }),
  );
};
