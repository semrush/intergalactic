import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@data-table ${TAG.NVDA}`, () => {
  test('Users can interact with DataTable via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/base.tsx', 'en');

    await nvda.next();
    expect(await nvda.itemText()).toBe('table, with 11 rows and 5 columns, row 1, column 1, clickable, Keyword');

    await nvda.next();

    expect(await nvda.itemText()).toContain('column 2, clickable, KD percent');

    await nvda.next();

    expect(await nvda.itemText()).toContain('column 3, clickable, CPC');
    await nvda.next();

    await nvda.next();
    await nvda.next();

    expect(await nvda.itemText()).toContain('ebay buy');
    expect(await nvda.itemText()).toContain('row');

    await nvda.next();

    expect(await nvda.itemText()).toContain('77.8');
    expect(await nvda.itemText()).toContain('column');

    await nvda.next();

    expect(await nvda.itemText()).toContain('$1.25');
    expect(await nvda.itemText()).toContain('column');
  });
});
