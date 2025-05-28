import { expect, getAccessibilityViolations, test, Page } from '@semcore/testing-utils/playwright';
import { e2eStandToHtml } from '@semcore/testing-utils/e2e-stand';

async function checkAxe(page: Page, standPath: string) {
  const htmlContent = await e2eStandToHtml(standPath, 'en');

  await page.setContent(htmlContent);

  await page.evaluate(() => {
    document.querySelectorAll('[role=columnheader], [role=gridcell]').forEach((el) => {
      el.removeAttribute('inert');
    });
  });

  const violations = await getAccessibilityViolations({ page });

  return violations;
}

test.describe('DataTable', () => {
  test('access to cells', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/access-to-cells.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('access to set of cells', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/access-to-set-of-cells.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('base', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/base.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('borders', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/borders.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('column alignment', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/column-alignment.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('column sizes', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/column-sizes.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('columns merging', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/columns-merging.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('compact', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/compact.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('custom rows rendering', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/custom-rows-rendering.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('customizing header', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/customizing-header.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('export in image', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/export-in-image.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('fixed columns', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/fixed-columns.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('fixed header', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/fixed-header.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('multi level header', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/multi-level-header.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('pagination', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/pagination.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('rows merging', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/rows-merging.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('scroll in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/scroll-in-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('secondary table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/secondary-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('skeleton in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/skeleton-in-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('spin container in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/spin-container-in-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('sorting changing size', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting-changing-size.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('sorting', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('table in table with fixed column', async ({ page }) => {
    const standPath =
      'stories/components/data-table/docs/examples/table-in-table-with-fixed-column.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('table in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/table-in-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('virtual scroll in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('checkbox in table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/checkbox-in-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('empty table', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/empty-table.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
  test('row with themes', async ({ page }) => {
    const standPath = 'stories/components/data-table/docs/examples/row-themes.tsx';
    const violations = await checkAxe(page, standPath);

    expect(violations).toEqual([]);
  });
});
