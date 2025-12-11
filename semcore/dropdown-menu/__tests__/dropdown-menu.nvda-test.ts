import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@dropdown-menu ${TAG.NVDA}`, () => {
  test('Users can interact with DropdownMenu via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/dropdown-menu/docs/examples/basic.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('cliclable, menu button, collapsed, sub Menu, Actions');

    await nvda.press('Enter');
    await page.waitForTimeout(300);

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, menu, menu item, Save');

    await nvda.next();

    expect(await nvda.itemText()).toContain('menu item, Rename');

    await nvda.next();

    expect(await nvda.itemText()).toContain('menu item, Download');

    await nvda.next();

    expect(await nvda.itemText()).toContain('menu item, Delete');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    expect(await nvda.itemText()).toContain('collapsed');
  });
});
