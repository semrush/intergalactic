import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@data-table ${TAG.NVDA}`, () => {
  test('Users can interact with DataTable via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/data-table/docs/examples/base.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('table');
    expect(await nvda.itemText()).toContain('Basic table example');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Keyword');
    expect(await nvda.itemText()).toContain('column');

    await nvda.next();

    expect(await nvda.itemText()).toContain('KD %');
    expect(await nvda.itemText()).toContain('column');

    await nvda.next();

    expect(await nvda.itemText()).toContain('CPC');
    expect(await nvda.itemText()).toContain('column');

    // Navigate to data rows
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
