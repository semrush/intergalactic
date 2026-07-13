import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@data-table ${TAG.NVDA}`, () => {
  test('Users can interact with DataTable via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/base.tsx', 'en');

    await nvda.next();
    expect(await nvda.itemText()).toBe('clickable, table, with 10 rows and 5 columns, row 1, column 1, clickable, Keyword');

    await nvda.next();

    expect(await nvda.itemText()).toContain('column 2, clickable, KD percent');

    await nvda.next();

    expect(await nvda.itemText()).toContain('column 3, clickable, CPC');

    await nvda.next();

    expect(await nvda.itemText()).toContain('column 4, clickable, Empty');

    await nvda.next();

    expect(await nvda.itemText()).toContain('column 5, clickable, Vol.');
  });
});
