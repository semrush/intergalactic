import { expect } from '@semcore/testing-utils/playwright';
import { nvdaTest as test } from '@semcore/testing-utils/playwright.nvda';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@dropdown-menu ${TAG.NVDA}`, () => {
  test('Users can interact with DropdownMenu via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/basic.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('menu button, collapsed, sub Menu, Actions');

    await nvda.press('Enter');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Save, 1 of 4');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Rename, 2 of 4');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Download, 3 of 4');

    await nvda.next();

    expect(await nvda.itemText()).toContain('Delete, 4 of 4');
  });
});
