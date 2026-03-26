import { expect, getAccessibilityViolations, test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

const skipExpectedErrors = (violations: Awaited<ReturnType<typeof getAccessibilityViolations>>) =>
  violations.filter(
    (v) => v.id !== 'aria-required-children' && v.id !== 'scrollable-region-focusable' && v.id !== 'focusable-content',
  );

test.describe(`@data-table  ${TAG.ACCESSIBILITY}`, () => {
  test('access to cells', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/access-to-cells.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('access to set of cells', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/access-to-set-of-cells.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('base', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/base.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('borders', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/borders.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('column alignment', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/column-alignment.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('column sizes', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/column-sizes.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('columns merging', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/columns-merging.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('compact', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/compact.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('custom rows rendering', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/custom-rows-rendering.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('customizing header', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/customizing-header.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('export in image', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/export-in-image.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('fixed columns', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/fixed-columns.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('fixed header', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/fixed-header.tsx', 'en');
    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('multi level header', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/multi-level-header.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('pagination', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/pagination.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('rows merging', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/rows-merging.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('scroll in table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/scroll-in-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('secondary table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/secondary-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('skeleton in table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/skeleton-in-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('spin container in table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/spin-container-in-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('sorting changing size', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/sorting-changing-size.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('sorting', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/sorting.tsx', 'en');

    const standPath = 'stories/components/data-table/docs/examples/sorting.tsx';
    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('table in table with fixed column', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table-with-fixed-column.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('table in table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/table-in-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('virtual scroll in table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/virtual-scroll-in-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('checkbox in table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/checkbox-in-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('empty table', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/empty-table.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('row with themes', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/row-themes.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('table in card', async ({ page }) => {
    await loadPage(page, 'stories/components/card/docs/examples/card_layout_for_tables.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
  test('limited mode', async ({ page }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/limited-mode.tsx', 'en');

    const violations = await getAccessibilityViolations({ page });

    expect(skipExpectedErrors(violations)).toEqual([]);
  });
});
