import { expect, nvdaTest as test } from '@semcore/testing-utils/playwright';
import { loadPage } from '@semcore/testing-utils/shared/helpers';
import { TAG } from '@semcore/testing-utils/shared/tags';

test.describe(`@color-picker ${TAG.NVDA}`, () => {
  test('Users can interact with ColorPicker via NVDA', async ({ page, nvda }) => {
    await loadPage(page, 'stories/components/color-picker/docs/examples/palettemanager.tsx', 'en');

    await nvda.next();

    expect(await nvda.itemText()).toContain('clickable, combo box, collapsed');
    await nvda.interact();
    await nvda.press('Enter');

    expect(await nvda.itemText()).toBe('Color field, combo box, collapsed');
    await nvda.press('Enter');

    expect(await nvda.itemText()).toContain('expanded. Colors palette, dialog. clickable, Preset colors, list');

    await nvda.next();
    expect(await nvda.itemText()).toContain('separator');

    await nvda.press('Tab');
    expect(await nvda.itemText()).toContain('Preset colors');
  });
});
