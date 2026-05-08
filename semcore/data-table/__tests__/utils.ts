import { expect } from '@semcore/testing-utils/playwright';
import type { Page } from '@semcore/testing-utils/playwright';

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

const stylesActiveHoveredTokens = [
  '--intergalactic-table-td-cell-new-hover', // success
  '--intergalactic-table-td-cell-selected-hover', // info
  '--intergalactic-table-td-cell-active', // muted
  '--intergalactic-table-td-cell-warning-hover', // warning
  '--intergalactic-table-td-cell-critical-hover', // danger
];

const stylesNotActiveTokens = [
  '--intergalactic-table-td-cell-new', // success
  '--intergalactic-table-td-cell-selected', // info
  '--intergalactic-table-td-cell-unread', // muted
  '--intergalactic-table-td-cell-warning', // warning
  '--intergalactic-table-td-cell-critical', // danger
];

const stylesExpandedTokens = [
  '--intergalactic-table-td-cell-new-active', // success
  '--intergalactic-table-td-cell-selected-active', // info
  '--intergalactic-table-td-cell-active', // muted
  '--intergalactic-table-td-cell-warning-active', // warning
  '--intergalactic-table-td-cell-critical-active', // danger
];

type ColorProperty = 'backgroundColor' | 'borderColor' | 'color';

// Matches the CSS fallback colors after the test bundle normalizes them.
const cssVarColorFallbacks: Record<string, string> = {
  '--intergalactic-bg-primary-neutral': 'rgb(255, 255, 255)',
  '--intergalactic-border-secondary': 'rgba(0, 21, 16, 0.07)',
  '--intergalactic-border-table-accent': 'rgba(0, 12, 8, 0.161)',
  '--intergalactic-table-td-cell-accordion': 'rgb(255, 255, 255)',
  '--intergalactic-table-td-cell-active': 'rgb(244, 245, 245)',
  '--intergalactic-table-td-cell-critical': 'rgb(255, 244, 247)',
  '--intergalactic-table-td-cell-critical-active': 'rgb(255, 226, 230)',
  '--intergalactic-table-td-cell-critical-hover': 'rgb(255, 235, 239)',
  '--intergalactic-table-td-cell-hover': 'rgb(248, 249, 248)',
  '--intergalactic-table-td-cell-new': 'rgb(225, 255, 250)',
  '--intergalactic-table-td-cell-new-active': 'rgb(181, 252, 235)',
  '--intergalactic-table-td-cell-new-hover': 'rgb(201, 255, 243)',
  '--intergalactic-table-td-cell-selected': 'rgb(246, 248, 255)',
  '--intergalactic-table-td-cell-selected-active': 'rgb(226, 235, 255)',
  '--intergalactic-table-td-cell-selected-hover': 'rgb(236, 241, 255)',
  '--intergalactic-table-td-cell-unread': 'rgb(248, 249, 248)',
  '--intergalactic-table-td-cell-warning': 'rgb(255, 248, 230)',
  '--intergalactic-table-td-cell-warning-active': 'rgb(255, 231, 193)',
  '--intergalactic-table-td-cell-warning-hover': 'rgb(255, 240, 212)',
  '--intergalactic-table-th-primary-cell': 'rgb(248, 249, 248)',
  '--intergalactic-table-th-secondary-cell': 'rgb(255, 255, 255)',
  '--intergalactic-text-primary': 'rgba(1, 5, 0, 0.899)',
};

export const getCssVarColor = async (
  page: Page,
  varName: string,
  property: ColorProperty = 'backgroundColor',
) => {
  return page.evaluate(({ name, property, fallback }) => {
    const probe = document.createElement('div');
    probe.style[property] = fallback ? `var(${name}, ${fallback})` : `var(${name})`;
    document.body.appendChild(probe);
    const color = window.getComputedStyle(probe)[property];
    probe.remove();
    return color;
  }, { name: varName, property, fallback: cssVarColorFallbacks[varName] });
};

export const getCssVarBorder = async (page: Page, varName: string) =>
  `1px solid ${await getCssVarColor(page, varName, 'borderColor')}`;

export const getTransparentColor = async (page: Page) => {
  return page.evaluate(() => {
    const probe = document.createElement('div');
    document.body.appendChild(probe);
    const color = window.getComputedStyle(probe).backgroundColor;
    probe.remove();
    return color;
  });
};

export const getStylesActiveHovered = async (page: Page) =>
  Promise.all(stylesActiveHoveredTokens.map((token) => getCssVarColor(page, token)));

export const getStylesNotActive = async (page: Page) =>
  Promise.all(stylesNotActiveTokens.map((token) => getCssVarColor(page, token)));

export const getStylesExpanded = async (page: Page) =>
  Promise.all(stylesExpandedTokens.map((token) => getCssVarColor(page, token)));

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
