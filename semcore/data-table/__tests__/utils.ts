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

  /** The text-carrying link of a LinkAction; its action links hold no `Link.Text`. */
  linkActionLink: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('a[data-ui-name="Link"]').first(),
  linkActionText: (page: Page, row: number, col: number) =>
    locators.linkActionLink(page, row, col).locator('[data-ui-name="Link.Text"]').first(),
  linkActionExternalIcon: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('[data-ui-name="Link.ExternalIcon"]'),
  linkActionDivider: (page: Page, row: number, col: number) =>
    locators.getCell(page, row, col).locator('[data-ui-name="Divider"]'),
  /** Icon-only actions carry no text, so `title` is the only source of their name. */
  linkActionHrefAction: (page: Page, row: number, col: number, name: string) =>
    locators.getCell(page, row, col).getByRole('link', { name }),
  linkActionClickAction: (page: Page, row: number, col: number, name: string) =>
    locators.getCell(page, row, col).getByRole('button', { name }),
};

/** True while every control in the cell still sits within the cell's right edge. */
export async function controlsFitInCell(page: Page, row: number, col: number) {
  return locators.getCell(page, row, col).evaluate((cell) => {
    const right = cell.getBoundingClientRect().right;

    return [...cell.querySelectorAll('button, a')].every(
      (el) => el.getBoundingClientRect().right <= right + 1,
    );
  });
}

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
  '--intergalactic-bg-primary-neutral': 'oklch(1 0 0)',
  '--intergalactic-border-secondary': 'oklch(0.176 0.033 175.7 / 0.07)',
  '--intergalactic-border-table-accent': 'oklch(0.137 0.026 175.7 / 0.161)',
  '--intergalactic-table-td-cell-accordion': 'oklch(1 0 0)',
  '--intergalactic-table-td-cell-active': 'oklch(0.97 0.001 180)',
  '--intergalactic-table-td-cell-critical': 'oklch(0.977 0.016 1.8)',
  '--intergalactic-table-td-cell-critical-active': 'oklch(0.938 0.042 8.4)',
  '--intergalactic-table-td-cell-critical-hover': 'oklch(0.958 0.029 5.7)',
  '--intergalactic-table-td-cell-hover': 'oklch(0.98 0.001 180)',
  '--intergalactic-table-td-cell-new': 'oklch(0.977 0.036 184)',
  '--intergalactic-table-td-cell-new-active': 'oklch(0.94 0.074 178.1)',
  '--intergalactic-table-td-cell-new-hover': 'oklch(0.96 0.057 179.7)',
  '--intergalactic-table-td-cell-selected': 'oklch(0.98 0.01 267.6)',
  '--intergalactic-table-td-cell-selected-active': 'oklch(0.939 0.032 268)',
  '--intergalactic-table-td-cell-selected-hover': 'oklch(0.959 0.021 267.8)',
  '--intergalactic-table-td-cell-unread': 'oklch(0.98 0.001 180)',
  '--intergalactic-table-td-cell-warning': 'oklch(0.979 0.03 88.1)',
  '--intergalactic-table-td-cell-warning-active': 'oklch(0.939 0.069 79.8)',
  '--intergalactic-table-td-cell-warning-hover': 'oklch(0.96 0.05 83.1)',
  '--intergalactic-table-th-primary-cell': 'oklch(0.98 0.001 180)',
  '--intergalactic-table-th-secondary-cell': 'oklch(1 0 0)',
  '--intergalactic-text-primary': 'oklch(0.1 0.03 137 / 0.899)',
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
